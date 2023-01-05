
export const GET_PHOTOS_STARTED = 'GET_PHOTOS_STARTED';
export const GET_PHOTOS_SUCCESS = 'GET_PHOTOS_SUCCESS';
export const GET_PHOTOS_FAILED = 'GET_PHOTOS_FAILED';
export const SET_PHOTOS_TOTAL = 'SET_PHOTOS_TOTAL';

export const getPhotosStarted = function () {
    return {
        type: GET_PHOTOS_STARTED,
    };
};

export const getPhotosSuccess = function (photos) {
    return {
        type: GET_PHOTOS_SUCCESS,
        payload: photos,
    };
};

export const getPhotosFailed = function (error) {
    return {
        type: GET_PHOTOS_FAILED,
        payload: error,
    };
};

export const setPhotosTotal = function (total) {
    return {
        type: SET_PHOTOS_TOTAL,
        payload: total,
    }
}



