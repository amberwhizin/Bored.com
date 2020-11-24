import React, { Component } from 'react';  
import axios from 'axios';  
// import { Card } from 'react-bootstrap';  
import BookList from './BookList'
import SearchBox from './SearchBox'

// const [book, setBook] = useState("");  
    // const [result, setResult] = useState([]);  
    const apikey = process.env.REACT_APP_books

// function Books() {  
  class Books extends Component { 

    constructor(props){
      super(props)
      this.state = {
          books: [],
          searchField: '',
          sort: ''
      }
  }
    
    componentDidMount() {
      axios.get("https://www.googleapis.com/books/v1/volumes?q=" + this.state.searchField + "&key=" + apikey + "&maxResults=15")  
          .then((data) => {
              this.setState({ books: [...data.data.items] })
          })
          
  }


    handleSubmit = (e) => {
      e.preventDefault();
      axios.get("https://www.googleapis.com/books/v1/volumes?q=" + this.state.searchField + "&key=" + apikey + "&maxResults=10") 
          .then((data) => {
              console.log(data);
              this.setState({ books: [...data.data.items] })
      })
  }

    handleChange = (e) => {
      this.setState({ searchField: e.target.value })
  }

  handleSort = (e) => {
      this.setState({ sort: e.target.value});
  }

    render() {
      const filteredBooks = this.state.books.sort((a, b) => {
          if(this.state.sort == 'Newest'){
              console.log("in newest")
              return parseInt(b.volumeInfo.publishedDate.substring(0, 4)) - parseInt(a.volumeInfo.publishedDate.substring(0, 4));
          }
          else if(this.state.sort == 'Oldest'){
              return parseInt(a.volumeInfo.publishedDate.substring(0, 4)) - parseInt(b.volumeInfo.publishedDate.substring(0, 4));
          }
        
        return;
      })
    return (  
   
        <div className="wrapper">
        <SearchBox 
            data={this.state} 
            handleSubmit={this.handleSubmit} 
            handleChange={this.handleChange} 
            handleSort={this.handleSort}
        />
        <BookList books={filteredBooks}/>
    </div>
    )  
    }
}  
  
export default Books;