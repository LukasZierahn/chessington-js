import Piece from './piece';

export default class Knight extends Piece {
    constructor(player) {
        super(player);
        this.isKing = false;
    }

    getAvailableMoves(board) {
        let moves = [];

        const currentSquare = board.findPiece(this);

        this.addSquareToArray(moves, currentSquare.row + 2, currentSquare.col + 1, board, true, this.player);
        this.addSquareToArray(moves, currentSquare.row + 1, currentSquare.col + 2, board, true, this.player);

        this.addSquareToArray(moves, currentSquare.row - 2, currentSquare.col + 1, board, true, this.player);
        this.addSquareToArray(moves, currentSquare.row - 1, currentSquare.col + 2, board, true, this.player);

        this.addSquareToArray(moves, currentSquare.row + 2, currentSquare.col - 1, board, true, this.player);
        this.addSquareToArray(moves, currentSquare.row + 1, currentSquare.col - 2, board, true, this.player);
        
        this.addSquareToArray(moves, currentSquare.row - 2, currentSquare.col - 1, board, true, this.player);
        this.addSquareToArray(moves, currentSquare.row - 1, currentSquare.col - 2, board, true, this.player);

        return moves;
    }
}
