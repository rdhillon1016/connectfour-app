import React from 'react';

import Board from '../Board/Board.js'
import './Game.css';
import '../JoinGame/JoinGame.css'

class Game extends React.Component {
    
    render() {
        return (
            <div className='gameContainer'>
                <div className='usernameBox'>
                    Username: {this.props.name}
                </div>
                <Board socket={this.props.socket} />
            </div>
        );
    }
}

export default Game;