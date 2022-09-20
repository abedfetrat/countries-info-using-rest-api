function createBorderCountriesList(borders) {
    const list = document.createElement('ul');
    for (let i = 0; i < borders.length; i++) {
        const item = document.createElement('li');
        item.innerHTML = borders[i];
        list.appendChild(item);
    }
    return list;
}

function retriveCountryData() {
    const jsonString = sessionStorage.getItem('country');
    const countryObject = JSON.parse(jsonString);
    return countryObject;
}

function populateUI() {
    const country = retriveCountryData();

    console.log(country);

    // Data
    const flag = country.flags ? country.flags.png : '';
    const name = country.name ? country.name.common : '';
    const nativeName = country.name ? country.name.native : '';
    const population = country.population ? country.population.toLocaleString() : '';
    const region = country.region;
    const subRegion = country.subregion;
    const capital = country.capital ? country.capital.join(', ') : '';
    const topLevelDomain = country.tld ? country.tld.join(', ') : '';
    const currencies = country.currencies ? Object.values(country.currencies).join(', ') : '';
    const languages = country.languages ? Object.values(country.languages).join(', ') : '';
    const borders = country.borders;
    // UI Elements
    const countryFlagImage = document.getElementById('country-flag');
    const countryNameElement = document.getElementById('country-name');
    const countryDetailsContainer = document.getElementById('country-details');
    const borderCountriesContainer = document.getElementById('border-countries');
    
    // Populate UI elements with data
    countryFlagImage.src = flag;
    countryFlagImage.alt = `Flag of ${name}`;

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

    const borderCountriesList = createBorderCountriesList(borders);
    borderCountriesContainer.appendChild(borderCountriesList);
}       

populateUI();