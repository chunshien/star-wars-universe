import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import CharacterList from './views/CharacterList.js';

function App() {
  return (
    <Router>
      <div className="App">            
        <Route exact path="/" component={CharacterList} />
        <Route path="/character-list" component={CharacterList} />
      </div>
    </Router>
  );
}

export default App;
