import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

export default function PromotionsModal({
  open,
  onClose,
  promotionFunction,
  setLoadingComplete,
  setSelectedUserToPromote,
  selectedUserToPromoteId,
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
            <p>Promote Student</p>
            <Box className="modalActionBtns">
              <button
                className="employLectBtn"
                onClick={async () => {
                  setSelectedUserToPromote(selectedUserToPromoteId);
                  if (userDataToPromote && !userDataToDemote) {
                    dispatch(promotionFunction);
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

PromotionsModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  promotionFunction: PropTypes.func,
  setLoadingComplete: PropTypes.func,
  dispatch: PropTypes.func,
  setSelectedUserToPromote: PropTypes.func,
  selectedUserToPromoteId: PropTypes.string,
  userDataToPromote: PropTypes.object,
  userDataToDemote: PropTypes.object,
};
