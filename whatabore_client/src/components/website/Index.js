import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
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
        <button>MUSIC</button>
        <button>MOVIES</button>
        <button>BOOKS</button>
        {/* <h1>Test Weather API: {this.state.weather}</h1>
                <button onClick={this.handleButtonClick}>WEATHER</button> */}
      </div>
    );
  }
}
