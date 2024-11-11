import "./searchForm.scss";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
import PropType from "prop-types";

export default function SearchFilter({ value, onChange, placeholder }) {
  // const dispatch = useDispatch();
  const handleSearch = (e) => {
    e.preventDefault();
    // dispatch(studentSearch({ student_name: value }));
  };
  return (
    <Box position={"relative"} className="searchBar">
      <form className="searchForm" onSubmit={handleSearch}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
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
SearchFilter.propTypes = {
  value: PropType.string,
  onChange: PropType.func,
  placeholder: PropType.string,
};
