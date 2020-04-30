const RED = -1;
const BLUE = 1;
const EMPTY = 0;
const NUM_COLUMNS = 7;
const NUM_ROWS = 6;
const NO_WINNER = 0;

class Game {

    // [0][0] on board represents top left
    board;
    turn;
    numFilledBoxes;

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
        }
        if ((row + 1 === NUM_ROWS) || this.board[row + 1][col] !== 0) {
            this.board[row][col] = this.turn;

            this.switchTurn();
            this.numFilledBoxes++;
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
        if (this.checkVertical(RED) || 
                this.checkHorizontal(RED) ||
                this.checkForwardDiagnol(RED) || 
                this.checkBackwardDiagnol(RED)) {
            return RED;
        }
        if (this.checkVertical(BLUE) || 
                this.checkHorizontal(BLUE) ||
                this.checkForwardDiagnol(BLUE) || 
                this.checkBackwardDiagnol(BLUE)) {
            return BLUE;
        }
        return NO_WINNER;
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

    checkForwardDiagnol(colour) {
        for (let j = 3; j < NUM_COLUMNS; j++) {
            for (let i = 0; i < NUM_ROWS - 3; i++) {
                for (let count = 0; count < 4; count++) {
                    if (this.board[i + count][j - count] !== colour) {
                        break;
                    }
                    if (count === 3) {
                        return true;
                    }
                }
            }
        }
    }

    checkBackwardDiagnol(colour) {
        for (let j = 0; j < NUM_COLUMNS - 3; j++) {
            for (let i = 0; i < NUM_ROWS - 3; i++) {
                for (let count = 0; count < 4; count++) {
                    if (this.board[i + count][j + count] !== colour) {
                        break;
                    }
                    if (count === 3) {
                        return true;
                    }
                }
            }
        }
    }
}

module.exports = Game;