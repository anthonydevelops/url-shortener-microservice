"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const validUrl = require("valid-url");
const path = require("path");
const cors = require("cors");

const Post = require("./models/Post");

const app = express();
const port = process.env.PORT || 5000;
let index = 0;

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

// Api Calls
app.post("/api/shorturl/new", (req, res) => {
  // Check if post was received
  if (!req.body) {
    return res.status(400).json(errors);
  }

  // Check if url is valid
  if (!validUrl.isUri(req.body.url)) {
    return res.status(400).json(errors);
  }

  // Create new Post Schema object w/ data
  const newPost = new Post({
    original_url: req.body.url,
    short_url: "" + index
  });

  // Save data to db, then return data to user
  newPost.save().then(post => res.json(post));

  index++;
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
