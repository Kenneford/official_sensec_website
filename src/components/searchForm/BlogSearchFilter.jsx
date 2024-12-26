import "./searchForm.scss";
import "./blogSearch.scss";
import { Box, InputAdornment, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
import PropType from "prop-types";
import { CustomTextField } from "../../muiStyling/muiStyling";
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
        <CustomTextField
          fullWidth
          label={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <Search sx={{ color: "#696969" }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            height: "3rem",
            "& .MuiInputBase-root": {
              height: "100%",
              boxSizing: "border-box", // Ensures padding is accounted for
            },
            "& .MuiInputBase-input": {
              padding: "0 14px", // Adjust vertical and horizontal padding
              display: "flex",
              alignItems: "center",
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
