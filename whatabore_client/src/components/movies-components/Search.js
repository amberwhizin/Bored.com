import React from 'react'

//this component allows us to type in the search bar

//props from the Movie.js file
//the curly braces destructure the parameter which pulls through the props so we dont have to use .props used for cleaner code 
//decided to add a button instead of having it just search onKeyPress
function Search ({ handleInput, search }) {
	return (
		<section className="searchbox-wrap">
            <form onSubmit={search}>
			<input 
				type="text" 
				placeholder="Search for a movie..." 
				className="searchbox" 
                onChange={handleInput}
                //when we press any key it will run this function 
                //will only run when we press the enter key because we set it to check if it has the enter key
				// onKeyPress={search}
			/>
        <input type="submit" value="Search" />
            </form> 
		</section>
	)
}

export default Search