import { GET_POSTS_FAILED, GET_POSTS_STARTED, GET_POSTS_SUCCESS } from "../actionCreators/postsByUser";

const initialState = {
    posts: [],
    isPostsLoading: true,
    isErrorProcessed: false,
};

export const postsByUserReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_POSTS_STARTED:
            return {
                ...state,
                isPostsLoading: true
            }
        
        case GET_POSTS_SUCCESS: 
            return {
                ...state,
                isPostsLoading: false,
                posts: action.payload,
                isErrorProcessed: false,
            }

        case GET_POSTS_FAILED: 
            return {
                ...state,
                isPostsLoading: false,
                isErrorProcessed: true,
            }

        default: 
            return {
                ...state,
            }
    }
}