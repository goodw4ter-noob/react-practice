
import React from 'react'
import UserCounter from '../UserCounter'
import './style.css'

const UserBio = ({ avatarUrl, userName, subscribed, subscribers, firstName, lastName, description, link }) => {
    return (
        <div className='cnUserBioRoot'>
            <div>
                <img src={avatarUrl} alt='avatar' className='cnUserBioAvatar' />
            </div>
            <div className='cnUserBioInfo'>
                <div className='cnUserBioRow'>
                    <span className='cnUserBioNickName'>{userName}</span>
                </div>
                <div className='cnUserBioRow'>
                    <UserCounter text='Публикаций' count={5} className='cnUserBioCounter' />
                    <UserCounter text='Подписчиков' count={subscribed} className='cnUserBioCounter' />
                    <UserCounter text='Подписок' count={subscribers} className='cnUserBioCounter' />
                </div>
                <div className='cnUserBioRow'>
                    <span className='cnUserBioName'>{firstName} {lastName}</span>
                </div>
                <div className='cnUserBioRow'>
                    <span>{description}</span>
                </div>
                <a href={link}>
                    {link}
                </a>
            </div>
        </div>
    )
}

export default UserBio