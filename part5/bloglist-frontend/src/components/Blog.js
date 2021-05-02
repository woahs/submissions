import React, { useState } from 'react';

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const incrementLike = () => {
    updateBlog(blog.id, { likes: blog.likes + 1 });
  };

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) removeBlog(blog.id);
  };

  return (
    <div>
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{!visible ? 'view' : 'hide'}</button>
        <div style={showWhenVisible}>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={incrementLike}>like</button>
          </div>
          <button onClick={deleteBlog}>remove</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
