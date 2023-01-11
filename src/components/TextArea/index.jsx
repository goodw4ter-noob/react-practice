import './style.css';

import React from 'react'

const TextArea = ({ value, setValue, ...restProps }) => {
    return (
        <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className='cnRoot'
            placeholder='Введите ваш комментарий...'
            {...restProps}
        />
    )
}

export default TextArea