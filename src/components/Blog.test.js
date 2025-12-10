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
    // Verifica título e autor separadamente (mais robusto)
    const titleElement = screen.getByText("Test Blog Title");
    expect(titleElement).toBeVisible();

    const authorElement = screen.getByText("Test Author");
    expect(authorElement).toBeVisible();

    const urlDiv = screen.queryByText("http://testblog.com");
    expect(urlDiv).toBeNull();

    const likesDiv = screen.queryByText(/likes 5/);
    expect(likesDiv).toBeNull();
  });
});