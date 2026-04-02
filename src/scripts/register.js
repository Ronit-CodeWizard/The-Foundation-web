// Initialize Lucide Icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// Multi-step Form Logic
const form = document.getElementById('registration-form');
const steps = document.querySelectorAll('.step-content');
const progressBar = document.getElementById('progress-bar');
const stepIndicator = document.getElementById('step-indicator');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const submitBtn = document.getElementById('submit-btn');
const successScreen = document.getElementById('success-screen');
const resetBtn = document.getElementById('reset-btn');

let currentStep = 1;

// Gender Selection
const genderBtns = document.querySelectorAll('.gender-btn');
const genderInput = document.getElementById('gender-input');

genderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        genderBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        genderInput.value = btn.getAttribute('data-gender');
    });
});

// Course Selection
const courseCards = document.querySelectorAll('.course-card');
const programmeInput = document.getElementById('programme-input');

courseCards.forEach(card => {
    card.addEventListener('click', () => {
        courseCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        programmeInput.value = card.getAttribute('data-course');
    });
});

// Contact Number Logic (10 digits only)
const contactInput = document.getElementById('contact-input');
if (contactInput) {
    contactInput.addEventListener('input', (e) => {
        // Remove non-numeric characters
        let value = e.target.value.replace(/\D/g, '');
        // Limit to 10 digits
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        e.target.value = value;
    });
}

// Custom Dropdown Logic
const dropdowns = document.querySelectorAll('.custom-dropdown');

dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.dropdown-trigger');
    const menu = dropdown.querySelector('.dropdown-menu');
    const options = dropdown.querySelectorAll('.dropdown-option');
    const hiddenInput = dropdown.querySelector('input[type="hidden"]');
    const selectedText = dropdown.querySelector('.selected-text');
    const icon = dropdown.querySelector('[data-lucide="chevron-down"]');

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close other dropdowns
        dropdowns.forEach(d => {
            if (d !== dropdown) {
                d.querySelector('.dropdown-menu').classList.add('hidden');
                const otherIcon = d.querySelector('[data-lucide="chevron-down"]');
                if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
            }
        });
        
        const isHidden = menu.classList.toggle('hidden');
        if (icon) {
            icon.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            const value = option.getAttribute('data-value');
            const text = option.textContent;
            
            hiddenInput.value = value;
            selectedText.textContent = text;
            selectedText.classList.remove('text-gray-400');
            selectedText.classList.add('text-gray-900');
            
            menu.classList.add('hidden');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }

            // Handle "Other" Board option
            if (dropdown.id === 'dropdown-board') {
                const otherBoardContainer = document.getElementById('other-board-container');
                const otherBoardInput = otherBoardContainer.querySelector('input');
                if (value === 'Other') {
                    otherBoardContainer.classList.remove('hidden');
                    otherBoardInput.setAttribute('required', 'true');
                } else {
                    otherBoardContainer.classList.add('hidden');
                    otherBoardInput.removeAttribute('required');
                    otherBoardInput.value = '';
                }
            }

            // Remove error styling if present
            trigger.classList.remove('border-secondary');
            trigger.classList.add('border-white/40');
        });
    });
});

// Close dropdowns on outside click
document.addEventListener('click', () => {
    dropdowns.forEach(dropdown => {
        dropdown.querySelector('.dropdown-menu').classList.add('hidden');
        const icon = dropdown.querySelector('[data-lucide="chevron-down"]');
        if (icon) {
            icon.style.transform = 'rotate(0deg)';
        }
    });
});

// Update UI
const updateUI = () => {
    steps.forEach((step, index) => {
        step.classList.toggle('active', index + 1 === currentStep);
    });

    // Progress Bar
    const progress = (currentStep / steps.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Add success glow animation on step change
    progressBar.classList.add('progress-success');
    setTimeout(() => progressBar.classList.remove('progress-success'), 1000);

    stepIndicator.textContent = `Step ${currentStep} of ${steps.length}`;

    // Buttons
    prevBtn.classList.toggle('hidden', currentStep === 1);
    nextBtn.classList.toggle('hidden', currentStep === steps.length);
    submitBtn.classList.toggle('hidden', currentStep !== steps.length);

    // Summary Update
    if (currentStep === 4) {
        updateSummary();
    }
};

const updateSummary = () => {
    const formData = new FormData(form);
    document.getElementById('summary-name').textContent = formData.get('studentName') || '-';
    document.getElementById('summary-guardian').textContent = formData.get('guardianName') || '-';
    
    // Board Summary Logic
    let board = formData.get('board') || '-';
    if (board === 'Other') {
        board = formData.get('otherBoard') || 'Other';
    }
    document.getElementById('summary-board').textContent = board;
    document.getElementById('summary-contact').textContent = formData.get('contact') ? '+91 ' + formData.get('contact') : '-';
    document.getElementById('summary-gender').textContent = formData.get('gender') || '-';
    document.getElementById('summary-programme').textContent = formData.get('programme') || '-';
};

// Validation
const validateStep = (step) => {
    const inputs = steps[step - 1].querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        let value = input.value.trim();
        
        // For custom dropdowns, we need to style the trigger
        const dropdown = input.closest('.custom-dropdown');
        const targetElement = dropdown ? dropdown.querySelector('.dropdown-trigger') : input;

        if (!value) {
            isValid = false;
            targetElement.classList.add('border-secondary');
            targetElement.classList.remove('border-white/40');
        } else {
            // Special validation for contact number length
            if (input.id === 'contact-input' && value.length !== 10) {
                isValid = false;
                input.closest('.flex').classList.add('border-secondary');
                input.closest('.flex').classList.remove('border-white/40');
            } else {
                targetElement.classList.remove('border-secondary');
                targetElement.classList.add('border-white/40');
                if (input.id === 'contact-input') {
                    input.closest('.flex').classList.remove('border-secondary');
                    input.closest('.flex').classList.add('border-white/40');
                }
            }
        }
    });

    // Special validation for gender and programme
    if (step === 1 && !genderInput.value) isValid = false;
    if (step === 3 && !programmeInput.value) isValid = false;

    return isValid;
};

