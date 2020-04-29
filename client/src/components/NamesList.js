import React from 'react';

class NamesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {names: []}
    }

    componentDidMount() {
        this.props.socket.on('updated users', (usernames) => {
            this.setState({ names: usernames })
            console.log(this.state.names);
        });
    }
    

    render() { 
        const listItems = this.state.names.map(
            (name) => {
                return <li>{name}</li>
            }
        )
        return (
            <div><ul>{listItems}</ul></div>
        )
     }
}

export default NamesList;