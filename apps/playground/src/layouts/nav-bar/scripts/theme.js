const getThemePreference = () => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
        return localStorage.getItem('theme');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (theme) => {
    const root = document.documentElement;
    if (theme === 'dark') {
        root.classList.remove('light');
        root.dataset.theme = 'dark';
    } else {
        root.classList.add('light');
        root.dataset.theme = 'light';
    }
    localStorage.setItem('theme', theme);
};

const setupThemeToggle = () => {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle || themeToggle.dataset.bound) return;
    themeToggle.dataset.bound = 'true';
    themeToggle.addEventListener('click', () => {
        const isDark = !document.documentElement.classList.contains('light');
        applyTheme(isDark ? 'light' : 'dark');
    });
};

setupThemeToggle();
document.addEventListener('astro:after-swap', setupThemeToggle);
document.addEventListener('astro:page-load', setupThemeToggle);
