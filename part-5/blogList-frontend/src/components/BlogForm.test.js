import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("test for form calls the event handler it received as props with the right details when a new blog is created", async () => {
  const mockHandler = jest.fn();

  render(<BlogForm createBlog={mockHandler} />);

  const user = userEvent.setup();
  const title = screen.getByPlaceholderText("title");
  const author = screen.getByPlaceholderText("author");
  const url = screen.getByPlaceholderText("url");

  const button = screen.getByText("create");

  await user.type(title, "blogForm test");
  await user.type(author, "tester");
  await user.type(url, "test.com");

  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0].title).toBe("blogForm test");
  expect(mockHandler.mock.calls[0][0].author).toBe("tester");
  expect(mockHandler.mock.calls[0][0].url).toBe("test.com");
});
