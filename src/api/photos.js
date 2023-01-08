import { makeRequest } from "./makeRequest";


const URL = '/posts';

export const getPhotosAJAX = function(config) {
    return makeRequest({
        method: 'GET',
        url: URL,
        ...config,
    });
};

export const mutatePhotoAJAX = function (config) {
    config.url = `${URL}/${config.url}`;
    
    console.log(config.url);
    return makeRequest({
        method: 'PUT',
        ...config,
    });
};