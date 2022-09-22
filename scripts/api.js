const baseApiEndpoint = 'https://restcountries.com/v2';

function sortCountries(countries) {
    return countries.sort((firstCountry, secondCountry) => {
        const firstCountryName = firstCountry.name;
        const secondCountryName = secondCountry.name;
        return firstCountryName.localeCompare(secondCountryName);
    });
}

export async function fetchAllCountries() {
    const allCountriesEndpoint = '/all';
    const searchParams = '?fields=flags,name,population,region,capital,alpha3Code'
    const urlToFetch = baseApiEndpoint + allCountriesEndpoint + searchParams;
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

async function fetchCountriesByCode(codes) {
    const alphaEndpoint = '/alpha';
    let searchParams = '?codes=';

    searchParams += codes.join(',');

    const urlToFetch = baseApiEndpoint + alphaEndpoint + searchParams;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const countries = await response.json();
            return countries;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function fetchCountryByCode(code) {
    const alphaEndpoint = '/alpha';
    const searchParam = '/' + code;
    const urlToFetch = baseApiEndpoint + alphaEndpoint + searchParam;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const country = await response.json();
            if (country.borders) {
                const borderCountries = await fetchCountriesByCode(country.borders);
                country.borderCountries = borderCountries;
            }
            return country;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}