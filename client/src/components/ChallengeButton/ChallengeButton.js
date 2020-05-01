import React from 'react';

import './ChallengeButton.css';

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
            <button className='challengeButton' onClick = {this.handleButtonClick}>Invite from {this.props.name}</button>
        )
    }
}

export default ChallengeButton;