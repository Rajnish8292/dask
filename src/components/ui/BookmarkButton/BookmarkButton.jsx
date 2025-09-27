import "./BookmarkButton.css";

import { useState, useEffect } from "react";
export default function BookmarkButton({
  removeBookmarkProblem,
  addBookmarkProblem,
  isProblemExist,
  problemDetails,
}) {
  if (
    !removeBookmarkProblem ||
    !addBookmarkProblem ||
    !isProblemExist ||
    !problemDetails
  )
    return null;

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setIsBookmarked(isProblemExist(problemDetails));
  }, [isProblemExist]);

  return (
    <div
      className={
        isBookmarked ? "active_problem_action_button" : "problem_action_button"
      }
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isProblemExist(problemDetails)) {
          removeBookmarkProblem(problemDetails);
          setIsBookmarked(false);
        } else {
          addBookmarkProblem(problemDetails);
          setIsBookmarked(true);
        }
      }}
    >
      {isBookmarked ? "Bookmarked" : "Bookmark"}
    </div>
  );
}
