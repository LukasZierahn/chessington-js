import Square from './../square';
import GameSettings from './../gameSettings';


export default class Piece {
    constructor(player) {
        this.player = player;
        this.isKing = false;
        this.isPawn = false;
    }

    getAvailableMoves(board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    moveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    addSquareToArray(targetArray, row, col, board, allowCapture, player) {
        if (row < 0 || row >= GameSettings.BOARD_SIZE ||
            col < 0 || col >= GameSettings.BOARD_SIZE) {
                return false;
        }

        let targetSquare = new Square(row, col);

        //checking if the square is occupied by anything
        if (board.getPiece(targetSquare) !== undefined) {
            if (!allowCapture) {
                return false;
            }

            const pieceOnSquare = board.getPiece(targetSquare);
            if (pieceOnSquare.player != player && !pieceOnSquare.isKing) {

                targetArray.push(targetSquare);
            }

            return false
        }

        //preventing pawns from going diagonal without capturing
        if (allowCapture == true && this.isPawn == true) {
            return false;
        }

        targetArray.push(targetSquare);

        return true;
    }
}
