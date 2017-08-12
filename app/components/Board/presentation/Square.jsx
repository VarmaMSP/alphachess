import React from 'react';

const Square = props => {
  let handleClick = e => {
    e.preventDefault();
    if (props.markSquare) {
      props.onPieceMove(props.pos, props.flag);
      return;
    }
    if (props.canMove && props.pieceColor === props.turn) {
      props.onPieceSelect(props.pos);
      return;
    }
  };

  let { markSquare, pieceImageURL, className } = props;
  if (markSquare)
    className += ' mark';

  return (
    <div className={className} onClick={handleClick}>
      {pieceImageURL
        ? <img src={pieceImageURL} className="piece"/>
        : null}
    </div>
  )
};

export default Square;
