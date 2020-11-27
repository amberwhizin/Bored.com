import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Spotify from "./components/music-components/Spotify";
import Index from "./components/website/Index";
import withAuth from "./components/website/withAuth.js";
import Secret from "./components/website/Secret.js";
import Login from "./components/website/Login.js";
import Logout from "./components/website/Logout.js";
import Movie from "./components/movies-components/Movie";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./components/profile-component/Profile.js";
import Books from "./components/books-components/Books";

//modern code for export class app.. destructuring assignment syntax
const App = () => {
  return (
    <div className="container nav-bar">
      <ListGroup horizontal>
        <ListGroup.Item>
          <Link to="/">Home</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/yourcollection">Collection</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/secret">Secret</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/login">Login</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/profiles">Profile</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/logout">Logout</Link>
        </ListGroup.Item>
      </ListGroup>

      <img
        src="https://www.healthguidance.org/wp-content/uploads/18939Bored.jpg"
        class="img-fluid"
        alt="Responsive image"
      ></img>

      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/secret" component={withAuth(Secret)} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/music" component={Spotify} />
        <Route exact path="/movies" component={Movie} />
        <Route exact path="/movies" component={Movie} />
        <Route exact path="/books" component={Books} />
        <Route exact path="/yourcollection" />
        <Route path="/profiles" component={Profile} />
      </Switch>
    </div>
  );
};
export default App;
