import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

export default function AssignClassLecturerModal({
  open,
  onClose,
  setRedirect,
  setAssignLecturerInProgress,
  navigateTo,
  authAdminId,
  // setSelectedLecturerToAssign,
  // selectedLecturerToAssignId,
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
                  setAssignLecturerInProgress(true);
                  if (lecturerDataToAssign && !lecturerDataToRemove) {
                    // setSelectedLecturerToAssign(selectedLecturerToAssignId);
                    setRedirect(true);
                    setTimeout(() => {
                      navigateTo(
                        `/sensec/users/${authAdminId}/admin/User_Types/Lecturers/employees/assign_class`
                      );
                    }, 3000);
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
                  setRedirect(false);
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

AssignClassLecturerModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  setRedirect: PropTypes.func,
  setAssignLecturerInProgress: PropTypes.func,
  navigateTo: PropTypes.func,
  authAdminId: PropTypes.string,
  dispatch: PropTypes.func,
  // setSelectedLecturerToAssign: PropTypes.func,
  // selectedLecturerToAssignId: PropTypes.string,
  lecturerDataToAssign: PropTypes.object,
  lecturerDataToRemove: PropTypes.object,
};
