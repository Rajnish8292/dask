import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookmarkButton from "../../../components/ui/BookmarkButton/BookmarkButton";

const localStorageMock = () => {
  let store = {};

  return {
    setitem: (key, value) => {
      store[key] = value.toString();
    },
    getItem: (key) => {
      return store[key] || null;
    },
    deleteItem: (key) => {
      delete store[key];
    },
  };
};

const localStorage = localStorageMock();
Object.defineProperty(window, "localStorage", {
  value: localStorage,
});

const removeBookmarkProblemMock = jest.fn((problem_details) => {
  localStorage.setitem("bookmark_problems", JSON.stringify([]));
});

const addBookmarkProblemMock = jest.fn((problem_details) => {
  const existingData = JSON.parse(localStorage.getItem("bookmark_problems"));
  let updatedData = [];
  const isProblemExistMock = jest.fn(() => false);
  if (existingData) {
    updatedData = [...existingData, problem_details];
  } else {
    updatedData = [problem_details];
  }
  localStorage.setitem("bookmark_problems", JSON.stringify(updatedData));
});

const isProblemExistMock = jest.fn(() => false);

describe("BookmarkButton", () => {
  it("should render BookmarkButton component", () => {
    render(
      <BookmarkButton
        removeBookmarkProblem={removeBookmarkProblemMock}
        addBookmarkProblem={addBookmarkProblemMock}
        isProblemExist={isProblemExistMock}
        problemDetails={{
          companies: ["Adobe", "Facebook", "Netflix"],
          difficulty: "Medium",
          title: "Longest Substring Without Repeating Characters",
          topics: ["String", "Sliding Window"],
        }}
      />
    );
    const button = screen.getByText("Bookmark");
    expect(button).toBeInTheDocument();
  });

  it("should toggle bookmark state based on isProblemExist prop", () => {
    isProblemExistMock.mockReturnValueOnce(true);
    render(
      <BookmarkButton
        removeBookmarkProblem={removeBookmarkProblemMock}
        addBookmarkProblem={addBookmarkProblemMock}
        isProblemExist={isProblemExistMock}
        problemDetails={{
          companies: ["Adobe", "Facebook", "Netflix"],
          difficulty: "Medium",
          title: "Longest Substring Without Repeating Characters",
          topics: ["String", "Sliding Window"],
        }}
      />
    );
    const button = screen.getByText("Bookmarked");
    fireEvent.click(button);
    expect(button).toHaveTextContent("Bookmark");
  });
});
