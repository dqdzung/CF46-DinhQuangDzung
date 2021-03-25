import React from "react";

export default class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: "" };
    this.props = props;
  }

  handleInput = (e) => {    
    this.setState({ content: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {addTask} = this.props;
    addTask(this.state.content);
    this.setState({ content: "" });
  };

  render() {
    return (
      <form className="add-form" onSubmit={this.onSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter New Task"
            value={this.state.content}
            onChange={this.handleInput}
          />
          <div className="input-group-append">
            <button className="btn btn-success">Add</button>
          </div>
        </div>
      </form>
    );
  }
}
