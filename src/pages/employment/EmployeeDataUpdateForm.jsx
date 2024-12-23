import { useEffect, useState } from "react";
import "./assignLecturer.scss";
import {
  ContainerBox,
  CustomMobileDatePicker,
  CustomTextField,
} from "../../muiStyling/muiStyling";
import {
  MenuItem,
  Button,
  Grid,
  Box,
  Avatar,
  InputAdornment,
} from "@mui/material";
import { resetEnrolmentState } from "../../features/students/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllProgrammes } from "../../data/programme/FetchProgrammeData";
import { fetchAllPlacementStudents } from "../../features/academics/placementSlice";
import { toast } from "react-toastify";
import LoadingProgress from "../../components/pageLoading/LoadingProgress";
import { TaskAlt } from "@mui/icons-material";
import Redirection from "../../components/pageLoading/Redirection";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthUser } from "../../features/auth/authSlice";
import { FetchAllEmployees } from "../../data/allUsers/FetchAllUsers";
import { FetchAllClassSections } from "../../data/class/FetchClassSections";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export function EmployeeDataUpdateForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector(getAuthUser);
  const { adminCurrentAction, adminCurrentLink } = useParams();
  const allProgrammes = FetchAllProgrammes();
  const allEmployees = FetchAllEmployees();
  const allClassSections = FetchAllClassSections();
  const { enrollmentStatus, error, successMessage } = useSelector(
    (state) => state.student
  );

  // Employee Update state
  const [employee, setEmployee] = useState(null);
  console.log(employee);

  // Handle Process State
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [redirecting, setRedirecting] = useState("");

  // Get selected admin ID
  const employeeId = adminCurrentLink;
  const foundEmployee = allEmployees?.find(
    (adm) => adm?.uniqueId === employeeId
  );
  console.log(foundEmployee);

  // Convert the birth date string to a JavaScript Date object
  const dateObject = foundEmployee?.personalInfo?.dateOfBirth
    ? new Date(foundEmployee?.personalInfo?.dateOfBirth).toISOString()
    : "";
  // Format the date to yyyy-MM-dd format
  const formattedDate = dateObject?.split("T")[0];

  const [newEmployment, setNewEmployment] = useState({
    uniqueId: foundEmployee?.uniqueId,
    firstName: foundEmployee?.personalInfo?.firstName,
    lastName: foundEmployee?.personalInfo?.lastName,
    otherName: foundEmployee?.personalInfo?.otherName,
    dateOfBirth: formattedDate,
    placeOfBirth: foundEmployee?.personalInfo?.placeOfBirth,
    nationality: foundEmployee?.personalInfo?.nationality,
    gender: foundEmployee?.personalInfo?.gender,
    profilePicture: foundEmployee?.personalInfo?.profilePicture?.url,
    // School Data
    typeOfEmployment: foundEmployee?.employment?.employmentType,
    program: foundEmployee?.lecturerSchoolData?.program?._id,
    classSection: foundEmployee?.lecturerSchoolData?.classLevelHandling?._id,
    // Status
    height: foundEmployee?.status?.height,
    weight: foundEmployee?.status?.weight,
    complexion: foundEmployee?.status?.complexion,
    motherTongue: foundEmployee?.status?.motherTongue,
    otherTongue: foundEmployee?.status?.otherTongue,
    residentialStatus: foundEmployee?.status?.residentialStatus,
    // Contact Address
    homeTown: foundEmployee?.contactAddress?.homeTown,
    district: foundEmployee?.contactAddress?.district,
    region: foundEmployee?.contactAddress?.region,
    currentCity: foundEmployee?.contactAddress?.currentCity,
    residentialAddress: foundEmployee?.contactAddress?.residentialAddress,
    gpsAddress: foundEmployee?.contactAddress?.gpsAddress,
    mobile: foundEmployee?.contactAddress?.mobile,
    email: foundEmployee?.contactAddress?.email,
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
      setEmployee({ ...employee, [e.target.name]: file });
    }
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      // console.log(reader.result);
      setImagePreview(reader.result);
    };
  };
  // Handle input value change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested fields like "personalInfo.lastName"
    if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        [parentKey]: {
          ...prevEmployee[parentKey],
          [childKey]: value,
        },
      }));
    } else {
      // Handle top-level fields
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        [name]: value,
      }));
    }
  };
  // Handle date change
  const handleDateChange = (date) => {
    if (dayjs(date).isValid()) {
      setEmployee((prev) => ({
        ...prev,
        dateOfBirth: date, // Store the Date object directly
      }));
    }
  };

  // Reinitialize state when foundStudent changes
  useEffect(() => {
    if (
      foundEmployee &&
      (!employee || foundEmployee.uniqueId !== employee.uniqueId)
    ) {
      const formattedStudent = {
        ...foundEmployee,
        dateOfBirth: dayjs(foundEmployee?.personalInfo?.dateOfBirth).isValid()
          ? dayjs(foundEmployee?.personalInfo?.dateOfBirth)
          : dayjs("MM/DD/YYYY"),
        programId: foundEmployee?.lecturerSchoolData?.program?._id,
        classSectionId:
          foundEmployee?.lectureSchoolData?.classLevelHandling?._id,
      };
      setEmployee(formattedStudent);
    }
  }, [foundEmployee, employee]);

  // Persist admin update state
  useEffect(() => {
    setNewEmployment({
      uniqueId: foundEmployee?.uniqueId,
      firstName: foundEmployee?.personalInfo?.firstName,
      lastName: foundEmployee?.personalInfo?.lastName,
      otherName: foundEmployee?.personalInfo?.otherName,
      dateOfBirth: formattedDate,
      placeOfBirth: foundEmployee?.personalInfo?.placeOfBirth,
      nationality: foundEmployee?.personalInfo?.nationality,
      gender: foundEmployee?.personalInfo?.gender,
      profilePicture: foundEmployee?.personalInfo?.profilePicture?.url,
      // School Data
      typeOfEmployment: foundEmployee?.employment?.employmentType,
      program: foundEmployee?.lecturerSchoolData?.program?._id,
      classSection: foundEmployee?.lecturerSchoolData?.classLevelHandling?._id,
      // Status
      height: foundEmployee?.status?.height,
      weight: foundEmployee?.status?.weight,
      complexion: foundEmployee?.status?.complexion,
      motherTongue: foundEmployee?.status?.motherTongue,
      otherTongue: foundEmployee?.status?.otherTongue,
      residentialStatus: foundEmployee?.status?.residentialStatus,
      // Contact Address
      homeTown: foundEmployee?.contactAddress?.homeTown,
      district: foundEmployee?.contactAddress?.district,
      region: foundEmployee?.contactAddress?.region,
      currentCity: foundEmployee?.contactAddress?.currentCity,
      residentialAddress: foundEmployee?.contactAddress?.residentialAddress,
      gpsAddress: foundEmployee?.contactAddress?.gpsAddress,
      mobile: foundEmployee?.contactAddress?.mobile,
      email: foundEmployee?.contactAddress?.email,
    });
  }, [foundEmployee, formattedDate]); // Dependencies

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                  name="personalInfo.firstName"
                  value={employee?.personalInfo?.firstName || ""}
                  onChange={handleChange}
                  className="textField"
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: employee?.personalInfo?.firstName
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
                  name="personalInfo.lastName"
                  value={employee?.personalInfo?.lastName || ""}
                  onChange={handleChange}
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: employee?.personalInfo?.lastName ? "green" : "red", // Change the asterisk color to red
                    },
                  }}
                />
              </Grid>
              {/* Student Other Name */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Other Name"
                  name="personalInfo.otherName"
                  value={employee?.personalInfo?.otherName || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* Place Of Birth */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Place Of Birth"
                  name="personalInfo.placeOfBirth"
                  value={employee?.personalInfo?.placeOfBirth || ""}
                  onChange={handleChange}
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color: employee?.personalInfo?.placeOfBirth
                        ? "green"
                        : "red", // Change the asterisk color to red
                    },
                  }}
                />
              </Grid>
              {/* Date Of Birth */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomMobileDatePicker
                  label={<span>Date of Birth </span>}
                  name="dateOfBirth"
                  // inputFormat="MM/dd/yyyy"
                  value={employee?.dateOfBirth || dayjs("MM/DD/YYYY")}
                  onChange={handleDateChange}
                  maxDate={dayjs()}
                  slots={{
                    input: (params) => <CustomTextField {...params} />,
                  }}
                  // required
                  // error={false} // Make sure this is false
                  // helperText="" // Optionally clear helper text
                  sx={{
                    width: "100%",
                  }}
                />
              </Grid>
              {/* Nationality */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Nationality"
                  name="personalInfo.nationality"
                  value={employee?.personalInfo?.nationality || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* Gender Selection */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  select
                  fullWidth
                  label="Gender"
                  name="personalInfo.gender"
                  value={employee?.personalInfo?.gender || ""}
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
                  name="status.motherTongue"
                  value={employee?.status?.motherTongue || ""}
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
                  name="status.otherTongue"
                  value={employee?.status?.otherTongue || ""}
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
                  name="status.complexion"
                  value={employee?.status?.complexion || ""}
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
                  name="status.height"
                  value={employee?.status?.height || ""}
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
                  name="status.weight"
                  value={employee?.status?.weight || ""}
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
                  name="contactAddress.region"
                  value={employee?.contactAddress?.region || ""}
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
                  name="contactAddress.homeTown"
                  value={employee?.contactAddress?.homeTown || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* District */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="District"
                  name="contactAddress.district"
                  value={employee?.contactAddress?.district || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* Current City */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Current City"
                  name="contactAddress.currentCity"
                  value={employee?.contactAddress?.currentCity || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* House Address */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="House Address"
                  name="contactAddress.residentialAddress"
                  value={employee?.contactAddress?.residentialAddress || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* GPS Address */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="GPS Address"
                  name="contactAddress.gpsAddress"
                  value={employee?.contactAddress?.gpsAddress || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* Email */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Email"
                  name="contactAddress.email"
                  value={employee?.contactAddress?.email || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* Mobile */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Mobile"
                  name="contactAddress.mobile"
                  value={employee?.contactAddress?.mobile || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* Employment Type Selection */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  select
                  fullWidth
                  label="Employment Type"
                  name="employment.employmentType"
                  value={employee?.employment?.employmentType || ""}
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
              {employee?.lecturerSchoolData?.program && (
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    select
                    fullWidth
                    label="Select Programme"
                    name="programId"
                    value={
                      allProgrammes?.some(
                        (program) => program._id === employee?.programId
                      )
                        ? employee?.programId
                        : ""
                    }
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
              {foundEmployee?.roles?.includes("lecturer") && (
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    select
                    fullWidth
                    label="Assign Class"
                    name="classSectionId"
                    value={
                      allClassSections?.some(
                        (program) => program._id === employee?.classSectionId
                      )
                        ? employee?.classSectionId
                        : ""
                    }
                    onChange={handleChange}
                  >
                    {allClassSections?.map((cLevel) => (
                      <MenuItem key={cLevel?._id} value={cLevel?._id}>
                        {cLevel?.label} - {cLevel?.sectionName}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>
              )}
              {/* Residential Status Selection */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  select
                  fullWidth
                  label="Residential Status"
                  name="residentialStatus"
                  value={employee?.status?.residentialStatus || ""}
                  onChange={handleChange}
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
                            : employee?.personalInfo?.profilePicture?.url
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
    </LocalizationProvider>
  );
}
