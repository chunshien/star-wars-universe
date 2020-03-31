import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const Container = styled.div`
    text-align: center;
`;

const Page = styled.span`
    padding: 5px 10px;
    min-width: 20px;
    cursor: pointer;
`;

const activePageStyle = {
    backgroundColor: 'white',
    borderBottom: '5px solid black'
};

const enabledPageNavigation = {
    color: 'black'
}

const disabledPageNavigation = {
    color: '#dddddd',
    cursor: 'not-allowed'
}

function Pagination(props) {
    const {activePage, totalItem, itemCountPerPage} = props;
    const lastPage = Math.ceil(totalItem / itemCountPerPage);        
    const firstIndex = activePage > 1 ? 
                (activePage < lastPage ? activePage - 1 : activePage - 2)
                : 1;
    const secondIndex = activePage > 1 ? 
                (activePage < lastPage ? activePage : activePage - 1) 
                : 2;
    const lastIndex = activePage < lastPage ? 
                (activePage > 1 ? activePage + 1 : activePage + 2) 
                : lastPage;
    
    const previousClick = useCallback(() => {
        if(activePage > 1){
            props.onChanged(activePage - 1)
        } 
    }, [props, activePage]);

    const nextClick = useCallback(() => {
        const lastPage = Math.ceil(totalItem / itemCountPerPage);
        if(activePage < lastPage){
            props.onChanged(activePage + 1)
        }   
    }, [props, activePage, totalItem, itemCountPerPage]);

    const pageClick = useCallback((index) => {
        props.onChanged(index)
    }, [props])
    
    return (
        <Container>
            <Page 
                onClick={previousClick} 
                style={activePage === 1 ? disabledPageNavigation : enabledPageNavigation}>
                {'< Previous page'}
            </Page>
            <Page 
                onClick={()=>pageClick(firstIndex)} 
                style={activePage === 1 ? activePageStyle : {}}>
                {firstIndex}
            </Page>
            {Math.ceil(totalItem / itemCountPerPage) >= 2 &&
                <Page 
                    onClick={()=>pageClick(secondIndex)} 
                    style={activePage > 1 && activePage < lastPage ? activePageStyle : {}}>
                    {secondIndex}
                </Page>
            }
            {Math.ceil(totalItem / itemCountPerPage) >= 3 &&
                <Page 
                    onClick={()=>pageClick(lastIndex)} 
                    style={activePage === lastPage ? activePageStyle : {}}>
                    {lastIndex}
                </Page>
            }
            <Page onClick={nextClick} style={activePage !== lastPage ? enabledPageNavigation : disabledPageNavigation}>
                {'Next page >'}
            </Page>
        </Container>
    );
}
Pagination.propTypes = {
    activePage: PropTypes.number,
    totalItem: PropTypes.number,
    itemCountPerPage: PropTypes.number,
    onChanged: PropTypes.func
};
Pagination.defaultProps = {
    activePage: 1,
    totalItem: 0,
    itemCountPerPage: 10
}
export default Pagination;