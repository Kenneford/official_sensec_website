import React from "react";
import "./facilities.scss";
import { Link } from "react-router-dom";
import { ContainerBox } from "../../../muiStyling/muiStyling";
import { Box, Grid } from "@mui/material";

export default function FacilitiesSection() {
  return (
    <Box component="div" className="facilitiesWrap">
      <ContainerBox
        sx={{
          width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
          margin: "auto",
          padding: { xs: "1rem .5rem", sm: "2rem 1rem" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box className="facilitiesContainer">
          <h1>School Facilities</h1>
          <Box className="facilitiesContent">
            <Box className="facilitiesLeft">
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text.
              </p>
              <Link to={"/sensec/facilities"}>
                <button className="facilityBtn">Discover More</button>
              </Link>
            </Box>
            <Box className="facilitiesRight">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Box
                    className="facilityCard"
                    style={{
                      backgroundImage: `url("/assets/images/home-img/lab_img.avif")`,
                    }}
                  >
                    <Box className="colorOverlay">
                      <h4>Science Laboratory</h4>
                      <Link to={"/sensec/facility?=science_laboratory"}>
                        <button>View</button>
                      </Link>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Box
                    className="facilityCard"
                    style={{
                      backgroundImage: `url("/assets/images/home-img/computer_img.avif")`,
                    }}
                  >
                    <Box className="colorOverlay">
                      <h4>Computer Classroom</h4>
                      <Link to={"/sensec/facility?=computer_classroom"}>
                        <button>View</button>
                      </Link>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Box
                    className="facilityCard"
                    style={{
                      backgroundImage: `url("/assets/images/home-img/library_img.avif")`,
                    }}
                  >
                    <Box className="colorOverlay">
                      <h4>School Library</h4>
                      <Link to={"/sensec/facility?=library"}>
                        <button>View</button>
                      </Link>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Box
                    className="facilityCard"
                    style={{
                      backgroundImage: `url("/assets/images/home-img/field_img.avif")`,
                    }}
                  >
                    <Box className="colorOverlay">
                      <h4>Football Field</h4>
                      <Link to={"/sensec/facility?=football_field"}>
                        <button>View</button>
                      </Link>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Box
                    className="facilityCard"
                    style={{
                      backgroundImage: `url("/assets/images/home-img/canteen_img.avif")`,
                    }}
                  >
                    <Box className="colorOverlay">
                      <h4>School Canteen</h4>
                      <Link to={"/sensec/facility?=canteen"}>
                        <button>View</button>
                      </Link>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Box
                    className="facilityCard"
                    style={{
                      backgroundImage: `url("/assets/images/home-img/dom_img.avif")`,
                    }}
                  >
                    <Box className="colorOverlay">
                      <h4>Dormitories</h4>
                      <Link to={"/sensec/facility?="}>
                        <button>View</button>
                      </Link>
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
