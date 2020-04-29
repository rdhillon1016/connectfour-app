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

let usersInMain = {};
let numGames = -1;
let games = [];


io.on('connection', (socket) => {
    console.log(`Connection: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Disconnection: ${socket.id}`);
        removeUser(socket.id);
        io.emit('updated users', getUsernames());
    });

    socket.on('register user', (username) => {
        if (!usersInMain.hasOwnProperty(socket.id)) {
            usersInMain[socket.id] = username;
        }
        socket.join('main');
        io.to(socket.id).emit('successful registration');
        io.to('main').emit('updated users', getUsernames());
    });

    socket.on('person challenged', (username) => {
        const id = findSocketID(username);
        if (id != 0) {
            if (id === socket.id) {
                io.to(socket.id).emit('challenged self');
                return;
            }
            io.to(id).emit('being challenged', usersInMain[socket.id]);
        }
    })
});

function findSocketID(username) {
    let result = 0;
    Object.keys(usersInMain).forEach(
        (id) => {
            if (usersInMain[id] === username) {
                result = id;
            }
        }
    )
    return result;
}

function getUsernames() {
    return Object.values(usersInMain);
}

function removeUser(id) {
    delete usersInMain[id];
}
