import React, { Component } from 'react'

import './App.css';
import CreateTodo from "./components/CreateTodo"
import Todo from './models'
import TodoItem from "./components/TodoItem"
import firebase from './config/firebase'

console.log(firebase.name)
console.log(firebase.database())
const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })
const todosRef = db.collection('todos')

const initialState = {
  todos: null,
  filter: "all",
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

    todosRef.add({
      "done": newTodo.done,
      "description": newTodo.description,
    })
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

  updateTodoToShow = filter => {
    this.setState({
      filter: filter
    })
  }

  render() {
    const { filter, todos } = this.state
    let filteredTodos

    if (todos) {
      if (filter === 'all') {
        filteredTodos = todos
      } else if (filter === 'active') {
        filteredTodos = todos.filter(todo => !todo.done)
      } else if (filter === 'complete') {
        filteredTodos = todos.filter(todo => todo.done)
      }
    }

    return (
      <main className="container">
        <h1 className="text-center">Another Todo App</h1>
        <CreateTodo onCreate={this.handleTodoCreate} />
        {filteredTodos &&
        filteredTodos.map(todoItem => {
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
        <div>
          <button onClick={() => this.updateTodoToShow("all")}>all</button>
          <button onClick={() => this.updateTodoToShow("active")}>active</button>
          <button onClick={() => this.updateTodoToShow("complete")}>complete</button>
        </div>
      </main>
    );
  }
}

export default App;
