import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlogCreate = (event) => {
    event.preventDefault();
    createBlog({
      title,
      author,
      url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <form onSubmit={handleBlogCreate}>
        <div>
          title:{" "}
          <input
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{" "}
          <input
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{" "}
          <input
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
