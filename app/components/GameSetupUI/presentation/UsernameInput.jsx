import React from 'react';

export default class UsernameInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({username: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    let { username } = this.state;
    let { onUsernameSubmit } = this.props;

    username = username.trim();
    if (username.length > 0) {
      onUsernameSubmit(username);
    }
  }

  render() {
    let { username } = this.state;
    return (
      <div className="user-ui">
        <input type="text" value={username}
          onChange={this.handleChange}
          placeholder="Enter your name"
        />
        <div className="submit" onClick={this.handleSubmit}> Go! </div>
      </div>
    );
  }
}
