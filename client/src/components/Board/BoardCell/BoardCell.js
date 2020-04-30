import React from 'react';
import "./BoardCell.css";

class BoardCell extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick.bind(this);
    }

    handleClick() {

    }

    render() {
        return (
            <div onClick={this.handleClick} className={this.props.cellStatus}>
                <p>{this.props.x} {this.props.y}</p>
            </div>
        )
    }
}

export default BoardCell;