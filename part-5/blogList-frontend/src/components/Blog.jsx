import { useState } from "react";

const Blog = ({ blog, handleLikes, handleRemove, authorizedUser }) => {
  const [showBlogDetail, setShowBlogDetail] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const showToggle = () => {
    setShowBlogDetail(!showBlogDetail);
  };

  return (
    <div style={blogStyle}>
      {!showBlogDetail ? (
        <div className="blog">
          {blog.title} <br /> {blog.author}
          <button className="view" onClick={showToggle}>view</button>
        </div>
      ) : (
        <div>
          {blog.title}
          <button onClick={showToggle}>hide</button>
          <div className="url">{blog.url}</div>
          <div className="likes">
            likes {blog.likes}{" "}
            <button onClick={() => handleLikes(blog)}>like</button>
          </div>
          <div>{blog.author}</div>
          <div>
            {blog.user.id === authorizedUser.id || blog.user ? (
              <button
                style={{
                  color: "brown",
                  backgroundColor: "lightpink",
                  font: " bold",
                }}
                onClick={() => {
                  handleRemove(blog);
                }}
              >
                remove
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
export default Blog;
