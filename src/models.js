import shortid from 'shortid'

export default class Todo {
  constructor(description, id, done) {
    this.description = description
    this.id = id ? id : shortid.generate()
    this.done = done ? done : false
  }
}