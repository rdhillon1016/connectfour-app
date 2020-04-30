import React from 'react';

import io from 'socket.io-client';
import './App.css';
import JoinGame from './components/JoinGame/JoinGame';
import Game from './components/Game/Game';
import Login from './components/Login/Login';

const ENDPOINT = 'http://localhost:5000';

class App extends React.Component {
  constructor() {
    super();
    this.state = { socket: null, view: null };

  }

  componentDidMount() {
    const socket = io(ENDPOINT);
    this.setState({ socket });
    socket.on('connect', () => console.log(`connected: ${socket.id}`));
    this.setState({ view: <Login socket={socket} /> })

    socket.on('successful registration', (username) => {
      this.setState({ view: <JoinGame socket={socket} name={username} /> })
    })

    socket.on('start game', (username) => {
      this.setState({ view: <Game socket={socket} name={username} /> })
    })

    socket.on('end game', (username) => {
      this.setState({ view: <JoinGame socket={socket} name={username} /> })
      alert("You lost the game and you're bad")
    })

    socket.on('end game tie', (username) => {
      this.setState({ view: <JoinGame socket={socket} name={username} /> })
      alert("You tied. Both trash.")
    })

    socket.on('end game winner', (username) => {
      this.setState({ view: <JoinGame socket={socket} name={username} /> })
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
