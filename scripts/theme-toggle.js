export default function ThemeToggle(themeToggleElement) {
    themeToggleElement.addEventListener('click', e => {
        const root = document.body;
        if (root.dataset.theme === 'dark') {
            root.dataset.theme = 'light';
            localStorage.setItem('theme', 'light');
        } else {
            root.dataset.theme = 'dark';
            localStorage.setItem('theme', 'dark');
        }
    });
}