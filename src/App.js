import React from 'react';
import { Router, Route } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import './App.css';
import reducer from './reducers'
import rootSaga from './sagas'
import history from './services/history';
import CharacterList from './views/Character/CharacterList';
import Details from './views/Details/Details';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div>
          <div className={'background'}></div>
          <Route exact path="/" component={CharacterList} />
          <Route path="/character-list" component={CharacterList} />
          <Route path="/details/:type?/:id?" component={Details} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
