import "./Filters.css";

export default function Filters() {
  return (
    <div className="filters_container">
      <div className="filter_title">Applied Filter</div>
      <div className="filter_wrapper">
        <div className="filter">Array</div>
        <div className="filter">Dynamic Programming</div>
        <div className="filter">Binary Search Tree</div>
        <div className="filter">Amazon</div>
      </div>
      {/* <div className="slide_button_container">1</div> */}
    </div>
  );
}
