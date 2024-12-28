import React from "react";
import "./whoWeAre.scss";
import { Box } from "@mui/material";
import { ContainerBox } from "../../../muiStyling/muiStyling";

export function WhoWeAre() {
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
          <h1>About Senya Senior High School</h1>
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
                <span>The Great Sensec! Forever Great!</span>
              </Box>
              <h4 id="anthem">Who We Are</h4>
              <p id="we">
                In the heart of Senya Beraku, a coastal community nestled along
                the serene shores of the Central Region of Ghana, Senya Senior
                High School stands as a citadel of education. Founded on 7th
                February 1991, Senya Senior High School, affectionately called
                Great SENSEC, has not only been a source of academic excellence
                but has also played a pivotal role in shaping the minds and
                future of countless students.
              </p>
              <h4 id="anthem">Academic Excellence</h4>
              <p id="we">
                As the years passed, SENSEC steadily gained reputation for
                academic excellence. The school’s committed faculty and staff
                worked tirelessly to provide students with well-rounded
                education that went beyond the confines of textbooks. Students
                are encouraged to explore their potential, develop critical
                thinking skills, and engage in extracurricular activities
              </p>
              <p>
                One notable aspect of Sensec’s success was its dominance in
                district-held debate competition and quizzes. The school’s
                debate team consistently displayed eloquence and analytical
                prowess, earning numerous accolades and trophies. These
                victories not only brought recognition to the school but also
                instilled a sense of pride among the students and community.
              </p>
              <p>
                In a nutshell, SENSEC has grown from modest beginnings to become
                a symbol of academic excellence. Its journey, marked by
                resilience and determination, exemplifies the transformative
                power of education. As the school continues to empower
                generations{" "}
              </p>
              <h4 id="anthem">Our Anthems</h4>
              <Box display={{ sx: "block", sm: "flex" }} gap={1}>
                {/* Anthem 1 */}
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
                {/* Anthem 2 */}
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
                    {/* Chorus */}
                    <Box width={"50%"}>
                      <h5>Chorus</h5>
                      <p>
                        Knowledge is Light (4x) <br /> Knowledge is light <br />{" "}
                        Senya Senior High <br /> Knowledge is Light <br /> So we
                        learn and work <br /> For the betterment of Mother Ghana
                      </p>
                    </Box>
                    {/* 1st Verse */}
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
                    {/* 2nd Verse */}
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
                    {/* 3rd Verse */}
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
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ContainerBox>
  );
}
