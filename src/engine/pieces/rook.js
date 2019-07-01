import Piece from './piece';

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getMovesToConsider(board) {
        this.isGivingCheck = false;
        let moves = [];

        const currentSquare = board.findPiece(this);

        //adding the squares in all directions
        for (let i = 1; this.addSquareToArray(moves, currentSquare.row + i, currentSquare.col, board, true, this.player); i++);
        for (let i = 1; this.addSquareToArray(moves, currentSquare.row - i, currentSquare.col, board, true, this.player); i++);
        for (let i = 1; this.addSquareToArray(moves, currentSquare.row, currentSquare.col + i, board, true, this.player); i++);
        for (let i = 1; this.addSquareToArray(moves, currentSquare.row, currentSquare.col - i, board, true, this.player); i++);

        return moves;
    }

    getAvailableMoves(board) {
        return this.discardIllegalMoves(this.getMovesToConsider(board), board.findPiece(this), board);
    }
}
