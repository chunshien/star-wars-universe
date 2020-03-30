import React, {useCallback} from 'react';
import './Button.css';

function Button(props) {
    const handleClick = useCallback(() => {
        props.onClick();
    }, [props])

    return (
        <div className={'button'} onClick={handleClick}>
            Back
        </div>
    )
}

export default Button;