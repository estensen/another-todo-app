import React from 'react'

export default class TodoItem extends React.Component {
  handleCheckedChange = ev => {
    this.props.onCompleteChange(this.props.model.id)
  }

  handleRemoveClick = ev => {
    this.props.onRemove(this.props.model.id)
  }

  render() {
    const { model } = this.props

    return (
      <div className="row flex-edges form-group">
        <label htmlFor={model.id} className="paper-check col col-8">
          <input
            type="checkbox"
            name={model.id}
            id={model.id}
            checked={model.done}
            onChange={this.handleCheckedChange}
          />
          <span>{model.description}</span>
        </label>
        <button
          className="btn-small col col-4"
          onClick={this.handleRemoveClick}
        >
          X
        </button>
      </div>
    )
  }
}