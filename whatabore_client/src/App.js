import React, { Component } from "react";
import Index from "./components/Index";
import IMDB from "./components/IMDB";

//const baseURL = "http://localhost:3001"; //spotify URL //heroku  too

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recs: [],
      //gonna use it in the future?
      // title: "",
      // image: "",
      // description: "",
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies = () => {
    fetch("http://www.omdbapi.com/?apikey=[yourkey]&")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    return (
      <>
        <Index />
        <IMDB
          onSubmit={this.handleSubmitMovies}
          onChange={this.handleChangeMovies}
        />
      </>
    );
  }
}
