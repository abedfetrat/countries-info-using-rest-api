const baseApiEndpoint = 'https://restcountries.com/v3.1';

function sortCountries(countries) {
    return countries.sort((firstCountry, secondCountry) => {
        const firstCountryName = firstCountry.name.common;
        const secondCountryName = secondCountry.name.common;
        return firstCountryName.localeCompare(secondCountryName);
    });
}

export async function fetchAllCountries() {
    const allCountriesEndpoint = '/all';
    const urlToFetch = baseApiEndpoint + allCountriesEndpoint;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const countries = await response.json();
            return sortCountries(countries);
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}