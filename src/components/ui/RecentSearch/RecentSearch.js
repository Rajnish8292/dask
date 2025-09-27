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
        style={{ maxHeight: isVisible ? "500px" : "0px" }}
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
      </div>
    </div>
  );
}
