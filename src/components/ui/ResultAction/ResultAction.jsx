import "./ResultAction.css";
export default function ResultAction({ noOfResult }) {
  return (
    <>
      <div className="result_action_container">
        <div className="result_count">problems found ({noOfResult})</div>
        <div className="action_container">
          <div className="action_button">Start with example</div>
          <div className="action_button">Sort by difficulty</div>
        </div>
      </div>
    </>
  );
}
