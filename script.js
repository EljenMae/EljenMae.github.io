// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// ===== Mobile Menu Toggle =====
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuIcon.classList.toggle('bx-x');
});

// Close menu when a link is clicked
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    });
});

// ===== Counter Animation =====
const counters = document.querySelectorAll('.counter');
const speed = 200;
let hasAnimated = false;

const runCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;

        const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Trigger counter animation when about section is in view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            runCounters();
            hasAnimated = true;
        }
    });
}, observerOptions);

const aboutSection = document.querySelector('.about');
if (aboutSection) observer.observe(aboutSection);

// ===== Animate Skill Bars =====
const skillFills = document.querySelectorAll('.skill-fill');

skillFills.forEach(fill => {
    const width = fill.dataset.width || fill.getAttribute('data-width');
    if (width) fill.style.width = width;
});

// ===== Portfolio Filter =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioBoxes = document.querySelectorAll('.portfolio-container .box');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioBoxes.forEach(box => {
            if (filterValue === 'all' || box.getAttribute('data-filter') === filterValue) {
                box.style.display = 'block';
                box.style.animation = 'fadeIn 0.5s ease-in';
            } else {
                box.style.display = 'none';
            }
        });
    });
});

// ===== Dark Mode Toggle =====
const themeToggle = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = htmlElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeToggle.classList.remove('bx-moon');
        themeToggle.classList.add('bx-sun');
    } else {
        themeToggle.classList.remove('bx-sun');
        themeToggle.classList.add('bx-moon');
    }
}

// ===== EmailJS Integration =====
emailjs.init('YOUR_PUBLIC_KEY_HERE'); // Replace with your actual EmailJS public key

const contactForm = document.getElementById('contact-form');
const sendBtn = document.getElementById('send-btn');
const formFeedback = document.getElementById('form-feedback');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        sendBtn.disabled = true;
        sendBtn.innerHTML = '<i class="bx bx-loader-circle"></i> Sending...';

        const templateParams = {
            from_name: document.getElementById('from_name').value,
            from_email: document.getElementById('from_email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        emailjs.send('YOUR_SERVICE_ID_HERE', 'YOUR_TEMPLATE_ID_HERE', templateParams)
            .then(() => {
                formFeedback.textContent = '✅ Message sent successfully!';
                formFeedback.style.color = '#00d4ff';
                contactForm.reset();
                sendBtn.disabled = false;
                sendBtn.innerHTML = '<span>Send Message</span><i class="bx bx-send"></i>';
                
                setTimeout(() => {
                    formFeedback.textContent = '';
                }, 5000);
            })
            .catch(() => {
                formFeedback.textContent = '❌ Failed to send message. Try again!';
                formFeedback.style.color = '#ff6b6b';
                sendBtn.disabled = false;
                sendBtn.innerHTML = '<span>Send Message</span><i class="bx bx-send"></i>';
            });
    });
}

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});