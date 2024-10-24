import "./searchForm.scss";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
import PropType from "prop-types";

export default function SearchForm({ value, onChange, placeholder }) {
  console.log(value);
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
      {value?.length > 0 && (
        <Box
          position={"absolute"}
          bgcolor={"#fff"}
          sx={{
            width: "100%",
          }}
          maxHeight={400}
          zIndex={2}
          className="searchList"
        >
          <Typography variant="h6" component={"p"}>
            {value}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
SearchForm.propTypes = {
  value: PropType.string,
  onChange: PropType.func,
  placeholder: PropType.string,
};
