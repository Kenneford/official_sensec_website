import React from "react";
import "./ourHistory.scss";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { ContainerBox } from "../../../muiStyling/muiStyling";

export function OurHistory() {
  return (
    <Box borderTop={"1px solid #ccc"}>
      <ContainerBox
        sx={{
          width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
          margin: "auto",
          padding: { xs: "1rem .5rem", sm: "2rem 1rem" },
        }}
      >
        <Box className="historyWrap" id="history">
          <Box className="historyCont">
            <h4>Our History</h4>
            <Box className="history">
              <Box className="historyRight">
                <Box
                  component="img"
                  className="historyImg"
                  src="https://images.unsplash.com/photo-1522661067900-ab829854a57f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt="Sample"
                  sx={{
                    width: "30rem",
                    marginRight: 2,
                    marginBottom: 2,
                  }}
                />
              </Box>
              <Box className="historyLeft">
                <p>
                  SENSEC was established on 7th February, 1991, when a group of
                  visionary educators and community leaders came together with a
                  shared dream – to provide quality education to the youth of
                  Senya Beraku and its catchment areas. These founders believed
                  that “Knowledge is Light,” a belief that later became motto of
                  the school and would come to define the essence of the school.
                </p>
                <p>
                  During its early years, the school faced numerous challenges,
                  from inadequate infrastructure to limited resources. However,
                  the determination and dedication of the founding team, along
                  with support from the local community, ensured that SENSEC
                  continued to grow and flourish.
                </p>
                <p>
                  Great SENSEC started in a private residence with only four
                  students and acting Headmaster Mr. George Mettle and Mr.
                  E.N.Q. Sackey who was a national service personnel. Not long
                  after this modest beginning, Mr. J.K Addo became the
                  substantive headmaster of the school. The school was
                  originally meant to be a Community Day School, but due to
                  Ministry of Education&apos;s computerised School Selection and
                  Placement System (CSSPS), Management of the school introduced
                  the boarding and hostel systems to accommodate students who
                  came from afar.
                </p>
                {/* <Link to={"#"}>
                  <button className="historyBtn">Learn More</button>
                </Link> */}
              </Box>
            </Box>
          </Box>
        </Box>
      </ContainerBox>
    </Box>
  );
}
