document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle?.querySelector('i');
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');
    const modalLink = document.getElementById('modal-link');
    const closeModalBtn = document.querySelector('.close-btn');
    const sections = document.querySelectorAll('.fade-in');
    const navLinks = document.querySelectorAll('.nav-links a');
    const subtitle = document.querySelector('.subtitle');

    // Theme toggle
    themeToggle?.addEventListener('click', function () {
        body.classList.toggle('dark-theme');

        // Change theme icon
        if (themeIcon) {
            themeIcon.classList.toggle('fa-moon');
            themeIcon.classList.toggle('fa-sun');
        }

        // Optionally save theme preference in localStorage
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        if (themeIcon) {
            themeIcon.classList.add('fa-sun');
            themeIcon.classList.remove('fa-moon');
        }
    }

    // Image click to show modal with link
    document.querySelectorAll('.cert-img').forEach(img => {
        img.addEventListener('click', function () {
            const certLink = this.getAttribute('data-link');
            if (certLink && modal && modalText && modalLink) {
                modalText.textContent = "You are viewing the certificate.";
                modalLink.href = certLink;
                modal.style.display = 'block';
            }
        });
    });

    // Close modal
    closeModalBtn?.addEventListener('click', function () {
        if (modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal when clicking outside content
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Smooth scrolling for navigation links with transition
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    // Add transition class to body
                    body.classList.add('page-transition');

                    // Delay scrolling to allow transition effect
                    setTimeout(() => {
                        targetSection.scrollIntoView({ behavior: 'smooth' });

                        // Remove transition class after scrolling
                        setTimeout(() => {
                            body.classList.remove('page-transition');
                        }, 500); // Should match transition duration in CSS
                    }, 300); // Slight delay before scrolling
                }
            });
        });
    }

    // Fade-in effect for sections
    function checkFade() {
        const triggerBottom = window.innerHeight / 5 * 4;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < triggerBottom) {
                section.classList.add('appear');
            } else {
                section.classList.remove('appear');
            }
        });
    }

    if (sections.length > 0) {
        window.addEventListener('scroll', checkFade);
        checkFade(); // Check on initial load
    }

    // Typewriter effect for hero subtitle
    if (subtitle) {
        const subtitleText = subtitle.textContent;
        subtitle.textContent = '';

        let i = 0;
        function typeWriter() {
            if (i < subtitleText.length) {
                subtitle.textContent += subtitleText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        typeWriter();
    }
});
