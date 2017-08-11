import React from 'react';

export default class CreateGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedUser: -1 };

    this.handleOpponentSelect = this.handleOpponentSelect.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  handleOpponentSelect(i) {
    return e => {
      e.preventDefault();
      this.setState({
        selectedUser: i
      });
    }
  }

  handleSend(e) {
    e.preventDefault();

    let { selectedUser } = this.state;
    let { onSendGameRequest, usersOnline } = this.props;
    if (selectedUser >= 0) {
      onSendGameRequest(usersOnline[selectedUser]);
    }
  }

  render() {
    let { selectedUser } = this.state;
    let { username, usersOnline } = this.props;

    return (
      <div className="create-game">
        <div id="username">{username}</div>
        <div className="label">Select opponent</div>
        <div id="opponent-list">
          { usersOnline.map((user, i) => (
              <div key={i}
                onClick={this.handleOpponentSelect(i)}
                className={i === selectedUser ? "opponent mark" : "opponent"}>
                {user}
              </div>
            ))
          }
        </div>
        <div id="send-request" onClick={this.handleSend}>
          Send Request
        </div>
      </div>
    );
  }
}
