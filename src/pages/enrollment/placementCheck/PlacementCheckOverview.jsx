import { useEffect } from "react";
import "./placementCheck.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  fetchAllPlacementStudents,
  getAllPlacementStudents,
  resetUpdateState,
  updatePlacementData,
} from "../../../features/academics/placementSlice";
import LoadingProgress from "../../../components/pageLoading/LoadingProgress";
import { ArrowBack, CalendarMonth, Close, TaskAlt } from "@mui/icons-material";
import { fetchAllUsers, getAllUsers } from "../../../features/auth/authSlice";
import {
  ContainerBox,
  CustomMobileDatePicker,
  CustomTextField,
} from "../../../muiStyling/muiStyling";
import { dateFormatter } from "../../../dateFormatter/DateFormatter";
import SmallFooter from "../../../components/footer/SmallFooter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { parseISO } from "date-fns";
import dayjs from "dayjs";

export function PlacementCheckOverview() {
  const studentUniqueId = localStorage.getItem("studentUniqueId");
  const allPlacementStudents = useSelector(getAllPlacementStudents);
  const dispatch = useDispatch();
  const { studentIndexNo } = useParams();
  const allUsers = useSelector(getAllUsers);
  console.log(studentIndexNo);

  const { updateStatus, error, successMessage } = useSelector(
    (state) => state.placement
  );
  const [updateData, setUpdateData] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(null);
  // console.log(updateData);

  // Find placement student
  const foundStudent = allPlacementStudents?.find(
    (std) => std.jhsIndexNo === studentIndexNo
  );
  // Find student's user data to display image if available
  const student = allUsers?.find(
    (std) => std.uniqueId === foundStudent?.enrollmentId
  );

  // Handle Update Toggling
  const [changeDOB, setChangeDOB] = useState(false);

  // Placement Student Update state
  const [placementStudent, setPlacementStudent] = useState(null);
  // const [placementStudent, setPlacementStudent] = useState({
  //   // Personal Details
  //   firstName: foundStudent?.firstName,
  //   lastName: foundStudent?.lastName,
  //   otherName: foundStudent?.otherName,
  //   dateOfBirth: foundStudent?.dateOfBirth,
  //   gender: foundStudent?.gender,
  //   fullName: foundStudent?.fullName,
  //   // School Data
  //   jhsAttended: foundStudent?.jhsAttended,
  //   jhsIndexNo: foundStudent?.jhsIndexNo,
  //   programme: foundStudent?.programme,
  //   yearGraduated: foundStudent?.yearGraduated,
  //   boardingStatus: foundStudent?.boardingStatus,
  //   // Contact Number
  //   smsContact: foundStudent?.smsContact,
  // });
  console.log(placementStudent);

  const canSave =
    Boolean(placementStudent?.firstName) &&
    Boolean(placementStudent?.lastName) &&
    // Boolean(placementStudent?.otherName) &&
    // Boolean(placementStudent?.gender) &&
    Boolean(placementStudent?.dateOfBirth) &&
    Boolean(placementStudent?.jhsAttended) &&
    Boolean(placementStudent?.yearGraduated) &&
    Boolean(placementStudent?.smsContact);

  // Handle Input Values
  const handleInputValues = (e) => {
    setPlacementStudent({
      ...placementStudent,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    if (dayjs(date).isValid()) {
      setPlacementStudent((prev) => ({
        ...prev,
        dateOfBirth: date, // Store the Date object directly
      }));
    }
  };
  const handleDataUpdate = () => {
    if (updateData) {
      if (!canSave) {
        toast.error("Fill all required fields!", {
          position: "top-right",
          theme: "light",
          toastId: "placementDataInputError",
        });
        return;
      }
      const data = {
        // Personal Details
        firstName: placementStudent?.firstName,
        lastName: placementStudent?.lastName,
        otherName: placementStudent?.otherName,
        dateOfBirth: placementStudent?.dateOfBirth.toISOString(),
        gender: placementStudent?.gender,
        fullName: placementStudent?.fullName,
        // School Data
        jhsAttended: placementStudent?.jhsAttended,
        jhsIndexNo: placementStudent?.jhsIndexNo,
        programme: placementStudent?.programme,
        yearGraduated: placementStudent?.yearGraduated,
        boardingStatus: placementStudent?.boardingStatus,
        // Contact Number
        smsContact: placementStudent?.smsContact,
      };
      dispatch(updatePlacementData(data));
    } else {
      setUpdateData(true);
    }
  };

  // Reinitialize state when foundStudent changes
  useEffect(() => {
    if (foundStudent) {
      const formattedStudent = {
        ...foundStudent,
        dateOfBirth: dayjs(foundStudent.dateOfBirth).isValid()
          ? dayjs(foundStudent?.dateOfBirth)
          : dayjs("MM/DD/YYYY"),
      };
      setPlacementStudent(formattedStudent);
    } else {
      setPlacementStudent(null); // No student found
    }
  }, [foundStudent]);

  useEffect(() => {
    dispatch(fetchAllPlacementStudents());
    dispatch(fetchAllUsers());
  }, [dispatch, studentUniqueId]);
  // Update status check
  useEffect(() => {
    if (updateStatus === "pending") {
      setLoadingComplete(false);
    }
    if (updateStatus === "success") {
      setTimeout(() => {
        toast.success(successMessage, {
          position: "top-right",
          theme: "dark",
          toastId: successMessage,
        });
      }, 2000);
      setTimeout(() => {
        setLoadingComplete(true);
        dispatch(fetchAllPlacementStudents());
      }, 3000);
      setTimeout(() => {
        setUpdateData(false);
        setChangeDOB(false);
        dispatch(resetUpdateState());
        setLoadingComplete(null);
      }, 6000);
    }
    if (updateStatus === "rejected") {
      return setTimeout(() => {
        setLoadingComplete(null);
        error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "light",
            toastId: "placementDataUpdateError",
          })
        );
        dispatch(resetUpdateState());
      }, 3000);
    }
  }, [
    updateStatus,
    successMessage,
    loadingComplete,
    error,
    dispatch,
    foundStudent,
  ]);

  if (!foundStudent) {
    return (
      <div className="checkPageLoading">
        <LoadingProgress color={"#696969"} size={"1.7rem"} />
      </div>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className="checkWrap" id="check">
        <Box
          className="checkContWrap"
          maxWidth={900}
          mx={{ xs: "0 .5rem", sm: "auto" }}
        >
          <Box className="checkCont" py={"1rem"}>
            <h1
              style={{
                textAlign: "center",
                color: "#696969",
                fontSize: "1.5rem",
              }}
            >
              Student Placement Overview
            </h1>
            <Box className="studentDataCont" mx={{ xs: ".5rem", sm: "2rem" }}>
              <Box className="studentData">
                <Box className="studentDataWrap">
                  <Box className="student">
                    <p className="studentName">{foundStudent?.fullName}</p>
                    <p className="studentId">[ Student ]</p>
                    <Box className="studentImg">
                      <img
                        src={
                          student?.personalInfo?.profilePicture
                            ? student?.personalInfo?.profilePicture?.url
                            : "/assets/noAvatar.png"
                        }
                        alt=""
                      />
                    </Box>
                  </Box>
                </Box>
                {!updateData ? (
                  <Box className="enrollmentInfoWrap">
                    <Box
                      className="updateBtnWrap"
                      p={{ xs: "1rem 1rem 0", sm: "2rem 2rem 0" }}
                    >
                      <Box className="enrolledDate">
                        <h3>
                          Enrolled:{" "}
                          <span>{foundStudent?.enrolled ? "Yes" : "No"}</span>
                        </h3>
                      </Box>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "green",
                          borderRadius: ".4rem",
                          fontSize: ".9rem",
                          textTransform: "capitalize",
                        }}
                        className="updateBtn"
                        onClick={handleDataUpdate}
                      >
                        {!updateData && "Update Data"}
                      </Button>
                    </Box>
                    <Box p={{ xs: "1rem", sm: "2rem" }}>
                      <Grid container>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <Box className="placementInfoBox">
                            <h3>
                              {foundStudent?.firstName
                                ? foundStudent?.firstName
                                : "---"}
                            </h3>
                            <span>[ First Name ]</span>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <Box className="placementInfoBox">
                            <h3>
                              {foundStudent?.lastName
                                ? foundStudent?.lastName
                                : "---"}
                            </h3>
                            <span>[ Last Name ]</span>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <Box className="placementInfoBox">
                            <h3>
                              {foundStudent?.otherName
                                ? foundStudent?.otherName
                                : "---"}
                            </h3>
                            <span>[ Other Name ]</span>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <Box className="placementInfoBox">
                            <h3>
                              {foundStudent?.gender
                                ? foundStudent?.gender
                                : "---"}
                            </h3>
                            <span>[ Gender ]</span>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <Box className="placementInfoBox">
                            <h3>
                              {foundStudent?.jhsAttended
                                ? foundStudent?.jhsAttended
                                : "---"}
                            </h3>
                            <span>[ JHS Completed ]</span>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <Box className="placementInfoBox">
                            <h3>
                              {foundStudent?.yearGraduated
                                ? foundStudent?.yearGraduated
                                : "---"}
                            </h3>
                            <span>[ Year Graduated ]</span>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <Box className="placementInfoBox">
                            <h3>
                              {foundStudent?.jhsIndexNo
                                ? foundStudent?.jhsIndexNo
                                : "---"}
                            </h3>
                            <span>[ JHS Index-Number ]</span>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <Box className="placementInfoBox">
                            <h3>
                              {foundStudent?.placementVerified
                                ? "Yes"
                                : "Not Yet"}
                            </h3>
                            <span>[ Placement Verified ]</span>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <Box className="placementInfoBox">
                            <h3>
                              {foundStudent?.smsContact
                                ? foundStudent?.smsContact
                                : "---"}
                            </h3>
                            <span>[ Contact Number ]</span>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                ) : (
                  <Box className="updatePlacementData">
                    {/* <h1>Update Data</h1> */}
                    <Box className="formInputWrap">
                      <button
                        onClick={() => {
                          if (changeDOB) {
                            setChangeDOB(false);
                          }
                          setUpdateData(false);
                        }}
                        className="placementUpdateBackBtn"
                      >
                        <ArrowBack className="placementPrev" />{" "}
                        <span>Go Back</span>
                      </button>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <CustomTextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            value={placementStudent?.firstName || ""}
                            onChange={handleInputValues}
                            autoComplete="off"
                            required
                            className="textField"
                            sx={{
                              "& .MuiInputLabel-asterisk": {
                                color: placementStudent?.firstName
                                  ? "green"
                                  : "red", // Change the asterisk color to red
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <CustomTextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            value={placementStudent?.lastName || ""}
                            onChange={handleInputValues}
                            autoComplete="off"
                            required
                            className="textField"
                            sx={{
                              "& .MuiInputLabel-asterisk": {
                                color: placementStudent?.lastName
                                  ? "green"
                                  : "red", // Change the asterisk color to red
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <CustomTextField
                            fullWidth
                            label="Other Name"
                            name="otherName"
                            value={placementStudent?.otherName || ""}
                            onChange={handleInputValues}
                            autoComplete="off"
                            // required
                            className="textField"
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          lg={4}
                          className="changeDOBWrap"
                        >
                          {/* {!changeDOB && (
                            <CustomTextField
                              fullWidth
                              label="Date Of Birth"
                              name="dateOfBirth"
                              value={
                                foundStudent?.dateOfBirth
                                  ? dateFormatter.format(
                                      new Date(foundStudent?.dateOfBirth)
                                    )
                                  : "Select"
                              }
                              required
                              onChange={handleInputValues}
                              autoComplete="off"
                              slotProps={{
                                input: { readOnly: true },
                              }}
                              className="textField"
                              sx={{
                                "& .MuiInputLabel-asterisk": {
                                  color: foundStudent?.dateOfBirth
                                    ? "green"
                                    : "red", // Change the asterisk color to red
                                },
                              }}
                            />
                          )}
                          {!changeDOB && (
                            <CalendarMonth
                              onClick={() => setChangeDOB(true)}
                              className="dOBBtn"
                            />
                          )} */}
                          {/* {changeDOB && ( */}
                          <CustomMobileDatePicker
                            label={
                              <span>
                                Date of Birth{" "}
                                <span
                                  style={{
                                    color: !foundStudent?.dateOfBirth
                                      ? "red"
                                      : "green", // Dynamically set the asterisk color
                                    marginRight: "8px",
                                  }}
                                >
                                  *
                                </span>
                              </span>
                            }
                            name="dateOfBirth"
                            // inputFormat="MM/dd/yyyy"
                            value={placementStudent?.dateOfBirth}
                            onChange={handleDateChange}
                            maxDate={dayjs()}
                            renderInput={(params) => (
                              <CustomTextField {...params} />
                            )}
                            required
                            error={false} // Make sure this is false
                            helperText="" // Optionally clear helper text
                            sx={{
                              width: "100%",
                              cursor: "pointer",
                              "& .MuiInputLabel-asterisk": {
                                color: foundStudent?.dateOfBirth
                                  ? "green"
                                  : "red", // Change the asterisk color to red
                              },
                            }}
                          />
                          {/* )} */}
                          {/* {changeDOB && !foundStudent && (
                            <CustomMobileDatePicker
                              // label="Date Of Birth"
                              name="dateOfBirth"
                              // inputFormat="MM/dd/yyyy"
                              value={placementStudent?.dateOfBirth || {}}
                              onChange={(date) =>
                                handleDateChange("dateOfBirth", date)
                              }
                              maxDate={dayjs()}
                              renderInput={(params) => (
                                <CustomTextField {...params} />
                              )}
                              error={false} // Make sure this is false
                              helperText="" // Optionally clear helper text
                              sx={{
                                width: "100%",
                              }}
                            />
                          )} */}
                          {changeDOB && (
                            <Close
                              onClick={() => setChangeDOB(false)}
                              className="closeDOBBtn"
                              // sx={{
                              //   bgcolor: "transparent",
                              //   border: "none",
                              //   outline: "none",
                              // }}
                            />
                          )}
                          {/* {changeDOB && (
                          <CustomTextField
                            fullWidth
                            label="Date Of Birth"
                            type="date"
                            name="dateOfBirth"
                            value={placementStudent?.dateOfBirth}
                            onChange={handleInputValues}
                            autoComplete="off"
                            required
                            className="textField"
                          />
                        )} */}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <CustomTextField
                            fullWidth
                            label="JHS Attended"
                            name="jhsAttended"
                            value={placementStudent?.jhsAttended || ""}
                            onChange={handleInputValues}
                            autoComplete="off"
                            required
                            className="textField"
                            sx={{
                              "& .MuiInputLabel-asterisk": {
                                color: placementStudent?.jhsAttended
                                  ? "green"
                                  : "red", // Change the asterisk color to red
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <CustomTextField
                            fullWidth
                            label="Year Graduated"
                            name="yearGraduated"
                            value={placementStudent?.yearGraduated || ""}
                            onChange={handleInputValues}
                            autoComplete="off"
                            required
                            className="textField"
                            sx={{
                              "& .MuiInputLabel-asterisk": {
                                color: placementStudent?.yearGraduated
                                  ? "green"
                                  : "red", // Change the asterisk color to red
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <CustomTextField
                            fullWidth
                            label="Mobile"
                            name="smsContact"
                            value={placementStudent?.smsContact || ""}
                            onChange={handleInputValues}
                            autoComplete="off"
                            required
                            className="textField"
                            sx={{
                              "& .MuiInputLabel-asterisk": {
                                color: placementStudent?.smsContact
                                  ? "green"
                                  : "red", // Change the asterisk color to red
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <CustomTextField
                            fullWidth
                            label="JHS Index No."
                            name="jhsIndexNo"
                            value={placementStudent?.jhsIndexNo || ""}
                            onChange={handleInputValues}
                            autoComplete="off"
                            slotProps={{
                              input: { readOnly: true },
                            }}
                            className="textField"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <CustomTextField
                            fullWidth
                            label="Programme"
                            name="programme"
                            value={placementStudent?.programme || ""}
                            onChange={handleInputValues}
                            autoComplete="off"
                            slotProps={{
                              input: { readOnly: true },
                            }}
                            className="textField"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <CustomTextField
                            fullWidth
                            label="Boarding Status"
                            name="boardingStatus"
                            value={placementStudent?.boardingStatus || ""}
                            onChange={handleInputValues}
                            autoComplete="off"
                            // required
                            className="textField"
                            slotProps={{
                              input: { readOnly: true },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <CustomTextField
                            fullWidth
                            label="Gender"
                            name="gender"
                            value={placementStudent?.gender || ""}
                            onChange={handleInputValues}
                            autoComplete="off"
                            slotProps={{
                              input: { readOnly: true },
                            }}
                            className="textField"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <CustomTextField
                            fullWidth
                            label="Full Name"
                            name="fullName"
                            value={placementStudent?.fullName || ""}
                            onChange={handleInputValues}
                            autoComplete="off"
                            slotProps={{
                              input: { readOnly: true },
                            }}
                            className="textField"
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                )}
                {updateData && (
                  <Box className="saveUpdateBtnWrap">
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "green",
                        borderRadius: ".4rem",
                      }}
                      className="saveUpdateBtn"
                      onClick={handleDataUpdate}
                    >
                      {updateData && loadingComplete === false && (
                        <LoadingProgress color={"#fff"} size={"1.5rem"} />
                      )}
                      {updateData &&
                        loadingComplete === true &&
                        updateStatus === "success" && (
                          <>
                            <span>Successful</span> <TaskAlt />
                          </>
                        )}
                      {updateData && loadingComplete === null && "Save Changes"}
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
            <Box
              className="note"
              mx={{ xs: ".5rem", sm: "2rem" }}
              p={{ xs: " 1rem .5rem", sm: "2rem 1rem" }}
            >
              <h4>Note:</h4>
              <p>
                The above data is just to let you know that you&apos;ve been
                placed into our school. You are therefore expected to follow the
                following steps:
                {/* officially and also follow our enrolment process to finally
                enrol into our school. */}
              </p>
              <ul>
                <li>
                  <p>
                    After a successful placement check, kindly update your
                    placement data with the required data before proceeding to
                    enroll.
                  </p>
                </li>
                <li>
                  <p>
                    Verify your placement [{" "}
                    <span className="firstStepInfo">
                      First step during enrollment process
                    </span>{" "}
                    ].
                  </p>
                </li>
                <li>
                  <p>Start your enrollment process.</p>
                </li>
              </ul>
              <p>
                If you&apos;re ready to enroll, kindly click on the others link
                with dropdown arrow on the navbar ( if on mobile, click on the
                menu icon ) and select the enrollment option to begin the
                enrollment process.
              </p>
              <span>
                Please don&apos;t forget to come along with all downloaded
                documents on the reporting date.
              </span>
            </Box>
          </Box>
        </Box>
        <Box>
          <SmallFooter />
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
