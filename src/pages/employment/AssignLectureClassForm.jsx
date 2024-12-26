import { useEffect, useState } from "react";
import "./assignLecturer.scss";
import { ContainerBox, CustomTextField } from "../../muiStyling/muiStyling";
import { MenuItem, Button, Grid, Box, Avatar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingProgress from "../../components/pageLoading/LoadingProgress";
import { TaskAlt } from "@mui/icons-material";
import Redirection from "../../components/pageLoading/Redirection";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthUser } from "../../features/auth/authSlice";
import { FetchAllClassSections } from "../../data/class/FetchClassSections";
import { FetchAllEmployedLecturers } from "../../data/lecturers/FetchLecturers";
import {
  assignClassSectionLecturer,
  resetAssignLecturer,
} from "../../features/academics/classSectionSlice";

export function AssignLectureClassForm() {
  const lecturerId = localStorage.getItem("lecturerId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authAdmin = useSelector(getAuthUser);
  const { adminCurrentAction, adminCurrentLink } = useParams();
  const allEmployedLecturers = FetchAllEmployedLecturers();
  const allClassSections = FetchAllClassSections();
  const { assignLecturerStatus, error, successMessage } = useSelector(
    (state) => state.classSection
  );

  // Handle Process State
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [redirecting, setRedirecting] = useState("");

  // Find lecturer
  const foundLecturer = allEmployedLecturers?.find(
    (adm) => adm?.uniqueId === lecturerId
  );

  const [updateLectureClassHandling, setUpdateLectureClassHandling] = useState({
    classSection: "",
  });
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
      lecturerId: foundLecturer?.uniqueId,
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
        dispatch(resetAssignLecturer());
        navigate(
          `/sensec/users/${authAdmin?.uniqueId}/admin/User_Types/Lecturers/employees/All`
        );
        localStorage.removeItem("lecturerId");
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
                    <Typography
                      sx={{ color: "#696969", mt: 1, textAlign: "center" }}
                    >
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
