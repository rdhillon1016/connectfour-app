import React from 'react';

import './Login.css';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.state = {name: null}
    }

    setName(name) {
        this.setState({name});
    }

    handleLoginClick() {
        if (this.state.name === null) {
            return;
        }
        this.props.socket.emit('register user', this.state.name);
    }

    render () {
        return (
            <div className='loginContainer'>
                <div className='displayName'>Choose a display name.</div>
                <div className='inputContainer'>
                    <input className='inputBox' type="text"
                        name="" onChange={(event) => this.setName(event.target.value)}></input>
                </div>
                <button onClick={this.handleLoginClick} className='beginButton'>Begin</button>
            </div>
        );
    } 
}

export default Login;