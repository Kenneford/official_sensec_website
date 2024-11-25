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
import { FetchAllAdmins } from "../../data/admins/FetchAdmins";
import { FetchAllEmployees } from "../../data/allUsers/FetchAllUsers";
import { FetchAllClassSections } from "../../data/class/FetchClassSections";
import { FetchAllEmployedLecturers } from "../../data/lecturers/FetchLecturers";
import {
  assignClassSectionLecturer,
  resetAssignLecturer,
} from "../../features/academics/classSectionSlice";

export function AssignLectureClassForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authAdmin = useSelector(getAuthUser);
  const { employees, adminCurrentAction, adminCurrentLink } = useParams();
  const allProgrammes = FetchAllProgrammes();
  const allEmployedLecturers = FetchAllEmployedLecturers();
  const allEmployees = FetchAllEmployees();
  const allClassSections = FetchAllClassSections();
  const allDivisionProgrammes = useSelector(getAllDivisionProgrammes);
  const allPlacementStudents = useSelector(getAllPlacementStudents);
  const { assignLecturerStatus, error, successMessage } = useSelector(
    (state) => state.classSection
  );
  console.log(employees);

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
  // Find lecturer
  const foundLecturer = allEmployedLecturers?.find(
    (adm) => adm?.uniqueId === employees
  );

  const [updateLectureClassHandling, setUpdateLectureClassHandling] = useState({
    classSection: "",
  });
  console.log(updateLectureClassHandling);
  // Handle input value change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdateLectureClassHandling({
      ...updateLectureClassHandling,
      [name]: value,
    });
  };

  // Handle employment
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      lecturerId: employees,
      classSectionId: updateLectureClassHandling?.classSection,
      lecturerAssignedBy: authAdmin?.id,
    };
    dispatch(assignClassSectionLecturer({ data }));
    console.log(data);
  };

  //   // Handle enrollment status check
  useEffect(() => {
    if (assignLecturerStatus === "pending") {
      setLoadingComplete(false);
    }
    if (assignLecturerStatus === "rejected") {
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
        dispatch(resetAssignLecturer());
      }, 3000);
      return;
    }
    if (assignLecturerStatus === "success") {
      setTimeout(() => {
        setLoadingComplete(true);
      }, 3000);
      setTimeout(() => {
        setRedirecting(true);
      }, 6000);
      setTimeout(() => {
        navigate(
          `/sensec/users/${authAdmin?.uniqueId}/admin/User_Types/Lecturers/employees/All`
        );
      }, 9000);
    }
  }, [
    navigate,
    dispatch,
    assignLecturerStatus,
    error,
    successMessage,
    loadingComplete,
    adminCurrentAction,
    adminCurrentLink,
    authAdmin,
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
            <span>Assign Class Lecturer</span>
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
            width: { xs: "100%", sm: "90%", md: "70%", lg: "45%" },
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
              //   width: "60%",
              //   maxWidth: "35rem",
            }}
          >
            <Grid container spacing={3}>
              {/* Lecturer Info */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid item xs={12} sm={4}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                    >
                      <Avatar
                        src={foundLecturer?.personalInfo?.profilePicture?.url}
                        alt="Profile Preview"
                        sx={{
                          width: "6rem",
                          height: "6rem",
                          borderRadius: ".4rem",
                          border: "1px solid #696969",
                          padding: ".2rem",
                        }}
                      />
                      <Typography sx={{ color: "#696969", mt: 1 }}>
                        {foundLecturer &&
                          foundLecturer?.personalInfo?.gender === "Male" &&
                          "Mr."}{" "}
                        {foundLecturer &&
                          foundLecturer?.personalInfo?.gender === "Female" &&
                          "Mrs."}{" "}
                        {foundLecturer
                          ? foundLecturer?.personalInfo?.fullName
                          : ""}
                      </Typography>
                    </Box>
                  </Grid>
                </Box>
              </Grid>
              {/* Class Level Selection */}
              <Grid item xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  label="Select Section"
                  name="classSection"
                  value={updateLectureClassHandling?.classSection}
                  onChange={handleChange}
                  required
                >
                  {allClassSections?.map((cLevel) => (
                    <MenuItem key={cLevel?._id} value={cLevel?._id}>
                      {cLevel?.label} - {cLevel?.sectionName}
                    </MenuItem>
                  ))}
                </CustomTextField>
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
                    assignLecturerStatus === "success" &&
                    !redirecting && (
                      <>
                        <span>Successful</span> <TaskAlt />
                      </>
                    )}
                  {loadingComplete === null && "Assign Class"}
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
