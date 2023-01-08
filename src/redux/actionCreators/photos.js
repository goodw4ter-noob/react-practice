
export const GET_PHOTOS_STARTED = 'GET_PHOTOS_STARTED';
export const GET_PHOTOS_SUCCESS = 'GET_PHOTOS_SUCCESS';
export const GET_PHOTOS_FAILED = 'GET_PHOTOS_FAILED';

export const SET_PHOTOS_TOTAL = 'SET_PHOTOS_TOTAL';

export const MUTATE_PHOTO_STARTED = 'MUTATE_PHOTO_STARTED';
export const MUTATE_PHOTO_SUCCESS = 'MUTATE_PHOTO_SUCCESS';
export const MUTATE_PHOTO_FAILED = 'MUTATE_PHOTO_FAILED';

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

export const mutatePhotoStarted = function () {
    return {
        type: MUTATE_PHOTO_STARTED,
    };
};

export const mutatePhotoSuccess = function () {
    return {
        type: MUTATE_PHOTO_SUCCESS,
    };
};

export const mutatePhotoFailed = function (error) {
    return {
        type: MUTATE_PHOTO_FAILED,
        payload: error,
    };
};



