import React from 'react';

import BoardColumn from './BoardColumn.js';

class Board extends React.Component {
    render() {
        let boardColumns = [];

        for (let y = 0; y < 7; y++) {
            boardColumns.push(<BoardColumn key={y} colNum={y} socket={this.props.socket} />);
        }

        return (
            <div>
                {boardColumns}
            </div>
        )
    }
}

export default Board;