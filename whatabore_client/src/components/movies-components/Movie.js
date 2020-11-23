import React, { useState } from 'react'
import axios from 'axios'


import Search from './Search'
import Results from './Results'
import Popup from './Popup'



function Movie() {
  const [state, setState] = useState({
    search: "",
    results: [],
    selected: {}
  });

  //.env stuff
  
  const baseURL = "http://www.omdbapi.com/?";
const apikey = "apikey=" + process.env.REACT_APP_movieSecret;
const apiurl = baseURL + apikey
// console.log(apiurl)
// console.log(process.env)



  //api call to search for the movie
  const search = (event) => {
      event.preventDefault();
      //if equal to enter
      //decided not to use the Enter key so we added a form button in the Search.js
    // if (enter.key === "Enter") {
        //api call with the  s parameter from the api docs
        //data returns what u pull from the API
        //curly brackets destructure for cleaner code 
      axios(apiurl + "&s=" + state.search).then(({ data }) => {
          //console.log(data)
        let results = data.Search;

        //updates the results state with the data we grabbed from the API above
        setState(previousState => {
          return { ...previousState, results: results }
        })
      });
    // }
  }
  
  //function that lets serach bar change
  const handleInput = (e) => {
    let search = e.target.value;

    //allows for users to type in the search bar
    //updates the state with whatever user types
    setState(previousState => {
      return { ...previousState, search: search }
    });
  }

  //calling the api again
  //i gets us the information for the movie
  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      //console log working and the code in the <Popup/> is rendering in the console
      console.log(result);

      //changes state of selected value to result
      setState(previousState => {
        return { ...previousState, selected: result }
      });
    });
  }

  //closes the popup by setting state back to empty
  const closePopup = () => {
    setState(previousState => {
      return { ...previousState, selected: {} }
    });
  }

  return (
    <div className="App">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main>
          
        <Search handleInput={handleInput} search={search} />

        <Results results={state.results} openPopup={openPopup} />


        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}
//the {(typeof)} is conditionally rendering the component
//{(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
// the above means that if the state.selected.Title is not equal to undefined then(?) show the <Popup/> 
// insdie Popup we pass through the selected state and the closePopup function
//else(:) false which means we dont get anything
export default Movie
