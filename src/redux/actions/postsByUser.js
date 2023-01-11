import { api } from "../../api";
import { getUserPagePostData } from "../../utils";
import { mutatePhotoFailed, mutatePhotoStarted, mutatePhotoSuccess } from "../actionCreators/photos";
import { getPostsFailed, getPostsStarted, getPostsSuccess } from "../actionCreators/postsByUser"

export const getPostsByUserThunk = function (userId) {
    return async function (dispatch) {
        try {
            dispatch(getPostsStarted());
            const response = await api.posts.getPostsAJAX({
                url: userId,
            });
            dispatch(getPostsSuccess(response.data.posts));

        } catch (error) {
            dispatch(getPostsFailed(error));
        }
    };
};

export const toggleLikeOnPostThunk = function (userId, postId, postAuthorId) {
    return async function(dispatch, getState) {
        try {
            const posts = getState().postsByUser.posts;
            const { postForEdit, newPosts } = getUserPagePostData(posts, postId);

            if (postForEdit.likes.includes(userId)) {
                postForEdit.likes = postForEdit.likes.filter(like => like!== userId);
            } else {
                postForEdit.likes.push(userId);
            }

            const response = await api.posts.mutatePostsAJAX({
                url: `/${postAuthorId}`,
                data: {
                    id: postAuthorId,
                    posts: newPosts,
                }
            })

            dispatch(getPostsSuccess([...response.data.posts]));
        } catch (error) {
            console.log(error);
        }
    }
}

export const sendCommentCardThunk = function (authorizedUserNickname, postId, postAuthorId, text) {
    return async function (dispatch, getState) {
        try {
            dispatch(mutatePhotoStarted());
            const posts = getState().postsByUser.posts;
            
            const { postForEdit, newPosts } = getUserPagePostData(posts, postId);

            postForEdit.comments.push({ nickname: authorizedUserNickname, text, });

            const response = await api.posts.mutatePostsAJAX({
                url: `/${postAuthorId}`,
                data: {
                    id: postAuthorId,
                    posts: newPosts,
                }
            })

            dispatch(getPostsSuccess([...response.data.posts]));
            dispatch(mutatePhotoSuccess());
        } catch (error) {
            dispatch(mutatePhotoFailed(error));
        }
    }
}