import React, { Component } from 'react';
import axios from "axios";

export default class Index extends Component {
constructor(){
    super();
    this.state = {
        weather: "Not yettttt"
    }
}
handleButtonClick = () => {
    axios.get("/index").then(response => {
        // console.log(response.data.temperature);
        this.setState({
          weather: response.data.temperature
        })
    });
        };


    render() {
        return (
            <div>
                <h1>Test Weather API: {this.state.weather}</h1>
                <button onClick={this.handleButtonClick}>WEATHER</button>
                <h1>BORED? Let us help you!</h1>
                <button>MUSIC</button>
                <button>MOVIES</button>
                <button>BOOKS</button>
            </div>
        )
    }
}
