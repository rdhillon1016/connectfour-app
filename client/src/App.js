import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import JoinGame from './components/JoinGame';
import Game from './components/Game';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Route path="/" exact component = {Login} />
      <Route path="/join" exact component={JoinGame} />
      <Route path="/game" exact component={Game} />
    </Router>
  );
}

export default App;
