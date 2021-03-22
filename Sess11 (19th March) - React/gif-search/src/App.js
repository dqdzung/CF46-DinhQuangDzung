import React from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm/SearchForm";
import ImageContainer from "./components/ImageContainer/ImageContainer";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "Gif me!!!!!",
      images: [
        {
          imgUrl: "https://media.giphy.com/media/H0EBDM4Vk6880/giphy.gif",
          caption: "shaq",
        },
        {
          imgUrl: "https://media.giphy.com/media/Rxt5Nxbl3KM3DhyxZm/giphy.gif",
          caption: "wiggle",
        },
        {
          imgUrl: "https://media.giphy.com/media/LmYoDjbWL0RkFcRoeb/giphy.gif",
          caption: "cat",
        },
      ],
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({ label: "Let's Search!!!!" });
    }, 3000);
  }

  render() {
    return (
      <div className="App d-flex justify-content-center">
        <div
          id="main-container"
          className="d-flex flex-column align-items-center"
        >
          <Header label={this.state.label}></Header>
          <SearchForm></SearchForm>
          <div className="content">
            {this.state.images.map((image, idx) => {
              return (
                <ImageContainer
                  key={idx}
                  imgUrl={image.imgUrl}
                  caption={image.caption}
                ></ImageContainer>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
