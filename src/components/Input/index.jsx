import './style.css';
import React from 'react';
import classNames from 'classnames';

const Input = ({ errorText, className, ...restProps }) => {
    return (
        <div className={classNames('cnInputRoot', className)}>
            <input {...restProps} className={classNames('cnInputItem', errorText && 'cnInputError')}></input>
            {errorText && <span className='cnInputWithError'>{errorText}</span>}
        </div>

    );
};

export default Input
