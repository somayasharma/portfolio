/* ============================================================
   SAUMYA SHARMA PORTFOLIO — JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── CUSTOM CURSOR ──────────────────────────────────── */
    const cursor    = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursor-dot');

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top  = mouseY + 'px';
    });

    // Smooth cursor follow
    const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;
        cursor.style.left = cursorX + 'px';
        cursor.style.top  = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover effects
    const hoverEls = document.querySelectorAll('a, button, .skill-tags span, .tl-item, .cs-study');
    hoverEls.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });


    /* ── HEADER SCROLL STATE ────────────────────────────── */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });


    /* ── REVEAL ON SCROLL ────────────────────────────────── */
    const revealEls = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));


    /* ── ANIMATED COUNTERS ──────────────────────────────── */
    const counters = document.querySelectorAll('.impact-num[data-target]');

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const animateCounter = (el) => {
        const target   = parseInt(el.getAttribute('data-target'), 10);
        const duration = 1800;
        const start    = performance.now();

        const tick = (now) => {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const value    = Math.round(easeOutQuart(progress) * target);
            el.textContent = value;
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));


    /* ── SMOOTH ACTIVE NAV HIGHLIGHT ───────────────────── */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#header nav a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.style.color = link.getAttribute('href') === `#${entry.target.id}`
                        ? '#F5F5F0'
                        : '';
                });
            }
        });
    }, { rootMargin: '-40% 0px -40% 0px' });

    sections.forEach(s => sectionObserver.observe(s));

});
