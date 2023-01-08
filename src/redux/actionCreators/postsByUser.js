
export const GET_POSTS_STARTED = 'GET_POSTS_STARTED';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILED = 'GET_POSTS_FAILED';

export const getPostsStarted = function () {
    return {
        type: GET_POSTS_STARTED,
    };
};

export const getPostsSuccess = function (posts) {
    return {
        type: GET_POSTS_SUCCESS,
        payload: posts,
    };
};

export const getPostsFailed = function (error) {
    return {
        type: GET_POSTS_FAILED,
        payload: error,
    };
};

