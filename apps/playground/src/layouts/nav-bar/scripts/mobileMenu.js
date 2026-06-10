const setupMobileMenu = () => {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!mobileToggle || !mobileMenu || mobileToggle.dataset.bound) return;
  mobileToggle.dataset.bound = 'true';

  const closeMenu = () => {
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('data-open', 'false');
  };

  mobileToggle.addEventListener('click', () => {
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
    mobileMenu.setAttribute('data-open', String(!isExpanded));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
};

setupMobileMenu();
document.addEventListener('astro:after-swap', setupMobileMenu);
document.addEventListener('astro:page-load', setupMobileMenu);
