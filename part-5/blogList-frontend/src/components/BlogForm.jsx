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
          id="title"
            type="text"
            name="title"
            value={title}
            placeholder="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{" "}
          <input
          id="author"
            type="text"
            name="author"
            value={author}
            placeholder="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{" "}
          <input
          id="url"
            type="text"
            name="url"
            value={url}
            placeholder="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button id="create" type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
