var themeToggle = document.getElementById('themeToggle'),
    floatingNav = document.getElementById('floatingNav'),
    scrollTimeout,
    navHovered = false;

themeToggle.addEventListener('click', function() {
  var h = document.documentElement, isLight = h.getAttribute('data-theme') === 'light';
  if (isLight) h.removeAttribute('data-theme'); else h.setAttribute('data-theme', 'light');
  themeToggle.querySelector('i').className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
});

function showNav() {
  floatingNav.classList.add('visible');
}
function scheduleHideNav() {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(function() {
    if (!navHovered) floatingNav.classList.remove('visible');
  }, 1500);
}

window.addEventListener('scroll', function() {
  showNav();
  scheduleHideNav();
}, { passive: true });

floatingNav.addEventListener('mouseenter', function() {
  navHovered = true;
  clearTimeout(scrollTimeout);
});
floatingNav.addEventListener('mouseleave', function() {
  navHovered = false;
  scheduleHideNav();
});

var revealEls = document.querySelectorAll('.reveal'),
    revealObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.08 });
revealEls.forEach(function(el) { revealObs.observe(el); });
setTimeout(function() {
  revealEls.forEach(function(el) {
    if (!el.classList.contains('visible')) el.classList.add('visible');
  });
}, 2000);

function showToast(type, title, desc) {
  var c = document.getElementById('toastContainer'),
      t = document.createElement('div'),
      icons = {
        info: 'fa-solid fa-circle-info text-primary',
        success: 'fa-solid fa-circle-check text-secondary',
        error: 'fa-solid fa-circle-xmark text-destructive'
      };
  t.className = 'toast-item bg-surface-raised rounded-lg p-4 w-72';
  t.style.boxShadow = 'var(--shadow-lg)';
  t.innerHTML = '<div class="flex gap-3"><i class="' + icons[type] + ' mt-0.5 text-xs"></i><div class="flex-1"><p class="text-foreground text-[13px] font-medium">' + title + '</p><p class="text-foreground-muted text-[11px] mt-1">' + desc + '</p></div><button onclick="dismissToast(this.parentElement.parentElement)" class="text-foreground-dim hover:text-foreground cursor-pointer border-0 bg-transparent p-1 text-xs"><i class="fa-solid fa-xmark"></i></button></div>';
  c.appendChild(t);
  setTimeout(function() { dismissToast(t); }, 4000);
}
function dismissToast(el) {
  if (!el || el.classList.contains('exit')) return;
  el.classList.add('exit');
  el.addEventListener('animationend', function() { el.remove(); });
}
