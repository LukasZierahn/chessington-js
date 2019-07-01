import Piece from './piece';
import Player from './../player';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
        this.isPawn = true;
    }

    getAvailableMoves(board) {
        let moves = [];

        const currentSquare = board.findPiece(this);
        
        if (this.player == Player.WHITE) {
            if (this.addSquareToArray(moves, currentSquare.row + 1, currentSquare.col, board, false, this.player)) {
                //allowing double moves if it is a first move
                if (currentSquare.row == 1) {
                    this.addSquareToArray(moves, currentSquare.row + 2, currentSquare.col, board, false, this.player)
                }
            }

            //Allowing Capturing of Pieces
            this.addSquareToArray(moves, currentSquare.row + 1, currentSquare.col + 1, board, true, this.player);
            this.addSquareToArray(moves, currentSquare.row + 1, currentSquare.col - 1, board, true, this.player);
        } else {
            if (this.addSquareToArray(moves, currentSquare.row - 1, currentSquare.col, board, false, this.player)) {
                //allowing double moves if it is a first move
                if (currentSquare.row == 6) {
                    this.addSquareToArray(moves, currentSquare.row - 2, currentSquare.col, board, false, this.player)
                }
            }

            //Allowing Capturing of Pieces
            this.addSquareToArray(moves, currentSquare.row - 1, currentSquare.col + 1, board, true, this.player);
            this.addSquareToArray(moves, currentSquare.row - 1, currentSquare.col - 1, board, true, this.player);
        }

        return moves;
    }
}
