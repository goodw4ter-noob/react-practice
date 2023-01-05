import React from 'react'
import './style.css';

const Comment = ({ userName, text }) => {
  return (
    <div className='cnCommentRoot'>
        <span className='cnCommentName'>{userName}:</span>
        <span>{text}</span>
    </div>
  )
}

export default Comment