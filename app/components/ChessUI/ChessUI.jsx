import React from 'react';
import ReactDOM from 'react-dom';

function unicodePieces(color, piece) {
  switch (piece) {
    case 'K': return color === 'w' ? <span>&#9812;</span> : <span>&#9818;</span>;
    case 'Q': return color === 'w' ? <span>&#9813;</span> : <span>&#9819;</span>;
    case 'R': return color === 'w' ? <span>&#9814;</span> : <span>&#9820;</span>;
    case 'B': return color === 'w' ? <span>&#9815;</span> : <span>&#9821;</span>;
    case 'N': return color === 'w' ? <span>&#9816;</span> : <span>&#9822;</span>;
    case 'P': return color === 'w' ? <span>&#9817;</span> : <span>&#9823;</span>;
  }
}

function SANtoFAN(turn, SAN) {
  if (SAN) {
    if (SAN[0] === SAN[0].toUpperCase()) {
      return (
        <div>
          {unicodePieces(turn, SAN[0])}
          <span>{SAN.slice(1)}</span>
        </div>
      );
    } else {
      return (
        <div>
          {unicodePieces(turn, 'P')}
          <span>{SAN}</span>
        </div>
      );
    }
  } else {
    return null;
  }
}

export default class ChessUI extends React.Component {
  constructor(props) {
    super(props);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  scrollToBottom() {
    let node = ReactDOM.findDOMNode(this.lastMove);
    node.scrollIntoView({ behaviour: 'smooth'});
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    let { moveHistory, message } = this.props;
    return (
      <div className="chess-ui">
        <div className="player ">
          <img src="/static/img/pb.png"/>
        </div>
        <div className="move-history">
          { moveHistory.map((move, i) => (
            <div key={i} className="png-move">
              <div className="move-number">{i + 1}.</div>
              <div className="move">{SANtoFAN('w', move.w)}</div>
              <div className="move">{SANtoFAN('b', move.b)}</div>
            </div>
            ))
          }
          <div className="sentinal"
            ref={el => { this.lastMove = el}}
          />
        </div>
        <div className="player">
          <img src="/static/img/pw.png"/>
        </div>
        <div className="message">
          <h4>{message}</h4>
        </div>
      </div>
    )
  }
}
