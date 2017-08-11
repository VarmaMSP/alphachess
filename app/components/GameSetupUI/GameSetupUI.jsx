import React from 'react';

import CreateGame from './presentation/CreateGame';
import UsernameInput from './presentation/UsernameInput';

export default class GameSetupUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      opponent: null,
      usersOnline: []
    };

    this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this);
    this.handleSendGameRequest = this.handleSendGameRequest.bind(this);
  }

  handleUsernameSubmit(username) {
    this.props.socket.emit('join', {username}, () => {
      this.setState({username});
    });
    this.props.socket.on('users online', ({ users }) => {
      this.setState({
        usersOnline: users.filter(user => user !== username)
      });
    });
  }

  handleSendGameRequest(opponent) {
    console.log(opponent);
  }

  render() {
    let { username, usersOnline } = this.state;
    return (
      <div>
        { username
            ? <CreateGame
                username={username} usersOnline={usersOnline}
                onSendGameRequest={this.handleSendGameRequest}
              />
            : <UsernameInput onUsernameSubmit={this.handleUsernameSubmit}/>
        }
      </div>
    );
  }
}
