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
} from "@mui/material";
import PropTypes from "prop-types";
import { assignSubjectLecturer } from "../../features/academics/subjectsSlice";
import { useEffect, useState } from "react";
import { CustomTextField } from "../../muiStyling/muiStyling";
import { Close, Search, TaskAlt } from "@mui/icons-material";
import { FetchAllLecturers } from "../../data/lecturers/FetchLecturers";
import { FetchAllFlattenedProgrammes } from "../../data/programme/FetchProgrammeData";
import { FetchAllClassLevels } from "../../data/class/FetchClassLevel";
import { useDispatch } from "react-redux";

export default function AssignSubjectLecturerModal({
  open,
  onClose,
  authAdmin,
  subject,
  loadingComplete,
  assignLecturerStatus,
}) {
  const allLecturers = FetchAllLecturers();
  const allClassLevels = FetchAllClassLevels();
  const allFlattenedProgrammes = FetchAllFlattenedProgrammes();
  console.log(allLecturers);
  const [confirmed, setConfirmed] = useState(false);
  const [selectedLecturerInfo, setSelectedLecturerInfo] = useState("");
  const [selectedLecturer, setSelectedLecturer] = useState("");
  const [searchTeacher, setSearchTeacher] = useState("");
  const [programme, setProgramme] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const dispatch = useDispatch();
  console.log(subject);
  console.log(programme);

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
  useEffect(() => {
    if (selectedLecturerInfo) {
      setSelectedLecturer(selectedLecturerInfo);
    }
    if (!searchTeacher) {
      setSelectedLecturer("");
      setProgramme("");
      setClassLevel("");
    }
    if (selectedLecturer) {
      setSelectedLecturerInfo("");
    }
    if (assignLecturerStatus === "success") {
      setTimeout(() => {
        setConfirmed(false);
        setSearchTeacher("");
        setProgramme("");
        onClose();
      }, 6000);
    }
  }, [
    selectedLecturerInfo,
    searchTeacher,
    selectedLecturer,
    assignLecturerStatus,
    onClose,
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
                      setProgramme("");
                      onClose();
                    }}
                    style={{
                      backgroundColor: "red",
                      color: "#fff",
                      borderRadius: "50%",
                      fontSize: "1.2rem",
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
              >
                Assign New Lecturer
              </Typography>
              <Box sx={{ mt: 2, mb: 2 }} position={"relative"}>
                <CustomTextField
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
                        select
                        fullWidth
                        name="programme"
                        label="Select Programme"
                        value={subject?.subjectInfo?.program?.programId || ""}
                        size="small"
                        onChange={(e) => {
                          setProgramme(e.target.value);
                          // localStorage.setItem("reportClassLevel", e.target.value);
                        }}
                        slotProps={{
                          input: { readOnly: true },
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
                        {allFlattenedProgrammes?.map((program) => (
                          <MenuItem key={program?._id} value={program?._id}>
                            {program?.name
                              ? program?.name
                              : program?.divisionName}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    </Box>
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
                          // localStorage.setItem("reportClassLevel", e.target.value);
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
              >
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => {
                    setConfirmed(true);
                    const data = {
                      subjectId: subject?._id,
                      classLevel: classLevel,
                      program: subject?.subjectInfo?.program?.programId,
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
              </Stack>
            </Box>
          </Box>
        )}
        {!confirmed && (
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
                    // const data = {
                    //   subjectId: subject?._id,
                    //   currentTeacher: lecturer?._id,
                    //   lastUpdatedBy: authAdmin?.id,
                    // };
                    // assignSubjectLecturer(data);
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
              {loadingComplete === false && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                >
                  <p>Processing</p>
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
  assignLecturerStatus: PropTypes.string,
};
