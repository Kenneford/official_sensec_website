import React from "react";
import "./modal.scss";
import CloseIcon from "@mui/icons-material/Close";
import Parser from "html-react-parser";
import { Box } from "@mui/material";

export default function Modal({
  open,
  onClose,
  anthemText,
  visionText,
  missionText,
  coreValuesText,
  historyText,
  whoWeAreText,
  academicExcellenceText,
  achievementText,
  anthem,
  vision,
  mission,
  coreValues,
  history,
  whoWeAre,
  academicExcellence,
  achievements,
}) {
  if (!open) return null;
  return (
    <Box className="modalOverlay">
      {/* Modal */}
      <Box className="modalCont" onClick={onClose}>
        <button
          className="closeModalIconBtn"
          title="Close"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "2%",
            left: "50%",
            transform: "translate(-50%, -2%)",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "calc(1.7rem + 1vmin)",
            width: ".7em",
            height: ".7em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CloseIcon className="closeIcon" sx={{ fontSize: ".6em" }} />
        </button>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: { minWidth: "50rem" } }, // Responsive width based on screen size
            maxWidth: { md: "50rem", lg: "50rem" },
          }}
          className="previewHistoryWrap"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/* <span className="closeModalIcon" onClick={onClose}>
            Close
          </span> */}
          <h1
            style={{
              // height: "1rem",
              position: "sticky",
              top: 0,
              backgroundColor: "#fff",
              padding: "1rem 0",
              zIndex: 3,
              margin: "1.3rem",
              fontSize: "1em",
            }}
          >
            Preview
          </h1>
          <Box
            className="previewText"
            sx={{
              fontSize: ".8em",
              color: "#696969",
              lineHeight: "1.5rem",
              width: {
                xs: "95%",
                sm: { minWidth: "50rem" },
              },
              margin: " 0 auto",
            }}
          >
            {anthem && Parser(anthemText)}
            {vision && Parser(visionText)}
            {mission && Parser(missionText)}
            {coreValues && Parser(coreValuesText)}
            {history && Parser(historyText)}
            {whoWeAre && Parser(whoWeAreText)}
            {academicExcellence && Parser(academicExcellenceText)}
            {achievements && Parser(achievementText)}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
