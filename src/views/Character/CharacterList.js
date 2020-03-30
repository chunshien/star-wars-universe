import React, { Fragment, useEffect, useCallback } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getPeople } from '../../actions';
import { useHistory } from 'react-router-dom';

import './CharacterList.css';
import ListItem from '../../components/Character/ListItem';
import Pagination from '../../components/Pagination/Pagination';

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
        if (peoples) {
            return peoples.map(item=>{
                return (
                    <ListItem key={item.url} data={item} onClick={handleClick} />
                )
            });
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
                <div className={'loader-container'}>
                    <div className={'loader'}></div>
                </div>
            }
            <div className={'list-header'}>
                Star Wars Characters 
            </div>
            <div className={'list-content'}>
                {renderList()}
            </div>
            <div className='list-footer'>
                {renderPagination()}
            </div>
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
