import { Box } from "@mui/material";
import "./coursesBanner.scss";
import { HashLink } from "react-router-hash-link";
import { FetchAllProgrammes } from "../../../data/programme/FetchProgrammeData";

export default function CoursesBanner() {
  const allProgrammes = FetchAllProgrammes();

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };
  const scrollWithOffset1 = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
    const yOffset = -160;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  //THIS REMOVES THE HASHLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }

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
          {/* <HashLink to={"#"}>Agriculture</HashLink>
          <HashLink to={"#"}>Visual Art</HashLink>
          <HashLink to={"#"}>Science</HashLink>
          <HashLink to={"#"}>Business</HashLink>
          <HashLink to={"#"}>General Art</HashLink>
          <HashLink to={"#"}>Home Economics</HashLink> */}

          {allProgrammes?.map((program) => (
            <HashLink
              key={program?._id}
              to={`/sensec/courses#${program?.name}`}
              smooth
              scroll={scrollWithOffset}
            >
              {program?.name}
            </HashLink>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
