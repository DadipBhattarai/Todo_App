import React, { Component } from "react";
import "./index.css";
import TodoItem from "./Todoitem";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoInput: "",
      searchInput: "",
      todos: [],
    };
  }

  handleTodoInputChange = (event) => {
    const value = event.target.value;
    this.setState({
      todoInput: value,
    });
  };

  handleSearchInputChange = (event) => {
    const value = event.target.value;
    this.setState({
      searchInput: value,
    });
  };

  handleAddClick = (e) => {
    e.preventDefault();
    const todoInput = this.state.todoInput;
    const todo = {
      todoText: todoInput,
      completed: false,
      editMode: false,
    };
    const todosCloned = this.state.todos.slice();
    todosCloned.push(todo);

    this.setState({
      todos: todosCloned,
      todoInput: "",
    });
  };

  handleTodoComplete = (index) => {
    const todosCloned = this.state.todos.slice();
    const prevCompletedState = todosCloned[index].completed;
    todosCloned[index].completed = !prevCompletedState;

    this.setState({
      todos: todosCloned,
    });
  };

  handleRemove = (index) => {
    const todosCloned = this.state.todos.slice();
    todosCloned.splice(index, 1);

    this.setState({
      todos: todosCloned,
    });
  };

  handleClearAll = () => {
    this.setState({
      todos: [],
    });
  };

  searchTodo = () => {
    return this.state.todos.filter((todo) => {
      const searchText = this.state.searchInput.toLowerCase();
      return todo.todoText.toLowerCase().includes(searchText);
    });
  };

  handleEditMode = (index) => {
    const todosCloned = this.state.todos.slice();
    const prevEditMode = todosCloned[index].editMode;
    todosCloned[index].editMode = !prevEditMode;

    this.setState({
      todos: todosCloned,
    });
  };

  handleEditTodoChange = (event, index) => {
    const todosCloned = this.state.todos.slice();
    const value = event.target.value;
    todosCloned[index].todoText = value;

    this.setState({
      todos: todosCloned,
    });
  };

  render() {
    const filtered = this.searchTodo();
    const noTodo = this.state.todos.length === 0;
    const noChar = this.state.todoInput.length === 0;

    return (
      <div className="todo-container">
        <h1 className="title">Mero Todo</h1>
        <input
          type="text"
          placeholder="Enter Todo..."
          onChange={this.handleTodoInputChange}
          value={this.state.todoInput}
        />

        <button
          disabled={noChar}
          type="submit"
          className="add-button"
          onClick={this.handleAddClick}
        >
          Add
        </button>

        {noTodo ? null : (
          <input
            type="text"
            className="find-input"
            placeholder="Search Todo..."
            onChange={this.handleSearchInputChange}
            value={this.state.searchInput}
          />
        )}

        {noTodo ? null : <hr />}

        {/* <li>
            <input type="checkbox" />
            <span>Designing a todo</span>
            <button className="remove">x</button>
          </li>
          <li>
            <input type="checkbox" className="todo-check" />
            <span>Designing</span>
            <button className="remove">x</button>
          </li> */}
        <ul>
          {filtered.map((todo, i) => {
            return (
              <TodoItem
                key={i}
                todoText={todo.todoText}
                completed={todo.completed}
                onTodoComplete={() => {
                  this.handleTodoComplete(i);
                }}
                onRemove={() => {
                  this.handleRemove(i);
                }}
                editMode={todo.editMode}
                onEditMode={() => {
                  this.handleEditMode(i);
                }}
                onEditTodoChange={(event) => {
                  this.handleEditTodoChange(event, i);
                }}
              />
            );
          })}
        </ul>

        {noTodo ? null : <hr />}

        {noTodo ? null : (
          <button onClick={this.handleClearAll}>Clear All</button>
        )}
      </div>
    );
  }
}

export default App;
