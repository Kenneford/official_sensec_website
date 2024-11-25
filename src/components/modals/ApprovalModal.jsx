import React, { useEffect } from "react";
// import "./adminsmodal.scss";
import CloseIcon from "@mui/icons-material/Close";
import { Box, CircularProgress } from "@mui/material";
import Parser from "html-react-parser";
import Redirection from "../pageLoading/Redirection";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

export default function ApprovalModal({
  open,
  onClose,
  approvalFunction,
  setLoadingComplete,
  setSelectedUserToApprove,
  selectedUserToApproveId,
  userDataToApprove,
  userDataToReject,
}) {
  const dispatch = useDispatch();
  console.log(userDataToApprove);
  console.log(userDataToReject);

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
                onClick={async () => {
                  setSelectedUserToApprove(selectedUserToApproveId);
                  if (userDataToApprove && !userDataToReject) {
                    dispatch(approvalFunction);
                  }
                  onClose();
                }}
              >
                Yes
              </button>
              <button
                className="employLectBtn"
                onClick={async () => {
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

ApprovalModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  approvalFunction: PropTypes.func,
  setLoadingComplete: PropTypes.func,
  dispatch: PropTypes.func,
  setSelectedUserToApprove: PropTypes.func,
  selectedUserToApproveId: PropTypes.string,
  userDataToApprove: PropTypes.object,
  userDataToReject: PropTypes.object,
};
