import React from 'react';

const PromotionModal = ({ color, onPromotionPieceSelect, flip }) => {
  const handleSelect = piece => e => {
    e.preventDefault();
    //if (color === 'w')
      //piece = piece.toUpperCase();
    console.log('piece selected', piece);
    onPromotionPieceSelect(piece);
  };

  let promotionModelClass = flip ? 'promotion-model flip' : 'promotion-model';
  let pieceImageClass     = 'piece-image';
  let promotionPieceClass = 'promotion-piece';

  return (
    <div className={promotionModelClass}>
      <div className={promotionPieceClass} onClick={handleSelect('q')}>
        <img src={`/static/img/q${color}.png`}
          className={pieceImageClass}
        />
      </div>
      <div className={promotionPieceClass} onClick={handleSelect('n')}>
        <img src={`/static/img/n${color}.png`}
          className={pieceImageClass}
        />
      </div>
      <div className={promotionPieceClass} onClick={handleSelect('b')}>
        <img src={`/static/img/b${color}.png`}
          className={pieceImageClass}
        />
      </div>
      <div className={promotionPieceClass} onClick={handleSelect('r')}>
        <img src={`/static/img/r${color}.png`}
          className={pieceImageClass}
        />
      </div>
    </div>
  );
};

export default PromotionModal;
