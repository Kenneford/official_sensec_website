import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useDispatch } from "react-redux";
import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";

export function MultiStudentsDemotionBtn({
  demoteMultiStudentsStatus,
  demoteMultiStudentsLoadingComplete,
  setDemoteMultiLoadingComplete,
  multiStudentsPromotionInProgress,
  setMultiStudentsDemotionInProgress,
  multiStudentsDemotionFunction,
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
        if (!multiStudentsPromotionInProgress) {
          setDemoteMultiLoadingComplete(false);
          setMultiStudentsDemotionInProgress(true);
          dispatch(multiStudentsDemotionFunction);
        }
      }}
    >
      {demoteMultiStudentsLoadingComplete === false && (
        <Box className="promotionSpinner">
          <p>Processing</p>
          <span className="dot-ellipsis">
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </span>
        </Box>
      )}
      {demoteMultiStudentsLoadingComplete === true &&
        demoteMultiStudentsStatus === "success" && (
          <>
            <span>All Demoted</span> <TaskAltIcon />
          </>
        )}
      {demoteMultiStudentsLoadingComplete === null && "Demote All"}
    </Button>
  );
}

MultiStudentsDemotionBtn.propTypes = {
  demoteMultiStudentsLoadingComplete: PropTypes.bool,
  multiStudentsPromotionInProgress: PropTypes.bool,
  demoteMultiStudentsStatus: PropTypes.string,
  setMultiStudentsDemotionInProgress: PropTypes.func,
  multiStudentsDemotionFunction: PropTypes.func,
  setDemoteMultiLoadingComplete: PropTypes.func,
};
