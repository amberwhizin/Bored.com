import React from 'react'
import {Link } from "react-router-dom";
//props destructured in the brackets
//we are bringing in the ClosePopup function and having it render on the click of the close button in the popup
//selected is the state we passed through as a prop
function Popup({ selected, closePopup }) {
	return (
		<section className="popup">
			<div className="content">
				<h2>{ selected.Title } <span>({ selected.Year })</span></h2>
				<p className="rating">Rating: {selected.imdbRating}</p>
				<div className="plot">
					<img src={selected.Poster} />
					<p>{selected.Plot}</p>
				</div>

				<button className="close" onClick={closePopup}>Close</button>
                <Link to="/yourcollection">
  <button renderAs="button">
    <span>UNBORE ME!</span>
  </button>
</Link>
			</div>
		</section>
	)
}
//Tittle, Year, imbdRating, Plot, Poster all come from the data we grabbed from the API and we found in the console.log

export default Popup