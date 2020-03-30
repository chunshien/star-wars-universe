import React, { Fragment, useEffect, useCallback } from 'react';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDetails } from '../../actions';
import { useHistory } from 'react-router-dom'

import './Details.css';
import Button from '../../components/Button/Button';

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
                        <div key={item} className={'details-field'}>
                            <div className={'details-label'}>{label} : </div>
                            <div className={'details-value'}>
                                {details[item].length > 0 ? details[item].map((child) => (
                                    <div key={child}>{child}</div>
                                )) : '-'}
                            </div>
                        </div>
                    )
                }
                else {
                    return (
                        <div key={item} className={'details-field'}>
                            <div className={'details-label'}>{label} : </div>
                            <div className={'details-value'}>{details[item]}</div>
                        </div>
                    )
                }
            });
        }
    }

    const handleBack = useCallback(() => {history.goBack()}, [history]);
    
    return (
        <Fragment>
            {loading && 
                <div className={'loader-container'}>
                    <div className={'loader'}></div>
                </div>
            }
            <div className={'details-header'}>Details</div>
            <div className={'details-content'}>
                {renderField()}
            </div>
            <div className={'back-button-container'}>
                <Button onClick={handleBack} />
            </div>
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