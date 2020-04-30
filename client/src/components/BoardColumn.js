import React from 'react';

import BoardCell from './BoardCell.js';

class BoardColumn extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {cellStates: ["emptyCell", "emptyCell", "emptyCell", "emptyCell", "emptyCell", "emptyCell"]};
    }

    handleClick() {
        console.log("called");
        const emptyCellNum = this.findLowestEmptyCell();
        console.log(emptyCellNum);
        if (emptyCellNum > -1 && emptyCellNum < 6) {
            let newCellStates = [...this.state.cellStates];
            newCellStates[emptyCellNum] = "redCell";
            this.setState({cellStates: newCellStates});
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