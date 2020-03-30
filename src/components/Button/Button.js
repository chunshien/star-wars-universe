import React from 'react';
import './Button.css';

function Button(props) {

    const handleClick = () => {
        if (props) {
            props.onClick();
        }
    }

    return (
        <div className={'button'} onClick={handleClick}>
            Back
        </div>
    )
}

export default Button;