import "./modals.scss";
import {
  Box,
  Button,
  Modal,
  Typography,
  InputAdornment,
  Avatar,
  Divider,
  Stack,
  Grid,
} from "@mui/material";
import PropTypes from "prop-types";
import {
  fetchAllSubjects,
  removeSubjectLecturer,
  resetRemoveSubjectLecturerState,
} from "../../features/academics/subjectsSlice";
import { useEffect, useRef, useState } from "react";
import { CustomTextField } from "../../muiStyling/muiStyling";
import { Close, Search, TaskAlt } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FetchAllSubjectLecturers } from "../../data/lecturers/FetchLecturers";

export default function ViewSubjectLecturersModal({
  open,
  onClose,
  authAdmin,
  subject,
}) {
  const inputRef = useRef(null);
  const { removeLecturerStatus, error } = useSelector((state) => state.subject);
  console.log(subject);

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

  // Ensure focus when the modal becomes visible
  useEffect(() => {
    if (allSubjectLecturers?.length > 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [allSubjectLecturers]);

  const filteredLecturers = allSubjectLecturers.filter((lecturer) =>
    lecturer?.name?.toLowerCase()?.includes(searchTeacher.toLowerCase())
  );
  console.log(filteredLecturers);

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
        setRemovingComplete(null);
        setSubjectToRemove("");
        dispatch(fetchAllSubjects());
        dispatch(resetRemoveSubjectLecturerState());
      }, 4000);
    }
  }, [removeLecturerStatus, error, allSubjectLecturers, dispatch]);

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
          width: { xs: "95%", sm: { minWidth: "40rem" } }, // Responsive width based on screen size
          maxWidth: { md: "50rem", lg: "50rem" }, // Responsive width based on screen size
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
                All Assigned{" "}
                {subject?.subjectInfo?.isElectiveSubject ? "Elective" : "Core"}{" "}
                Lecturers
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
                      // display={"flex"}
                      // flexWrap={"wrap"}
                      alignItems={"center"}
                      gap={".5rem"}
                      mt={".5rem"}
                      mb={".5rem"}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#e3f8ffcc" },
                        padding: "1rem .5rem",
                        borderRadius: ".5rem",
                        // position: "relative",
                        minWidth: "27rem",
                      }}
                      className="removeLSubjectLecturerWrap"
                    >
                      <Box
                        className="lecturerAssignedInfos"
                        sx={{ paddingLeft: ".5rem" }}
                      >
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
                          padding={".5rem"}
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
                        {lecturer?.electives && (
                          <Grid container spacing={0.5}>
                            {lecturer?.electives?.map((electiveData) => (
                              <Grid item xs={12} sm={6} key={electiveData?._id}>
                                <Box
                                  position={"relative"}
                                  sx={{
                                    padding: ".5rem",
                                    border: "1px solid #a2e7fecc",
                                    borderRadius: ".4rem",
                                    "&:hover": {
                                      padding: ".5rem",
                                      backgroundColor: "#fff",
                                      borderRadius: ".4rem",
                                      border: "1px solid #fff",
                                    },
                                  }}
                                >
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
                                        {electiveData?.classLevel ===
                                          "Level 100" && "Form 1"}
                                        {electiveData?.classLevel ===
                                          "Level 200" && "Form 2"}
                                        {electiveData?.classLevel ===
                                          "Level 300" && "Form 3"}
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
                                  {/* <Button
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
                                    if (
                                      !removingInProgress &&
                                      removeLecturerStatus !== "success"
                                    ) {
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
                                </Button> */}
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                        )}
                        {lecturer?.cores && (
                          <Grid container spacing={0.5}>
                            {lecturer?.cores?.map((coreData) => (
                              <Grid item xs={12} sm={6} key={coreData?._id}>
                                <Box
                                  position={"relative"}
                                  sx={{
                                    padding: ".5rem",
                                    border: "1px solid #a2e7fecc",
                                    borderRadius: ".4rem",
                                    "&:hover": {
                                      padding: ".5rem",
                                      backgroundColor: "#fff",
                                      borderRadius: ".4rem",
                                      border: "1px solid #fff",
                                    },
                                  }}
                                >
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
                                      <p>{coreData?.subject}</p>
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
                                        {coreData?.classLevel === "Level 100" &&
                                          "Form 1"}
                                        {coreData?.classLevel === "Level 200" &&
                                          "Form 2"}
                                        {coreData?.classLevel === "Level 300" &&
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
                                        Programmes:
                                      </span>{" "}
                                      <Box>
                                        {coreData?.programmes?.map(
                                          (program) => (
                                            <p key={program?.nameOfProgram}>
                                              {program?.nameOfProgram}
                                            </p>
                                          )
                                        )}
                                      </Box>
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
                                        Core:
                                      </span>{" "}
                                      <Box>
                                        {coreData?.isCoreSubject ? (
                                          <p style={{ color: "green" }}>Yes</p>
                                        ) : (
                                          <p style={{ color: "red" }}>No</p>
                                        )}
                                      </Box>
                                    </Box>
                                  </Box>
                                  {/* <Button
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
                                    if (
                                      !removingInProgress &&
                                      removeLecturerStatus !== "success"
                                    ) {
                                      setRemovingInProgress(true);
                                      setSubjectToRemove(coreData?._id);
                                      const data = {
                                        subjectId: subject?._id,
                                        classLevel: coreData?.classLevel,
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
                                  {subjectToRemove === coreData?._id && (
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
                                    subjectToRemove !== coreData?._id &&
                                    "Remove"}
                                </Button> */}
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                        )}
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
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "flex-end" }}
            >
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => {
                  setSearchTeacher("");
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
      </Box>
    </Modal>
  );
}
ViewSubjectLecturersModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  authAdmin: PropTypes.object,
  subject: PropTypes.object,
};
