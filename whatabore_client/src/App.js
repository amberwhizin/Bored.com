import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Spotify from "./components/music-components/Spotify";
import Index from "./components/website/Index";
import withAuth from "./components/website/withAuth.js";
import Secret from "./components/website/Secret.js";
import Login from "./components/website/Login.js";
import Logout from "./components/website/Logout.js";
import Movie from "./components/movies-components/Movie";
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from "./components/profile-component/Profile.js";
import BookBrain from "./components/books-components/BookBrain";

//modern code for export class app.. destructuring assignment syntax
const App = () => {
  return (

//     <div className="carousel-container">
//     <Carousel className="carousel">
//     <Carousel.Item >
//      <img
//        className="image"
//        src="https://www.healthguidance.org/wp-content/uploads/18939Bored.jpg"
//        alt="First slide"
//      />
//      <Carousel.Caption>
//      <h3>First slide label</h3>
//      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//      </Carousel.Caption>
//     </Carousel.Item>
//      <Carousel.Item >
//      <img
//      className="image"
//      src="https://www.healthguidance.org/wp-content/uploads/18939Bored.jpg"
//      alt="Third slide"
//      bsPrefix
//      />
//      <Carousel.Caption>
//      <h3>Second slide label</h3>
//      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//      </Carousel.Caption>
//      </Carousel.Item>
//      <Carousel.Item>
//      <img
//      className="image"
//      src="https://www.healthguidance.org/wp-content/uploads/18939Bored.jpg"
//      alt="Third slide"
//      />
//      <Carousel.Caption>
//        <h3>Third slide label</h3>
//        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
//      </Carousel.Caption>
//      </Carousel.Item>
//      </Carousel>
// </div>

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

      <img src="https://www.healthguidance.org/wp-content/uploads/18939Bored.jpg" class="img-fluid" alt="Responsive image"></img>
      
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/secret" component={withAuth(Secret)} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/music" component= {Spotify} />
        <Route exact path="/movies" component= {Movie} />
        <Route exact path="/books" component= {BookBrain} />
        <Route exact path="/yourcollection" />
        <Route path="/profile" component={Profile} />
      </Switch>
    </div>
  );
};
export default App;
