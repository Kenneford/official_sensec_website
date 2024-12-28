import { Box, Card, Grid } from "@mui/material";
import "./homeProgrammeSection.scss";
import { motion } from "framer-motion";
import { HashLink } from "react-router-hash-link";
import { ContainerBox } from "../../../muiStyling/muiStyling";
import { FetchAllProgrammes } from "../../../data/programme/FetchProgrammeData";

export function HomeProgrammeSection() {
  const allProgrammes = FetchAllProgrammes();
  const animate = {
    off: { x: -200, opacity: 0 },
    on: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  return (
    <Box
      component="div"
      className="programmeSectionWrap"
      sx={{ width: "100%", backgroundColor: "#3e3e3e", color: "#cccc" }}
    >
      <ContainerBox
        sx={{
          width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
          margin: "auto",
          padding: { xs: "1rem .5rem", sm: "2rem 1rem" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>Featured Programmes</h1>
        <Box
          component="div"
          className="programmeCardWrap"
          sx={{ flexGrow: 1, p: 2 }}
        >
          <Grid container spacing={2} justifyContent="center">
            {allProgrammes?.map((program) => (
              <Grid key={program?._id} item xs={12} sm={6} md={4} lg={4}>
                <Box
                  component="div"
                  className="programmeCard"
                  // maxHeight={"17rem"}
                  // sx={{
                  //   minHeight: 200, // Set a fixed height
                  //   display: "flex",
                  //   flexDirection: "column",
                  //   justifyContent: "space-between", // Space out content
                  // }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "space-between",
                    height: "100%", // Let it fill the grid item's height
                  }}
                >
                  <span className="catIcon">
                    <img
                      src="/assets/sensec-logo1.png"
                      alt=""
                      className="catImg"
                    />
                  </span>
                  <h4>{program?.name}</h4>

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
                      Business, is one of the many programmes studied at SENSEC.
                      The programme is practical in nature and a fast-changing
                      field of discipline.
                      {/* The purpose of the Business programme is to provide
                      students with knowledge, skills and attitudes to achieve
                      success in business education, workplace, post-secondary
                      education or training and daily life. */}
                      {/* Elective subjects taught here include Business
                      Management, Principles of Cost Accounting, Financial
                      Accounting, Elective Mathematics and Economics. */}
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
                      {/* The General Arts department is the largest department at
                      SENSEC in terms of students’ population and faculty
                      members. It offers students a broad-based foundation in
                      various disciplines within the Arts and Humanities. */}
                      The programme of study is designed to foster intellectual
                      curiosity, critical thinking, and effective communication
                      skills. The programme overall aim is to prepare students
                      for a wide range of career opportunities and personal
                      development. Subjects taught include Economics, Geography,
                      History, Christian Religious Studies, Government, Music,
                      and Elective Mathematics.
                    </p>
                  )}
                  {program?.name === "Home Economics" && (
                    <p
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3, // Limit to 2 lines
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {/* Home Economics is an area of study that involves the three
                      basic needs of life, namely food, clothing and shelter.
                      The subject that are studied at the department are Food
                      and Nutrition, Clothing and Textiles, Management in
                      Living, Economics, General Knowledge in Arts and Biology. */}
                      The programme is practically oriented and so equips
                      students who offer it with employable skills and therefore
                      participate meaningfully in the world of work.
                    </p>
                  )}
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
                      {/* The Agric Science Department is one of the first
                      department in SENSEC since the school was started as an
                      agriculture-oriented school. The subject combination for
                      students in the department is: Animal Husbandry, General
                      Agriculture, Chemistry and Physics in addition to the core
                      subjects. */}
                      The department has been planting different types of crops
                      each planting season and has recently started a palm
                      plantation in the school.
                      {/* Plans are advance to start
                      an animal farm. Subjects taught in the Agricultural
                      Science programme include Animal Husbandry, Chemistry,
                      Physics, General Agriculture and Elective Mathematics. */}
                    </p>
                  )}
                  {program?.name === "Visual Arts" && (
                    <>
                      <p
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 3, // Limit to 2 lines
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {/* The Visual Art programme in SENSEC was rolled out in the
                        year 2005, through the effort of a visual art teacher
                        Mr. Nelson Appeadu under the leadership and guidance of
                        the then headmistress, Mrs Prah. */}
                        Visual Arts is a creative discipline that encompasses
                        various forms of visual expression such as drawing,
                        painting, sculpture and graphic design.
                        {/* The programme therefore encourages
                        students to explore their creativity, imagination and
                        self-expression through visual media. */}
                      </p>
                      {/* <p>
                        SENSEC Visual Arts curriculum typically focuses on
                        theory as well as practical application. Some of the
                        elective subjects studied are Leatherwork, Graphic
                        Design, General Knowledge in Arts and Music.
                      </p> */}
                    </>
                  )}
                  {program?.name === "General Science" && (
                    <p
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3, // Limit to 2 lines
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {/* The General Science Programme was introduced in 2017, with
                      8 students. */}
                      The programme promotes scientific literacy among students
                      by helping them develop among other competencies, problem
                      solving skills, critical thinking, and appreciation of the
                      importance of technology.
                      {/* Subjects
                      taught in the General Science programme include Biology,
                      Chemistry, Information, Communications and Technology
                      (ICT), Elective Mathematics and Physics. */}
                    </p>
                  )}
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
        </Box>
      </ContainerBox>
    </Box>
  );
}
