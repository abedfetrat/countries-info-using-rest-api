import populateCountriesGrid from "./countries-grid.js";
import { fetchAllCountries } from "./api.js";
import Dropdown from "./dropdown.js";
import SearchBar from "./search-bar.js";
import ThemeToggle from "./theme-toggle.js";

let countries = [];
let searchQuery = '';
let selectedRegion;

function applySavedThemePreference() {
    const darkMode = localStorage.getItem('dark-mode');
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
}

function retriveCountriesAndPopulateUI() {
    fetchAllCountries().then(fetchedCountries => {
        if (fetchedCountries) {
            countries = fetchedCountries;
            populateCountriesGrid(countries);
        }
    });
}

function filterCountries() {
    return countries.filter(country => {
        const name = country.name.common.toLowerCase();
        const region = country.region.toLowerCase();
        if (selectedRegion) {
            return region == selectedRegion && name.includes(searchQuery);
        } else {
            return name.includes(searchQuery);
        }
    });
}

function handleSearchBarInput(input) {
    searchQuery = input.toLowerCase();
    const filteredCountries = filterCountries();
    populateCountriesGrid(filteredCountries);
}

function handleDropdownSelect(selectedOption) {
    selectedRegion = selectedOption;
    const filteredCountries = filterCountries();
    populateCountriesGrid(filteredCountries);
}

function init() {
    applySavedThemePreference();
    retriveCountriesAndPopulateUI();
}

function setupComponents() {
    const themeToggleElement = document.getElementById('theme-toggle');
    new ThemeToggle(themeToggleElement);

    const searchBarElement = document.getElementById('search-bar');
    new SearchBar(searchBarElement, handleSearchBarInput);

    const dropDownElement = document.getElementById('region-dropdown');
    new Dropdown(dropDownElement, handleDropdownSelect);
}

init();
setupComponents();