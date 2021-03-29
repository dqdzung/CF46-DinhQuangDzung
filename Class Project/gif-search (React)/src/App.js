import React from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm/SearchForm";
import ImageContainer from "./components/ImageContainer/ImageContainer";
import Loading from "./components/Loading/Loading";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "Gif me!!!!!",
      images: [],
      isLoading: false,
    };
  }

  changeImages = (newImages, offset) => {
    if (offset === 0) {
      this.setState({ images: newImages, isLoading: false });
    } else {
      this.setState((prevState) => {
        return {
          images: [...prevState.images, ...newImages],
          isLoading: false,
        };
      });
    }
  };

  changeLoading = (newLoading) => {
    this.setState({ isLoading: newLoading });
  };

  renderImages = () => {
    const {images} = this.state;
    return images.map((image, index) => {
      return (
        <ImageContainer
          key={index}
          imgUrl={image.imgUrl}
          caption={image.caption}
        />
      );
    });
  };

  render() {
    return (
      <div className="App d-flex justify-content-center">
        <div
          id="main-container"
          className="d-flex flex-column align-items-center"
        >
          <Header label={this.state.label} />
          <SearchForm
            changeImages={this.changeImages}
            changeLoading={this.changeLoading}
          />
          <div className="content">{this.renderImages()}</div>
          {this.state.isLoading && <Loading/>}
        </div>
      </div>
    );
  }
}

export default App;
