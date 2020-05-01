import React from 'react';

import NamesList from '../NamesList/NamesList.js';
import ChallengesList from '../ChallengesList/ChallengesList.js'

import './JoinGame.css';


class JoinGame extends React.Component {

    render() {
        return (
            <div className='joinContainer'>
                <div className='usernameBox'>
                    Username: {this.props.name}
                </div>
                <div className='listsContainer'>
                    <NamesList socket={this.props.socket} />
                    <ChallengesList socket={this.props.socket} />
                </div>
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