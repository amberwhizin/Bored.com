import React, { Component } from "react";
import Index from "./components/Index";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      image: "",
      description: "",
    };
  }

  render() {
    return (
      <div>
        <input type="text" />
        <input type="submit" value="here" />
        Hey!!
      </div>
    );
  }
}
