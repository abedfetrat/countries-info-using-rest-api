export default function Dropdown(dropdownElement, optionSelectCallback) {
    const trigger = dropdownElement.querySelector('.dropdown__trigger');
    trigger.addEventListener('click', e => {
        dropdownElement.classList.toggle('show');
    });
    /* Close dropdown when click outside*/
    document.body.addEventListener('click', e => {
        const isClickOnElement = e.target === dropdownElement || dropdownElement.contains(e.target);
        if (!isClickOnElement) {
            close();
        }
    });
    const optionElements = dropdownElement.querySelector('.dropdown__options').childNodes;
    optionElements.forEach(el => el.addEventListener('click', e => {
        const optionElement = e.target;
        if (optionSelectCallback)
            optionSelectCallback(optionElement.dataset.value);
        const text = trigger.querySelector('.dropdown__text');
        text.innerText = optionElement.innerText;
        close();
    }));

    function close() {
        dropdownElement.classList.remove('show');
    }
}