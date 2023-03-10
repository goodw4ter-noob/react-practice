import { GET_PHOTOS_FAILED, GET_PHOTOS_STARTED, GET_PHOTOS_SUCCESS, MUTATE_PHOTO_FAILED, MUTATE_PHOTO_STARTED, MUTATE_PHOTO_SUCCESS, SET_PHOTOS_TOTAL } from "../actionCreators/photos";

const initialState = {
    photos: [],
    isPhotosLoading: true,
    totalPhotos: 0,
    isMutateLoading: false,
    isErrorProcessed: false,
};

export const photosReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_PHOTOS_STARTED:
            return {
                ...state,
                isPhotosLoading: true,
            };

        case GET_PHOTOS_SUCCESS:
            return {
                ...state,
                photos: action.payload,
                isPhotosLoading: false,
                isErrorProcessed: false,
            };

        case GET_PHOTOS_FAILED:
            return {
                ...state,
                isPhotosLoading: false,
                isErrorProcessed: true,
            };

        case SET_PHOTOS_TOTAL: 
            return {
                ...state,
                totalPhotos: action.payload,
            };

        case MUTATE_PHOTO_STARTED: 
            return {
                ...state,
                isMutateLoading: true,
            };

        case MUTATE_PHOTO_SUCCESS: 
            return {
                ...state,
                isMutateLoading: false,
            };

        case MUTATE_PHOTO_FAILED: 
        //TODO add errors
            return {
                ...state,
                isMutateLoading: false,
            }

        default:
            return {
                ...state,
            };
    }
}