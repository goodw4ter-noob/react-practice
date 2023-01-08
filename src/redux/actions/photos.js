
import { api } from "../../api"
import { getPhotoFromState, getUpdatedPhoto } from "../../utils";
import { getPhotosFailed, getPhotosStarted, getPhotosSuccess, mutatePhotoFailed, mutatePhotoStarted, mutatePhotoSuccess, setPhotosTotal } from "../actionCreators/photos"

//пишем thunk - функция, которая возвращает асинхронную функцию с dispatch внутри

export const getPhotosThunk = function (page = 1) { //ЭТО И ЕСТЬ THUNK!!!
    return async function (dispatch, getState) { //асинхронный action
        try {
            const store = getState();
            if (page === 1) dispatch(getPhotosStarted);
            //диспатчим соответствующий actionCreator, даем понять, что мы начали загрузку фотографий
            const response = await api.photos.getPhotosAJAX({ //вызываем метод getPhotosAJAX и передаем в него config
                params: {
                    _page: page,
                    _limit: 5,
                },
            });

            if (page === 1) {
                dispatch(setPhotosTotal(response.headers['x-total-count']))
                dispatch(getPhotosSuccess([...response.data]));
            } else {
                dispatch(getPhotosSuccess([...store.photos.photos, ...response.data]));
            }


        } catch (error) {
            dispatch(getPhotosFailed(error));
        }
    }
}

export const toggleLikeThunk = function (authorizedUserId, photoId) {
    return async function (dispatch, getState) {
        try {
            // dispatch(mutatePhotoStarted());
            const state = getState();

            console.log(photoId, 'photoId', authorizedUserId, 'authorizedUserId');
            // const newPhoto = getPhotoFromState(state.photos.photos, photoId);
            const newPhoto = getPhotoFromState(state.photos.photos, photoId);
            console.log(newPhoto.likes, 'newPhoto.likes');
            if (newPhoto.likes.includes(authorizedUserId)) {
                newPhoto.likes = newPhoto.likes.filter(like => like !== authorizedUserId);
                console.log(newPhoto.likes, 'newPhoto.likes');
            } else {
                newPhoto.likes.push(authorizedUserId);
            }
            console.log(newPhoto.likes, 'newPhoto.likes');
            const response = await api.photos.mutatePhotoAJAX({
                data: newPhoto,
                url: newPhoto.id,
            });

            const newPhotos = getUpdatedPhoto(state.photos.photos, photoId, response.data);

            dispatch(getPhotosSuccess(newPhotos));
        } catch (error) {
            dispatch(mutatePhotoFailed(error));
        }
    }
}

export const sendCommentThunk = function (authorizedUserNickname, photoId, text) {
    return async function (dispatch, getState) {
        try {
            dispatch(mutatePhotoStarted());
            const state = getState();
            const newPhoto = getPhotoFromState(state.photos.photos, photoId);

            newPhoto.comments.push({ nickname: authorizedUserNickname, text, });

            const response = await api.photos.mutatePhotoAJAX({
                data: newPhoto,
                url: newPhoto.id,
            });

            const newPhotos = getUpdatedPhoto(state.photos.photos, photoId, response.data);

            dispatch(getPhotosSuccess(newPhotos));
            dispatch(mutatePhotoSuccess());
        } catch (error) {
            dispatch(mutatePhotoFailed(error));
        }
    }
}