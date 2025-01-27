import "./modals.scss";
import {
  Box,
  Button,
  Modal,
  Typography,
  InputAdornment,
  Avatar,
  Divider,
} from "@mui/material";
import PropTypes from "prop-types";
import {
  fetchAllSubjectLecturers,
  fetchAllSubjects,
  getAllSubjectLecturers,
  removeSubjectLecturer,
  resetRemoveSubjectLecturerState,
} from "../../features/academics/subjectsSlice";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CustomTextField } from "../../muiStyling/muiStyling";
import { Close, Search, TaskAlt } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchAllUsers } from "../../features/auth/authSlice";
import { FetchAllSubjectLecturers } from "../../data/lecturers/FetchLecturers";

export default function RemoveSubjectLecturerModal({
  open,
  onClose,
  authAdmin,
  subject,
}) {
  const inputRef = useRef(null);
  const { removeLecturerStatus, error } = useSelector((state) => state.subject);

  const allSubjectLecturers = FetchAllSubjectLecturers({
    open,
    subjectId: subject?._id,
  });
  const [subjectToRemove, setSubjectToRemove] = useState("");
  const [removingComplete, setRemovingComplete] = useState(null);
  const [removingInProgress, setRemovingInProgress] = useState(false);
  const [selectedLecturerInfo, setSelectedLecturerInfo] = useState("");
  const [selectedLecturer, setSelectedLecturer] = useState("");
  const [searchTeacher, setSearchTeacher] = useState("");
  const dispatch = useDispatch();

  console.log("allSubjectLecturers: ", allSubjectLecturers);

  useEffect(() => {
    if (selectedLecturerInfo) {
      setSelectedLecturer(selectedLecturerInfo);
    }
    if (!searchTeacher) {
      setSelectedLecturer("");
    }
    if (selectedLecturer) {
      setSelectedLecturerInfo("");
    }
  }, [selectedLecturerInfo, searchTeacher, selectedLecturer]);
  // Remove status
  useEffect(() => {
    if (removeLecturerStatus === "pending") {
      setRemovingComplete(false);
      setRemovingInProgress(true);
    }
    if (removeLecturerStatus === "rejected") {
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
        setRemovingComplete(null);
        setRemovingInProgress(false);
        dispatch(resetRemoveSubjectLecturerState());
      }, 2000);
      return;
    }
    if (removeLecturerStatus === "success") {
      setTimeout(() => {
        setRemovingComplete(true);
      }, 2000);
      setTimeout(() => {
        setSearchTeacher("");
        setRemovingInProgress(false);
        dispatch(fetchAllSubjects());
        setRemovingComplete(null);
        setSubjectToRemove("");
        dispatch(resetRemoveSubjectLecturerState());
      }, 4000);
    }
  }, [subject, removeLecturerStatus, error, allSubjectLecturers, dispatch]);

  // Ensure focus when the modal becomes visible
  useEffect(() => {
    if (allSubjectLecturers?.length > 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [allSubjectLecturers]);

  const filteredLecturers = allSubjectLecturers.filter((lecturer) =>
    lecturer?.name?.toLowerCase()?.includes(searchTeacher.toLowerCase())
  );

  if (!open) return null;
  return (
    <Modal
      open={open}
      // onClose={onClose}
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
            <Box
              sx={{
                position: "absolute",
                right: "1.4rem",
                cursor: "pointer",
                top: "1rem",
              }}
            >
              <Close
                titleAccess={
                  searchTeacher?.length > 0 ? "Clear Filter" : "Close Window"
                }
                onClick={() => {
                  if (searchTeacher?.length > 0) {
                    setSearchTeacher("");
                  } else {
                    onClose();
                  }
                }}
                style={{
                  backgroundColor: "red",
                  color: "#fff",
                  borderRadius: "50%",
                  fontSize: "1rem",
                }}
              />
            </Box>
            {/* Modal Content */}
            <Box fontSize={"calc( 0.7rem + 1vmin)"}>
              <Typography
                id="responsive-modal-title"
                variant="h6"
                component="h2"
                textAlign={{ xs: "center", sm: "left" }}
                mt={"1rem"}
                fontSize={".8em"}
              >
                All Assigned Lecturers
              </Typography>
            </Box>
            {/* Search Filter */}
            <Box sx={{ mt: 2, mb: 2 }} position={"relative"}>
              <CustomTextField
                inputRef={inputRef}
                fullWidth
                name="lecturers"
                label="Search filter"
                value={searchTeacher}
                size="small"
                onChange={(e) => {
                  setSearchTeacher(e.target.value);
                  // localStorage.setItem("reportClassLevel", e.target.value);
                }}
                autoComplete="off"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <Search />
                      </InputAdornment>
                    ),
                  },
                }}
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
            {/* Lecturer & Subjects Details */}
            <Box className="listOfSubjectLecturers">
              {filteredLecturers?.length > 0 ? (
                filteredLecturers?.map((lecturer) => (
                  <Box key={lecturer?.uniqueId}>
                    <Box
                      display={"flex"}
                      flexWrap={"wrap"}
                      alignItems={"center"}
                      gap={".5rem"}
                      mt={".5rem"}
                      mb={".5rem"}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#e6e4e4cc" },
                        padding: ".5rem",
                        borderRadius: ".5rem 0 0 .5rem",
                        // position: "relative",
                        minWidth: "27rem",
                      }}
                      className="removeLSubjectLecturerWrap"
                    >
                      <Box className="lecturerAssignedInfos">
                        {/* <Box className="lecturerAssignedItem"></Box> */}
                        <Avatar
                          sx={{
                            width: "5rem",
                            height: "5rem",
                            borderRadius: ".4rem",
                          }}
                          className="avatar"
                          src={lecturer?.profilePicture}
                        />
                      </Box>
                      <Box>
                        <Box
                          className="lecturerAssignedItem"
                          fontSize={".8em"}
                          display={"flex"}
                          gap={".5rem"}
                          mb={".5rem"}
                        >
                          <span
                            style={{
                              color: "#383838",
                              fontWeight: "500",
                              letterSpacing: "1px",
                            }}
                          >
                            Name:
                          </span>{" "}
                          <p
                            style={{
                              letterSpacing: "1px",
                            }}
                          >
                            {lecturer?.gender === "Male" ? "Mr." : "Mrs."}{" "}
                            {lecturer?.name}
                          </p>
                        </Box>
                        <Box display={"flex"} gap={".5rem"}>
                          {lecturer?.electives?.map((electiveData) => (
                            <Box key={electiveData?._id} position={"relative"}>
                              <Box>
                                <Box
                                  className="lecturerAssignedItem"
                                  fontSize={".8em"}
                                  display={"flex"}
                                  gap={".5rem"}
                                >
                                  <span
                                    style={{
                                      color: "#383838",
                                      fontWeight: "500",
                                      letterSpacing: "1px",
                                    }}
                                  >
                                    Subject:
                                  </span>{" "}
                                  <p>{electiveData?.subject}</p>
                                </Box>
                                <Box
                                  className="lecturerAssignedItem"
                                  fontSize={".8em"}
                                  display={"flex"}
                                  gap={".5rem"}
                                >
                                  <span
                                    style={{
                                      color: "#383838",
                                      fontWeight: "500",
                                      letterSpacing: "1px",
                                    }}
                                  >
                                    Form:
                                  </span>{" "}
                                  <p>
                                    {electiveData?.classLevel === "Level 100" &&
                                      "Form 1"}
                                    {electiveData?.classLevel === "Level 200" &&
                                      "Form 2"}
                                    {electiveData?.classLevel === "Level 300" &&
                                      "Form 3"}
                                  </p>
                                </Box>
                                <Box
                                  className="lecturerAssignedItem"
                                  fontSize={".8em"}
                                  display={"flex"}
                                  gap={".5rem"}
                                >
                                  <span
                                    style={{
                                      color: "#383838",
                                      fontWeight: "500",
                                      letterSpacing: "1px",
                                    }}
                                  >
                                    Programme:
                                  </span>{" "}
                                  <p>{electiveData?.program}</p>
                                </Box>
                                <Box
                                  className="lecturerAssignedItem"
                                  fontSize={".8em"}
                                  display={"flex"}
                                  gap={".5rem"}
                                >
                                  <span
                                    style={{
                                      color: "#383838",
                                      fontWeight: "500",
                                      letterSpacing: "1px",
                                    }}
                                  >
                                    Elective:
                                  </span>{" "}
                                  <Box>
                                    {electiveData?.isElectiveSubject ? (
                                      <p style={{ color: "green" }}>Yes</p>
                                    ) : (
                                      <p style={{ color: "red" }}>No</p>
                                    )}
                                  </Box>
                                </Box>
                              </Box>
                              <Button
                                sx={{
                                  // position: "absolute",
                                  right: "0",
                                  cursor: "pointer",
                                  bottom: 0,
                                  textTransform: "capitalize",
                                  textAlign: "left",
                                  paddingX: "unset",
                                  color: "#d20606",
                                  ":hover": {
                                    backgroundColor: "transparent",
                                  },
                                  justifyContent: "unset",
                                }}
                                onClick={() => {
                                  if (!removingInProgress) {
                                    setRemovingInProgress(true);
                                    setSubjectToRemove(electiveData?._id);
                                    const data = {
                                      subjectId: subject?._id,
                                      classLevel: electiveData?.classLevel,
                                      program:
                                        subject?.subjectInfo?.program
                                          ?.programId,
                                      currentTeacher: lecturer?.uniqueId,
                                      lastUpdatedBy: authAdmin?.id,
                                    };
                                    dispatch(removeSubjectLecturer(data));
                                  }
                                }}
                              >
                                {subjectToRemove === electiveData?._id && (
                                  <>
                                    {removingComplete === false && (
                                      <Box
                                        className="promotionSpinner"
                                        sx={{
                                          fontSize: "1em",
                                        }}
                                      >
                                        <p>Removing</p>
                                        <span
                                          className="dot-ellipsis"
                                          style={{ marginTop: 0 }}
                                        >
                                          <span className="dot">.</span>
                                          <span className="dot">.</span>
                                          <span className="dot">.</span>
                                        </span>
                                      </Box>
                                    )}
                                    {removingComplete &&
                                      removeLecturerStatus === "success" && (
                                        <>
                                          <span>Removed</span>{" "}
                                          <TaskAlt
                                            style={{ fontSize: "1.3em" }}
                                          />
                                        </>
                                      )}
                                  </>
                                )}
                                {removingComplete === null && "Remove"}
                                {removingComplete !== null &&
                                  subjectToRemove !== electiveData?._id &&
                                  "Remove"}
                              </Button>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                    <Divider />
                  </Box>
                ))
              ) : (
                <Box>
                  <Typography
                    variant="h6"
                    // color="#fff"
                    textAlign={"center"}
                    mt={2}
                    fontSize={".9em"}
                  >
                    No lecturers data found!
                  </Typography>
                </Box>
              )}
            </Box>
            {/* Action Buttons */}
            {/* <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "flex-end" }}
            >
              <Button
                variant="outlined"
                color="success"
                onClick={() => {
                  setConfirmed(true);
                  const data = {
                    subjectId: subject,
                    classLevel: classLevel,
                    program: programme,
                    currentTeacher: selectedLecturer?._id,
                    lastUpdatedBy: authAdmin?.id,
                  };
                  dispatch(assignSubjectLecturer(data));
                }}
                sx={{
                  transition: ".5s ease",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "green",
                    color: "#fff",
                  },
                }}
              >
                {loadingComplete === false && (
                  <Box className="promotionSpinner">
                    <p>Assigning</p>
                    <span className="dot-ellipsis" style={{}}>
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                    </span>
                  </Box>
                )}
                {loadingComplete && assignLecturerStatus === "success" && (
                  <>
                    <span>Assigned</span>{" "}
                    <TaskAlt style={{ fontSize: "1.3em" }} />
                  </>
                )}
                {loadingComplete === null && "Assign"}
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setConfirmed(false);
                  setSearchTeacher("");
                  setProgramme("");
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
            </Stack> */}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
RemoveSubjectLecturerModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  authAdmin: PropTypes.object,
  subject: PropTypes.object,
};
