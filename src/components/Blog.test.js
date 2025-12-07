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

})