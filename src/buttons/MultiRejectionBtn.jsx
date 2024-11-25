import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useDispatch } from "react-redux";
import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";

export function MultiRejectionBtn({
  rejectMultiUsersDataStatus,
  rejectMultiUsersDataLoadingComplete,
  multiUsersDataApprovalInProgress,
  setMultiUsersDataRejectionInProgress,
  multiUsersDataApprovalFunction,
}) {
  const dispatch = useDispatch();
  return (
    <Button
      variant="contained"
      sx={{
        mb: 1,
        bgcolor: "red",
        minWidth: "7.5rem",
        fontSize: "1rem",
        textTransform: "capitalize",
        lineHeight: "1.2rem",
        minHeight: "2.5rem",
      }}
      onClick={async (e) => {
        e.preventDefault();
        if (!multiUsersDataApprovalInProgress) {
          setMultiUsersDataRejectionInProgress(true);
          dispatch(multiUsersDataApprovalFunction);
        }
      }}
    >
      {rejectMultiUsersDataLoadingComplete === false && (
        <Box className="promotionSpinner">
          <p>Processing</p>
          <span className="dot-ellipsis">
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </span>
        </Box>
      )}
      {rejectMultiUsersDataLoadingComplete === true &&
        rejectMultiUsersDataStatus === "success" && (
          <>
            <span>All Rejected</span> <TaskAltIcon />
          </>
        )}
      {rejectMultiUsersDataLoadingComplete === null && "Reject All"}
    </Button>
  );
}

MultiRejectionBtn.propTypes = {
  rejectMultiUsersDataLoadingComplete: PropTypes.bool,
  multiUsersDataApprovalInProgress: PropTypes.bool,
  rejectMultiUsersDataStatus: PropTypes.string,
  setMultiUsersDataRejectionInProgress: PropTypes.func,
  multiUsersDataApprovalFunction: PropTypes.func,
};
