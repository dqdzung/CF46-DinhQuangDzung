import React from "react";
import Header from "./components/Header";
import AddForm from "./components/AddForm";
import TaskList from "./components/TaskList";
import "./App.css";

class App extends React.Component {
  state = {
    tasks: [
      {
        id: 1,
        text: "Default task",
      },
    ],
  };

  deleteTask = (id) => {
    this.setState((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  };

  addTask = (content) => {
    const newTask = {
      id: this.state.tasks.length + 1,
      text: content,
    };
    this.setState({ tasks: [...this.state.tasks, newTask] }, () => {
      console.log("Task added", this.state.tasks);
    });
  };

  render = () => {
    const tasks = this.state.tasks;
    return (
      <div className="App d-flex justify-content-center">
        <div className="main-container d-flex flex-column align-items-center">
          <Header></Header>
          <AddForm addTask={this.addTask}></AddForm>
          <TaskList tasks={tasks} onDelete={this.deleteTask}></TaskList>
        </div>
      </div>
    );
  };
}

export default App;
