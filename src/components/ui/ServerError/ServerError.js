import "./ServerError.css";
import React from "react";
export default function ServerError() {
  return (
    <>
      <div className="server_error">
        <h1>Oops! An error occurred.</h1>
        <div className="try_again">Try Again</div>
      </div>
    </>
  );
}
