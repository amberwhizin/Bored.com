import React, { Component } from 'react'
import axios from "axios" ;
import "./Credentials" ;
// import "./Dropdown" ;
import "./index.html" ; 
import 'bootstrap/dist/css/bootstrap.css';


// class googlebooks extends Component {

    function App() {
    
    const [book, setBook] = useState("");
    const [result, setResult] = useState([]);
    const [apiKey, setApiKey] = useState("AIzaSyB_Ahm92sGZbjvT3e0qOVWkZ1imyUphCNw")

    function handleChange (event){
      
        const book = event.target.value;

        setBook(book);
    }

    function handleSubmit(event){

        event.preventDefault();

        axios.get("https://www.googleapis.com/books/v1/volumes?q="+book+"&key= "+apiKey+"&maxResults=20")
        .then(data => {
        console.log(data.data.items);
        setResult(data.data.items);

        })

    }
    // render() {
        return (
            <div class="container">
                <h1>Search For Books</h1>
                <form onSumbit={handleSubmit}>
                    <div class= "form-group">
                    <input type= "text" onChange={handleChange}
                     className= "form-control mt-10" 
                     placeholder="Search for Books" 
                     autoComplete="off"/>              
                </div>
                <button type="submit" className="btn btn-primary">Primary</button>
                Search 
                </form>
                {result.map(book => {
                    <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title}/>
                
            // </div>
        );
    
