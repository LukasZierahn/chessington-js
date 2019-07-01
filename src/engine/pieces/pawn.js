import Piece from './piece';
import Player from './../player';
import Square from './../square';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let moves = [];

        const currentSquare = board.findPiece(this);
        

        let pushDir = 0
        if (this.player == Player.WHITE) {
            pushDir = 1;
        } else {
            pushDir = -1;
        }

        let targetSquare = new Square(currentSquare.row + pushDir, currentSquare.col);
        if (board.getPiece(targetSquare) === undefined) {
            moves.push(targetSquare);
        }
        // console.log(moves);

        return moves;
    }
}
