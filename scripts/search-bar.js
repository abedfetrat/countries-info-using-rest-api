export default function SearchBar(searchBarElement) {
    const input = searchBarElement.querySelector('input');
    input.addEventListener('input', e => {
        console.log(input.value);
        if (input.value && input.value.length > 0) {
            searchBarElement.dataset.hasInput = '';
        } else {
            delete searchBarElement.dataset.hasInput;
        }
    });
    const clear = searchBarElement.querySelector('.search-bar__clear');
    clear.addEventListener('click', e => {
        input.value = '';
        delete searchBarElement.dataset.hasInput;
    });
}