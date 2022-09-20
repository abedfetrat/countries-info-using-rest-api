import ThemeToggle from "./components/theme-toggle.js";

function applySavedThemePreference() {
    const darkMode = localStorage.getItem('dark-mode');
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
}

function setupComponents() {
    const themeToggleElement = document.getElementById('theme-toggle');
    new ThemeToggle(themeToggleElement);
}

applySavedThemePreference();
setupComponents();