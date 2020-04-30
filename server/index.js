const Game = require('./Game.js');

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

const RED = -1;
const BLUE = 1;
const NUM_COLUMNS = 7;
const NUM_ROWS = 6;


io.on('connection', (socket) => {
    console.log(`Connection: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Disconnection: ${socket.id}`);

        if (isUserInMain(socket.id)) {
            removeUserFromMain(socket.id);
            io.emit('updated users', getUsernames());
        } else if (isUserInGame(socket.id)) {
            let id = findOpponent(socket.id);
            if (id != -1) {
                const name = usersInGame[id].name;
                io.to(id).emit('end game winner', name);
                usersInMain[id] = name;
                removeGame(id);
                removeUserFromGame(id);
            }
            removeUserFromGame(socket.id);
        }

        updateAllUserLists();
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

    socket.on('play turn', (move) => {
        const row = move.row;
        const col = move.col;
        let game = findGame(socket.id);
        if (game !== -1) {
            let gameObj = game.game;
            let turn = gameObj.turn;
            if ((turn === BLUE && game.bluePlayer === socket.id) ||
                (turn === RED && game.redPlayer === socket.id)) {
                let colour;
                if (turn === BLUE) {
                    colour = "blueCell"
                } else {
                    colour = "redCell"
                }
                let emissionObj = { colour, row }
                gameObj.playTurn(row, col);
                io.to(game.redPlayer).emit(`update column ${col}`, emissionObj);
                io.to(game.bluePlayer).emit(`update column ${col}`, emissionObj);
                if (gameObj.numFilledBoxes === NUM_ROWS * NUM_COLUMNS) {
                    executeTieProcedure(game);
                }
                const potentialWinner = gameObj.checkWin();
                if (potentialWinner !== 0) {
                    executeWinProcedure(game, potentialWinner)
                }
            }
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
                    game: new Game()
                }
                numGames++;
                games.push(gameObj);
                usersInGame[socket.id] = { name: usersInMain[socket.id], gameNum: numGames };
                removeUserFromMain(socket.id);
                usersInGame[id] = { name: usersInMain[id], gameNum: numGames };
                removeUserFromMain(id);
                io.emit('updated users', getUsernames());
            }
        }
        io.to(socket.id).emit('update challenges', username);
    })
});

function executeWinProcedure(game, winner) {
    emitWin(game, winner);
    movePlayersBackToMain(game);
    updateAllUserLists()
}

function executeTieProcedure(game) {
    emitTie(game);
    movePlayersBackToMain(game);
    updateAllUserLists()
}

function updateAllUserLists() {
    io.emit('updated users', getUsernames())
}

function updateUsersList(id) {
    io.to(id).emit('updated users', getUsernames());
}

function emitTie(game) {
    io.to(game.bluePlayer).emit('end game tie', usersInGame[game.bluePlayer].name);
    io.to(game.redPlayer).emit('end game tie', usersInGame[game.redPlayer].name);
}

function emitWin(game, winner) {
    if (winner === BLUE) {
        io.to(game.bluePlayer).emit('end game winner', (usersInGame[game.bluePlayer].name));
        io.to(game.redPlayer).emit('end game', (usersInGame[game.redPlayer].name));
    } else {
        io.to(game.redPlayer).emit('end game winner', (usersInGame[game.redPlayer].name));
        io.to(game.bluePlayer).emit('end game', (usersInGame[game.bluePlayer].name));
    }
    io.to(game.bluePlayer).emit('updated users', getUsernames());
    io.to(game.bluePlayer).emit('updated users', getUsernames());
}

function movePlayersBackToMain(game) {
    removeGame(game.redPlayer);
    usersInMain[game.redPlayer] = usersInGame[game.redPlayer].name;
    usersInMain[game.bluePlayer] = usersInGame[game.bluePlayer].name;
    delete usersInGame[game.redPlayer];
    delete usersInGame[game.bluePlayer];
}

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

function findGame(id) {
    if (usersInGame.hasOwnProperty(id)) {
        const gameNum = usersInGame[id].gameNum;
        if (gameNum < games.length) {
            return games[gameNum];
        }
    }
    return -1;
}

function removeGame(id) {
    const gameNum = usersInGame[id].gameNum;
    games.splice(gameNum, 1);
    numGames--;
}

function findOpponent(id) {
    let result = -1;

    if (usersInGame.hasOwnProperty(id)) {
        const gameNum = usersInGame[id].gameNum;
        if (gameNum < games.length) {
            const game = games[gameNum];
            if (game.bluePlayer === id) {
                result = game.redPlayer;
            }
            if (game.redPlayer === id) {
                result = game.bluePlayer;
            }
        }
    }

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
