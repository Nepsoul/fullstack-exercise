const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Blog testing",
    author: "bcrypt",
    url: "http://testing.com",
    likes: 24,
  },
  {
    title: "supertest",
    author: "mongoose",
    url: "http://test.com",
    likes: 40,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "willremovethissoon",
    author: "tester",
    url: "http://test.com",
    likes: 26,
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
