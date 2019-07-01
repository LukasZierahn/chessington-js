import Square from './../square';
import GameSettings from './../gameSettings';
import Player from './../player';


export default class Piece {
    constructor(player) {
        this.player = player;
        this.isKing = false;
        this.isPawn = false;

        this.isGivingCheck = false;
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
            if (pieceOnSquare.player != player) {
                targetArray.push(targetSquare);
            }

            return false
        }

        //En Passant
        if (allowCapture == true && this.isPawn == true) {
            let movedDir = -1;

            if (player === Player.WHITE) {
                movedDir = 1;
            }

            //checking if something moved next to us
            if (board.lastMoveToSquare.equals(Square.at(row - movedDir, col))) {
                //Checking if an enemy pawn moved there
                if (board.getPiece(board.lastMoveToSquare).isPawn && board.getPiece(board.lastMoveToSquare).player != player) {
                    //checking if it was a double move
                    if (Math.abs(board.lastMoveToSquare.row - board.lastMoveFromSquare.row) == 2) {
                        targetArray.push(targetSquare);

                        return false;
                    }
                }
            }
        }


        //preventing pawns from going diagonal without capturing
        if (allowCapture == true && this.isPawn == true) {
            return false;
        }

        targetArray.push(targetSquare);

        return true;
    }

    discardIllegalMoves(targetArray, fromSquare, board) {
        let legalMoves = []

        for (let toSquare of targetArray) {
            let boardCopy = board.copy();
            boardCopy.movePiece(fromSquare, toSquare);

            if (boardCopy.gameStateIsLegal()) {
                legalMoves.push(toSquare);
            }
        }

        return legalMoves;
    }
}
