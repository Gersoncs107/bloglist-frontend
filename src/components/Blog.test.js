import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

const mockUpdateBlog = jest.fn();
const mockDeleteBlog = jest.fn();

describe("<Blog />", () => {
    let container

    const blog = {
        tittle: "Test Blog Title",
        authir: "Test Author",
        url: "http://testblog.com",
        likes: 5,
        user: {
            username: "testuser",
            name: "Test User"
        }
    }

    const currentUser = {
        username: "testuser",
        name: "Test User"
    }

    beforeEach(() => {
        container = render(
            <Blog
                blog={blog}
                updateBlog={mockUpdateBlog}
                deleteBlog={mockDeleteBlog}
                user={currentUser}
            />
        ).container
    })

    test("renders blog title and author, but not url or likes by default", () => {
        const titleAuthorDiv = screen.getByText("Test Blog Title — Test Author")
        expect(titleAuthorDiv).toBeInTheDocument()

        const urlDiv = screen.queryByText("http://testblog.com")
        expect(urlDiv).not.toBeInTheDocument()

        const likesDiv = screen.queryByText("likes 5")
        expect(likesDiv).not.toBeInTheDocument()
    })

})