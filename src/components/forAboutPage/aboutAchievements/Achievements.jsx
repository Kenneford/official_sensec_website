import React, { useEffect, useState } from "react";
import "./achievements.scss";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { Box, Grid } from "@mui/material";
import { ContainerBox } from "../../../muiStyling/muiStyling";
import { FetchAllProgrammes } from "../../../data/programme/FetchProgrammeData";
import {
  FetchAllApprovedStudents,
  FetchAllGraduatedStudents,
} from "../../../data/students/FetchAllStudents";
import Parser from "html-react-parser";
import { FetchSensecSchoolData } from "../../../data/blogs/FetchSensecSchoolData";

export function Achievements() {
  const sensecSchoolData = FetchSensecSchoolData();
  console.log(sensecSchoolData);
  const allPrograms = FetchAllProgrammes();
  const allApprovedStudents = FetchAllApprovedStudents();
  const alumni = FetchAllGraduatedStudents();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  console.log(screenWidth);

  const xScreen = screenWidth < 300;
  console.log(xScreen);

  useEffect(() => {
    // Function to update the screen width
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Box borderTop={"1px solid #ccc"}>
      <ContainerBox
        sx={{
          width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
          margin: "auto",
          padding: { xs: "1rem .5rem", sm: "2rem 1rem" },
        }}
      >
        <Box className="achieveWrap" id="achievements">
          <Box className="achieveCont">
            <h4>Achievements</h4>
            <Box className="achievements">
              <Box className="achievementLeft">
                <Box
                  component="img"
                  className="achieveImg"
                  src="https://plus.unsplash.com/premium_photo-1683749809341-23a70a91b195?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Sample"
                  sx={{
                    width: "30rem",
                    marginRight: 2,
                    marginBottom: 2,
                  }}
                />
              </Box>
              {/* </Box> */}
              <Box className="achievementRight">
                {Parser(`${sensecSchoolData[0]?.achievements?.text}`)}
              </Box>
            </Box>
            <Box m={"1rem 0"}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <h5>SENSEC Athletics team with Headmaster and coaches.</h5>
                  <Box
                    component="img"
                    // className="achieveImg"
                    src="https://plus.unsplash.com/premium_photo-1726403421924-eeb265f8c57a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Sample"
                    sx={{
                      width: "100%",
                      height: "25vh",
                      objectFit: "cover",
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <h5>SENSEC Volleyball team with Headmaster and coaches.</h5>
                  <Box
                    component="img"
                    // className="achieveImg"
                    src="https://images.unsplash.com/photo-1642506539221-8019a4cd44cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Sample"
                    sx={{
                      width: "100%",
                      height: "25vh",
                      objectFit: "cover",
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <h5>SENSEC Debate Team and their coach and some teachers.</h5>
                  <Box
                    component="img"
                    // className="achieveImg"
                    src="https://images.unsplash.com/photo-1573496774426-fe3db3dd1731?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Sample"
                    sx={{
                      width: "100%",
                      height: "25vh",
                      objectFit: "cover",
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <h5>SENSEC Quiz team with their masters.</h5>
                  <Box
                    component="img"
                    // className="achieveImg"
                    src="https://images.unsplash.com/photo-1589104760192-ccab0ce0d90f?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Sample"
                    sx={{
                      width: "100%",
                      height: "25vh",
                      objectFit: "cover",
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <h5>SENSEC Team with the Ahoba Kese Festival Trophy.</h5>
                  <Box
                    component="img"
                    // className="achieveImg"
                    src="https://plus.unsplash.com/premium_photo-1723478655890-c094d1be13b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Sample"
                    sx={{
                      width: "100%",
                      height: "25vh",
                      objectFit: "cover",
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={1} className="achieveCards">
                <Grid item xs={6} sm={4} md={3} lg={3}>
                  <Box
                    className="card cardCourse"
                    sx={{ flexDirection: xScreen ? "column" : "row" }}
                  >
                    <span className="cardIcon ">
                      <SchoolIcon style={{ color: "#89870f" }} />
                    </span>
                    <Box>
                      <h3>{allPrograms?.length}</h3>
                      <p>Courses</p>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={3} lg={3}>
                  <Box
                    className="card cardStudents"
                    sx={{ flexDirection: xScreen ? "column" : "row" }}
                  >
                    <span className="cardIcon">
                      <PeopleAltIcon style={{ color: "#12519f" }} />
                    </span>
                    <Box>
                      <h3>{allApprovedStudents?.length}+</h3>
                      <p>Students</p>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={3} lg={3}>
                  <Box
                    className="card cardAlumni"
                    sx={{ flexDirection: xScreen ? "column" : "row" }}
                  >
                    <span className="cardIcon">
                      <Diversity3Icon style={{ color: "#108e2d" }} />
                    </span>
                    <Box>
                      <h3>{alumni?.length}+</h3>
                      <p>Alumni</p>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={4} md={3} lg={3}>
                  <Box
                    className="card cardAwards"
                    sx={{ flexDirection: xScreen ? "column" : "row" }}
                  >
                    <span className="cardIcon">
                      <EmojiEventsIcon style={{ color: "#8e1410" }} />
                    </span>
                    <Box>
                      <h3>17</h3>
                      <p>Awards</p>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </ContainerBox>
    </Box>
  );
}
