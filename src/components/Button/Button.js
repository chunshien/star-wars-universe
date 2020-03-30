import React, {useCallback} from 'react';
import styled from 'styled-components'

const ButtonContainer = styled.div`
        cursor: pointer;
        background-color: #2c6bc0;
        color: white;
        padding: 20px;
        border-radius: 5px;
        text-align: center;
        box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
 `;


function Button(props) {
    const handleClick = useCallback(() => {
        props.onClick();
    }, [props])

    return (
        <ButtonContainer onClick={handleClick}>
            Back
        </ButtonContainer>
    )
}

export default Button;