// src/components/Search.js
import React from "react";
import { Input } from "antd";

const { Search } = Input;

const SearchComponent = ({ searchTerm, handleSearch }) => {
  return (
    <Search
      placeholder="Tìm kiếm món ăn"
      onSearch={handleSearch}
      onChange={(e) => handleSearch(e.target.value)}
      value={searchTerm}
      allowClear
      style={{ width: "100%" }}
    />
  );
};

export default SearchComponent;
