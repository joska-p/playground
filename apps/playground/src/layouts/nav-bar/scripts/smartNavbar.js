const SCROLL_THRESHOLD = 80; // px from top before hiding kicks in
const IDLE_DELAY = 2000; // ms before hiding after scroll stops

let smartNavScrollHandler = null;

const setupSmartNavbar = () => {
  const header = document.querySelector('header');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!header) return;

  if (smartNavScrollHandler) {
    window.removeEventListener('scroll', smartNavScrollHandler);
    smartNavScrollHandler = null;
  }

  let hideTimer = null;
  let isHovered = false;

  const isMobileMenuOpen = () =>
    mobileMenu?.getAttribute('data-open') === 'true';

  const showNavbar = () => {
    header.style.transform = 'translateY(0)';
    header.style.opacity = '1';
    header.style.pointerEvents = 'auto';
  };

  const hideNavbar = () => {
    header.style.transform = 'translateY(-110%)';
    header.style.opacity = '0';
    header.style.pointerEvents = 'none';
  };

  const scheduleHide = () => {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (
        !isHovered &&
        !isMobileMenuOpen() &&
        window.scrollY > SCROLL_THRESHOLD
      ) {
        hideNavbar();
      }
    }, IDLE_DELAY);
  };

  header.addEventListener('mouseenter', () => {
    isHovered = true;
    showNavbar();
    clearTimeout(hideTimer);
  });

  header.addEventListener('mouseleave', () => {
    isHovered = false;
    if (window.scrollY > SCROLL_THRESHOLD && !isMobileMenuOpen()) {
      scheduleHide();
    }
  });

  smartNavScrollHandler = () => {
    if (window.scrollY <= SCROLL_THRESHOLD) {
      showNavbar();
      clearTimeout(hideTimer);
    } else {
      showNavbar();
      scheduleHide();
    }
  };

  window.addEventListener('scroll', smartNavScrollHandler, { passive: true });
};

setupSmartNavbar();
document.addEventListener('astro:after-swap', setupSmartNavbar);
document.addEventListener('astro:page-load', setupSmartNavbar);
