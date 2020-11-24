import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import Spotify from "./components/music-components/Spotify.js";
import Index from "./components/website/Index.js";
import withAuth from "./components/website/withAuth.js";
import Secret from "./components/website/Secret.js";
import Login from "./components/website/Login.js";
import Logout from "./components/website/Logout.js";
import Movie from "./components/movies-components/Movie.js";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import Books from "./components/books-components/Books";
//import Profile from "./components/profile-component/Profile.js";
import TodoList from "./components/todolist-component/TodoList.js";

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
        {/* <ListGroup.Item>
          <Link to="/secret">Secret</Link>
        </ListGroup.Item> */}
        <ListGroup.Item>
          <Link to="/login">Login</Link>
        </ListGroup.Item>
        {/* <ListGroup.Item>
          <Link to="/profiles">Profile</Link>
        </ListGroup.Item> */}
        <ListGroup.Item>
          <Link to="/login">Logout</Link>
        </ListGroup.Item>
      </ListGroup>

     <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/secret" component={withAuth(Secret)} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/music" component={Spotify} />
        <Route exact path="/movies" component={Movie} />
        <Route exact path="/books" component={Books} />
        <Route exact path="/yourcollection" />
        <Route exact path="/todoList" component={TodoList} />
        {/* <Route path="/profile" component={Profile} /> */}
      </Switch>
    </div>
  );
};
export default App;

















//////////Carousel graveyard///////
////////////////////////////////

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

 