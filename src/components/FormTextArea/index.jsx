import React from 'react'
import classNames from 'classnames'
import './style.css';

const FormTextArea = ({ errorText, className, ...props }) => {
    return (
        <div className={classNames('cnInputRoot', className)}>
            <textarea {...props} className={classNames('cnFromTextAreaRoot', errorText && 'cnFromTextAreaWithError' )} />
            {errorText && <span className='cnInputWithError'>{errorText}</span>}
        </div>
    )
}

export default FormTextArea