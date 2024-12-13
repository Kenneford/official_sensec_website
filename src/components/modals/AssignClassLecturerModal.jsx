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
            <p>Assign Lecturer</p>
            <Box className="modalActionBtns">
              <button
                className="employLectBtn"
                onClick={async () => {
                  if (lecturerDataToAssign && !lecturerDataToRemove) {
                    setRedirect(true);
                    setTimeout(() => {
                      navigateTo(
                        `/sensec/users/${authAdminId}/admin/User_Types/Lecturers/employees/assign_class`
                      );
                    }, 3000);
                  }
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
  lecturerDataToAssign: PropTypes.object,
  lecturerDataToRemove: PropTypes.object,
};
