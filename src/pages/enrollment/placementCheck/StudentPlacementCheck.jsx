import { ContainerBox, CustomTextField } from "../../../muiStyling/muiStyling";
import "../studentPlacementVerification/studentPlacementVerification.scss";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Button, Grid, Box, Typography, Avatar } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkPlacement,
  fetchAllPlacementStudents,
  getAllPlacementStudents,
  resetPlacementCheckState,
} from "../../../features/academics/placementSlice";
import LoadingProgress from "../../../components/pageLoading/LoadingProgress";
import Redirection from "../../../components/pageLoading/Redirection";
import { TaskAlt } from "@mui/icons-material";
import { toast } from "react-toastify";
import { NavigationBar } from "../../../components/navbar/NavigationBar";
import {
  FetchAllPlacementSBatches,
  FetchPlacementBatchByYear,
} from "../../../data/students/FetchPlacementStudents";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet-async";

export function StudentPlacementCheck() {
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
  const allPlacementStudents = useSelector(getAllPlacementStudents);

  const { checkStatus, successMessage, error } = useSelector(
    (state) => state.placement
  );
  const [maskedStudentIndex, setMaskedStudentIndex] = useState("");
  // Input values error state handling
  const [jhsIndexNoError, setJhsIndexNoError] = useState(false);
  const [yearGraduatedError, setYearGraduatedError] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  const [formData, setFormData] = useState({
    jhsIndexNo: "",
    yearGraduated: "",
  });

  const allPlacementSBatches = FetchAllPlacementSBatches();
  const placementBatchFound = FetchPlacementBatchByYear(
    formData?.yearGraduated
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Find student by index number
  const memoizedPlacementStudentData = useMemo(() => {
    const placementStudentFound = allPlacementStudents?.find(
      (std) => std?.jhsIndexNo === formData?.jhsIndexNo
    );
    return placementStudentFound;
  }, [allPlacementStudents, formData]);

  // Filter student from his/her placement batch
  const placementBatchStudentFound = useMemo(() => {
    const placementStudentFound = placementBatchFound?.students?.find(
      (std) => std?._id === memoizedPlacementStudentData?._id
    );
    return placementStudentFound;
  }, [memoizedPlacementStudentData, placementBatchFound]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      checkPlacement({
        studentIndexNo: formData?.jhsIndexNo,
        yearGraduated: formData?.yearGraduated,
      })
    );
  };

  // Validate input data
  useEffect(() => {
    // Jhs Index No
    if (formData?.jhsIndexNo && !memoizedPlacementStudentData) {
      setJhsIndexNoError(true);
      return;
    } else {
      setJhsIndexNoError(false);
    }
    // Year Graduated
    if (formData?.yearGraduated && !placementBatchStudentFound) {
      setYearGraduatedError(true);
      return;
    } else {
      setYearGraduatedError(false);
    }
    if (memoizedPlacementStudentData) {
      const studentID = memoizedPlacementStudentData?.jhsIndexNo;
      // Mask the ID: keep first 6 characters, add "****", and keep the last 6 characters
      const masked = `${studentID.slice(0, 3)}***${studentID.slice(-2)}`;
      setMaskedStudentIndex(masked);
      Cookies?.set(
        "masked_student_index",
        memoizedPlacementStudentData?.jhsIndexNo,
        {
          expires: 1, // 1 day
          secure: false, // Set to true in production if using HTTPS
          sameSite: "Strict",
        }
      );
    }
  }, [formData, memoizedPlacementStudentData, placementBatchStudentFound]);

  // Fetch data
  useEffect(() => {
    dispatch(fetchAllPlacementStudents());
  }, [dispatch]);

  // Placement check status
  useEffect(() => {
    if (checkStatus === "pending") {
      setLoadingComplete(false);
    }
    if (checkStatus === "rejected") {
      error?.errorMessage?.message?.map((err) => {
        toast.error(err, {
          position: "top-right",
          theme: "light",
          toastId: err,
        });
      });
      setTimeout(() => {
        setLoadingComplete(null);
        dispatch(resetPlacementCheckState());
      }, 3000);
      return;
    }
    if (checkStatus === "success") {
      Cookies?.set("Placement_Year", formData?.yearGraduated, {
        expires: 1, // 1 day
        secure: false, // Set to true in production if using HTTPS
        sameSite: "Strict",
      });
      // setTimeout(() => {
      //   toast.success(successMessage, {
      //     position: "top-right",
      //     theme: "dark",
      //     // toastId: successId,
      //   });
      // }, 3000);
      setTimeout(() => {
        setLoadingComplete(true);
      }, 3000);
      setTimeout(() => {
        setRedirecting(true);
      }, 6000);
      setTimeout(() => {
        localStorage.setItem(
          "studentIndexNo",
          memoizedPlacementStudentData?.jhsIndexNo
        );
        dispatch(resetPlacementCheckState());
        navigate(
          `/sensec/students/enrollment/placement_check/${memoizedPlacementStudentData?.fullName?.replace(
            / /g,
            "_"
          )}/${maskedStudentIndex}`
        );
      }, 9000);
    }
  }, [
    navigate,
    checkStatus,
    error,
    memoizedPlacementStudentData,
    dispatch,
    formData,
    maskedStudentIndex,
  ]);

  return (
    <>
      <Helmet>
        <title>Placement Check - Senya SHS</title>
        <meta
          name="description"
          content="After the Ghana Education Service (GES) placement, students are required to check if they have been placed in Senya SHS."
        />
        <meta
          name="keywords"
          content="Senya SHS Placement Check, Sensec Placement Check, Placement Check, Sensec Official Website Placement Check"
        />
        <meta property="og:title" content="Placement Check | Senya SHS" />
        <meta
          property="og:description"
          content="After the Ghana Education Service (GES) placement, students are required to check if they have been placed in Senya SHS."
        />
        <link
          rel="canonical"
          href="https://www.senyashs.com/sensec/students/enrollment/placement_check"
        />
        <link
          rel="icon"
          type="image/png"
          href="https://www.senyashs.com/assets/sensec-logo1.png"
        />
      </Helmet>
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
      <ContainerBox
        component="div"
        id="placementVerificationWrap"
        sx={{
          px: { xs: ".5rem", sm: "auto" },
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#696969",
            fontSize: "1.2em",
            marginTop: "1rem",
          }}
        >
          Student Placement Check
        </h1>
        <Box
          component="div"
          // id="placementFormWrap"
          sx={{
            maxWidth: 600,
            mx: { xs: "0", sm: "auto" },
            mt: 3,
            p: { xs: 1, sm: 2 },
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            filter: "drop-shadow(0 0 0 rgb(255, 255, 255, 0.68))",
            boxShadow: "0px 1px 9px 1px #292929",
          }}
        >
          <Box
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
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
              fontSize={".9rem"}
              lineHeight={"1.2em"}
              letterSpacing={"1px"}
              // textAlign={"center"}
            >
              Kindly enter your JHS index number to check for your placement
              into Senya Senior High School.
            </Typography>
            <Grid container spacing={3}>
              {/* Student Index No */}
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  size="small"
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
                  size="small"
                  label="Year Graduated"
                  name="yearGraduated"
                  value={formData?.yearGraduated}
                  onChange={handleChange}
                  required
                  error={yearGraduatedError}
                  helperText={
                    yearGraduatedError ? "Graduation year not correct!" : ""
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
                    height: "2.5rem",
                    letterSpacing: "1px",
                    textTransform: "capitalize",
                    fontSize: ".8rem",
                    display: "flex",
                    alignItems: "center",
                    lineHeight: "1rem",
                  }}
                >
                  {loadingComplete === false && (
                    <LoadingProgress color={"#fff"} size={"1.5rem"} />
                  )}
                  {loadingComplete === true &&
                    checkStatus === "success" &&
                    !redirecting && (
                      <>
                        <span>Successful</span> <TaskAlt />
                      </>
                    )}
                  {redirecting && (
                    <Redirection color={"#fff"} size={"1.5rem"} />
                  )}
                  {loadingComplete === null && "Check Placement"}
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
