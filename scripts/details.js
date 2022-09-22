// UI Elements
const flagImage = document.getElementById('country-flag');
const countryNameElement = document.getElementById('country-name');
const countryDetailsContainer = document.getElementById('country-details');
const borderCountriesContainer = document.getElementById('border-countries');

let country;

function populateCountryDetails() {
    const nativeName = country.nativeName;
    const population = country.population?.toLocaleString();
    const region = country.region;
    const subRegion = country.subregion;
    const capital = country.capital;
    const topLevelDomain = country.topLevelDomain?.join(', ');
    const currencies = country.currencies?.map(curr => curr.name).join(', ');
    const languages = country.languages?.map(lang => lang.name).join(', ');

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
}

function populateBorderCountries() {
    const borderCountries = country.borderCountries;
    
    borderCountriesContainer.innerHTML = " <p>Border Countries: </p>";
    const list = document.createElement('ul');
    const items = borderCountries.map(borderCountry => {
        const item = document.createElement('li');
        item.innerHTML = borderCountry.name;
        item.addEventListener('click', _ => {
            country = borderCountry;
            populateUI();
        });
        return item;
    });
    items.forEach(item => {
        list.appendChild(item);
    })
    borderCountriesContainer.appendChild(list);
}

function populateUI() {
    // Data
    const flag = country.flags?.png;
    const name = country.name;

    // Populate UI elements with data
    flagImage.src = flag;
    flagImage.alt = `Flag of ${name}`;

    countryNameElement.innerText = name;

    populateCountryDetails();
    
    const borderCountries = country.borderCountries;
    if (borderCountries) {
        populateBorderCountries();
    }
}

function retriveCountryDataAndPopulateUI() {
    const countryJSON = sessionStorage.getItem('country');
    country = JSON.parse(countryJSON);
    const borders = country.borders;
    if (borders) {
        const countriesJSON = sessionStorage.getItem('countries');
        const countries = JSON.parse(countriesJSON);
        const borderCountries = countries.filter(country => {
            return borders.includes(country.alpha3Code) || borders.includes(country.alpha2Code);
        });
        country.borderCountries = borderCountries;
    }
    populateUI();
}

retriveCountryDataAndPopulateUI();