import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

export default function RemoveClassLecturerModal({
  open,
  onClose,
  removeClassLecturerFunction,
  setLoadingComplete,
  setSelectedLecturerToRemove,
  selectedLecturerToAssignId,
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
            <p>Remove Lecturer</p>
            <Box className="modalActionBtns">
              <button
                className="employLectBtn"
                onClick={async () => {
                  setSelectedLecturerToRemove(selectedLecturerToAssignId);
                  if (lecturerDataToRemove && !lecturerDataToAssign) {
                    dispatch(removeClassLecturerFunction);
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

RemoveClassLecturerModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  removeClassLecturerFunction: PropTypes.func,
  setLoadingComplete: PropTypes.func,
  setSelectedLecturerToRemove: PropTypes.func,
  selectedLecturerToAssignId: PropTypes.string,
  lecturerDataToAssign: PropTypes.object,
  lecturerDataToRemove: PropTypes.object,
};
