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

  handleDelete = (index) => {
    const items = this.state.items.filter((todoItem, i) => {
      return i !== index;
    });
    const currentItem = this.state.items[index];
    fetch(baseUrl + "/todo-lists/" + currentItem._id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            items,
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  toggleIsDone = (index) => {
    // console.log("***", { index });
    // map array
    const items = this.state.items.map((todoItem, i) => {
      // index of the currentitem being passed in matches the item were mapping over
      if (i === index) {
        return {
          // spread made copy of item, wooo
          ...todoItem,
          isDone: !todoItem.isDone,
        };
      }
      return todoItem;
    });
    //items im mapping over and the index im passing in of the current item im on and inside that is the id im on
    const currentItem = items[index];
    //id is being passes in with "params" from back end
    // console.log(this.state, { index, items, currentItem });
    fetch(baseUrl + "/todo-lists/" + currentItem._id, {
      method: "PUT",
      body: JSON.stringify({
        name: currentItem.name,
        isDone: currentItem.isDone,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            items,
          });
        }
      })
      .catch((e) => {
        console.error(e);
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
    //const { items } = this.state;
    // console.log({ items });
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
          // console.log(item);
          return (
            <div key={item + i}>
              <h3>{item.name}</h3>
              <button onClick={() => this.toggleIsDone(i)}>
            
                {item.isDone ? "done" : "notDone"}
              </button>
              <button onClick={() => this.handleDelete(i)}>Delete</button>
            </div>
          );
        })}
      </div>
    );
  }
}
