import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import StartExample from "../../../components/ui/StartExample/StartExample";

describe("StartExample", () => {
  it("should render StartExample component", () => {
    render(<StartExample pasteTextFn={() => {}} />);
    const exampleElement = screen.getByText("START WITH AN EXAMPLE");
    expect(exampleElement).toBeInTheDocument();
    const example1 = screen.getByText(
      "array and dynamic programming based problems that asked in microsoft"
    );
    expect(example1).toBeInTheDocument();
    const example2 = screen.getByText(
      "search for medium level dynamic programming problems"
    );
    expect(example2).toBeInTheDocument();
    const example3 = screen.getByText(
      "I have an interview tomorrow at Amazon—please search for medium-level binary tree problems."
    );
    expect(example3).toBeInTheDocument();
  });
  it("should call pasteTextFn when example is clicked", () => {
    const pasteTextFnMock = jest.fn();
    render(<StartExample pasteTextFn={pasteTextFnMock} />);
    const example1 = screen.getByText(
      "search for medium level dynamic programming problems"
    );
    fireEvent.click(example1);
    expect(pasteTextFnMock).toHaveBeenCalledWith(
      "search for medium level dynamic programming problems"
    );
  });
});
