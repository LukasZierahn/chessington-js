import Piece from './piece';

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let moves = [];

        const currentSquare = board.findPiece(this);

        //adding the squares in all directions
        for (let i = 1; this.addSquareToArray(moves, currentSquare.row + i, currentSquare.col, board, true); i++);
        for (let i = 1; this.addSquareToArray(moves, currentSquare.row - i, currentSquare.col, board, true); i++);
        for (let i = 1; this.addSquareToArray(moves, currentSquare.row, currentSquare.col + i, board, true); i++);
        for (let i = 1; this.addSquareToArray(moves, currentSquare.row, currentSquare.col - i, board, true); i++);

        return moves;
    }
}
