import React from 'react';
import './errorMessage.css';
import img from './img.JPG';

const ErrorMessage = () => {
    return (
        <>
            <img src={img} alt='error'></img>
            <span>Something wrong!</span>
        </>
    )
}

export default ErrorMessage