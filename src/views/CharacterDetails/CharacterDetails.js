import React, { Fragment, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDetails } from '../../actions';
import { useHistory } from 'react-router-dom'

import Details from '../../components/Character/Details';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';

const Header = styled.div`
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    padding: 10px;
`;

const ButtonContainer = styled.div`
    padding: 10px 20%; 
`;

function CharacterDetails({loading, getDetails, details}) {
    const { type, id } = useParams();
    let history = useHistory()  

    useEffect(() => {
        getDetails(type + '/' + id);
    }, [type, id, getDetails]);

    const handleBack = useCallback(() => {history.goBack()}, [history]);
    
    return (
        <Fragment>
            <Header>Details</Header>
            {loading ? 
                <Loading />
                :
                <Fragment>
                    <Details 
                        details={details}
                    />
                    <ButtonContainer>
                        <Button onClick={handleBack} />
                    </ButtonContainer>
                </Fragment>
            }
        </Fragment>
    )
}

CharacterDetails.propTypes = {
    loading: PropTypes.bool,
    details: PropTypes.object,
    getDetails: PropTypes.func
};

const mapDispatchToProps = {
    getDetails: getDetails,
};

const mapStateToProps = (state) => ({
    details: state.details,
    loading: state.loading
})

export default  connect(mapStateToProps, mapDispatchToProps)(CharacterDetails);