import React, { Fragment, useEffect } from 'react';
import _ from 'lodash';
import './CharacterList.css';
import ListItem from '../../components/Character/ListItem.js';
import { connect } from 'react-redux';
import { getPeople } from '../../actions';

function dataPropsAreEqual(prevProps, nextProps) {
	return _.isEqual(prevProps.peoples, nextProps.peoples);
}

const CharacterList = React.memo(function CharacterList({ peoples, getPeople }) {
    useEffect(() => {
        getPeople(1);
    });

    const renderList = () => {
        if (peoples) {
            return peoples.map(item=>{
                return (
                    <ListItem key={item.url} data={item} />
                )
            });
        }
    }

    return (
        <Fragment>
            <div className={'title'}>
                Star Wars Characters 
            </div>
            <div className={'list'}>
                {renderList()}
            </div>
        </Fragment>
    );
}, dataPropsAreEqual);

const mapDispatchToProps = {
    getPeople: getPeople,
};

const mapStateToProps = (state) => ({
    peoples: state.peoples,
})

export default connect(mapStateToProps, mapDispatchToProps)(CharacterList);
