const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (req, res) => {
  Blog.find({}).then((blogs) => {
    console.log(blogs, "blogs");
    res.json(blogs);
  });
});

blogsRouter.get("/:id", (req, res) => {
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

blogsRouter.post("/", (req, res) => {
  const blog = new Blog(req.body);
  console.log(blog, "blog");
  blog.save().then((result) => {
    res.status(201).json(result);
  });
});

module.exports = blogsRouter;
