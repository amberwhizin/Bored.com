import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
// import User from "./website/User";
// import axios from "axios";

// export default class Index extends Component {
// constructor(){
//     super();
//     this.state = {
//         weather: "Not yettttt",
//         session: 'not set'
//     }
// }
// handleButtonClick = () => {
//     axios.get("/index").then(response => {
//         // console.log(response.data.temperature);
//         this.setState({
//           weather: response.data.temperature
//         })
//     });
//         };
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

        <button>MOVIES</button>
        <button>BOOKS</button>
        <Link to="/music">
          <button renderAs="button">
            <span>MUSIC</span>
          </button>
        </Link>
      </div>
    );
  }
}
