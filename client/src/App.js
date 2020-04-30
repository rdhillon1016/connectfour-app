import React from 'react';

import io from 'socket.io-client';

import JoinGame from './components/JoinGame';
import Game from './components/Game';
import Login from './components/Login';

const ENDPOINT = 'http://localhost:5000';

class App extends React.Component {
  constructor () {
    super();
    this.state = {socket: null, view: null};
    
  }

  componentDidMount() {
    const socket = io(ENDPOINT);
    this.setState({ socket });
    socket.on('connect', () => console.log(`connected: ${socket.id}`));
    this.setState({view: <Login socket={socket} />})

    socket.on('successful registration', (username) => {
      this.setState({view: <JoinGame socket={socket} name={username} />})
    }) 

    socket.on('start game', (username) => {
      this.setState({view: <Game socket = {socket} name={username} />})
    })

    socket.on('end game', (username) => {
      this.setState({view: <JoinGame socket = {socket} name={username} />})
    })

    socket.on('end game winner', (username) => {
      this.setState({view: <JoinGame socket = {socket} name={username} />})
      alert("You won the game you beast");
    })
  }

  render () {
    return (
      <div>
        {this.state.view}
      </div>
    )
  }
}

export default App;
