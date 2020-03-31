import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components'

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


function Details(props) {
    const renderField = () => {
        const {details} = props;
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

    return (
        <Fragment>
            <Content>
                {renderField()}
            </Content>            
        </Fragment>
    )
}
Details.propTypes = {
    details: PropTypes.object
};
export default Details;