import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

const mockUpdateBlog = jest.fn().mockImplementation((id, blogObject) => ({
  ...blogObject,
  likes: blogObject.likes
}));

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
    const titleElement = screen.getByText(blog.title, { exact: false });
    expect(titleElement).toBeVisible();

    const authorElement = screen.getByText(blog.author, { exact: false });
    expect(authorElement).toBeVisible();

    expect(screen.queryByText(blog.url)).toBeNull();
    expect(screen.queryByText(/likes 5/)).toBeNull();
  });

  test('url and likes are shown when view button is clicked', async () => {
    const user = userEvent.setup();
    await user.click(screen.getByText('view'));

    expect(screen.getByText(blog.url, { exact: false })).toBeVisible();
    expect(screen.getByText(/likes/, { exact: false })).toBeVisible();
  });

  test('like button clicked twice → updateBlog called twice', async () => {
    const user = userEvent.setup();
    
    await user.click(screen.getByText('view'));
    await user.click(screen.getByText('like'));
    await user.click(screen.getByText('like'));

    expect(mockUpdateBlog.mock.calls).toHaveLength(2);
  });
});