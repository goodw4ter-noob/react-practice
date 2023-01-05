import './style.css';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const UserBadge = ({ userName, avatarUrl, userId }) => {

    const navigate = useNavigate();

    const onUserBadgeClick = () => navigate(`/${userId}`);

    return (
        <div className='cnUserBadgeRoot' onClick={() => onUserBadgeClick()}>
            {avatarUrl ? <img src={avatarUrl} alt="avatar" className='cnUserPageAvatar' /> : <div className='cnUserBadgePlaceholder' />}
            <span className='cnUserBadgeName' >{userName}</span>
        </div>
    )
}

export default UserBadge