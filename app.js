(function () {
    'use strict';

    // Current year in footer
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Nav: set active link on scroll and click
    var navLinks = document.querySelectorAll('.main-nav .nav-link');
    var sections = document.querySelectorAll('section[id]');

    function setActiveNav() {
        var scrollY = window.pageYOffset;
        var current = '';
        sections.forEach(function (section) {
            var top = section.offsetTop - 100;
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
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Image lightbox: open on same page with transitions (no new tab)
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
        lightboxClose.focus();
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
        document.querySelectorAll('.img-lightbox-trigger').forEach(function (trigger) {
            trigger.addEventListener('click', function (e) {
                e.preventDefault();
                var src = this.getAttribute('data-src') || this.getAttribute('href');
                var alt = this.getAttribute('data-alt');
                if (!alt && this.querySelector('img')) alt = this.querySelector('img').getAttribute('alt') || '';
                if (src) openLightbox(src, alt);
            });
        });
        if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeLightbox();
        });
    }
})();
