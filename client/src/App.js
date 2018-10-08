import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>URL Shortener Microservice</h1>
        </header>
        <div className="App-body">
          <h4>Url to be shortened...</h4>
        </div>
      </div>
    );
  }
}

export default App;
