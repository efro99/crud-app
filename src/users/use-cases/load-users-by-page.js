import { localhostUserToModel } from "../mappers/localhost-user.mapper";

/**
 * 
 * @param {Number} page 
 * @returns {Promise<Users[]>}
 */
export const loadUserByPage = async (page = 1) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;
    const res = await fetch(url);
    const data = await res.json();

    const next = data.next;
    const users = data['data'].map(userLike => localhostUserToModel(userLike));

    //return users;
    return { users, next };
}