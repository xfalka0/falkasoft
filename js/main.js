document.addEventListener('DOMContentLoaded', () => {

    // --- Multi-Language Logic & Modal ---
    const langModal = document.getElementById('language-modal');
    const langButtons = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('[data-tr][data-en]');

    // Check if user has already picked a language
    let currentLang = localStorage.getItem('siteLang');

    if (currentLang && langModal) {
        // Hide modal immediately if language is known
        langModal.classList.add('hidden');
        langModal.style.display = 'none';
        applyLanguage(currentLang);
    }

    // Handle language button click
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentLang = btn.getAttribute('data-lang');
            localStorage.setItem('siteLang', currentLang);
            applyLanguage(currentLang);

            // Hide modal smoothly
            langModal.classList.add('hidden');
            setTimeout(() => {
                langModal.style.display = 'none';
            }, 800); // Wait for CSS transition
        });
    });

    function applyLanguage(lang) {
        translatableElements.forEach(el => {
            const translatedText = el.getAttribute(`data-${lang}`);
            if (translatedText) {
                el.innerHTML = translatedText;
            }
        });

        // Ensure nav toggle text stays synced
        const navLangText = document.querySelector('#nav-lang-toggle .current-lang');
        if (navLangText) {
            navLangText.textContent = lang.toUpperCase();
        }
    }

    // --- Navbar Language Toggle Button ---
    const navLangToggle = document.getElementById('nav-lang-toggle');
    if (navLangToggle) {
        navLangToggle.addEventListener('click', () => {
            currentLang = (currentLang === 'tr') ? 'en' : 'tr';
            localStorage.setItem('siteLang', currentLang);
            applyLanguage(currentLang);

            // Re-trigger the typing effect updates
            words = getTypingWords();
            wordIndex = 0;
            charIndex = 0;
            isDeleting = false;
        });
    }

    // --- Sticky Navbar Setup ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Menüden bir linke tıklandığında menüyü kapat
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // --- Typing Effect for Hero Section ---
    const getTypingWords = () => {
        return ["AI-Powered Software Developer", "Indie App Developer", "Mobile & Web App Developer"];
    };

    let words = getTypingWords();
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector('.typing-text');

    // Update words if language changes (We'll capture it by re-checking dynamically if needed, 
    // but a page reload usually fixes big UI shifts. We can also listen to storage/clicks)
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            words = getTypingWords();
            wordIndex = 0;
            charIndex = 0;
            isDeleting = false;
        });
    });
    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = parseInt(isDeleting ? 50 : 100);

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    if (typingElement) {
        setTimeout(typeEffect, 1000);
    }

    // --- Scroll Reveal Animasyonları ---
    const revealElements = document.querySelectorAll('.section-title, .about-container, .skills-category, .project-card, .contact-container');

    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- Active Link Highlight on Scroll ---
    const sections = document.querySelectorAll('section, header');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;

            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });

    // --- Basit Form Gönderim Engellemesi (Demo için) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
            btn.style.opacity = '0.8';
            btn.style.pointerEvents = 'none';

            // Simüle edilmiş API isteği
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Mesaj İletildi!';
                btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                }, 3000);
            }, 1500);
        });
    }

    // --- Premium Hero Logo Slider & Text Sync ---
    const slides = document.querySelectorAll('.hero-logo-slider .slide');
    const slideTexts = document.querySelectorAll('.hero-slider-text .slide-text');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            // Remove active from current
            slides[currentSlide].classList.remove('active');
            if (slideTexts.length > 0) slideTexts[currentSlide].classList.remove('active');

            // Increment
            currentSlide = (currentSlide + 1) % slides.length;

            // Add active to next
            slides[currentSlide].classList.add('active');
            if (slideTexts.length > 0) slideTexts[currentSlide].classList.add('active');
        }, 4000); // 4 seconds interval for a steady, premium rotation
    }

    // --- High-Performance Mouse Tracking & Glow Effects ---
    const globalGlow = document.getElementById('global-glow');
    const glassPanels = document.querySelectorAll('.glass-panel');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    let isMouseMoving = false;
    let scheduledAnimationFrame = false;

    // Track cursor coordinates globally
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Show the global glow gracefully on initial mouse movement
        if (!isMouseMoving && globalGlow) {
            globalGlow.style.opacity = '0.8';
            isMouseMoving = true;
        }

        // --- Reactive Glass Panel Inner Glow ---
        // Debounce inner glow updates via RAF for 60fps performance without Jank
        if (!scheduledAnimationFrame) {
            scheduledAnimationFrame = true;
            requestAnimationFrame(() => {
                glassPanels.forEach(panel => {
                    const rect = panel.getBoundingClientRect();
                    const x = mouseX - rect.left;
                    const y = mouseY - rect.top;

                    panel.style.setProperty('--mouse-x', `${x}px`);
                    panel.style.setProperty('--mouse-y', `${y}px`);
                });
                scheduledAnimationFrame = false;
            });
        }
    });

    // The Global Glow uses a continuous RAF loop to LERP (Linear Interpolate) towards the cursor
    if (globalGlow) {
        function animateGlobalGlow() {
            // Apply a low damping factor (0.04) for an ultra-smooth, premium "trailing" feel
            glowX += (mouseX - glowX) * 0.04;
            glowY += (mouseY - glowY) * 0.04;

            // GPU-accelerated translate3d
            globalGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate3d(-50%, -50%, 0)`;

            requestAnimationFrame(animateGlobalGlow);
        }
        animateGlobalGlow();
    }

    // --- Dynamic Scroll Background Gradient ---
    const bgGradientLayer = document.getElementById('bg-scroll-layer');
    if (bgGradientLayer) {
        let scrollRAF = false;

        window.addEventListener('scroll', () => {
            if (!scrollRAF) {
                requestAnimationFrame(() => {
                    // Calculate scroll percentage (0 to 1)
                    const scrollTop = window.scrollY || document.documentElement.scrollTop;
                    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                    const scrollPercent = Math.min(Math.max(scrollTop / maxScroll, 0), 1);

                    // Move background position from 0% at top to 100% at bottom
                    bgGradientLayer.style.backgroundPosition = `0% ${scrollPercent * 100}%`;

                    scrollRAF = false;
                });
                scrollRAF = true;
            }
        });
    }
});
