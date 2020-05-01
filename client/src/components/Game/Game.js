import React from 'react';

import Board from '../Board/Board.js'
import './Game.css';
import '../JoinGame/JoinGame.css'

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const socket = this.props.socket;
        socket.emit('return lobby click');
    }
    
    render() {
        return (
            <div className='gameContainer'>
                <div className='usernameBox'>
                    Username: {this.props.name}
                    <button onClick={this.handleClick} className='returnButton'>Return to lobby</button>
                </div>
                <Board socket={this.props.socket} />
            </div>
        );
    }
}

export default Game;