import { getPhotosAJAX, mutatePhotoAJAX } from "./photos"
import { getPostsAJAX, mutatePostsAJAX } from "./postsByUser"
import { getUserAJAX } from "./users"


export const api = {
    photos: { getPhotosAJAX, mutatePhotoAJAX },
    users: { getUserAJAX },
    posts: { getPostsAJAX, mutatePostsAJAX },
}