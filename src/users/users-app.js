import { renderAddButton } from "./presentation/render-add-button/render-add-button";
import { renderButtons } from "./presentation/render-buttons/render-buttons";
import { renderModal } from "./presentation/render-modal/render-modal";
import { renderTable } from "./presentation/render-table/render-table";
import usersStores from "./store/users-stores";
import { saveUser } from "./use-cases/save-user";


/**
 * 
 * @param {HTMLElement} element 
 */
export const UserApp = async( element ) => {
    element.innerHTML = 'Loading...';
    await usersStores.loadNextPage();
    element.innerHTML = '';

    renderTable( element );
    renderButtons(element);
    renderAddButton( element );
    renderModal( element, async( userLike ) =>{
        const user = await saveUser(userLike );
        usersStores.onUserChange(user);
        renderTable();
    }); 
}