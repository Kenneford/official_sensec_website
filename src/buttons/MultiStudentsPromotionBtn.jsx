import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useDispatch } from "react-redux";
import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";

export function MultiStudentsPromotionBtn({
  promoteMultiStudentsStatus,
  promoteMultiStudentsLoadingComplete,
  setPromoteMultiLoadingComplete,
  multiStudentsDemotionInProgress,
  setMultiStudentsPromotionInProgress,
  multiStudentsPromotionFunction,
}) {
  const dispatch = useDispatch();
  return (
    <Button
      variant="contained"
      sx={{
        mb: 1,
        bgcolor: "green",
        minWidth: "7.5rem",
        fontSize: "1rem",
        textTransform: "capitalize",
        lineHeight: "1.2rem",
        minHeight: "2.5rem",
      }}
      onClick={async (e) => {
        e.preventDefault();
        // setPromoteMultiLoadingComplete(false);
        if (!multiStudentsDemotionInProgress) {
          setMultiStudentsPromotionInProgress(true);
          dispatch(multiStudentsPromotionFunction);
        }
      }}
    >
      {promoteMultiStudentsLoadingComplete === false && (
        <Box className="promotionSpinner">
          <p>Processing</p>
          <span className="dot-ellipsis">
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </span>
        </Box>
      )}
      {promoteMultiStudentsLoadingComplete &&
        promoteMultiStudentsStatus === "success" && (
          <>
            <span>All Promoted</span> <TaskAltIcon />
          </>
        )}
      {promoteMultiStudentsLoadingComplete === null && "Promote All"}
    </Button>
  );
}

MultiStudentsPromotionBtn.propTypes = {
  promoteMultiStudentsLoadingComplete: PropTypes.bool,
  promoteMultiStudentsStatus: PropTypes.string,
  multiStudentsDemotionInProgress: PropTypes.bool,
  setMultiStudentsPromotionInProgress: PropTypes.func,
  multiStudentsPromotionFunction: PropTypes.func,
  setPromoteMultiLoadingComplete: PropTypes.func,
};
