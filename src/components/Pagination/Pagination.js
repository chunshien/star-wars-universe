import React, {useCallback} from 'react';
import './Pagination.css';

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
        <div className="pagination">
            <span 
                onClick={previousClick} 
                className={activePage === 1 ? 'disabled-page-navigation' : 'enabled-page-navigation'}>
                {'< Previous page'}
            </span>
            <span 
                onClick={()=>pageClick(firstIndex)} 
                className={activePage === 1 ? 'active-page' : ''}>
                {firstIndex}
            </span>
            {Math.ceil(totalItem / itemCountPerPage) >= 2 &&
                <span 
                    onClick={()=>pageClick(secondIndex)} 
                    className={activePage > 1 && activePage < lastPage ? 'active-page' : ''}>
                    {secondIndex}
                </span>
            }
            {Math.ceil(totalItem / itemCountPerPage) >= 3 &&
                <span 
                    onClick={()=>pageClick(lastIndex)} 
                    className={activePage === lastPage ? 'active-page' : ''}>
                    {lastIndex}
                </span>
            }
            <span onClick={nextClick} className={activePage !== lastPage ? 'enabled-page-navigation' : 'disabled-page-navigation'}>
                {'Next page >'}
            </span>
        </div>
    );
    
}
Pagination.defaultProps = {
    activePage: 1,
    totalItem: 0,
    itemCountPerPage: 10
}
export default Pagination;