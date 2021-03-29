import React from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import "./searchForm.style.css";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { keyword: "", offset: 0 };
    // this.debounce = null;
  }

  handleScroll = () => {
    const { keyword, offset } = this.state;
    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - 200
    ) {
      console.log("bottom")
      this.setState(
        (prevState) => {
          return { offset: prevState.offset + 25 };
        },
        () => {
          this.handleSearch(keyword, offset);
        }
      );
    }
  };

  debounceHandleScroll = debounce(this.handleScroll, 1000);

  componentDidMount() {
    window.addEventListener("scroll", this.debounceHandleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.debounceHandleScroll);
  }

  handleSearch = async (keyword, offset = 0) => {
    this.props.changeLoading(true); // setState cho isLoading của App
    const urlAPI = `https://api.giphy.com/v1/gifs/search?api_key=R8Tn7WP68lMvqGDTD9Qn82x9kZgAXZIR&q=${keyword}&limit=25&offset=${offset}&rating=g&lang=vi`;

    const res = await axios.get(urlAPI); //NOTE: kết quả trả về nằm trong res.data

    // Cần thay đổi state của App => App truyền props dạng function xuống
    const newImages = res.data.data.map((image) => ({
      imgUrl: image.images.downsized_medium.url,
      caption: image.title,
    }));

    this.props.changeImages(newImages, offset); // setState cho images của App
    this.props.changeLoading(false); // setState cho isLoading của App
  };

  debounceSearch = debounce(this.handleSearch, 1000);

  handleFormChange = async (event) => {
    const keyword = event.target.value;

    this.setState({ keyword: keyword });

    this.debounceSearch(keyword);

    // if (this.debounce) {
    //   clearTimeout(this.debounce);
    // }

    // this.debounce = setTimeout(() => {
    //   this.handleSearch(keyword);
    // }, 1000);
  };

  handleSubmitForm = async (event) => {
    const { keyword } = this.state;
    event.preventDefault();
    this.handleSearch(keyword);
  };

  renderButton = () => {
    if (this.state.keyword.trim().length > 0) {
      return (
        <button id="search-btn" className="btn btn-primary ms-2">
          Search
        </button>
      );
    }
    return <button disabled>Search</button>;
  };

  render() {
    return (
      <form className="form d-flex" onSubmit={this.handleSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={this.state.keyword}
          onChange={this.handleFormChange}
        />
        {this.renderButton()}
      </form>
    );
  }
}

export default SearchForm;
