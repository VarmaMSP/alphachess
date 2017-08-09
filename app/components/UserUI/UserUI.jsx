import React from 'react';

export default class UserUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({name: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    let { name } = this.state;
    let { onNameSubmit } = this.props;
    onNameSubmit(name);
  }

  render() {
    let { name } = this.state;
    return (
      <div className="user-ui">
        <input type="text" value={name}
          onChange={this.handleChange}
          placeholder="Enter your name."
        />
        <div className="submit" onClick={this.handleSubmit}> Submit </div>
      </div>
    );
  }
}
