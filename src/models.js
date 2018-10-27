export default class Todo {
  constructor(description) {
    this.id = String(Date.now())
    this.done = false
    this.description = description
  }
}