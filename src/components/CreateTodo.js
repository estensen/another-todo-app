import React from 'react';

const initialState = Object.freeze({
  description: '',
})

export default class CreateTodo extends React.Component {
  state = initialState

  handleChange = ev => {
    const { value } = ev.target

    this.setState(() => ({ description: value }))
  }

  handleSubmit = ev => {
    ev.preventDefault()
    const { description } = this.state

    this.props.onCreate(description)
    this.setState(() => initialState)
  }

  render() {
    const { description } = this.state

    return (
      <form onSubmit={this.handleSubmit} className="paper">
        <div className="form-group">
          <input
            type="text"
            className="input-block"
            placeholder="start typing"
            value={description}
            onChange={this.handleChange}
          />
        </div>
      </form>
    )
  }
}
