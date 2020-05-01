import React from 'react';
import "./BoardCell.css";

class BoardCell extends React.Component {

    render() {
        return (
            <div className={this.props.cellStatus}>
            </div>
        )
    }
}

export default BoardCell;