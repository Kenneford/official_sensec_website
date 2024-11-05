import React from "react";
// import "./adminsmodal.scss";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import Parser from "html-react-parser";
import Redirection from "../pageLoading/Redirection";
import PropTypes from "prop-types";

export default function RejectEnrollmentModal({
  open,
  onClose,
  rejectionFunction,
  setLoadingComplete,
  dispatch,
  setUserToReject,
  currentStudent,
  rejectAction,
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
            <p>{rejectAction}</p>
            <div className="modalActionBtns">
              <button
                className="employLectBtn"
                onClick={() => {
                  setUserToReject(currentStudent);
                  // dispatch(rejectionFunction);
                  onClose();
                  setLoadingComplete(false);
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

RejectEnrollmentModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  rejectionFunction: PropTypes.func,
  setLoadingComplete: PropTypes.func,
  dispatch: PropTypes.func,
  setUserToReject: PropTypes.func,
  currentStudent: PropTypes.string,
  rejectAction: PropTypes.string,
};
