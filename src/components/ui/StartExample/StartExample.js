import React from "react";
import "./StartExample.css";

export default function StartExample({ pasteTextFn }) {
  return (
    <div className="example_container">
      <div>START WITH AN EXAMPLE</div>

      <div className="example_wrapper">
        <div
          className="example"
          onClick={() => {
            pasteTextFn(
              "array and dynamic programming based problems that asked in microsoft"
            );
          }}
        >
          array and dynamic programming based problems that asked in microsoft
        </div>
        <div
          className="example"
          onClick={() => {
            pasteTextFn("search for medium level dynamic programming problems");
          }}
        >
          search for medium level dynamic programming problems
        </div>
        <div
          className="example"
          onClick={() => {
            pasteTextFn(
              "I have an interview tomorrow at Amazon—please search for medium-level binary tree problems."
            );
          }}
        >
          I have an interview tomorrow at Amazon—please search for medium-level
          binary tree problems.
        </div>
      </div>
    </div>
  );
}
