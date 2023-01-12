import React from 'react'
import './style.css';
import UserBadge from '../UserBadge'
import Comment from '../Comment';
import { useState } from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';
import Button from '../Button';
import PhotoModal from '../PhotoModal';
import TextArea from '../TextArea';
import ImageWithLoader from '../ImageWithLoader';

const DetailedCard = ({ mutateLoading, authorizedUserId, id, userName, avatarUrl, userId, imgurl, likes, isLikedByYou, comments, className, onLikeClick, onCommentSendClick }) => {
    const [isCommentsShown, setIsCommentsShown] = useState(false);
    const [comment, setComment] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleSendCommentClick = function () {
        if (!comment) return;

        onCommentSendClick(id, comment)
        setComment('');
    }

    const renderComments = function () {
        if (comments.length > 2 && isCommentsShown === false) {
            const commentsForRender = [...comments];
            const twoComments = commentsForRender.splice(comments.length - 2, 2);

            return (
                <>
                    <span className='cnDetailedCardCommentTitle' onClick={() => setIsCommentsShown(true)} >{`Показать еще ${commentsForRender.length} комментариев`}</span>
                    {twoComments.map(comment => <Comment userName={comment.nickname} text={comment.text} key={nanoid()} />)}
                </>
            );
        }

        return comments.map(comment => <Comment userName={comment.nickname} text={comment.text} key={nanoid()} />);

    }
    return (
        <div className={cn('cnDetailedCardRoot', className)}> {/* чтобы добавить класс из пропсов нужна библиотека classnames */}
            <div className='cnDetailedCardHeader'>
                <UserBadge userName={userName} avatarUrl={avatarUrl} userId={userId} />
            </div>
            <div className='cnDetailedCardImgWrapper' >
                <ImageWithLoader src={imgurl} alt="asd" className='cnDetailedCardImg'/>
                {/* {!isImageLoaded && <div className='cnMainLoaderContainer'> <Bars color="#000BFF" height={25} width={25} /> </div>}
                <img src={imgurl} alt="asd" className={`cnDetailedCardImg ${isImageLoaded && 'cnDetailedCardImgLoaded'}`} onLoad={() => setIsImageLoaded(true)} /> */}
            </div>
            <div className='cnDetailedCardButtons'>
                <i onClick={() => onLikeClick(authorizedUserId, id)} className={`${isLikedByYou ? 'fas' : 'far'} fa-heart cnDetailedCardLikeIcon`}></i>
                <i className="fas fa-comment cnDetailedCardCommentIcon" onClick={() => setIsModalVisible(true)} />
            </div>
            <div className='cnDetailedCardLikes'>
                {`Оценили ${likes} человек`}
            </div>
            <div className='cnDetailedCardComments'>
                {renderComments()}
            </div>
            <div className='cnDetailedCardTextAreaWrapper'>
                <TextArea value={comment} onChange={(e) => setComment(e.target.value)} />
                <Button disabled={mutateLoading} className='cnDetailedCardSendButton' onClick={handleSendCommentClick}>Отправить</Button>
            </div>
            <PhotoModal
                authorizedUserId={authorizedUserId}
                onLikeClick={onLikeClick}
                isLikedByYou={isLikedByYou}
                mutateLoading={mutateLoading} id={id}
                onCommentSendClick={onCommentSendClick}
                isOpen={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                userName={userName}
                avatarUrl={avatarUrl}
                userId={userId}
                imgurl={imgurl}
                comments={comments} />
        </div>
    )
}

export default DetailedCard