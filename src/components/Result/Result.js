import "./Result.css";

export default function Result({ title, difficulty, companies, topics, url }) {
  return (
    <>
      <div
        className="result"
        onClick={() => {
          window.open(
            url
              ? url
              : `https://leetcode.com/problems/${title.split(" ").join("-")}`,
            "_blank"
          );
        }}
      >
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            gap: "20px",
            whiteSpace: "nowrap",
          }}
        >
          <div className="result_title">{title}</div>
          <div className={`difficulty ${difficulty}`}>{difficulty}</div>
        </div>
        <div className="topics_wrapper">
          {" "}
          {topics?.map((topic, index) => (
            <span key={index} className="topic">
              {topic}
            </span>
          ))}
        </div>
        <div className="companies_wrapper">
          {" "}
          {companies?.map((company, index) => (
            <span key={index} className="company">
              {company}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
