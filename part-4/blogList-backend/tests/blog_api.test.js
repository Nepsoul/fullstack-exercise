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

//token-base testing
describe("test of blog api implementing token-authentication", () => {
  let token;
  beforeEach(async () => {
    const newUser = {
      username: "token",
      name: "api-tester",
      password: "token",
    };

    await api.post("/api/users").send(newUser);
    let result = await api.post("/api/login").send(newUser);

    token = {
      authorization: `Bearer ${result.body.token}`,
    };
  });
  //npm test -- -t 'all blogs are return' => from commandline to run only test
  //test for get api
  test("all blogs are return", async () => {
    const response = await api.get("/api/blogs");
    const result = await helper.blogsInDb();
    expect(response.body).toHaveLength(result.length);
  });

  test("get a specific blog within the returned blog", async () => {
    const response = await api.get("/api/blogs");
    const blog = response.body.map((r) => r.title);
    expect(blog).toContain("Blog testing");
  });

  test("verifying blog post by unique id by database _id", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });

  //test for post api
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
      .set(token)
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
      .set(token)
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
    await api.post("/api/blogs").send(newBlog).set(token).expect(400);
  });

  //test for delete api
  test("test for deleting a single blog post only by authorized user", async () => {
    const newBlog = {
      title: "authorized user only can delete post",
      author: "authorized user",
      url: "http://testing.com",
      likes: 40,
    };
    await api
      .post(`/api/blogs`)
      .send(newBlog)
      .set(token)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const response = await helper.blogsInDb();
    const blogToDelete = response[2];
    await api.delete(`/api/blogs/${blogToDelete.id}`).set(token).expect(204);

    const finalResponse = await helper.blogsInDb();
    expect(finalResponse).toHaveLength(response.length - 1);
    const remainBlog = finalResponse.map((data) => data.author);
    expect(remainBlog).not.toContain(blogToDelete.author);
  });

  //test for put api
  test("test for updating number of likes for a blog post", async () => {
    const newBlog = {
      title: "like test",
      author: "tester",
      url: "http://test.com",
      likes: 5,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set(token)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await helper.blogsInDb();

    const updatedLike = {
      likes: 50,
    };

    await api
      .put(`/api/blogs/${response[2].id}`)
      .send(updatedLike)
      .set(token)
      .expect(200);
    const updatedLikedBlog = await helper.blogsInDb();
    expect(updatedLikedBlog[2].likes).toBe(50);
  });

  //testing of token
  test("blog could not be created, if token is not provided", async () => {
    const newBlog = {
      title: "test fail, if token not provided",
      author: "token",
      url: "token.com",
      likes: 3,
    };
    await api.post("/api/blogs").send(newBlog).expect(401);
  });

  test("test fail, if invalid token provided", async () => {
    const newBlog = {
      title: "test fail, if invalid token provided",
      author: "token",
      url: "token.com",
      likes: 3,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .set({ authorization: `Bearer wrong-token` })
      .expect(401);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
