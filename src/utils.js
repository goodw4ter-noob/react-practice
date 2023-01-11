export const getPhotoFromState = function (photos, photoId) {
    const photo = photos.find(post => post.id === photoId);

    return { ...photo };
}

export const getUpdatedPhoto = function (photos, photoId, data) {
    const newPhotos = [...photos];
    const likedPhotoIndex = newPhotos.findIndex(photo => photo.id === photoId);
    newPhotos[likedPhotoIndex] = data;
    return newPhotos;
}

export const getUserPagePostData = function (posts, postId) {
    const newPosts = [...posts];
    const newPostIndex = newPosts.findIndex(post => post.id === postId);
    const postForEdit = newPosts[newPostIndex];

    return {
        newPosts,
        postForEdit,
    };
}