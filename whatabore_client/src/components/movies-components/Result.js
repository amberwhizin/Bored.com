import React from 'react'

//this is what will show up in the popup
function Result({ result, openPopup }) {
	return (
		<div className="result" onClick={() => openPopup(result.imdbID)}>
			<img src={result.Poster} />
			<h3>{result.Title}</h3>
		</div>
	)
}
//Poster and Title are grabbed from when we console logged the data and in the Console it listed the Querys
export default Result
