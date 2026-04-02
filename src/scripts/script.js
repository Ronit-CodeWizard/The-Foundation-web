// Initialize Lucide Icons
const initIcons = () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
};

// Run immediately if DOM is already ready, otherwise wait
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initIcons();
} else {
    document.addEventListener('DOMContentLoaded', initIcons);
}

// Safety fallback for icons
window.addEventListener('load', initIcons);

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        // Change icon based on state
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
            if (mobileMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        }
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
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

// Question Bank
const questions = [
    {
        category: "Physics: Mechanics",
        question: "A particle of mass m is moving in a circle of radius r with a constant speed v. What is the magnitude of the average force acting on the particle during a half-revolution?",
        options: ["A) 2mv²/πr", "B) mv²/r", "C) mv²/2πr", "D) Zero"],
        correct: "A",
        solution: "The change in momentum during a half-revolution is Δp = mv - (-mv) = 2mv. The time taken is Δt = πr/v. Average Force = Δp/Δt = (2mv) / (πr/v) = 2mv²/πr."
    },
    {
        category: "Chemistry: Atomic Structure",
        question: "Which of the following series of transitions in the spectrum of hydrogen atom falls in the visible region?",
        options: ["A) Lyman series", "B) Paschen series", "C) Brackett series", "D) Balmer series"],
        correct: "D",
        solution: "The Balmer series corresponds to transitions from higher energy levels (n > 2) to the n = 2 level, which produces spectral lines in the visible region of the electromagnetic spectrum."
    },
    {
        category: "Mathematics: Calculus",
        question: "What is the value of the limit as x approaches 0 of (sin x) / x?",
        options: ["A) 0", "B) ∞", "C) 1", "D) Undefined"],
        correct: "C",
        solution: "Using L'Hôpital's Rule or the Taylor series expansion of sin x, we find that the limit of (sin x)/x as x approaches 0 is exactly 1."
    },
    {
        category: "Biology: Genetics",
        question: "In a Mendelian dihybrid cross, what is the expected phenotypic ratio in the F2 generation?",
        options: ["A) 9:3:3:1", "B) 1:2:1", "C) 3:1", "D) 1:1:1:1"],
        correct: "A",
        solution: "According to Mendel's Law of Independent Assortment, the F2 generation of a dihybrid cross (e.g., RrYy x RrYy) results in a phenotypic ratio of 9:3:3:1."
    },
    {
        category: "Physics: Electrostatics",
        question: "Two point charges q and -q are separated by a distance d. What is the electric potential at the midpoint between them?",
        options: ["A) kq/d", "B) Zero", "C) 2kq/d", "D) -kq/d"],
        correct: "B",
        solution: "Electric potential is a scalar quantity. At the midpoint, the distance from both charges is d/2. V = kq/(d/2) + k(-q)/(d/2) = 2kq/d - 2kq/d = 0."
    },
    {
        category: "Chemistry: Periodic Table",
        question: "Which element has the highest electronegativity on the Pauling scale?",
        options: ["A) Oxygen", "B) Chlorine", "C) Nitrogen", "D) Fluorine"],
        correct: "D",
        solution: "Fluorine is the most electronegative element with a value of 3.98 on the Pauling scale, followed by Oxygen (3.44)."
    },
    {
        category: "Mathematics: Trigonometry",
        question: "What is the value of sin²(θ) + cos²(θ) for any real value of θ?",
        options: ["A) 1", "B) 0", "C) -1", "D) tan(θ)"],
        correct: "A",
        solution: "This is the fundamental Pythagorean identity in trigonometry, derived from the unit circle where x² + y² = 1."
    },
    {
        category: "Biology: Cell Biology",
        question: "Which organelle is known as the 'Powerhouse of the Cell'?",
        options: ["A) Nucleus", "B) Mitochondria", "C) Golgi Apparatus", "D) Ribosome"],
        correct: "B",
        solution: "Mitochondria are responsible for cellular respiration and the production of ATP, the energy currency of the cell."
    },
    {
        category: "Physics: Optics",
        question: "A convex lens has a focal length of 20 cm. What is its power in diopters?",
        options: ["A) 20 D", "B) 0.05 D", "C) 2 D", "D) 5 D"],
        correct: "D",
        solution: "Power (P) = 1/f (in meters). P = 1/0.20 = 5 D."
    },
    {
        category: "Chemistry: Thermodynamics",
        question: "For a spontaneous process at constant temperature and pressure, the change in Gibbs Free Energy (ΔG) must be:",
        options: ["A) Negative", "B) Zero", "C) Positive", "D) Infinite"],
        correct: "A",
        solution: "A process is spontaneous if ΔG < 0. If ΔG = 0, the system is at equilibrium."
    },
    {
        category: "Mathematics: Coordinate Geometry",
        question: "The equation x² + y² + 2gx + 2fy + c = 0 represents a circle. What is its radius?",
        options: ["A) √(g² + f²)", "B) √(g² + f² + c)", "C) g + f - c", "D) √(g² + f² - c)"],
        correct: "D",
        solution: "The radius of the circle x² + y² + 2gx + 2fy + c = 0 is given by r = √(g² + f² - c)."
    },
    {
        category: "Biology: Plant Physiology",
        question: "Which pigment is primarily responsible for photosynthesis in green plants?",
        options: ["A) Carotene", "B) Chlorophyll a", "C) Xanthophyll", "D) Anthocyanin"],
        correct: "B",
        solution: "Chlorophyll a is the primary photosynthetic pigment that absorbs light energy and initiates the light-dependent reactions."
    },
    {
        category: "Physics: Modern Physics",
        question: "In the photoelectric effect, the maximum kinetic energy of emitted electrons depends on:",
        options: ["A) Frequency of light", "B) Intensity of light", "C) Time of exposure", "D) Surface area"],
        correct: "A",
        solution: "According to Einstein's photoelectric equation, K_max = hν - Φ. It depends on the frequency (ν) of incident light and the work function (Φ) of the material."
    },
    {
        category: "Chemistry: Organic Chemistry",
        question: "Which of the following is an example of an electrophile?",
        options: ["A) NH₃", "B) H₂O", "C) CN⁻", "D) NO₂⁺"],
        correct: "D",
        solution: "Electrophiles are electron-deficient species. NO₂⁺ (nitronium ion) is a strong electrophile used in nitration reactions."
    },
    {
        category: "Mathematics: Probability",
        question: "If P(A) = 0.4, P(B) = 0.5 and A and B are independent events, what is P(A ∩ B)?",
        options: ["A) 0.2", "B) 0.1", "C) 0.9", "D) 0.45"],
        correct: "A",
        solution: "For independent events, P(A ∩ B) = P(A) * P(B) = 0.4 * 0.5 = 0.2."
    },
    {
        category: "Biology: Human Physiology",
        question: "Which part of the human brain is responsible for maintaining body balance and posture?",
        options: ["A) Cerebrum", "B) Medulla Oblongata", "C) Cerebellum", "D) Hypothalamus"],
        correct: "C",
        solution: "The cerebellum coordinates voluntary movements and maintains posture, balance, and equilibrium."
    },
    {
        category: "Physics: Waves",
        question: "The Doppler effect in sound is observed when there is relative motion between:",
        options: ["A) Source and Medium", "B) Source and Observer", "C) Observer and Medium", "D) Two different sources"],
        correct: "B",
        solution: "The Doppler effect is the change in frequency or wavelength of a wave in relation to an observer who is moving relative to the wave source."
    },
    {
        category: "Chemistry: Equilibrium",
        question: "If the pressure of a gaseous system at equilibrium is increased, the equilibrium shifts in the direction of:",
        options: ["A) More moles of gas", "B) No change", "C) Higher temperature", "D) Fewer moles of gas"],
        correct: "D",
        solution: "According to Le Chatelier's Principle, increasing pressure shifts the equilibrium towards the side with fewer moles of gas to counteract the change."
    },
    {
        category: "Mathematics: Sequences",
        question: "What is the sum of the first n natural numbers?",
        options: ["A) n(n+1)/2", "B) n(n+1)", "C) n²/2", "D) (n+1)/2"],
        correct: "A",
        solution: "The sum of an arithmetic progression 1 + 2 + ... + n is given by the formula S_n = n(n+1)/2."
    },
    {
        category: "Biology: Ecology",
        question: "In an ecosystem, the 10% law of energy transfer was proposed by:",
        options: ["A) Elton", "B) Odum", "C) Lindeman", "D) Tansley"],
        correct: "C",
        solution: "Raymond Lindeman proposed the 10% law, stating that only about 10% of the energy from one trophic level is transferred to the next."
    },
    {
        category: "Physics: Electromagnetism",
        question: "Lenz's Law is a consequence of the law of conservation of:",
        options: ["A) Charge", "B) Energy", "C) Momentum", "D) Mass"],
        correct: "B",
        solution: "Lenz's Law ensures that the work done in moving a magnet against the induced magnetic field is converted into electrical energy, obeying the conservation of energy."
    },
    {
        category: "Chemistry: Solutions",
        question: "Which of the following is a colligative property?",
        options: ["A) Viscosity", "B) Surface Tension", "C) Refractive Index", "D) Osmotic Pressure"],
        correct: "D",
        solution: "Colligative properties depend only on the number of solute particles. Examples include Osmotic Pressure, Elevation in Boiling Point, and Depression in Freezing Point."
    },
    {
        category: "Mathematics: Matrices",
        question: "If A is a square matrix, then A + Aᵀ is always:",
        options: ["A) Symmetric", "B) Skew-symmetric", "C) Identity matrix", "D) Null matrix"],
        correct: "A",
        solution: "A matrix M is symmetric if Mᵀ = M. (A + Aᵀ)ᵀ = Aᵀ + (Aᵀ)ᵀ = Aᵀ + A = A + Aᵀ. Hence, it is symmetric."
    },
    {
        category: "Biology: Evolution",
        question: "The theory of 'Natural Selection' was given by:",
        options: ["A) Lamarck", "B) Hugo de Vries", "C) Darwin", "D) Mendel"],
        correct: "C",
        solution: "Charles Darwin proposed the theory of evolution by natural selection in his book 'On the Origin of Species'."
    },
    {
        category: "Physics: Thermodynamics",
        question: "The efficiency of a Carnot engine depends only on:",
        options: ["A) Working substance", "B) Temperature of source and sink", "C) Pressure of gas", "D) Volume of cylinder"],
        correct: "B",
        solution: "Efficiency (η) = 1 - T_sink/T_source. It is independent of the nature of the working substance."
    },
    {
        category: "Chemistry: Chemical Bonding",
        question: "What is the shape of a CH₄ molecule according to VSEPR theory?",
        options: ["A) Linear", "B) Trigonal Planar", "C) Octahedral", "D) Tetrahedral"],
        correct: "D",
        solution: "Methane (CH₄) has 4 bond pairs and 0 lone pairs, resulting in a tetrahedral geometry with bond angles of 109.5°."
    },
    {
        category: "Mathematics: Complex Numbers",
        question: "What is the value of i⁴, where i = √-1?",
        options: ["A) 1", "B) -1", "C) -i", "D) i"],
        correct: "A",
        solution: "i¹ = i, i² = -1, i³ = -i, i⁴ = 1. The powers of i repeat every 4 cycles."
    },
    {
        category: "Biology: Biotechnology",
        question: "PCR (Polymerase Chain Reaction) is used for:",
        options: ["A) DNA Fingerprinting", "B) Protein Synthesis", "C) DNA Amplification", "D) Cell Culture"],
        correct: "C",
        solution: "PCR is a technique used to make millions of copies of a specific DNA segment, allowing for detailed study."
    },
    {
        category: "Physics: Gravitation",
        question: "The escape velocity from the surface of the Earth is approximately:",
        options: ["A) 9.8 km/s", "B) 11.2 km/s", "C) 7.9 km/s", "D) 42 km/s"],
        correct: "B",
        solution: "Escape velocity v_e = √(2GR). For Earth, it is approximately 11.2 km/s."
    },
    {
        category: "Chemistry: Coordination Compounds",
        question: "Which of the following is a bidentate ligand?",
        options: ["A) Cl⁻", "B) NH₃", "C) CN⁻", "D) Ethylenediamine (en)"],
        correct: "D",
        solution: "Ethylenediamine (en) has two nitrogen atoms that can donate electron pairs to a metal ion, making it a bidentate ligand."
    }
];

