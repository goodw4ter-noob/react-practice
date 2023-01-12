import './style.css';
import classNames from 'classnames';
import React, { useState } from 'react'
import { Bars } from 'react-loader-spinner';

const ImageWithLoader = ({ src, alt, className }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const [isImgError, setIsImgError] = useState(false)

    const onError = function () {
        setIsImgError(true);
        setIsImageLoaded(false);
    }

    return (
        <div className={classNames('ImageWithLoaderRoot', className)}>
            {!isImageLoaded && <div className='cnImageWithLoaderWrapper'> {isImgError ? "Image isn't found!" : <Bars color="#000BFF" height={25} width={25} />} </div>}
            <img src={src} alt={alt} onLoad={() => setIsImageLoaded(true)} onError={onError} className={`cnImageWithLoaderImg ${isImageLoaded ? 'cnImageWithLoaderImgLoaded'  : ''}`}/>
        </div>
    )
}

export default ImageWithLoader 