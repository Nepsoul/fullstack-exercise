const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const myBlog = await Blog.find({});
  res.json(myBlog);
  // Blog.find({}).then((blogs) => {
  //   console.log(blogs, "blogs");
  //   res.json(blogs);
  // });
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

blogsRouter.post("/", async (req, res, next) => {
  try {
    const blog = new Blog(req.body);
    if (blog.likes === undefined) {
      blog.likes = 0;
    }
    // if (!blog.likes) {
    //   blog.likes = 0;
    // }
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);

    // const blog = new Blog(req.body);
    // console.log(blog, "blog");
    // blog.save().then((result) => {
    //   res.status(201).json(result);
    // });}
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
