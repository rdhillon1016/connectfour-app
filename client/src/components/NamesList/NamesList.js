import React from 'react';

import NameButton from '../NameButton/NameButton';

import './NamesList.css';

class NamesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {names: []}
    }

    componentDidMount() {
        this.props.socket.on('updated users', (usernames) => {
            this.setState({ names: usernames })
        });
    }

    componentWillUnmount() {

        this.props.socket.off('updated users');
    }
    

    render() { 
        const listItems = this.state.names.map(
            (name) => {
                return <NameButton key={name} name={name} socket={this.props.socket} />
            }
        )
        return (
            <div className='namesListContainer'>
                <div className='namesListTitle'>Online Users (Click to challenge)</div>
                <div className='namesListBox'>{listItems}</div>
            </div>
        )
     }
}

export default NamesList;