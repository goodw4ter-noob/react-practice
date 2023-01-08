import { makeRequest } from "./makeRequest";


const URL = '/users';

export const getUserAJAX = function(userId, config) {
    return makeRequest({
        method: 'GET',
        url: `${URL}/${userId}`,
        ...config
    });
};