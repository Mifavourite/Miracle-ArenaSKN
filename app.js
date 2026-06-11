(function () {
    'use strict';

    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Hero image fallback
    var heroImage = document.querySelector('.hero-image');
    var heroPlaceholder = document.querySelector('.hero-image-placeholder');
    if (heroImage && heroPlaceholder) {
        heroImage.addEventListener('error', function () {
            heroImage.hidden = true;
            heroPlaceholder.hidden = false;
        });
    }

    // Next Sunday calendar links
    function getNextSunday() {
        var now = new Date();
        var next = new Date(now);
        var day = now.getDay();
        if (day === 0 && now.getHours() < 10) {
            next.setHours(10, 0, 0, 0);
            return next;
        }
        var daysUntil = day === 0 ? 7 : 7 - day;
        next.setDate(now.getDate() + daysUntil);
        next.setHours(10, 0, 0, 0);
        return next;
    }

    function formatGoogleCalendarDate(date) {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }

    function buildSundayCalendarUrl() {
        var start = getNextSunday();
        var end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
        var dates = formatGoogleCalendarDate(start) + '/' + formatGoogleCalendarDate(end);
        return (
            'https://calendar.google.com/calendar/render?action=TEMPLATE' +
            '&text=' + encodeURIComponent('Sunday Divine Worship — Miracle Arena Church St. Kitts') +
            '&dates=' + dates +
            '&details=' + encodeURIComponent('Join us for Sunday Morning Divine Worship at 10:00 AM.') +
            '&location=' + encodeURIComponent('Halfway Tree, St. Kitts and Nevis')
        );
    }

    var sundayCalLinks = [
        document.getElementById('add-sunday-calendar'),
        document.getElementById('add-sunday-calendar-2')
    ];
    var calendarUrl = buildSundayCalendarUrl();
    sundayCalLinks.forEach(function (link) {
        if (link) link.href = calendarUrl;
    });

    // Next service banner text
    var nextServiceBanner = document.getElementById('next-service-banner');
    if (nextServiceBanner) {
        var nextSun = getNextSunday();
        var options = { weekday: 'long', month: 'long', day: 'numeric' };
        nextServiceBanner.textContent =
            'Next Sunday service — ' + nextSun.toLocaleDateString('en-US', options) + ' at 10:00 AM';
    }

    // Mobile navigation
    var navToggle = document.querySelector('.nav-toggle');
    var navMenu = document.getElementById('nav-menu');

    function closeNav() {
        if (!navToggle || !navMenu) return;
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
        navMenu.classList.remove('is-open');
        document.body.classList.remove('nav-open');
    }

    function openNav() {
        if (!navToggle || !navMenu) return;
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.setAttribute('aria-label', 'Close menu');
        navMenu.classList.add('is-open');
        document.body.classList.add('nav-open');
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            var isOpen = navMenu.classList.contains('is-open');
            if (isOpen) closeNav();
            else openNav();
        });
    }

    // Nav: active link on scroll
    var navLinks = document.querySelectorAll('.main-nav .nav-link');
    var sections = document.querySelectorAll('section[id]');

    function setActiveNav() {
        var scrollY = window.pageYOffset;
        var current = '';
        sections.forEach(function (section) {
            var top = section.offsetTop - 120;
            var height = section.offsetHeight;
            if (scrollY >= top && scrollY < top + height) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(function (link) {
            var href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                var id = href.slice(1);
                if (id === current || (id === 'home' && !current)) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);
    setActiveNav();

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                var target = document.getElementById(href.slice(1));
                if (target) {
                    e.preventDefault();
                    closeNav();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // About tabs
    var aboutTabs = document.querySelectorAll('.about-tab');
    var aboutPanels = document.querySelectorAll('.about-panel');

    aboutTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var target = this.getAttribute('data-tab');
            aboutTabs.forEach(function (t) {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            aboutPanels.forEach(function (panel) {
                panel.classList.remove('active');
                panel.hidden = true;
            });
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            var panel = document.getElementById('about-panel-' + target);
            if (panel) {
                panel.classList.add('active');
                panel.hidden = false;
            }
        });
    });

    // Gallery show more
    var galleryToggle = document.getElementById('gallery-toggle');
    var galleryMore = document.getElementById('gallery-more');

    if (galleryToggle && galleryMore) {
        galleryToggle.addEventListener('click', function () {
            var showMore = galleryMore.hidden;
            galleryMore.hidden = !showMore;
            galleryToggle.setAttribute('aria-expanded', String(showMore));
            galleryToggle.textContent = showMore ? 'Show fewer albums' : 'Show more albums';
        });
    }

    // Hero carousel
    var heroSlides = document.querySelectorAll('.hero-slide');
    var heroDots = document.querySelectorAll('.hero-dot');
    var heroInterval = 5000;
    var heroTimer = null;
    var currentHeroIndex = 0;

    function setHeroSlide(index) {
        if (!heroSlides.length) return;
        currentHeroIndex = (index + heroSlides.length) % heroSlides.length;
        heroSlides.forEach(function (slide, i) {
            slide.classList.toggle('hero-slide-active', i === currentHeroIndex);
        });
        heroDots.forEach(function (dot, i) {
            dot.classList.toggle('active', i === currentHeroIndex);
        });
    }

    function nextHeroSlide() {
        setHeroSlide(currentHeroIndex + 1);
    }

    if (heroSlides.length && heroDots.length) {
        heroTimer = setInterval(nextHeroSlide, heroInterval);
        heroDots.forEach(function (dot) {
            dot.addEventListener('click', function () {
                var i = parseInt(this.getAttribute('data-index'), 10);
                if (!isNaN(i)) {
                    setHeroSlide(i);
                    clearInterval(heroTimer);
                    heroTimer = setInterval(nextHeroSlide, heroInterval);
                }
            });
        });
    }

    // Image lightbox (event delegation for dynamic gallery content)
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = lightbox && lightbox.querySelector('.lightbox-img');
    var lightboxBackdrop = lightbox && lightbox.querySelector('.lightbox-backdrop');
    var lightboxClose = lightbox && lightbox.querySelector('.lightbox-close');

    function openLightbox(src, alt) {
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = src;
        lightboxImg.alt = alt || 'Image';
        lightbox.removeAttribute('hidden');
        document.body.classList.add('lightbox-open');
        lightbox.classList.add('lightbox-visible');
        if (lightboxClose) lightboxClose.focus();
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('lightbox-visible');
        setTimeout(function () {
            lightbox.setAttribute('hidden', '');
            document.body.classList.remove('lightbox-open');
            if (lightboxImg) lightboxImg.removeAttribute('src');
        }, 280);
    }

    if (lightbox) {
        document.addEventListener('click', function (e) {
            var trigger = e.target.closest('.img-lightbox-trigger');
            if (!trigger) return;
            e.preventDefault();
            var src = trigger.getAttribute('data-src') || trigger.getAttribute('href');
            var alt = trigger.getAttribute('data-alt');
            if (!alt) {
                var img = trigger.querySelector('img');
                if (img) alt = img.getAttribute('alt') || '';
            }
            if (src) openLightbox(src, alt);
        });
        if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && lightbox.classList.contains('lightbox-visible')) {
                closeLightbox();
            }
        });
    }

    // Form success message from redirect
    if (window.location.search.indexOf('sent=1') !== -1) {
        var formSuccess = document.getElementById('form-success');
        if (formSuccess) {
            formSuccess.hidden = false;
            if (window.history.replaceState) {
                window.history.replaceState({}, '', window.location.pathname + '#contact');
            }
        }
    }

    // Escape closes mobile nav
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('is-open')) {
            closeNav();
            if (navToggle) navToggle.focus();
        }
    });
})();
