import classes from '../stylesheets/searchMenu.module.css';
import loadIndex from './DOMLoader';
import { locationSearch } from './location';
import weatherData from "./weatherData.js";

const openMenu = (backgroundCover) => {
    backgroundCover.classList.remove(classes.invisible);
}

const closeMenu = (backgroundCover) => {
    backgroundCover.classList.add(classes.invisible);
}

const confirmMenu = async (backgroundCover, location) => {
    let weatherInfo = await weatherData(location);
    loadIndex(location, weatherInfo);
    closeMenu(backgroundCover);
}

const appendResultsList = async (city, state, country, resultsContainer, backgroundCover) => {
    const resultsList = await locationSearch(city, state, country);
    resultsContainer.textContent = '';
    resultsList.forEach(result => {
        let resultButton = document.createElement('button');
        resultButton.textContent = `${result.name}${result.state ? `, ${result.state},` : ',' } ${result.country}`;
        resultsContainer.appendChild(resultButton);
        resultButton.addEventListener('click', () => confirmMenu(backgroundCover, result));
        
    });
    if (resultsContainer.textContent === '') resultsContainer.textContent = 'No Results';
}

const createMenu = () => {
    const backgroundCover =  document.createElement('div');
    const searchMenu = document.createElement('div');

    backgroundCover.classList.add(classes.backgroundCover);
    backgroundCover.classList.add(classes.invisible);
    backgroundCover.classList.add(classes.center);
    searchMenu.classList.add(classes.searchMenu);
    searchMenu.classList.add(classes.center);

    backgroundCover.appendChild(searchMenu);

    const h2 = document.createElement('h2');
    h2.textContent = 'Search Location';
    searchMenu.appendChild(h2);

    const form = document.createElement('form');
    const inputMap = new Map();
    inputMap.set('city', document.createElement('input'));
    inputMap.set('state', document.createElement('input'));
    inputMap.set('country', document.createElement('input'));
    inputMap.forEach((input, key) => { 
        input.setAttribute('placeholder', key);
        form.appendChild(input);
    });
    const searchButton = document.createElement('button');
    searchButton.classList.add(classes.searchButton);
    searchButton.setAttribute('type', 'button');
    searchButton.textContent = 'search';
    form.appendChild(searchButton);
    searchMenu.appendChild(form);
    
    const resultsHeader = document.createElement('h2');
    resultsHeader.textContent = 'results';
    searchMenu.appendChild(resultsHeader);

    const resultsContainer = document.createElement('div');
    resultsContainer.classList.add(classes.resultsContainer);
    searchMenu.appendChild(resultsContainer);
    
    const cancelButton = document.createElement('button');
    cancelButton.classList.add(classes.cancelButton);
    cancelButton.textContent = 'cancel';
    searchMenu.appendChild(cancelButton);
    return {
        backgroundCover,
        inputMap,
        searchButton,
        resultsContainer,
        cancelButton,  
    };
}

export default (searchOpener) => {
    const { backgroundCover, inputMap, searchButton, resultsContainer, cancelButton } = createMenu();
    const append = () => appendResultsList (
        inputMap.get('city').value, 
        inputMap.get('state').value, 
        inputMap.get('country').value, 
        resultsContainer,
        backgroundCover,
        );
    searchOpener.addEventListener('click', () => openMenu(backgroundCover));
    cancelButton.addEventListener('click', () => closeMenu(backgroundCover));
    searchButton.addEventListener('click', () => {
        append();
    });
    document.addEventListener('keydown', ({key, isTrusted}) => {
        if(
            isTrusted 
            && key === 'Enter'
            && [...inputMap].some(([ , input]) => input === document.activeElement)
            ) {
            append();
        }
    });
    return backgroundCover;
};