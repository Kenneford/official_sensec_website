import React from "react";
// import "./adminsmodal.scss";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import Parser from "html-react-parser";
import Redirection from "../pageLoading/Redirection";

export default function ApproveEmploymentModal({
  open,
  onClose,
  approveEmploymentmentFunction,
  setLoadingComplete,
  dispatch,
  setCurrentUser,
  currentUserId,
}) {
  if (!open) return null;
  return (
    <div className="employmentModalOverlay">
      <div className="employmentModalCont" onClick={onClose}>
        <div
          className="previewHistoryWrap"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="previewCont">
            <p>Approve Employment</p>
            <div className="modalActionBtns">
              <button
                className="employLectBtn"
                onClick={() => {
                  setCurrentUser(currentUserId);
                  dispatch(approveEmploymentmentFunction);
                  onClose();
                }}
              >
                Yes
              </button>
              <button
                className="employLectBtn"
                onClick={() => {
                  setLoadingComplete(null);
                  onClose();
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
