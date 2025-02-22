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

export function Achievements() {
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
                {/* <h5>Various Achievements</h5> */}
                <p>
                  SENSEC has achieved numerous accolades in academic and
                  co-curricular activities. The school boasts of experienced
                  teaching and non-teaching staff who are dedicated to ensuring
                  that students achieve academic and co-curricular success.
                  Academically, the school produces students who gain admissions
                  into the various tertiary institutions in Ghana and abroad.
                </p>
                <p>
                  In the field of sports, the school for several years excel in
                  many disciplines. In 2023 alone, the school placed first in
                  the Zone 6 Athletics Competitions. The other participating
                  schools include, Winneba Senior High School, Awutu-Winton
                  Senior High School, Fettehman Senior High School, T.I
                  Ahamadiyya Senior High School, Potsin, Uncle Rich Senior High
                  School and Zion Girls’ Senior High School, Winneba.
                </p>
              </Box>
              <Box>
                <p>
                  In the ball games held at Awutu-Winton SHS, SENSEC came first
                  in boys football competition, first in the boys volley ball
                  competition and third in the girls volley ball competition and
                  third in the girls’ netball competition.
                </p>
                <p>
                  SENSEC successfully defended its title in the inter-school
                  District 67th Independence Day Debate competitions held on
                  Wednesday 22nd November 2023 at the premises of the Awutu
                  Senya District Education Office. The other participating
                  schools include; Awutu Winton Senior High School, Bawjiase
                  Community Senior High Technical School, Bontrase Senior High
                  School and Obrachire Senior High Technical School.{" "}
                </p>
                <p>
                  This feat qualified SENSEC for the Zonal Debate Competition
                  held on January 4, 2024 at Winneba SHS. At the Zonal
                  competition too, SENSEC chalked the ultimate prize by being
                  adjudged the best Debating School and therefore qualified to
                  represent the zone at the regional level. The Regional or
                  Super Zonal Debate competition took place on the 26th January,
                  2024 at St. Augustine College in Cape-Coast. Here too, the
                  Debate team of SENSEC did exceptionally well by placing
                  second, losing out narrowly to Mfantsiman SHS who took the
                  ultimate prize.
                </p>
                <p>
                  SENSEC also placed first runners-up in the Awutu Senya
                  District’s 66th Independence Day Quiz Competition with
                  Obrachire SHTS coming first. In the District’s 67th
                  Independence Day Quiz, SENSEC won the competition and
                  represented the District at the Zonal level. SENSEC Quiz team
                  failed to progress from the Zonal level.
                </p>
                <p>
                  In September 2023, SENSEC won the maiden edition of the Ahoba
                  Kese Festival Science, Mathematics and General Knowledge quiz
                  competition organised by the Gomoa Fetteh Traditional Council.
                  T.I Ahamadiyya SHS, Potsin, came second. The other
                  participants are Hope College, Awutu Winton Senior High School
                  and Fettehman SHS. SENSEC was presented with a trophy and cash
                  prize of 700 cedis.
                </p>
                <p>
                  When your ward/child is enrolled at Sensec, he/she shall
                  benefit from a holistic lifelong education that will empowers
                  them to effect positive change in their lives and community.
                </p>
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
