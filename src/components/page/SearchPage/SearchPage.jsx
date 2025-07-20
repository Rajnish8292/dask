export default function SearchPage() {
  return (
    <>
      <div className="search_box_container">
        <div className="search_wrapper">
          <input placeholder="Search the way you like :)" />
          <div className="send_button">
            <IoSend style={{ marginLeft: "5px" }} />
          </div>
        </div>
        <div className="facet_wrapper">
          <h1>Facets (5)</h1>
          <div className="facets_container">
            <div className="facet green">google</div>
            <div className="facet pink">dynamic programming</div>
            <div className="facet pink">array</div>
            <div className="facet pink">graph</div>
            <div className="facet green">microsoft</div>
          </div>
        </div>
      </div>
    </>
  );
}
