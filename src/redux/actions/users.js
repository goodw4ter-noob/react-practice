
import { api } from "../../api"
import { getAuthorizedUserFailed, getAuthorizedUserStarted, getAuthorizedUserSuccess, getUserFailed, getUserStarted, getUserSuccess, mutateUserFailed, mutateUserStarted, mutateUserSuccess } from "../actionCreators/users"


export const getUserThunk = function(id) {
    return async function(dispatch) {
        try {
            console.log(id, 'id');
            dispatch(getUserStarted());
            const response = await api.users.getUserAJAX(id);

            dispatch(getUserSuccess(response.data));
        } catch (error) {
            dispatch(getUserFailed(error))
        }
    }
};

export const getAuthorizedUserThunk = function() {
    return async function(dispatch) {
        try {
            dispatch(getAuthorizedUserStarted());

            const response = await api.users.getUserAJAX(1);

            dispatch(getAuthorizedUserSuccess(response.data));
        } catch (error) {
            dispatch(getAuthorizedUserFailed(error))
        }
    }
};

export const mutateUserThunk = function (data, userId) {
    return async function (dispatch, getState) {
        try {
            dispatch(mutateUserStarted());
            const state = getState();

            const newUser = {...state.users.user, ...data};

            const response = await api.users.mutateUserAJAX({
                data: newUser,
                url: userId,
            });

            dispatch(getUserSuccess(response.data));
            
        } finally {
            dispatch(mutateUserSuccess());
        }
    }
}