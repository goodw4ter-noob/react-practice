import { makeRequest } from "./makeRequest";


const URL = '/posts';

export const getPhotosAJAX = function(config) {
    return makeRequest({
        method: 'GET',
        url: URL,
        ...config,
    });
};