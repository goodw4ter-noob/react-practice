import { makeRequest } from "./makeRequest";


const URL = '/users';

export const getUserAJAX = function(userId, config) {
    return makeRequest({
        method: 'GET',
        url: `${URL}/${userId}`,
        ...config
    });
};

export const mutateUserAJAX = function (config) {
    config.url = `${URL}/${config.url}`;
    
    console.log(config.url);
    return makeRequest({
        method: 'PUT',
        ...config,
    });
};