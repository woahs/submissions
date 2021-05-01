import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newURL, setNewURL] = useState('');
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setMessage({ type: 'error', text: 'Wrong credentials' });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const Logout = () => {
    return (
      <button
        onClick={() => {
          window.localStorage.removeItem('loggedNoteappUser');
          setUser(null);
        }}
      >
        Log Out
      </button>
    );
  };

  const Blogs = () => {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL,
    };
    const returnedBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(returnedBlog));
    setMessage({ type: 'success', text: `a new blog ${newTitle} by ${newAuthor}` });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
    setNewTitle('');
    setNewAuthor('');
    setNewURL('');
  };

  if (user === null) {
    return (
      <div>
        <Notification message={message} />
        <h2>Log in to Application</h2>
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    );
  }
  return (
    <div>
      <Notification message={message} />
      <div>
        {user.name} logged in <Logout setUser={setUser} />
      </div>

      <BlogForm
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newAuthor={newAuthor}
        setNewAuthor={setNewAuthor}
        newURL={newURL}
        setNewURL={setNewURL}
        addBlog={addBlog}
      />
      <Blogs />
    </div>
  );
};

export default App;
