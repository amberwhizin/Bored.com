
import React, { Component } from 'react'
import Spotify from './components/music-components/Spotify'
import Index from './components/website/Index'

export default class App extends Component {
  render() {
    return (
      <div>
         <Index />
        <Spotify />
      
      </div>
    )
  }
}
import React, { useState, useEffect } from "react";
=======
import React, { Component } from "react";
>>>>>>> c48f066d51ae82388679a9ffa4a1eb23f503d2bb
import { Link, Route, Switch } from "react-router-dom";
import Spotify from "./components/music-components/Spotify";
import Index from "./components/website/Index";
import withAuth from "./components/website/withAuth.js";
import Secret from "./components/website/Secret.js";
import Login from "./components/website/Login.js";
import Logout from "./components/website/Logout.js";

//modern code for export class app.. destructuring assignment syntax
const App = () => {
  return (
    <div className="container">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/secret">Secret</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/secret" component={withAuth(Secret)} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
      </Switch>
      <Spotify />
    </div>
  );
};
export default App;
