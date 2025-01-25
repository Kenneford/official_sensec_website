import { useEffect, useState } from "react";
import "./studentEnrollment.scss";
import "./enrollmentUpdate.scss";
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
  resetEnrolmentUpdateState,
  studentPersonalDataUpdate,
  studentSchoolDataUpdate,
} from "../../../features/students/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchAllCreatedDivisionProgrammes,
  FetchAllFlattenedProgrammes,
  FetchAllProgrammes,
} from "../../../data/programme/FetchProgrammeData";
import { FetchAllClassLevels } from "../../../data/class/FetchClassLevel";
import { FetchAllBatches } from "../../../data/batch/FetchBatch";
import { toast } from "react-toastify";
import LoadingProgress from "../../../components/pageLoading/LoadingProgress";
import { ArrowBack, TaskAlt } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthUser } from "../../../features/auth/authSlice";
import { FetchAllStudents } from "../../../data/students/FetchAllStudents";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SmallFooter from "../../../components/footer/SmallFooter";

export function StudentEnrollmentUpdateForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminCurrentLink, studentId } = useParams();

  // Redux state data fetching
  const authUser = useSelector(getAuthUser);
  const allStudents = FetchAllStudents();
  const allProgrammes = FetchAllProgrammes();
  const allFlattenedProgrammes = FetchAllFlattenedProgrammes();
  const allClassLevels = FetchAllClassLevels();
  const allBatches = FetchAllBatches();
  const allDivisionProgrammes = FetchAllCreatedDivisionProgrammes();
  const { updateStatus, error } = useSelector((state) => state.student);

  // Student Update state
  const [student, setStudent] = useState(null);
  console.log(student);

  const [imagePreview, setImagePreview] = useState(null);
  const [updateSchoolData, setUpdateSchoolData] = useState(false);
  const [newProgrammeSelected, setNewProgrammeSelected] = useState({});

  // Handle Process State
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Get student's ID
  const studentUniqueId = adminCurrentLink || studentId;

  // Find student by unique ID
  const foundStudent = allStudents?.find(
    (std) => std?.uniqueId === studentUniqueId
  );
  console.log(foundStudent);
  console.log(foundStudent?.studentSchoolData?.batch?._id);

  // Handle image change
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
    };
  };

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      console.log("Scroll detected:", window.scrollY);
      if (window.scrollY >= 140) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    console.log(window.scrollY > 10);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle input value change
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

  // Handle date change
  const handleDateChange = (date) => {
    if (dayjs(date).isValid()) {
      setStudent((prev) => ({
        ...prev,
        dateOfBirth: date, // Store the Date object directly
      }));
    }
  };

  // Handle personal data update
  const handleSubmit = (event) => {
    event.preventDefault();
    const updateData = {
      studentId: student?.uniqueId,
      fullName: student?.personalInfo?.fullName,
      dateOfBirth: student?.dateOfBirth.toISOString(),
      placeOfBirth: student?.personalInfo?.placeOfBirth,
      nationality: student?.personalInfo?.nationality,
      gender: student?.personalInfo?.gender,
      profilePicture: imagePreview
        ? imagePreview
        : student?.personalInfo?.profilePicture,
      // Status
      height: student?.status?.height,
      weight: student?.status?.weight,
      complexion: student?.status?.complexion,
      motherTongue: student?.status?.motherTongue,
      otherTongue: student?.status?.otherTongue,
      // Contact Address
      homeTown: student?.contactAddress?.homeTown,
      district: student?.contactAddress?.district,
      region: student?.contactAddress?.region,
      currentCity: student?.contactAddress?.currentCity,
      residentialAddress: student?.contactAddress?.residentialAddress,
      gpsAddress: student?.contactAddress?.gpsAddress,
      mobile: student?.contactAddress?.mobile,
      email: student?.contactAddress?.email,
      lastUpdatedBy: authUser?.id,
    };
    console.log(updateData);
    dispatch(studentPersonalDataUpdate({ updateData }));
  };

  // Update school data function
  const handleSchoolDataUpdate = (e) => {
    e.preventDefault();
    const updateData = {
      studentId: student?.uniqueId,
      jhsAttended: student?.studentSchoolData?.jhsAttended,
      completedJhs: student?.studentSchoolData?.completedJhs,
      jhsIndexNo: student?.studentSchoolData?.jhsIndexNo,
      program: student?.programId,
      // programDivision: student?.divisionProgramId,
      currentClassLevel: student?.classLevelId,
      batch: student?.batchId,
      residentialStatus: student?.status?.residentialStatus,
      lastUpdatedBy: authUser?.id,
    };
    console.log(updateData);
    dispatch(studentSchoolDataUpdate({ updateData }));
  };

  // Reinitialize state when foundStudent changes
  useEffect(() => {
    if (
      foundStudent &&
      (!student || foundStudent.uniqueId !== student.uniqueId)
    ) {
      const formattedStudent = {
        ...foundStudent,
        dateOfBirth: dayjs(foundStudent?.personalInfo?.dateOfBirth).isValid()
          ? dayjs(foundStudent?.personalInfo?.dateOfBirth)
          : dayjs("MM/DD/YYYY"),
        programId: foundStudent?.studentSchoolData?.program?.programId,
        // divisionProgramId:
        //   foundStudent?.studentSchoolData?.divisionProgram?._id,
        batchId: foundStudent?.studentSchoolData?.batch?._id,
        classLevelId: foundStudent?.studentSchoolData?.currentClassLevel?._id,
      };
      setStudent(formattedStudent);
    }
  }, [foundStudent, student]);

  // Set newly selected programme
  useEffect(() => {
    if (student?.programId) {
      const programFound = allProgrammes?.find(
        (program) => program?._id === student?.programId
      );
      setNewProgrammeSelected(programFound);
    }
  }, [student, allProgrammes]);

  // Handle enrollment update status check
  useEffect(() => {
    if (updateStatus === "pending") {
      setLoadingComplete(false);
    }
    if (updateStatus === "rejected") {
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
        dispatch(resetEnrolmentUpdateState());
      }, 3000);
      return;
    }
    if (updateStatus === "success") {
      setTimeout(() => {
        setLoadingComplete(true);
      }, 3000);
      setTimeout(() => {
        setLoadingComplete(null);
        dispatch(resetEnrolmentUpdateState());
        setUpdateSchoolData(false);
      }, 7000);
    }
  }, [navigate, dispatch, updateStatus, error, loadingComplete]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* Current dashboard title */}
      <Box
        component={"div"}
        id="adminDashboardHeaderWrap"
        sx={{
          position: isScrolled ? "sticky" : "",
          top: 0,
          backgroundColor: "#fff",
          padding: 0,
          zIndex: 5,
          mb: "3.5rem",
        }}
        minHeight={"3.5rem"}
      >
        <h1 className="dashAction">
          Enrollment / <span>Update</span>
        </h1>
      </Box>
      <ContainerBox
        component="div"
        // id="studentEnrollmentWrap"
        sx={{
          width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
          margin: "auto",
          paddingTop: "unset",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
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
              marginTop: "unset",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                // display: "flex",
                // // flexDirection: "column",
                // justifyContent: "center",
                // alignItems: "center",
                textTransform: "capitalize",
                textAlign: "center",
                color: "#696969",
                fontSize: "1em",
                marginBottom: ".5rem",
              }}
            >
              To update your school data, click
              <span
                style={{
                  color: "#0bbad9",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  marginLeft: 5,
                }}
                onClick={() => setUpdateSchoolData((data) => !data)}
              >
                {/* <Button
                sx={{ bgcolor: "transparent", textTransform: "capitalize" }}
                onClick={() => setUpdateSchoolData((data) => !data)}
              > */}
                Here...
                {/* </Button> */}
              </span>
            </Typography>
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
                    label="Full Name"
                    name="personalInfo.fullName"
                    value={student?.personalInfo?.fullName || ""}
                    onChange={handleChange}
                    className="textField"
                    // InputProps={{
                    //   readOnly: !authUser?.roles?.includes("admin"),
                    // }}
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
                    maxDate={dayjs()}
                    slots={{
                      input: (params) => <CustomTextField {...params} />,
                    }}
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
                    value={student?.personalInfo?.nationality || ""}
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
                    value={student?.personalInfo?.gender || ""}
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
                    value={student?.status?.motherTongue || ""}
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
                    value={student?.status?.otherTongue || ""}
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
                    value={student?.status?.complexion || ""}
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
                    value={student?.status?.height || ""}
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
                    value={student?.status?.weight || ""}
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
                    value={student?.contactAddress?.region || ""}
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
                    value={student?.contactAddress?.homeTown || ""}
                    onChange={handleChange}
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
                  />
                </Grid>
                {/* Student User Name */}
                {foundStudent?.signedUp && (
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    <CustomTextField
                      fullWidth
                      label="Username"
                      name="userSignUpDetails.userName"
                      value={student?.userSignUpDetails?.userName || ""}
                      onChange={handleChange}
                      className="textField"
                      InputProps={{
                        readOnly: authUser?.uniqueId !== student?.uniqueId,
                      }}
                    />
                  </Grid>
                )}

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
                    {loadingComplete === true && updateStatus === "success" && (
                      <>
                        <span>Updated Successfully</span> <TaskAlt />
                      </>
                    )}
                    {loadingComplete === null &&
                      updateStatus !== "success" &&
                      "Save Changes"}
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
                marginBottom: "1rem",
              }}
            >
              Only Admins
            </Typography>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                // flexDirection: "column",
                // justifyContent: "center",
                alignItems: "center",
                textTransform: "capitalize",
                // textAlign: "center",
                color: "#696969",
                fontSize: "1em",
                marginBottom: "1rem",
              }}
            >
              <Button
                sx={{
                  bgcolor: "#292929",
                  textTransform: "capitalize",
                  color: "#fff",
                }}
                onClick={() => setUpdateSchoolData((data) => !data)}
              >
                <ArrowBack />
              </Button>
            </Typography>
            <form
              onSubmit={handleSchoolDataUpdate}
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
                    slotProps={{
                      input: { readOnly: true },
                    }}
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
                    slotProps={{
                      input: { readOnly: true },
                    }}
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
                    // disabled
                    slotProps={{
                      input: { readOnly: true },
                    }}
                  />
                </Grid>
                {/* Programme Selection */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    select
                    fullWidth
                    label="Select Programme"
                    name="programId"
                    value={student?.programId || ""}
                    onChange={handleChange}
                    slotProps={{
                      input: {
                        readOnly: !authUser?.roles?.includes("Admin")
                          ? true
                          : false,
                      },
                    }}
                  >
                    {allFlattenedProgrammes?.map((programme) => (
                      <MenuItem key={programme?._id} value={programme?._id}>
                        {programme?.name
                          ? programme?.name
                          : programme?.divisionName}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Grid>
                {/* Division Program (conditional) */}
                {/* {newProgrammeSelected?.hasDivisions === "true" && (
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    <CustomTextField
                      select
                      fullWidth
                      label="Division Program"
                      name="divisionProgramId"
                      value={
                        allDivisionProgrammes?.some(
                          (program) =>
                            program._id === student?.divisionProgramId
                        )
                          ? student?.divisionProgramId
                          : ""
                      }
                      onChange={handleChange}

                      //   required
                    >
                      {allDivisionProgrammes?.map((programme) => (
                        <Box key={programme?._id}>
                          {programme?.programId ===
                            newProgrammeSelected?._id && (
                            <MenuItem
                              key={programme?._id}
                              value={programme?._id}
                            >
                              {programme?.divisionName}
                            </MenuItem>
                          )}
                        </Box>
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
                    slotProps={{
                      input: {
                        readOnly: !authUser?.roles?.includes("Admin")
                          ? true
                          : false,
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
                    name="batchId"
                    value={
                      allBatches?.some(
                        (batch) => batch._id === student?.batchId
                      )
                        ? student?.batchId
                        : ""
                    }
                    onChange={handleChange}
                    slotProps={{
                      input: {
                        readOnly: !authUser?.roles?.includes("Admin")
                          ? true
                          : false,
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
                {/* Residential Status Selection */}
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    select
                    fullWidth
                    label="Residential Status"
                    name="status.residentialStatus"
                    value={student?.status?.residentialStatus || ""}
                    onChange={handleChange}
                    slotProps={{
                      input: {
                        readOnly: !authUser?.roles?.includes("Admin")
                          ? true
                          : false,
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
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    fullWidth
                    disabled={!authUser?.roles?.includes("Admin")}
                    sx={{
                      height: "3.5rem",
                      letterSpacing: "1px",
                      textTransform: "capitalize",
                      fontSize: "1.2rem",
                      "&.Mui-disabled": {
                        cursor: "not-allowed", // Show not-allowed cursor
                        pointerEvents: "auto",
                      },
                    }}
                  >
                    {loadingComplete === false && (
                      <LoadingProgress color={"#fff"} size={"1.5rem"} />
                    )}
                    {loadingComplete === true && updateStatus === "success" && (
                      <>
                        <span>Updated Successfully</span> <TaskAlt />
                      </>
                    )}
                    {loadingComplete === null &&
                      updateStatus !== "success" &&
                      "Save Changes"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        )}
      </ContainerBox>
      <SmallFooter />
    </LocalizationProvider>
  );
}
