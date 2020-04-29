const express = require('express');
const socket = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();

const server = http.createServer(app);
const io = socket(server);

app.use(router);

server.listen(PORT, () => console.log(`Started on port ${PORT}`));

let users = [];

io.on('connection', (socket) => {
    console.log(`Connection: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Disconnection: ${socket.id}`);
        removeUser(socket.id);
        io.emit('updated users', getUsernames());
    });

    socket.on('register user', (username) => {
        let user = {};
        user[socket.id] = username;
        users.push(user);
        io.to(socket.id).emit('successful registration');
        io.emit('updated users', getUsernames());
    });
});

function getUsernames() {
    let result = [];
    let i;
    for (i = 0; i < users.length; i++) {
        result.push(Object.values(users[i])[0]);
    }
    return result;
}

function removeUser(id) {
    const index = users.findIndex((user) => Object.keys(user)[0] === id)
    if (index >= 0) {
        users.splice(index, 1);
    }
}
