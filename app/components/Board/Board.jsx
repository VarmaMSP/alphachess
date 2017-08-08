import React from 'react';
import Square from './presentation/Square';

const Board = props => {
  let { board, flip } = props;

  let renderSingleRow = (rowIndex, evenSquareClass, oddSquareClass) => (
    <div>
      {board[rowIndex].map((square, c) => (
        <Square {...square}
          className={c % 2 == 0 ? evenSquareClass : oddSquareClass}
        />
      ))}
    </div>
  );

  let whiteSquareClass = flip ? 'white square flip' : 'white square';
  let blackSquareClass = flip ? 'black square flip' : 'black square';
  return (
    <div className={flip ? "board flip" : "board"}>
      { renderSingleRow(0, whiteSquareClass, blackSquareClass) }
      { renderSingleRow(1, blackSquareClass, whiteSquareClass) }
      { renderSingleRow(2, whiteSquareClass, blackSquareClass) }
      { renderSingleRow(3, blackSquareClass, whiteSquareClass) }
      { renderSingleRow(4, whiteSquareClass, blackSquareClass) }
      { renderSingleRow(5, blackSquareClass, whiteSquareClass) }
      { renderSingleRow(6, whiteSquareClass, blackSquareClass) }
      { renderSingleRow(7, blackSquareClass, whiteSquareClass) }
    </div>
  );
}

export default Board;
