import React from "react";
// import "./adminsmodal.scss";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import Parser from "html-react-parser";
import Redirection from "../pageLoading/Redirection";
import PropTypes from "prop-types";

export default function ApproveEmploymentModal({
  open,
  onClose,
  approveEmploymentFunction,
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
                  dispatch(approveEmploymentFunction);
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

ApproveEmploymentModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  approveEmploymentFunction: PropTypes.func,
  setLoadingComplete: PropTypes.func,
  dispatch: PropTypes.func,
  setCurrentUser: PropTypes.func,
  currentStudentId: PropTypes.string,
  rejectAction: PropTypes.string,
};
