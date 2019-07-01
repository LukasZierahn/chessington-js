import Piece from './piece';

export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let moves = [];

        const currentSquare = board.findPiece(this);

        //Rook moves
        for (let i = 1; this.addSquareToArray(moves, currentSquare.row + i, currentSquare.col, board, true, this.player); i++);
        for (let i = 1; this.addSquareToArray(moves, currentSquare.row - i, currentSquare.col, board, true, this.player); i++);
        for (let i = 1; this.addSquareToArray(moves, currentSquare.row, currentSquare.col + i, board, true, this.player); i++);
        for (let i = 1; this.addSquareToArray(moves, currentSquare.row, currentSquare.col - i, board, true, this.player); i++);

        //Bishop Moves
        for (let i = 1; this.addSquareToArray(moves, currentSquare.row + i, currentSquare.col + i, board, true, this.player); i++);
        for (let i = 1; this.addSquareToArray(moves, currentSquare.row - i, currentSquare.col + i, board, true, this.player); i++);
        for (let i = 1; this.addSquareToArray(moves, currentSquare.row + i, currentSquare.col - i, board, true, this.player); i++);
        for (let i = 1; this.addSquareToArray(moves, currentSquare.row - i, currentSquare.col - i, board, true, this.player); i++);

        return moves;
    }
}
