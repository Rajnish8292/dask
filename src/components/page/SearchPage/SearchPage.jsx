"use client";
import Filters from "@/components/ui/Filters/Filters";
import RecentSearch from "@/components/ui/RecentSearch/RecentSearch";
import Result from "@/components/ui/Result/Result";
import ResultAction from "@/components/ui/ResultAction/ResultAction";
import ResultSuspense from "@/components/ui/ResultSuspense/ResultSuspense";
import SearchBox from "@/components/ui/SearchBox/SearchBox";
import ServerError from "@/components/ui/ServerError/ServerError";
import StartExample from "@/components/ui/StartExample/StartExample";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function SearchPage({ example }) {
  const [isSearching, setIsSearching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [result, setResult] = useState(null);

  const [pasteTextFn, setPasteTextFn] = useState(() => () => {});

  const startWithExampleHandler = ({ pasteText }) => {
    setPasteTextFn(() => pasteText);
  };

  const shareSearchRequestData = ({ loading, error, result }) => {
    setIsSearching(loading);
    setIsError(error);
    setResult(result);
  };

  // const searchRequest = async ({ query }) => {
  //   if (query.length == 0) return;
  //   setIsSearching(true);
  //   try {
  //     let request = await fetch("/api/search", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ query: query }),
  //     });
  //     let result = await request.json();
  //     setStatus(200);
  //     setResult(result);
  //     console.log({ result });
  //     setNoOfFacets(
  //       result.facets.companies.length +
  //         result.facets.topics.length +
  //         result.facets.difficulty.length
  //     );
  //   } catch (error) {
  //     setStatus(500);
  //   }

  //   setIsSearching(false);
  // };

  return (
    <>
      <SearchBox
        startWithExampleHandler={startWithExampleHandler}
        shareSearchRequestData={shareSearchRequestData}
      />
      {/* <ResultAction noOfResult={50} />
      <Result
        result={[
          {
            title: "Two Sum",
            difficulty: "Easy",
            companies: ["Amazon", "Microsoft", "Google"],
            topics: ["Array", "Hash Table"],
          },
          {
            title: "Longest Substring Without Repeating Characters",
            difficulty: "Medium",
            companies: ["Adobe", "Facebook", "Netflix"],
            topics: ["String", "Sliding Window"],
          },
          {
            title: "Merge k Sorted Lists",
            difficulty: "Hard",
            companies: ["Amazon", "Uber", "LinkedIn"],
            topics: ["Linked List", "Heap", "Divide and Conquer"],
          },
          {
            title: "Binary Tree Level Order Traversal",
            difficulty: "Medium",
            companies: ["Google", "Apple", "Microsoft"],
            topics: ["Tree", "Breadth-First Search"],
          },
          {
            title: "Valid Parentheses",
            difficulty: "Easy",
            companies: ["Amazon", "Facebook"],
            topics: ["String", "Stack"],
          },
        ]}
      /> */}

      <RecentSearch />
      {!isSearching &&
        !isError &&
        !result &&
        typeof pasteTextFn == "function" && (
          <StartExample pasteTextFn={pasteTextFn} />
        )}
      {!isSearching && isError && !result && <ServerError />}
      {isSearching && !isError && !result && <ResultSuspense />}
      {!isSearching && !isError && result && (
        <>
          <ResultAction noOfResult={result.result.length} />
          <Result result={result.result} />
          <Filters
            facets={[
              ...result.facets.difficulty,
              ...result.facets.companies,
              ...result.facets.topics,
            ]}
          />
        </>
      )}
      {/* <ServerError /> */}
      {/* {isSearching && <ResultSuspense />}
      {status != 200 && <ServerError />} */}
      {/* {!isSearching && status == 200 && "result" in result && (
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
      )} */}
    </>
  );
}
