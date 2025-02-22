import React from "react";
import "./modal.scss";
import CloseIcon from "@mui/icons-material/Close";
import Parser from "html-react-parser";

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
    <div className="modalOverlay">
      Modal
      <div className="modalCont" onClick={onClose}>
        <div
          className="previewHistoryWrap"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/* <span className="closeModalIcon" onClick={onClose}>
            Close
          </span> */}
          <button className="closeModalIconBtn" title="Close" onClick={onClose}>
            <CloseIcon className="closeIcon" />
          </button>
          <h1>Preview</h1>
          <div className="previewText">
            {anthem && Parser(anthemText)}
            {vision && Parser(visionText)}
            {mission && Parser(missionText)}
            {coreValues && Parser(coreValuesText)}
            {history && Parser(historyText)}
            {whoWeAre && Parser(whoWeAreText)}
            {academicExcellence && Parser(academicExcellenceText)}
            {achievements && Parser(achievementText)}
          </div>
        </div>
      </div>
    </div>
  );
}
