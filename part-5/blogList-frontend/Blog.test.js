/* eslint-disable indent */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./src/components/Blog";

test("renders blog to show only title and author", () => {
  const dummyBlog = {
    title: "testing blog component",
    author: "tester",
    url: "test.com",
    likes: 3,
  };

  const { container } = render(<Blog blog={dummyBlog} />);
  const div = container.querySelector(".blog");

  expect(div).toHaveTextContent("testing blog component");
  expect(div).toHaveTextContent("tester");
  expect(div).not.toHaveTextContent("test.com");
  expect(div).not.toHaveTextContent(3);
});
