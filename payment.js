const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  property: {
    type: mongoose.Schema.ObjectId,
    ref: 'Property',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'eur'
  },
  paymentMethod: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    required: true
  },
  receiptUrl: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', PaymentSchema);
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Property = require('../models/Property');
const Payment = require('../models/Payment');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Create payment intent
// @route   POST /api/v1/payments/create-payment-intent
// @access  Private
exports.createPaymentIntent = asyncHandler(async (req, res, next) => {
  const { propertyId } = req.body;

  // Find property
  const property = await Property.findById(propertyId);

  if (!property) {
    return next(new ErrorResponse('Property not found', 404));
  }

  // Create payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: property.price * 100, // in cents
    currency: 'eur',
    metadata: { integration_check: 'accept_a_payment' }
  });

  res.status(200).json({
    success: true,
    clientSecret: paymentIntent.client_secret
  });
});

// @desc    Process payment
// @route   POST /api/v1/payments
// @access  Private
exports.processPayment = asyncHandler(async (req, res, next) => {
  const { propertyId, paymentMethodId, amount } = req.body;

  // Find property
  const property = await Property.findById(propertyId);

  if (!property) {
    return next(new ErrorResponse('Property not found', 404));
  }

  // Verify amount matches property price
  if (amount !== property.price) {
    return next(new ErrorResponse('Amount does not match property price', 400));
  }

  // Create payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // in cents
    currency: 'eur',
    payment_method: paymentMethodId,
    confirm: true,
    description: `Payment for property ${property.title}`,
    metadata: { property_id: propertyId.toString() }
  });

  // Create payment record
  const payment = await Payment.create({
    user: req.user.id,
    property: propertyId,
    amount,
    currency: 'eur',
    paymentMethod: 'card',
    status: paymentIntent.status,
    transactionId: paymentIntent.id,
    receiptUrl: paymentIntent.charges.data[0].receipt_url
  });

  // Update property status if payment is successful
  if (paymentIntent.status === 'succeeded') {
    property.status = 'sold';
    await property.save();
  }

  res.status(200).json({
    success: true,
    data: payment
  });
});

// @desc    Get user payments
// @route   GET /api/v1/payments/user
// @access  Private
exports.getUserPayments = asyncHandler(async (req, res, next) => {
  const payments = await Payment.find({ user: req.user.id })
    .populate({
      path: 'property',
      select: 'title price images'
    });

  res.status(200).json({
    success: true,
    count: payments.length,
    data: payments
  });
});
const express = require('express');
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
const express = require('express');
const {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertiesInRadius,
  propertyPhotoUpload
} = require('../controllers/propertyController');

const Property = require('../models/Property');

// Include other resource routers
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:propertyId/reviews', reviewRouter);

router
  .route('/radius/:zipcode/:distance')
  .get(getPropertiesInRadius);

router
  .route('/')
  .get(advancedResults(Property, 'user'), getProperties)
  .post(protect, authorize('user', 'agent', 'admin'), createProperty);

router
  .route('/:id')
  .get(getProperty)
  .put(protect, authorize('user', 'agent', 'admin'), updateProperty)
  .delete(protect, authorize('user', 'agent', 'admin'), deleteProperty);

router
  .route('/:id/photo')
  .put(protect, authorize('user', 'agent', 'admin'), propertyPhotoUpload);

module.exports = router;
const express = require('express');
const {
  createPaymentIntent,
  processPayment,
  getUserPayments
} = require('../controllers/paymentController');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/create-payment-intent', protect, createPaymentIntent);
router.post('/', protect, processPayment);
router.get('/user', protect, getUserPayments);

module.exports = router;
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const properties = require('./routes/propertyRoutes');
const auth = require('./routes/authRoutes');
const users = require('./routes/userRoutes');
const payments = require('./routes/paymentRoutes');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/v1/properties', properties);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/payments', payments);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `MySpace <${process.env.FROM_EMAIL}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }

    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the MySpace Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
};
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: process.env.MAX_FILE_UPLOAD },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).array('images', 10); // Allow up to 10 images

// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
    import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const register = userData => api.post('/auth/register', userData);
export const login = userData => api.post('/auth/login', userData);
export const getMe = () => api.get('/auth/me');

// Properties API
export const getProperties = (params = {}) => api.get('/properties', { params });
export const getProperty = id => api.get(`/properties/${id}`);
export const createProperty = propertyData => api.post('/properties', propertyData);
export const updateProperty = (id, propertyData) => api.put(`/properties/${id}`, propertyData);
export const deleteProperty = id => api.delete(`/properties/${id}`);
export const uploadPropertyImages = (id, images) => {
  const formData = new FormData();
  images.forEach(image => {
    formData.append('images', image);
  });
  return api.put(`/properties/${id}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Payments API
export const createPaymentIntent = propertyId => api.post('/payments/create-payment-intent', { propertyId });
export const processPayment = paymentData => api.post('/payments', paymentData);
export const getUserPayments = () => api.get('/payments/user');

export default api;