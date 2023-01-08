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