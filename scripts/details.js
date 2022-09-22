import { fetchCountryByCode } from "./api.js";

let country;

function retriveCountryData() {
    const countryCode = sessionStorage.getItem('country-code');
    fetchCountryByCode(countryCode).then(fetchedCountry => {
        if (fetchedCountry) {
            country = fetchedCountry;
            populateUI();
        }
    });
}

function populateUI() {
    // Data
    const flag = country.flags?.png;
    const name = country.name;
    const nativeName = country.nativeName;
    const population = country.population?.toLocaleString();
    const region = country.region;
    const subRegion = country.subregion;
    const capital = country.capital;
    const topLevelDomain = country.topLevelDomain?.join(', ');
    const currencies = country.currencies?.map(curr => curr.name).join(', ');
    const languages = country.languages?.map(lang => lang.name).join(', ');
    const borderCountries = country.borderCountries;
    // UI Elements
    const flagImage = document.getElementById('country-flag');
    const countryNameElement = document.getElementById('country-name');
    const countryDetailsContainer = document.getElementById('country-details');
    const borderCountriesContainer = document.getElementById('border-countries');

    // Populate UI elements with data
    flagImage.src = flag;
    flagImage.alt = `Flag of ${name}`;

    countryNameElement.innerText = name;

    countryDetailsContainer.innerHTML = `
        <ul>
            <li><span>Native Name: </span>${nativeName}</li>
            <li><span>Population: </span>${population}</li>
            <li><span>Region: </span>${region}</li>
            <li><span>Sub Region: </span>${subRegion}</li>
            <li><span>Capital: </span>${capital}</li>
        </ul>
        <ul>
            <li><span>Top Level Domain: </span>${topLevelDomain}</li>
            <li><span>Currencies: </span>${currencies}</li>
            <li><span>Languages: </span>${languages}</li>
        </ul>
    `;

    if (borderCountries) {
        borderCountriesContainer.innerHTML = `
            <p>Border Countries: </p>
            <ul>
                ${borderCountries.map(country => `<li>${country.name}</li>`).join('\n')}
            </ul>
        `;
    }

    document.body.classList.remove('is-loading');
}

retriveCountryData();