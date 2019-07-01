import Square from './../square';


export default class Piece {
    constructor(player) {
        this.player = player;
    }

    getAvailableMoves(board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    moveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    addSquareToArray(targetArray, row, col, board, checkIfEmpty) {
        let targetSquare = new Square(row, col);

        //checking if the square is occupied by anything
        if (board.getPiece(targetSquare) !== undefined && checkIfEmpty) {
            return;
        }

        targetArray.push(targetSquare);
    }
}
