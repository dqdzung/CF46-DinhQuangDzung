import React from "react";
import toDoIcon from "../images/to-do-list-icon.jpg";

export default class Header extends React.Component {
  render() {
    return (
      <h1 className="d-flex align-items-center justify-content-center m-4">
        Your To-do List <img className="m-3" src={toDoIcon} alt="" />
      </h1>
    );
  }
}