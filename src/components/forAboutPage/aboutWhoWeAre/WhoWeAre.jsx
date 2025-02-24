import React from "react";
import "./whoWeAre.scss";
import { Box } from "@mui/material";
import { ContainerBox } from "../../../muiStyling/muiStyling";
import { FetchSensecSchoolData } from "../../../data/blogs/FetchSensecSchoolData";
import Parser from "html-react-parser";

export function WhoWeAre() {
  const sensecSchoolData = FetchSensecSchoolData();

  return (
    <ContainerBox
      sx={{
        width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
        margin: "auto",
        padding: { xs: "1rem .5rem", sm: "2rem 1rem" },
      }}
    >
      <Box component="div" className="weWrap">
        <Box component="div" className="weCont">
          <h1>About {sensecSchoolData[0]?.nameOfSchool}</h1>
          <Box className="aboutContent">
            <Box className="aboutRight">
              <Box
                component="img"
                className="aboutSectionImg"
                src="https://plus.unsplash.com/premium_photo-1680807868978-2dc0da7e0284?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                alt="Sample"
                sx={{
                  width: "30rem",
                  marginRight: 2,
                  marginBottom: 2,
                }}
              />
            </Box>
            <Box className="aboutUsLeft">
              {/* <h2>About Senya Senior High School</h2> */}
              <Box className="salutation">
                <h4 className="title">Salutation</h4>
                <span>{sensecSchoolData[0]?.greetings}</span>
              </Box>
              <h4 id="anthem">Who We Are</h4>
              <Box id="we">{Parser(`${sensecSchoolData[0]?.whoWeAre}`)}</Box>
              <h4 id="anthem">Academic Excellence</h4>
              <Box id="we">
                {Parser(`${sensecSchoolData[0]?.academicExcellence}`)}
              </Box>
              <h4 id="anthem">Our Anthems</h4>
              <Box gap={1}>
                {Parser(`${sensecSchoolData[0]?.anthems}`)}
                {/* Anthem 1
                <Box flex={1}>
                  <Box sx={{ mb: "1rem" }}>
                    <span
                      style={{
                        marginBottom: "3rem",
                        fontStyle: "italic",
                        fontWeight: "600",
                        color: "#8c5006",
                      }}
                    >
                      Anthem 1
                    </span>
                  </Box>
                  <p style={{}}>
                    Awake from the slumber of gloom <br /> And follow the flock
                    to search <br />
                    The light that bring fortune and prosperity <br /> With
                    heart and mind <br /> With heart and mind in good tune{" "}
                    <br /> Sow a spirit aspiring high <br /> We preserve to
                    embrace <br /> The true knowledge that brings forth light
                  </p>
                </Box>
                Anthem 2
                <Box flex={1.5}>
                  <Box sx={{ mb: "1rem" }}>
                    <span
                      style={{
                        marginBottom: "3rem",
                        fontStyle: "italic",
                        fontWeight: "600",
                        color: "#8c5006",
                      }}
                    >
                      Anthem 2
                    </span>
                  </Box>
                  <Box
                    display={{ sx: "block", sm: "flex" }}
                    justifyContent={{ sm: "space-between" }}
                    gap={1}
                  >
                    Chorus
                    <Box width={"50%"}>
                      <h5>Chorus</h5>
                      <p>
                        Knowledge is Light (4x) <br /> Knowledge is light <br />{" "}
                        Senya Senior High <br /> Knowledge is Light <br /> So we
                        learn and work <br /> For the betterment of Mother Ghana
                      </p>
                    </Box>
                    1st Verse
                    <Box width={"50%"}>
                      <h5>1st Verse</h5>
                      <p>
                        We have the mind of Christ <br /> We walk the path of
                        life <br /> With discipline, unity and love <br /> Hail
                        Great SENSEC with pride
                      </p>
                    </Box>
                  </Box>
                  <Box
                    display={{ sx: "block", sm: "flex" }}
                    gap={1}
                    justifyContent={{ sm: "space-between" }}
                  >
                    2nd Verse
                    <Box width={"50%"}>
                      <h5>2nd Verse</h5>
                      <p>
                        Uphold your destiny
                        <br /> Be found among the best
                        <br /> Hard work, honesty
                        <br />
                        On this life journey
                        <br /> Cloud your dreams for greatness
                      </p>
                    </Box>
                    3rd Verse
                    <Box width={"50%"}>
                      <h5>3rd Verse</h5>
                      <p>
                        No other can compare
                        <br /> SENSEC the legend’s land
                        <br /> The stars our dream
                        <br /> No distance too far
                        <br /> We’ll always be the best
                      </p>
                    </Box>
                  </Box>
                </Box> */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ContainerBox>
  );
}
