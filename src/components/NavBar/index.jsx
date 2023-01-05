import './style.css';
import React from 'react'
import UserBadge from '../UserBadge';

const NavBar = ({ userName, avatarUrl, userId }) => {
    return (
        <div className='cnNavbarRoot'>
            <div className='cnNavBarWrapper'>
                <span>Rugram</span>
                <UserBadge userName={userName} avatarUrl={avatarUrl} userId={userId}/>
            </div>
        </div>
    )
}

export default NavBar