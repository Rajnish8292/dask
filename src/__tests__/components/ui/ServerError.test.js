import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import ServerError from "../../../components/ui/ServerError/ServerError";

describe("ServerError", () => {
  it("should render ServerError component", () => {
    render(<ServerError retryFn={() => {}} />);
    const errorElement = screen.getByText("Oops! An error occurred.");
    expect(errorElement).toBeInTheDocument();
    const retryButton = screen.getByText("Try Again");
    expect(retryButton).toBeInTheDocument();
  });
});
