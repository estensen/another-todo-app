import React, { Component } from 'react';
import './App.css';
import CreateTodo from "./components/CreateTodo";
import Todo from './models'
import TodoItem from "./components/TodoItem";

const initialState = {
  todos: null
}

class App extends Component {
  state = initialState

  get todosLeftCount() {
    const { todos } = this.state
    return todos ? todos.filter(todo => !todo.done).length : 0
  }

  handleTodoCreate = description => {
    const newTodo = new Todo(description)

    const newTodos = [...(this.state.todos || []), newTodo]
    this.setState(() => ({
      todos: newTodos,
    }))
  }

  handleTodoCompleteChange = id => {
    if (!this.state.todos) {
      return
    }

    const newTodos = this.state.todos.map(todo => {
      return todo.id !== id ? todo: { ...todo, done: !todo.done }
    })

    this.setState(() => ({
      todos: newTodos,
    }))
  }

  handleTodoRemoval = id => {
    if (!this.state.todos) {
      return
    }

    const newTodos = this.state.todos.filter(todo => todo.id !== id)

    this.setState(() => ({
      todos: newTodos,
    }))
  }

  render() {
    const { todos } = this.state

    return (
      <main className="container">
        <h1 className="text-center">Another Todo App</h1>
        <CreateTodo onCreate={this.handleTodoCreate} />
        {todos &&
          todos.map(todoItem => {
            return (
              <TodoItem
                key={todoItem.id}
                model={todoItem}
                onCompleteChange={this.handleTodoCompleteChange}
                onRemove={this.handleTodoRemoval}
              />
            )
          })}
        <p className="border border-muted padding-large text-center">
          Remaining todos: <b>{this.todosLeftCount}</b>
        </p>
      </main>
    );
  }
}

export default App;
