import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [name, setName] = useState('');

    return (
        <div>
            <p>Display Name</p>
            <input type="text" name="" onChange={(event) => setName(event.target.value)}></input>
            <Link onClick={e => (!name) ? e.preventDefault() : null} to={
                {pathname: '/join', state: {username: name}}
            }>
                <button type="submit">Begin</button>
            </Link>
        </div>
    );
}

export default Login;