// Question of the Day Logic
const initQuestionOfTheDay = () => {
    const revealBtn = document.getElementById('reveal-btn');
    const solutionContainer = document.getElementById('solution-container');
    const dateDisplay = document.getElementById('current-date-display');
    const questionText = document.getElementById('question-text');
    const optionsGrid = document.getElementById('options-grid');
    const solutionText = document.getElementById('solution-text');
    const categoryDisplay = document.getElementById('question-category');
    const correctLabel = document.getElementById('correct-answer-label');

    if (!revealBtn || !solutionContainer || !questionText || !optionsGrid) return;
    
    // Prevent multiple initializations
    if (revealBtn.getAttribute('data-initialized')) return;
    revealBtn.setAttribute('data-initialized', 'true');

    // Date setup
    const now = new Date();
    if (dateDisplay) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.textContent = now.toLocaleDateString('en-US', options);
    }

    // Select question based on day of the year
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const questionIndex = dayOfYear % questions.length;
    const currentQ = questions[questionIndex];

    // Inject question data
    questionText.textContent = currentQ.question;
    categoryDisplay.textContent = currentQ.category;
    solutionText.textContent = currentQ.solution;
    correctLabel.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4"></i> Correct Answer: ${currentQ.correct}`;
    
    // Inject options
    optionsGrid.innerHTML = '';
    currentQ.options.forEach(opt => {
        const optDiv = document.createElement('div');
        optDiv.className = 'p-4 rounded-lg border border-gray-100 bg-gray-50 font-bold text-gray-700 hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer';
        optDiv.textContent = opt;
        
        optDiv.addEventListener('click', () => {
            // Reset others
            const allOpts = optionsGrid.querySelectorAll('.cursor-pointer');
            allOpts.forEach(o => {
                o.classList.remove('border-green-500', 'bg-green-50', 'border-red-500', 'bg-red-50', 'text-green-700', 'text-red-700');
            });

            const text = opt.trim();
            const isCorrect = text.startsWith(currentQ.correct + ')');
            
            if (isCorrect) {
                optDiv.classList.add('border-green-500', 'bg-green-50', 'text-green-700');
                if (solutionContainer.classList.contains('hidden')) {
                    revealBtn.click();
                }
                showFeedbackModal(true);
            } else {
                optDiv.classList.add('border-red-500', 'bg-red-50', 'text-red-700');
                showFeedbackModal(false);
            }
        });
        
        optionsGrid.appendChild(optDiv);
    });

    // Modal Logic
    const feedbackModal = document.getElementById('feedback-modal');
    const modalIconContainer = document.getElementById('modal-icon-container');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const closeModalBtns = document.querySelectorAll('.close-modal-btn, #close-modal');

    const showFeedbackModal = (isCorrect) => {
        if (!feedbackModal) return;

        if (isCorrect) {
            modalIconContainer.className = 'w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl bg-green-100 text-green-600';
            modalIconContainer.innerHTML = '<i data-lucide="party-popper" class="w-12 h-12"></i>';
            modalTitle.textContent = "Brilliant!";
            modalTitle.className = "text-3xl font-black text-center text-green-600 mb-4 tracking-tight uppercase";
            modalMessage.innerHTML = 'Good! You have done great. For future correct answers, join <span class="text-primary font-black underline decoration-accent/50">THE FOUNDATION</span> and master every concept!';
        } else {
            modalIconContainer.className = 'w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl bg-red-100 text-red-600';
            modalIconContainer.innerHTML = '<i data-lucide="frown" class="w-12 h-12"></i>';
            modalTitle.textContent = "Keep Learning!";
            modalTitle.className = "text-3xl font-black text-center text-red-600 mb-4 tracking-tight uppercase";
            modalMessage.innerHTML = 'Don\'t worry! Now you have to join <span class="text-primary font-black underline decoration-accent/50">THE FOUNDATION</span> for the betterment of your concepts and future success.';
        }

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        feedbackModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    };

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            feedbackModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
        });
    });

    // Close on overlay click
    const overlay = feedbackModal.querySelector('.modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            feedbackModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Re-initialize icons for the injected label
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    revealBtn.addEventListener('click', () => {
        const isHidden = solutionContainer.classList.contains('hidden');
        const icon = revealBtn.querySelector('svg, i');
        
        if (isHidden) {
            solutionContainer.classList.remove('hidden');
            revealBtn.querySelector('span').textContent = 'Hide Solution';
            if (icon) icon.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                solutionContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        } else {
            solutionContainer.classList.add('hidden');
            revealBtn.querySelector('span').textContent = 'Reveal Solution';
            if (icon) icon.style.transform = 'rotate(0deg)';
        }
    });
};

document.addEventListener('DOMContentLoaded', initQuestionOfTheDay);
window.addEventListener('load', initQuestionOfTheDay);