// Next/Prev Handlers
nextBtn.addEventListener('click', () => {
    if (validateStep(currentStep)) {
        currentStep++;
        updateUI();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // Shake form container for feedback
        const container = document.getElementById('form-container');
        container.classList.add('animate-shake');
        setTimeout(() => container.classList.remove('animate-shake'), 500);
    }
});

prevBtn.addEventListener('click', () => {
    currentStep--;
    updateUI();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Form Submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
        const formData = new FormData(form);
        const data = {
            formType: 'Registration',
            studentName: formData.get('studentName') || '',
            guardianName: formData.get('guardianName') || '',
            class: formData.get('class') || '',
            board: (formData.get('board') === 'Other' ? formData.get('otherBoard') : formData.get('board')) || '',
            school: formData.get('school') || '',
            contact: formData.get('contact') || '',
            gender: formData.get('gender') || '',
            programme: formData.get('programme') || '',
            source: formData.get('source') || ''
        };

        // 1. Show Success Screen IMMEDIATELY (No waiting)
        const studentName = data.studentName;
        document.getElementById('success-student-name').textContent = studentName;
        successScreen.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Confetti
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0d1658', '#e01b29', '#f8be06']
        });

        // 2. Prepare WhatsApp message as backup
        const waMessage = `*New Registration from Website*%0A` +
            `*Name:* ${data.studentName}%0A` +
            `*Guardian:* ${data.guardianName}%0A` +
            `*Class:* ${data.class}%0A` +
            `*Board:* ${data.board}%0A` +
            `*School:* ${data.school}%0A` +
            `*Contact:* ${data.contact}%0A` +
            `*Programme:* ${data.programme}`;
        
        // Add WhatsApp button to success screen dynamically
        const successContent = successScreen.querySelector('.glass');
        const existingWA = document.getElementById('wa-backup-btn');
        if (!existingWA) {
            const waBtn = document.createElement('a');
            waBtn.id = 'wa-backup-btn';
            waBtn.href = `https://wa.me/917488590994?text=${waMessage}`;
            waBtn.target = '_blank';
            waBtn.className = 'flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] text-white rounded-xl font-bold mt-6 sketchy-border-sm';
            waBtn.innerHTML = '<i data-lucide="message-circle"></i> Confirm on WhatsApp (Optional)';
            successContent.appendChild(waBtn);
            lucide.createIcons();
        }

        // 3. Send to Google Sheets via Google Apps Script
        // Replace this URL with your Google Apps Script Web App URL
        const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbylaC-WE5ufXDfWWR4bokZYqI174yVD2a39LtuQaUlfBHcF5l0lB4wbNR72RCvZPPvX/exec';
        
        fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors', // Important for Google Apps Script
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).catch(err => console.log('Background sync failed:', err));
    }
});

// Reset Form
resetBtn.addEventListener('click', () => {
    form.reset();
    genderBtns.forEach(b => b.classList.remove('selected'));
    courseCards.forEach(c => c.classList.remove('selected'));
    genderInput.value = '';
    programmeInput.value = '';
    
    // Reset custom dropdowns
    dropdowns.forEach(dropdown => {
        const selectedText = dropdown.querySelector('.selected-text');
        const hiddenInput = dropdown.querySelector('input[type="hidden"]');
        const defaultText = dropdown.id === 'dropdown-class' ? 'Select Class' : 
                          dropdown.id === 'dropdown-board' ? 'Select Board' : 'Select Option';
        
        selectedText.textContent = defaultText;
        selectedText.classList.add('text-gray-400');
        selectedText.classList.remove('text-gray-900');
        hiddenInput.value = '';
    });

    // Reset Other Board
    document.getElementById('other-board-container').classList.add('hidden');
    document.getElementById('other-board-container').querySelector('input').removeAttribute('required');

    currentStep = 1;
    successScreen.classList.add('hidden');
    updateUI();
});

// Shake & Progress Animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    .animate-shake {
        animation: shake 0.2s ease-in-out 0s 2;
    }
    @keyframes progress-glow {
        0% { box-shadow: 0 0 0 rgba(13, 22, 88, 0); }
        50% { box-shadow: 0 0 20px rgba(13, 22, 88, 0.4); }
        100% { box-shadow: 0 0 0 rgba(13, 22, 88, 0); }
    }
    .progress-success {
        animation: progress-glow 1s ease-in-out;
        background-color: #22c55e !important; /* Green for success moment */
        transition: background-color 0.5s ease;
    }
`;
document.head.appendChild(style);

// Initial UI Update
updateUI();
