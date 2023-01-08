import { api } from "../../api";
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

            const newPosts = [...posts];
            const newPostIndex = newPosts.findIndex(post => post.id === postId);
            const postForEdit = newPosts[newPostIndex];

            if (postForEdit.likes.includes(userId)) {
                postForEdit.likes = postForEdit.likes.filter(like => like!== userId);
            } else {
                postForEdit.likes.push(userId);
            }

            await api.posts.mutatePostsAJAX({
                url: `/${postAuthorId}`,
                data: {
                    id: postAuthorId,
                    posts: newPosts,
                }
            })

            dispatch(getPostsSuccess(newPosts));
        } catch (error) {
            console.log(error);
        }
    }
}