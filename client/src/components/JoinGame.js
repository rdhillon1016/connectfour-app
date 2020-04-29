import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000';



class JoinGame extends React.Component {
    username = this.props.location.state.username;

    constructor(props) {
        super(props);
        this.state = {socket: null, usernames: null};
    }

    render() {
        return (
            <div>
                <h1>{this.props.location.state.username}</h1>
        <ul>{this.generateUsersList()}</ul>
            </div>
        )
    }

    generateUsersList = () => {
        let result = [];
        if (this.state.usernames != null) {
            for (let i = 0; i < this.state.usernames.length; i++) {
                result.push(<li>{this.state.usernames[i]}</li>);
            }
        }
        
        return result;
    }

    componentWillMount() {
        const socket = io(ENDPOINT);
        this.setState({ socket });
        socket.on('connect', () => console.log(`connected: ${socket.id}`));
        socket.emit('register user', this.props.location.state.username);
    }

    componentDidMount() {
        this.state.socket.on('updated users', (usernames) => {
            this.setState({ usernames })
        });
    }
}

export default JoinGame;