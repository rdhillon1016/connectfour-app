const RED = -1;
const BLUE = 1;
const EMPTY = 0;
const NUM_COLUMNS = 7;
const NUM_ROWS = 6;

class Game {

    // [0][0] on board represents top left
    board;
    turn;

    constructor() {
        this.board = this.initBoard();
        this.turn = BLUE;
    }

    initBoard() {
        let result = new Array(NUM_ROWS);
        for (let i = 0; i < NUM_ROWS; i++) {
            result[i] = new Array(NUM_COLUMNS);
            for (let j = 0; j < NUM_COLUMNS; j++) {
                result[i][j] = EMPTY;
            }
        }
        return result;
    }

    playTurn(row, col) {
        if (row >= NUM_ROWS || col >= NUM_COLUMNS) {
            return;
        }
        if ((row + 1 === NUM_ROWS) || this.board[row + 1][col] !== 0) {
            this.board[row][col] = turn;

            this.switchTurn();
        }
    }

    switchTurn() {
        if (this.turn === BLUE) {
            this.turn = RED;
        } else {
            this.turn = BLUE;
        }
    }

    checkWin() {
        checkVertical(RED);
        checkVertical(BLUE);
        checkHorizontal(RED);
        checkHorizontal(BLUE);
        checkForwardDiagnol(RED);
        checkForwardDiagnol(BLUE);
        checkBackDiagnol(RED);
        checkBackDiagnol(BLUE);
    }

    checkVertical(colour) {
        for (let j = 0; j < NUM_COLUMNS; j++) {
            let count = 0;
            for (let i = 0; i < NUM_ROWS; i++) {
                if (this.board[i][j] !== colour) {
                    count = 0;
                } else {
                    count++;
                    if (count === 4) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    checkHorizontal(colour) {
        for (let i = 0; i < NUM_ROWS; i++) {
            let count = 0;
            for (let j = 0; j < NUM_COLUMNS; j++) {
                if (this.board[i][j] !== colour) {
                    count = 0;
                } else {
                    count++;
                    if (count === 4) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

module.exports = Game;