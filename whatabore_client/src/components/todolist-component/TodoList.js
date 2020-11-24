import React, { Component } from "react";

const baseUrl = "http://localhost:3001";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      isDone: false,
    };
  }

  getBookmarks = () => {
    fetch(baseUrl + "/todo-lists")
      .then((data) => {
        return data.json();
      })
      .then((parsedData) => {
        this.setState({
          name: parsedData,
        });
      });
  };

  render() {
    return (
      <div>
        <h3>The Bored-Less Task-Tracker</h3>
        <form>
          <a href="/todo-lists/new">
            <button>Add Item</button>
          </a>
        </form>
      </div>
    );
  }
}
