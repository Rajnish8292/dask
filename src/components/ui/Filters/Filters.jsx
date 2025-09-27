import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Filters.css";

export default function Filters({ facets }) {
  const filterContRef = useRef();

  useEffect(() => {
    if (!filterContRef?.current || !facets?.length) return;

    gsap.set(filterContRef.current.children, {
      scale: 0.9,
      opacity: 0,
      y: 30,
    });

    gsap.to(filterContRef.current.children, {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 0.09,
      stagger: {
        amount: 0.2,
      },
    });
  }, [filterContRef?.current]);
  return (
    <div className="filters_container">
      <div className="filter_title">Applied Filter</div>
      <div className="filter_wrapper" ref={filterContRef}>
        {facets?.length &&
          facets.map((facet, index) => {
            return (
              <div className="filter" key={facet}>
                {facet}
              </div>
            );
          })}
      </div>
      {/* <div className="slide_button_container">1</div> */}
    </div>
  );
}
