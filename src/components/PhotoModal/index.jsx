
import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import Button from '../Button';
import Comment from '../Comment';
import TextArea from '../TextArea';
import UserBadge from '../UserBadge'
import './style.css';

const PhotoModal = ({ commentValue, setCommentValue, authorizedUserId, onLikeClick, isLikedByYou, mutateLoading, id ,onCommentSendClick, isOpen, onClose, imgurl, userName, avatarUrl, userId, comments }) => {

    useEffect(() => {
        const body = document.querySelector('body');
        if (isOpen) {
            body.classList.add('cnBodyOverFlow');
        } else {
            body.classList.remove('cnBodyOverFlow');
        }

    }, [isOpen]);

    const handleSendCommentClick = function () {
        if (!commentValue) return;

        onCommentSendClick(id, commentValue)
        setCommentValue('');
    }

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="cnModal"
            overlayClassName="cnModalOverlay"
            ariaHideApp={false}
        >
            <div className="cnModalRoot">
                <div className="cnModalImgWrapper">
                    <img src={imgurl} alt={imgurl} className="cnModalImg" />
                </div>
                <div className="cnCModalCommentsBlock">
                    <div>
                        <div className="cnModalHeader">
                            <UserBadge userName={userName} avatarUrl={avatarUrl} userId={userId} />
                        </div>

                        <div className="cnModalComments">
                            {comments.map(comment => <Comment userName={comment.nickname} text={comment.text} />)}
                        </div>
                    </div>
                    <div className='cnModalCommentsBottom'>
                        <div className="cnModalIcons">
                            <i onClick={() => onLikeClick(authorizedUserId, id)} className={`${isLikedByYou ? 'fas' : 'far'} fa-heart cnModalLikeIcon`} />
                        </div>
                        <TextArea value={commentValue} onChange={(e) => setCommentValue(e.target.value)} />
                        <Button disabled={mutateLoading} className='cnDetailedCardSendButton' onClick={handleSendCommentClick}>Отправить</Button>
                    </div>
                </div>
            </div>

        </ReactModal >
    )
}

export default PhotoModal