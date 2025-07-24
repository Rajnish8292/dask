"use client";
import IntroductionPage from "@/components/page/IntroductionPage/IntroductionPage";
import SearchPage from "@/components/page/SearchPage/SearchPage";
import { useState } from "react";

export default function Home() {
  const [example, setExample] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);

  let setExampleHandler = ({ example }) => {
    setExample(example);
  };
  let goToSearch = () => {
    setSearchVisible(true);
  };
  return (
    <>
      {!searchVisible && (
        <IntroductionPage
          setExampleHandler={setExampleHandler}
          goToSearch={goToSearch}
        />
      )}
      {/* <SearchPage example={example} /> */}
      {searchVisible && <SearchPage example={example} />}
    </>
  );
}
