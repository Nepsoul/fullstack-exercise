/* eslint-disable indent */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("test for blog component", () => {
  let container;
  let user;
  let dummyBlog;
  let dummyUser;
  let mockHandler;

  beforeEach(() => {
    dummyBlog = {
      title: "testing blog component",
      author: "tester",
      url: "test.com",
      likes: 3,
      user: {
        username: "jest-tester",
        name: "test",
        id: "1",
      },
    };

    dummyUser = {
      username: "jest-tester",
      name: "test",
      id: "1",
    };

    mockHandler = jest.fn();

    container = render(
      <Blog
        blog={dummyBlog}
        authorizedUser={dummyUser}
        handleLikes={mockHandler}
      />
    ).container;

    user = userEvent.setup();
  });

  test("renders blog to show only title and author", () => {
    const div = container.querySelector(".blog");

    expect(div).toHaveTextContent("testing blog component");
    expect(div).toHaveTextContent("tester");
    expect(div).not.toHaveTextContent("test.com");
    expect(div).not.toHaveTextContent(3);
  });

  test("diplaying blog's url and likes after clicking view button", async () => {
    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    const url = container.querySelector(".url");
    const likes = container.querySelector(".likes");

    expect(url).toHaveTextContent("test.com");
    expect(likes).toHaveTextContent(3);
  });

  test("if the like button is clicked twice, the event handler the component received as props is called twice", async () => {
    const viewButton = screen.getByText("view");
    await user.click(viewButton);
    const likeButton = screen.getByText("like");

    await user.click(likeButton);
    await user.click(likeButton);
    // screen.debug();
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
