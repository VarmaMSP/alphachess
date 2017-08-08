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
