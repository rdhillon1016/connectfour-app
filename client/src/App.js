import React from 'react';

import io from 'socket.io-client';
import './App.css';
import JoinGame from './components/JoinGame/JoinGame';
import Game from './components/Game/Game';
import Login from './components/Login/Login';

const ENDPOINT = 'https://connectfour-app.herokuapp.com/';

class App extends React.Component {
  constructor() {
    super();
    this.state = { socket: null, view: null };

  }

  componentDidMount() {
    const socket = io(ENDPOINT);
    this.setState({ socket });
    this.setState({ view: <Login socket={socket} /> })

    socket.on('successful registration', (username) => {
      this.setState({ view: <JoinGame socket={socket} name={username} /> })
    })

    socket.on('start game', (username) => {
      this.setState({ view: <Game socket={socket} name={username} /> })
    })

    socket.on('return user to lobby', (username) => {
      this.setState({ view: <JoinGame socket={socket} name={username} /> })
    })

    socket.on('end game', () => {
      alert("You lost the game and you're bad")
    })

    socket.on('end game tie', () => {
      alert("You tied. Both trash.")
    })

    socket.on('end game winner', () => {
      alert("You won the game you beast");
    })
  }

  render() {
    return (
      <div className='appContainer'>
        <div className='title'>
          Connect Four
        </div>
        <div className='viewContainer'>
          {this.state.view}
        </div>
      </div>
    )
  }
}

export default App;
