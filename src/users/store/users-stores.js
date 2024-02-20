import { loadUserByPage } from "../use-cases/load-users-by-page"

const state = {
    currentPage: 0,
    next: 1, 
    users: [],
}

const loadNextPage = async() => {
    if (state.next === null ) return;

    const {users, next  } = await loadUserByPage( state.next );

    state.next = next;
    state.currentPage += 1;
    state.users = users;
}

const loadPrevioustPage = async( ) => {
    if (state.currentPage <= 1 ) return;
    const {users, next  } = await loadUserByPage( state.currentPage - 1 );
    state.currentPage -= 1;
    state.next = next
    state.users = users;
}

/**
 * 
 * @param {User} user 
 */
const onUserChange = (updatedUser) => {
    console.log(updatedUser)
    let wasFound = false;
    state.users = state.users.map( user => {
        if(user.id === updatedUser.id){
            wasFound = true;
            return updatedUser;
        }
        return user;
    })

    if (state.users.length < 10 && !wasFound){
        state.users.push(updatedUser);
    }
}   

const reloadPage = async () => {
    const {users, next  } = await loadUserByPage( state.currentPage );
    if (users.length === 0) {
        await loadPrevioustPage();
        return;
    }
    state.users = users;
}

export default {
    loadNextPage,
    loadPrevioustPage,
    onUserChange,
    reloadPage,

    /**
     * 
     * @returns {User[]}
     */
    getUsers: () => [...state.users], 
    /**
     * 
     * @returns Number
     */
    getCurrentPage: () => state.currentPage, 
}