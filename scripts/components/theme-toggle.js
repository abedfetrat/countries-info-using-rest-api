export default function ThemeToggle(themeToggleElement) {
    themeToggleElement.addEventListener('click', e => {
        document.body.classList.toggle('dark-mode');
        const darkMode = localStorage.getItem('dark-mode');
        if (darkMode) {
            localStorage.removeItem('dark-mode')
        } else {
            localStorage.setItem('dark-mode', 'true');
        }
    });
}