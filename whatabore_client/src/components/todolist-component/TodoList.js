import React, { Component } from "react";

const baseUrl = "http://localhost:3001";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: "",
      name: "",
      isDone: false,
    };
  }

  componentDidMount = () => {
    this.getItem();
  };

  handleChangeCurrentItem = (e) => {
    this.setState({
      currentItem: e.target.value,
    });
  };

  handleChangeName = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmitOnItem = (e) => {
    e.preventDefault();
    if (!this.state.currentItem) return;
    console.log('ho')
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
          currentItem: "",
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
        {this.state.items.map((item) => {
          console.log(item);
          return (
            <div>
              <h3>{item.name}</h3>
            </div>
          );
        })}
      </div>
    );
  }
}
