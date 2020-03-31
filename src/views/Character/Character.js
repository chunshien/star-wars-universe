import React, { Fragment, useEffect, useCallback } from 'react';
import _ from 'lodash';
import styled from 'styled-components'
import { connect } from 'react-redux';
import { getPeople } from '../../actions';
import { useHistory } from 'react-router-dom';

import List from '../../components/Character/List';
import Loading from '../../components/Loading/Loading';

const Header = styled.div`
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    padding: 20px 10px;
`;

function dataPropsAreEqual(prevProps, nextProps) {
    return (_.isEqual(prevProps.peoples, nextProps.peoples) 
            && prevProps.loading === nextProps.loading
    );
}

const Character = React.memo(function Character({loading, peoples, getPeople, totalItem, activePage }) {
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

    const handlePageChanged = useCallback((index) => {
        getPeople(index);
    }, [getPeople])

    return (
        <Fragment>
            {loading && 
                <Loading />
            }
            <Header>
                Star Wars Characters 
            </Header>
            <List
                peoples={peoples}
                loading={loading}
                totalItem={totalItem}
                activePage={activePage}
                onClick={handleClick}
                onPageChanged={handlePageChanged}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(Character);
