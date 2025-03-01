import "./modals.scss";
import { Box, Button, Modal, Typography, Stack, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { CustomMenuProps, CustomTextField } from "../../muiStyling/muiStyling";
import { TaskAlt } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { dateFormatter } from "../../dateFormatter/DateFormatter";
import {
  resetUpdateSemesterStatusState,
  updateAcademicTermStatus,
} from "../../features/academics/academicTermSlice";

export default function UpdateSemesterNameModal({
  open,
  onClose,
  authAdmin,
  semesterToUpdate,
  changeSemesterName,
}) {
  const [confirmed, setConfirmed] = useState(false);

  const [semesterName, setSemesterName] = useState(
    semesterToUpdate?.name || ""
  );
  const dispatch = useDispatch();

  const canAssign = Boolean(semesterName !== semesterToUpdate?.name);
  const { updateSemesterStatus, updateSuccessMessage, error } = useSelector(
    (state) => state.academicTerm
  );

  const [updatingComplete, setUpdatingComplete] = useState(null);

  // Update Semester status
  useEffect(() => {
    if (updateSemesterStatus === "pending") {
      setUpdatingComplete(false);
    }
    if (updateSemesterStatus === "rejected") {
      setTimeout(() => {
        error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "light",
            // toastId: successId,
          })
        );
      }, 1000);
      setTimeout(() => {
        setUpdatingComplete(null);
        dispatch(resetUpdateSemesterStatusState());
      }, 2000);
      return;
    }
    if (updateSemesterStatus === "success") {
      setTimeout(() => {
        setUpdatingComplete(true);
        toast.success(updateSuccessMessage, {
          position: "top-right",
          theme: "dark",
          toastId: updateSuccessMessage,
        });
      }, 2000);
      setTimeout(() => {
        setUpdatingComplete(null);
        dispatch(resetUpdateSemesterStatusState());
        setSemesterName(semesterToUpdate?.name);
        onClose();
      }, 4000);
    }
  }, [
    updateSemesterStatus,
    error,
    onClose,
    dispatch,
    updateSuccessMessage,
    semesterToUpdate,
  ]);

  // Persist semester state
  useEffect(() => {
    if (semesterToUpdate) {
      setSemesterName(semesterToUpdate?.name);
    }
  }, [semesterToUpdate]);

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
        {confirmed && (
          <Box
            sx={{
              backgroundColor: "#fff",
              margin: ".5rem",
            }}
          >
            <Box
              className="newEmploymentModalOverlay"
              sx={{
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
                Semester Name Update
              </Typography>
              {/* {selectedLecturer && ( */}
              <Grid container spacing={3} justifyContent={"space-between"}>
                <Grid item xs={12} sm={6}>
                  <Box mt={2} className="lecturerAssignedInfos">
                    {/* <Avatar
                      sx={{
                        width: "5rem",
                        height: "5rem",
                        borderRadius: ".4rem",
                      }}
                      className="avatar"
                      src={selectedLecturer?.personalInfo?.profilePicture?.url}
                    /> */}
                    <Box className="lecturerAssignedItem">
                      <span>Semester:</span> <p>{semesterToUpdate?.name}</p>
                    </Box>
                    {/* <Box className="lecturerAssignedItem">
                      <span>Programme:</span>{" "}
                      <p>
                        {subjectProgram?.name
                          ? subjectProgram?.name
                          : subjectProgram?.divisionName}
                      </p>
                    </Box> */}
                    <Box className="lecturerAssignedItem">
                      <span>Semester Begins:</span>{" "}
                      <p>
                        {semesterToUpdate?.from
                          ? dateFormatter?.format(
                              new Date(semesterToUpdate?.from)
                            )
                          : "---"}
                      </p>
                    </Box>
                    <Box className="lecturerAssignedItem">
                      <span>Semester Ends:</span>{" "}
                      <p>
                        {semesterToUpdate?.to
                          ? dateFormatter?.format(
                              new Date(semesterToUpdate?.to)
                            )
                          : "---"}
                      </p>
                    </Box>
                    <Box className="lecturerAssignedItem">
                      <span>Current Status:</span>{" "}
                      <span style={{ color: "#248e07" }}>
                        {semesterToUpdate?.status?.includes("isCurrent") &&
                          "Current"}
                      </span>
                      <span style={{ color: "#acaf1a" }}>
                        {semesterToUpdate?.status?.includes("isNext") && "Next"}
                      </span>
                      <span style={{ color: "#565655" }}>
                        {!semesterToUpdate?.status?.includes("isCurrent") &&
                          !semesterToUpdate?.status?.includes("isNext") &&
                          "Pending"}
                      </span>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {changeSemesterName && (
                    <Box mt={2}>
                      <CustomTextField
                        fullWidth
                        name="name"
                        label="Change Semester Name"
                        value={semesterName || ""}
                        size="small"
                        onChange={(e) => setSemesterName(e?.target?.value)}
                        sx={{
                          "& .MuiInputBase-input": {
                            height: "1.2rem",
                            fontSize: ".8em",
                          },
                          "& .MuiInputLabel-root": {
                            fontSize: ".7em", // Default label size
                            transition: "font-size 0.2s, color 0.2s",
                          },
                        }}
                        slotProps={{
                          select: { MenuProps: CustomMenuProps },
                        }}
                      />
                    </Box>
                  )}
                </Grid>
              </Grid>
              {/* )} */}
              {/* Action Buttons */}
              <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: "flex-end" }}
                mt={2}
              >
                <Button
                  variant="outlined"
                  color="success"
                  size="small"
                  onClick={() => {
                    const data = {
                      changeSemesterName,
                      semesterId: semesterToUpdate?._id,
                      newSemesterName: semesterName,
                      lastUpdatedBy: authAdmin?.id,
                    };
                    console.log("semesterStatusData: ", data);

                    dispatch(updateAcademicTermStatus(data));
                  }}
                  disabled={!canAssign}
                  sx={{
                    transition: ".5s ease",
                    textTransform: "capitalize",
                    fontSize: "1em",
                    padding: "0 .5rem",
                    minWidth: "6rem",
                    height: "2rem",
                    "&:hover": {
                      backgroundColor: "green",
                      color: canAssign ? "#fff" : "",
                    },
                    backgroundColor: canAssign
                      ? "green"
                      : "transparent !important",
                    color: canAssign ? "#fff" : "",
                    "&.Mui-disabled": {
                      cursor: "not-allowed", // Show not-allowed cursor
                      pointerEvents: "auto",
                      // color: "#fff",
                    },
                  }}
                >
                  {updatingComplete === false && (
                    <Box
                      className="promotionSpinner"
                      sx={{
                        fontSize: "1em",
                      }}
                    >
                      <p>Updating</p>
                      <span className="dot-ellipsis" style={{}}>
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                      </span>
                    </Box>
                  )}
                  {updateSemesterStatus === "success" && updatingComplete && (
                    <>
                      <span>Updated</span>{" "}
                      <TaskAlt style={{ fontSize: "1.2em" }} />
                    </>
                  )}
                  {updatingComplete === null && "Update"}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => {
                    setConfirmed(false);
                    onClose();
                  }}
                  sx={{
                    transition: ".5s ease",
                    textTransform: "capitalize",
                    "&:hover": {
                      backgroundColor: "red",
                      color: "#fff",
                    },
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </Box>
          </Box>
        )}
        {!confirmed && (
          <Box sx={{ backgroundColor: "#fff", margin: ".5rem" }}>
            <Box
              className="newEmploymentModalOverlay"
              sx={{
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
              <Typography id="responsive-modal-description" sx={{ mt: 0 }}>
                Are you sure you would like to update {semesterToUpdate?.name}{" "}
                data?
              </Typography>
              {/* Action Buttons */}
              <Stack
                direction="row"
                spacing={2}
                sx={{ mt: 4, justifyContent: "flex-end" }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  color="success"
                  onClick={() => {
                    setConfirmed(true);
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
                  size="small"
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
              </Stack>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
UpdateSemesterNameModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  authAdmin: PropTypes.object,
  semesterToUpdate: PropTypes.object,
  changeSemesterName: PropTypes.bool,
};
