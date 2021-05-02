const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (favoriteBlog, nextBlog) => {
    return nextBlog.likes > favoriteBlog.likes ? nextBlog : favoriteBlog;
  };
  const result = blogs.reduce(reducer);
  return {
    title: result.title,
    author: result.author,
    likes: result.likes,
  };
};

const mostBlogs = (blogs) => {
  let authorDict = {};
  blogs.forEach((blog) => {
    if (blog.author in authorDict) {
      authorDict[blog.author] += 1;
    } else authorDict[blog.author] = 1;
  });
  let authors = Object.keys(authorDict);
  const mostBlogsAuthor = authors.reduce((a, b) => (authorDict[a] > authorDict[b] ? a : b));
  return {
    author: mostBlogsAuthor,
    blogs: authorDict[mostBlogsAuthor],
  };
};

const mostLikes = (blogs) => {
  let authorDict = {};
  blogs.forEach((blog) => {
    if (blog.author in authorDict) {
      authorDict[blog.author] += blog.likes;
    } else authorDict[blog.author] = blog.likes;
  });
  let authors = Object.keys(authorDict);
  const mostLikesAuthor = authors.reduce((a, b) => (authorDict[a] > authorDict[b] ? a : b));
  return {
    author: mostLikesAuthor,
    likes: authorDict[mostLikesAuthor],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
