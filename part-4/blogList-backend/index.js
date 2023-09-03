const express = require("express");
const app = express();
require("dotenv").config(); //to access env file

const Blog = require("./model/blog");

app.use(express.json()); //json-parser

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
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
