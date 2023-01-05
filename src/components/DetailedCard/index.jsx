import React from 'react'
import './style.css';
import UserBadge from '../UserBadge'
import Comment from '../Comment';
import { useState } from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';

const DetailedCard = ({ userName, avatarUrl, userId, imgurl, likes, isLikedByYou, comments, className }) => {
    const [isCommentsShown, setIsCommentsShown] = useState(false);

    const renderComments = function () {
        if (comments.length > 2 && isCommentsShown === false) {
            const commentsForRender = [...comments];
            const twoComments = commentsForRender.splice(comments.length - 2, 2);
            
            return (
                <>
                    <span className='cnDetailedCardCommentTitle' onClick={() => setIsCommentsShown(true)} >{`Показать еще ${commentsForRender.length} комментариев`}</span>
                    {twoComments.map(comment => <Comment userName={comment.nickname} text={comment.text} key={nanoid()}/>)}
                </>
            );
        }

        return comments.map(comment => <Comment userName={comment.nickname} text={comment.text} key={nanoid()}/>);
        
    }
    return (
        <div className={cn('cnDetailedCardRoot', className)}> {/* чтобы добавить класс из пропсов нужна библиотека classnames */}
            <div className='cnDetailedCardHeader'>
                <UserBadge userName={userName} avatarUrl={avatarUrl} userId={userId} />
            </div>
            <div>
                <img src={imgurl} alt="asd" className='cnDetailedCardImg' />
            </div>
            <div className='cnDetailedCardButtons'>
                <i className={`${isLikedByYou ? 'fas' : 'far'} fa-heart cnDetailedCardLikeIcon`}></i>
                <i className="fas fa-comment cnDetailedCardCommentIcon" />
            </div>
            <div className='cnDetailedCardLikes'>
                {`Оценили ${likes} человек`}
            </div>
            <div className='cnDetailedCardComments'>
                {renderComments()}
            </div>
            <textarea className='cnDetailedCardTextArea' placeholder='Введите ваш комментарий...' />
        </div>
    )
}

export default DetailedCard