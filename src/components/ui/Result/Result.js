import { AnimatePresence } from "motion/react";
import ProblemDetailOverlay from "../ProblemDetailOverlay/ProblemDetailOverlay";
import "./Result.css";

import { useCallback, useRef, useState } from "react";
import BookmarkButton from "../BookmarkButton/BookmarkButton";

export default function Result({ result }) {
  const resultContRef = useRef();
  const [overlayDeatils, setOverlayDetails] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const isProblemExist = useCallback((problemDetails) => {
    const { title } = problemDetails;
    const storageData = JSON.parse(localStorage.getItem("bookmark_problems"));
    console.log({ storageData, title });
    if (!storageData || !title) return false;
    for (let i = 0; i < storageData.length; i++) {
      if (storageData[i].title.toLowerCase() === title.toLowerCase())
        return true;
    }

    return false;
  });

  const removeBookmarkProblem = useCallback((problemDetails) => {
    const { title } = problemDetails;
    const storageData = JSON.parse(localStorage.getItem("bookmark_problems"));
    if (!storageData || !title) return;
    const updatedData = storageData.filter(
      ({ title: problemTitle }) => problemTitle !== title
    );
    localStorage.setItem("bookmark_problems", JSON.stringify(updatedData));
  });

  const addBookmarkProblem = useCallback((problemDetails) => {
    const storageData = JSON.parse(localStorage.getItem("bookmark_problems"));
    if (isProblemExist(problemDetails) || !problemDetails) return;

    let updatedData = [];
    if (storageData) {
      updatedData = [...storageData, problemDetails];
    } else {
      updatedData = [problemDetails];
    }
    localStorage.setItem("bookmark_problems", JSON.stringify(updatedData));
  });

  return (
    <>
      <div className="result_container" ref={resultContRef}>
        {result &&
          result.map((problem) => {
            return (
              <div
                className="problem"
                key={problem.title.split(" ").join("-")}
                onClick={() => {
                  setOverlayDetails({ ...problem });
                  setIsOverlayOpen(true);
                }}
              >
                <div className="problem_title">
                  {problem.title}
                  <span
                    className={[
                      "difficulty",
                      problem.difficulty.toLowerCase(),
                    ].join(" ")}
                  >
                    {problem.difficulty}
                  </span>
                </div>
                <div className="problem_actions">
                  <div className="problem_action_button">Solve</div>
                  <BookmarkButton
                    isProblemExist={isProblemExist}
                    addBookmarkProblem={addBookmarkProblem}
                    removeBookmarkProblem={removeBookmarkProblem}
                    problemDetails={problem}
                  />
                </div>
              </div>
            );
          })}
      </div>
      <AnimatePresence>
        {isOverlayOpen && (
          <ProblemDetailOverlay
            title={overlayDeatils?.title}
            topics={overlayDeatils?.topics}
            companies={overlayDeatils?.companies}
            difficulty={overlayDeatils?.difficulty}
            isBookmarked={false}
            closeOverlay={() => setIsOverlayOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
