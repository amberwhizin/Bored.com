import React, { Component } from "react";
//import EditProfile from "./EditProfile.js";

const baseURL = "http://localhost:3001";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      bio: "",
      img: "",
      userId: {},
    };
  }

  componentDidMount = () => {
    this.getProfiles();
  };

  addCurrentProfile = (e) => {
    e.preventDefault();

    fetch(baseURL + "/profiles", {
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
      <div style={{ maxwidth: "550px", margin: "0px auto" }}>
        <div>
          <div
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
        </div>
      </div>
    );
  }
}
export default Profile;
