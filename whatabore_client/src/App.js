import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Spotify from "./components/music-components/Spotify";
import Index from "./components/website/Index";
import withAuth from "./components/website/withAuth.js";
import Secret from "./components/website/Secret.js";
import Login from "./components/website/Login.js";
import Logout from "./components/website/Logout.js";
import Movie from "./components/movies-components/Movie";
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
        <Route exact path="/music" component= {Spotify} />
        <Route exact path="/movies" component= {Movie} />
        <Route exact path="/yourcollection" />
      </Switch>
    </div>
  );
};
export default App;
