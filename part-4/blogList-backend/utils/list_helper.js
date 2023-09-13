const dummy = (blogs) => {
  let returnVal = 1;
  return returnVal;
};

const totalLikes = (blog) => {
  return blog.reduce((acc, cur) => acc + cur.likes, 0);
};

const favoriteBlog = (blog) => {
  let returnBlog = blog.reduce(
    (acc, item) => {
      if (acc.likes < item.likes) {
        return { title: item.title, author: item.author, likes: item.likes };
      } else {
        return acc;
      }
    },
    { likes: 0 }
  );
  return returnBlog;

  //   let topLikes = 0;
  //   let topBlog = {};
  //   for (let i = 0; i < blog.length; i++) {
  //     if (blog[i].likes > topLikes) {
  //       topLikes = blog[i].likes;
  //       topBlog = blog[i];
  //     }
  //   }

  //   return { title: topBlog.title, author: topBlog.author, likes: topBlog.likes };
};

const mostBlogs = (blogs) => {
  const blogCount = {};
  for (const blog of blogs) {
    const author = blog.author;
    if (author in blogCount) {
      blogCount[author]++;
    } else {
      blogCount[author] = 1;
    }
  }
  let maxAuthor = null;
  let maxBlog = 0;

  for (const author in blogCount) {
    if (blogCount[author] > maxBlog) {
      maxBlog = blogCount[author];
      maxAuthor = author;
    }
  }
  return maxAuthor ? { author: maxAuthor, blogs: maxBlog } : null;
};
// debugger;
// console.log(mostBlogs(blogs));
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
