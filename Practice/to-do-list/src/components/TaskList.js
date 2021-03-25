import React from "react";
import Task from "./Task";

export default class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { tasks, onDelete } = this.props;
    return (
      <>
        <h4 className="mt-3 mb-3">
          There <span>{tasks.length > 1 ? "are" : "is"} </span>
          <span>{tasks.length} task(s)</span> left to do
        </h4>
        <ul className="list-group">
          {tasks.map((task) => (
            <Task key={task.id} task={task} onDelete={onDelete}></Task>
          ))}
        </ul>
      </>
    );
  }
}
