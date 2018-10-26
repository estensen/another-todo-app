import React, { Component } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import CreateTodo from "./components/CreateTodo";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Another Todo App</h1>
        <CreateTodo onCreate={(desc) => console.log(desc)} />
        <TodoList />
      </div>
    );
  }
}

export default App;
