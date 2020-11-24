import React, { Component } from "react";
//import EditProfile from "./EditProfile.js";

const baseURL = "http://localhost:3001";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      currentProfiles: "",
      username: "",
      bio: "",
      img: "",
      userId: {},
    };
  }

  componentDidMount = () => {
    this.getProfiles();
  };

  handleChangeCurrentProfile = (e) => {
    this.setState({
      currentProfiles: e.target.value,
    });
  };

  handleChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  handleChangeBio = (e) => {
    this.setState({
      bio: e.target.value,
    });
  };
  handleChangeImg = (e) => {
    this.setState({
      img: e.target.value,
    });
  };

  addCurrentProfile = (e) => {
    e.preventDefault();

    if (!this.state.currentProfiles) return;

    fetch(baseURL + "/profiles", {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        bio: this.state.bio,
        img: this.state.img,
        userId: this.state.userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          profiles: this.state.profiles.concat(data),
        });
      });
    //console.log(this.state);
  };

  getProfiles = () => {
    console.log(baseURL);

    fetch(baseURL + "/profiles")
      .then((data) => {
        return data.json();
      })
      .then((parsedData) => {
        this.setState({
          profiles: parsedData,
        });
      });
  };
  render() {
    return (
      <div className="container">
          <form onSubmit={this.addCurrentProfile}>
            <label htmlFor="username"></label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={this.handleChangeUsername}
              value={this.state.username}
              placeholder="username"
            />
            <label htmlFor="bio"></label>
            <input
              type="textarea"
              id="bio"
              name="bio"
              onChange={this.handleChangeBio}
              value={this.state.bio}
              placeholder="Tell us about yourself!"
            />
            <label htmlFor="img"></label>
            <input
              type="text"
              id="img"
              name="img"
              onChange={this.handleChangeImg}
              value={this.state.img}
              placeholder="Picture"
            />
           <a href="/edit"><button>edit</button></a> 
          </form>
          {this.state.profiles.map((user) => {
            return (
              <div className="user">
                <h3>{user.username}</h3>
                <h3>{user.bio}</h3>
                <h3>{user.img}</h3>
              </div>
            );
          })}
        </div>
    );
  }
}
export default EditProfile;
