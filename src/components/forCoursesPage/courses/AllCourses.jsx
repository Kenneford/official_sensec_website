import React from "react";
import "./allCourses.scss";
import { Link } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { FetchAllProgrammes } from "../../../data/programme/FetchProgrammeData";
import { ContainerBox } from "../../../muiStyling/muiStyling";

export default function AllCourses() {
  const allProgrammes = FetchAllProgrammes();
  const leftProgrammes = allProgrammes?.slice(0, 3);
  const rightProgrammes = allProgrammes?.slice(3, 6);
  return (
    <Box>
      <ContainerBox
        sx={{
          width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
          margin: "auto",
          paddingTop: "2rem",
        }}
      >
        <Grid container spacing={{ sm: 2, md: 12 }}>
          <Grid item xs={12} sm={12} md={6}>
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
                                width: "30rem",
                                marginRight: 2,
                                marginBottom: 2,
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
                                width: "30rem",
                                marginRight: 2,
                                marginBottom: 2,
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
                                width: "30rem",
                                marginRight: 2,
                                marginBottom: 2,
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
          </Grid>
          <Grid item xs={12} sm={12} md={6} mt={{ sm: 0, md: "5rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {rightProgrammes?.map((program, index) => (
                  <Box className="courseWrap" id="course" key={program?._id}>
                    <Box className="courseCont">
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
                                width: "30rem",
                                marginRight: 2,
                                marginBottom: 2,
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
                                width: "30rem",
                                marginRight: 2,
                                marginBottom: 2,
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
                                width: "30rem",
                                marginRight: 2,
                                marginBottom: 2,
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
          </Grid>
        </Grid>
      </ContainerBox>
    </Box>
    // <Box className="allCoursesWrap">
    //   <Box className="coursesCont">
    //     <Grid container spacing={12}>
    //       <Grid item xs={12} sm={12} md={6}>
    //         <Grid container spacing={2}>
    //           <Grid item xs={12}>
    //             {leftProgrammes?.map((program, index) => (
    //               // <Box className="coursesLeft" key={program?._id}>
    //               //   <Box id="courseItem">
    //               //     <h1 className="title">{program?.name}</h1>
    //               //     <Box className="courseContentWrap">
    //               //       {program?.name === "General Arts" && (
    //               //         <Box
    //               //           component="img"
    //               //           src="https://plus.unsplash.com/premium_photo-1661781303670-5fe01555296e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    //               //           className="imageWrap"
    //               //           alt={`${program?.name} Image`}
    //               //           sx={{
    //               //             width: "30rem",
    //               //             marginRight: 2,
    //               //             marginBottom: 2,
    //               //           }}
    //               //         />
    //               //       )}
    //               //       {program?.name === "Agric Science" && (
    //               //         <Box
    //               //           component="img"
    //               //           src="https://images.unsplash.com/photo-1557234195-bd9f290f0e4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    //               //           className="ImageWrap"
    //               //           alt={`${program?.name} Image`}
    //               //           sx={{
    //               //             width: "30rem",
    //               //             marginRight: 2,
    //               //             marginBottom: 2,
    //               //           }}
    //               //         />
    //               //       )}
    //               //       {program?.name === "Home Economics" && (
    //               //         <Box
    //               //           component="img"
    //               //           src="https://plus.unsplash.com/premium_photo-1682097054374-43bfdbef7e2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    //               //           className="ImageWrap"
    //               //           alt={`${program?.name} Image`}
    //               //           sx={{
    //               //             width: "30rem",
    //               //             marginRight: 2,
    //               //             marginBottom: 2,
    //               //           }}
    //               //         />
    //               //       )}
    //               //       {/* {program?.name === "General Arts" && (
    //               //         <img
    //               //           src="https://plus.unsplash.com/premium_photo-1661781303670-5fe01555296e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    //               //           alt=""
    //               //           className="enrollImg"
    //               //         />
    //               //       )}
    //               //       {program?.name === "Agric Science" && (
    //               //         <img
    //               //           src="https://images.unsplash.com/photo-1557234195-bd9f290f0e4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    //               //           alt=""
    //               //           className="enrollImg"
    //               //         />
    //               //       )}
    //               //       {program?.name === "Home Economics" && (
    //               //         <img
    //               //           src="https://plus.unsplash.com/premium_photo-1682097054374-43bfdbef7e2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    //               //           alt=""
    //               //           className="enrollImg"
    //               //         />
    //               //       )} */}
    //               //     </Box>
    //               //     <Box className="programmeInfo">
    //               //       <p>
    //               //         Many desktop publishing packages and web page editors
    //               //         now use Lorem Ipsum as their default model text, and a
    //               //         search for 'lorem ipsum' will uncover many web sites
    //               //         still in their infancy. Various versions have evolved
    //               //         over the years, sometimes by accident, sometimes on
    //               //         purpose (injected humour and the like).
    //               //       </p>
    //               //     </Box>
    //               //     <Link to={"#"}>
    //               //       <button className="programmeBtn">Learn More</button>
    //               //     </Link>
    //               //   </Box>
    //               // </Box>

    //               <Box className="historyWrap" id="history">
    //                 <Box className="historyCont">
    //                   <h4>Our History</h4>
    //                   <Box className="history">
    //                     <Box className="historyRight">
    //                       <Box
    //                         component="img"
    //                         className="historyImg"
    //                         src="https://images.unsplash.com/photo-1522661067900-ab829854a57f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    //                         alt="Sample"
    //                         sx={{
    //                           width: "30rem",
    //                           marginRight: 2,
    //                           marginBottom: 2,
    //                         }}
    //                       />
    //                     </Box>
    //                     <Box className="historyLeft">
    //                       <p>
    //                         SENSEC was established on 7th February, 1991, when a
    //                         group of visionary educators and community leaders
    //                         came together with a shared dream – to provide
    //                         quality education to the youth of Senya Beraku and
    //                         its catchment areas. These founders believed that
    //                         “Knowledge is Light,” a belief that later became
    //                         motto of the school and would come to define the
    //                         essence of the school.
    //                       </p>
    //                       <p>
    //                         During its early years, the school faced numerous
    //                         challenges, from inadequate infrastructure to
    //                         limited resources. However, the determination and
    //                         dedication of the founding team, along with support
    //                         from the local community, ensured that SENSEC
    //                         continued to grow and flourish.
    //                       </p>
    //                       <p>
    //                         Great SENSEC started in a private residence with
    //                         only four students and acting Headmaster Mr. George
    //                         Mettle and Mr. E.N.Q. Sackey who was a national
    //                         service personnel. Not long after this modest
    //                         beginning, Mr. J.K Addo became the substantive
    //                         headmaster of the school. The school was originally
    //                         meant to be a Community Day School, but due to
    //                         Ministry of Education&apos;s computerised School
    //                         Selection and Placement System (CSSPS), Management
    //                         of the school introduced the boarding and hostel
    //                         systems to accommodate students who came from afar.
    //                       </p>
    //                       {/* <Link to={"#"}>
    //               <button className="historyBtn">Learn More</button>
    //             </Link> */}
    //                     </Box>
    //                   </Box>
    //                 </Box>
    //               </Box>
    //             ))}
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //       <Grid item xs={12} sm={12} md={6} mt={"5rem"}>
    //         <Grid container spacing={2}>
    //           <Grid item xs={12}>
    //             {rightProgrammes?.map((program, index) => (
    //               <Box className="coursesLeft" key={program?._id}>
    //                 <Box className="course" id="agriculture">
    //                   <h1 className="title">{program?.name}</h1>
    //                   <Box className="courseLeftContent">
    //                     {program?.name === "General Science" && (
    //                       <img
    //                         src="https://images.unsplash.com/photo-1617155093730-a8bf47be792d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    //                         alt=""
    //                         className="enrollImg"
    //                       />
    //                     )}
    //                     {program?.name === "Business" && (
    //                       <img
    //                         src="https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
    //                         alt=""
    //                         className="enrollImg"
    //                       />
    //                     )}
    //                     {program?.name === "Visual Arts" && (
    //                       <img
    //                         src="https://images.unsplash.com/photo-1525254646234-87ffe274c810?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    //                         alt=""
    //                         className="enrollImg"
    //                       />
    //                     )}
    //                     <p>
    //                       Many desktop publishing packages and web page editors
    //                       now use Lorem Ipsum as their default model text, and a
    //                       search for 'lorem ipsum' will uncover many web sites
    //                       still in their infancy. Various versions have evolved
    //                       over the years, sometimes by accident, sometimes on
    //                       purpose (injected humour and the like).
    //                     </p>
    //                     <Link to={"#"}>
    //                       <button>Learn More</button>
    //                     </Link>
    //                   </Box>
    //                 </Box>
    //               </Box>
    //             ))}
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //     {/* <Box className="coursesLeft">
    //       <Box className="course" id="agriculture">
    //         <h1 className="title">Agriculture</h1>
    //         <Box className="courseLeftContent">
    //           <img
    //             src="https://images.unsplash.com/photo-1557234195-bd9f290f0e4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    //             alt=""
    //             className="enrollImg"
    //           />
    //           <p>
    //             Many desktop publishing packages and web page editors now use
    //             Lorem Ipsum as their default model text, and a search for 'lorem
    //             ipsum' will uncover many web sites still in their infancy.
    //             Various versions have evolved over the years, sometimes by
    //             accident, sometimes on purpose (injected humour and the like).
    //           </p>
    //           <Link to={"#"}>
    //             <button>Learn More</button>
    //           </Link>
    //         </Box>
    //       </Box>
    //       <Box className="course" id="visualArt">
    //         <h1 className="title">Visual Art</h1>
    //         <Box className="courseLeftContent">
    //           <img
    //             src="https://images.unsplash.com/photo-1525254646234-87ffe274c810?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    //             alt=""
    //             className="enrollImg"
    //           />
    //           <p>
    //             Many desktop publishing packages and web page editors now use
    //             Lorem Ipsum as their default model text, and a search for 'lorem
    //             ipsum' will uncover many web sites still in their infancy.
    //             Various versions have evolved over the years, sometimes by
    //             accident, sometimes on purpose (injected humour and the like).
    //           </p>
    //           <Link to={"#"}>
    //             <button>Learn More</button>
    //           </Link>
    //         </Box>
    //       </Box>
    //       <Box className="course" id="science">
    //         <h1 className="title">Science</h1>
    //         <Box className="courseLeftContent">
    //           <img
    //             src="https://images.unsplash.com/photo-1617155093730-a8bf47be792d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    //             alt=""
    //             className="enrollImg"
    //           />
    //           <p>
    //             Many desktop publishing packages and web page editors now use
    //             Lorem Ipsum as their default model text, and a search for 'lorem
    //             ipsum' will uncover many web sites still in their infancy.
    //             Various versions have evolved over the years, sometimes by
    //             accident, sometimes on purpose (injected humour and the like).
    //           </p>
    //           <Link to={"#"}>
    //             <button>Learn More</button>
    //           </Link>
    //         </Box>
    //       </Box>
    //     </Box>
    //     <Box className="coursesRight">
    //       <Box className="course" id="business">
    //         <Box className="courseRightWrap">
    //           <h1>Business</h1>
    //           <Box className="courseRightContent">
    //             <img
    //               src="https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
    //               alt=""
    //               className="enrollImg"
    //             />
    //             <p>
    //               Many desktop publishing packages and web page editors now use
    //               Lorem Ipsum as their default model text, and a search for
    //               'lorem ipsum' will uncover many web sites still in their
    //               infancy. Various versions have evolved over the years,
    //               sometimes by accident, sometimes on purpose (injected humour
    //               and the like).
    //             </p>
    //             <Link to={"#"}>
    //               <button>Learn More</button>
    //             </Link>
    //           </Box>
    //         </Box>
    //       </Box>
    //       <Box className="course" id="generalArt">
    //         <Box className="courseRightWrap">
    //           <h1>General Art</h1>
    //           <Box className="courseRightContent">
    //             <img
    //               src="https://plus.unsplash.com/premium_photo-1661781303670-5fe01555296e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    //               alt=""
    //               className="enrollImg"
    //             />
    //             <p>
    //               Many desktop publishing packages and web page editors now use
    //               Lorem Ipsum as their default model text, and a search for
    //               'lorem ipsum' will uncover many web sites still in their
    //               infancy. Various versions have evolved over the years,
    //               sometimes by accident, sometimes on purpose (injected humour
    //               and the like).
    //             </p>
    //             <Link to={"#"}>
    //               <button>Learn More</button>
    //             </Link>
    //           </Box>
    //         </Box>
    //       </Box>
    //       <Box className="course" id="homeEconomics">
    //         <Box className="courseRightWrap">
    //           <h1>Home Economics</h1>
    //           <Box className="courseRightContent">
    //             <img
    //               src="https://plus.unsplash.com/premium_photo-1682097054374-43bfdbef7e2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    //               alt=""
    //               className="enrollImg"
    //             />
    //             <p>
    //               Many desktop publishing packages and web page editors now use
    //               Lorem Ipsum as their default model text, and a search for
    //               'lorem ipsum' will uncover many web sites still in their
    //               infancy. Various versions have evolved over the years,
    //               sometimes by accident, sometimes on purpose (injected humour
    //               and the like).
    //             </p>
    //             <Link to={"#"}>
    //               <button>Learn More</button>
    //             </Link>
    //           </Box>
    //         </Box>
    //       </Box>
    //     </Box> */}
    //   </Box>
    // </Box>
  );
}
