import Piece from './piece';
import Player from './../player';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let moves = [];

        const currentSquare = board.findPiece(this);
        
        if (this.player == Player.WHITE) {
            this.addSquareToArray(moves, currentSquare.row + 1, currentSquare.col, board, true)

            //allowing double moves if it is a first move
            if (currentSquare.row == 1) {
                this.addSquareToArray(moves, currentSquare.row + 2, currentSquare.col, board, true)
            }

        } else {
            this.addSquareToArray(moves, currentSquare.row - 1, currentSquare.col, board, true)

            //allowing double moves if it is a first move
            if (currentSquare.row == 6) {
                this.addSquareToArray(moves, currentSquare.row - 2, currentSquare.col, board, true)
            }
        }

        return moves;
    }
}
