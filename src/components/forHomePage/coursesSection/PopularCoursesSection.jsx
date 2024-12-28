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
        padding: { xs: "1rem .5rem", sm: "2rem 1rem" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box className="courseWrap">
        <Box className="courseContainer">
          <h1>Our Popular Courses</h1>
          <Box className="courseContent" sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {popularPrograms?.map((program) => (
                <Grid key={program?._id} item xs={12} sm={6} md={4} lg={4}>
                  <Box
                    className="courseCard"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      // justifyContent: "space-between",
                      height: "100%", // Let it fill the grid item's height
                    }}
                  >
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
                      <h4>{program?.name}</h4>
                      {program?.name === "Agric Science" && (
                        <p
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 3, // Limit to 2 lines
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          The Agric Science Department is one of the first
                          department in SENSEC since the school was started as
                          an agriculture-oriented school. The subject
                          combination for students in the department is: Animal
                          Husbandry, General Agriculture, Chemistry and Physics
                          in addition to the core subjects. The department has
                          been planting different types of crops each planting
                          season and has recently started a palm plantation in
                          the school. Plans are advance to start an animal farm.
                          Subjects taught in the Agricultural Science programme
                          include Animal Husbandry, Chemistry, Physics, General
                          Agriculture and Elective Mathematics.
                        </p>
                      )}
                      {program?.name === "Business" && (
                        <p
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 3, // Limit to 2 lines
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          Business, is one of the many programmes studied at
                          SENSEC. The programme is practical in nature and a
                          fast-changing field of discipline. The purpose of the
                          Business programme is to provide students with
                          knowledge, skills and attitudes to achieve success in
                          business education, workplace, post-secondary
                          education or training and daily life. Elective
                          subjects taught here include Business Management,
                          Principles of Cost Accounting, Financial Accounting,
                          Elective Mathematics and Economics.
                        </p>
                      )}
                      {program?.name === "General Arts" && (
                        <p
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 3, // Limit to 2 lines
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          The General Arts department is the largest department
                          at SENSEC in terms of students’ population and faculty
                          members. It offers students a broad-based foundation
                          in various disciplines within the Arts and Humanities.
                          The programme of study is designed to foster
                          intellectual curiosity, critical thinking, and
                          effective communication skills. The programme overall
                          aim is to prepare students for a wide range of career
                          opportunities and personal development. Subjects
                          taught include Economics, Geography, History,
                          Christian Religious Studies, Government, Music, and
                          Elective Mathematics.
                        </p>
                      )}
                    </Box>
                    <HashLink
                      to={`/sensec/courses#${program?.name}`}
                      smooth
                      scroll={scrollWithOffset}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "1rem",
                      }}
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
