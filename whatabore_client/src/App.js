import React, { Component } from "react";
import Index from './components/Index'

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
    return <div>
        <Index />
       
        </div>;

  }
}
