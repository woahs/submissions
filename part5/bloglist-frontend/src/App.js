import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Logout from './components/Logout';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
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

  const Blogs = () => {
    return (
      <div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
          ))}
      </div>
    );
  };

  const createBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(returnedBlog));
    setMessage({ type: 'success', text: `a new blog ${returnedBlog.title} by ${returnedBlog.author}` });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const updateBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject);
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)));
    } catch (exception) {
      setMessage({ type: 'error', text: 'Unable to update blog' });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (exception) {
      setMessage({ type: 'error', text: 'Unable to remove blog' });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification message={message} />
        <Togglable buttonLabel='log in'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    );
  }
  return (
    <div>
      <Notification message={message} />
      <h2>blogs</h2>
      <div>
        {user.name} logged in <Logout setUser={setUser} />
      </div>
      <br />
      <Togglable buttonLabel='new note'>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <Blogs />
    </div>
  );
};

export default App;
