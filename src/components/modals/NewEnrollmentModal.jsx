import "./modals.scss";
import { Box, Button, Modal, Typography, Stack } from "@mui/material";
import PropTypes from "prop-types";

export default function NewEnrollmentModal({
  open,
  onClose,
  handleNewEnrollment,
  redirecting,
  uncompletedEmploymentTask,
  question,
}) {
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
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: 300, sm: 400, md: 500 }, // Responsive width based on screen size
          bgcolor: "background.paper",
          borderRadius: 2,
          //   boxShadow: 24,
          outline: "none",
        }}
      >
        <Box sx={{ backgroundColor: "#fff", margin: ".5rem" }}>
          <Box
            className="newEmploymentModalOverlay"
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
            <Typography
              id="responsive-modal-title"
              variant="h6"
              component="h2"
              textAlign={{ xs: "center", sm: "left" }}
            >
              Confirm Action
            </Typography>
            <Typography id="responsive-modal-description" sx={{ mt: 2 }}>
              {question}
            </Typography>
            {/* Action Buttons */}
            <Stack
              direction="row"
              spacing={2}
              sx={{ mt: 4, justifyContent: "flex-end" }}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={onClose}
                sx={{
                  transition: ".5s ease-out",
                  "&:hover": {
                    backgroundColor: "red",
                    color: "#fff",
                  },
                }}
              >
                No
              </Button>
              <Button
                variant="outlined"
                color="success"
                onClick={() => handleNewEnrollment()}
                sx={{
                  transition: ".5s ease-out",
                  "&:hover": {
                    backgroundColor: "green",
                    color: "#fff",
                  },
                }}
              >
                Yes
              </Button>
            </Stack>
            {redirecting && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "1rem",
                }}
              >
                <p>{uncompletedEmploymentTask}</p>
                {/* <CircularProgress style={{ color: "#555" }} size={"1.3em"} /> */}
                <span className="dot-ellipsis">
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                </span>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
NewEnrollmentModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  handleNewEnrollment: PropTypes.func,
  redirecting: PropTypes.bool,
  uncompletedEmploymentTask: PropTypes.string,
  question: PropTypes.string,
};
