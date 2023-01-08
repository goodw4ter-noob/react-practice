import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DetailedCard from '../../components/DetailedCard'
import Layout from '../../components/Layout/index'
import { getPhotosThunk, sendCommentThunk, toggleLikeThunk } from '../../redux/actions/photos'
import InfiniteScroll from 'react-infinite-scroll-component';
import './style.css';
import { Bars } from "react-loader-spinner";
import { useState } from 'react'


const MainPage = () => {
	const photos = useSelector(state => state.photos.photos);
	// const loading = useSelector(state => state.photos.isPhotosLoading);
	const total = useSelector(state => state.photos.totalPhotos);
	const authorizedUser = useSelector(state => state.users.authorizedUser);
	const mutateLoading = useSelector(state => state.photos.isMutateLoading);
	const dispatch = useDispatch();

	const [page, setPage] = useState(1);
	
	useEffect(() => {
		dispatch(getPhotosThunk(page));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page])
	const nextHandler = function () {
		setPage(page + 1);
	}

	const onLikeClick = function (authorizedUserId, photoId) {
		dispatch(toggleLikeThunk(authorizedUserId, photoId));
	};

	const onCommentSendClick = function (photoId, comment) {
		dispatch(sendCommentThunk(authorizedUser.nickname, photoId, comment))
	}

	return (
		<Layout userName={authorizedUser.nickname} userId={authorizedUser.id} avatarUrl={authorizedUser.avatarUrl}>
			<div className='cnMainPageRoot'>
				<InfiniteScroll dataLength={photos.length} next={() => nextHandler()} hasMore={photos.length < total} loader={<div className='cnMainLoaderContainer'> <Bars color="#000BFF" height={25} width={25} /> </div>} endMessage={<p className='cnMainLoaderContainer'>that is all!</p>}>
					{photos.map(photo => {
						return <DetailedCard 
							key={photo.id}
							id={photo.id}
							userName={photo.author.nickname}
							avatarUrl={photo.author.avatarUrl}
							userId={photo.author.id}
							authorizedUserId={authorizedUser.id}
							imgurl={photo.imgUrl}
							likes={photo.likes.length}
							isLikedByYou={photo.likes.includes(authorizedUser.id)}
							comments={photo.comments}
							className='cnMainPageCard'
							onLikeClick={onLikeClick}
							onCommentSendClick={onCommentSendClick}
							mutateLoading={mutateLoading}
						/>
					})}
				</InfiniteScroll>
			</div>
		</Layout>
	)
}

export default MainPage