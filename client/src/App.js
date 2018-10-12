import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="title">
          <h1>URL Shortener Microservice</h1>
        </header>
        <section>
          <h3 className="stories-title">User Story</h3>
          <ol className="stories-body">
            <li className="stories-1">
              I can POST a URL to{" "}
              <code>{"[project_url]/api/shorturl/new"}</code> and I will receive
              a shortened URL in the JSON response.
            </li>
            <li className="stories-2">
              If I pass an invalid URL that doesn't follow the{" "}
              <code>{"http(s)://www.example.com(/more/routes)"}</code> format,
              the JSON response will contain an error like{" "}
              <code>{'"error":"invalid URL"'}</code>
            </li>
            <li className="stories-3">
              When I visit the shortened URL, it will redirect me to my original
              link.
            </li>
          </ol>
        </section>
        <div className="App-body">
          <div className="url-form">
            <form action="api/shorturl/new" method="POST">
              <label htmlFor="url_input">Input a URL</label>
              <input
                id="url_input"
                type="url"
                name="url"
                placeholder="https://www.google.com"
              />
              <input type="submit" id="button" value="Post URL" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
