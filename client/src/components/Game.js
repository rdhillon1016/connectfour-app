import React from 'react';

import Board from './Board.js'

class Game extends React.Component {
    
    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                <Board socket={this.props.socket} />
            </div>
        );
    }
}

export default Game;