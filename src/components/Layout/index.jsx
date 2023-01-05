import './style.css';
import React from 'react'
import NavBar from '../NavBar';

const Layout = ({ userName, avatarUrl, userId, children }) => {
  return (
    <div className='cnLayoutRoot'>
        <NavBar userName={userName} avatarUrl={avatarUrl} userId={userId} />
        <div className='cnLayoutBody'>
            {children}
        </div>
    </div>
  )
}

export default Layout