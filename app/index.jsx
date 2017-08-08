import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';

import { ChessJS } from './lib/chess.js';
import { uuid, chessNotationToIndex, indexToChessNotation } from './lib/utils.js';

import Board from './components/Board/Board';

import './styles/index.scss';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.game = new ChessJS('8/8/8/8/8/8/8/8 w - - 0 1');

    let board = this.game.board().map((row, r) => (
      row.map((piece, c) => (
        {
          key: uuid(),
          pos: indexToChessNotation(r, c),
          flag: null,
          markSquare: false,
          pieceColor: piece ? piece.color : null,
          pieceImageURL: piece ? `/static/img/${piece.type}${piece.color}.png` : null
        }
      ))
    ));

    this.state = {
      turn: this.game.turn(),
      pausePieceSelection: false,
      selectedSquare: null,
      promotePawn: null,
      moveHistory: [],
      message: "White's turn",
      board
    };
  }

  render() {
    let { board } = this.state;
    return (
      <div className="chess">
        <Board
          flip={false} board={board}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Root/>,
  document.getElementById('app')
)
