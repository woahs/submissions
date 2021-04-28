const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const blog = new Blog({ ...body, user: user._id });

  const savedBlog = await blog.save();
  user.notes = user.notes.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
  } else {
    return response.status(401).json({ error: 'token does not match creator' });
  }
  response.status(204).end();
});

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;
  const blogToUpdate = await Blog.findById(request.params.id);
  if (!blogToUpdate) response.status(404).end();
  if (blogToUpdate.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'token does not match creator' });
  }

  const newblog = { ...blogToUpdate.toJSON(), ...body };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newblog, { new: true });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
