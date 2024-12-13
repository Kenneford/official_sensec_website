import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

export default function RemoveClassLecturerModal({
  open,
  onClose,
  removeClassLecturerFunction,
  setLoadingComplete,
  setSelectedLecturerToRemove,
  selectedLecturerToRemoveId,
  lecturerDataToAssign,
  lecturerDataToRemove,
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
            <p>Assign Student</p>
            <Box className="modalActionBtns">
              <button
                className="employLectBtn"
                onClick={async () => {
                  setSelectedLecturerToRemove(selectedLecturerToRemoveId);
                  if (lecturerDataToAssign && !lecturerDataToRemove) {
                    dispatch(removeClassLecturerFunction);
                  }
                  // setLoadingComplete(false);
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

RemoveClassLecturerModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  removeClassLecturerFunction: PropTypes.func,
  setLoadingComplete: PropTypes.func,
  dispatch: PropTypes.func,
  setSelectedLecturerToRemove: PropTypes.func,
  selectedLecturerToRemoveId: PropTypes.string,
  lecturerDataToAssign: PropTypes.object,
  lecturerDataToRemove: PropTypes.object,
};
