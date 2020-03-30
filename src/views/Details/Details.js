import React, { Fragment, useEffect, useCallback } from 'react';
import _ from 'lodash';
import styled from 'styled-components'
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDetails } from '../../actions';
import { useHistory } from 'react-router-dom'

import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';

const Header = styled.div`
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    padding: 10px;
`;

const Content = styled.div`
    background-color: white;
    box-sizing: border-box;
    padding: 20px;
    margin: 20px 20%;
    border-radius: 5px;
    box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
`;

const Field = styled.div`
    width: 100%;
    display: table;
`;

const Label = styled.div`
    width: 30%;
    display: table-cell;
    padding: 5px;
    text-align: right;
`;

const Value = styled.div`
    width: 70%;
    display: table-cell;
    padding: 5px;
`;

const ButtonContainer = styled.div`
    padding: 10px 20%; 
`;


function Details({loading, getDetails, details}) {
    const { type, id } = useParams();
    let history = useHistory()  

    useEffect(() => {
        getDetails(type + '/' + id);
    }, [type, id, getDetails]);
    
    const renderField = () => {
        if (details) {
            return Object.keys(details).map((item)=>{
                const label = _.startCase(item.replace('_', ' '));
                if (typeof details[item] === 'object') {
                    return (
                        <Field key={item} >
                            <Label>{label} : </Label>
                            <Value>
                                {details[item].length > 0 ? details[item].map((child) => (
                                    <div key={child}>{child}</div>
                                )) : '-'}
                            </Value>
                        </Field>
                    )
                }
                else {
                    return (
                        <Field key={item}>
                            <Label>{label} : </Label>
                            <Value>{details[item]}</Value>
                        </Field>
                    )
                }
            });
        }
    }

    const handleBack = useCallback(() => {history.goBack()}, [history]);
    
    return (
        <Fragment>
            <Header>Details</Header>
            {loading ? 
                <Loading />
                :
                <Fragment>
                    <Content>
                        {renderField()}
                    </Content>
                    <ButtonContainer>
                        <Button onClick={handleBack} />
                    </ButtonContainer>
                </Fragment>
            }
        </Fragment>
    )
}

const mapDispatchToProps = {
    getDetails: getDetails,
};

const mapStateToProps = (state) => ({
    details: state.details,
    loading: state.loading
})

export default  connect(mapStateToProps, mapDispatchToProps)(Details);