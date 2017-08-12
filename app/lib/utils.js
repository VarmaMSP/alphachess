export function uuid() {
  return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(
    /x/g, c => (Math.random() * 16 | 0).toString()
  );
}

export function indexToChessNotation(r, c) {
  return String.fromCharCode(97 + c) + (8 - r);
}

export function chessNotationToIndex(pos) {
  return [8 - Number(pos[1]), pos.charCodeAt(0) - 97];
}

export function movePiece(board, from, to) {
  let [ r, c ] = from;
  let [ R, C ] = to;

  board[R][C].key = uuid();
  board[R][C].markSquare = false;
  board[R][C].pieceColor = board[r][c].pieceColor;
  board[R][C].pieceImageURL = board[r][c].pieceImageURL;

  board[r][c].key = uuid();
  board[r][c].pieceColor = null;
  board[r][c].pieceImageURL = null;
}

export function getBoardState(game, turn) {
  if (! game.game_over()) {
    return [`${turn === 'w' ? "Black's" : "White's"} turn.`, false];
  }
  if (game.in_checkmate()) {
    return [`${turn === 'w' ? 'White' : 'Black'} won by checkmate`, true];
  }
  if (game.in_stalemate()) {
    return [`${turn === 'w' ? 'White' : 'Black'} won by stalemate`, true];
  }
  if (game.in_threefold_repetition()) {
    return ['Game ended in draw (threefold repetition)', true];
  }
  if (game.in_draw()) {
    return ['Game ended in draw', true];
  }
}

export function addMove(moveHistory, san) {
  let l = moveHistory.length;
  if (l > 0) {
    if (moveHistory[l - 1].b) {
      moveHistory[l] = { w: san };
    } else {
      moveHistory[l - 1].b = san;
    }
  } else {
    moveHistory[0] = { w: san, b: null };
  }
}
