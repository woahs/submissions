import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'KC',
    url: 'dummy_url',
    likes: 5,
  };
  const mockUpdateHandler = jest.fn();
  const mockRemoveHandler = jest.fn();

  beforeEach(() => {
    component = render(<Blog blog={blog} updateBlog={mockUpdateHandler} removeBlog={mockRemoveHandler} />);
  });

  test('renders title and author', () => {
    const div = component.container.querySelector('.blog');

    expect(div).toHaveTextContent('Component testing is done with react-testing-library');
    expect(div).toHaveTextContent('KC');
  });

  test('does not render details by default', () => {
    const div = component.container.querySelector('.togglableContent');

    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, details are displayed', () => {
    const button = component.getByText('view');
    fireEvent.click(button);

    const div = component.container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none');
  });

  test('clicking the like button twice calls event handler twice', () => {
    const button = component.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockUpdateHandler.mock.calls).toHaveLength(2);
  });
});
