const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
// const jwt = require("jsonwebtoken");
const { userExtractor } = require("../utils/middleware");

// const getTokenFrom = (request) => {
//   console.log(request, "request form getTokenFrom function");
//   const authorization = request.get("authorization");
//   console.log(authorization, "authorization");
//   if (authorization && authorization.startsWith("Bearer ")) {
//     return authorization.replace("Bearer ", "");
//   }
//   return null;
// };

blogsRouter.get("/", async (req, res, next) => {
  try {
    const myBlog = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
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
blogsRouter.post("/", userExtractor, async (req, res, next) => {
  try {
    // const decodedToken = jwt.verify(req.token, process.env.SECRET);
    // if (!decodedToken.id) {
    //   return res.status(401).json({ error: "token invalid" });
    // }

    // get user from request object
    const user = await User.findById(req.user.id);
    const addedBlog = { ...req.body, user: user._id };
    const blog = new Blog(addedBlog);

    if (blog.likes === undefined) {
      blog.likes = 0;
    }

    // if (!blog.likes) {
    //   blog.likes = 0;
    // }

    if (!blog.title || !blog.url) {
      res.status(400).json({ error: "missing property" }).end(); //error handled by api
    }

    // const blog = new Blog({  //alternative method
    //   title: req.body.title,
    //   author: req.body.author,
    //   url: req.body.url,
    //   likes: req.body.likes,
    //   user: user.id,
    // });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

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

blogsRouter.delete("/:id", userExtractor, async (req, res, next) => {
  try {
    // const decodedToken = jwt.verify(req.token, process.env.SECRET);
    // if (!decodedToken.id) {
    //   return res.status(401).json({ error: "token missing or invalid" });
    // }

    const user = await User.findById(req.user.id);
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "blog does not exist" });
    }

    if (user.id.toString() === blog.user.toString()) {
      await Blog.findByIdAndRemove(req.params.id);
      res.status(204).end();
    } else {
      res.status(401).json({ message: "access denied" });
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", userExtractor, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); //userExtractor => req.user

    const toUpdateBlog = await Blog.findById(req.params.id);

    if (!toUpdateBlog) {
      res.status(404).json({ error: "this blog does not exist" });
    }

    //toString() => it parsed fetched id from database into string
    if (user.id.toString() === toUpdateBlog.user.toString()) {
      // const updatedBlogInDB = await Blog.findByIdAndUpdate(
      //   toUpdateBlog._id,
      //   req.body,
      //   {
      //     new: true,
      //   }
      // );

      const newBlog = {
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes,
      };

      const updatedBlogInDB = await Blog.findByIdAndUpdate(
        toUpdateBlog._id,
        newBlog,
        {
          new: true,
        }
      );

      res.status(200).json(updatedBlogInDB);
    } else {
      if (req.body.title || req.body.author || req.body.url) {
        res.status(400).json({ message: "not authorized user to update" });
      } else {
        const onlyLikeUpdate = await Blog.findByIdAndUpdate(
          toUpdateBlog._id,
          { likes: req.body.likes },
          { new: true }
        );
        res.status(200).json(onlyLikeUpdate);
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
