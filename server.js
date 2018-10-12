"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const validUrl = require("valid-url");
const path = require("path");
const cors = require("cors");

// Post Model Schema
const Post = require("./models/Post");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Connect to MongoDB
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Create random num links
const newLink = () => {
  const num = Math.floor(100000 + Math.random() * 900000);
  return num.toString().substring(0, 4);
};

// ------------ Api Calls ------------
app.post("/api/shorturl/new", (req, res) => {
  if (!req.body || !validUrl.isUri(req.body.url)) {
    return res.status(400).json(errors);
  }

  // Create new Post Schema object w/ data
  const newPost = new Post({
    original_url: req.body.url,
    short_url: newLink()
  });

  // Save data to db, then log data
  res.send(newPost);
  newPost.save().then(console.log("Url saved successfully"));
});

app.get("/api/shorturl/:url", (req, res) => {
  // Find short url of specified param
  Post.findOne({ short_url: req.params.url })
    .then(url => {
      res.redirect(301, url.original_url);
      // res.send({
      //   go_to: `http://localhost:5000/api/shorturl/${url.short_url}`
      // });
    })
    .catch(e => {
      res.status(404).send(e);
    });
});

// Heroku setup
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
