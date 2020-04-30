import React from 'react';
import './Board.css';

import BoardColumn from './BoardColumn/BoardColumn.js';

class Board extends React.Component {
    render() {
        let boardColumns = [];

        for (let y = 0; y < 7; y++) {
            boardColumns.push(<BoardColumn key={y} colNum={y} socket={this.props.socket} />);
        }

        return (
            <div className='board'>
                {boardColumns}
            </div>
        )
    }
}

export default Board;