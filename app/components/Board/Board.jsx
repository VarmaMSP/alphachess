import React from 'react';
import Square from './presentation/Square';
import PromotionModal from './presentation/PromotionModal';

const Board = props => {
  let {
    board, flip, turn, canMove, promotePawn,
    onPieceSelect, onPieceMove, onPromotionPieceSelect
  } = props;

  let renderSingleRow = (rowIndex, evenSquareClass, oddSquareClass) => (
    <div>
      { board[rowIndex].map((square, c) => (
          <Square {...square} turn={turn} canMove={canMove}
            className={c % 2 == 0 ? evenSquareClass : oddSquareClass}
            onPieceMove={props.onPieceMove}
            onPieceSelect={props.onPieceSelect}
          />
        ))
      }
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
      { promotePawn
        ? <PromotionModal color={turn} flip={flip}
            onPromotionPieceSelect={onPromotionPieceSelect}
          />
        : null
      }
    </div>
  );
}

export default Board;
