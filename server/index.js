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
let usersInGame = {};
let numGames = -1;
let games = [];


io.on('connection', (socket) => {
    console.log(`Connection: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Disconnection: ${socket.id}`);
        
        if (isUserInMain(socket.id)) {
            removeUserFromMain(socket.id);
            io.emit('updated users', getUsernames());
        } else if (isUserInGame(socket.id)) {
            let id = findOpponent(socket.id);
            console.log(id);
            if (id != -1) {
                const name = usersInGame[id];
                io.to(id).emit('end game winner', name);
                usersInMain[id] = name;
                removeUserFromGame(id);
            }
            removeUserFromGame(socket.id);
        }
    });

    socket.on('register user', (username) => {
        if (!usersInMain.hasOwnProperty(socket.id)) {
            usersInMain[socket.id] = username;
        }
        io.to(socket.id).emit('successful registration', username);
        io.emit('updated users', getUsernames());
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

    socket.on('accepted challenge', (username) => {
        const id = findSocketID(username);
        if (id != 0) {
            if (usersInMain[id] != socket.id) {
                io.to(socket.id).emit('start game', usersInMain[socket.id]);
                io.to(id).emit('start game', usersInMain[id]);
                let gameObj = {
                    bluePlayer: socket.id,
                    redPlayer: id,
                    
                }
                games.push(gameObj);
                usersInGame[socket.id] = usersInMain[socket.id];
                removeUserFromMain(socket.id);
                usersInGame[id] = usersInMain[id];
                removeUserFromMain(id);
                io.emit('updated users', getUsernames());
            }
        }
        io.to(socket.id).emit('update challenges', username);
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

function findOpponent(id) {
    let result = -1;

    games.forEach((game) => {
        if (game.bluePlayer === id) {
            result = game.redPlayer;
            return result;
        }
        if (game.redPlayer === id) {
            result = game.bluePlayer;
            return result;
        }
    })

    return result;
}

function isUserInMain(id) {
    return usersInMain.hasOwnProperty(id);
}

function isUserInGame(id) {
    return usersInGame.hasOwnProperty(id);
}

function getUsernames() {
    return Object.values(usersInMain);
}

function removeUserFromMain(id) {
    delete usersInMain[id];
}

function removeUserFromGame(id) {
    delete usersInGame[id];
}
