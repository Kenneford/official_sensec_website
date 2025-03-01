import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteAcademicTerm } from "../../features/academics/academicTermSlice";

export default function DeleteSemesterModal({
  open,
  onClose,
  semesterToDelete,
  //   authAdmin,
}) {
  const dispatch = useDispatch();
  if (!open) return null;
  return (
    <Modal
      open={open}
      // onClose={!confirmed ? onClose : ""}
      aria-labelledby="responsive-modal-title"
      aria-describedby="responsive-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "75%", sm: { minWidth: "40rem" } }, // Responsive width based on screen size
          maxWidth: { md: "40rem", lg: "40rem" }, // Responsive width based on screen size
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
            {semesterToDelete && (
              <Typography
                id="responsive-modal-description"
                // sx={{ mt: 1 }}
                textAlign={{ xs: "center", sm: "left" }}
              >
                Are you sure you would like to{" "}
                <span style={{ color: "#c00909" }}>delete</span>{" "}
                <span style={{ fontWeight: 500 }}>
                  &quot;{semesterToDelete?.name}&quot;
                </span>{" "}
                data ?
              </Typography>
            )}
            {/* Action Buttons */}
            <Stack
              direction="row"
              spacing={2}
              textAlign={{ xs: "center", sm: "left" }}
              sx={{
                mt: 2,
                justifyContent: { xs: "center", sm: "flex-end" },
              }}
            >
              <Button
                variant="outlined"
                color="success"
                size="small"
                onClick={() => {
                  if (semesterToDelete) {
                    const data = {
                      semesterId: semesterToDelete?._id,
                    };
                    dispatch(deleteAcademicTerm(data));
                  }
                  onClose();
                }}
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
              <Button
                variant="outlined"
                color="error"
                size="small"
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
            </Stack>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

DeleteSemesterModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  semesterToDelete: PropTypes.object,
  authAdmin: PropTypes.object,
};
