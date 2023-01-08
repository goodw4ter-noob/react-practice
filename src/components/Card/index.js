import './style.css';
import React from 'react'
import classNames from 'classnames';

const Card = ({ imgUrl, className, likes, comments, isLikedByYou, onLikeClick }) => {
    return (
        <div className={classNames('cnCardRoot', className)}>
            <img src={imgUrl} alt='img' className='cnCardImage'/>
            <div className='cnCardHover'/>
            <div className='cnCardIcons'>
                <i className={classNames(`${isLikedByYou ? 'fas' : 'far'} fa-heart`, 'cnCardIcon')} onClick={onLikeClick}/>
                <span className='cnCardNumber cnCardLikes'>{likes}</span>
                <i className={classNames('fas fa-comment', 'cnCardIcon')}/>
                <span className='cnCardNumber cnCardLikes'>{comments}</span>
            </div>
        </div>
    )
}

export default Card