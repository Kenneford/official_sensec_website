import { Box, Grid } from "@mui/material";
import "./popularCoursesSection.scss";
import { motion } from "framer-motion";
import { HashLink } from "react-router-hash-link";
import { ContainerBox } from "../../../muiStyling/muiStyling";
import { FetchAllProgrammes } from "../../../data/programme/FetchProgrammeData";

export function PopularCoursesSection() {
  const allProgrammes = FetchAllProgrammes();
  const popularPrograms = allProgrammes?.filter(
    (program) =>
      program?.name === "Business" ||
      program?.name === "Agric Science" ||
      (program?.name === "General Arts" && program)
  );
  console.log(popularPrograms);

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
            <Grid container spacing={2}>
              {popularPrograms?.map((program) => (
                <Grid key={program?._id} item xs={12} sm={6} md={4} lg={4}>
                  <Box className="courseCard">
                    <Box className="courseImgWrap">
                      {program?.name === "Agric Science" && (
                        <Box
                          component="img"
                          src="https://images.unsplash.com/photo-1557234195-bd9f290f0e4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                          className="courseImg"
                          alt={`${program?.name} Image`}
                          sx={{
                            marginBottom: 1,
                          }}
                        />
                      )}
                      {program?.name === "Business" && (
                        <Box
                          component="img"
                          src="https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                          className="courseImg"
                          alt={`${program?.name} Image`}
                          sx={{
                            marginBottom: 1,
                          }}
                        />
                      )}
                      {program?.name === "General Arts" && (
                        <Box
                          component="img"
                          src="https://plus.unsplash.com/premium_photo-1661781303670-5fe01555296e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                          className="courseImg"
                          alt={`${program?.name} Image`}
                          sx={{
                            marginBottom: 1,
                          }}
                        />
                      )}
                    </Box>
                    <Box className="courseInfo">
                      <h4>Business Management</h4>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry&apos;s standard dummy text ever since the
                        1500s,
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
                </Grid>
              ))}
            </Grid>
            {/* <Box className="courseCard">
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
            </Box> */}
          </Box>
        </Box>
      </Box>
    </ContainerBox>
  );
}
