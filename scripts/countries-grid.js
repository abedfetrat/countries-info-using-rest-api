const countriesGrid = document.getElementById('countries-grid');

function handleCountryClick(country) {
    // Save country object to session storage to be retrived in details page
    const jsonCountry = JSON.stringify(country);
    sessionStorage.setItem('country', jsonCountry);
    // Navigate to detials page
    window.location.href = '/details.html';
}

function createCountryElement(country) {
    const flag = country.flags && country.flags.png ? country.flags.png : '';
    const name = country.name && country.name.common ? country.name.common : '';
    const population = country.population ? country.population.toLocaleString() : '';
    const region = country.region ? country.region : '';
    const capital = country.capital ? country.capital.join(', ') : '';

    const card = document.createElement('a');
    card.classList.add('country-card-wrapper');
    card.href = '#';
    card.addEventListener('click', _ => handleCountryClick(country));
    card.innerHTML = `
        <article class="country-card">
            <img
                src="${flag}"
                alt="Flag of ${name}"
                class="country-card__image"
            />
            <div class="country-card__body">
                <h2 class="country-card__title">${name}</h2>
                <ul class="country-card__facts">
                    <li><span>Population: </span>${population}</li>
                    <li><span>Region: </span>${region}</li>
                    <li><span>Capital: </span>${capital}</li>
                </ul>
            </div> 
        </article>
    `;
    return card;
}

export default function populateCountriesGrid(countries) {
    countriesGrid.innerHTML = '';
    countries.forEach(country => {
        const countryElement = createCountryElement(country);
        countriesGrid.appendChild(countryElement);
    });
}

function createLoadingCardElement() {
    const card = document.createElement('div');
    card.classList.add('country-card-wrapper');
    card.innerHTML = `
        <div class="country-card is-loading">
            <div class="country-card__image"></div>
            <div class="country-card__body">
                <div class="country-card__title"></div>
                <div class="country-card__facts"></div>
            </div>
        </div>
    `;
    return card;
}

function populateWithLoadingCards() {
    countriesGrid.innerHTML = '';
    for (let i = 0; i < 12; i++) {
        const card = createLoadingCardElement();
        countriesGrid.appendChild(card);
    }
}

populateWithLoadingCards();
