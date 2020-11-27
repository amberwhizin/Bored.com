import React, { Component } from "react";


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      username: "",
      bio: "",
      img: "",
    };
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={this.props.editUsername}
            onChange={this.props.handleChange}
          />
          <label htmlFor="bio">Bio</label>
          <input
            type="text"
            id="bio"
            value={this.props.bio}
            onChange={this.props.handleChange}
          />
          <label htmlFor="img">Pic</label>
          <input
            type="text"
            id="img"
            value={this.props.img}
            onChange={this.props.handleChange}
          />
        </form>
      </div>
    );
  }
}
