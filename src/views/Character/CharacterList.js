import React, { Fragment, useEffect, useCallback } from 'react';
import _ from 'lodash';
import styled from 'styled-components'
import { connect } from 'react-redux';
import { getPeople } from '../../actions';
import { useHistory } from 'react-router-dom';

import ListItem from '../../components/Character/ListItem';
import Pagination from '../../components/Pagination/Pagination';
import Loading from '../../components/Loading/Loading';

const Header = styled.div`
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    padding: 20px 10px;
`;

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

function dataPropsAreEqual(prevProps, nextProps) {
    return (_.isEqual(prevProps.peoples, nextProps.peoples) 
            && prevProps.loading === nextProps.loading
    );
}

const CharacterList = React.memo(function CharacterList({loading, peoples, getPeople, totalItem, activePage }) {
    const history = useHistory();

    useEffect(() => {
        if (peoples.length === 0){
            getPeople();
        }
    }, [peoples, getPeople]);
    
    const handleClick = useCallback((url) => {
        const param = url.replace('https://swapi.co/api', '');
        history.push('/details' + param);
    }, [history])

    const renderList = () => {
        if (peoples.length > 0) {
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
        getPeople(index);
    }, [getPeople])

    const renderPagination = () => {
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
            {loading && 
                <Loading />
            }
            <Header>
                Star Wars Characters 
            </Header>
            <Content>
                {renderList()}
            </Content>
            <Content>
                {renderPagination()}
            </Content>
        </Fragment>
    );
}, dataPropsAreEqual);

const mapDispatchToProps = {
    getPeople: getPeople,
};

const mapStateToProps = (state) => ({
    peoples: state.peoples,
    totalItem: state.totalItem,
    activePage: state.activePage,
    loading: state.loading
})

export default connect(mapStateToProps, mapDispatchToProps)(CharacterList);
