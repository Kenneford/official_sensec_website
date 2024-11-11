import "./searchForm.scss";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
import PropType from "prop-types";
import {
  CustomSearchField,
  CustomTextField,
} from "../../muiStyling/muiStyling";
import { useState } from "react";

export default function PublicSearchForm({ handleEscapeKey }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  // const dispatch = useDispatch();
  const handleSearch = (e) => {
    e.preventDefault();
    // dispatch(studentSearch({ student_name: value }));
  };

  return (
    <Box position={"relative"} className="searchBar" width={"100%"}>
      <form className="searchForm" onSubmit={handleSearch}>
        <CustomSearchField
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ marginRight: ".5rem" }}>
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end" sx={{ marginRight: ".5rem" }}>
                  <Box
                    component={"button"}
                    bgcolor={"transparent"}
                    border={"1px solid #696969"}
                    p={".1rem .5rem"}
                    borderRadius={".3rem"}
                    onClick={handleEscapeKey}
                    sx={{ cursor: "pointer" }}
                  >
                    esc
                  </Box>
                </InputAdornment>
              ),
            },
          }}
        />
      </form>
      {/* {results?.length > 0 && (
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
            {results}
          </Typography>
        </Box>
      )} */}
    </Box>
  );
}
PublicSearchForm.propTypes = {
  value: PropType.string,
  onChange: PropType.func,
  handleEscapeKey: PropType.func,
  placeholder: PropType.string,
};
