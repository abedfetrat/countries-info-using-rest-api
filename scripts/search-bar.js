export default function SearchBar(searchBarElement, inputCallback) {
    const input = searchBarElement.querySelector('input');
    input.addEventListener('input', e => {
        if (inputCallback != null)
            inputCallback(input.value);
        if (input.value && input.value.length > 0) {
            searchBarElement.classList.add('is-filled');
        } else {
            searchBarElement.classList.remove('is-filled');
        }
    });
    const clear = searchBarElement.querySelector('.search-bar__clear');
    clear.addEventListener('click', e => {
        input.value = '';
        if (inputCallback != null)
            inputCallback(input.value);
        searchBarElement.classList.remove('is-filled');
    });
}