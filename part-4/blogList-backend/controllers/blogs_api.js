const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const myBlog = await Blog.find({});
  res.json(myBlog).end();
  // Blog.find({}).then((blogs) => {
  //   console.log(blogs, "blogs");
  //   res.json(blogs);
  // });
});

blogsRouter.get("/:id", (req, res, next) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      if (blog) {
        res.json(blog);
      } else {
        res.status(404).json({
          error: 404,
          message: `There is no blog with id ` + req.params.id,
        });
      }
    })
    .catch((error) => next(error));
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
    if (!blog.title || !blog.url) {
      res.status(400).json({ error: "missing property" }).end();
    }
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

blogsRouter.delete("/:id", async (req, res, next) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

blogsRouter.put("/:id", async (req, res) => {
  await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((updatedBlog) => res.json(updatedBlog))
    .catch((error) => next(error));
});

module.exports = blogsRouter;
