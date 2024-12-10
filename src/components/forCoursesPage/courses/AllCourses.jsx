import React from "react";
import "./allCourses.scss";
import { Link } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { FetchAllProgrammes } from "../../../data/programme/FetchProgrammeData";
import { ContainerBox } from "../../../muiStyling/muiStyling";

export function AllCourses() {
  const allProgrammes = FetchAllProgrammes();
  const leftProgrammes = allProgrammes?.slice(0, 3);
  const rightProgrammes = allProgrammes?.slice(3, 6);
  console.log(allProgrammes);

  if (!allProgrammes) {
    return (
      <h3
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          // marginTop: "2rem",
          padding: "1rem 0",
          color: "#cccc",
        }}
      >
        Loading data...
        {/* <LoadingProgress color={"#696969"} size={"1.3rem"} /> */}
      </h3>
    );
  }
  return (
    <>
      {allProgrammes ? (
        <Box
          display={{ xs: "block", md: "flex" }}
          gap={{ xs: 0, md: "2rem", xl: "5rem" }}
          sx={{
            width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
            margin: "auto",
            // marginTop: { xs: 1, sm: 1 },
            padding: { xs: "1rem .5rem", sm: "1rem" },
          }}
        >
          {/* <Box
          container
          spacing={{ sm: 2, md: 7 }}
          // mt={4}
          className="gridContainer"
          pt={"0 !important"}
        > */}
          <Box flex={1}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {leftProgrammes?.map((program) => (
                  <Box className="courseWrap" id="course" key={program?._id}>
                    <Box className="courseCont">
                      <h1 className="title">{program?.name}</h1>
                      <Box className="courseItem">
                        <Box className="courseImageWrap">
                          {program?.name === "Agric Science" && (
                            <Box
                              component="img"
                              src="https://images.unsplash.com/photo-1557234195-bd9f290f0e4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                              className="courseImg"
                              alt={`${program?.name} Image`}
                              sx={{
                                width: { sm: "15rem", md: "30rem" },
                                marginRight: 2,
                                marginBottom: 2,
                                float: "left",
                              }}
                            />
                          )}
                          {program?.name === "Visual Arts" && (
                            <Box
                              component="img"
                              src="https://images.unsplash.com/photo-1525254646234-87ffe274c810?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                              className="courseImg"
                              alt={`${program?.name} Image`}
                              sx={{
                                width: { sm: "15rem", md: "30rem" },
                                marginBottom: 2,
                                float: {
                                  xs: "right",
                                  sm: "right",
                                  md: "left",
                                },
                                marginRight: { sm: 0, md: "1rem" },
                                marginLeft: { xs: "1rem", sm: "1rem", md: 0 },
                              }}
                            />
                          )}
                          {program?.name === "General Science" && (
                            <Box
                              component="img"
                              src="https://images.unsplash.com/photo-1617155093730-a8bf47be792d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                              className="courseImg"
                              alt={`${program?.name} Image`}
                              sx={{
                                width: { sm: "15rem", md: "30rem" },
                                marginRight: 2,
                                marginBottom: 2,
                                float: "left",
                              }}
                            />
                          )}
                        </Box>
                        <Box className="courseInfo">
                          {program?.name === "Agric Science" && (
                            <p>
                              The Agric Science Department is one of the first
                              department in SENSEC since the school was started
                              as an agriculture-oriented school. The subject
                              combination for students in the department is:
                              Animal Husbandry, General Agriculture, Chemistry
                              and Physics in addition to the core subjects. The
                              department has been planting different types of
                              crops each planting season and has recently
                              started a palm plantation in the school. Plans are
                              advance to start an animal farm. Subjects taught
                              in the Agricultural Science programme include
                              Animal Husbandry, Chemistry, Physics, General
                              Agriculture and Elective Mathematics.
                            </p>
                          )}
                          {program?.name === "Visual Arts" && (
                            <>
                              <p>
                                The Visual Art programme in SENSEC was rolled
                                out in the year 2005, through the effort of a
                                visual art teacher Mr. Nelson Appeadu under the
                                leadership and guidance of the then
                                headmistress, Mrs Prah. Visual Arts is a
                                creative discipline that encompasses various
                                forms of visual expression such as drawing,
                                painting, sculpture and graphic design. The
                                programme therefore encourages students to
                                explore their creativity, imagination and
                                self-expression through visual media.
                              </p>
                              <p>
                                SENSEC Visual Arts curriculum typically focuses
                                on theory as well as practical application. Some
                                of the elective subjects studied are
                                Leatherwork, Graphic Design, General Knowledge
                                in Arts and Music.
                              </p>
                            </>
                          )}
                          {program?.name === "General Science" && (
                            <p>
                              The General Science Programme was introduced in
                              2017, with 8 students. The programme promotes
                              scientific literacy among students by helping them
                              develop among other competencies, problem solving
                              skills, critical thinking, and appreciation of the
                              importance of technology. Subjects taught in the
                              General Science programme include Biology,
                              Chemistry, Information, Communications and
                              Technology (ICT), Elective Mathematics and
                              Physics.
                            </p>
                          )}
                          <Link to={"#"}>
                            <button className="programmeBtn">Learn More</button>
                          </Link>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Grid>
            </Grid>
          </Box>
          <Box flex={1} mt={{ sm: "2rem", md: "5rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {rightProgrammes?.map((program) => (
                  <Box className="courseWrap" id="course" key={program?._id}>
                    <Box className="courseCont" mt={{ xs: "2rem" }}>
                      <h1 className="title">{program?.name}</h1>
                      <Box className="rightCourseItem">
                        <Box className="courseImageWrap">
                          {program?.name === "Business" && (
                            <Box
                              component="img"
                              src="https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                              className="courseImg"
                              alt={`${program?.name} Image`}
                              sx={{
                                width: { sm: "15rem", md: "30rem" },
                                marginBottom: 2,
                                float: "right",
                                marginLeft: 2,
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
                                width: { sm: "15rem", md: "30rem" },
                                marginBottom: 2,
                                float: {
                                  xs: "left",
                                  sm: "left",
                                  md: "right",
                                },
                                marginRight: {
                                  xs: "1rem",
                                  sm: "1rem",
                                  md: 0,
                                },
                                marginLeft: { sm: 0, md: "1rem" },
                              }}
                            />
                          )}
                          {program?.name === "Home Economics" && (
                            <Box
                              component="img"
                              src="https://plus.unsplash.com/premium_photo-1682097054374-43bfdbef7e2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                              className="courseImg"
                              alt={`${program?.name} Image`}
                              sx={{
                                width: { sm: "15rem", md: "30rem" },
                                marginBottom: 2,
                                float: "right",
                                marginLeft: 2,
                              }}
                            />
                          )}
                        </Box>
                        <Box className="courseInfo">
                          {program?.name === "Business" && (
                            <p>
                              Business, is one of the many programmes studied at
                              SENSEC. The programme is practical in nature and a
                              fast-changing field of discipline. The purpose of
                              the Business programme is to provide students with
                              knowledge, skills and attitudes to achieve success
                              in business education, workplace, post-secondary
                              education or training and daily life. Elective
                              subjects taught here include Business Management,
                              Principles of Cost Accounting, Financial
                              Accounting, Elective Mathematics and Economics.
                            </p>
                          )}
                          {program?.name === "General Arts" && (
                            <p>
                              The General Arts department is the largest
                              department at SENSEC in terms of students’
                              population and faculty members. It offers students
                              a broad-based foundation in various disciplines
                              within the Arts and Humanities. The programme of
                              study is designed to foster intellectual
                              curiosity, critical thinking, and effective
                              communication skills. The programme overall aim is
                              to prepare students for a wide range of career
                              opportunities and personal development. Subjects
                              taught include Economics, Geography, History,
                              Christian Religious Studies, Government, Music,
                              and Elective Mathematics.
                            </p>
                          )}
                          {program?.name === "Home Economics" && (
                            <p>
                              Home Economics is an area of study that involves
                              the three basic needs of life, namely food,
                              clothing and shelter. The subject that are studied
                              at the department are Food and Nutrition, Clothing
                              and Textiles, Management in Living, Economics,
                              General Knowledge in Arts and Biology. The
                              programme is practically oriented and so equips
                              students who offer it with employable skills and
                              therefore participate meaningfully in the world of
                              work.
                            </p>
                          )}
                          <Link to={"#"}>
                            <button className="programmeBtn">Learn More</button>
                          </Link>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Grid>
            </Grid>
          </Box>
          {/* </Box> */}
        </Box>
      ) : (
        ""
      )}
    </>
  );
}
