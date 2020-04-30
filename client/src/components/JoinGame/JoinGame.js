import React from 'react';

import NamesList from '../NamesList/NamesList.js';
import ChallengesList from '../ChallengesList/ChallengesList.js'


class JoinGame extends React.Component {

    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                <NamesList socket={this.props.socket} />
                <ChallengesList socket={this.props.socket} />
            </div>
        )
    }

    componentDidMount() {
        const socket = this.props.socket;
        socket.on('challenged self', () => {
            alert("You can't challenge yourself buddy");
        });
    }

    componentWillUnmount() {
        const socket = this.props.socket;
        socket.off("challenged self");
    }
}

export default JoinGame;