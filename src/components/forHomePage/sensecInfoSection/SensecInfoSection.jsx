import { Box } from "@mui/material";
import "./sensecInfoSection.scss";
import { motion } from "framer-motion";
import { HashLink } from "react-router-hash-link";
import { ContainerBox } from "../../../muiStyling/muiStyling";

export function SensecInfoSection() {
  const animate = {
    off: { x: -200, opacity: 0 },
    on: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <ContainerBox
      sx={{
        width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
        margin: "auto",
        padding: { xs: "1rem .5rem", sm: "2rem 1rem" },
      }}
    >
      <Box component="div" className="secWrap">
        <Box component="div" className="secContainer">
          <motion.h1 initial={"off"} whileInView={"on"} variants={animate}>
            A Perfect School For All
          </motion.h1>
          <Box component="div" className="secContent">
            <motion.div className="secRight">
              <Box
                component="img"
                className="homeImg"
                src="https://images.unsplash.com/photo-1536337005238-94b997371b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80" // Replace with your image URL
                alt="Sample"
                sx={{
                  width: "30rem",
                  marginRight: 2,
                  marginBottom: 2,
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
                In the heart of Senya Beraku, a coastal community nestled along
                the serene shores of the Central Region of Ghana, Senya Senior
                High School stands as a citadel of education. Founded on 7th
                February 1991, Senya Senior High School, affectionately called
                Great SENSEC, has not only been a source of academic excellence
                but has also played a pivotal role in shaping the minds and
                future of countless students.
              </motion.p>
              <motion.p>
                During its early years, the school faced numerous challenges,
                from inadequate infrastructure to limited resources. However,
                the determination and dedication of the founding team, along
                with support from the local community, ensured that SENSEC
                continued to grow and flourish.
              </motion.p>
              <HashLink to={"/sensec/about#about"} smooth>
                <motion.button className="startBtn">Learn More</motion.button>
              </HashLink>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </ContainerBox>
  );
}
