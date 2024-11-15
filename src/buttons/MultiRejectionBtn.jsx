import React from "react";
// import "./multiApprovalBtn.scss";
import { toast } from "react-toastify";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import { rejectMultiEmployees } from "../features/employments/employmentSlice";
import { getAuthUser } from "../features/auth/authSlice";
import PropTypes from "prop-types";

export function MultiRejectionBtn({
  employees,
  rejectMultiEmploymentStatus,
  rejectMultiLoadingComplete,
  multiApprovalInProgress,
  setMultiRejectionInProgress,
}) {
  const authAdmin = useSelector(getAuthUser);
  const dispatch = useDispatch();
  return (
    <Button
      variant="contained"
      sx={{
        mb: 1,
        bgcolor: "red",
        fontSize: { xs: ".8rem", sm: "1rem" },
        textTransform: "capitalize",
        lineHeight: "1.2rem",
        minHeight: "3rem",
      }}
      onClick={async (e) => {
        e.preventDefault();
        if (!multiApprovalInProgress) {
          setMultiRejectionInProgress(true);
          dispatch(
            rejectMultiEmployees({
              employees,
              employmentRejectedBy: `${authAdmin?.id}`,
            })
          );
        }
      }}
    >
      {rejectMultiLoadingComplete === false && (
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
      {rejectMultiLoadingComplete === true &&
        rejectMultiEmploymentStatus === "success" && (
          <>
            <span>All Rejected</span> <TaskAltIcon />
          </>
        )}
      {rejectMultiLoadingComplete === null && "Reject All"}
    </Button>
  );
}

MultiRejectionBtn.propTypes = {
  employees: PropTypes.array,
  rejectMultiLoadingComplete: PropTypes.bool,
  multiApprovalInProgress: PropTypes.bool,
  rejectMultiEmploymentStatus: PropTypes.string,
  setMultiRejectionInProgress: PropTypes.func,
};
