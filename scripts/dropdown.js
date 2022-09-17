export default function Dropdown(dropdownElement) {
    const trigger = dropdownElement.querySelector('.dropdown__trigger');
    trigger.addEventListener('click', e => {
        console.log(dropdownElement.dataset)
        if (dropdownElement.dataset.toggled === '') {
            delete dropdownElement.dataset.toggled;
        } else {
            dropdownElement.dataset.toggled = '';
        }
    });
    document.body.addEventListener('click', e => {
        const isClickOnElement = e.target === dropdownElement || dropdownElement.contains(e.target);
        if (!isClickOnElement) {
            delete dropdownElement.dataset.toggled;
        }
    });
}