import React, { Component } from 'react'

import './App.css';
import CreateTodo from "./components/CreateTodo"
import Todo from './models'
import TodoItem from "./components/TodoItem"
import firebase from './config/firebase'

const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })
const todosRef = db.collection('todos')

const initialState = {
  todos: null,
  filter: "all",
}

class App extends Component {
  state = initialState

  componentWillMount() {
    // Diff between state and Firestore
    todosRef.onSnapshot(snapshot => {
      let changes = snapshot.docChanges()
      changes.forEach(change => {
        const id = change.doc.id
        if (change.type === 'added') {
          const done = change.doc.data().done
          const description = change.doc.data().description
          this.addTodo(id, done, description)
        } else if (change.type === 'remove') {
          this.removeTodo(id)
        }
      })
    })
  }

  get todosLeftCount() {
    const { todos } = this.state
    return todos ? todos.filter(todo => !todo.done).length : 0
  }

  addTodo = (id, done, description) => {
    const newTodo = new Todo(description, id, done)

    const newTodos = [...(this.state.todos || []), newTodo]
    this.setState(() => ({
      todos: newTodos,
    }))
  }

  removeTodo = id => {
    todosRef.doc(id).delete()
  }

  handleTodoCreate = description => {

    const newTodo = new Todo(description)

    todosRef.doc(newTodo.id).set({
      "description": newTodo.description,
      "done": newTodo.done,
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

    todosRef.doc(id).update({ done: true })
  }

  handleTodoRemoval = id => {
    if (!this.state.todos) {
      return
    }

    const newTodos = this.state.todos.filter(todo => todo.id !== id)

    this.setState(() => ({
      todos: newTodos,
    }))

    todosRef.doc(id).delete()
    this.removeTodo(id)
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
