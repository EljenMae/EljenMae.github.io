// ===== NAVBAR TOGGLE =====
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('header');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}
window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}
window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});


// ===== EMAILJS CONTACT FORM =====
const EMAILJS_PUBLIC_KEY   = 'NT2fNKhkTKi8nGIfI';
const EMAILJS_SERVICE_ID   = 'service_5z1ymh2';
const EMAILJS_TEMPLATE_ID  = 'template_7pn285r';  // Contact Us → sends to YOUR Gmail
const EMAILJS_AUTOREPLY_ID = 'template_dbznf9r';  // Auto-Reply → sends to the SENDER

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

const contactForm = document.getElementById('contact-form');
const sendBtn     = document.getElementById('send-btn');
const btnText     = document.getElementById('btn-text');
const feedback    = document.getElementById('form-feedback');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name    = document.getElementById('from_name').value.trim();
    const email   = document.getElementById('from_email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        showFeedback('Please fill in all required fields.', 'error');
        return;
    }

    // Loading state
    sendBtn.disabled = true;
    btnText.textContent = 'Sending...';
    feedback.textContent = '';
    feedback.className = 'form-feedback';

    const templateParams = {
        from_name:  name,
        from_email: email,
        subject:    document.getElementById('subject').value.trim(),
        message:    message
    };

    // Send Template 1 → to YOUR Gmail (main one, must succeed)
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(() => {
            // ✅ Main email sent — show success immediately
            showFeedback('✅ Message sent! I\'ll get back to you soon.', 'success');
            contactForm.reset();

            // Send auto-reply separately — silently, won't affect success message
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTOREPLY_ID, templateParams)
                .catch((err) => {
                    // Auto-reply failed silently — user already sees success
                    console.warn('Auto-reply failed:', err.text);
                });
        })
        .catch((error) => {
            console.error('EmailJS error status:', error.status);
            console.error('EmailJS error text:', error.text);

            if (error.status === 401) {
                showFeedback('❌ Invalid Public Key — check your EmailJS account.', 'error');
            } else if (error.status === 404) {
                showFeedback('❌ Service or Template ID not found — double check them.', 'error');
            } else if (error.status === 422) {
                showFeedback('❌ Template variables mismatch — check {{from_name}}, {{from_email}}, {{subject}}, {{message}} in your templates.', 'error');
            } else {
                showFeedback('❌ Error ' + error.status + ': ' + error.text, 'error');
            }
        })
        .finally(() => {
            sendBtn.disabled = false;
            btnText.textContent = 'Send Message';
        });
});

function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = 'form-feedback ' + type;
}


// ===== FOOTER EMAIL SUBSCRIPTION =====
const EMAILJS_FOOTER_TEMPLATE_ID = 'YOUR_FOOTER_TEMPLATE_ID';

const footerForm     = document.getElementById('footer-email-form');
const footerInput    = document.getElementById('footer-email-input');
const footerSendBtn  = document.getElementById('footer-send-btn');
const footerFeedback = document.getElementById('footer-feedback');

footerForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = footerInput.value.trim();
    if (!email) {
        showFooterFeedback('Please enter a valid email.', 'error');
        return;
    }

    footerSendBtn.disabled = true;
    footerFeedback.textContent = '';
    footerFeedback.className = 'footer-feedback';

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_FOOTER_TEMPLATE_ID, {
        subscriber_email: email
    })
    .then(() => {
        showFooterFeedback('✅ Thanks! I\'ll be in touch soon.', 'success');
        footerInput.value = '';
    })
    .catch((error) => {
        console.error('Footer EmailJS error:', error);
        showFooterFeedback('❌ Something went wrong. Try again.', 'error');
    })
    .finally(() => {
        footerSendBtn.disabled = false;
    });
});

function showFooterFeedback(message, type) {
    footerFeedback.textContent = message;
    footerFeedback.className = 'footer-feedback ' + type;
}