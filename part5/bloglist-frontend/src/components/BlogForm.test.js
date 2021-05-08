import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'KC',
    url: 'dummy_url',
    likes: 5,
  };

  fireEvent.change(title, {
    target: { value: blog.title },
  });
  fireEvent.change(author, {
    target: { value: blog.author },
  });
  fireEvent.change(url, {
    target: { value: blog.url },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe(blog.title);
  expect(createBlog.mock.calls[0][0].author).toBe(blog.author);
  expect(createBlog.mock.calls[0][0].url).toBe(blog.url);
});
