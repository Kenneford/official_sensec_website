import { ContainerBox, CustomTextField } from "../../../muiStyling/muiStyling";
import "./studentPlacementVerification.scss";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Button, Grid, Box, Typography, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import {
  fetchAllPlacementStudents,
  getAllPlacementStudents,
  resetPlacementState,
  verifyPlacementStudent,
} from "../../../features/academics/placementSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FetchAllStudents } from "../../../data/students/FetchAllStudents";
import { TaskAlt } from "@mui/icons-material";
import Redirection from "../../../components/pageLoading/Redirection";
import LoadingProgress from "../../../components/pageLoading/LoadingProgress";
import { getAuthUser } from "../../../features/auth/authSlice";
import { NavigationBar } from "../../../components/navbar/NavigationBar";

export function StudentPlacementVerification() {
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
  } = useOutletContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminCurrentAction, adminCurrentLink } = useParams();
  const allPlacementStudents = useSelector(getAllPlacementStudents);
  const allStudents = FetchAllStudents();
  const authUser = useSelector(getAuthUser);
  // Placement status check
  const { verifyStatus, error, successMessage } = useSelector(
    (state) => state.placement
  );

  // Input values error state handling
  const [jhsIndexNoError, setJhsIndexNoError] = useState(false);
  const [yearGraduatedError, setYearGraduatedError] = useState(false);

  const [loadingComplete, setLoadingComplete] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [hasEnrolled, setHasEnrolled] = useState(false);

  const [formData, setFormData] = useState({
    yearGraduated: "",
    jhsIndexNo: "",
  });

  // Find the specific student who wants to verify his/her placement
  const foundPlacementStudent = allPlacementStudents?.find(
    (std) => std?.jhsIndexNo === formData?.jhsIndexNo
  );
  // Check if student has verified but not done enrolling
  const verifiedButNotDoneEnrolling = allStudents?.find(
    (std) =>
      // std?.uniqueId === foundPlacementStudent?.enrollmentId &&
      std?.studentStatusExtend?.enrollmentStatus === "in progress"
  );
  // Check if student has enrolled already
  const enrolledStudent = allStudents?.find(
    (std) =>
      std?.uniqueId === foundPlacementStudent?.enrollmentId &&
      std?.studentStatusExtend?.enrollmentStatus === "approved"
  );
  console.log(foundPlacementStudent);
  console.log(enrolledStudent);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle verification
  const handleVerification = (e) => {
    e.preventDefault();
    setLoadingComplete(false);
    if (!foundPlacementStudent?.yearGraduated) {
      return setTimeout(() => {
        toast.error("Placement data not yet updated!", {
          position: "top-right",
          theme: "light",
          toastId: "placementDataError",
        });
        setLoadingComplete(null);
      }, 3000);
    }
    //If placement verified but enrollment is in progress, navigate to add parent page
    else if (
      foundPlacementStudent?.placementVerified &&
      !foundPlacementStudent?.enrolled &&
      verifiedButNotDoneEnrolling
    ) {
      setTimeout(() => {
        setLoadingComplete(true);
        setIsVerified(true);
      }, 3000);
      setTimeout(() => {
        setRedirecting(true);
        setIsVerified(false);
      }, 5000);
      setTimeout(() => {
        if (adminCurrentAction) {
          navigate(
            `/sensec/users/${authUser?.uniqueId}/admin/User-Types/Students/${foundPlacementStudent?.enrollmentId}/new_enrollment/parent/add`
          );
        } else {
          navigate(
            `/sensec/students/enrollment/online/${foundPlacementStudent?.enrollmentId}/parent/add`
          );
        }
      }, 7000);
    }
    //If no enrolled student but placement student seems to be enrolled, navigate student to enrolment page
    else if (!enrolledStudent && foundPlacementStudent?.enrolled) {
      setTimeout(() => {
        setLoadingComplete(true);
        setIsVerified(true);
      }, 3000);
      setTimeout(() => {
        setRedirecting(true);
        setIsVerified(false);
      }, 5000);
      setTimeout(() => {
        if (adminCurrentAction) {
          navigate(
            `/sensec/users/${authUser?.uniqueId}/admin/User-Types/Students/${foundPlacementStudent?.jhsIndexNo}/new_enrollment`
          );
        } else {
          navigate(
            `/sensec/students/enrollment/online/${foundPlacementStudent?.jhsIndexNo}`
          );
        }
      }, 7000);
    }
    //If placement verified and enrolled, navigate student to enrolment success page
    else if (
      foundPlacementStudent?.placementVerified &&
      foundPlacementStudent?.enrolled
    ) {
      setTimeout(() => {
        setLoadingComplete(true);
        setIsVerified(true);
        setHasEnrolled(true);
      }, 3000);
      setTimeout(() => {
        setRedirecting(true);
        setIsVerified(false);
        setHasEnrolled(false);
      }, 5000);
      setTimeout(() => {
        if (adminCurrentAction) {
          navigate(
            `/sensec/users/${authUser?.uniqueId}/admin/User-Types/Students/${foundPlacementStudent?.enrollmentId}/enrollment/online/success/Overview`
          );
        } else {
          navigate(
            `/sensec/students/enrollment/online/${foundPlacementStudent?.enrollmentId}/success/Overview`
          );
        }
      }, 7000);
    }
    //If placement verified but enrollment not yet started, navigate to enrollment page
    else if (
      foundPlacementStudent?.placementVerified &&
      !foundPlacementStudent?.enrolled &&
      enrolledStudent?.studentStatusExtend?.enrollmentStatus !==
        "in progress" &&
      !enrolledStudent?.parent
    ) {
      setTimeout(() => {
        setLoadingComplete(true);
        setIsVerified(true);
      }, 3000);
      setTimeout(() => {
        setRedirecting(true);
        setIsVerified(false);
      }, 5000);
      setTimeout(() => {
        if (adminCurrentAction) {
          navigate(
            `/sensec/users/${authUser?.uniqueId}/admin/User-Types/Students/${foundPlacementStudent?.jhsIndexNo}/new_enrollment`
          );
        } else {
          navigate(
            `/sensec/students/enrollment/online/${foundPlacementStudent?.jhsIndexNo}`
          );
        }
      }, 7000);
    }
    //If placement verified and enrolled, navigate student to enrolment success page
    else if (foundPlacementStudent?.placementVerified && enrolledStudent) {
      // localStorage.setItem("indexNumber", formData?.jhsIndexNo);
      setTimeout(() => {
        setLoadingComplete(true);
        setIsVerified(true);
        setHasEnrolled(true);
      }, 3000);
      setTimeout(() => {
        setRedirecting(true);
        setIsVerified(false);
        setHasEnrolled(false);
      }, 5000);
      setTimeout(() => {
        if (adminCurrentAction) {
          navigate(
            `/sensec/users/${authUser?.uniqueId}/admin/User-Types/Students/${enrolledStudent?.uniqueId}/enrollment/online/success/Overview`
          );
        } else {
          navigate(
            `/sensec/students/enrollment/online/${enrolledStudent?.uniqueId}/success/Overview`
          );
        }
      }, 7000);
    }
    //If placement not verified and not enrolled, then verify student and begin the enrolment process
    else if (
      foundPlacementStudent &&
      !foundPlacementStudent?.placementVerified
    ) {
      dispatch(verifyPlacementStudent(formData));
    }
    // navigate("/sensec/students/enrollment/online");
  };

  // Validate input data✅
  useEffect(() => {
    // Jhs Index No
    if (formData?.jhsIndexNo && !foundPlacementStudent) {
      setJhsIndexNoError(true);
      return;
    } else {
      setJhsIndexNoError(false);
    }
    // Jhs Index No
    if (
      formData?.yearGraduated &&
      foundPlacementStudent &&
      foundPlacementStudent?.yearGraduated !== formData?.yearGraduated
    ) {
      setYearGraduatedError(true);
      return;
    } else {
      setYearGraduatedError(false);
    }
  }, [formData, foundPlacementStudent]);

  //Verification status check
  useEffect(() => {
    if (verifyStatus === "pending") {
      setLoadingComplete(false);
    }
    if (verifyStatus === "rejected") {
      setTimeout(() => {
        setLoadingComplete(null);
        dispatch(resetPlacementState()); // Reset Verification State
      }, 3000);
      setTimeout(() => {
        error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "light",
            toastId: err,
          })
        );
      }, 2000);
      return;
    }
    if (verifyStatus === "success") {
      setTimeout(() => {
        setLoadingComplete(true);
      }, 3000);
      setTimeout(() => {
        setRedirecting(true);
      }, 6000);
      setTimeout(() => {
        dispatch(resetPlacementState()); // Reset Verification State
        if (adminCurrentAction) {
          navigate(
            `/sensec/users/${authUser?.uniqueId}/admin/User-Types/Students/${foundPlacementStudent?.jhsIndexNo}/new_enrollment`
          );
        } else {
          navigate(
            `/sensec/students/enrollment/online/${foundPlacementStudent?.jhsIndexNo}`
          );
        }
      }, 9000);
    }
  }, [
    dispatch,
    navigate,
    formData,
    verifyStatus,
    error,
    successMessage,
    loadingComplete,
    foundPlacementStudent,
    adminCurrentAction,
    adminCurrentLink,
    authUser,
  ]);

  // Fetch data
  useEffect(() => {
    dispatch(fetchAllPlacementStudents());
  }, [formData, dispatch]);

  return (
    <>
      {/* School Logo */}
      <Box
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
      </Box>
      {/* Main navbar links */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          padding: 0,
          zIndex: 5,
        }}
      >
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
        />
      </Box>
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
        </Box>
      )}
      <ContainerBox component="div" id="placementVerificationWrap">
        <h1
          style={{ textAlign: "center", color: "#696969", fontSize: "1.5rem" }}
        >
          Student Placement Verification
        </h1>
        <Box
          component="div"
          id="placementFormWrap"
          sx={{
            maxWidth: 600,
            mx: "auto",
            mt: 3,
            p: { xs: 1, sm: 2 },
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Box
            component="form"
            autoComplete="off"
            onSubmit={handleVerification}
            style={{
              // backgroundColor: "red",
              padding: ".5rem ",
            }}
          >
            <Typography
              variant="h6"
              component={"h3"}
              mb={3}
              color="#696969"
              fontSize={"1.1rem"}
              lineHeight={"1.2em"}
              letterSpacing={"1px"}
              textAlign={"center"}
            >
              Kindly verify your placement to begin your enrollment.
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label="JHS Index No."
                  name="jhsIndexNo"
                  value={formData?.jhsIndexNo}
                  onChange={handleChange}
                  required
                  error={jhsIndexNoError}
                  helperText={
                    jhsIndexNoError ? "Invalid student index number!" : ""
                  }
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color:
                        formData?.jhsIndexNo && !jhsIndexNoError
                          ? "green"
                          : "red", // Change the asterisk color to red
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label="Year Graduated [ JHS ]"
                  name="yearGraduated"
                  value={formData?.yearGraduated}
                  onChange={handleChange}
                  required
                  error={yearGraduatedError}
                  helperText={
                    yearGraduatedError ? "Year graduated not correct!" : ""
                  }
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color:
                        formData?.yearGraduated && !yearGraduatedError
                          ? "green"
                          : "red", // Change the asterisk color to red
                    },
                  }}
                />
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
                    fontSize: "1em",
                  }}
                >
                  {loadingComplete === false && (
                    <LoadingProgress color={"#fff"} size={"1.5rem"} />
                  )}
                  {loadingComplete &&
                    isVerified &&
                    !hasEnrolled &&
                    "Placement Already Verified"}
                  {loadingComplete &&
                    isVerified &&
                    hasEnrolled &&
                    "Enrolled Already"}
                  {loadingComplete &&
                    !isVerified &&
                    !hasEnrolled &&
                    !redirecting &&
                    verifyStatus === "success" && (
                      <>
                        <span>Successful</span> <TaskAlt />
                      </>
                    )}
                  {loadingComplete === null && "Verify Placement"}
                  {redirecting && (
                    <Redirection color={"#fff"} size={"1.5rem"} />
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Button
        variant="contained"
        size="sm"
        sx={{ bgcolor: "green" }}
        onClick={() => navigate("/sensec/students/enrollment/online")}
      >
        Enroll
      </Button> */}
      </ContainerBox>
    </>
  );
}
