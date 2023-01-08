import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Bars } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Card from '../../components/Card';
import Layout from '../../components/Layout'
import UserBio from '../../components/UserBio';
import { getPostsByUserThunk, toggleLikeOnPostThunk } from '../../redux/actions/postsByUser';
import { getUserThunk } from '../../redux/actions/users';
import './style.css'

const UserPage = () => {
	const authorizedUser = useSelector(state => state.users.authorizedUser);
	const user = useSelector(state => state.users.user);
	const { posts } = useSelector(state => state.postsByUser);
	const isPostsLoading = useSelector(state => state.postsByUser.isPostsloading);
	const isUserLoading = useSelector(state => state.users.isUserLoading);
	const params = useParams(); // получить window.location
	const dispatch = useDispatch();

	const [postsForRender, setPostsForRender] = useState([]);
	const [page, setPage] = useState(0);

	console.log(user, 'user');

	useEffect(() => {
		const newPosts = [...posts];
		if (newPosts.length) {
			setPostsForRender(newPosts.splice(0, 12));
		}
	}, [posts]);

	console.log(params.id, 'params.id');
	console.log(user.id, 'user.id');

	useEffect(() => {
		dispatch(getPostsByUserThunk(params.id)); //id того, к кому мы зашли на страницу
		dispatch(getUserThunk(params.id));
		
	}, [params.id, dispatch]);

	const onLikeClick = function (authorizedUserId, photoId) {
		dispatch(toggleLikeOnPostThunk(authorizedUserId, photoId, params.id));
	};

	const nextHandler = function () {
		const newPosts = [...posts];
		const offset = 12 * (page + 1);

		setPostsForRender([...postsForRender, ...newPosts.splice(offset, offset + 12)]);
		setPage(page + 1);
	};	

	return (
		<Layout userName={authorizedUser.nickname} userId={authorizedUser.id} avatarUrl={authorizedUser.avatarUrl}>
			{isPostsLoading || isUserLoading ? <Bars color="#000BFF" height={25} width={25} /> : <div className='cnUserPageRoot'>
				<UserBio isSubscribed={user.subscribers.includes(authorizedUser.id)} isMyPage={params.id == authorizedUser.id} avatarUrl={user.avatarUrl} userName={user.nickname} subscribed={user.subscribed.length} subscribers={user.subscribers.length} firstName={user.firstName} lastName={user.lastName} description={user.description} link={user.url} />
				<div className='cnUserPageRootContent'>
					{postsForRender.length ? <InfiniteScroll className='cnUserPageScroll' dataLength={postsForRender.length} next={nextHandler} hasMore={postsForRender.length < posts.length} loader={<div className='cnMainLoaderContainer'> <Bars color="#000BFF" height={25} width={25} /> </div>} endMessage={<p className='cnMainLoaderContainer'>that is all!</p>}>
						{postsForRender.map(post => {
							return <Card key={params.id} imgUrl={post.imgUrl} className='cnUserPageCard' likes={post.likes.length} comments={post.comments.length} isLikedByYou={post.likes.includes(authorizedUser.id)} onLikeClick={() => onLikeClick(authorizedUser.id, post.id)} />
						})}
					</InfiniteScroll> : <p>The user has no posts!</p>}
				</div>
			</div>}
		</Layout>
	)
}

export default UserPage