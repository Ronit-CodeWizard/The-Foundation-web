// Initialize Lucide Icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

const form = document.getElementById('demo-form');
const contactInput = document.getElementById('contact');
const altContactInput = document.getElementById('altContact');
const contactError = document.getElementById('contact-error');
const formContent = document.getElementById('demo-form-content');
const successScreen = document.getElementById('success-screen');
const successName = document.getElementById('success-name');

// Numeric only for phone inputs
[contactInput, altContactInput].forEach(input => {
    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
});

// Validation for same contact numbers
const validateContacts = () => {
    const contact = contactInput.value.trim();
    const altContact = altContactInput.value.trim();

    if (contact && altContact && contact === altContact) {
        contactError.classList.remove('hidden');
        altContactInput.classList.add('border-secondary');
        return false;
    } else {
        contactError.classList.add('hidden');
        altContactInput.classList.remove('border-secondary');
        return true;
    }
};

altContactInput.addEventListener('input', validateContacts);
contactInput.addEventListener('input', validateContacts);

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateContacts()) {
        return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i data-lucide="loader-2" class="animate-spin w-4 h-4"></i> Processing...';
    lucide.createIcons();

    const formData = new FormData(form);
    const name = formData.get('studentName');
    
    const data = {
        formType: 'Demo Booking',
        studentName: name,
        class: formData.get('class') || '',
        contact: formData.get('contact') || '',
        altContact: formData.get('altContact') || '',
        source: 'Demo Form'
    };

    // Show success screen
    successName.textContent = name;
    formContent.classList.add('hidden');
    successScreen.classList.remove('hidden');

    // Scroll to top of form
    document.getElementById('form-container').scrollIntoView({ behavior: 'smooth' });

    // Send to Google Sheets via Google Apps Script
    const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbylaC-WE5ufXDfWWR4bokZYqI174yVD2a39LtuQaUlfBHcF5l0lB4wbNR72RCvZPPvX/exec';
    
    fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).catch(err => console.log('Background sync failed:', err));

    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
    lucide.createIcons();
});
