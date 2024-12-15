import { useEffect, useMemo, useState } from "react";
import "./assignLecturer.scss";
import { ContainerBox, CustomTextField } from "../../muiStyling/muiStyling";
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
} from "../../features/students/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllProgrammes } from "../../data/programme/FetchProgrammeData";
import {
  fetchAllDivisionProgrammes,
  getAllDivisionProgrammes,
} from "../../features/academics/programmeSlice";
import { FetchAllBatches } from "../../data/batch/FetchBatch";
import {
  fetchAllPlacementStudents,
  getAllPlacementStudents,
} from "../../features/academics/placementSlice";
import { toast } from "react-toastify";
import LoadingProgress from "../../components/pageLoading/LoadingProgress";
import { TaskAlt } from "@mui/icons-material";
import Redirection from "../../components/pageLoading/Redirection";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthUser } from "../../features/auth/authSlice";
import { newEmployee } from "../../features/employments/employmentSlice";
import { FetchAllAdmins } from "../../data/admins/FetchAdmins";
import { FetchAllEmployees } from "../../data/allUsers/FetchAllUsers";
import { FetchAllClassSections } from "../../data/class/FetchClassSections";

export function EmployeeDataUpdateForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector(getAuthUser);
  const { studentIndexNo, adminCurrentAction, adminCurrentLink } = useParams();
  const allProgrammes = FetchAllProgrammes();
  const allEmployees = FetchAllEmployees();
  const allClassSections = FetchAllClassSections();
  const allBatches = FetchAllBatches();
  const allDivisionProgrammes = useSelector(getAllDivisionProgrammes);
  const allPlacementStudents = useSelector(getAllPlacementStudents);
  const { enrollmentStatus, error, successMessage } = useSelector(
    (state) => state.student
  );

  //Get current year and random number for student's unique-Id
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const num = Math.floor(10000 + Math.random() * 90000);
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

  // New Employee state
  const [userID, setUserID] = useState("");
  // Get selected admin ID
  const employeeId = adminCurrentLink;
  const foundAdmin = allEmployees?.find((adm) => adm?.uniqueId === employeeId);
  console.log(foundAdmin);

  // Convert the birth date string to a JavaScript Date object
  const dateObject = foundAdmin?.personalInfo?.dateOfBirth
    ? new Date(foundAdmin?.personalInfo?.dateOfBirth).toISOString()
    : "";
  // Format the date to yyyy-MM-dd format
  const formattedDate = dateObject?.split("T")[0];

  const [newEmployment, setNewEmployment] = useState({
    uniqueId: foundAdmin?.uniqueId,
    firstName: foundAdmin?.personalInfo?.firstName,
    lastName: foundAdmin?.personalInfo?.lastName,
    otherName: foundAdmin?.personalInfo?.otherName,
    dateOfBirth: formattedDate,
    placeOfBirth: foundAdmin?.personalInfo?.placeOfBirth,
    nationality: foundAdmin?.personalInfo?.nationality,
    gender: foundAdmin?.personalInfo?.gender,
    profilePicture: foundAdmin?.personalInfo?.profilePicture?.url,
    // School Data
    typeOfEmployment: foundAdmin?.employment?.employmentType,
    program: foundAdmin?.lecturerSchoolData?.program?._id,
    classSection: foundAdmin?.lecturerSchoolData?.classLevelHandling?._id,
    // Status
    height: foundAdmin?.status?.height,
    weight: foundAdmin?.status?.weight,
    complexion: foundAdmin?.status?.complexion,
    motherTongue: foundAdmin?.status?.motherTongue,
    otherTongue: foundAdmin?.status?.otherTongue,
    residentialStatus: foundAdmin?.status?.residentialStatus,
    // Contact Address
    homeTown: foundAdmin?.contactAddress?.homeTown,
    district: foundAdmin?.contactAddress?.district,
    region: foundAdmin?.contactAddress?.region,
    currentCity: foundAdmin?.contactAddress?.currentCity,
    residentialAddress: foundAdmin?.contactAddress?.residentialAddress,
    gpsAddress: foundAdmin?.contactAddress?.gpsAddress,
    mobile: foundAdmin?.contactAddress?.mobile,
    email: foundAdmin?.contactAddress?.email,
  });

  const [imagePreview, setImagePreview] = useState(null);

  // Handle image file upload
  const handleImageFileUpload = (e) => {
    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (file.size > maxSize) {
      alert("File is too large! Please select a file smaller than 5MB.");
      return;
    }
    if (e.target.files.length !== 0) {
      setNewEmployment({ ...newEmployment, [e.target.name]: file });
    }
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      // console.log(reader.result);
      setImagePreview(reader.result);

      setNewEmployment({
        ...newEmployment,
        profilePicture: reader.result,
      });
    };
  };
  // Helper function to generate new unique-Id for new employee
  const generateUniqueId = (employmentType, fName, lName) => {
    let prefix = "";
    switch (employmentType) {
      case "Administration":
        prefix = "ADM";
        break;
      case "Teaching Staff":
        prefix = "LCT";
        break;
      case "Non-Teaching Staff":
        prefix = "NTS";
        break;
      default:
        prefix = "EMP"; // Unknown or unspecified
    }
    // Get current year
    const currentYear = new Date().getFullYear();
    // Get initials from the first and last names
    const firstNameInitial = fName ? fName?.charAt(0)?.toUpperCase() : "";
    const lastNameInitial = lName ? lName?.charAt(0)?.toUpperCase() : "";
    // Generate a unique suffix using current timestamp or random number
    const uniqueSuffix = Date.now().toString().slice(-5); // Take last 5 digits for brevity
    return `${prefix}-${uniqueSuffix}${firstNameInitial}${lastNameInitial}-${currentYear}`;
  };
  // Handle input value change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewEmployment({
      ...newEmployment,
      [name]: value,
    });
  };

  // Use useEffect to automatically update the userID when any of the dependencies change
  useEffect(() => {
    const newId = generateUniqueId(
      newEmployment?.typeOfEmployment,
      newEmployment?.firstName,
      newEmployment?.lastName
    );
    setUserID(newId);
  }, [newEmployment]); // Dependencies

  // Persist admin update state
  useEffect(() => {
    setNewEmployment({
      uniqueId: foundAdmin?.uniqueId,
      firstName: foundAdmin?.personalInfo?.firstName,
      lastName: foundAdmin?.personalInfo?.lastName,
      otherName: foundAdmin?.personalInfo?.otherName,
      dateOfBirth: formattedDate,
      placeOfBirth: foundAdmin?.personalInfo?.placeOfBirth,
      nationality: foundAdmin?.personalInfo?.nationality,
      gender: foundAdmin?.personalInfo?.gender,
      profilePicture: foundAdmin?.personalInfo?.profilePicture?.url,
      // School Data
      typeOfEmployment: foundAdmin?.employment?.employmentType,
      program: foundAdmin?.lecturerSchoolData?.program?._id,
      classSection: foundAdmin?.lecturerSchoolData?.classLevelHandling?._id,
      // Status
      height: foundAdmin?.status?.height,
      weight: foundAdmin?.status?.weight,
      complexion: foundAdmin?.status?.complexion,
      motherTongue: foundAdmin?.status?.motherTongue,
      otherTongue: foundAdmin?.status?.otherTongue,
      residentialStatus: foundAdmin?.status?.residentialStatus,
      // Contact Address
      homeTown: foundAdmin?.contactAddress?.homeTown,
      district: foundAdmin?.contactAddress?.district,
      region: foundAdmin?.contactAddress?.region,
      currentCity: foundAdmin?.contactAddress?.currentCity,
      residentialAddress: foundAdmin?.contactAddress?.residentialAddress,
      gpsAddress: foundAdmin?.contactAddress?.gpsAddress,
      mobile: foundAdmin?.contactAddress?.mobile,
      email: foundAdmin?.contactAddress?.email,
    });
  }, [foundAdmin, formattedDate]); // Dependencies

  // Handle employment
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      uniqueId: userID,
      firstName: newEmployment?.firstName,
      lastName: newEmployment?.lastName,
      otherName: newEmployment?.otherName,
      dateOfBirth: newEmployment?.dateOfBirth,
      placeOfBirth: newEmployment?.placeOfBirth,
      nationality: newEmployment?.nationality,
      gender: newEmployment?.gender,
      profilePicture: newEmployment?.profilePicture,
      // School Data
      typeOfEmployment: newEmployment?.typeOfEmployment,
      // Status
      height: newEmployment?.height,
      weight: newEmployment?.weight,
      complexion: newEmployment?.complexion,
      motherTongue: newEmployment?.motherTongue,
      otherTongue: newEmployment?.otherTongue,
      residentialStatus: newEmployment?.residentialStatus,
      // Contact Address
      homeTown: newEmployment?.homeTown,
      district: newEmployment?.district,
      region: newEmployment?.region,
      currentCity: newEmployment?.currentCity,
      residentialAddress: newEmployment?.residentialAddress,
      gpsAddress: newEmployment?.gpsAddress,
      mobile: newEmployment?.mobile,
      email: newEmployment?.email,
    };
    // dispatch(newEmployee(data));
    console.log(data);
  };

  // Fetch needed data
  useEffect(() => {
    if (newEmployment?.program) {
      dispatch(
        fetchAllDivisionProgrammes({ programId: newEmployment?.program })
      );
    }
    dispatch(fetchAllPlacementStudents());
  }, [dispatch, newEmployment]);

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
      }, 6000);
      setTimeout(() => {
        if (authUser?.roles?.includes("admin")) {
          navigate(
            `/sensec/users/${authUser?.uniqueId}/admin/${adminCurrentAction}/${adminCurrentLink}/new_enrollment/parent/add`
          );
        } else {
          navigate(
            `/sensec/students/enrollment/online/${newEmployment?.uniqueId}/parent/add`
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
    newEmployment,
    adminCurrentAction,
    adminCurrentLink,
    authUser,
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
            {adminCurrentAction?.replace(/_/g, "-")} / <span>Update</span>
          </h1>
        </Box>
      )}
      <ContainerBox
        component="div"
        id="studentEnrollmentWrap"
        sx={{
          width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
          margin: "auto",
          p: { xs: "2rem .5rem", sm: "2rem" },
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {!adminCurrentAction && (
          <Box mb={2}>
            <Typography
              variant="h4"
              fontSize={{ xs: "1.4rem", sm: "1.7rem" }}
              color="#696969"
              textAlign={"center"}
              letterSpacing={1}
              fontWeight={500}
            >
              New Employment
            </Typography>
            <Typography
              variant="h6"
              textAlign={"center"}
              color="#696969"
              fontSize={{ xs: ".9rem", sm: "1rem" }}
            >
              ({" "}
              <span style={{ fontWeight: "500" }}>
                {currentYear}/{currentYear + 1}
              </span>{" "}
              Academic Year )
            </Typography>
          </Box>
        )}
        <Box
          component="div"
          id="enrollmentFormWrap"
          sx={{
            maxWidth: 1000,
            mx: "auto",
            // mt: 5,
            p: { xs: ".5rem .7rem", sm: 3 },
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
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
            <Grid container spacing={3}>
              {/* Student First Name */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={newEmployment?.firstName || ""}
                  onChange={handleChange}
                  className="textField"
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: newEmployment?.firstName ? "green" : "red", // Change the asterisk color to red
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
                  value={newEmployment?.lastName || ""}
                  onChange={handleChange}
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: newEmployment?.lastName ? "green" : "red", // Change the asterisk color to red
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
                  value={newEmployment?.otherName || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* Place Of Birth */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Place Of Birth"
                  name="placeOfBirth"
                  value={newEmployment?.placeOfBirth || ""}
                  onChange={handleChange}
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: newEmployment?.placeOfBirth ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                />
              </Grid>
              {/* Date Of Birth */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  // label="DD/MM/YYYY"
                  name="dateOfBirth"
                  type="date"
                  value={newEmployment?.dateOfBirth || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* Nationality */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Nationality"
                  name="nationality"
                  value={newEmployment?.nationality || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* Gender Selection */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  select
                  fullWidth
                  label="Gender"
                  name="gender"
                  value={newEmployment?.gender || ""}
                  onChange={handleChange}
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
                  value={newEmployment?.motherTongue || ""}
                  onChange={handleChange}
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
                  value={newEmployment?.otherTongue || ""}
                  onChange={handleChange}
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
                  value={newEmployment?.complexion || ""}
                  onChange={handleChange}
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
                  value={newEmployment?.height || ""}
                  onChange={handleChange}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">ft</InputAdornment>
                      ),
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
                  value={newEmployment?.weight || ""}
                  onChange={handleChange}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">kg</InputAdornment>
                      ),
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
                  value={newEmployment?.region || ""}
                  onChange={handleChange}
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
                  value={newEmployment?.homeTown || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* District */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="District"
                  name="district"
                  value={newEmployment?.district || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* Current City */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Current City"
                  name="currentCity"
                  value={newEmployment?.currentCity || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* House Address */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="House Address"
                  name="residentialAddress"
                  value={newEmployment?.residentialAddress || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* GPS Address */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="GPS Address"
                  name="gpsAddress"
                  value={newEmployment?.gpsAddress || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* Email */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={newEmployment?.email || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* Mobile */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Mobile"
                  name="mobile"
                  value={newEmployment?.mobile || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* Employment Type Selection */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  select
                  fullWidth
                  label="Employment Type"
                  name="typeOfEmployment"
                  value={newEmployment?.typeOfEmployment || ""}
                  onChange={handleChange}
                >
                  <MenuItem value="Administration">Administration</MenuItem>
                  <MenuItem value="Teaching Staff">Teaching Staff</MenuItem>
                  <MenuItem value="Non-Teaching Staff">
                    Non-Teaching Staff
                  </MenuItem>
                </CustomTextField>
              </Grid>
              {/* Programme Selection */}
              {newEmployment?.program && (
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    select
                    fullWidth
                    label="Select Programme"
                    name="program"
                    value={newEmployment?.program || ""}
                    onChange={handleChange}
                  >
                    {allProgrammes?.map((programme) => (
                      <MenuItem key={programme?._id} value={programme?._id}>
                        {programme?.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>
              )}
              {/* Class Level Selection */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  select
                  fullWidth
                  label="Assign Class"
                  name="classSection"
                  value={newEmployment?.classSection || ""}
                  onChange={handleChange}
                >
                  {allClassSections?.map((cLevel) => (
                    <MenuItem key={cLevel?._id} value={cLevel?._id}>
                      {cLevel?.label} - {cLevel?.sectionName}
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
                  value={newEmployment?.residentialStatus || ""}
                  onChange={handleChange}
                >
                  <MenuItem value="Day">Day</MenuItem>
                  <MenuItem value="Boarding">Boarding</MenuItem>
                  <MenuItem value="Hostel">Hostel</MenuItem>
                  <MenuItem value="Private">Private</MenuItem>
                  <MenuItem value="Lecturers Bangalow">
                    Lecturers Bangalow
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
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                    >
                      <Avatar
                        src={
                          imagePreview
                            ? imagePreview
                            : newEmployment?.profilePicture
                        }
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
                  {loadingComplete === null && "Save Changes"}
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
