import Dropdown from "./dropdown.js";
import SearchBar from "./search-bar.js";
import ThemeToggle from "./theme-toggle.js";

function init() {
    // get and apply saved theme preference
    const theme = localStorage.getItem('theme');
    if (theme) {
        document.body.dataset.theme = theme;
    }
}

function setupComponents() {
    const themeToggleElement = document.getElementById('theme-toggle');
    new ThemeToggle(themeToggleElement);

    const searchBarElement = document.getElementById('search-bar');
    new SearchBar(searchBarElement); 

    const dropDownElement = document.getElementById('region-dropdown');
    new Dropdown(dropDownElement);
}

init();
setupComponents();