import { useEffect, useLayoutEffect, useState } from "react";
import "./studentEnrollment.scss";
import { ContainerBox, CustomTextField } from "../../../muiStyling/muiStyling";
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
import { getAllDivisionProgrammes } from "../../../features/academics/programmeSlice";
import { FetchAllClassLevels } from "../../../data/class/FetchClassLevel";
import { FetchAllBatches } from "../../../data/batch/FetchBatch";
import { toast } from "react-toastify";
import LoadingProgress from "../../../components/pageLoading/LoadingProgress";
import { TaskAlt } from "@mui/icons-material";
import Redirection from "../../../components/pageLoading/Redirection";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthUser } from "../../../features/auth/authSlice";
import {
  FetchAllApprovedStudents,
  FetchAllStudents,
} from "../../../data/students/FetchAllStudents";
import { dateFormatter } from "../../../dateFormatter/DateFormatter";

export function StudentDataUpdateForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector(getAuthUser);
  const { studentIndexNo, adminCurrentAction, adminCurrentLink, studentId } =
    useParams();
  const studentUniqueId = adminCurrentLink || studentId;
  const allStudents = FetchAllStudents();
  const allProgrammes = FetchAllProgrammes();
  const allClassLevels = FetchAllClassLevels();
  const allBatches = FetchAllBatches();
  const allDivisionProgrammes = useSelector(getAllDivisionProgrammes);
  const { enrollmentStatus, error, successMessage } = useSelector(
    (state) => state.student
  );

  // Handle Process State
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [redirecting, setRedirecting] = useState("");

  //   console.log(foundStudent);
  const foundStudent = allStudents?.find(
    (std) => std?.uniqueId === studentUniqueId
  );

  // Convert the birth date string to a JavaScript Date object
  const dateObject = foundStudent?.personalInfo?.dateOfBirth
    ? new Date(foundStudent?.personalInfo?.dateOfBirth).toISOString()
    : "";
  // Format the date to yyyy-MM-dd format
  const formattedDate = dateObject?.split("T")[0];

  // Student update state
  const [newStudent, setNewStudent] = useState({
    uniqueId: foundStudent?.uniqueId,
    firstName: foundStudent?.personalInfo?.firstName,
    lastName: foundStudent?.personalInfo?.lastName,
    otherName: foundStudent?.personalInfo?.otherName,
    dateOfBirth: formattedDate,
    placeOfBirth: foundStudent?.personalInfo?.placeOfBirth,
    nationality: foundStudent?.personalInfo?.nationality,
    gender: foundStudent?.personalInfo?.gender,
    profilePicture: foundStudent?.personalInfo?.profilePicture?.url,
    // School Data
    jhsAttended: foundStudent?.studentSchoolData?.jhsAttended,
    completedJhs: foundStudent?.studentSchoolData?.completedJhs,
    jhsIndexNo: foundStudent?.studentSchoolData?.jhsIndexNo,
    program: foundStudent?.studentSchoolData?.program?._id,
    currentClassLevel: foundStudent?.studentSchoolData?.currentClassLevel?._id,
    batch: foundStudent?.studentSchoolData?.batch?._id,
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
  });

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

  // Find student to update
  useEffect(() => {
    setNewStudent({
      uniqueId: foundStudent?.uniqueId,
      firstName: foundStudent?.personalInfo?.firstName,
      lastName: foundStudent?.personalInfo?.lastName,
      otherName: foundStudent?.personalInfo?.otherName,
      dateOfBirth: formattedDate,
      placeOfBirth: foundStudent?.personalInfo?.placeOfBirth,
      nationality: foundStudent?.personalInfo?.nationality,
      gender: foundStudent?.personalInfo?.gender,
      profilePicture: foundStudent?.personalInfo?.profilePicture?.url,
      // School Data
      jhsAttended: foundStudent?.studentSchoolData?.jhsAttended,
      completedJhs: foundStudent?.studentSchoolData?.completedJhs,
      jhsIndexNo: foundStudent?.studentSchoolData?.jhsIndexNo,
      program: foundStudent?.studentSchoolData?.program?._id,
      currentClassLevel:
        foundStudent?.studentSchoolData?.currentClassLevel?._id,
      batch: foundStudent?.studentSchoolData?.batch?._id,
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
    });
  }, [foundStudent, formattedDate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewStudent({
      ...newStudent,
      [name]: value,
    });
  };

  const psDOB = newStudent?.dateOfBirth
    ? new Date(newStudent?.dateOfBirth).toISOString()
    : "";
  // Handle enrollment
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      newStudent,
      dateOfBirth: psDOB,
    };
    dispatch(studentEnrollment(data));
  };

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
            `/sensec/students/enrollment/online/${newStudent?.uniqueId}/parent/add`
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
                  name="firstName"
                  value={newStudent?.firstName || ""}
                  onChange={handleChange}
                  className="textField"
                />
              </Grid>
              {/* Student Surname */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Surname"
                  name="lastName"
                  value={newStudent?.lastName || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* Student Other Name */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Other Name"
                  name="otherName"
                  value={newStudent?.otherName || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* Place Of Birth */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Place Of Birth"
                  name="placeOfBirth"
                  value={newStudent?.placeOfBirth || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* Date Of Birth */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  // label="DD/MM/YYYY"
                  name="dateOfBirth"
                  type="date"
                  value={newStudent?.dateOfBirth || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* Nationality */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Nationality"
                  name="nationality"
                  value={newStudent?.nationality || ""}
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
                  value={newStudent?.gender || ""}
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
                  value={newStudent?.motherTongue || ""}
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
                  value={newStudent?.otherTongue || ""}
                  onChange={handleChange}
                >
                  <MenuItem value="English">English</MenuItem>
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
                  value={newStudent?.complexion || ""}
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
                  value={newStudent?.height || ""}
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
                  value={newStudent?.weight || ""}
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
                  value={newStudent?.region || ""}
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
                  value={newStudent?.homeTown || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* House Address */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="House Address"
                  name="residentialAddress"
                  value={newStudent?.residentialAddress || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* District */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="District"
                  name="district"
                  value={newStudent?.district || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* Current City */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Current City"
                  name="currentCity"
                  value={newStudent?.currentCity || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* GPS Address */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="GPS Address"
                  name="gpsAddress"
                  value={newStudent?.gpsAddress || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* Email */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={newStudent?.email || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* Mobile */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Mobile"
                  name="mobile"
                  value={newStudent?.mobile || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* JHS Attended */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="JHS Attended"
                  name="jhsAttended"
                  value={newStudent?.jhsAttended || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* JHS Graduated Year */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="Year Graduated [ JHS ]"
                  name="completedJhs"
                  value={newStudent?.completedJhs || ""}
                  onChange={handleChange}
                />
              </Grid>
              {/* JHS Index No. */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  fullWidth
                  label="JHS Index No."
                  name="jhsIndexNo"
                  value={newStudent?.jhsIndexNo || ""}
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
                  name="program"
                  value={newStudent?.program || ""}
                  onChange={handleChange}
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
                    value={newStudent?.divisionProgram || ""}
                    onChange={handleChange}
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
                  name="currentClassLevel"
                  value={newStudent?.currentClassLevel || ""}
                  onChange={handleChange}
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
                  value={newStudent?.batch || ""}
                  onChange={handleChange}
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
                  name="residentialStatus"
                  value={newStudent?.residentialStatus || ""}
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
                            : newStudent?.profilePicture
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
      </ContainerBox>
    </>
  );
}
