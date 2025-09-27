import "./ProblemDetailOverlay.css";
import { motion } from "motion/react";
export default function ProblemDetailOverlay({
  title,
  topics,
  companies,
  difficulty,
  isBookmarked,
  closeOverlay,
}) {
  return (
    <>
      <motion.div className="problem_detail_overlay">
        <motion.div className="problem_detail_container">
          <div>
            <motion.div className="problem_detail_title">{title}</motion.div>
            <p>Topics : </p>
            <div className="problem_detail_topics">
              {topics.map((topic, key) => (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="topic"
                  key={topic}
                >
                  {topic}
                </motion.div>
              ))}
            </div>
            <p>Companies asked this problem : </p>
            <div className="problem_detail_companies">
              {companies.map((company, key) => (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="company"
                  key={company}
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </div>
          <div className="detail_action_container">
            <div className="detail_action_button detail_solve_button">
              Solve this problem
            </div>
            <div
              className="detail_action_button detail_close_button"
              onClick={() => {
                closeOverlay();
              }}
            >
              Close
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
