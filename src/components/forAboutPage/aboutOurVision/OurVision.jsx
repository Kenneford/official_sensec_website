import React from "react";
import "./ourVision.scss";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { ContainerBox } from "../../../muiStyling/muiStyling";
import Parser from "html-react-parser";
import { FetchSensecSchoolData } from "../../../data/blogs/FetchSensecSchoolData";
import { getAuthUser } from "../../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { HashLink } from "react-router-hash-link";
import { Edit } from "@mui/icons-material";

export function OurVision() {
  const authUser = useSelector(getAuthUser);
  const sensecSchoolData = FetchSensecSchoolData();

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };
  //THIS REMOVES THE NavLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }

  return (
    <Box borderTop={"1px solid #ccc"}>
      <ContainerBox
        sx={{
          width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
          margin: "auto",
          padding: { xs: "1rem .5rem", sm: "2rem 1rem" },
        }}
      >
        <Box className="visionWrap" id="vision">
          <Box className="visionCont">
            <h4>
              Vision And Values{" "}
              {authUser?.roles?.includes("Admin") && (
                <HashLink
                  to={`/sensec/users/${authUser?.uniqueId}/admin/Actions/Create_Data/school_data/new#editVisionOfSchool`}
                  smooth
                  scroll={scrollWithOffset}
                  onClick={() =>
                    localStorage.setItem(
                      "updateSensecSchoolData",
                      "Name Of School"
                    )
                  }
                >
                  <Edit
                    titleAccess="Update Name Of School"
                    sx={{ fontSize: "1em" }}
                  />
                </HashLink>
              )}
            </h4>
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
                <Box>
                  {Parser(
                    `${sensecSchoolData[0]?.schoolVision?.visionStatement}`
                  )}
                </Box>
                <h5
                  style={{
                    marginBottom: ".5rem",
                    letterSpacing: "1px",
                  }}
                >
                  Mission Statement
                </h5>
                <Box>
                  {Parser(
                    `${sensecSchoolData[0]?.schoolVision?.missionStatement}`
                  )}
                </Box>
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
                  {Parser(`${sensecSchoolData[0]?.schoolVision?.coreValues}`)}
                  {/* <p>
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
                  </p> */}
                </Box>
                {/* <Link to={"#"}>
                  <button className="visionBtn">Learn More</button>
                </Link> */}
              </Box>
            </Box>
          </Box>
        </Box>
      </ContainerBox>
    </Box>
  );
}
