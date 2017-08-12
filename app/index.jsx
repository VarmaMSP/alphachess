import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';

import { ChessJS } from './lib/chess.js';
import { uuid, chessNotationToIndex, indexToChessNotation } from './lib/utils.js';

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
      pausePieceSelection: false,
      selectedSquare: null,
      promotePawn: null,
      moveHistory: [],
      message: "",
      board
    };
  }

  render() {
    let { gameId, board, color } = this.state;
    console.log(username);
    return (
      <div className="chess">
        <Board flip={color === 'b'} board={board}/>
        { gameId
          ? null
          : <GameSetupUI socket={this.socket}
              onGameSetupComplete={playerInfo => this.setState(playerInfo)}
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
