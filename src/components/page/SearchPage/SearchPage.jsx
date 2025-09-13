"use client";
import Filters from "@/components/ui/Filters/Filters";
import RecentSearch from "@/components/ui/RecentSearch/RecentSearch";
import Result from "@/components/ui/Result/Result";
import ResultSuspense from "@/components/ui/ResultSuspense/ResultSuspense";
import SearchBox from "@/components/ui/SearchBox/SearchBox";
import ServerError from "@/components/ui/ServerError/ServerError";
import StartExample from "@/components/ui/StartExample/StartExample";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function SearchPage({ example }) {
  const [isSearching, setIsSearching] = useState(false);
  const [status, setStatus] = useState(200);
  const [result, setResult] = useState({});
  const [noOfFacets, setNoOfFacets] = useState();
  const [query, setQuery] = useState("");

  const [pasteTextFn, setPasteTextFn] = useState(() => () => {});

  const startWithExampleHandler = ({ pasteText }) => {
    console.log({ pasteText });
    setPasteTextFn(() => pasteText);
  };

  const searchRequest = async ({ query }) => {
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
      console.log({ result });
      setNoOfFacets(
        result.facets.companies.length +
          result.facets.topics.length +
          result.facets.difficulty.length
      );
    } catch (error) {
      setStatus(500);
    }

    setIsSearching(false);
  };

  return (
    <>
      {/* <div className="search_box_container">
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
      </div> */}
      <SearchBox startWithExampleHandler={startWithExampleHandler} />
      {/* <RecentSearch /> */}
      <Filters />
      {typeof pasteTextFn == "function" && (
        <StartExample pasteTextFn={pasteTextFn} />
      )}
      {/* <ServerError /> */}
      {isSearching && <ResultSuspense />}
      {status != 200 && <ServerError />}
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
