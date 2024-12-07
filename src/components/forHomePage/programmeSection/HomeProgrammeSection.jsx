import { Box } from "@mui/material";
import "./homeProgrammeSection.scss";
import { motion } from "framer-motion";
import { HashLink } from "react-router-hash-link";
import { ContainerBox } from "../../../muiStyling/muiStyling";
import { FetchAllProgrammes } from "../../../data/programme/FetchProgrammeData";

export function HomeProgrammeSection() {
  const allProgrammes = FetchAllProgrammes();
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
          {allProgrammes?.map((program) => (
            <Box key={program?._id} component="div" className="programmeCard">
              <span className="catIcon">
                <img src="/assets/sensec-logo1.png" alt="" className="catImg" />
              </span>
              <h5>{program?.name}</h5>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis
                quidem
              </p>
            </Box>
          ))}
        </Box>
      </ContainerBox>
    </Box>
  );
}
