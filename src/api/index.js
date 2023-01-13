import { getPhotosAJAX, mutatePhotoAJAX } from "./photos"
import { getPostsAJAX, mutatePostsAJAX } from "./postsByUser"
import { getUserAJAX, mutateUserAJAX } from "./users"


export const api = {
    photos: { getPhotosAJAX, mutatePhotoAJAX },
    users: { getUserAJAX, mutateUserAJAX },
    posts: { getPostsAJAX, mutatePostsAJAX },
}