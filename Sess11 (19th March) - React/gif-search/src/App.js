import logo from "./images/GIPHY Logo 60px.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt="" />
        <h1>Search a Gif</h1>
      </div>
      <div className="form">
        <input type="text" />
        <button id="search-btn">Search</button>
      </div>
      <div className="content">
        <div className="image-container">
          <div className="image-content">
            <img
              src="https://media.giphy.com/media/LmYoDjbWL0RkFcRoeb/giphy.gif"
              alt=""
            />
          </div>
          <div className="image-caption">
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
