// Initialize Lucide Icons
lucide.createIcons();

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Reveal Animations on Scroll using IntersectionObserver
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target); // Only reveal once
        }
    });
}, {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
});

// Initial check for elements already in view
const checkInitialReveal = () => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // If element is in viewport or above it, reveal it
        if (rect.top < window.innerHeight) {
            el.classList.add('reveal-visible');
            revealObserver.unobserve(el);
        } else {
            revealObserver.observe(el);
        }
    });
};

// Run on DOMContentLoaded and also on window load for safety
document.addEventListener('DOMContentLoaded', checkInitialReveal);
window.addEventListener('load', checkInitialReveal);
// Immediate check as well
setTimeout(checkInitialReveal, 100);

// Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your inquiry! We will get back to you soon.');
        contactForm.reset();
    });
}
