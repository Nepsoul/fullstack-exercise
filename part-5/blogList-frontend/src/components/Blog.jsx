import { useState } from "react";

const Blog = ({ blog, handleLikes }) => {
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
        <div>
          {blog.title}
          <button onClick={showToggle}>view</button>
        </div>
      ) : (
        <div>
          {blog.title}
          <button onClick={showToggle}>hide</button>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{" "}
            <button onClick={() => handleLikes(blog)}>like</button>
          </div>
          <div>{blog.author}</div>
        </div>
      )}
    </div>
  );
};
export default Blog;
