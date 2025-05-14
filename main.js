const priceRange = document.getElementById('priceRange');
const currentValue = document.getElementById('currentValue');
  priceRange.addEventListener('input', function() {
  const value = priceRange.value;
    currentValue.textContent = '$' + value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
    });
  currentValue.textContent = '$' + priceRange.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

function filterByType(type) {
    const listings = document.querySelectorAll('.listing');
    listings.forEach(listing => {
        if (type === 'all') {
            listing.style.display = 'block';
        } else if (listing.getAttribute('data-for') === type) {
            listing.style.display = 'block';
        } else {
            listing.style.display = 'none';
        }
    });
}

function updatePrice() {
    const price = document.getElementById('price').value;
    document.getElementById('priceValue').textContent = "$" + price.toLocaleString();
    filterByPriceAndSurface();
}

function updateSurface() {
    filterByPriceAndSurface();
}

function filterByPriceAndSurface() {
    const price = document.getElementById('price').value;
    const surface = document.getElementById('surface').value;
    const listings = document.querySelectorAll('.listing');
    listings.forEach(listing => {
        const listingPrice = parseInt(listing.getAttribute('data-price'));
        const listingSurface = parseInt(listing.getAttribute('data-surface'));

        if (listingPrice <= price && listingSurface >= surface) {
            listing.style.display = 'block';
        } else {
            listing.style.display = 'none';
        }
    });
}

function searchProperties() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const listings = document.querySelectorAll('.listing');
    listings.forEach(listing => {
        const title = listing.querySelector('h2').textContent.toLowerCase();
        if (title.includes(searchInput)) {
            listing.style.display = 'block';
        } else {
            listing.style.display = 'none';
        }
    });
}

function viewDetails(propertyName) {
    alert("More details about: " + propertyName);
}

 // Toggle filters dropdown
 const filtersToggle = document.querySelector('.filters-toggle');
 const filtersDropdown = document.querySelector('.filters-dropdown');
 
 filtersToggle.addEventListener('click', () => {
     filtersDropdown.classList.toggle('active');
 });
 
 // Close dropdown when clicking outside
 document.addEventListener('click', (e) => {
     if (!filtersDropdown.contains(e.target)) {
         filtersDropdown.classList.remove('active');
     }
 });
 
 // Filter option selection
 const filterOptions = document.querySelectorAll('.filter-option');
 filterOptions.forEach(option => {
     option.addEventListener('click', () => {
         if (option.parentElement.querySelector('.active')) {
             option.parentElement.querySelector('.active').classList.remove('active');
         }
         option.classList.add('active');
     });
 });


 //about us js//

   // Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navbar = document.querySelector('.navbar');

mobileMenuBtn.addEventListener('click', () => {
  navbar.classList.toggle('active');
  mobileMenuBtn.innerHTML = navbar.classList.contains('active') ? 
    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.navbar ul li a').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

function animateCounters() {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;
    
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(animateCounters, 1);
    } else {
      counter.innerText = target + '+';
    }
  });
}

// Initialize counters when section is in view
const aboutSection = document.querySelector('.about-section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

observer.observe(aboutSection);

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
  testimonials.forEach(testimonial => testimonial.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  testimonials[index].classList.add('active');
  dots[index].classList.add('active');
  currentTestimonial = index;
}

// Next testimonial
document.querySelector('.next-btn').addEventListener('click', () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
});

// Previous testimonial
document.querySelector('.prev-btn').addEventListener('click', () => {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
});

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showTestimonial(index);
  });
});

// Auto slide testimonials
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 5000);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Initialize the first testimonial
showTestimonial(0);

// Create dots dynamically based on number of testimonials
const sliderDots = document.querySelector('.slider-dots');
sliderDots.innerHTML = '';
testimonials.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => showTestimonial(index));
  sliderDots.appendChild(dot);
});

//chatbot js//




