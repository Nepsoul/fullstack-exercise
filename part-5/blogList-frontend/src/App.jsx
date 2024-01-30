import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState({ message: null, type: null });

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
      setMessage({
        message: `Welcome ${user.name} to the Blog app`,
        type: "success",
      });
      setTimeout(() => {
        setMessage({ message: null, type: null });
      }, 2000);
    } catch (exception) {
      setMessage({
        message: exception.response.data.error,
        type: "error",
      });
      setTimeout(() => {
        setMessage({ message: null, type: null });
      }, 2000);
    }
  };

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUserName(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        loginHanle={handleLogin}
      />
    </Togglable>
  );

  const logOut = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setMessage({
      message: `${user.name} logout from Blog app`,
      type: "success",
    });
    setTimeout(() => {
      setMessage({ message: null, type: null });
    }, 2000);
    setUser(null);
  };

  const handleBlogCreate = async (event) => {
    try {
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
      setMessage({
        message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
        type: "success",
      });
      setTimeout(() => {
        setMessage({ message: null, type: null });
      }, 2000);
    } catch (exception) {
      setMessage({ message: exception.response.data.error, type: "error" });
      setTimeout(() => {
        setMessage({ message: null, type: null });
      }, 2000);
    }
  };

  const blogForm = () => (
    <Togglable buttonLabel="new note">
      <BlogForm
        title={title}
        author={author}
        url={url}
        handleTitleChange={(event) => setTitle(event.target.value)}
        handleAuthorChange={(event) => setAuthor(event.target.value)}
        handleUrlChange={(event) => setUrl(event.target.value)}
        handleBlogCreate={handleBlogCreate}
        />
        </Togglable>
  );

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message?.message} type={message?.type} />
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
          <button type="submit" onClick={handleBlogCreate}>
            create
          </button>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
