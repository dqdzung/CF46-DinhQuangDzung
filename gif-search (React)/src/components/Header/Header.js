import React from "react";
import logo from "../../images/giphy-logo.svg";
import "./header.style.css";

class Header extends React.Component {
  render() {
    return (
      <>
        <div className="Header">
          <img src={logo} alt="" />
          <h1>{this.props.label}</h1>
        </div>
      </>
    );
  }
}

export default Header;
