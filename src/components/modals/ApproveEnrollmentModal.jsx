import React from "react";
// import "./adminsmodal.scss";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import Parser from "html-react-parser";
import Redirection from "../pageLoading/Redirection";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

export default function ApproveEnrollmentModal({
  open,
  onClose,
  approveEnrollmentFunction,
  setLoadingComplete,
  setCurrentStudent,
  currentStudentId,
  studentToApprove,
  studentToReject,
}) {
  const dispatch = useDispatch();
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
            <p>Approve Enrollment</p>
            <div className="modalActionBtns">
              <button
                className="employLectBtn"
                onClick={() => {
                  setCurrentStudent(currentStudentId);
                  if (studentToApprove && !studentToReject) {
                    dispatch(approveEnrollmentFunction);
                    setLoadingComplete(false);
                  }
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

ApproveEnrollmentModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  approveEnrollmentFunction: PropTypes.func,
  setLoadingComplete: PropTypes.func,
  dispatch: PropTypes.func,
  setCurrentStudent: PropTypes.func,
  currentStudentId: PropTypes.string,
  studentToApprove: PropTypes.object,
  studentToReject: PropTypes.object,
};
