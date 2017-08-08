import React from 'react';

const Square = props => {
  let handleClick = e => {
    e.preventDefault();
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
