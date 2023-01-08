import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Card from '../../components/Card';
import Layout from '../../components/Layout'
import UserBio from '../../components/UserBio';
import { getPostsByUserThunk, toggleLikeOnPostThunk } from '../../redux/actions/postsByUser';
import './style.css'

const UserPage = () => {
	const authorizedUser = useSelector(state => state.users.authorizedUser);
	const { posts } = useSelector(state => state.postsByUser);
	const params = useParams(); // получить window.location
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPostsByUserThunk(params.id)) //id того, к кому мы зашли на страницу
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const onLikeClick = function (authorizedUserId, photoId) {
		dispatch(toggleLikeOnPostThunk(authorizedUserId, photoId, params.id));
	};

	return (
		<Layout userName={authorizedUser.nickname} userId={authorizedUser.id} avatarUrl={authorizedUser.avatarUrl}>
			<div className='cnUserPageRoot'>
				<UserBio avatarUrl={authorizedUser.avatarUrl} userName={authorizedUser.nickname} subscribed={authorizedUser.subscribed.length} subscribers={authorizedUser.subscribers.length} firstName={authorizedUser.firstName} lastName={authorizedUser.lastName} description={authorizedUser.description} link={authorizedUser.url} />
				<div className='cnUserPageRootContent'>
					{posts.map(post => {
						return <Card imgUrl={post.imgUrl} className='cnUserPageCard' likes={post.likes.length} comments={post.comments.length} isLikedByYou={post.likes.includes(authorizedUser.id)} onLikeClick={() => onLikeClick(authorizedUser.id, post.id)}/>
					})}
				</div>
			</div>
		</Layout>
	)
}

export default UserPage