import React from 'react';

import NamesList from './NamesList.js';
import ChallengesList from './ChallengesList.js'


class JoinGame extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>hello</h1>
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
}

export default JoinGame;