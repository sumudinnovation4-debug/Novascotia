// Dark mode toggle
const themeToggle = document.getElementById('themeToggle');
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
}
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
}

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Contact form handler (only runs on contact.html)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        const messages = JSON.parse(localStorage.getItem('studioNovaMessages')) || [];
        messages.push({
            id: Date.now(),
            name,
            email,
            phone,
            message,
            date: new Date().toLocaleString()
        });
        localStorage.setItem('studioNovaMessages', JSON.stringify(messages));

        const feedback = document.getElementById('formFeedback');
        feedback.innerHTML = '<p>✓ Thank you! We\'ll respond within 48 hours.</p>';
        contactForm.reset();
        setTimeout(() => {
            feedback.innerHTML = '';
        }, 5000);
    });
}
