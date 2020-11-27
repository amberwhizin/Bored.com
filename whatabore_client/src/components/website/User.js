import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
// import Home from "./Home";
// import Secret from "./Secret";

// export default class user extends Component {
//     render() {
//         return (
//             <div>
//                 <h1>
//                     New User
//                 </h1>
//                 <form>
//                     <label for="name">User Name:</label>
//                     <input type="text" name="username" required/>
//                     <label for="color">Password:</label>
//                     <input type="password" name="password" />
//                     <br />
//                     <input className="submit" type="submit" value="Submit"/>
//                 </form>
//             </div>
//         );
//     };
// };
export default class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/secret">Secret</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/secret" component={Secret} />
        </Switch>
      </div>

      
    );
  }
}
