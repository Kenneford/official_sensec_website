import React from "react";
// import "./adminsmodal.scss";
import CloseIcon from "@mui/icons-material/Close";
import { Box, CircularProgress } from "@mui/material";
import Parser from "html-react-parser";
import Redirection from "../pageLoading/Redirection";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

export default function EnrollmentRejectionModal({
  open,
  onClose,
  //   rejectionFunction,
  setLoadingComplete,
  setUserToReject,
  currentStudentId,
  studentToApprove,
  studentToReject,
}) {
  const dispatch = useDispatch();
  if (!open) return null;
  return (
    <Box className="employmentModalOverlay">
      <Box className="employmentModalCont" onClick={onClose}>
        <Box
          className="previewHistoryWrap"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Box className="previewCont">
            <p>Reject Enrollment</p>
            <Box className="modalActionBtns">
              <button
                className="employLectBtn"
                onClick={(e) => {
                  e.preventDefault();
                  setUserToReject(currentStudentId);
                  if (studentToReject && !studentToApprove) {
                    // dispatch(rejectionFunction);
                    setLoadingComplete(false);
                  }
                  onClose();
                }}
              >
                Yes
              </button>
              <button
                className="employLectBtn"
                onClick={(e) => {
                  e.preventDefault();
                  setLoadingComplete(null);
                  onClose();
                }}
              >
                No
              </button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

EnrollmentRejectionModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  rejectionFunction: PropTypes.func,
  setLoadingComplete: PropTypes.func,
  dispatch: PropTypes.func,
  setUserToReject: PropTypes.func,
  currentStudentId: PropTypes.string,
  studentToApprove: PropTypes.object,
  studentToReject: PropTypes.object,
};
