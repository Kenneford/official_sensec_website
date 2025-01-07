import { useEffect } from "react";
import "./placementCheck.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Avatar, Box, Button, Grid, Stack, Typography } from "@mui/material";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { parseISO } from "date-fns";
import dayjs from "dayjs";
import { NavigationBar } from "../../../components/navbar/NavigationBar";
import Cookies from "js-cookie";
import { color } from "framer-motion";
import PageLoading from "../../../components/pageLoading/PageLoading";
import DataNotFound from "../../../components/pageNotFound/DataNotFound";

export function PlacementCheckOverview() {
  const {
    currentAction,
    setCurrentAction,
    currentLink,
    setCurrentLink,
    setOpenSubNavLinks,
    openSubNavLinks,
    setOpenUserActions,
    openUserActions,
    setOpenSignUpActions,
    openSignUpActions,
    setOpenMenuLinks,
    openMenuLinks,
    isSidebarOpen,
    openSearchModal,
    setOpenSearchModal,
  } = useOutletContext();
  const placementYear = Cookies.get("Placement_Year");
  const studentIndex = Cookies.get("masked_student_index");
  const allPlacementStudents = useSelector(getAllPlacementStudents);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { studentIndexNo } = useParams();
  const allUsers = useSelector(getAllUsers);

  const { updateStatus, error, successMessage } = useSelector(
    (state) => state.placement
  );
  const [updateData, setUpdateData] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(null);
  // console.log(updateData);

  // Find placement student
  const foundStudent = allPlacementStudents?.find(
    (std) => std.jhsIndexNo === studentIndex
  );
  // Find student's user data to display image if available
  const student = allUsers?.find(
    (std) => std.uniqueId === foundStudent?.enrollmentId
  );

  // Handle Update Toggling
  const [changeDOB, setChangeDOB] = useState(false);

  // Placement Student Update state
  const [placementStudent, setPlacementStudent] = useState(null);

  const canSave =
    Boolean(placementStudent?.dateOfBirth) &&
    Boolean(placementStudent?.jhsAttended) &&
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
        // firstName: placementStudent?.firstName,
        // lastName: placementStudent?.lastName,
        // otherName: placementStudent?.otherName,
        dateOfBirth: placementStudent?.dateOfBirth.toISOString(),
        // gender: placementStudent?.gender,
        fullName: placementStudent?.fullName,
        // School Data
        jhsAttended: placementStudent?.jhsAttended,
        jhsIndexNo: placementStudent?.jhsIndexNo,
        // programme: placementStudent?.programme,
        yearGraduated: placementYear,
        // boardingStatus: placementStudent?.boardingStatus,
        // Contact Number
        smsContact: placementStudent?.smsContact,
      };
      dispatch(updatePlacementData(data));
    } else {
      setUpdateData(true);
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 140) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Reinitialize state when foundStudent changes
  useEffect(() => {
    if (foundStudent) {
      const formattedStudent = {
        ...foundStudent,
        dateOfBirth: foundStudent?.dateOfBirth
          ? dayjs(foundStudent.dateOfBirth)
          : null,
      };
      setPlacementStudent(formattedStudent);
    } else {
      setPlacementStudent(null);
    }
  }, [foundStudent]);

  useEffect(() => {
    dispatch(fetchAllPlacementStudents());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Update status check
  useEffect(() => {
    if (updateStatus === "pending") {
      setLoadingComplete(false);
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
  }, [
    updateStatus,
    successMessage,
    loadingComplete,
    error,
    dispatch,
    foundStudent,
  ]);

  useEffect(() => {
    if (!placementYear) {
      navigate(-1);
    }
    if (!studentIndex) {
      navigate("/");
    }
  }, [placementYear, navigate, studentIndex]);

  if (!foundStudent) {
    return <DataNotFound message={"Student data not found!"} />;
  }

  return (
    <>
      <Box
        sx={{
          position: isScrolled ? "none" : "block",
        }}
      >
        <Stack
          direction="column"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: ".3rem 0",
            height: "4.5rem",
          }}
        >
          <Box
            onClick={() => {
              // Click handler
              localStorage.removeItem("currentNavLink");
              navigate("/sensec/homepage");
            }}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Avatar
              src="/assets/sensec-logo1.png"
              sx={{ alignItems: "center" }}
            />
            <Box sx={{ display: "flex", height: "1.5rem" }}>
              <Typography variant="h6" color="green">
                Sen
              </Typography>
              <Typography variant="h6" color="#aeae0d">
                sec
              </Typography>
            </Box>
          </Box>
        </Stack>
        <Box>
          <NavigationBar
            setOpenSubNavLinks={setOpenSubNavLinks}
            openSubNavLinks={openSubNavLinks}
            setOpenUserActions={setOpenUserActions}
            openUserActions={openUserActions}
            setOpenSignUpActions={setOpenSignUpActions}
            openSignUpActions={openSignUpActions}
            setOpenMenuLinks={setOpenMenuLinks}
            openMenuLinks={openMenuLinks}
            currentAction={currentAction}
            setCurrentAction={setCurrentAction}
            currentLink={currentLink}
            setCurrentLink={setCurrentLink}
            isSidebarOpen={isSidebarOpen}
            openSearchModal={openSearchModal}
            setOpenSearchModal={setOpenSearchModal}
          />
        </Box>
      </Box>
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
                      <p className="studentId">[ Placement Student ]</p>
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
                                {foundStudent?.fullName
                                  ? foundStudent?.fullName
                                  : "---"}
                              </h3>
                              <span>[ Full Name ]</span>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <Box className="placementInfoBox">
                              <h3>
                                {foundStudent?.dateOfBirth
                                  ? dateFormatter.format(
                                      new Date(foundStudent?.dateOfBirth)
                                    )
                                  : "---"}
                              </h3>
                              <span>[ Date Of Birth]</span>
                            </Box>
                          </Grid>
                          {/* <Grid item xs={12} sm={6} md={4} lg={4}>
                            <Box className="placementInfoBox">
                              <h3>
                                {foundStudent?.otherName
                                  ? foundStudent?.otherName
                                  : "---"}
                              </h3>
                              <span>[ Other Name ]</span>
                            </Box>
                          </Grid> */}
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
                              <h3>{placementYear ? placementYear : "---"}</h3>
                              <span>[ Year Graduated ]</span>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <Box className="placementInfoBox">
                              <h3>{studentIndexNo ? studentIndexNo : "---"}</h3>
                              <span>[ JHS Index-Number ]</span>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <Box className="placementInfoBox">
                              <h3>
                                {foundStudent?.programme
                                  ? foundStudent?.programme
                                  : "---"}
                              </h3>
                              <span>[ Placement Verified ]</span>
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
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={4}
                            className="changeDOBWrap"
                          >
                            {/* {changeDOB && ( */}
                            <CustomMobileDatePicker
                              label={
                                <span>
                                  Date of Birth{" "}
                                  <span
                                    style={{
                                      color: placementStudent?.dateOfBirth
                                        ? "green"
                                        : "red",
                                      marginRight: "8px",
                                    }}
                                  >
                                    *
                                  </span>
                                </span>
                              }
                              name="dateOfBirth"
                              // inputFormat="MM/dd/yyyy"
                              value={
                                placementStudent?.dateOfBirth ||
                                dayjs("MM/DD/YYYY")
                              }
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
                              value={placementYear || ""}
                              onChange={handleInputValues}
                              autoComplete="off"
                              className="textField"
                              slotProps={{
                                input: { readOnly: true },
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4} lg={4}>
                            <CustomTextField
                              fullWidth
                              label="JHS Index No."
                              name="jhsIndexNo"
                              value={studentIndexNo || ""}
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
                              label="Contact Number"
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
                        </Grid>
                      </Box>
                    </Box>
                  )}
                  {updateData && (
                    <Box className="saveUpdateBtnWrap">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: !foundStudent?.enrolled
                            ? "green"
                            : "#adacaccc !important",
                          borderRadius: ".4rem",
                          color: "#fff !important",
                          "&.Mui-disabled": {
                            cursor: "not-allowed", // Show not-allowed cursor
                            pointerEvents: "auto",
                          },
                        }}
                        className="saveUpdateBtn"
                        onClick={handleDataUpdate}
                        disabled={foundStudent?.enrolled}
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
                        {updateData &&
                          loadingComplete === null &&
                          "Save Changes"}
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
                  placed into our school. You are therefore expected to follow
                  the following steps:
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
                  If you&apos;re ready to enroll, kindly click on the others
                  link with dropdown arrow on the navbar ( if on mobile, click
                  on the menu icon ) and select the enrollment option to begin
                  the enrollment process.
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
    </>
  );
}
