import React, { useState } from "react";
import "../style/searchform.css"


const Searchform = ({ searchText }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    searchText(text);
  };

  const onChangevalue = (e) => {
    e.preventDefault();
    setText(e.target.value);
    searchText(e.target.value);
  };

  return (
      <form
        onSubmit={handleSubmit}
      >
        <input
          className="searchForm"
          type="text"
          placeholder="Search Yasmina Khadra, Victor Hugo..."
          onChange={onChangevalue}
        />
        
      </form>

  );
};

export default Searchform;
