import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newURL, setNewURL] = useState('');

  const addBlog = async (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newURL,
    });
    setNewTitle('');
    setNewAuthor('');
    setNewURL('');
  };

  return (
    <>
      <h2>create new</h2>
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
          <button type='submit'>create</button>
        </div>
      </form>
    </>
  );
};

export default BlogForm;
