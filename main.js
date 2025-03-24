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
     if (!filtersDropdown.contains(e.target) {
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



