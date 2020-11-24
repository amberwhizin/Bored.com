import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Detail = ({ album, artists, name }) => {
  //   const handleCollect = (event) => {
  //     event.preventDefault();
  //     fetch("/api/collect", {
  //       method: "POST",
  //       body: JSON.stringify(this.useState),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((res) => {
  //         if (res.status === 200) {
  //           this.props.history.push("/");
  //         } else {
  //           const error = new Error(res.error);
  //           throw error;
  //         }
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //         alert("Error adding content please try again");
  //       });
  //   };

  return (
    <div className="offset-md-1 col-sm-4">
      <div className="row col-sm-12 px-0">
        <img className="artistImage" src={album.images[0].url} alt={name}></img>
      </div>
      <div className="row col-sm-12 px-0">
        <label htmlFor={name} className="form-label col-sm-12">
          {name}
        </label>
      </div>
      <div className="row col-sm-12 px-0">
        <label htmlFor={artists[0].name} className="form-label col-sm-12">
          {artists[0].name}
        </label>
      </div>
      <Link to="/yourcollection">
        <button renderAs="button">
          <span>UNBORE ME!</span>
        </button>
      </Link>
    </div>
  );
};

export default Detail;
