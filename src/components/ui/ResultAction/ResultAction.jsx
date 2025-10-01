import "./ResultAction.css";
import React from "react";
export default function ResultAction({
  noOfResult,
  openStartWithExample,
  sortByDifficulty,
}) {
  return (
    <>
      <div className="result_action_container">
        <div className="result_count">problems found ({noOfResult})</div>
        <div className="action_container">
          <div
            className="action_button"
            onClick={() => {
              openStartWithExample();
            }}
          >
            Start with example
          </div>
          <div
            className="action_button"
            onClick={() => {
              sortByDifficulty();
            }}
          >
            Sort by difficulty
          </div>
        </div>
      </div>
    </>
  );
}
