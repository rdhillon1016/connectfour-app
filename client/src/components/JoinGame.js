import React from 'react';

import NamesList from './NamesList.js';


class JoinGame extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>hello</h1>
                <NamesList socket={this.props.socket} />
            </div>
        )
    }

    componentDidMount() {
        const socket = this.props.socket;
        socket.on('challenged self', () => {
            alert("You can't challenge yourself buddy");
        });

        socket.on('being challenged', (name) => {
            if (window.confirm(`${name} has challenged you. Do you want to play?`)) {
                console.log("okay");
            }
        });
    }
}

export default JoinGame;