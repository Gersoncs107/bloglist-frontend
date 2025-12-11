// src/components/Blog.test.js
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

const mockUpdateBlog = jest.fn();
const mockDeleteBlog = jest.fn();

describe("<Blog />", () => {
  let container;

  const blog = {
    title: "Test Blog Title",  
    author: "Test Author",      
    url: "http://testblog.com",
    likes: 5,
    user: {
      username: "testuser",
      name: "Test User"
    }
  };

  const currentUser = {
    username: "testuser",
    name: "Test User"
  };

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
        user={currentUser}
      />
    ).container;
  });

  test("renders blog title and author, but not url or likes by default", () => {
    // Use { exact: false } to match substrings (robust for composed text)
    const titleElement = screen.getByText(blog.title, { exact: false });
    expect(titleElement).toBeVisible();

    const authorElement = screen.getByText(blog.author, { exact: false });
    expect(authorElement).toBeVisible();

    const urlDiv = screen.queryByText(blog.url);
    expect(urlDiv).toBeNull();

    const likesDiv = screen.queryByText(/likes 5/);
    expect(likesDiv).toBeNull();
  });

  test('url and likes are shown when view button is clicked', async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText('view');
    await user.click(viewButton);

    expect(screen.getByText(blog.url, { exact: false })).toBeVisible();
    expect(screen.getByText(/likes 5/, { exact: false })).toBeVisible();
  })

  test('clicking the like button twice calls event handler twice', async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText('view');
    await user.click(viewButton);
    const likeButton = screen.getByText('like');

    await user.click(likeButton);
    await user.click(likeButton);
    expect(mockUpdateBlog.mock.calls).toHaveLength(2);
  });
});