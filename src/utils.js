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


// const arr = [1, 2, 3, 4, 5, 6, 7]

// console.log(arr.splice(1, 6));