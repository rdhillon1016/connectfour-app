import React from 'react';

import BoardCell from './BoardCell.js';

class BoardColumn extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {cellStates: ["emptyCell", "emptyCell", "emptyCell", "emptyCell", "emptyCell", "emptyCell"]};
    }

    componentDidMount() {
        const socket = this.props.socket;
        socket.on(`update column ${this.props.colNum}`, (moveInfo) => {
            const row = moveInfo.row;
            const colour = moveInfo.cell;
            if (row > -1 && row < 6) {
                let newCellStates = [...this.state.cellStates];
                newCellStates[row] = colour;
                this.setState({cellStates: newCellStates});
            }
        })
    }

    handleClick() {
        const socket = this.props.socket;
        const row = this.findLowestEmptyCell();
        if (row >= 0) {
            socket.emit('play turn', {row, col: this.props.colNum});
        }
    }

    findLowestEmptyCell() {
        let result = -1;
        for (let i = 0; i < 6; i++) {
            if (this.state.cellStates[i] === "emptyCell") {
                result = i;
            }
        }
        return result;
    }

    render() {
        console.log("render called");
        let cells = [];
        for (let x = 0; x < 6; x++) {
            cells.push(<BoardCell cellStatus={this.state.cellStates[x]} key={x} x={x} y={this.props.colNum} />)
        }

        return (
            <div className="column" onClick={this.handleClick}>
                {cells}
            </div>
        )
    }
}

export default BoardColumn;