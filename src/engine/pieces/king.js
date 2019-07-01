import Piece from './piece';

export default class King extends Piece {
    constructor(player) {
        super(player);
        this.isKing = true;
    }

    getAvailableMoves(board) {
        let moves = [];

        const currentSquare = board.findPiece(this);

        this.addSquareToArray(moves, currentSquare.row + 1, currentSquare.col + 1, board, true, this.player);
        this.addSquareToArray(moves, currentSquare.row + 1, currentSquare.col, board, true, this.player);
        this.addSquareToArray(moves, currentSquare.row + 1, currentSquare.col - 1, board, true, this.player);

        this.addSquareToArray(moves, currentSquare.row, currentSquare.col + 1, board, true, this.player);
        this.addSquareToArray(moves, currentSquare.row, currentSquare.col, board, true, this.player);
        this.addSquareToArray(moves, currentSquare.row, currentSquare.col - 1, board, true, this.player);

        this.addSquareToArray(moves, currentSquare.row - 1, currentSquare.col + 1, board, true, this.player);
        this.addSquareToArray(moves, currentSquare.row - 1, currentSquare.col, board, true, this.player);
        this.addSquareToArray(moves, currentSquare.row - 1, currentSquare.col - 1, board, true, this.player);

        return moves;
    }
}
