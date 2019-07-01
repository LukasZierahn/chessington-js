import Piece from './piece';

export default class Bishop extends Piece {
    constructor(player) {
        super(player);
        this.isKing = false;
    }

    getAvailableMoves(board) {
        let moves = [];

        const currentSquare = board.findPiece(this);

        //adding the squares in all directions
        for (let i = 1; this.addSquareToArray(moves, currentSquare.row + i, currentSquare.col + i, board, true, this.player); i++);
        for (let i = 1; this.addSquareToArray(moves, currentSquare.row - i, currentSquare.col + i, board, true, this.player); i++);
        for (let i = 1; this.addSquareToArray(moves, currentSquare.row + i, currentSquare.col - i, board, true, this.playerue); i++);
        for (let i = 1; this.addSquareToArray(moves, currentSquare.row - i, currentSquare.col - i, board, true, this.player); i++);

        return moves;
    }
}
