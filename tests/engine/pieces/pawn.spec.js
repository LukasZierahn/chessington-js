import 'chai/register-should';
import Pawn from '../../../src/engine/pieces/pawn';
import Rook from '../../../src/engine/pieces/rook';
import King from '../../../src/engine/pieces/king';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';

describe('Pawn', () => {

    let board;
    beforeEach(() => board = new Board());

    describe('white pawns', () => {
        
        it('can only move one square up if they have already moved', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1, 0), pawn);
            pawn.moveTo(board, Square.at(2, 0));

            const moves = pawn.getMovesToConsider(board);
            
            moves.should.have.length(1);
            moves.should.deep.include(Square.at(3, 0));
        });

        it('can move one or two squares up on their first move', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1, 7), pawn);

            const moves = pawn.getMovesToConsider(board);

            moves.should.have.length(2);
            moves.should.deep.include.members([Square.at(2, 7), Square.at(3, 7)]);
        });

        it('cannot move at the top of the board', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(7, 3), pawn);

            const moves = pawn.getMovesToConsider(board);

            moves.should.be.empty;
        });

        it('can move diagonally if there is a piece to take', () => {
            const pawn = new Pawn(Player.WHITE);
            const opposingPiece = new Rook(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(5, 3), opposingPiece);

            const moves = pawn.getMovesToConsider(board);

            moves.should.deep.include(Square.at(5, 3));
        });

        it('cannot move diagonally if there is no piece to take', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);

            const moves = pawn.getMovesToConsider(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it('cannot take a friendly piece', () => {
            const pawn = new Pawn(Player.WHITE);
            const friendlyPiece = new Rook(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(5, 3), friendlyPiece);

            const moves = pawn.getMovesToConsider(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it('cannot take the opposing king', () => {
            const pawn = new Pawn(Player.WHITE);
            const opposingKing = new King(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(5, 3), opposingKing);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });
        
        it('can take En Passant', () => {
            const pawn = new Pawn(Player.WHITE);
            const pawnBlack = new Pawn(Player.BLACK);

            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(6, 3), pawnBlack);
            board.currentPlayer = Player.BLACK;

            pawnBlack.moveTo(board, Square.at(4, 3));

            const moves = pawn.getMovesToConsider(board);

            moves.should.deep.include(Square.at(5, 3));
        });

        it('can\'t take En Passant if there was no double move', () => {
            const pawn = new Pawn(Player.WHITE);
            const pawnBlack = new Pawn(Player.BLACK);

            board.setPiece(Square.at(5, 4), pawn);
            board.setPiece(Square.at(6, 3), pawnBlack);
            board.currentPlayer = Player.BLACK;

            pawnBlack.moveTo(board, Square.at(4, 3));

            const moves = pawn.getMovesToConsider(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it('cannot take En Passant a move later', () => {
            const pawn = new Pawn(Player.WHITE);
            const king = new King(Player.WHITE);
            const pawnBlack = new Pawn(Player.BLACK);
            const kingBlack = new King(Player.BLACK);

            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(0, 0), king);
            board.setPiece(Square.at(6, 3), pawnBlack);
            board.setPiece(Square.at(7, 7), kingBlack);
            board.currentPlayer = Player.BLACK;

            pawnBlack.moveTo(board, Square.at(4, 3));
            king.moveTo(board, Square.at(1, 1));
            kingBlack.moveTo(board, Square.at(6, 6));

            const moves = pawn.getMovesToConsider(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

    });

    describe('black pawns', () => {

        let board;
        beforeEach(() => board = new Board(Player.BLACK));    
        
        it('can only move one square down if they have already moved', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(6, 0), pawn);
            pawn.moveTo(board, Square.at(5, 0));

            const moves = pawn.getMovesToConsider(board);
            
            moves.should.have.length(1);
            moves.should.deep.include(Square.at(4, 0));
        });

        it('can move one or two squares down on their first move', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(6, 7), pawn);

            const moves = pawn.getMovesToConsider(board);

            moves.should.have.length(2);
            moves.should.deep.include.members([Square.at(4, 7), Square.at(5, 7)]);
        });

        it('cannot move at the bottom of the board', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(0, 3), pawn);

            const moves = pawn.getMovesToConsider(board);

            moves.should.be.empty;
        });

        it('can move diagonally if there is a piece to take', () => {
            const pawn = new Pawn(Player.BLACK);
            const opposingPiece = new Rook(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(3, 3), opposingPiece);

            const moves = pawn.getMovesToConsider(board);

            moves.should.deep.include(Square.at(3, 3));
        });

        it('cannot move diagonally if there is no piece to take', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);

            const moves = pawn.getMovesToConsider(board);

            moves.should.not.deep.include(Square.at(3, 3));
        });

        it('cannot take a friendly piece', () => {
            const pawn = new Pawn(Player.BLACK);
            const friendlyPiece = new Rook(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(3, 3), friendlyPiece);

            const moves = pawn.getMovesToConsider(board);

            moves.should.not.deep.include(Square.at(3, 3));
        });

        it('cannot take the opposing king', () => {
            const pawn = new Pawn(Player.BLACK);
            const opposingKing = new King(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(3, 3), opposingKing);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(3, 3));
        });

        it('can take En Passant', () => {
            const pawn = new Pawn(Player.WHITE);
            const pawnBlack = new Pawn(Player.BLACK);
            board.setPiece(Square.at(1, 1), pawn);
            board.setPiece(Square.at(3, 0), pawnBlack);
            board.currentPlayer = Player.WHITE;

            pawn.moveTo(board, Square.at(3, 1));

            const moves = pawnBlack.getMovesToConsider(board);

            moves.should.deep.include(Square.at(2, 1));
        });

        it('can\'t take En Passant if there was no double move', () => {
            const pawn = new Pawn(Player.WHITE);
            const pawnBlack = new Pawn(Player.BLACK);
            board.setPiece(Square.at(2, 1), pawn);
            board.setPiece(Square.at(3, 0), pawnBlack);
            board.currentPlayer = Player.WHITE;

            pawn.moveTo(board, Square.at(3, 1));

            const moves = pawnBlack.getMovesToConsider(board);

            moves.should.not.deep.include(Square.at(2, 1));
        });

        it('cannot take En Passant a move later', () => {
            const pawn = new Pawn(Player.WHITE);
            const king = new King(Player.WHITE);
            const pawnBlack = new Pawn(Player.BLACK);
            const kingBlack = new King(Player.BLACK);

            board.setPiece(Square.at(1, 1), pawn);
            board.setPiece(Square.at(0, 0), king);
            board.setPiece(Square.at(3, 0), pawnBlack);
            board.setPiece(Square.at(7, 7), kingBlack);
            board.currentPlayer = Player.WHITE;

            pawn.moveTo(board, Square.at(3, 1));
            king.moveTo(board, Square.at(1, 1));
            kingBlack.moveTo(board, Square.at(6, 6));

            const moves = pawnBlack.getMovesToConsider(board);

            moves.should.not.deep.include(Square.at(2, 1));
        });

    });

    it('cannot move if there is a piece in front', () => {
        const pawn = new Pawn(Player.BLACK);
        const blockingPiece = new Rook(Player.WHITE);
        board.setPiece(Square.at(6, 3), pawn);
        board.setPiece(Square.at(5, 3), blockingPiece);

        const moves = pawn.getMovesToConsider(board);

        moves.should.be.empty;
    });

    it('cannot move two squares if there is a piece two sqaures in front', () => {
        const pawn = new Pawn(Player.BLACK);
        const blockingPiece = new Rook(Player.WHITE);
        board.setPiece(Square.at(6, 3), pawn);
        board.setPiece(Square.at(4, 3), blockingPiece);

        const moves = pawn.getMovesToConsider(board);

        moves.should.not.deep.include(Square.at(4, 3));
    });

});
