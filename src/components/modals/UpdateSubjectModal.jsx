import "./modals.scss";
import { Box, Button, Modal, Typography, Stack, Grid } from "@mui/material";
import PropTypes from "prop-types";
import {
  fetchAllSubjects,
  resetUpdateSubjectState,
  updateSubject,
} from "../../features/academics/subjectsSlice";
import { useEffect, useState } from "react";
import { CustomTextField } from "../../muiStyling/muiStyling";
import { TaskAlt } from "@mui/icons-material";
import { FetchAllFlattenedProgrammes } from "../../data/programme/FetchProgrammeData";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllApprovedStudents } from "../../data/students/FetchAllStudents";
import { toast } from "react-toastify";
import {
  fetchAllProgrammes,
  fetchAllProgrammeStudents,
  getAllProgrammeStudents,
  resetUpdateProgramState,
  updateProgram,
} from "../../features/academics/programmeSlice";
import {
  FetchAllLecturers,
  FetchProgrammeLecturers,
} from "../../data/lecturers/FetchLecturers";

export default function UpdateSubjectModal({
  open,
  onClose,
  authAdmin,
  subject,
  programme,
}) {
  const allLecturers = FetchProgrammeLecturers(programme?._id);
  const allProgrammeStudents = useSelector(getAllProgrammeStudents);
  const [confirmed, setConfirmed] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [programName, setProgramName] = useState("");
  const dispatch = useDispatch();

  const canAssign = Boolean(subjectName || programName);
  const { updateStatus, error } = useSelector((state) => state.subject);
  const { updateProgramStatus, updateProgramError } = useSelector(
    (state) => state.programme
  );

  const [updatingComplete, setUpdatingComplete] = useState(null);

  // Update Subject status
  useEffect(() => {
    if (updateStatus === "pending") {
      setUpdatingComplete(false);
    }
    if (updateStatus === "rejected") {
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
        setSubjectName("");
        dispatch(resetUpdateSubjectState());
      }, 2000);
      return;
    }
    if (updateStatus === "success") {
      setTimeout(() => {
        setUpdatingComplete(true);
      }, 2000);
      setTimeout(() => {
        setUpdatingComplete(null);
        dispatch(fetchAllSubjects());
        dispatch(resetUpdateSubjectState());
        setSubjectName("");
        onClose();
      }, 4000);
    }
  }, [updateStatus, error, onClose, dispatch]);
  // Update Program status
  useEffect(() => {
    if (updateProgramStatus === "pending") {
      setUpdatingComplete(false);
    }
    if (updateProgramStatus === "rejected") {
      setTimeout(() => {
        updateProgramError?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "light",
            // toastId: successId,
          })
        );
      }, 1000);
      setTimeout(() => {
        setUpdatingComplete(null);
        setProgramName("");
        dispatch(resetUpdateProgramState());
      }, 2000);
      return;
    }
    if (updateProgramStatus === "success") {
      setTimeout(() => {
        setUpdatingComplete(true);
      }, 2000);
      setTimeout(() => {
        setUpdatingComplete(null);
        dispatch(fetchAllProgrammes());
        dispatch(resetUpdateProgramState());
        setProgramName("");
        onClose();
      }, 4000);
    }
  }, [updateProgramStatus, updateProgramError, onClose, dispatch]);

  useEffect(() => {
    if (programme) {
      dispatch(fetchAllProgrammeStudents({ programId: programme?._id }));
    }
  }, [dispatch, programme]);

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
                Subject Update
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
                      <span>Name Of Programme:</span> <p>{programme?.name}</p>
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
                      <span>Number Of Students:</span>{" "}
                      <p>{allProgrammeStudents?.length}</p>
                    </Box>
                    <Box className="lecturerAssignedItem">
                      <span>Number Of Lecturers:</span>{" "}
                      <p>{allLecturers?.length}</p>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {subject && (
                    <Box mt={3}>
                      <CustomTextField
                        fullWidth
                        name="subjectName"
                        label="Change Name Of Subject"
                        value={subjectName || subject?.subjectName}
                        size="small"
                        onChange={(e) => setSubjectName(e?.target?.value)}
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
                      />
                    </Box>
                  )}
                  {programme && (
                    <Box mt={3}>
                      <CustomTextField
                        fullWidth
                        name="programName"
                        label="Change Name Of Programme"
                        value={programName || programme?.name}
                        size="small"
                        onChange={(e) => setProgramName(e?.target?.value)}
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
                    if (subject) {
                      const data = {
                        subjectId: subject?._id,
                        updatedSubjectName: subjectName,
                        lastUpdatedBy: authAdmin?.id,
                      };
                      dispatch(updateSubject(data));
                    }
                    if (programme) {
                      const data = {
                        programId: programme?._id,
                        updatedProgramName: programName,
                        lastUpdatedBy: authAdmin?.id,
                      };
                      dispatch(updateProgram(data));
                    }
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
                  {updateStatus === "success" ||
                    (updateProgramStatus === "success" && updatingComplete && (
                      <>
                        <span>Updated</span>{" "}
                        <TaskAlt style={{ fontSize: "1.2em" }} />
                      </>
                    ))}
                  {updatingComplete === null && "Update"}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => {
                    setConfirmed(false);
                    setSubjectName("");
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
              <Typography id="responsive-modal-description" sx={{ mt: 2 }}>
                Are you sure you would like to update the selected academic{" "}
                {subject ? "subject" : "programme"}?
              </Typography>
              {/* Action Buttons */}
              <Stack
                direction="row"
                spacing={2}
                sx={{ mt: 4, justifyContent: "flex-end" }}
              >
                <Button
                  variant="outlined"
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
UpdateSubjectModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  authAdmin: PropTypes.object,
  subject: PropTypes.object,
  programme: PropTypes.object,
};
