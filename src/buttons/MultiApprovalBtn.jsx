import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useDispatch } from "react-redux";
import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";

export function MultiApprovalBtn({
  approveMultiUsersDataStatus,
  approveMultiUsersDataLoadingComplete,
  multiUsersDataRejectionInProgress,
  setMultiUsersDataApprovalInProgress,
  multiUsersDataApprovalFunction,
}) {
  const dispatch = useDispatch();
  return (
    <Button
      variant="contained"
      sx={{
        mb: 1,
        bgcolor: "green",
        // minWidth: "7.5rem",
        fontSize: ".7em",
        textTransform: "capitalize",
        lineHeight: "1.2rem",
        // minHeight: "2rem",
        letterSpacing: 1,
        fontWeight: "400",
      }}
      onClick={async (e) => {
        e.preventDefault();
        if (!multiUsersDataRejectionInProgress) {
          setMultiUsersDataApprovalInProgress(true);
          dispatch(multiUsersDataApprovalFunction);
        }
      }}
    >
      {approveMultiUsersDataLoadingComplete === false && (
        <Box className="promotionSpinner">
          <p>Processing</p>
          <span className="dot-ellipsis">
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </span>
        </Box>
      )}
      {approveMultiUsersDataLoadingComplete &&
        approveMultiUsersDataStatus === "success" && (
          <>
            <span>All Approved</span> <TaskAltIcon />
          </>
        )}
      {approveMultiUsersDataLoadingComplete === null && "Approve All"}
    </Button>
  );
}

MultiApprovalBtn.propTypes = {
  approveMultiUsersDataLoadingComplete: PropTypes.bool,
  approveMultiUsersDataStatus: PropTypes.string,
  multiUsersDataRejectionInProgress: PropTypes.bool,
  setMultiUsersDataApprovalInProgress: PropTypes.func,
  multiUsersDataApprovalFunction: PropTypes.func,
};
