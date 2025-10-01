import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import ResultAction from "../../../components/ui/ResultAction/ResultAction";

describe("ResultAction", () => {
  it("should render ResultAction component", () => {
    render(
      <ResultAction
        noOfResult={1}
        openStartWithExample={() => () => {}}
        sortByDifficulty={() => () => {}}
      />
    );
    const countElement = screen.getByText("problems found (1)");
    expect(countElement).toBeInTheDocument();
    const sortButton = screen.getByText("Sort by difficulty");
    expect(sortButton).toBeInTheDocument();
    const exampleButton = screen.getByText("Start with example");
    expect(exampleButton).toBeInTheDocument();
  });
});
