import React, { Component } from "react";

export default class IMDB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseURL: "https://imdb-api1.p.rapidapi.com/Title/k_12345678/tt1375666",
      apikey: "apikey=" + "4103bc576fmsh6c7693f414d18a6p124dcbjsna2269889c95e",
      query: "&t=",
      title: "",
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit(event) {
    event.preventDefault();
    this.setState(
      {
        searchURL:
          this.state.baseURL +
          this.state.apikey +
          this.state.query +
          this.state.title,
      },
      () => {
        fetch(this.state.searchURL)
          .then((response) => {
            return response.json();
          })
          .then(
            (json) =>
              this.setState({
                movie: json,
                title: "",
              }),
            (err) => console.log(err)
          );
      }
    );
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="movieTitle">Title</label>
          <input
            id="movieTitle"
            type="text"
            value={this.state.movieTitle}
            onChange={this.handleChange}
          />
          <input type="submit" value="Find Movie Info" />
        </form>
      </>
    );
  }
}
