import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import ProblemDetailOverlay from "../../../components/ui/ProblemDetailOverlay/ProblemDetailOverlay";

Object.defineProperty(window, "open", {
  value: jest.fn(),
});
describe("ProblemDetailOverlay", () => {
  it("should render ProblemDetailOverlay component", () => {
    render(
      <ProblemDetailOverlay
        title={"title"}
        topics={["topic1", "topic2"]}
        companies={["company1", "company2"]}
        difficulty={"Easy"}
        isBookmarked={false}
        closeOverlay={() => {}}
      />
    );

    const titleElement = screen.getByText("title");
    expect(titleElement).toBeInTheDocument();
    const topic1Element = screen.getByText("topic1");
    expect(topic1Element).toBeInTheDocument();
    const topic2Element = screen.getByText("topic2");
    expect(topic2Element).toBeInTheDocument();
    const company1Element = screen.getByText("company1");
    expect(company1Element).toBeInTheDocument();
    const company2Element = screen.getByText("company2");
    expect(company2Element).toBeInTheDocument();
    const solveButton = screen.getByText("Solve this problem");
    expect(solveButton).toBeInTheDocument();

    fireEvent.click(solveButton);
    expect(window.open).toBeDefined();
    expect(window.open).toHaveBeenCalledWith(
      "https://leetcode.com/problems/title",
      "_blank"
    );
  });
});
