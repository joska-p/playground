let hideTimer = null;
let isHovered = false;
let lastScrollY = window.scrollY;

const setupSmartNavbar = () => {
    const header = document.querySelector('header');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!header) return;

    const SCROLL_THRESHOLD = 40;
    const IDLE_DELAY = 2000;

    const isMobileMenuOpen = () => mobileMenu?.getAttribute('data-open') === 'true';

    const showNavbar = () => {
        header.removeAttribute('data-hidden');
    };

    const hideNavbar = () => {
        if (window.scrollY > SCROLL_THRESHOLD && !isHovered && !isMobileMenuOpen()) {
            header.setAttribute('data-hidden', 'true');
        }
    };

    const scheduleHide = () => {
        clearTimeout(hideTimer);
        if (window.scrollY > SCROLL_THRESHOLD) {
            hideTimer = setTimeout(() => {
                if (!isHovered && !isMobileMenuOpen()) {
                    hideNavbar();
                }
            }, IDLE_DELAY);
        }
    };

    header.addEventListener('mouseenter', () => {
        isHovered = true;
        showNavbar();
        clearTimeout(hideTimer);
    });

    header.addEventListener('mouseleave', () => {
        isHovered = false;
        if (window.scrollY > SCROLL_THRESHOLD) {
            scheduleHide();
        }
    });

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY <= SCROLL_THRESHOLD) {
            showNavbar();
            clearTimeout(hideTimer);
        } else if (currentScrollY < lastScrollY) {
            // Scrolling UP -> show navbar immediately
            showNavbar();
            scheduleHide();
        } else if (currentScrollY > lastScrollY && currentScrollY > SCROLL_THRESHOLD) {
            // Scrolling DOWN -> schedule hide
            scheduleHide();
        }

        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
};

setupSmartNavbar();
document.addEventListener('astro:after-swap', setupSmartNavbar);
document.addEventListener('astro:page-load', setupSmartNavbar);
