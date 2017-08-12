import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';

import { ChessJS } from './lib/chess.js';
import {
  uuid, chessNotationToIndex, getBoardState,
  indexToChessNotation, addMove, movePiece
} from './lib/utils.js';

import Board from './components/Board/Board';
import GameSetupUI from './components/GameSetupUI/GameSetupUI';

import './styles/index.scss';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.game = new ChessJS();
    this.socket = io();

    let board = this.game.board().map((row, r) => (
      row.map((piece, c) => (
        {
          key: uuid(), flag: null,
          pos: indexToChessNotation(r, c),
          markSquare: false,
          pieceColor: piece ? piece.color : null,
          pieceImageURL: piece ? `/static/img/${piece.type}${piece.color}.png` : null
        }
      ))
    ));

    this.state = {
      username: null,
      opponent: null,
      color: null,
      gameId: null,

      turn: this.game.turn(),
      pausePieceSelection: null,
      selectedSquare: null,
      promotePawn: null,
      moveHistory: [],
      message: "",
      board
    };

    this.handleGameSetupComplete = this.handleGameSetupComplete.bind(this);
    this.handlePieceSelect = this.handlePieceSelect.bind(this);
    this.handlePieceMove = this.handlePieceMove.bind(this);
  }

  handleGameSetupComplete(info) {
    this.socket.on('make move', ({ selectedSquare, to, flag }) => {
      this.handlePieceMove(selectedSquare, false)(to, flag);
    });
    this.setState({
      ...info,
      pausePieceSelection: info.color !== this.state.turn
    });
  }

  handlePieceSelect(pos) {
    let possibleMoves = this.game.moves({
      square: pos, verbose: true
    });
    this.setState(prevState => {
      let { board, selectedSquare } = prevState;

      //clear all previously marked squares
      if (selectedSquare !== null) {
        board.forEach(row => {
          row.forEach(square => {
            if (square.markSquare === true) {
              square.key = uuid();
              square.flag = null;
              square.markSquare = false;
            }
          });
        });
      }
      /*
      ** return only the flag corresponding to either pawn promotion,
      ** kingside castling, queenside castling or en passant capture
      */
      let returnRequiredFlag = flags => {
        for (let i = 0; i < flags.length; ++i) {
          if (flags[i] === 'k' || flags[i] === 'q' || flags[i] === 'e' || flags[i] === 'p') {
            return flags[i];
          }
        }
        return null;
      }
      possibleMoves.forEach(move => {
        let [ r, c ] = chessNotationToIndex(move.to);
        let square = board[r][c];
        square.key  = uuid();
        square.flag = returnRequiredFlag(move.flags);
        square.markSquare = true;
      });

      return {
        board,
        selectedSquare: pos
      }
    });
  }

  handlePieceMove(selectedSquare, emitMessage=true) {
    return (to, flag) => {
      this.setState(prevState => {
        let { board, turn, moveHistory, gameId } = prevState;
        let fromPos = chessNotationToIndex(selectedSquare);
        let toPos   = chessNotationToIndex(to);

        //clear marked squares
        board.forEach(row => {
          row.forEach(square => {
            if (square.markSquare === true) {
              square.key = uuid();
              square.flag = null;
              square.markSquare = false;
            }
          })
        });
        movePiece(board, fromPos, toPos);

        if (flag === 'p') { //pawn promotion
          return {
            turn, board,
            selectedSquare,
            promotePawn: to,
            pausePieceSelection: true
          }
        }

        if (flag === 'e') { //en passant capture
          let [ R, C ] = toPos;
          R += (turn === 'w' ? 1 : -1);
          board[R][C].key = uuid();
          board[R][C].pieceColor = null;
          board[R][C].pieceImageURL = null;
        }
        else if (flag === 'k') { //kingside castling
          if (turn === 'w') {
            movePiece(board, [7, 7], [7, 5]); //movie rooke from 'h1' to 'f1'
          } else {
            movePiece(board, [0, 7], [0, 5]); //move rooke from 'h8' to 'f8'
          }
        }
        else if (flag  === 'q') { //queenside castling
          if (turn === 'w') {
            movePiece(board, [7, 0], [7, 3]); //move rooke from 'a1' to 'd1'
          } else {
            movePiece(board, [0, 0], [0, 3]); //move rooke from 'a8' to 'd8'
          }
        }
        let X = this.game.move({from: selectedSquare, to});
        console.log(X);
        addMove(moveHistory, X.san);

        let [ message, pausePieceSelection ] = getBoardState(this.game, turn);
        if (emitMessage) {
          this.socket.emit('move', {selectedSquare, to, flag, gameId});
        }
        return {
          board, message,
          pausePieceSelection,
          selectedSquare: null,
          turn: turn === 'w' ? 'b' : 'w',
          moveHistory
        };
      });
    }
  }

  render() {
    let { gameId, board, color, turn, selectedSquare } = this.state;
    return (
      <div className="chess">
        <Board
          board={board} turn={turn}
          flip={color === 'b'} canMove={turn === color}
          onPieceSelect={this.handlePieceSelect}
          onPieceMove={this.handlePieceMove(selectedSquare)}
        />
        { gameId
          ? null
          : <GameSetupUI socket={this.socket}
              onGameSetupComplete={this.handleGameSetupComplete}
            />
        }
      </div>
    );
  }
}

ReactDOM.render(
  <Root/>,
  document.getElementById('app')
)
