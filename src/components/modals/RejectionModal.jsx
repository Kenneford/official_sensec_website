import React from "react";
// import "./adminsmodal.scss";
import CloseIcon from "@mui/icons-material/Close";
import { Box, CircularProgress } from "@mui/material";
import Parser from "html-react-parser";
import Redirection from "../pageLoading/Redirection";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

export default function RejectionModal({
  open,
  onClose,
  rejectionFunction,
  setLoadingComplete,
  setSelectedUserToReject,
  selectedUserToRejectId,
  userDataToApprove,
  userDataToReject,
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
            <p>Reject Employment</p>
            <Box className="modalActionBtns">
              <button
                className="employLectBtn"
                onClick={async (e) => {
                  e.preventDefault();
                  setSelectedUserToReject(selectedUserToRejectId);
                  if (userDataToReject && !userDataToApprove) {
                    dispatch(rejectionFunction);
                  }
                  onClose();
                }}
              >
                Yes
              </button>
              <button
                className="employLectBtn"
                onClick={async (e) => {
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

RejectionModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  rejectionFunction: PropTypes.func,
  setLoadingComplete: PropTypes.func,
  dispatch: PropTypes.func,
  setSelectedUserToReject: PropTypes.func,
  selectedUserToRejectId: PropTypes.string,
  userDataToApprove: PropTypes.object,
  userDataToReject: PropTypes.object,
};
