import React, { Component } from "react";

export default class Secret extends Component {
  constructor() {
    super();
    this.state = {
      message: "Loading...",
    };
  }

  componentDidMount() {
    fetch("/api/yourcollection");
  }

  render() {
    return (
      <div>
        <h1>Secret</h1>
        <p>{this.state.message}</p>
      </div>
    );
  }
}
