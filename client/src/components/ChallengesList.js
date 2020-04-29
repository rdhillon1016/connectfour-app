import React from 'react';

import ChallengeButton from './ChallengeButton.js';

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
                console.log(this.state.names);
            }
        });

        socket.on('update challenges', (name) => {
            let index = this.state.names.findIndex(name);
            if (index >= 0) {
                let newNames = [...this.state.names];
                newNames.splice(index, 1);
                this.setState(newNames);
            }
        })
    }

    render() { 
        const listItems = this.state.names.map(
            (name) => {
                return <ChallengeButton key={name} name={name} socket={this.props.socket} />
            }
        )
        return (
            <div>{listItems}</div>
        )
     }
}

export default ChallengesList;