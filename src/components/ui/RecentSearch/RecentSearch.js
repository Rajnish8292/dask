import "./RecentSearch.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
export default function RecentSearch() {
  const [isVisible, setIsVisible] = useState(true);
  const [recentSearches, setRecentSearches] = useState([]);
  useEffect(() => {
    const recentSearches = JSON.parse(localStorage.getItem("recent_searches"));
    if (!recentSearches || recentSearches.length == 0) {
    } else {
      setRecentSearches(recentSearches);
    }
  }, []);
  return (
    <div className="recent_search_wrapper">
      <div className="recent_search_action">
        <div>Recent Searches</div>
        <div
          className="recent_search_toggle"
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          <IoIosArrowDown />
        </div>
      </div>
      <div
        className="recent_searches"
        style={{ transition: "0.25s", height: isVisible ? "auto" : 0 }}
      >
        {recentSearches.length > 0 &&
          recentSearches.map((searchItem, index) => {
            return (
              <div className="recent_search_item" key={index}>
                {searchItem}
                <div
                  className="delete_search"
                  onClick={() => {
                    const recentSearchData = JSON.parse(
                      localStorage.getItem("recent_searches")
                    );
                    const updatedData = recentSearchData.filter(
                      (item) => item !== searchItem
                    );

                    localStorage.setItem(
                      "recent_searches",
                      JSON.stringify(updatedData)
                    );
                    setRecentSearches(updatedData);
                  }}
                >
                  <IoCloseSharp />
                </div>
              </div>
            );
          })}
        {/* //   <div className="recent_search_item">
      //     array and dynamic programming based problems that asked in microsoft{" "}
      //     <div className="delete_search">
      //       <IoCloseSharp />
      //     </div>
      //   </div>
      //   <div className="recent_search_item">
      //     search for medium level dynamic programming problems
      //     <div className="delete_search">
      //       <IoCloseSharp />
      //     </div>
      //   </div>
      //   <div className="recent_search_item">
      //     I have an interview tomorrow at Amazon—please search for medium-level
      //     binary tree problems.
      //     <div className="delete_search">
      //       <IoCloseSharp />
      //     </div>
      //   </div> */}
      </div>
    </div>
  );
}