// JavaScript për slider functionality
    document.addEventListener('DOMContentLoaded', function() {
        const container = document.querySelector('.testimonials-container');
        const cards = document.querySelectorAll('.testimonial-card');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const dotsContainer = document.querySelector('.dots-container');
        
        let currentIndex = 0;
        const cardWidth = cards[0].offsetWidth + 30; // Width + gap
        
        // Krijo dot për çdo kartë
        cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });
        
        // Funksioni për të shkuar në një slide specifik
        function goToSlide(index) {
            currentIndex = index;
            container.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
            updateDots();
        }
        
        // Përditësoni dot-et aktive
        function updateDots() {
            document.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Butoni Previous
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : cards.length - 1;
            goToSlide(currentIndex);
        });
        
        // Butoni Next
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
            goToSlide(currentIndex);
        });
        
        // Auto-slide çdo 5 sekonda
        let slideInterval = setInterval(() => {
            currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
            goToSlide(currentIndex);
        }, 5000);
        
        // Pause auto-slide kur përdoruesi ndërvepron
        container.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        container.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
                goToSlide(currentIndex);
            }, 5000);
        });
    });

    


    
    //animation footer
       // Create floating islands
       document.addEventListener('DOMContentLoaded', function() {
        const footer = document.querySelector('.footer');
        
        // Create floating islands
        for (let i = 0; i < 8; i++) {
            const island = document.createElement('div');
            island.classList.add('floating-island');
            
            const size = Math.random() * 300 + 100;
            island.style.width = `${size}px`;
            island.style.height = `${size}px`;
            
            island.style.left = `${Math.random() * 100}%`;
            island.style.top = `${Math.random() * 100}%`;
            
            island.style.animation = `float ${Math.random() * 20 + 10}s linear infinite ${Math.random() * 5}s`;
            island.style.opacity = Math.random() * 0.1 + 0.05;
            
            footer.appendChild(island);
        }
        
        // Create particle network
        const particleNetwork = document.createElement('div');
        particleNetwork.classList.add('particle-network');
        footer.appendChild(particleNetwork);
        
        // Initialize particle network (simplified version)
        if (typeof Particles !== 'undefined') {
            Particles.init({
                selector: '.particle-network',
                color: '#00f2fe',
                connectParticles: true,
                maxParticles: 30,
                sizeVariations: 3,
                speed: 0.3
            });
        }
    });
    //animacioni per mision
    document.addEventListener('DOMContentLoaded', function() {
      // Create floating particles
      const section = document.querySelector('.mission-section');
      const colors = ['rgba(75, 108, 183, 0.1)', 'rgba(75, 108, 183, 0.15)', 'rgba(75, 108, 183, 0.2)'];
      
      for (let i = 0; i < 20; i++) {
          const particle = document.createElement('div');
          particle.classList.add('particle');
          
          const size = Math.random() * 10 + 2;
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.top = `${Math.random() * 100}%`;
          particle.style.opacity = Math.random();
          particle.style.background = colors[Math.floor(Math.random() * colors.length)];
          
          // Random animation
          const duration = Math.random() * 20 + 10;
          const delay = Math.random() * 5;
          particle.style.animation = `float ${duration}s linear infinite ${delay}s`;
          
          section.appendChild(particle);
      }
      
      // Add keyframes dynamically
      const styleSheet = document.styleSheets[document.styleSheets.length - 1];
      styleSheet.insertRule(`
          @keyframes float {
              0% {
                  transform: translate(0, 0) rotate(0deg);
                  opacity: ${Math.random()};
              }
              50% {
                  transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
                  opacity: ${Math.random()};
              }
              100% {
                  transform: translate(0, 0) rotate(360deg);
                  opacity: ${Math.random()};
              }
          }
      `, styleSheet.cssRules.length);
  });
  

  //animacioni per kilenat
  document.addEventListener('DOMContentLoaded', function() {
    // Create highly visible light particles
    const section = document.querySelector('.testimonials-section');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('light-particle');
        
        const size = Math.random() * 12 + 8; // Larger particles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.opacity = Math.random() * 0.5 + 0.4; // More opaque
        particle.style.animationDuration = `${Math.random() * 8 + 8}s`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        
        section.appendChild(particle);
    }

    // Activate card animations
    const cards = document.querySelectorAll('.testimonial-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2 + 0.3}s`;
    });
});

