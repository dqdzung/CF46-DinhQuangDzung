import React from "react";
import "./searchForm.style.css"

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { keyword: "" };
  }

  handleFormChange = (event) => {
    console.log(event.target.value);
    this.setState({ keyword: event.target.value });
  };

  renderButton() {
    if (this.state.keyword.length > 0) {
      return (
        <button id="search-btn" className="btn btn-primary ms-2">
          Search
        </button>
      );
    }
    return <button disabled>Search</button>;
  }

  render() {
    return (
      <div className="form d-flex">
        <input
          type="text"
          className="form-control"
          value={this.state.keyword}
          onChange={this.handleFormChange}
        />
        {this.renderButton()}
      </div>
    );
  }
}

export default SearchForm;
