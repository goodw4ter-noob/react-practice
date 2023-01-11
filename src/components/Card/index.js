import './style.css';
import React, { useState } from 'react'
import classNames from 'classnames';
import PhotoModal from '../PhotoModal';

const Card = ({ onCommentSendClick, key, commentsForRender, userId, avatarUrl, userName, id, mutateLoading, authorizedUserId, imgUrl, className, likes, comments, isLikedByYou, onLikeClick }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [comment, setComment] = useState('');

    return (
        <div className={classNames('cnCardRoot', className)} key={key}>
            <img src={imgUrl} alt='img' className='cnCardImage' />
            <div className='cnCardHover' />
            <div className='cnCardIcons'>
                <i className={classNames(`${isLikedByYou ? 'fas' : 'far'} fa-heart`, 'cnCardIcon')} onClick={onLikeClick} />
                <span className='cnCardNumber cnCardLikes'>{likes}</span>
                <i className={classNames('fas fa-comment', 'cnCardIcon')} onClick={() => setIsModalVisible(true)} />
                <span className='cnCardNumber cnCardLikes'>{comments}</span>
            </div>
            <PhotoModal
                commentValue={comment}
                setCommentValue={setComment}
                authorizedUserId={authorizedUserId}
                onLikeClick={onLikeClick}
                isLikedByYou={isLikedByYou}
                mutateLoading={mutateLoading}
                id={id}
                onCommentSendClick={() => onCommentSendClick(comment)}
                isOpen={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                userName={userName}
                avatarUrl={avatarUrl}
                userId={userId}
                imgurl={imgUrl}
                comments={commentsForRender} />
        </div>
    )
}

export default Card