import React from "react";
import "./ourVision.scss";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { ContainerBox } from "../../../muiStyling/muiStyling";

export function OurVision() {
  return (
    <Box borderTop={"1px solid #ccc"}>
      <ContainerBox
        sx={{
          width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
          margin: "auto",
          paddingTop: "2rem",
        }}
      >
        <Box className="visionWrap" id="vision">
          <Box className="visionCont">
            <h4>Vision And Values</h4>
            <Box className="vision">
              <Box className="visionRight">
                <Box
                  component="img"
                  className="visionSectionImg"
                  src="https://images.unsplash.com/photo-1520569495996-b5e1219cb625?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1094&q=80"
                  alt="Sample"
                  sx={{
                    width: "30rem",
                    marginRight: 2,
                    marginBottom: 2,
                  }}
                />
              </Box>
              <Box className="visionLeft">
                <p>
                  A School that provides learners with excellent academics,
                  skills development and strong ethical foundation for national
                  development.
                </p>
                <h5
                  style={{
                    marginBottom: ".5rem",
                    letterSpacing: "1px",
                  }}
                >
                  Mission Statement
                </h5>
                <p>
                  To educate learners to achieve excellence, develop their
                  skills and build ethical behaviour that contributes to
                  national development .
                </p>
                <h5
                  style={{
                    marginBottom: ".5rem",
                    letterSpacing: "1px",
                  }}
                >
                  Core Values
                </h5>
                <Box
                  sx={{ pl: "1rem" }}
                  display={"grid"}
                  gridTemplateColumns={"repeat(auto-fit, minmax(140px, 1fr))"}
                  // flexDirection={"column"}
                  fontSize={".9em"}
                >
                  <p>
                    <span>1.</span> Discipline{" "}
                  </p>
                  <p>
                    <span>2.</span> Excellence{" "}
                  </p>
                  <p>
                    <span>3.</span> Well-groomed{" "}
                  </p>
                  <p>
                    <span>4.</span> Honesty{" "}
                  </p>
                  <p>
                    <span>5.</span> Creativity{" "}
                  </p>
                  <p>
                    <span>6.</span> Teamwork{" "}
                  </p>
                </Box>
                {/* <Link to={"#"}>
                  <button className="visionBtn">Learn More</button>
                </Link> */}
              </Box>
            </Box>
            <Box className=""></Box>
          </Box>
        </Box>
      </ContainerBox>
    </Box>
  );
}
