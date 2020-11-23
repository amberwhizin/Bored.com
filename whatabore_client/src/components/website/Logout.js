import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Secret extends Component {
  constructor() {
    super();
    this.state = {
      message: "Loading...",
    };
  }

  componentDidMount() {
    fetch("/api/logout")
      .then((res) => res.text())
      .then((res) => this.setState({ message: res }));
  }

  render() {
    const { loading, redirect } = this.state;
    if (loading) {
      return null;
    }
    if (redirect) {
      return <Redirect to="/" />;
    }
  }
}
