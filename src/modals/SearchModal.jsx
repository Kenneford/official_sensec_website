import { Box, Modal } from "@mui/material";
import PropTypes from "prop-types";
import PublicSearchForm from "../components/searchForm/PublicSearchForm";

export function SearchModal({ open, onClose }) {
  if (!open) return null;
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-modal-title"
      aria-describedby="responsive-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95%", sm: 600, md: 700 }, // Responsive width based on screen size
          bgcolor: "background.paper",
          borderRadius: 2,
          //   boxShadow: 24,
          outline: "none",
        }}
      >
        <Box>
          <PublicSearchForm handleEscapeKey={onClose} />
          <Box
            sx={{
              //   position: "absolute",
              //   top: "50%",
              //   left: "50%",
              //   transform: "translate(-50%, -50%)",
              //   width: { xs: 300, sm: 400, md: 500 }, // Responsive width based on screen size
              //   bgcolor: "background.paper",
              //   borderRadius: 2,
              // boxShadow: 24,
              //   outline: "none",
              padding: { xs: 1, sm: 2 },
            }}
          >
            {/* Modal Content */}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
SearchModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  handleNewEnrollment: PropTypes.func,
  redirecting: PropTypes.bool,
  uncompletedEmploymentTask: PropTypes.string,
  question: PropTypes.string,
};
