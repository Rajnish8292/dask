import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Result from "../../../components/ui/Result/Result";

describe("Result", () => {
  it("should render Result component", () => {
    render(
      <Result
        resultProblems={[
          {
            title: "title1",
            topics: ["topic1", "topic2"],
            difficulty: "medium",
            companies: ["company1", "company2"],
          },
        ]}
        openStartWithExample={() => () => {}}
      />
    );

    const titleElement = screen.getByText("title1");
    expect(titleElement).toBeInTheDocument();
  });
});
