"use client";
import Filters from "@/components/ui/Filters/Filters";
import RecentSearch from "@/components/ui/RecentSearch/RecentSearch";
import Result from "@/components/ui/Result/Result";
import ResultAction from "@/components/ui/ResultAction/ResultAction";
import ResultSuspense from "@/components/ui/ResultSuspense/ResultSuspense";
import SearchBox from "@/components/ui/SearchBox/SearchBox";
import ServerError from "@/components/ui/ServerError/ServerError";
import StartExample from "@/components/ui/StartExample/StartExample";
import { useCallback, useEffect, useState } from "react";

export default function SearchPage({}) {
  const [isSearching, setIsSearching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [result, setResult] = useState(null);
  const [isRecentSearch, setIsRecentSearch] = useState(false);

  const [pasteTextFn, setPasteTextFn] = useState(() => () => {});

  const startWithExampleHandler = useCallback(({ pasteText }) => {
    setPasteTextFn(() => pasteText);
  }, []);

  const shareSearchRequestData = useCallback(({ loading, error, result }) => {
    setIsSearching(loading);
    setIsError(error);
    setResult(result);
  }, []);

  const openStartWithExample = useCallback(() => {
    setIsSearching(false);
    setIsError(false);
    setResult(null);
  }, []);

  useEffect(() => {
    const recentSearchData = JSON.parse(
      localStorage.getItem("recent_searches")
    );

    if (recentSearchData && recentSearchData.length > 0) {
      setIsRecentSearch(true);
    } else {
      setIsRecentSearch(false);
    }
  }, []);

  return (
    <>
      <SearchBox
        startWithExampleHandler={startWithExampleHandler}
        shareSearchRequestData={shareSearchRequestData}
      />
      {isRecentSearch && <RecentSearch pasteTextFn={pasteTextFn} />}
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
          <Result
            resultProblems={result.result}
            openStartWithExample={openStartWithExample}
          />
          <Filters
            facets={[
              ...result.facets.difficulty,
              ...result.facets.companies,
              ...result.facets.topics,
            ]}
          />
        </>
      )}
    </>
  );
}
