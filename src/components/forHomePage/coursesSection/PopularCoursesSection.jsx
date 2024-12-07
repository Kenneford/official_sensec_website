import { Box } from "@mui/material";
import "./popularCoursesSection.scss";
import { motion } from "framer-motion";
import { HashLink } from "react-router-hash-link";
import { ContainerBox } from "../../../muiStyling/muiStyling";
import { FetchAllProgrammes } from "../../../data/programme/FetchProgrammeData";

export function PopularCoursesSection() {
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
  const animate = {
    off: { y: 100, opacity: 0 },
    on: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", duration: 0.5 },
    },
  };
  const animate1 = {
    off: { y: -100, opacity: 0 },
    on: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", duration: 0.5 },
    },
  };

  return (
    <ContainerBox
      sx={{
        width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
        margin: "auto",
        paddingTop: "2rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box className="courseWrap">
        <Box className="courseContainer">
          <h1>Our Popular Courses</h1>
          <Box className="courseContent">
            <Box className="courseCard">
              <Box className="courseImgWrap">
                <img
                  src="/assets/images/home-img/business.jpg"
                  alt=""
                  className="courseImg"
                />
              </Box>
              <Box className="courseInfo">
                <h4>Business Management</h4>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
                </p>
              </Box>
              <HashLink
                to={"/sensec/courses#business"}
                smooth
                scroll={scrollWithOffset}
              >
                <button className="courseBtn">Learn More</button>
              </HashLink>
            </Box>
            <Box className="courseCard">
              <Box className="courseImgWrap">
                <img
                  src="https://images.unsplash.com/photo-1557234195-bd9f290f0e4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt=""
                  className="courseImg"
                />
              </Box>
              <Box className="courseInfo">
                <h4>Agriculture Science</h4>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
                </p>
              </Box>
              <HashLink
                to={"/sensec/courses#agriculture"}
                smooth
                scroll={scrollWithOffset1}
              >
                <button className="courseBtn">Learn More</button>
              </HashLink>
            </Box>
            <Box className="courseCard">
              <Box className="courseImgWrap">
                <img
                  src="/assets/images/home-img/kitchen.jpg"
                  alt=""
                  className="courseImg"
                />
              </Box>
              <Box className="courseInfo">
                <h4>Home Economics</h4>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
                </p>
              </Box>
              <HashLink
                to={"/sensec/courses#homeEconomics"}
                smooth
                scroll={scrollWithOffset}
              >
                <button className="courseBtn">Learn More</button>
              </HashLink>
            </Box>
            <Box className="courseCard">
              <Box className="courseImgWrap">
                <img
                  src="/assets/images/home-img/kitchen.jpg"
                  alt=""
                  className="courseImg"
                />
              </Box>
              <Box className="courseInfo">
                <h4>General Arts 1</h4>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
                </p>
              </Box>
              <HashLink
                to={"/sensec/courses#homeEconomics"}
                smooth
                scroll={scrollWithOffset}
              >
                <button className="courseBtn">Learn More</button>
              </HashLink>
            </Box>
          </Box>
        </Box>
      </Box>
    </ContainerBox>
  );
}
