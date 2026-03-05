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
})();
