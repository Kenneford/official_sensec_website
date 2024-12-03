import { Box } from "@mui/material";
import "./coursesBanner.scss";
import { HashLink } from "react-router-hash-link";

export default function CoursesBanner() {
  return (
    <Box className="bannerWrap">
      <Box
        className="bannerImg"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")`,
        }}
      >
        <Box className="overlay">
          <h1>Available Courses</h1>
          <span>( Senya Senior High School )</span>
        </Box>
      </Box>
      <Box bgcolor={"#292929"} width={"100%"} padding={"0 0.5rem"}>
        <Box className="links" width={"100%"} sx={{ padding: "0 .5rem" }}>
          <HashLink to={"#"}>Agriculture</HashLink>
          <HashLink to={"#"}>Visual Art</HashLink>
          <HashLink to={"#"}>Science</HashLink>
          <HashLink to={"#"}>Business</HashLink>
          <HashLink to={"#"}>General Art</HashLink>
          <HashLink to={"#"}>Home Economics</HashLink>
        </Box>
      </Box>
    </Box>
  );
}
