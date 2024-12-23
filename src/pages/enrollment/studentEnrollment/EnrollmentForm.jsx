import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import "./studentEnrollment.scss";
import {
  ContainerBox,
  CustomMobileDatePicker,
  CustomTextField,
} from "../../../muiStyling/muiStyling";
import {
  MenuItem,
  Button,
  Grid,
  Box,
  Avatar,
  InputAdornment,
  Typography,
} from "@mui/material";
import {
  resetEnrolmentState,
  studentEnrollment,
} from "../../../features/students/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllProgrammes } from "../../../data/programme/FetchProgrammeData";
import {
  fetchAllDivisionProgrammes,
  getAllDivisionProgrammes,
} from "../../../features/academics/programmeSlice";
import { FetchAllClassLevels } from "../../../data/class/FetchClassLevel";
import { FetchAllBatches } from "../../../data/batch/FetchBatch";
import {
  fetchAllPlacementStudents,
  getAllPlacementStudents,
} from "../../../features/academics/placementSlice";
import {
  dateFormatter,
  shortDateFormatter,
} from "../../../dateFormatter/DateFormatter";
import { toast } from "react-toastify";
import LoadingProgress from "../../../components/pageLoading/LoadingProgress";
import { TaskAlt } from "@mui/icons-material";
import Redirection from "../../../components/pageLoading/Redirection";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthUser } from "../../../features/auth/authSlice";
import { FetchAllStudents } from "../../../data/students/FetchAllStudents";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export function EnrollmentForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector(getAuthUser);
  const { studentIndexNo, adminCurrentAction, adminCurrentLink } = useParams();
  const indexNumber = localStorage.getItem("indexNumber");
  const allProgrammes = FetchAllProgrammes();
  const allStudents = FetchAllStudents();
  const allClassLevels = FetchAllClassLevels();
  const allBatches = FetchAllBatches();
  const allDivisionProgrammes = useSelector(getAllDivisionProgrammes);
  const allPlacementStudents = useSelector(getAllPlacementStudents);
  const { enrollmentStatus, error, successMessage } = useSelector(
    (state) => state.student
  );

  //Get current year and random number for student's unique-Id
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const [num] = useState(Math.floor(10000 + Math.random() * 90000));
  const academicYear = `${currentYear} / ${nextYear}`;

  // Dynamically calculate academic year base on current month of the Year
  const getAcademicYears = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 2024;
    const currentMonth = new Date().getMonth();

    // If the current month is September or later, increment the end year for the academic range
    const endYear = currentMonth >= 8 ? currentYear : currentYear - 1;
    const academicYears = [];

    // Generate academic years from 2020 up to the calculated end year
    for (let year = startYear; year <= endYear; year++) {
      academicYears.push(`${year}/${year + 1}`);
    }

    return academicYears;
  };
  const academicYears = getAcademicYears();

  // Handle Process State
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [redirecting, setRedirecting] = useState("");

  // Handle Errors
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [jhsAttendedError, setJhsAttendedError] = useState(false);
  const [graduatedJhsError, setGraduatedJhsError] = useState(false);
  const [jhsIndexNoError, setJhsIndexNoError] = useState(false);

  // New Student state
  const [studentId, setStudentId] = useState("");
  console.log(studentId);

  const [newStudent, setNewStudent] = useState({
    uniqueId: studentId ? studentId : "",
    firstName: "",
    lastName: "",
    otherName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    nationality: "",
    gender: "",
    profilePicture: "",
    // School Data
    jhsAttended: "",
    completedJhs: "",
    jhsIndexNo: studentIndexNo,
    program: "",
    divisionProgram: "",
    optionalElectiveSubject: "",
    currentClassLevel: "",
    currentAcademicYear: "",
    batch: "",
    // Status
    height: "",
    weight: "",
    complexion: "",
    motherTongue: "",
    otherTongue: "",
    residentialStatus: "",
    // Contact Address
    homeTown: "",
    district: "",
    region: "",
    currentCity: "",
    residentialAddress: "",
    gpsAddress: "",
    mobile: "",
    email: "",
  });
  console.log(newStudent);

  // Helper function to generate new unique-Id for new student
  const generateUniqueId = (fName, lName) => {
    // Get current year
    const currentYear = new Date().getFullYear();
    // Get initials from the first and last names
    const firstNameInitial = fName ? fName?.charAt(0)?.toUpperCase() : "";
    const lastNameInitial = lName ? lName?.charAt(0)?.toUpperCase() : "";
    // Generate a unique suffix using current timestamp or random number
    const uniqueSuffix = Date.now().toString().slice(-5); // Take last 5 digits for brevity
    return `STD-${uniqueSuffix}${firstNameInitial}${lastNameInitial}-${currentYear}`;
  };
  // Use useEffect to automatically update the userID when any of the dependencies change
  useEffect(() => {
    const newId = generateUniqueId(newStudent?.firstName, newStudent?.lastName);
    setStudentId(newId);
  }, [newStudent]);

  // Find student's programme
  const studentFound = allStudents?.find(
    (student) => student?.studentSchoolData?.jhsIndexNo === studentIndexNo
  );
  console.log(studentFound);

  // Find student's programme
  const studentProgramme = allProgrammes?.find(
    (programme) => programme?._id === newStudent?.program
  );
  // Find student's division programme
  const selectedDivisionProgramme = allDivisionProgrammes?.find(
    (programme) => programme?._id === newStudent?.divisionProgram
  );

  const [imagePreview, setImagePreview] = useState(null);
  const handleImageFileUpload = (e) => {
    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file.size > maxSize) {
      alert("File is too large! Please select a file smaller than 5MB.");
      return;
    }
    if (e.target.files.length !== 0) {
      setNewStudent({ ...newStudent, [e.target.name]: file });
    }
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      // console.log(reader.result);
      setImagePreview(reader.result);

      setNewStudent({
        ...newStudent,
        profilePicture: reader.result,
      });
    };
  };

  // console.log(memoizedStudentUniqueId);
  // useLayoutEffect runs before the browser paints, allowing for DOM manipulations
  // that need to happen before the user sees the update.
  // useLayoutEffect(() => {
  //   const studentUniqueId = `STD-${num}${newStudent?.firstName.charAt(
  //     0
  //   )}${newStudent?.lastName.charAt(0)}-${currentYear}`;
  //   if (newStudent?.uniqueId === "") {
  //     setNewStudent({
  //       ...newStudent,
  //       uniqueId: studentUniqueId,
  //     });
  //   }
  // }, [currentYear, newStudent, num]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewStudent({
      ...newStudent,
      [name]: value,
    });
  };
  const handleDateChange = (field, date) => {
    setNewStudent((prev) => ({
      ...prev,
      [field]: date, // Store the Date object directly
    }));
  };

  // Generate new unique-Id for old student
  // useMemo(() => {
  //   if (newStudent?.firstName && newStudent?.lastName) {
  //     const studentUniqueId = `STD-${num}${newStudent?.firstName.charAt(
  //       0
  //     )}${newStudent?.lastName.charAt(0)}-${currentYear}`;
  //     if (newStudent?.uniqueId === "") {
  //       setNewStudent({
  //         ...newStudent,
  //         uniqueId: studentUniqueId,
  //       });
  //     }
  //   }
  //   // return studentUniqueId;
  // }, [newStudent, currentYear, num]);

  // memoizedStudentUniqueId();
  // Update student unique ID
  // useEffect(() => {
  //   if (memoizedStudentUniqueId) {
  //   }
  // }, [memoizedStudentUniqueId]);

  const psDOB = newStudent?.dateOfBirth
    ? new Date(newStudent?.dateOfBirth).toISOString()
    : "";

  // Handle enrollment
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      studentId,
      newStudent,
      dateOfBirth: psDOB,
    };
    dispatch(studentEnrollment(data));
  };
  // Find placement student
  const memoizedPlacementStudentData = useMemo(() => {
    const placementStudentFound = allPlacementStudents?.find(
      (std) => std?.jhsIndexNo === newStudent?.jhsIndexNo
    );
    return placementStudentFound;
  }, [allPlacementStudents, newStudent]);

  // Fetch needed data
  useEffect(() => {
    if (newStudent?.program) {
      dispatch(fetchAllDivisionProgrammes({ programId: newStudent?.program }));
    }
    dispatch(fetchAllPlacementStudents());
  }, [dispatch, newStudent]);

  // Validate input data
  useEffect(() => {
    // First Name
    if (
      memoizedPlacementStudentData &&
      newStudent?.firstName &&
      memoizedPlacementStudentData?.firstName !== newStudent?.firstName
    ) {
      setFirstNameError(true);
      return;
    } else {
      setFirstNameError(false);
    }
    // Surname
    if (
      memoizedPlacementStudentData &&
      newStudent?.lastName &&
      memoizedPlacementStudentData?.lastName !== newStudent?.lastName
    ) {
      setLastNameError(true);
      return;
    } else {
      setLastNameError(false);
    }
    // Date Of Birth
    // if (
    //   memoizedPlacementStudentData &&
    //   newStudent?.dateOfBirth &&
    //   psDOB !== newStudent?.dateOfBirth
    // ) {
    //   setDateOfBirthError(true);
    //   return;
    // } else {
    //   setDateOfBirthError(false);
    // }
    // Jhs Attended
    if (
      memoizedPlacementStudentData &&
      newStudent?.jhsAttended &&
      memoizedPlacementStudentData?.jhsAttended !== newStudent?.jhsAttended
    ) {
      setJhsAttendedError(true);
      return;
    } else {
      setJhsAttendedError(false);
    }
    // Jhs Graduated Year
    if (
      memoizedPlacementStudentData &&
      newStudent?.completedJhs &&
      memoizedPlacementStudentData?.yearGraduated !== newStudent?.completedJhs
    ) {
      setGraduatedJhsError(true);
      return;
    } else {
      setGraduatedJhsError(false);
    }
    // Jhs Index No
    if (newStudent?.jhsIndexNo && !memoizedPlacementStudentData) {
      setJhsIndexNoError(true);
      return;
    } else {
      setJhsIndexNoError(false);
    }
  }, [newStudent, memoizedPlacementStudentData]);

  // Handle enrollment status check
  useEffect(() => {
    if (enrollmentStatus === "pending") {
      setLoadingComplete(false);
    }
    if (enrollmentStatus === "rejected") {
      setTimeout(() => {
        error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "light",
            toastId: err,
          })
        );
      }, 2000);
      setTimeout(() => {
        setLoadingComplete(null);
        dispatch(resetEnrolmentState());
      }, 3000);
      return;
    }
    if (enrollmentStatus === "success") {
      setTimeout(() => {
        setLoadingComplete(true);
      }, 3000);
      setTimeout(() => {
        setRedirecting(true);
        dispatch(resetEnrolmentState());
      }, 6000);
      setTimeout(() => {
        if (authUser?.roles?.includes("admin")) {
          navigate(
            `/sensec/users/${authUser?.uniqueId}/admin/User-Types/Students/${studentId}/new_enrollment/parent/add`
          );
        } else {
          navigate(
            `/sensec/students/enrollment/online/${studentId}/parent/add`
          );
        }
      }, 9000);
    }
  }, [
    navigate,
    dispatch,
    enrollmentStatus,
    error,
    successMessage,
    loadingComplete,
    newStudent,
    adminCurrentAction,
    adminCurrentLink,
    authUser,
    studentId,
  ]);

  return (
    <>
      {/* Current dashboard title */}
      {adminCurrentAction && adminCurrentLink && (
        <Box
          component={"div"}
          id="adminDashboardHeaderWrap"
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
            padding: 0,
            // zIndex: 1,
          }}
          minHeight={"4rem"}
        >
          <h1 className="dashAction">
            {adminCurrentAction?.replace(/_/g, "-")} /{" "}
            <span>{adminCurrentLink?.replace(/_/g, " ")}</span>
          </h1>
          {/* {studentFound && (
            <Box textAlign={"right"} mt={1} fontSize={"1em"} color={"red"}>
              <p>
                An existing student found with your index number &quot;
                {studentFound?.studentSchoolData?.jhsIndexNo}&quot;
              </p>
            </Box>
          )} */}
        </Box>
      )}
      <ContainerBox
        component="div"
        id="studentEnrollmentWrap"
        sx={{
          width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
          margin: "auto",
          paddingTop: "2rem",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Typography
          variant="h6"
          fontSize={{ xs: "1.2rem", sm: "1.2rem", md: "1.4rem", lg: "1.7rem" }}
          textAlign={"center"}
          color="#696969"
        >
          Student Online Enrollment
        </Typography>
        <Typography textAlign={"center"} color="#696969">
          ({" "}
          <span style={{ fontWeight: "500" }}>
            {currentYear}/{currentYear + 1}
          </span>{" "}
          Academic Year )
        </Typography>
        <Box
          component="div"
          id="enrollmentFormWrap"
          sx={{
            maxWidth: 1000,
            mx: "auto",
            mt: 5,
            p: 3,
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          {/* <Typography
          variant="h6"
          component={"p"}
          fontWeight={300}
          mb={3}
          color="#cccc"
          fontSize={"1em"}
          lineHeight={"1.2em"}
          letterSpacing={"1px"}
          // textAlign={"center"}
          bgcolor={"#292929"}
          borderRadius={".4rem"}
          padding={"1rem"}
        >
          To enroll into Senya Senior High School, you will be redirected to few
          other pages. Please, kindly go through all the processes and also make
        //   sure to fill all required fields in order to ensure a successful
          enrollment.
        </Typography> */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
              padding: ".5rem 0",
              fontSize: "calc(0.7rem + 1vmin)",
            }}
          >
            {/* <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            sx={{
              width: "7rem",
              height: "7rem",
              "&:hover": { cursor: "pointer" },
            }}
          /> */}
            {/* <Avatar {...stringAvatar("Kent Dodds")} /> */}
            <Grid container spacing={3}>
              {/* Student First Name */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={newStudent?.firstName}
                  onChange={handleChange}
                  required
                  className="textField"
                  error={firstNameError}
                  helperText={
                    firstNameError ? "First name is not correct!" : ""
                  }
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color:
                        newStudent?.firstName && !firstNameError
                          ? "green"
                          : "red", // Change the asterisk color to red
                    },
                  }}
                />
              </Grid>
              {/* Student Surname */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Surname"
                  name="lastName"
                  value={newStudent?.lastName}
                  onChange={handleChange}
                  required
                  error={lastNameError}
                  helperText={lastNameError ? "Surname is not correct!" : ""}
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color:
                        newStudent?.lastName && !lastNameError
                          ? "green"
                          : "red", // Change the asterisk color to red
                    },
                  }}
                />
              </Grid>
              {/* Student Other Name */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Other Name"
                  name="otherName"
                  value={newStudent?.otherName}
                  onChange={handleChange}
                />
              </Grid>
              {/* Place Of Birth */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Place Of Birth"
                  name="placeOfBirth"
                  value={newStudent?.placeOfBirth}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: newStudent?.placeOfBirth ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                />
              </Grid>
              {/* Date Of Birth */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                {/* <CustomTextField
                  fullWidth
                  // label="DD/MM/YYYY"
                  name="dateOfBirth"
                  type="date"
                  value={newStudent?.dateOfBirth || ""}
                  onChange={handleChange}
                  required
                /> */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <CustomMobileDatePicker
                    // label="From"
                    label={
                      <span>
                        Date of Birth{" "}
                        <span
                          style={{
                            color: !newStudent?.dateOfBirth ? "red" : "green", // Dynamically set the asterisk color
                            marginRight: "8px",
                          }}
                        >
                          *
                        </span>
                      </span>
                    }
                    name="dateOfBirth"
                    // inputFormat="MM/dd/yyyy"
                    value={newStudent?.dateOfBirth || {}}
                    onChange={(date) => handleDateChange("dateOfBirth", date)}
                    renderInput={(params) => <CustomTextField {...params} />}
                    error={false} // Make sure this is false
                    helperText="" // Optionally clear helper text
                    sx={{
                      width: "100%",
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              {/* Nationality */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Nationality"
                  name="nationality"
                  value={newStudent?.nationality}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: newStudent?.nationality ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                />
              </Grid>
              {/* Gender Selection */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  select
                  fullWidth
                  label="Gender"
                  name="gender"
                  value={newStudent?.gender}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: newStudent?.gender ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </CustomTextField>
              </Grid>
              {/* Mother Tongue */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  select
                  fullWidth
                  label="Mother Tongue"
                  name="motherTongue"
                  value={newStudent?.motherTongue}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: newStudent?.motherTongue ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                >
                  <MenuItem value="Twi">Twi</MenuItem>
                  <MenuItem value="Fante">Fante</MenuItem>
                  <MenuItem value="Ga">Ga</MenuItem>
                  <MenuItem value="Ewe">Ewe</MenuItem>
                  <MenuItem value="Nzema">Nzema</MenuItem>
                  <MenuItem value="Hausa">Hausa</MenuItem>
                  <MenuItem value="Gonja">Gonja</MenuItem>
                  <MenuItem value="Kwa">Kwa</MenuItem>
                  <MenuItem value="Dagbani">Dagbani</MenuItem>
                  <MenuItem value="Dagaare">Dagaare</MenuItem>
                  <MenuItem value="Kulango">Kulango</MenuItem>
                  <MenuItem value="Senufo">Senufo</MenuItem>
                  <MenuItem value="Mande">Mande</MenuItem>
                  <MenuItem value="Dangme">Dangme</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </CustomTextField>
              </Grid>
              {/* Other Tongue */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  select
                  fullWidth
                  label="Other Tongue"
                  name="otherTongue"
                  value={newStudent?.otherTongue}
                  onChange={handleChange}
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: newStudent?.otherTongue ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                >
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="French">French</MenuItem>
                  <MenuItem value="Spanish">Spanish</MenuItem>
                  <MenuItem value="Deutsch">Deutsch</MenuItem>
                  <MenuItem value="Italian">Italian</MenuItem>
                  <MenuItem value="Arabic">Arabic</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </CustomTextField>
              </Grid>
              {/* Complexion */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  select
                  fullWidth
                  label="Complexion"
                  name="complexion"
                  value={newStudent?.complexion}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: newStudent?.complexion ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                >
                  <MenuItem value="Very Fair">Very Fair</MenuItem>
                  <MenuItem value="Fair">Fair</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Olive">Olive</MenuItem>
                  <MenuItem value="Brown">Brown</MenuItem>
                  <MenuItem value="Black">Black</MenuItem>
                </CustomTextField>
              </Grid>
              {/* Height */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Height"
                  name="height"
                  value={newStudent?.height}
                  onChange={handleChange}
                  required
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">ft</InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: newStudent?.height ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                />
              </Grid>
              {/* Weight */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Weight"
                  name="weight"
                  value={newStudent?.weight}
                  onChange={handleChange}
                  required
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">kg</InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: newStudent?.weight ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                />
              </Grid>
              {/* Region */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  select
                  label="Region"
                  name="region"
                  value={newStudent?.region}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: newStudent?.region ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                >
                  <MenuItem value="Greater Accra">Greater Accra</MenuItem>
                  <MenuItem value="Ashanti">Ashanti</MenuItem>
                  <MenuItem value="Volta">Volta</MenuItem>
                  <MenuItem value="Central">Central</MenuItem>
                  <MenuItem value="Eastern">Eastern</MenuItem>
                  <MenuItem value="Western">Western</MenuItem>
                  <MenuItem value="Oti">Oti</MenuItem>
                  <MenuItem value="Bono">Bono</MenuItem>
                  <MenuItem value="Bono East">Bono East</MenuItem>
                  <MenuItem value="Ahafo">Ahafo</MenuItem>
                  <MenuItem value="Brong Ahafo">Brong Ahafo</MenuItem>
                  <MenuItem value="Northern">Northern</MenuItem>
                  <MenuItem value="Western North">Western North</MenuItem>
                  <MenuItem value="Upper West">Upper West</MenuItem>
                  <MenuItem value="Upper East">Upper East</MenuItem>
                  <MenuItem value="North East">North East</MenuItem>
                </CustomTextField>
              </Grid>
              {/* HomeTown */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="HomeTown"
                  name="homeTown"
                  value={newStudent?.homeTown}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: newStudent?.homeTown ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                />
              </Grid>
              {/* House Address */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="House Address"
                  name="residentialAddress"
                  value={newStudent?.residentialAddress}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: newStudent?.residentialAddress ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                />
              </Grid>
              {/* District */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="District"
                  name="district"
                  value={newStudent?.district}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: newStudent?.district ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                />
              </Grid>
              {/* Current City */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Current City"
                  name="currentCity"
                  value={newStudent?.currentCity}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: newStudent?.currentCity ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                />
              </Grid>
              {/* GPS Address */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="GPS Address"
                  name="gpsAddress"
                  value={newStudent?.gpsAddress}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: newStudent?.gpsAddress ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                />
              </Grid>
              {/* Email */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={newStudent?.email}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: newStudent?.email ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                />
              </Grid>
              {/* Mobile */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Mobile"
                  name="mobile"
                  value={newStudent?.mobile}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: newStudent?.mobile ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                />
              </Grid>
              {/* JHS Attended */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="JHS Attended"
                  name="jhsAttended"
                  value={newStudent?.jhsAttended}
                  onChange={handleChange}
                  required
                  error={jhsAttendedError}
                  helperText={
                    jhsAttendedError ? "JHS attended is not correct!" : ""
                  }
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color:
                        newStudent?.jhsAttended && !jhsAttendedError
                          ? "green"
                          : "red", // Change the asterisk color to red
                    },
                  }}
                />
              </Grid>
              {/* JHS Graduated Year */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Year Graduated [ JHS ]"
                  name="completedJhs"
                  value={newStudent?.completedJhs}
                  onChange={handleChange}
                  required
                  error={graduatedJhsError}
                  helperText={
                    graduatedJhsError ? "Graduated year is not correct!" : ""
                  }
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color:
                        newStudent?.completedJhs && !graduatedJhsError
                          ? "green"
                          : "red", // Change the asterisk color to red
                    },
                  }}
                />
              </Grid>
              {/* JHS Index No. */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="JHS Index No."
                  name="jhsIndexNo"
                  value={newStudent?.jhsIndexNo}
                  onChange={handleChange}
                  // disabled={
                  //   !authUser ||
                  //   (authUser && authUser?.roles?.includes("admin"))
                  // }
                  slotProps={{ input: { readOnly: true } }}
                />
              </Grid>
              {/* Programme Selection */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  select
                  fullWidth
                  label="Select Programme"
                  name="program"
                  value={newStudent?.program}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: newStudent?.program ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                >
                  {allProgrammes?.map((programme) => (
                    <MenuItem key={programme?._id} value={programme?._id}>
                      {programme?.name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              {/* Division Program (conditional) */}
              {allDivisionProgrammes && allDivisionProgrammes?.length > 0 && (
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    select
                    fullWidth
                    label="Division Program"
                    name="divisionProgram"
                    value={newStudent?.divisionProgram}
                    onChange={handleChange}
                    required={
                      allDivisionProgrammes && allDivisionProgrammes?.length > 0
                    }
                    sx={{
                      "& .MuiInputLabel-asterisk": {
                        color: newStudent?.divisionProgram ? "green" : "red", // Change the asterisk color to red
                      },
                    }}
                  >
                    {allDivisionProgrammes?.map((programme) => (
                      <MenuItem key={programme?._id} value={programme?._id}>
                        {programme?.divisionName}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>
              )}
              {/* Optional Elective Subject (conditional) */}
              {selectedDivisionProgramme &&
                selectedDivisionProgramme?.optionalElectiveSubjects?.length >
                  0 && (
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    <CustomTextField
                      select
                      fullWidth
                      label="Optional Elective Subject"
                      name="optionalElectiveSubject"
                      value={newStudent?.optionalElectiveSubject}
                      onChange={handleChange}
                      required
                      sx={{
                        "& .MuiInputLabel-asterisk": {
                          color: newStudent?.optionalElectiveSubject
                            ? "green"
                            : "red", // Change the asterisk color to red
                        },
                      }}
                    >
                      {selectedDivisionProgramme?.optionalElectiveSubjects?.map(
                        (subject) => (
                          <MenuItem key={subject?._id} value={subject?._id}>
                            {subject?.subjectName}
                          </MenuItem>
                        )
                      )}
                    </CustomTextField>
                  </Grid>
                )}
              {allDivisionProgrammes &&
                !allDivisionProgrammes?.length > 0 &&
                studentProgramme?.optionalElectiveSubjects?.length > 0 && (
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    <CustomTextField
                      select
                      fullWidth
                      label="Optional Elective Subject"
                      name="optionalElectiveSubject"
                      value={newStudent?.optionalElectiveSubject}
                      onChange={handleChange}
                      required
                      sx={{
                        "& .MuiInputLabel-asterisk": {
                          color: newStudent?.optionalElectiveSubject
                            ? "green"
                            : "red", // Change the asterisk color to red
                        },
                      }}
                    >
                      {studentProgramme?.optionalElectiveSubjects?.map(
                        (subject) => (
                          <MenuItem key={subject?._id} value={subject?._id}>
                            {subject?.subjectName}
                          </MenuItem>
                        )
                      )}
                    </CustomTextField>
                  </Grid>
                )}
              {/* Class Level Selection */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  select
                  fullWidth
                  label="Class Level"
                  name="currentClassLevel"
                  value={newStudent?.currentClassLevel}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: newStudent?.currentClassLevel ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                >
                  {allClassLevels?.map((cLevel) => (
                    <MenuItem key={cLevel?._id} value={cLevel?._id}>
                      {cLevel?.name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              {/* Batch Selection */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  select
                  fullWidth
                  label="Batch"
                  name="batch"
                  value={newStudent?.batch}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: newStudent?.batch ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                >
                  {allBatches?.map((batch) => (
                    <MenuItem key={batch?._id} value={batch?._id}>
                      {batch?.yearRange}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              {/* Academic Year Selection */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  select
                  fullWidth
                  label="Academic Year"
                  name="currentAcademicYear"
                  value={newStudent?.currentAcademicYear}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: newStudent?.currentAcademicYear ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                  // disabled
                >
                  {academicYears.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              {/* Residential Status Selection */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  select
                  fullWidth
                  label="Residential Status"
                  name="residentialStatus"
                  value={newStudent?.residentialStatus}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: newStudent?.residentialStatus ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                >
                  <MenuItem value="Day">Day</MenuItem>
                  <MenuItem value="Boarding">Boarding</MenuItem>
                  <MenuItem value="Hostel">Hostel</MenuItem>
                  <MenuItem value="Private">Private</MenuItem>
                  <MenuItem value="Lecturers Bungalow">
                    Lecturers Bungalow
                  </MenuItem>
                </CustomTextField>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      component="label"
                      fullWidth
                      sx={{
                        textTransform: "capitalize",
                        backgroundColor: "#292929",
                        padding: "1rem",
                      }}
                    >
                      Upload Image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageFileUpload}
                      />
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    {imagePreview && (
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="100%"
                      >
                        <Avatar
                          src={imagePreview}
                          alt="Profile Preview"
                          sx={{
                            width: "6rem",
                            height: "6rem",
                            borderRadius: ".4rem",
                            border: "1px solid #696969",
                            padding: ".2rem",
                          }}
                        />
                      </Box>
                    )}
                  </Grid>
                </Box>
              </Grid>
              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  fullWidth
                  sx={{
                    height: "3.5rem",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                    fontSize: "1.2rem",
                  }}
                >
                  {loadingComplete === false && (
                    <LoadingProgress color={"#fff"} size={"1.5rem"} />
                  )}
                  {loadingComplete === true &&
                    enrollmentStatus === "success" &&
                    !redirecting && (
                      <>
                        <span>Successful</span> <TaskAlt />
                      </>
                    )}
                  {loadingComplete === null && "Submit Enrollment"}
                  {redirecting && (
                    <Redirection color={"#fff"} size={"1.5rem"} />
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </ContainerBox>
    </>
  );
}
