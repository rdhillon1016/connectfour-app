import React from 'react';

import ChallengeButton from '../ChallengeButton/ChallengeButton.js';

import './ChallengesList.css';

class ChallengesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {names: []}
    }

    componentDidMount() {
        const socket = this.props.socket;

        socket.on('being challenged', (name) => {
            if (!this.state.names.includes(name)) {
                let newNames = [name, ...this.state.names];
                this.setState({names: newNames});
            }
        });

        socket.on('update challenges', (name) => {
            let index = this.state.names.findIndex((n) => n === name);
            if (index >= 0) {
                let newNames = [...this.state.names];
                newNames.splice(index, 1);
                this.setState({names: newNames});
            }
        })
    }

    componentWillUnmount() {
        const socket = this.props.socket;
        socket.off('being challenged');
        socket.off('update challenges');
    }

    render() { 
        const listItems = this.state.names.map(
            (name) => {
                return <ChallengeButton key={name} name={name} socket={this.props.socket} />
            }
        )
        return (
            <div className='challengesListContainer'>
                <div className='challengesListTitle'>Invites (Click to accept)</div>
                <div className='challengesListBox'>{listItems}</div>
            </div>
        )
     }
}

export default ChallengesList;