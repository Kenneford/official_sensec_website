import "./modals.scss";
import {
  Box,
  Button,
  Modal,
  Typography,
  Stack,
  InputAdornment,
  Avatar,
  MenuItem,
  Grid,
  Autocomplete,
} from "@mui/material";
import PropTypes from "prop-types";
import {
  assignSubjectLecturer,
  fetchAllSubjects,
  resetAssignSubjectLecturerState,
} from "../../features/academics/subjectsSlice";
import { useEffect, useRef, useState } from "react";
import { CustomTextField } from "../../muiStyling/muiStyling";
import { Close, Search, TaskAlt } from "@mui/icons-material";
import { FetchAllLecturers } from "../../data/lecturers/FetchLecturers";
import { FetchAllFlattenedProgrammes } from "../../data/programme/FetchProgrammeData";
import { FetchAllClassLevels } from "../../data/class/FetchClassLevel";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../features/auth/authSlice";

export default function AssignSubjectLecturerModal({
  open,
  onClose,
  authAdmin,
  subject,
  loadingComplete,
}) {
  const inputRef = useRef(null);

  const allLecturers = FetchAllLecturers();
  const allClassLevels = FetchAllClassLevels();
  const allFlattenedProgrammes = FetchAllFlattenedProgrammes();
  const [confirmed, setConfirmed] = useState(false);
  const [selectedLecturerInfo, setSelectedLecturerInfo] = useState("");
  const [selectedLecturer, setSelectedLecturer] = useState("");
  const [searchTeacher, setSearchTeacher] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [assignError, setAssignError] = useState("");
  const [selectedProgrammes, setSelectedProgrammes] = useState([]);
  const [formattedProgrammes, setFormattedProgrammes] = useState([]);
  console.log(formattedProgrammes);
  console.log(assignError);

  const dispatch = useDispatch();

  const { assignLecturerStatus, error } = useSelector((state) => state.subject);

  const filteredLecturers = searchTeacher
    ? allLecturers.filter(
        (lecturer) =>
          lecturer?.personalInfo?.firstName
            ?.toLowerCase()
            ?.includes(searchTeacher.toLowerCase()) ||
          lecturer?.personalInfo?.lastName
            ?.toLowerCase()
            ?.includes(searchTeacher.toLowerCase())
      )
    : [];

  const canAssign =
    Boolean(classLevel) && Boolean(selectedLecturer?._id) && Boolean(subject);

  // Format selected programmes
  useEffect(() => {
    const programmes = selectedProgrammes?.map((program) => ({
      programId: program?._id,
      nameOfProgram: program?.isDivisionProgram
        ? program?.divisionName
        : program?.name,
      type: program?.isDivisionProgram ? "ProgramDivision" : "Program",
    }));
    setFormattedProgrammes(programmes);
  }, [selectedProgrammes]);
  // Ensure focus when the modal becomes visible
  useEffect(() => {
    if (confirmed && inputRef.current) {
      inputRef.current.focus();
    }
    if (error?.errorMessage?.programmes) {
      setAssignError(error?.errorMessage?.programmes);
    }
  }, [confirmed, error]);

  useEffect(() => {
    if (selectedLecturerInfo) {
      setSelectedLecturer(selectedLecturerInfo);
    }
    if (!searchTeacher) {
      setSelectedLecturer("");
      setClassLevel("");
    }
    if (selectedLecturer) {
      setSelectedLecturerInfo("");
    }
    if (assignLecturerStatus === "success") {
      setTimeout(() => {
        setConfirmed(false);
        setSearchTeacher("");
      }, 4000);
    }
  }, [
    selectedLecturerInfo,
    searchTeacher,
    selectedLecturer,
    assignLecturerStatus,
    onClose,
    dispatch,
  ]);

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
        fontSize={"calc(0.7rem + 1vmin)"}
      >
        {confirmed && (
          <Box
            sx={{
              backgroundColor: "#fff",
              margin: ".5rem",
            }}
            fontSize={".8em"}
          >
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
                // minHeight: "20rem",
              }}
            >
              {searchTeacher && (
                <Box
                  sx={{
                    position: "absolute",
                    right: "2rem",
                    cursor: "pointer",
                  }}
                >
                  <Close
                    onClick={() => {
                      setConfirmed(false);
                      setSearchTeacher("");
                      onClose();
                    }}
                    style={{
                      backgroundColor: "red",
                      color: "#fff",
                      borderRadius: "50%",
                      fontSize: "1.2em",
                    }}
                  />
                </Box>
              )}
              {/* Modal Content */}
              <Typography
                id="responsive-modal-title"
                variant="h6"
                component="h2"
                textAlign={{ xs: "center", sm: "left" }}
                fontSize={"1.2em"}
              >
                Assign New Lecturer
              </Typography>
              <Box sx={{ mt: 2, mb: 2 }} position={"relative"}>
                <CustomTextField
                  inputRef={inputRef}
                  fullWidth
                  name="lecturers"
                  label={<p style={{ fontSize: "1em" }}>Search Filter</p>}
                  value={searchTeacher}
                  size="small"
                  onChange={(e) => {
                    setSearchTeacher(e.target.value);
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
                      fontSize: ".9em",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: ".7em", // Default label size
                      transition: "font-size 0.2s, color 0.2s",
                    },
                  }}
                />
                {filteredLecturers?.length > 0 && (
                  <Box
                    className="assignSubjectLecturerBox"
                    position={"absolute"}
                    zIndex={3}
                    width={"100%"}
                  >
                    {searchTeacher &&
                      filteredLecturers.length > 0 &&
                      filteredLecturers.map((lecturer) => (
                        <Box
                          key={lecturer?._id}
                          className="lecturerWrap"
                          onClick={() => {
                            setSelectedLecturerInfo(lecturer);
                            setSearchTeacher(
                              `${lecturer?.personalInfo?.fullName}`
                            );
                          }}
                        >
                          <Avatar
                            className="avatar"
                            src={lecturer?.personalInfo?.profilePicture?.url}
                          />{" "}
                          <p>{lecturer?.personalInfo?.fullName}</p>
                        </Box>
                      ))}
                  </Box>
                )}
                {/* {searchTeacher && !filteredLecturers?.length > 0 && (
                  <p className="noMatches">No matching lecturers found.</p>
                )} */}
              </Box>
              {selectedLecturer && (
                <Grid container spacing={3} justifyContent={"space-between"}>
                  <Grid item xs={12} sm={4}>
                    <Box mt={2} className="lecturerAssignedInfos">
                      <Avatar
                        sx={{
                          width: "5rem",
                          height: "5rem",
                          borderRadius: ".4rem",
                        }}
                        className="avatar"
                        src={
                          selectedLecturer?.personalInfo?.profilePicture?.url
                        }
                      />
                      <Box className="lecturerAssignedItem">
                        <span>Name:</span>{" "}
                        <p>{selectedLecturer?.personalInfo?.fullName}</p>
                      </Box>
                      <Box className="lecturerAssignedItem">
                        <span>Class Levels/Forms:</span>{" "}
                        <p>
                          {
                            selectedLecturer?.lecturerSchoolData?.classLevels
                              ?.length
                          }
                        </p>
                      </Box>
                      <Box className="lecturerAssignedItem">
                        <span>Elective Subjects:</span>{" "}
                        <p>
                          {
                            selectedLecturer?.lecturerSchoolData
                              ?.teachingSubjects?.electives?.length
                          }
                        </p>
                      </Box>
                      <Box className="lecturerAssignedItem">
                        <span>Core Subjects:</span>{" "}
                        <p>
                          {
                            selectedLecturer?.lecturerSchoolData
                              ?.teachingSubjects?.cores?.length
                          }
                        </p>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box mt={3}>
                      <CustomTextField
                        fullWidth
                        label="Subject"
                        value={subject?.subjectName || ""}
                        size="small"
                        slotProps={{
                          input: { readOnly: true },
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
                    {!subject?.subjectInfo?.isElectiveSubject && (
                      <Box mt={3} fontSize={"calc(0.7rem + 1vmin)"}>
                        <Autocomplete
                          multiple
                          options={allFlattenedProgrammes}
                          getOptionLabel={(option) =>
                            option.name ? option?.name : option?.divisionName
                          }
                          value={selectedProgrammes}
                          //   value={selectedProgrammes || savedSelectedProgrammes}
                          onChange={(event, newValue) =>
                            setSelectedProgrammes(newValue)
                          }
                          isOptionEqualToValue={(option, value) =>
                            option._id === value._id
                          }
                          renderInput={(params) => (
                            <CustomTextField
                              {...params}
                              variant="outlined"
                              //   label="Select Options"
                              placeholder="Choose Programmes"
                              size="small"
                              //   onChange={(e) => {
                              //     setReportData({
                              //       ...reportData,
                              //       subject: e.target.value,
                              //     });
                              //     localStorage.setItem("reportSubject", e.target.value);
                              //   }}
                              sx={{
                                "& .MuiInputBase-input": {
                                  // height: "1.3rem",
                                  fontSize: ".7em",
                                },
                                "& .MuiInputLabel-root": {
                                  fontSize: ".7em", // Default label size
                                  transition: "font-size 0.2s, color 0.2s",
                                },
                              }}
                            ></CustomTextField>
                          )}
                        />
                      </Box>
                    )}
                    {subject?.subjectInfo?.isElectiveSubject && (
                      <Box mt={3}>
                        <CustomTextField
                          select
                          fullWidth
                          label="Programme"
                          value={subject?.subjectInfo?.program?.programId || ""}
                          size="small"
                          slotProps={{
                            input: { readOnly: true },
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
                        >
                          {allFlattenedProgrammes?.map((program) => (
                            <MenuItem key={program?._id} value={program?._id}>
                              {program?.name
                                ? program?.name
                                : program?.divisionName}
                            </MenuItem>
                          ))}
                        </CustomTextField>
                      </Box>
                    )}
                    {assignError && (
                      <Box fontSize={".8em"}>
                        <p style={{ color: "#b40a0a", letterSpacing: "1px" }}>
                          {`Lecturer already assigned for${" "}
                          ${
                            assignError?.length > 1
                              ? assignError
                                  ?.slice(0, -1)
                                  ?.map((program) => program?.nameOfProgram)
                                  .join(", ")
                              : assignError
                                  ?.map((program) => program?.nameOfProgram)
                                  .join(", ")
                          },
                          ${assignError?.length > 1 ? "and" : ""}
                          ${
                            assignError?.length > 1
                              ? assignError
                                  ?.slice(-1)
                                  ?.map((program) => program?.nameOfProgram)
                                  .join(", ")
                              : ""
                          }${" "}
                          under this subject!`}
                        </p>
                      </Box>
                    )}
                    <Box mt={3}>
                      <CustomTextField
                        select
                        fullWidth
                        name="classLEvel"
                        label="Select Class-Level"
                        value={classLevel}
                        size="small"
                        onChange={(e) => {
                          setClassLevel(e.target.value);
                        }}
                        required
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
                      >
                        {allClassLevels?.map((cLevel) => (
                          <MenuItem key={cLevel?._id} value={cLevel?._id}>
                            {cLevel?.name}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    </Box>
                  </Grid>
                </Grid>
              )}
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
                      subjectId: subject?._id,
                      classLevel: classLevel,
                      program: subject?.subjectInfo?.program?.programId,
                      programmes: formattedProgrammes,
                      currentTeacher: selectedLecturer?._id,
                      lastUpdatedBy: authAdmin?.id,
                    };
                    if (data) {
                      dispatch(assignSubjectLecturer(data));
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
                  {loadingComplete === false && (
                    <Box
                      className="promotionSpinner"
                      sx={{
                        fontSize: "1em",
                      }}
                    >
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
                  size="small"
                  onClick={() => {
                    setConfirmed(false);
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
                Are you sure you would like to assign a new Lecturer under the
                selected academic subject?
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
AssignSubjectLecturerModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  authAdmin: PropTypes.object,
  lecturer: PropTypes.object,
  subject: PropTypes.object,
  loadingComplete: PropTypes.bool,
};
