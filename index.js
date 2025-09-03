
const storage = chrome.storage.sync;
const runtime = chrome.runtime;

const topBar = document.querySelector('.AppHeader-globalBar-end');

const getTopBarContainer = () => document.querySelector('.AppHeader-globalBar-end');

const prependHtml = (name, attachTo) => {
    fetch(runtime.getURL(`html/${name}.html`))
    .then(resp => resp.text())
    .then(html => {
        const container = document.createElement('div')
        container.innerHTML = html;
        attachTo.prepend(container);
        return container;
    })
}


document.addEventListener('turbo:load', () => {
    console.log(`Loaded: ${document.readyState}`)

    const topBar = getTopBarContainer()

    const addButton = prependHtml('add-button', topBar);
    addButton.addEventListener('click', () => console.log('Button clicked'));
});
