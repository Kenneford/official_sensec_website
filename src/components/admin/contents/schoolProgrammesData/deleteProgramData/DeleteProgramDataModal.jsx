import React from "react";
import "./deleteProgramDataModal.scss";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import Parser from "html-react-parser";
import Redirection from "../../../pageLoading/Redirection";

export default function DeleteProgramDataModal({
  open,
  onClose,
  handleProgramDeletion,
  program,
  electiveSub,
  coreSub,
  itemToDelete,
}) {
  if (!open) return null;
  return (
    <div id="deleteProgramModalOverlay">
      Modal
      <div className="teachersModalCont" onClick={onClose}>
        <div
          className="previewHistoryWrap"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/* <span className="closeModalIcon" onClick={onClose}>
            Close
          </span> */}
          <button id="closeModalIconBtn" title="Close" onClick={onClose}>
            <CloseIcon className="closeIcon" />
          </button>
          <div className="previewText">
            <div className="previewCont">
              <p>
                Are you sure you would like to delete{" "}
                <span>{itemToDelete}</span> {program && "Programme"}
                {electiveSub && "Elective Subject"}
                {coreSub && "Core Subject"}?
              </p>
              <div className="modalActionBtns">
                <button
                  className="employLectBtn"
                  onClick={() => {
                    handleProgramDeletion();
                    onClose();
                  }}
                >
                  Yes
                </button>
                <button className="employLectBtn" onClick={onClose}>
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
