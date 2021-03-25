import React, { Component } from "react";

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { task, onDelete } = this.props;
    return (
      <li className="list-group-item d-flex align-items-center justify-content-between">
        <div className="task">{task.text}</div>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            onDelete(task.id);
          }}
        >
          Delete
        </button>
      </li>
    );
  }
}
