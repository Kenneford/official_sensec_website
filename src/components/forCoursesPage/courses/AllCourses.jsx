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
          <Box flex={1} item xs={12} sm={12} md={6} pt={0}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {leftProgrammes?.map((program) => (
                  <Box className="courseWrap" id="course" key={program?._id}>
                    <Box className="courseCont">
                      <h1 className="title">{program?.name}</h1>
                      <Box className="courseItem">
                        <Box className="courseImageWrap">
                          {program?.name === "General Arts" && (
                            <Box
                              component="img"
                              src="https://plus.unsplash.com/premium_photo-1661781303670-5fe01555296e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
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
                          {program?.name === "Agric Science" && (
                            <Box
                              component="img"
                              src="https://images.unsplash.com/photo-1557234195-bd9f290f0e4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
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
                          {program?.name === "Home Economics" && (
                            <Box
                              component="img"
                              src="https://plus.unsplash.com/premium_photo-1682097054374-43bfdbef7e2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
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
                          <p>
                            Many desktop publishing packages and web page
                            editors now use Lorem Ipsum as their default model
                            text, and a search for 'lorem ipsum' will uncover
                            many web sites still in their infancy. Various
                            versions have evolved over the years, sometimes by
                            accident, sometimes on purpose (injected humour and
                            the like).
                          </p>
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
          <Box
            flex={1}
            item
            xs={12}
            sm={12}
            md={6}
            mt={{ sm: "2rem", md: "5rem" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {rightProgrammes?.map((program, index) => (
                  <Box className="courseWrap" id="course" key={program?._id}>
                    <Box className="courseCont" mt={{ xs: "2rem" }}>
                      <h1 className="title">{program?.name}</h1>
                      <Box className="rightCourseItem">
                        <Box className="courseImageWrap">
                          {program?.name === "General Science" && (
                            <Box
                              component="img"
                              src="https://images.unsplash.com/photo-1617155093730-a8bf47be792d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
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
                          {program?.name === "Business" && (
                            <Box
                              component="img"
                              src="https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
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
                          {program?.name === "Visual Arts" && (
                            <Box
                              component="img"
                              src="https://images.unsplash.com/photo-1525254646234-87ffe274c810?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
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
                          <p>
                            Many desktop publishing packages and web page
                            editors now use Lorem Ipsum as their default model
                            text, and a search for 'lorem ipsum' will uncover
                            many web sites still in their infancy. Various
                            versions have evolved over the years, sometimes by
                            accident, sometimes on purpose (injected humour and
                            the like).
                          </p>
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
