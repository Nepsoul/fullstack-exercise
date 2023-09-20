const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");

const intialBlogs = [
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
  let blogObject = new Blog(intialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(intialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterAll(async () => {
  await mongoose.connection.close();
});
