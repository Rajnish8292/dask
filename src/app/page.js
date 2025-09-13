"use client";
import SearchPage from "@/components/page/SearchPage/SearchPage";
import { useState } from "react";

export default function Home() {
  const [example, setExample] = useState("");

  return (
    <>
      <SearchPage example={example} />
    </>
  );
}
