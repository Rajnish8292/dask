import { AnimatePresence } from "motion/react";
import ProblemDetailOverlay from "../ProblemDetailOverlay/ProblemDetailOverlay";
import ResultAction from "../ResultAction/ResultAction";
import "./Result.css";

import { useCallback, useRef, useState } from "react";
import BookmarkButton from "../BookmarkButton/BookmarkButton";
import sort from "@/app/utils/sort.mjs";

import { motion } from "motion/react";

export default function Result({ resultProblems, openStartWithExample }) {
  const resultContRef = useRef();
  const [result, setResult] = useState(resultProblems);
  const [overlayDeatils, setOverlayDetails] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const isProblemExist = useCallback((problemDetails) => {
    const { title } = problemDetails;
    const storageData = JSON.parse(localStorage.getItem("bookmark_problems"));

    if (!storageData || !title) return false;
    for (let i = 0; i < storageData.length; i++) {
      if (storageData[i].title.toLowerCase() === title.toLowerCase())
        return true;
    }

    return false;
  });

  const sortByDifficulty = useCallback(() => {
    setResult((prev) => {
      return sort(prev);
    });
  }, []);

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
      <ResultAction
        noOfResult={result?.length}
        openStartWithExample={openStartWithExample}
        sortByDifficulty={sortByDifficulty}
      />
      <div className="result_container" ref={resultContRef}>
        {result &&
          result.map((problem) => {
            return (
              <motion.div
                className="problem"
                key={problem.title.split(" ").join("-")}
                onClick={() => {
                  setOverlayDetails({ ...problem });
                  setIsOverlayOpen(true);
                }}
              >
                <div className="problem_title">
                  <p style={{ textAlign: "center" }}>
                    {problem.title}{" "}
                    <span
                      className={[
                        "difficulty",
                        problem.difficulty.toLowerCase(),
                      ].join(" ")}
                    >
                      {problem.difficulty}
                    </span>
                  </p>
                </div>
                <div className="problem_actions">
                  <div
                    className="problem_action_button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (window) {
                        window.open(
                          `https://leetcode.com/problems/${problem.title
                            .toLowerCase()
                            .split(" ")
                            .join("-")}`,
                          "_blank"
                        );
                      }
                    }}
                  >
                    Solve
                  </div>
                  <BookmarkButton
                    isProblemExist={isProblemExist}
                    addBookmarkProblem={addBookmarkProblem}
                    removeBookmarkProblem={removeBookmarkProblem}
                    problemDetails={problem}
                  />
                </div>
              </motion.div>
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
