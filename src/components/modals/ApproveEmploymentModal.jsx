import React, { useEffect } from "react";
// import "./adminsmodal.scss";
import CloseIcon from "@mui/icons-material/Close";
import { Box, CircularProgress } from "@mui/material";
import Parser from "html-react-parser";
import Redirection from "../pageLoading/Redirection";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

export default function ApproveEmploymentModal({
  open,
  onClose,
  approveEmploymentFunction,
  setLoadingComplete,
  setCurrentUser,
  currentUserId,
  employeeToApprove,
  employeeToReject,
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
            <p>Approve Employment</p>
            <Box className="modalActionBtns">
              <button
                className="employLectBtn"
                onClick={() => {
                  setCurrentUser(currentUserId);
                  if (employeeToApprove && !employeeToReject) {
                    dispatch(approveEmploymentFunction);
                    // setLoadingComplete(false);
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
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

ApproveEmploymentModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  approveEmploymentFunction: PropTypes.func,
  setLoadingComplete: PropTypes.func,
  dispatch: PropTypes.func,
  setCurrentUser: PropTypes.func,
  currentUserId: PropTypes.string,
  employeeToApprove: PropTypes.object,
  employeeToReject: PropTypes.object,
};
