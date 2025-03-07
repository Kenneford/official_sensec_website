import "./searchForm.scss";
import "./blogSearch.scss";
import { Box, InputAdornment, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
import PropType from "prop-types";
import {
  CustomSearchField,
  CustomTextField,
} from "../../muiStyling/muiStyling";
import { Search } from "@mui/icons-material";

export default function BlogSearchFilter({ value, onChange, placeholder }) {
  console.log(value);
  // const dispatch = useDispatch();
  const handleSearch = (e) => {
    e.preventDefault();
    // dispatch(studentSearch({ student_name: value }));
  };
  return (
    <Box position={"relative"} className="searchBar">
      <form className="searchForm" onSubmit={handleSearch}>
        <CustomSearchField
          fullWidth
          label={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          sx={{
            marginTop: 1,
          }}
          size="small"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Search sx={{ "&:hover": { cursor: "pointer" } }} />
                </InputAdornment>
              ),
            },
          }}
        />
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
BlogSearchFilter.propTypes = {
  value: PropType.string,
  onChange: PropType.func,
  placeholder: PropType.string,
};
