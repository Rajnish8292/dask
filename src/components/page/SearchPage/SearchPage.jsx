"use client";
import Result from "@/components/Result/Result";
import ResultSuspense from "@/components/ResultSuspense/ResultSuspense";
import ServerError from "@/components/ServerError/ServerError";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function SearchPage({ example }) {
  let [isSearching, setIsSearching] = useState(false);
  let [status, setStatus] = useState(200);
  let [result, setResult] = useState({});
  let [noOfFacets, setNoOfFacets] = useState();
  let [query, setQuery] = useState("");
  let inputRef = useRef();
  let btnRef = useRef();

  let searchRequest = async ({ query }) => {
    if (query.length == 0) return;
    setIsSearching(true);
    try {
      let request = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
      });
      let result = await request.json();
      setStatus(200);
      setResult(result);
      setNoOfFacets(
        result.facets.companies.length +
          result.facets.topics.length +
          result.facets.difficulty.length
      );
      console.log({ result });
    } catch (error) {
      setStatus(500);
    }

    setIsSearching(false);
  };

  return (
    <>
      <div className="search_box_container">
        <div className="search_wrapper">
          <input
            ref={inputRef}
            placeholder="Search the way you like :)"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <div
            ref={btnRef}
            className="send_button"
            onClick={() => {
              searchRequest({
                query: query,
              });
            }}
          >
            {/* <IoSend style={{ marginLeft: "5px" }} /> */}
            <CiSearch />
          </div>
        </div>
        {!isSearching && status == 200 && "result" in result && (
          <div
            className="facet_wrapper"
            style={{
              display: `${
                !isSearching && status == 200 && "result" in result
                  ? "block"
                  : "none"
              }`,
            }}
          >
            <h1>Filters ({noOfFacets})</h1>
            <div className="facets_container">
              {result.facets.difficulty.map((d, index) => {
                return (
                  <div key={index} className={`facet ${d}`}>
                    {d}
                  </div>
                );
              })}

              {result.facets.companies.map((d, index) => {
                return (
                  <div key={index} className={`facet pink`}>
                    {d}
                  </div>
                );
              })}
              {result.facets.topics.map((d, index) => {
                return (
                  <div key={index} className={`facet green`}>
                    {d}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {isSearching && <ResultSuspense />}
      {!isSearching && status == 200 && "result" in result && (
        <>
          <div className="search_result">
            <div className="search_found_text">
              Search result found ({result.result.length})
            </div>
            {result.result.map((problem, index) => {
              return (
                <Result
                  title={problem.title}
                  difficulty={problem.difficulty}
                  companies={problem.companies}
                  topics={problem.topics}
                  key={index}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
