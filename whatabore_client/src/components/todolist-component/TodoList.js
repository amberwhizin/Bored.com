import React, { Component } from "react";

const baseUrl = "http://localhost:3001";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      name: "",
      isDone: false,
    };
  }

  componentDidMount = () => {
    this.getItem();
  };

  handleChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleSubmitOnItem = (e) => {
    e.preventDefault();
    if (!this.state.name) return;
    fetch(baseUrl + "/todo-lists/", {
      method: "POST",
      body: JSON.stringify({
        name: this.state.name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          items: this.state.items.concat(data),
          name: "",
        });
      });
  };

  getItem = () => {
    fetch(baseUrl + "/todo-lists")
      .then((data) => {
        return data.json();
      })
      .then((parsedData) => {
        this.setState({
          items: parsedData,
        });
      });
  };

  render() {
    const { items } = this.state;
    console.log({ items });
    return (
      <div>
        <h3>The Bored-Less Task-Tracker</h3>
        <form onSubmit={this.handleSubmitOnItem}>
          <label htmlFor="add-list-item"></label>
          <input
            type="text"
            id="add-list-item"
            onChange={this.handleChangeName}
            value={this.state.name}
          />
          <input type="submit" value="Add Item" />
        </form>
        {this.state.items.map((item, i) => {
          console.log(item);
          return (
            <div key={item + i}>
              <h3>{item.name}</h3>
            </div>
          );
        })}
      </div>
    );
  }
}
