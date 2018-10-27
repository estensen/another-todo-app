import shortid from 'shortid'

export default class Todo {
  constructor(description) {
    this.id = shortid.generate()
    this.done = false
    this.description = description
  }
}