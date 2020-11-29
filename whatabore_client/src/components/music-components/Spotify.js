import React, { Component, useState, useEffect } from "react";
// import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';
// import Route from 'react-router-dom/Route';
// import Index from '../website/Index';
import Dropdown from "./Dropdown";
import Listbox from "./Listbox";
import Detail from "./Detail";
import { Credentials } from "./Credentials";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

//modern code for export class app.. destructuring assignment syntax
const Spotify = () => {
  //secret id and key variable
  const spotify = Credentials();
  console.log(spotify);

  //call the api to retrieve the token on page load
  // once that token is receieved then we will immediately make another call to receieve a list of categories
  //we will use those categories to populate our genre dropdown list
  //after a genre is selected we will call the api again to get a list of playlist for that genre
  //after playlist is selected and button is clicked we will call the api to retieve a list of tracks for that playlist
  // the list will display the album cover etc

  //the below is for when the token is first return we will store the token in the state
  const [token, setToken] = useState("");
  //after we get tokens we will pull a list of genres from our dropdown
  const [genres, setGenres] = useState({
    selectedGenre: "",
    listOfGenresFromAPI: [],
  });
  const [playlist, setPlaylist] = useState({
    selectedPlaylist: "",
    listOfPlaylistFromAPI: [],
  });
  const [tracks, setTracks] = useState({
    selectedTrack: "",
    listOfTracksFromAPI: [],
  });
  const [trackDetail, setTrackDetail] = useState(null);

  //the use state function triggers rerender so the token keeps being called infinitely
  //use effect will fire after the HTML form render has finished loading and will fire after every re render
  //we can dicdate when it fires with dependincy
  useEffect(() => {
    //using axios to get token
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + btoa(spotify.clientID + ":" + spotify.clientSecret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    })
      .catch((error) => console.log(error.response.request._response))
      .then((tokenResponse) => {
        console.log(tokenResponse);
        setToken(tokenResponse.data.access_token);

        //using axios to get genres
        //get call to the categories api endpoint and put the required token in the http header below
        //header type is authorization and we are supplying a bearer token
        axios("https://api.spotify.com/v1/browse/categories?locale=sv_US", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + tokenResponse.data.access_token,
          },
        }).then((genreResponse) => {
          setGenres({
            selectedGenre: genres.selectedGenre,
            listOfGenresFromAPI: genreResponse.data.categories.items,
          });
        });
      });
  }, [genres.selectedGenre, spotify.clientID, spotify.clientSecret]);
  //above is the dependincy that dictaes when we want use effect to be fired
  //if this array is empty the use effect hook will only fire one time

  const genreChanged = (val) => {
    setGenres({
      selectedGenre: val,
      listOfGenresFromAPI: genres.listOfGenresFromAPI,
    });

    axios(
      `https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    ).then((playlistResponse) => {
      setPlaylist({
        selectedPlaylist: playlist.selectedPlaylist,
        listOfPlaylistFromAPI: playlistResponse.data.playlists.items,
      });
    });

    console.log(val);
  };

  const playlistChanged = (val) => {
    console.log(val);
    setPlaylist({
      selectedPlaylist: val,
      listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI,
    });
  };

  const buttonClicked = (e) => {
    e.preventDefault();

    axios(
      `https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ).then((tracksResponse) => {
      setTracks({
        selectedTrack: tracks.selectedTrack,
        listOfTracksFromAPI: tracksResponse.data.items,
      });
    });
  };

  const listboxClicked = (val) => {
    const currentTracks = [...tracks.listOfTracksFromAPI];

    const trackInfo = currentTracks.filter((t) => t.track.id === val);

    setTrackDetail(trackInfo[0].track);
  };

  return (
    <div className="container">
      <h3 className="music-title">Music Generator</h3>
      <form onSubmit={buttonClicked}>
        <Dropdown
          label="Genre :"
          options={genres.listOfGenresFromAPI}
          selectedValue={genres.selectedGenre}
          changed={genreChanged}
        />
        <Dropdown
          label="Playlist :"
          options={playlist.listOfPlaylistFromAPI}
          selectedValue={playlist.selectedPlaylist}
          changed={playlistChanged}
        />
        <div className="col-sm-6 row form-group px-0">
          <button type="submit" className="btn btn-success col-sm-12">
            Search
          </button>
        </div>
        <div className="row">
          <Listbox
            items={tracks.listOfTracksFromAPI}
            clicked={listboxClicked}
          />
          {trackDetail && <Detail {...trackDetail} />}
        </div>
      </form>
    </div>
  );
};
export default Spotify;
