import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Spotify from "./components/music-components/Spotify";
import Index from "./components/website/Index";
import withAuth from "./components/website/withAuth.js";
import Secret from "./components/website/Secret.js";
import Login from "./components/website/Login.js";
import Logout from "./components/website/Logout.js";
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

//modern code for export class app.. destructuring assignment syntax
const App = () => {
  return (
    <div className="container nav-bar">
      <ListGroup horizontal>
        <ListGroup.Item>
          <Link to="/">Home</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/secret">Secret</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/login">Login</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/premium">Premium</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/download">Download</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/account">Account</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/profile">Profile</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/support">Support</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="/logout">Logout</Link>
        </ListGroup.Item>
      </ListGroup>

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
