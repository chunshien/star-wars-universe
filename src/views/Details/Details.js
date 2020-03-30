import React, { Fragment, useEffect } from 'react';
import _ from 'lodash';
import './Details.css';
import Button from '../../components/Button/Button';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDetails } from '../../actions';
import { useHistory } from 'react-router-dom'

function Details({loading, getDetails, details}) {
    const { type, id } = useParams();
    let history = useHistory()  

    const fetchDetails = async () => {
        await getDetails(type + '/' + id);        
    }
    useEffect(() => {
        fetchDetails();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    [details.url]);
    
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

    const handleBack = () => {
        history.goBack();
    }

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