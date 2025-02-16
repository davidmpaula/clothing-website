document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const messageInput = document.getElementById('message');
    const charCount = document.createElement('div');
    charCount.className = 'char-count';
    messageInput.parentNode.appendChild(charCount);

    // Create toast container
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);

    // Show toast message
    const showToast = (message, type) => {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);

        // Animate toast
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // Real-time validation
    const validateInput = (input) => {
        const value = input.value.trim();
        const label = input.previousElementSibling;
        
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                input.classList.add('invalid');
                label.dataset.error = 'Please enter a valid email';
                return false;
            }
        }
        
        if (value === '') {
            input.classList.add('invalid');
            label.dataset.error = 'This field is required';
            return false;
        }

        input.classList.remove('invalid');
        delete label.dataset.error;
        return true;
    };

    // Character counter
    messageInput.addEventListener('input', () => {
        const remaining = 500 - messageInput.value.length;
        charCount.textContent = `${remaining} characters remaining`;
        charCount.className = `char-count ${remaining < 50 ? 'warning' : ''}`;
    });

    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const button = contactForm.querySelector('button');
        
        // Validate all inputs
        let isValid = true;
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            if (!validateInput(input)) isValid = false;
        });

        if (!isValid) {
            showToast('Please check all fields', 'error');
            return;
        }

        button.classList.add('loading');
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            showToast('Message sent successfully!', 'success');
            contactForm.reset();
            charCount.textContent = '500 characters remaining';
        } catch (error) {
            showToast('Failed to send message', 'error');
        } finally {
            button.classList.remove('loading');
        }
    });

    // Real-time validation on blur
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', () => validateInput(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                validateInput(input);
            }
        });
    });
});