const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  // let blogObject = new Blog(helper.initialBlogs[0]);
  // await blogObject.save();
  // blogObject = new Blog(helper.initialBlogs[1]);
  // await blogObject.save();
  //================================
  // helper.initialBlogs.forEach(async (blog) => {
  //   let blogObject = new Blog(blog);
  //   await blogObject.save();
  //   console.log("saved");
  // });
  // console.log("done");
  //========================================
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

//integration testing

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

test("creating a new blog post", async () => {
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
  const response = await helper.blogsInDb();
  expect(response).toHaveLength(helper.initialBlogs.length + 1);
  const author = response.map((blog) => blog.author);
  expect(author).toContain("tester");
});

test("test for like property is missing from the request, return default value 0", async () => {
  const newBlog = {
    title: "test for missing like property",
    author: "tester",
    url: "http://test.com",
  };
  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  expect(response.body.likes).toBe(0);
  //   await api
  //     .post("/api/blogs")
  //     .send(newBlog)
  //     .expect(201)
  //     .expect("Content-Type", /application\/json/);
  //   const response = await api.get("/api/blogs");
  //   const missLike = response.body.map((data) => data.likes);
  //   expect(missLike[2]).toBe(0);
});

test("throw status code 400 bad request, if title or url property missing", async () => {
  const newBlog = {
    author: "tester",
    likes: 44,
  };
  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("test for deleting a single blog post", async () => {
  const response = await helper.blogsInDb();
  const blogToDelete = response[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const finalResponse = await helper.blogsInDb();
  expect(finalResponse).toHaveLength(helper.initialBlogs.length - 1);
  const remainBlog = finalResponse.map((data) => data.author);
  expect(remainBlog).not.toContain(blogToDelete.author);
});

test("test for updating number of likes for a blog post", async () => {
  const toUpdateBlog = await helper.blogsInDb();

  const updatedLike = {
    likes: 50,
  };

  await api
    .put(`/api/blogs/${toUpdateBlog[0].id}`)
    .send(updatedLike)
    .expect(200);
  const updatedLikedBlog = await helper.blogsInDb();
  expect(updatedLikedBlog[0].likes).toBe(50);
});

afterAll(async () => {
  await mongoose.connection.close();
});
