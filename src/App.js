import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import CharacterList from './views/Character/CharacterList';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import reducer from './reducers'
import rootSaga from './sagas'
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
// const action = type => store.dispatch({type});

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={CharacterList} />
          <Route path="/character-list" component={CharacterList} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
