const _ = require("lodash"); //import lodash/load the full build

const dummy = (blogs) => {
  let returnVal = 1;
  return returnVal;
};

const totalLikes = (blog) => {
  return blog.reduce((acc, cur) => acc + cur.likes, 0);
};

const favoriteBlog = (blog) => {
  //========> using lodash library <======
  // let maxLikes = _.maxBy(blog, "likes");
  // if (maxLikes) {
  //   return _.pick(maxLikes, ["title", "author", "likes"]);
  // } else return { title: "", author: "", likes: 0 };
  //================================

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
  //===========================

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
  // ======> using lodash library <=======
  const blogCount = _.countBy(blogs, "author");
  const maxAuthor = _.maxBy(_.keys(blogCount), (author) => blogCount[author]);
  if (maxAuthor) {
    return { author: maxAuthor, blogs: blogCount[maxAuthor] };
  } else {
    return null;
  }

  //================================
  // const blogCount = {};
  // for (const blog of blogs) {
  //   const author = blog.author;
  //   if (author in blogCount) {
  //     blogCount[author]++;
  //   } else {
  //     blogCount[author] = 1;
  //   }
  // }
  // let maxAuthor = null;
  // let maxBlog = 0;

  // for (const author in blogCount) {
  //   if (blogCount[author] > maxBlog) {
  //     maxBlog = blogCount[author];
  //     maxAuthor = author;
  //   }
  // }
  // return maxAuthor ? { author: maxAuthor, blogs: maxBlog } : null;
};

const mostLikes = (blog) => {
  // =======> using lodash library <======
  const authorLikes = _.groupBy(blog, "author");

  const authorWithMostLikes = _.maxBy(_.keys(authorLikes), (author) =>
    _.sumBy(authorLikes[author], "likes")
  );

  if (authorWithMostLikes) {
    return {
      author: authorWithMostLikes,
      likes: _.sumBy(authorLikes[authorWithMostLikes], "likes"),
    };
  } else {
    return null;
  }

  //=============================
  // const finalResult = blog.reduce(
  //   (accumulator, item) => {
  //     const authorLikes = accumulator.authorLikes || {};

  //     if (authorLikes[item.author]) {
  //       authorLikes[item.author] += item.likes;
  //     } else {
  //       authorLikes[item.author] = item.likes;
  //     }

  //     if (
  //       !accumulator.maxAuthor ||
  //       authorLikes[item.author] > authorLikes[accumulator.maxAuthor]
  //     ) {
  //       return {
  //         authorLikes,
  //         maxAuthor: item.author,
  //       };
  //     }

  //     return {
  //       authorLikes,
  //       maxAuthor: accumulator.maxAuthor,
  //     };
  //   },
  //   { authorLikes: {}, maxAuthor: null }
  // );

  // return {
  //   author: finalResult.maxAuthor,
  //   likes: finalResult.authorLikes[finalResult.maxAuthor],
  // };
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
