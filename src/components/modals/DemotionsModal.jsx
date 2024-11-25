import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

export default function DemotionsModal({
  open,
  onClose,
  promotionFunction,
  setLoadingComplete,
  setSelectedUserToDemote,
  selectedUserToDemoteId,
  userDataToPromote,
  userDataToDemote,
}) {
  const dispatch = useDispatch();
  console.log(userDataToPromote);
  console.log(userDataToDemote);

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
            <p>Demote Student</p>
            <Box className="modalActionBtns">
              <button
                className="employLectBtn"
                onClick={async () => {
                  setSelectedUserToDemote(selectedUserToDemoteId);
                  setLoadingComplete(false);
                  if (userDataToPromote && !userDataToDemote) {
                    // dispatch(promotionFunction);
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

DemotionsModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  promotionFunction: PropTypes.func,
  setLoadingComplete: PropTypes.func,
  setSelectedUserToDemote: PropTypes.func,
  selectedUserToDemoteId: PropTypes.string,
  userDataToPromote: PropTypes.object,
  userDataToDemote: PropTypes.object,
};
