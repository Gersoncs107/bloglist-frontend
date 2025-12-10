// src/components/Blog.test.js
import '@testing-library/jest-dom'
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
});