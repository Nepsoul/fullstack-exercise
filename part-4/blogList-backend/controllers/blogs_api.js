const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res, next) => {
  try {
    const myBlog = await Blog.find({});
    res.json(myBlog).end();
    // Blog.find({}).then((blogs) => {
    //   console.log(blogs, "blogs");
    //   res.json(blogs);
    // });
  } catch (error) {
    next(error);
  }
});

blogsRouter.get("/:id", async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({
        error: 404,
        message: `There is no blog with id ` + req.params.id,
      });
    }
    res.json(blog);
  } catch (error) {
    next(error);
  }
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
      res.status(400).json({ error: "missing property" }).end(); //error handled by api
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
  try {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (req, res, next) => {
  try {
    const toUpdateBlog = await Blog.findById(req.params.id);
    if (!toUpdateBlog) {
      res.status(404).json({ error: "this blog does not exist" });
    }
    const updatedBlog = await Blog.findByIdAndUpdate(toUpdateBlog, req.body, {
      new: true,
    });
    res.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
