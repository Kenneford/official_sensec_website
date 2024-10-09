import { Box } from "@mui/material";
import "./homeProgrammeSection.scss";
import { motion } from "framer-motion";
import { HashLink } from "react-router-hash-link";
import { ContainerBox } from "../../../muiStyling/muiStyling";

export function HomeProgrammeSection() {
  const animate = {
    off: { x: -200, opacity: 0 },
    on: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <Box
      component="div"
      className="programmeSectionWrap"
      sx={{ width: "100%", backgroundColor: "#3e3e3e", color: "#cccc" }}
    >
      <ContainerBox
        sx={{
          width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
          margin: "auto",
          paddingTop: "2rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>Featured Programmes</h1>
        <Box component="div" className="programmeCardWrap">
          <Box component="div" className="programmeCard">
            <span className="catIcon">
              <img src="/assets/sensec-logo1.png" alt="" className="catImg" />
            </span>
            <h5>Business</h5>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis
              quidem
            </p>
          </Box>
          <Box component="div" className="programmeCard">
            <span className="catIcon">
              <img src="/assets/sensec-logo1.png" alt="" className="catImg" />
            </span>
            <h5>Business</h5>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis
              quidem
            </p>
          </Box>
          <Box component="div" className="programmeCard">
            <span className="catIcon">
              <img src="/assets/sensec-logo1.png" alt="" className="catImg" />
            </span>
            <h5>Business</h5>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis
              quidem
            </p>
          </Box>
          <Box component="div" className="programmeCard">
            <span className="catIcon">
              <img src="/assets/sensec-logo1.png" alt="" className="catImg" />
            </span>
            <h5>Business</h5>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis
              quidem
            </p>
          </Box>
          <Box component="div" className="programmeCard">
            <span className="catIcon">
              <img src="/assets/sensec-logo1.png" alt="" className="catImg" />
            </span>
            <h5>Business</h5>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis
              quidem
            </p>
          </Box>
          <Box component="div" className="programmeCard">
            <span className="catIcon">
              <img src="/assets/sensec-logo1.png" alt="" className="catImg" />
            </span>
            <h5>Business</h5>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis
              quidem
            </p>
          </Box>
        </Box>
        {/* <Box component="div" className="secWrap">
          <Box component="div" className="secContainer">
            <motion.h1 initial={"off"} whileInView={"on"} variants={animate}>
              Featured Programmes
            </motion.h1>
            <Box component="div" className="programmeCardWrap">
              <Box component="div" className="programmeCard">
                <span className="catIcon">
                  <img
                    src="/assets/sensec-logo1.png"
                    alt=""
                    className="catImg"
                  />
                </span>
                <h5>Business</h5>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis
                  quidem
                </p>
              </Box>
              <Box component="div" className="programmeCard">
                <span className="catIcon">
                  <img
                    src="/assets/sensec-logo1.png"
                    alt=""
                    className="catImg"
                  />
                </span>
                <h5>Business</h5>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis
                  quidem
                </p>
              </Box>
              <Box component="div" className="programmeCard">
                <span className="catIcon">
                  <img
                    src="/assets/sensec-logo1.png"
                    alt=""
                    className="catImg"
                  />
                </span>
                <h5>Business</h5>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis
                  quidem
                </p>
              </Box>
              <Box component="div" className="programmeCard">
                <span className="catIcon">
                  <img
                    src="/assets/sensec-logo1.png"
                    alt=""
                    className="catImg"
                  />
                </span>
                <h5>Business</h5>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis
                  quidem
                </p>
              </Box>
              <Box component="div" className="programmeCard">
                <span className="catIcon">
                  <img
                    src="/assets/sensec-logo1.png"
                    alt=""
                    className="catImg"
                  />
                </span>
                <h5>Business</h5>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis
                  quidem
                </p>
              </Box>
              <Box component="div" className="programmeCard">
                <span className="catIcon">
                  <img
                    src="/assets/sensec-logo1.png"
                    alt=""
                    className="catImg"
                  />
                </span>
                <h5>Business</h5>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis
                  quidem
                </p>
              </Box>
            </Box>
            <Box component="div" className="secContent">
              <motion.div className="secRight">
                <Box
                  component="img"
                  className="homeImg"
                  src="https://images.unsplash.com/photo-1603322327561-68aa78fb96bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Sample"
                  sx={{
                    width: "30rem",
                    marginRight: 2,
                    marginBottom: 2,
                    float: "left",
                  }}
                />
              </motion.div>
              <motion.div
                className="secLeft"
                initial={"off"}
                whileInView={"on"}
                variants={animate}
              >
                <motion.p>
                  In the heart of Senya Beraku, a coastal community nestled
                  along the serene shores of the Central Region of Ghana, Senya
                  Senior High School stands as a citadel of education. Founded
                  on 7th February 1991, Senya Senior High School, affectionately
                  called Great SENSEC, has not only been a source of academic
                  excellence but has also played a pivotal role in shaping the
                  minds and future of countless students.
                </motion.p>
                <HashLink to={"/sensec/about#about"} smooth>
                  <motion.button className="startBtn">Learn More</motion.button>
                </HashLink>
              </motion.div>
            </Box>
          </Box>
        </Box> */}
      </ContainerBox>
    </Box>
  );
}
