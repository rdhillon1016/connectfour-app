import React from 'react';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    setName(name) {
        this.setState({name});
    }

    handleLoginClick() {
        if (!this.state.hasOwnProperty('name')) {
            return;
        }
        this.props.socket.emit('register user', this.state.name);
    }

    render () {
        return (
            <div>
                <p>Display Name</p>
                <input type="text" name="" onChange={(event) => this.setName(event.target.value)}></input>
                <button onClick={this.handleLoginClick}>Begin</button>
            </div>
        );
    } 
}

export default Login;