//animacioni per blog
document.addEventListener('DOMContentLoaded', function() {
  // Create RGB particles
  const section = document.querySelector('.blog-section');
  const colors = ['#ff0000', '#00ff37', '#002bff', '#7a00ff', '#ff00c8'];
  
  for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.classList.add('rgb-particle');
      
      const size = Math.random() * 20 + 10;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.opacity = Math.random() * 0.5 + 0.3;
      particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 3}s`;
      
      section.appendChild(particle);
  }

  // View All Button functionality
  const viewAllBtn = document.getElementById('viewAllBtn');
  const additionalArticles = document.getElementById('additionalArticles');
  
  viewAllBtn.addEventListener('click', function() {
      if (additionalArticles.style.display === 'grid') {
          additionalArticles.style.display = 'none';
          viewAllBtn.textContent = 'Shiko të Gjitha Artikujt';
      } else {
          additionalArticles.style.display = 'grid';
          viewAllBtn.textContent = 'Shiko Më Pak';
      }
  });
});
//animacioni per histori
// JavaScript për animacione të avancuara
document.addEventListener('DOMContentLoaded', function() {
  // Animacioni i numëruesve
  const counters = document.querySelectorAll('.counter');
  const speed = 200;
  
  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;
      
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        counter.classList.add('animated');
        setTimeout(() => counter.classList.remove('animated'), 500);
        setTimeout(animateCounters, 1);
      } else {
        counter.innerText = target;
      }
    });
  }
  
  // Aktivizimi i animacioneve kur elementi është në viewport
  function checkAnimation() {
    const elements = document.querySelectorAll('.about-content > *');
    
    elements.forEach((element, index) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (elementPosition < screenPosition) {
        if (element.classList.contains('stats')) {
          animateCounters();
        }
        element.style.opacity = '1';
        
        // Shtojmë klasa të ndryshme animacioni për elemente të ndryshme
        if (element.tagName === 'H2') {
          element.classList.add('animate-float');
        } else if (element.tagName === 'P') {
          element.classList.add('animate-pulse');
        } else if (element.classList.contains('stats')) {
          const statItems = element.querySelectorAll('.stat-item');
          statItems.forEach((item, i) => {
            setTimeout(() => {
              item.classList.add('animate-fade-grow');
            }, i * 300);
          });
        }
      }
    });
  }
  
  // Vëzhgoni kur elementi hyn në viewport
  window.addEventListener('scroll', checkAnimation);
  checkAnimation(); // Kontrollo në fillim
});
//animacioni per logo
document.addEventListener('DOMContentLoaded', function() {
  const logoText = document.getElementById('animated-logo');
  let isVisible = true;
  
  function toggleLogoVisibility() {
      if (isVisible) {
          logoText.classList.remove('visible');
          logoText.classList.add('hidden');
      } else {
          logoText.classList.remove('hidden');
          logoText.classList.add('visible');
      }
      isVisible = !isVisible;
  }
  
  // Fillimisht e bëjmë të dukshme
  logoText.classList.add('visible');
  
  // Animojmë çdo 2 sekonda
  setInterval(toggleLogoVisibility, 2000);
  
  // Për të ndaluar animacionin kur hover
  logoText.addEventListener('mouseenter', function() {
      clearInterval(intervalId);
      logoText.classList.remove('hidden');
      logoText.classList.add('visible');
  });
  
  // Rifillojmë animacionin kur largohet mouse
  let intervalId = setInterval(toggleLogoVisibility, 2000);
  logoText.addEventListener('mouseleave', function() {
      intervalId = setInterval(toggleLogoVisibility, 2000);
  });
});


//animacioni per pronat e fundit 
// Shtojmë një efekt të dritës kur faqja të ngarkohet
document.addEventListener('DOMContentLoaded', function() {
  const propertyCards = document.querySelectorAll('.property-card');
  
  propertyCards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
          const x = e.pageX - this.offsetLeft;
          const y = e.pageY - this.offsetTop;
          
          const centerX = this.offsetWidth / 2;
          const centerY = this.offsetHeight / 2;
          
          const angle = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI;
          
          this.style.setProperty('--angle', angle + 'deg');
          this.style.setProperty('--x', x + 'px');
          this.style.setProperty('--y', y + 'px');
      });
      
      // Reset kur hiqet mouse
      card.addEventListener('mouseleave', function() {
          this.style.removeProperty('--angle');
          this.style.removeProperty('--x');
          this.style.removeProperty('--y');
      });
  });
});
//anuiamcioni per zonat e kerkuara
//animacioni per zonat premium

document.addEventListener('DOMContentLoaded', function() {
  const propertyCards = document.querySelectorAll('.property-card');
  const filters = {
    type: document.getElementById('property-type'),
    bedrooms: document.getElementById('bedrooms'),
    price: document.getElementById('price-range'),
    location: document.getElementById('location')
  };
  
  // Add event listeners to all filters
  Object.values(filters).forEach(filter => {
    filter.addEventListener('change', filterProperties);
  });
  
  function filterProperties() {
    const typeValue = filters.type.value;
    const bedroomsValue = filters.bedrooms.value;
    const priceValue = filters.price.value;
    const locationValue = filters.location.value;
    
    propertyCards.forEach(card => {
      const cardType = card.dataset.type;
      const cardBedrooms = parseInt(card.dataset.bedrooms);
      const cardPrice = parseInt(card.dataset.price);
      const cardLocation = card.dataset.location;
      
      // Check filters
      const typeMatch = typeValue === 'all' || cardType === typeValue;
      const bedroomsMatch = bedroomsValue === 'any' || cardBedrooms >= parseInt(bedroomsValue);
      const locationMatch = locationValue === 'any' || cardLocation === locationValue;
      
      // Price range check
      let priceMatch = false;
      if (priceValue === 'any') {
        priceMatch = true;
      } else if (priceValue === '300000+') {
        priceMatch = cardPrice >= 300000;
      } else {
        const [min, max] = priceValue.split('-').map(Number);
        priceMatch = cardPrice >= min && cardPrice <= max;
      }
      
      // Show/hide based on matches
      if (typeMatch && bedroomsMatch && priceMatch && locationMatch) {
        card.style.display = 'block';
        // Add animation when showing
        card.style.animation = 'cardEntry 0.6s ease-out forwards';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
  // Hover effect for property cards
  propertyCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });
});
//animaioni per rreth nesh


//logini i perditsuar
document.addEventListener('DOMContentLoaded', function() {
  const loginBtn = document.getElementById('loginBtn');
  const authModal = document.getElementById('authModal');
  const closeModal = document.querySelector('.close-modal');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.auth-tab-content');

  // Show modal when login button is clicked
  loginBtn.addEventListener('click', function() {
      authModal.style.display = 'block';
  });

  // Close modal when X is clicked
  closeModal.addEventListener('click', function() {
      authModal.style.display = 'none';
  });

  // Close modal when clicking outside the modal
  window.addEventListener('click', function(event) {
      if (event.target === authModal) {
          authModal.style.display = 'none';
      }
  });

  // Tab switching functionality
  tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const tabId = this.getAttribute('data-tab');
          
          // Remove active class from all buttons and contents
          tabBtns.forEach(btn => btn.classList.remove('active'));
          tabContents.forEach(content => content.classList.remove('active'));
          
          // Add active class to clicked button and corresponding content
          this.classList.add('active');
          document.getElementById(tabId + 'Tab').classList.add('active');
      });
  });
});
//proprerty

const pricerange = document.getElementById('priceRange');
const currentValue = document.getElementById('currentValue');
// Function to update the current range value
priceRange.addEventListener('input', function() {
  const value = priceRange.value;
  currentValue.textContent = '$' + value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Adding commas to the value
});

// Initialize the value to the current position
currentValue.textContent = '$' + priceRange.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// Get the necessary DOM elements
const addBtn = document.getElementById('addBtn');
const overlay = document.getElementById('overlay');
const addOptions = document.getElementById('addOptions');
const payAndSubmit = document.getElementById('payAndSubmit');
const nameInput = document.getElementById('nameInput');
const surnameInput = document.getElementById('surnameInput');
const emailInput = document.getElementById('emailInput');
const propertyImage = document.getElementById('propertyImage');
const descriptionInput = document.getElementById('descriptionInput');
const priceInput = document.getElementById('priceInput');
const radioInputs = document.querySelectorAll('input[name="propertyType"]');

// Function to validate the form
function validateForm() {
let isFormValid = true;

// Clear previous error messages
document.querySelectorAll('.error-message').forEach((el) => {
el.textContent = '';
});

// Validate name
const isNameValid = nameInput.value.trim() !== '';
if (!isNameValid) {
document.getElementById('nameError').textContent = 'Please enter your first name';
isFormValid = false;
}

// Validate surname
const isSurnameValid = surnameInput.value.trim() !== '';
if (!isSurnameValid) {
document.getElementById('surnameError').textContent = 'Please enter your last name';
isFormValid = false;
}

// Validate email
const isEmailValid = emailInput.value.trim() !== '' && emailInput.validity.valid;
if (!isEmailValid) {
document.getElementById('emailError').textContent = 'Please enter a valid email address';
isFormValid = false;
}

// Validate property type
const isRadioSelected = Array.from(radioInputs).some(input => input.checked);
if (!isRadioSelected) {
document.getElementById('propertyTypeError').textContent = 'Please select a property type';
isFormValid = false;
}

// Validate image
const isImageValid = propertyImage.files.length > 0;
if (!isImageValid) {
document.getElementById('imageError').textContent = 'Please upload an image';
isFormValid = false;
}

// Validate price
const isPriceValid = priceInput.value.trim() !== '' && !isNaN(priceInput.value) && priceInput.value > 0;
if (!isPriceValid) {
document.getElementById('priceError').textContent = 'Please enter a valid price';
isFormValid = false;
}

// Enable/disable submit button based on form validity
if (isFormValid) {
payAndSubmit.disabled = false;
payAndSubmit.style.pointerEvents = 'auto'; // Allow click
} else {
payAndSubmit.disabled = true;
payAndSubmit.style.pointerEvents = 'none'; // Prevent click
}
}

// Event listener to show the form when the "Add" button is clicked
addBtn.addEventListener('click', function () {
overlay.style.display = 'block';
addOptions.style.display = 'block';
});

// Event listener to close the form when the overlay is clicked
overlay.addEventListener('click', function () {
overlay.style.display = 'none';
addOptions.style.display = 'none';
});

// Event listener for the submit button (to prevent default and validate)
payAndSubmit.addEventListener('click', function (e) {
if (payAndSubmit.disabled) {
e.preventDefault(); // Prevent the link from working if the form is invalid
} else {
// Optionally, add form submission or redirection after successful validation
window.location.href = "pagesa.html"; // Redirect to the payment page
}
});

// Event listener for input fields to check form validity
nameInput.addEventListener('input', validateForm);
surnameInput.addEventListener('input', validateForm);
emailInput.addEventListener('input', validateForm);
propertyImage.addEventListener('change', validateForm);
descriptionInput.addEventListener('input', validateForm);
priceInput.addEventListener('input', validateForm);
radioInputs.forEach(input => input.addEventListener('change', validateForm));

// Initial state: disable the submit button
payAndSubmit.disabled = true;
payAndSubmit.style.pointerEvents = 'none'; // Prevent click until form is valid

