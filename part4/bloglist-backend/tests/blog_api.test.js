const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('id is the unique identifier', async () => {
    const blogsAtStart = await helper.blogsInDb();
    blogsAtStart.forEach((blog) => expect(blog.id).toBeDefined());
  });
});

describe.only('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Title for jest unit test',
      url: 'test url',
    };

    await api
      .post('/api/blogs')
      .set(
        'Authorization',
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYwODllNWJmMDUzNjVmMDg5ZTVmODU0MiIsImlhdCI6MTYxOTY0OTk4Nn0.wMpV4sMdRGrSCOp8romM8LY_pbLwB9tFDH_59hKSpNU'
      )
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map((n) => n.title);
    expect(contents).toContain('Title for jest unit test');
  });

  test('defaults with 0 likes if not specified', async () => {
    const newBlog = {
      title: 'Title for jest unit test',
      url: 'test url',
    };

    const returnedBlog = await api
      .post('/api/blogs')
      .set(
        'Authorization',
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYwODllNWJmMDUzNjVmMDg5ZTVmODU0MiIsImlhdCI6MTYxOTY0OTk4Nn0.wMpV4sMdRGrSCOp8romM8LY_pbLwB9tFDH_59hKSpNU'
      )
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(returnedBlog.body.likes).toBe(0);
  });

  test('fails with status code 400 if missing title and url', async () => {
    const newBlog = {
      author: 'John Doe',
    };

    await api
      .post('/api/blogs')
      .set(
        'Authorization',
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYwODllNWJmMDUzNjVmMDg5ZTVmODU0MiIsImlhdCI6MTYxOTY0OTk4Nn0.wMpV4sMdRGrSCOp8romM8LY_pbLwB9tFDH_59hKSpNU'
      )
      .send(newBlog)
      .expect(400);
  });

  test('fails with status code 400 if missing url', async () => {
    const newBlog = {
      title: 'Title for jest unit test',
    };

    await api
      .post('/api/blogs')
      .set(
        'Authorization',
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYwODllNWJmMDUzNjVmMDg5ZTVmODU0MiIsImlhdCI6MTYxOTY0OTk4Nn0.wMpV4sMdRGrSCOp8romM8LY_pbLwB9tFDH_59hKSpNU'
      )
      .send(newBlog)
      .expect(400);
  });

  test('fails with status code 400 if missing title', async () => {
    const newBlog = {
      url: 'test url',
    };

    await api
      .post('/api/blogs')
      .set(
        'Authorization',
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYwODllNWJmMDUzNjVmMDg5ZTVmODU0MiIsImlhdCI6MTYxOTY0OTk4Nn0.wMpV4sMdRGrSCOp8romM8LY_pbLwB9tFDH_59hKSpNU'
      )
      .send(newBlog)
      .expect(400);
  });

  test('fails with status code 401 if token is not provided', async () => {
    const newBlog = {
      url: 'test url',
    };

    await api.post('/api/blogs').send(newBlog).expect(401);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(
        'Authorization',
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYwODllNWJmMDUzNjVmMDg5ZTVmODU0MiIsImlhdCI6MTYxOTY0OTk4Nn0.wMpV4sMdRGrSCOp8romM8LY_pbLwB9tFDH_59hKSpNU'
      )
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('updating a specific blog', () => {
  test('succeeds with updating entire blog', async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = blogsAtStart[0];
    const update = { likes: 21 };
    const changedBlog = { ...blogToView, ...update };

    const resultBlog = await api
      .put(`/api/blogs/${blogToView.id}`)
      .set(
        'Authorization',
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYwODllNWJmMDUzNjVmMDg5ZTVmODU0MiIsImlhdCI6MTYxOTY0OTk4Nn0.wMpV4sMdRGrSCOp8romM8LY_pbLwB9tFDH_59hKSpNU'
      )
      .send(changedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const processedBlogToView = JSON.parse(JSON.stringify(changedBlog));

    expect(resultBlog.body).toEqual(processedBlogToView);
  });

  test('succeeds with updating just likes', async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = blogsAtStart[0];
    const update = { likes: 21 };
    const changedBlog = { ...blogToView, ...update };

    const resultBlog = await api
      .put(`/api/blogs/${blogToView.id}`)
      .send(update)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const processedBlogToView = JSON.parse(JSON.stringify(changedBlog));

    expect(resultBlog.body).toEqual(processedBlogToView);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
