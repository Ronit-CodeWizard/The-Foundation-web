// Initialize Lucide Icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 20) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
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
            if (revealObserver) revealObserver.unobserve(el);
        } else {
            if (revealObserver) revealObserver.observe(el);
        }
    });
};

// Safety fallback: reveal everything after 2 seconds if still hidden
setTimeout(() => {
    revealElements.forEach(el => {
        if (!el.classList.contains('reveal-visible')) {
            el.classList.add('reveal-visible');
        }
    });
}, 2000);

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

// Loader Handling
const hideLoader = () => {
    const loader = document.getElementById('loader');
    document.body.classList.add('loaded');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
};

window.addEventListener('load', hideLoader);
// Fallback if load event doesn't fire or takes too long
setTimeout(hideLoader, 3000);

// Page Transitions
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    const target = link.getAttribute('target');

    // Only for internal links that are not hashes, external, or opening in new tab
    if (href && 
        !href.startsWith('#') && 
        !href.startsWith('http') && 
        !href.startsWith('mailto') && 
        !href.startsWith('tel') &&
        target !== '_blank' &&
        !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        
        e.preventDefault();
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.display = 'flex';
            // Force reflow
            loader.offsetHeight;
            loader.classList.remove('fade-out');
            
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        } else {
            window.location.href = href;
        }
    }
});

// Handle browser back button (popstate)
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }
});
