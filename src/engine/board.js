import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import King from './pieces/king';

export default class Board {
    constructor(currentPlayer) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();

        this.lastMoveFromSquare = Square.at(-1,-1);
        this.lastMoveToSquare = Square.at(-1,-1);
    }

    createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }

    setPiece(square, piece) {
        this.board[square.row][square.col] = piece;
    }

    getPiece(square) {
        return this.board[square.row][square.col];
    }

    copy() {
        let copy = new Board(this.currentPlayer);

        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                copy.board[row][col] = this.board[row][col];
            }
        }

        return copy;
    }

    //I am not quite certain if this is ever getting called, keeping it for legacy reasons
    findPiece(pieceToFind) {
        return this.findPieceFunc((inputPiece) => { return inputPiece === pieceToFind})
    }

    findPieceFunc(compareFunc) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] !== undefined && compareFunc(this.board[row][col])) {
                    return Square.at(row, col);
                }
            }
        }

        return undefined;
    }
    

    movePiece(fromSquare, toSquare) {
        const movingPiece = this.getPiece(fromSquare);        
        if (movingPiece && movingPiece.player === this.currentPlayer) {
            this.lastMoveFromSquare = fromSquare;
            this.lastMoveToSquare = toSquare;

            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
        }
    }

    gameStateIsLegal() {
        if (this.findPieceFunc((inputPiece) => { return inputPiece instanceof King && inputPiece.player == Player.WHITE}) === undefined) {
            return false;
        } 

        if (this.findPieceFunc((inputPiece) => { return inputPiece instanceof King && inputPiece.player == Player.BLACK}) === undefined) {
            return false;
        }

        let kingSquare = this.findPieceFunc((inputPiece) => { return inputPiece instanceof King && inputPiece.player != this.currentPlayer});

        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] && this.board[row][col].player === this.currentPlayer) {
                    
                    for(let squareTo of this.board[row][col].getMovesToConsider(this)) {
                        if (kingSquare.equals(squareTo)) {
                            return false;
                        }
                    }
                }
            }
        }

        return true;
    }
}
