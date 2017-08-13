import React from 'react';

import CreateGame from './presentation/CreateGame';
import UsernameInput from './presentation/UsernameInput';

export default class GameSetupUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      usersOnline: []
    };

    this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this);
  }

  handleUsernameSubmit(username) {
    let { socket } = this.props;

    //Join users online
    socket.emit('join', {username}, () => {
      this.setState({username});
    });

    //Get users online
    socket.on('users online', ({ users }) => {
      console.log(users);
      this.setState({
        usersOnline: users.filter(user => user !== username)
      });
    });

    //Start a game
    socket.on('start game', ({ color, gameId, opponent }, done) => {
      socket.removeAllListeners('users online');
      socket.removeAllListeners('start game');

      this.props.onGameSetupComplete({
        username: username,
        color, gameId, opponent,
        message: color === 'w' ? 'Your turn.' : 'Opponent turn',
      });
      done();
    });
  }

  render() {
    let { username, usersOnline } = this.state;
    return (
      <div>
        { username
            ? <CreateGame
                username={username} usersOnline={usersOnline}
                onCreateGame={opponent => this.props.socket.emit('create game', {opponent})}
              />
            : <UsernameInput
                onUsernameSubmit={this.handleUsernameSubmit}
              />
        }
      </div>
    );
  }
}
