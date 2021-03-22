import logo from "./images/giphy-logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App d-flex justify-content-center">
      <div id="main-container" className="d-flex flex-column align-items-center">
        <div className="header">
          <img src={logo} alt="" />
          <h1>Search a Gif</h1>
        </div>
        <div className="form">
          <input type="text" className="form-control" />
          <button id="search-btn" className="btn btn-primary d-none">
            Search
          </button>
        </div>
        <div className="content">
          <div className="image-container d-flex">
            <div className="image-inner">
              <img
                src="https://media.giphy.com/media/LmYoDjbWL0RkFcRoeb/giphy.gif"
                alt=""
              />
            </div>
            <div className="image-caption">
              <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
            </div>
          </div>
          <div className="image-container d-flex">
            <div className="image-inner">
              <img
                src="https://media.giphy.com/media/H0EBDM4Vk6880/giphy.gif"
                alt=""
              />
            </div>
            <div className="image-caption">
              <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
            </div>
          </div>
          <div className="image-container d-flex">
            <div className="image-inner">
              <img
                src="https://media.giphy.com/media/Rxt5Nxbl3KM3DhyxZm/giphy.gif"
                alt=""
              />
            </div>
            <div className="image-caption">
              <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
