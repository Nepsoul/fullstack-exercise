import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON); //parse json into js object
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user)); //js object converted into json, due storage are DOMstrings
      blogService.setToken(user.token);
      setUser(user);
      setUserName("");
      setPassword("");
    } catch (exception) {
      console.log("wrong credential");
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username{" "}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div>
        password{" "}
        <input
          type="text"
          value={password}
          password="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const logOut = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const handleBlogCreate = async (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    const createdBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(createdBlog));
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const blogForm = () => (
    <form onSubmit={handleBlogCreate}>
      <div>
        title:{" "}
        <input
          type="text"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        author:{" "}
        <input
          type="text"
          name="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
      </div>
      <div>
        url:{" "}
        <input
          type="text"
          name="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>
    </form>
  );

  return (
    <div>
      <h2>blogs</h2>
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
      ) : (
        <div>
          {user.name} logged in <button onClick={logOut}>Logout</button>
          <h2>create new</h2>
          {blogForm()}
          <button onClick={handleBlogCreate}>create</button>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
