import React, { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import ListItem from './ListItem';
import Pagination from '../Pagination/Pagination';

const Content = styled.div`
    width: 100%;
    padding: 1%;
    float: left;
    box-sizing: border-box;
`;

const EmptyData = styled.div`
    padding: 10px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
    text-align: center;
`;

function List(props) {
    const handleClick = useCallback((url) => {
        if(props){
            props.onClick(url)
        }
    }, [props])


    const renderList = () => {
        const {peoples, loading} = props;
        if (peoples && peoples.length > 0) {
            return peoples.map(item=>{
                return (
                    <ListItem key={item.url} data={item} onClick={handleClick} />
                )
            });
        } else {
            return (
                <div>
                    {!loading &&
                        <EmptyData>No data available</EmptyData>
                    }
                </div>
            )
        }
    }

    const handlePageChanged = useCallback((index) => {
        if(props){
            props.onPageChanged(index)
        }
    }, [props])

    const renderPagination = () => {
        const {peoples, totalItem, activePage} = props;
        if (totalItem > 0) {
            return (
                <Pagination 
                    totalItem={totalItem}
                    itemCountPerPage={peoples.length}
                    activePage={activePage}
                    onChanged={handlePageChanged}
                />
            )
        }
    }

    return (
        <Fragment>
            <Content>
                {renderList()}
            </Content>
            <Content>
                {renderPagination()}
            </Content>
        </Fragment>
    )
}
List.propTypes = {
    peoples: PropTypes.array,
    totalItem: PropTypes.number,
    activePage: PropTypes.number,
    itemCountPerPage: PropTypes.number,
    onChanged: PropTypes.func
};
export default List;