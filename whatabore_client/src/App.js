import React, { Component } from "react";
import Index from './components/Index'

export default class App extends Component {
<<<<<<< HEAD
    render() {
        return (
            <div>

                Hello!

                Hey!!

            </div>
        )
    }
=======
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      image: "",
      description: "",
    };
  }
  
  render() {
dani
    return <div>
        <Index />
       
        </div>;
    return (
      <div>
        <input type="text" />
        <input type="submit" value="here" />
        Hey!!
      </div>
    );
dev
  }
>>>>>>> 74c62440f6f9832fde9d9786493a987ae31b0c3d
}
