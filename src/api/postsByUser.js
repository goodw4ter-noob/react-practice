import { makeRequest } from "./makeRequest";

const URL = '/postsByUser';

export const getPostsAJAX = function (config) {
    // console.log(config, 'config');
    config.url = `${URL}/${config.url}`;
    // console.log(config.url, 'config.url');
    return makeRequest({
        method: 'GET',
        ...config,
    });
}

export const mutatePostsAJAX = function (config) {
    config.url = `${URL}${config.url}`;

    return makeRequest({
        method: 'PUT',
        ...config,
    })
}