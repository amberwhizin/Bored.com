import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default class Index extends Component {
  constructor() {
    super();
    //Set default message
    this.state = {
      message: "Loading...",
    };
  }

  componentDidMount = () => {
    //GET message from server using fetch api
    fetch("/api/home")
      .then((res) => res.text())
      .then((res) => this.setState({ message: res }));
  };

  render() {
    return (
      <div className="sections">
        <p>{this.state.message}</p>
 
        <h1>BORED? Let us help you!</h1>

        <Link to="/movies">
          <button renderAs="button">
            <span>MOVIES</span>
          </button>
        </Link>

        <Link to="/music">
          <button renderAs="button">
            <span>MUSIC</span>
          </button>
        </Link>

        <Link to="/books">
          <button renderAs="button">
            <span>BOOKS</span>
          </button>
        </Link>
      </div>
    );
  }
}
