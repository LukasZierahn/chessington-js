import Piece from './piece';

export default class Knight extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let moves = [];

        const currentSquare = board.findPiece(this);

        this.addSquareToArray(moves, currentSquare.row + 2, currentSquare.col + 1, board, true);
        this.addSquareToArray(moves, currentSquare.row + 1, currentSquare.col + 2, board, true);

        this.addSquareToArray(moves, currentSquare.row - 2, currentSquare.col + 1, board, true);
        this.addSquareToArray(moves, currentSquare.row - 1, currentSquare.col + 2, board, true);

        this.addSquareToArray(moves, currentSquare.row + 2, currentSquare.col - 1, board, true);
        this.addSquareToArray(moves, currentSquare.row + 1, currentSquare.col - 2, board, true);
        
        this.addSquareToArray(moves, currentSquare.row - 2, currentSquare.col - 1, board, true);
        this.addSquareToArray(moves, currentSquare.row - 1, currentSquare.col - 2, board, true);

        return moves;
    }
}
