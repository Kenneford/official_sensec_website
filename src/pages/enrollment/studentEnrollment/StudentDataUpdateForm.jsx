import { useEffect, useLayoutEffect, useState } from "react";
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
import { resetEnrolmentState } from "../../../features/students/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllProgrammes } from "../../../data/programme/FetchProgrammeData";
import { getAllDivisionProgrammes } from "../../../features/academics/programmeSlice";
import { FetchAllClassLevels } from "../../../data/class/FetchClassLevel";
import { FetchAllBatches } from "../../../data/batch/FetchBatch";
import { toast } from "react-toastify";
import LoadingProgress from "../../../components/pageLoading/LoadingProgress";
import { TaskAlt } from "@mui/icons-material";
import Redirection from "../../../components/pageLoading/Redirection";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthUser } from "../../../features/auth/authSlice";
import { FetchAllStudents } from "../../../data/students/FetchAllStudents";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export function StudentDataUpdateForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector(getAuthUser);
  console.log(authUser);

  const { adminCurrentAction, adminCurrentLink, studentId } = useParams();
  const studentUniqueId = adminCurrentLink || studentId;
  const allStudents = FetchAllStudents();
  const allProgrammes = FetchAllProgrammes();
  const allClassLevels = FetchAllClassLevels();
  const allBatches = FetchAllBatches();
  const allDivisionProgrammes = useSelector(getAllDivisionProgrammes);
  const { enrollmentStatus, error, successMessage } = useSelector(
    (state) => state.student
  );
  console.log(allProgrammes);

  // Student Update state
  const [student, setStudent] = useState(null);
  console.log(student?.programId);
  console.log(student);

  // Handle Process State
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [redirecting, setRedirecting] = useState("");

  const [updateSchoolData, setUpdateSchoolData] = useState(false);
  console.log(updateSchoolData);

  const foundStudent = allStudents?.find(
    (std) => std?.uniqueId === studentUniqueId
  );
  console.log(foundStudent);
  console.log(foundStudent?.studentSchoolData?.batch?._id);

  // Convert the birth date string to a JavaScript Date object
  const dateObject = foundStudent?.personalInfo?.dateOfBirth
    ? new Date(foundStudent?.personalInfo?.dateOfBirth).toISOString()
    : "";
  // Format the date to yyyy-MM-dd format
  const formattedDate = dateObject?.split("T")[0];

  // Find student's programme
  const studentProgramme = allProgrammes?.find(
    (programme) => programme?._id === student?.program
  );
  // Find student's division programme
  const selectedDivisionProgramme = allDivisionProgrammes?.find(
    (programme) => programme?._id === student?.divisionProgram
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
      setStudent({ ...student, [e.target.name]: file });
    }
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      // console.log(reader.result);
      setImagePreview(reader.result);

      setStudent({
        ...student,
        profilePicture: reader.result,
      });
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested fields like "personalInfo.lastName"
    if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");
      setStudent((prevStudent) => ({
        ...prevStudent,
        [parentKey]: {
          ...prevStudent[parentKey],
          [childKey]: value,
        },
      }));
    } else {
      // Handle top-level fields
      setStudent((prevStudent) => ({
        ...prevStudent,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (date) => {
    if (dayjs(date).isValid()) {
      setStudent((prev) => ({
        ...prev,
        dateOfBirth: date, // Store the Date object directly
      }));
    }
  };
  const psDOB = student?.dateOfBirth
    ? new Date(student?.dateOfBirth).toISOString()
    : "";
  // Handle enrollment
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      uniqueId: foundStudent?.uniqueId,
      firstName: foundStudent?.personalInfo?.firstName,
      lastName: foundStudent?.personalInfo?.lastName,
      otherName: foundStudent?.personalInfo?.otherName,
      dateOfBirth: student?.dateOfBirth.toISOString(),
      placeOfBirth: foundStudent?.personalInfo?.placeOfBirth,
      nationality: foundStudent?.personalInfo?.nationality,
      gender: foundStudent?.personalInfo?.gender,
      profilePicture: foundStudent?.personalInfo?.profilePicture?.url,
      // School Data
      jhsAttended: foundStudent?.studentSchoolData?.jhsAttended,
      completedJhs: foundStudent?.studentSchoolData?.completedJhs,
      jhsIndexNo: foundStudent?.studentSchoolData?.jhsIndexNo,
      program: student?.programId,
      currentClassLevel: student?.classLevelId,
      batch: student?.batchId,
      // Status
      height: foundStudent?.status?.height,
      weight: foundStudent?.status?.weight,
      complexion: foundStudent?.status?.complexion,
      motherTongue: foundStudent?.status?.motherTongue,
      otherTongue: foundStudent?.status?.otherTongue,
      residentialStatus: foundStudent?.status?.residentialStatus,
      // Contact Address
      homeTown: foundStudent?.contactAddress?.homeTown,
      district: foundStudent?.contactAddress?.district,
      region: foundStudent?.contactAddress?.region,
      currentCity: foundStudent?.contactAddress?.currentCity,
      residentialAddress: foundStudent?.contactAddress?.residentialAddress,
      gpsAddress: foundStudent?.contactAddress?.gpsAddress,
      mobile: foundStudent?.contactAddress?.mobile,
      email: foundStudent?.contactAddress?.email,
    };
    console.log(data);

    // dispatch(studentEnrollment(data));
  };

  // Reinitialize state when foundStudent changes
  useEffect(() => {
    if (foundStudent) {
      const formattedStudent = {
        ...foundStudent,
        dateOfBirth: dayjs(foundStudent?.personalInfo?.dateOfBirth).isValid()
          ? dayjs(foundStudent?.personalInfo?.dateOfBirth)
          : dayjs("MM/DD/YYYY"),
        programId: foundStudent?.studentSchoolData?.program?._id,
        batchId: foundStudent?.studentSchoolData?.batch?._id,
        classLevelId: foundStudent?.studentSchoolData?.currentClassLevel?._id,
      };
      setStudent(formattedStudent);
    } else {
      setStudent(null); // No student found
    }
  }, [foundStudent]);

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
            `/sensec/students/enrollment/online/${student?.uniqueId}/parent/add`
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
    student,
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
          paddingTop: "2rem",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {studentId && (
          <Typography
            variant="h6"
            sx={{
              textTransform: "uppercase",
              textAlign: "center",
              color: "#696969",
              fontSize: "1em",
            }}
          >
            Update Data
          </Typography>
        )}
        {!studentId && (
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              // flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textTransform: "capitalize",
              // textAlign: "center",
              color: "#696969",
              fontSize: "1em",
            }}
          >
            To update student&apos;s school data, click
            <span
              style={{
                color: "#0bbad9",
                cursor: "pointer",
                // textTransform: "capitalize",
                marginLeft: 4,
              }}
              onClick={() => setUpdateSchoolData((data) => !data)}
            >
              {/* <Button
                sx={{ bgcolor: "transparent", textTransform: "capitalize" }}
                onClick={() => setUpdateSchoolData((data) => !data)}
              > */}
              here...
              {/* </Button> */}
            </span>
          </Typography>
        )}
        {!updateSchoolData && (
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
                    value={student?.personalInfo?.firstName || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
                    className="textField"
                    // InputProps={{
                    //   readOnly: !authUser?.roles?.includes("admin"),
                    // }}
                  />
                </Grid>
                {/* Student Surname */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    fullWidth
                    label="Surname"
                    name="personalInfo.lastName"
                    value={student?.personalInfo?.lastName || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
                  />
                </Grid>
                {/* Student Other Name */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    fullWidth
                    label="Other Name"
                    name="personalInfo.otherName"
                    value={student?.personalInfo?.otherName || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
                  />
                </Grid>
                {/* Place Of Birth */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    fullWidth
                    label="Place Of Birth"
                    name="personalInfo.placeOfBirth"
                    value={student?.personalInfo?.placeOfBirth || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
                  />
                </Grid>
                {/* Date Of Birth */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomMobileDatePicker
                    label={<span>Date of Birth </span>}
                    name="dateOfBirth"
                    // inputFormat="MM/dd/yyyy"
                    value={student?.dateOfBirth || dayjs("MM/DD/YYYY")}
                    onChange={handleDateChange}
                    disabled={!authUser?.roles?.includes("admin")}
                    maxDate={dayjs()}
                    slots={{
                      input: (params) => <CustomTextField {...params} />,
                    }}
                    required
                    error={false} // Make sure this is false
                    helperText="" // Optionally clear helper text
                    sx={{
                      width: "100%",
                      cursor: "pointer",
                      "& .MuiInputLabel-asterisk": {
                        color: foundStudent?.dateOfBirth ? "green" : "red", // Change the asterisk color to red
                      },
                    }}
                  />
                </Grid>
                {/* Nationality */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    fullWidth
                    label="Nationality"
                    name="personalInfo.nationality"
                    value={student?.personalInfo?.nationality || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
                  />
                </Grid>
                {/* Gender Selection */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    select
                    fullWidth
                    label="Gender"
                    name="personalInfo.gender"
                    value={student?.personalInfo?.gender || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
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
                    value={student?.status?.motherTongue || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
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
                    value={student?.status?.otherTongue || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
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
                    value={student?.status?.complexion || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
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
                    value={student?.status?.height || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
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
                    value={student?.status?.weight || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
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
                    value={student?.contactAddress?.region || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
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
                    value={student?.contactAddress?.homeTown || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
                  />
                </Grid>
                {/* House Address */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    fullWidth
                    label="House Address"
                    name="contactAddress.residentialAddress"
                    value={student?.contactAddress?.residentialAddress || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
                  />
                </Grid>
                {/* District */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    fullWidth
                    label="District"
                    name="contactAddress.district"
                    value={student?.contactAddress?.district || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
                  />
                </Grid>
                {/* Current City */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    fullWidth
                    label="Current City"
                    name="contactAddress.currentCity"
                    value={student?.contactAddress?.currentCity || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
                  />
                </Grid>
                {/* GPS Address */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    fullWidth
                    label="GPS Address"
                    name="contactAddress.gpsAddress"
                    value={student?.contactAddress?.gpsAddress || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
                  />
                </Grid>
                {/* Email */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    fullWidth
                    label="Email"
                    name="contactAddress.email"
                    value={student?.contactAddress?.email || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
                  />
                </Grid>
                {/* Mobile */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    fullWidth
                    label="Mobile"
                    name="contactAddress.mobile"
                    value={student?.contactAddress?.mobile || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
                  />
                </Grid>
                {/* JHS Attended */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    fullWidth
                    label="JHS Attended"
                    name="studentSchoolData.jhsAttended"
                    value={student?.studentSchoolData?.jhsAttended || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
                  />
                </Grid>
                {/* JHS Graduated Year */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    fullWidth
                    label="Year Graduated [ JHS ]"
                    name="studentSchoolData.completedJhs"
                    value={student?.studentSchoolData?.completedJhs || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
                  />
                </Grid>
                {/* JHS Index No. */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    fullWidth
                    label="JHS Index No."
                    name="studentSchoolData.jhsIndexNo"
                    value={student?.studentSchoolData?.jhsIndexNo || ""}
                    onChange={handleChange}
                    disabled
                  />
                </Grid>
                {/* Programme Selection */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    select
                    fullWidth
                    label="Select Programme"
                    name="programId"
                    value={
                      allProgrammes?.some(
                        (program) => program._id === student?.programId
                      )
                        ? student?.programId
                        : ""
                    }
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
                  >
                    {allProgrammes?.map((programme) => (
                      <MenuItem key={programme?._id} value={programme?._id}>
                        {programme?.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>
                {/* Division Program (conditional) */}
                {/* {allDivisionProgrammes && allDivisionProgrammes?.length > 0 && (
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    select
                    fullWidth
                    label="Division Program"
                    name="divisionProgram"
                    value={student?.studentSchoolData?.divisionProgram || ""}
                    onChange={handleChange}
                  disabled={!authUser?.roles?.includes("admin")}
                    //   required
                  >
                    {allDivisionProgrammes?.map((programme) => (
                      <MenuItem key={programme?._id} value={programme?._id}>
                        {programme?.divisionName}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>
              )} */}
                {/* Class Level Selection */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    select
                    fullWidth
                    label="Class Level"
                    name="classLevelId"
                    value={
                      allClassLevels?.some(
                        (cLevel) => cLevel._id === student?.classLevelId
                      )
                        ? student?.classLevelId
                        : ""
                    }
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
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
                    name="batchId"
                    value={
                      allBatches?.some(
                        (batch) => batch._id === student?.batchId
                      )
                        ? student?.batchId
                        : ""
                    }
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
                  >
                    {allBatches?.map((batch) => (
                      <MenuItem key={batch?._id} value={batch?._id}>
                        {batch?.yearRange}
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
                    name="status.residentialStatus"
                    value={student?.status?.residentialStatus || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
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
                {/* Student User Name */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    fullWidth
                    label="Username"
                    name="userSignUpDetails.userName"
                    value={student?.userSignUpDetails?.userName || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
                    className="textField"
                    InputProps={{
                      readOnly: authUser?.uniqueId !== student?.uniqueId,
                    }}
                  />
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
                        Change Image
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleImageFileUpload}
                        />
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      {/* {imagePreview && ( */}
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
                              : student?.personalInfo?.profilePicture?.url
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
                      {/* )} */}
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
        )}
        {updateSchoolData && (
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
                {/* JHS Attended */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    fullWidth
                    label="JHS Attended"
                    name="studentSchoolData.jhsAttended"
                    value={student?.studentSchoolData?.jhsAttended || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
                  />
                </Grid>
                {/* JHS Graduated Year */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    fullWidth
                    label="Year Graduated [ JHS ]"
                    name="studentSchoolData.completedJhs"
                    value={student?.studentSchoolData?.completedJhs || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
                  />
                </Grid>
                {/* JHS Index No. */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    fullWidth
                    label="JHS Index No."
                    name="studentSchoolData.jhsIndexNo"
                    value={student?.studentSchoolData?.jhsIndexNo || ""}
                    onChange={handleChange}
                    disabled
                  />
                </Grid>
                {/* Programme Selection */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    select
                    fullWidth
                    label="Select Programme"
                    name="programId"
                    value={
                      allProgrammes?.some(
                        (program) => program._id === student?.programId
                      )
                        ? student?.programId
                        : ""
                    }
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
                  >
                    {allProgrammes?.map((programme) => (
                      <MenuItem key={programme?._id} value={programme?._id}>
                        {programme?.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>
                {/* Division Program (conditional) */}
                {/* {allDivisionProgrammes && allDivisionProgrammes?.length > 0 && (
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    select
                    fullWidth
                    label="Division Program"
                    name="divisionProgram"
                    value={student?.studentSchoolData?.divisionProgram || ""}
                    onChange={handleChange}
                  disabled={!authUser?.roles?.includes("admin")}
                    //   required
                  >
                    {allDivisionProgrammes?.map((programme) => (
                      <MenuItem key={programme?._id} value={programme?._id}>
                        {programme?.divisionName}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>
              )} */}
                {/* Class Level Selection */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    select
                    fullWidth
                    label="Class Level"
                    name="classLevelId"
                    value={
                      allClassLevels?.some(
                        (cLevel) => cLevel._id === student?.classLevelId
                      )
                        ? student?.classLevelId
                        : ""
                    }
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
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
                    name="batchId"
                    value={
                      allBatches?.some(
                        (batch) => batch._id === student?.batchId
                      )
                        ? student?.batchId
                        : ""
                    }
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
                  >
                    {allBatches?.map((batch) => (
                      <MenuItem key={batch?._id} value={batch?._id}>
                        {batch?.yearRange}
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
                    name="status.residentialStatus"
                    value={student?.status?.residentialStatus || ""}
                    onChange={handleChange}
                    disabled={!authUser?.roles?.includes("admin")}
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
                        Change Image
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleImageFileUpload}
                        />
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      {/* {imagePreview && ( */}
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
                              : student?.personalInfo?.profilePicture?.url
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
                      {/* )} */}
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
        )}
      </ContainerBox>
    </LocalizationProvider>
  );
}
