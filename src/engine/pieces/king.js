import Piece from './piece';

export default class King extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let moves = [];

        const currentSquare = board.findPiece(this);

        this.addSquareToArray(moves, currentSquare.row + 1, currentSquare.col + 1, board, true);
        this.addSquareToArray(moves, currentSquare.row + 1, currentSquare.col, board, true);
        this.addSquareToArray(moves, currentSquare.row + 1, currentSquare.col - 1, board, true);

        this.addSquareToArray(moves, currentSquare.row, currentSquare.col + 1, board, true);
        this.addSquareToArray(moves, currentSquare.row, currentSquare.col, board, true);
        this.addSquareToArray(moves, currentSquare.row, currentSquare.col - 1, board, true);

        this.addSquareToArray(moves, currentSquare.row - 1, currentSquare.col + 1, board, true);
        this.addSquareToArray(moves, currentSquare.row - 1, currentSquare.col, board, true);
        this.addSquareToArray(moves, currentSquare.row - 1, currentSquare.col - 1, board, true);

        return moves;
    }
}
