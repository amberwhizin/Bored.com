import React, { useState, useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import withAuth from "./components/website/withAuth.js";
import Index from "./components/website/Index.js";
import Secret from "./components/website/Secret.js";
import Login from "./components/website/Login.js";
import Logout from "./components/website/Logout.js";
import Dropdown from "./components/music-components/Dropdown";
import Listbox from "./components/music-components/Listbox";
import Detail from "./components/music-components/Detail";
import { Credentials } from "./components/music-components/Credentials";
import axios from "axios";

//modern code for export class app.. destructuring assignment syntax
const App = () => {
  // const lovedSongs = [];
  const spotify = Credentials();
  console.log(spotify);

  //the data for the drop down genre menu

  //
  const [token, setToken] = useState("");
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

  useEffect(() => {
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
      </Switch>
      <h1>BORED? Let us help you!</h1>
      <button>MUSIC</button>
      <button>MOVIES</button>
      <button>BOOKS</button>
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
export default App;
