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
<<<<<<< HEAD
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
=======
const filtersToggle = document.querySelector('.filters-toggle');
const filtersDropdown = document.querySelector('.filters-dropdown');
>>>>>>> 64406e9648501c512e0024fa1adc307d567cde00

// Toggle dropdown kur klikohet butoni
filtersToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    filtersDropdown.classList.toggle('active');
});

// Mbylle dropdown kur klikohet jashtë
document.addEventListener('click', (e) => {
    if (!filtersDropdown.contains(e.target) && e.target !== filtersToggle) {
        filtersDropdown.classList.remove('active');
    }
});

// Për zgjedhjen e filtrave
const filterOptions = document.querySelectorAll('.filter-option');
filterOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Hiq klasën 'active' nga të gjithë vëllezërit në të njëjtin grup
        const siblings = Array.from(option.parentElement.children);
        siblings.forEach(sib => sib.classList.remove('active'));
        
        // Shto klasën 'active' për opsionin e zgjedhur
        option.classList.add('active');
    });
});

// Për slider-in e çmimit
const rangeSlider = document.querySelector('.range-slider');
const rangeValues = document.querySelector('.range-values');
if (rangeSlider && rangeValues) {
    rangeSlider.addEventListener('input', (e) => {
        const value = e.target.value;
        rangeValues.firstElementChild.textContent = `$${parseInt(value).toLocaleString()}`;
    });
}

// Për butonin e aplikimit të filtrave
const applyFiltersBtn = document.querySelector('.apply-filters');
if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', () => {
        applyAllFilters();
    });
}

// Funksioni për të aplikuar të gjitha filtrat
function applyAllFilters() {
    // Merr filtrin e dhomave të gjumit
    const selectedBedroom = document.querySelector('.filter-option.active');
    const bedroomFilter = selectedBedroom ? selectedBedroom.textContent.trim() : 'all';
    
    // Merr filtrin e çmimit
    const priceFilter = rangeSlider ? rangeSlider.value : null;
    
    console.log('Bedroom filter:', bedroomFilter);
    console.log('Price filter:', priceFilter);
    
    // Apliko filtrat në elementet
    const items = document.querySelectorAll('.item-to-filter');
    items.forEach(item => {
        const itemPrice = item.dataset.price || 0;
        const itemBedrooms = item.dataset.bedrooms || '';
        
        // Kontrollo nëse elementi plotëson kushtet e filtrave
        const priceMatch = !priceFilter || parseInt(itemPrice) <= parseInt(priceFilter);
        const bedroomMatch = bedroomFilter === 'all' || 
                           (bedroomFilter === 'Studio' && itemBedrooms === 'Studio') ||
                           (bedroomFilter === '1' && itemBedrooms === '1') ||
                           (bedroomFilter === '2' && itemBedrooms === '2') ||
                           (bedroomFilter === '3+' && parseInt(itemBedrooms) >= 3);
        
        if (priceMatch && bedroomMatch) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Mbylle dropdown pas aplikimit të filtrave
    filtersDropdown.classList.remove('active');
}
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



    