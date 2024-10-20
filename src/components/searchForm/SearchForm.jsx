import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";

export default function SearchForm({ value, onChange }) {
  console.log(value);
  // const dispatch = useDispatch();
  const handleSearch = (e) => {
    e.preventDefault();
    // dispatch(studentSearch({ student_name: value }));
  };
  return (
    <Box sx={{ display: { xs: "none", sm: "block" } }}>
      <form className="studentSearch" onSubmit={handleSearch}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by first or last name..."
          autoComplete="off"
          id="search"
        />
        <button type="submit">
          <SearchIcon className="searchIcon" />
        </button>
      </form>
    </Box>
  );
}
