import React from "react";
// import "./multiApprovalBtn.scss";
import { toast } from "react-toastify";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";
import { approveMultiEmployees } from "../features/employments/employmentSlice";
import { getAuthUser } from "../features/auth/authSlice";

export function MultiApprovalBtn({
  employees,
  approveMultiEmploymentStatus,
  approveMultiLoadingComplete,
  multiRejectionInProgress,
  setMultiApprovalInProgress,
}) {
  const authAdmin = useSelector(getAuthUser);
  const dispatch = useDispatch();
  return (
    <Button
      variant="contained"
      sx={{
        mb: 1,
        bgcolor: "green",
        // maxWidth: "7rem",
        fontSize: "1rem",
        textTransform: "capitalize",
        lineHeight: "1.2rem",
        minHeight: "3rem",
      }}
      onClick={async (e) => {
        e.preventDefault();
        if (!multiRejectionInProgress) {
          setMultiApprovalInProgress(true);
          dispatch(
            approveMultiEmployees({
              employees,
              employmentApprovedBy: `${authAdmin?.id}`,
            })
          );
        }
      }}
    >
      {approveMultiLoadingComplete === false && (
        <Box
          className="promotionSpinner"
          sx={
            {
              // marginTop: "1rem",
            }
          }
        >
          <p>Processing</p>
          <span className="dot-ellipsis">
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </span>
        </Box>
      )}
      {approveMultiLoadingComplete &&
        approveMultiEmploymentStatus === "success" && (
          <>
            <span>All Approved</span> <TaskAltIcon />
          </>
        )}
      {approveMultiLoadingComplete === null && "Approve All"}
    </Button>
  );
}

MultiApprovalBtn.propTypes = {
  employees: PropTypes.array,
  approveMultiLoadingComplete: PropTypes.bool,
  approveMultiEmploymentStatus: PropTypes.string,
  multiRejectionInProgress: PropTypes.bool,
  setMultiApprovalInProgress: PropTypes.func,
};
