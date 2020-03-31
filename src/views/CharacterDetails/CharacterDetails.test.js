import React from 'react';
import { Router } from "react-router-dom";
import renderer from 'react-test-renderer';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import CharacterDetails from './CharacterDetails';
import reducer from '../../reducers'
import rootSaga from '../../sagas'
import history from '../../services/history';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

describe('View - CharacterDetails Test', () => {
    it('renders CharacterDetails without crashing', () => {
        const component = renderer.create(
            <Provider store={store}>
                <Router history={history}>
                    <CharacterDetails/>
                </Router>
            </Provider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
})