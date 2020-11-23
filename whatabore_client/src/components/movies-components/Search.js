import React from 'react'

//this component allows us to type in the search bar

//props from the Movie.js file
//the curly braces destructure the parameter which pulls through the props so we dont have to use .props used for cleaner code 
function Search ({ handleInput, search }) {
	return (
		<section className="searchbox-wrap">
            <form>
			<input 
				type="text" 
				placeholder="Search for a movie..." 
				className="searchbox" 
                onChange={handleInput}
                //when we press any key it will run this function 
                //will only run when we press the enter key because we set it to check if it has the enter key
				onKeyPress={search}
			/>
            <button onClick={search}>Search</button>
            </form>
		</section>
	)
}

export default Search