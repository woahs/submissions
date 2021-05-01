import React from 'react';

const BlogForm = ({ newTitle, setNewTitle, newAuthor, setNewAuthor, newURL, setNewURL, addBlog }) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input value={newTitle} onChange={({ target }) => setNewTitle(target.value)} />
      </div>
      <div>
        author:
        <input value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} />
      </div>
      <div>
        url: <input value={newURL} onChange={({ target }) => setNewURL(target.value)} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default BlogForm;
