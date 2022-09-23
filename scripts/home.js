import { fetchAllCountries } from './api.js';
import populateCountriesGrid from './components/countries-grid.js';
import SearchBar from './components/search-bar.js';
import Dropdown from './components/dropdown.js';

const rootElement = document.documentElement;
let scrollToTopBtn;

let countries = [];
let searchQuery = '';
let selectedRegion;

function retriveCountriesAndPopulateUI() {
    const savedCountries = sessionStorage.getItem('countries');
    if (savedCountries) {
        countries = JSON.parse(savedCountries);
        populateCountriesGrid(countries);
    } else {
        fetchAllCountries().then(fetchedCountries => {
            if (fetchedCountries) {
                countries = fetchedCountries;
                populateCountriesGrid(countries);
                const countriesJSON = JSON.stringify(countries);
                sessionStorage.setItem('countries', countriesJSON);
            }
        });
    }
}

function filterCountries() {
    return countries.filter(country => {
        const name = country.name.toLowerCase();
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

function scrollToTop() {
    rootElement.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function setupComponents() {
    const searchBarElement = document.getElementById('search-bar');
    new SearchBar(searchBarElement, handleSearchBarInput);

    const dropDownElement = document.getElementById('region-dropdown');
    new Dropdown(dropDownElement, handleDropdownSelect);

    scrollToTopBtn = document.getElementById('scroll-to-top');
    scrollToTopBtn.addEventListener('click', scrollToTop);
}

retriveCountriesAndPopulateUI();
setupComponents();

// Detect scroll and show scroll to top button when amount scrolled is 
// is past the viewport height
document.addEventListener('scroll', e => {
    if (rootElement.scrollTop > rootElement.clientHeight) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});