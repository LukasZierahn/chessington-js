import Piece from './piece';

export default class King extends Piece {
    constructor(player) {
        super(player);
        this.isKing = true;
    }

    getMovesToConsider(board) {
        this.isGivingCheck = false;
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

    getAvailableMoves(board) {
        return this.discardIllegalMoves(this.getMovesToConsider(board), board.findPiece(this), board);
    }
}
