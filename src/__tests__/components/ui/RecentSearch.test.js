import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import RecentSearch from "../../../components/ui/RecentSearch/RecentSearch";
import { waitFor } from "@testing-library/react";
const localStorageMock = () => {
  let store = { recent_searches: '["test1", "test2"]' };
  return {
    setItem: (key, value) => {
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

describe("RecentSearch", () => {
  it("should render RecentSearch component", () => {
    render(<RecentSearch pasteTextFn={() => {}} />);
    const recentSearchElement = screen.getByText("Recent Searches");
    expect(recentSearchElement).toBeInTheDocument();
    const searchItem1 = screen.getByText("test1");
    expect(searchItem1).toBeInTheDocument();
    const searchItem2 = screen.getByText("test2");
    expect(searchItem2).toBeInTheDocument();
  });

  it("should remove recent search item", async () => {
    const { container } = render(<RecentSearch pasteTextFn={() => {}} />);
    const deleteButtons = container.getElementsByClassName("delete_search");
    expect(deleteButtons.length).toBe(2);
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      const searchItem1 = screen.queryByText("test1");
      expect(searchItem1).not.toBeInTheDocument();
    });

    const searchItem2 = screen.getByText("test2");
    expect(searchItem2).toBeInTheDocument();
  });
});
