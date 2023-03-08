import React from "react";
import "./style.css";

function Search({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event.target.elements.filter.value);
  };

  return (
    <div className="searchiv">
      <form onSubmit={handleSubmit} className="search">
        <input id="filter" />
        <button className="searchs">Search</button>
      </form>
    </div>
  );
}

export default Search;
