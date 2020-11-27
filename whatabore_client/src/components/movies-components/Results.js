import React from 'react'
import Result from './Result'

//curly brackets destructure props
//result is the one result that we grab when the user searches the movie instead of all of the results of data
function Results ({ results, openPopup }) {
	return (
		<section className="results">
			{results.map(result => (
				<Result key={result.imdbID} result={result} openPopup={openPopup} />
			))}
		</section>
	)
}
// the key prop fixes warning
//<Result /> is a sub compoenent used inside this component to handle the ONE result we need for the popup

export default Results