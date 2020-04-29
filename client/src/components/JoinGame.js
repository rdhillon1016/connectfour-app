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

    
}

export default JoinGame;