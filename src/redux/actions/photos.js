
import { api } from "../../api"
import { getPhotosFailed, getPhotosStarted, getPhotosSuccess, setPhotosTotal } from "../actionCreators/photos"

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