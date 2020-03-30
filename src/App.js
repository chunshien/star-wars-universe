import React from 'react';
import { Router, Route } from "react-router-dom";
import styled from 'styled-components'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import backgroundImage from './assets/starwars.jpg';
import reducer from './reducers'
import rootSaga from './sagas'
import history from './services/history';
import CharacterList from './views/Character/CharacterList';
import Details from './views/Details/Details';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const Background = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    opacity: 0.4;
    z-index: -1;
    background-image: url('${backgroundImage}');
`;

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div>
          <Background />
          <Route exact path="/" component={CharacterList} />
          <Route path="/character-list" component={CharacterList} />
          <Route path="/details/:type?/:id?" component={Details} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
