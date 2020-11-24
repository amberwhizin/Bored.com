import React, { Component } from "react";
import EditProfile from "./EditProfile.js";

const baseUrl = "http://localhost:3000";
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: ["hi", "oh hi"],

      username: "",
      bio: "",
      img: "",
    };
  }

  componentDidMount() {
    this.getProfiles();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    fetch(baseUrl + "/profiles/", {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        bio: this.state.bio,
        img: this.state.img,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          profiles: this.state.profiles.concat(data),
          username: "",
          bio: "",
          img: "",
        });
      });
  };

  getProfiles() {
    fetch(baseUrl + "/profiles")
      .then((data) => {
        return data.json();
      })
      .then((parsedData) => {
        this.setState({
          profiles: parsedData,
        });
      });
  }

  render() {
    return (
      <div>
        <h3>{this.state.username}</h3>
        <h3>{this.state.bio}</h3>
        <h3>{this.state.img}</h3>
        <input type="submit" value="edit" />
        {this.state.profiles.map((user) => {
          <EditProfile
            editUsername={user.username}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />;
        })}
      </div>
    );
  }
}

///////profile hookup to login for another day//////
{
  /* <div
            style={{
              display: "flex",

              margin: "1px 0px",
              borderBottom: "1px solid grey",
            }}
          >
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSupsRu6CT_BvWl1svSUSEx9n0AWaJGQEx04g&usqp=CAU" />
          </div>
          <div>
            <h4>Puppy Mc-Pupperson</h4>
          </div>
        </div> */
}
