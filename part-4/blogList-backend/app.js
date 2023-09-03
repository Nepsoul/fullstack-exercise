const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Blog = require("./models/blog");

const mongoUrl = require("./utils/config");

const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  noHandler,
} = require("./utils/middleware");

app.use(express.json()); //json-parser (note: without parser, req.body of post api is undefined)

mongoose.set("strictQuery", false);
console.log("connecting to url ", mongoUrl.MONGODB_URI);

mongoose.connect(mongoUrl.MONGODB_URI);

mongoose
  .connect(mongoUrl.MONGODB_URI)
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((error) => {
    console.log("error connecting to mongoDB: ", error.message);
  });

app.get("/", (req, res) => {
  res.send("<h2>This is new Blog-project</h2>");
});

app.get("/api/blogs", (req, res) => {
  Blog.find({}).then((blogs) => {
    console.log(blogs, "blogs");
    res.json(blogs);
  });
});

app.get("/api/blogs/:id", (req, res) => {
  Blog.findById(req.params.id).then((blog) => {
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({
        error: 404,
        message: `There is no blog with id ` + req.params.id,
      });
    }
  });
});

app.post("/api/blogs", (req, res) => {
  const blog = new Blog(req.body);
  console.log(blog, "blog");
  blog.save().then((result) => {
    res.status(201).json(result);
  });
});

//console of api
app.use(requestLogger);
// handler of requests with unknown endpoint
app.use(unknownEndpoint);
//handle error if given absolut url is wrong
app.use(noHandler);
// this has to be the last loaded middleware.
app.use(errorHandler);

module.exports = app;
