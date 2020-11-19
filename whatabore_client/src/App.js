import React, { Component } from "react";

const baseURL = "http://www.omdbapi.com/?";
const apikey = "apikey=" + "6253ae12";
const queryTitle = "&t=";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieTitle: "",
      searchURL: "",
      movie: {},
    };
  }

  getMovies = (e) => {
    e.preventDefault();
    const url = baseURL + apikey + queryTitle + "This is the end";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
      });
  };

  componentDidMount() {
    // this.getMovies();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.getMovies}>
          <label htmlFor="movieTitle">Title</label>
          <input
            id="movieTitle"
            type="text"
            value={this.state.movieTitle}
            onChange={this.getMovies}
          />
          <input type="submit" value="Find Movie Info" />
        </form>
        {/* {this.state.movie ? <Movie movie={this.state.movie} /> : ""} */}
      </div>
    );
  }
}
