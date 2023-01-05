import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DetailedCard from '../../components/DetailedCard'
import Layout from '../../components/Layout/index'
import { getPhotosThunk } from '../../redux/actions/photos'
import InfiniteScroll from 'react-infinite-scroll-component';
import './style.css';
import { Bars } from "react-loader-spinner";
import { useState } from 'react'


const MainPage = () => {
	const photos = useSelector(state => state.photos.photos);
	const loading = useSelector(state => state.photos.isPhotosLoading);
	const total = useSelector(state => state.photos.totalPhotos);
	const dispatch = useDispatch();

	const [page, setPage] = useState(1);

	useEffect(() => {
		dispatch(getPhotosThunk(page));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page])

	const nextHandler = function () {
		setPage(page + 1);
	}

	return (
		<Layout userName="Vlad" userId={1}>
			<div className='cnMainPageRoot'>
				{loading ? (<div className='cnMainLoaderContainer'> <Bars color="#000BFF" height={80} width={80} /> </div>) : 
				<InfiniteScroll dataLength={photos.length} next={() => nextHandler()} hasMore={photos.length < total} loader={<div className='cnMainLoaderContainer'> <Bars color="#000BFF" height={25} width={25} /> </div>} endMessage={<p className='cnMainLoaderContainer'>that is all!</p>}>
					{photos.map(photo => {
						return <DetailedCard 
							userName={photo.author.nickname}
							avatarUrl={photo.author.avatarUrl}
							userId={photo.author.id}
							imgurl={photo.imgUrl}
							likes={photo.likes.length}
							isLikedByYou={false}
							comments={photo.comments}
							className='cnMainPageCard'
						/>
					})}
				</InfiniteScroll>}
			</div>
		</Layout>
	)
}

export default MainPage