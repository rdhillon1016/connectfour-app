import React from 'react';

class ChallengeButton extends React.Component {

    constructor(props) {
        super(props);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick() {
        const socket = this.props.socket;

        socket.emit('accepted challenge', this.props.name);
    }

    render() {
        return (
            <button onClick = {this.handleButtonClick}>Click to accept challenge from {this.props.name}</button>
        )
    }
}

export default ChallengeButton;