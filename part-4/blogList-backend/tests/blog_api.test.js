const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

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

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  const returnBlog = response.body;
  returnBlog.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
});

test.only("creating a new blog post", async () => {
  const newBlog = {
    title: "test for creating a new blog post",
    author: "tester",
    url: "http://test.com",
    likes: 35,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length + 1);
});
afterAll(async () => {
  await mongoose.connection.close();
});
