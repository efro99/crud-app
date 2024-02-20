import usersStores from "../../store/users-stores";
import { renderTable } from "../render-table/render-table";
import "./render-buttons.css";


/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderButtons = ( element ) => {

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next >';

    const prevButton = document.createElement('button');
    prevButton.innerText = '< Prev';

    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'current-page';
    currentPageLabel.innerText = usersStores.getCurrentPage();

    element.append(prevButton, currentPageLabel, nextButton);

    nextButton.addEventListener('click', async() => {
        await usersStores.loadNextPage();
        currentPageLabel.innerText = usersStores.getCurrentPage();
        renderTable( element );
    });

    prevButton.addEventListener('click', async() => {
        await usersStores.loadPrevioustPage();
        currentPageLabel.innerText = usersStores.getCurrentPage();
        renderTable( element );
    });
}