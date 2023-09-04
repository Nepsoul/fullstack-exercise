const dummy = (blogs) => {
  let returnVal = 1;
  return returnVal;
};

const totalLikes = (blog) => {
  return blog.reduce((acc, cur) => acc + cur.likes, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
