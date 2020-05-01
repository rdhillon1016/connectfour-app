import React from 'react';

import './NameButton.css';

class NameButton extends React.Component {

    constructor(props) {
        super(props);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick() {
        const socket = this.props.socket;

        socket.emit('person challenged', this.props.name);
    }

    render() {
        return (
            <button className='nameButton' onClick = {this.handleButtonClick}>{this.props.name}</button>
        )
    }
}

export default NameButton;