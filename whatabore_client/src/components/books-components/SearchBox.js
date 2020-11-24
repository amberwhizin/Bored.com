import React, { Component } from 'react';


const SearchBox = (props) => {

    return (
        <div className="search-area">
        <form className="bookSearch" onSubmit={props.handleSubmit}>
            <input className="bookSearchbox" onChange={props.handleChange} placeholder="Search books" type="text"/>
            <button className="bookSearchBttn" type="submit">Search</button>
            <select className="bookSearchDrop" value={props.sort} onChange={props.handleSort} >
                <option value="" disabled selected>Sort</option>
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
            </select>
        </form>
        </div>
      
    );
}

export default SearchBox;