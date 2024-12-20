import { ContainerBox, CustomTextField } from "../../../muiStyling/muiStyling";
import "../studentPlacementVerification/studentPlacementVerification.scss";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Box, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkPlacement,
  fetchAllPlacementStudents,
  getAllPlacementStudents,
} from "../../../features/academics/placementSlice";
import LoadingProgress from "../../../components/pageLoading/LoadingProgress";
import Redirection from "../../../components/pageLoading/Redirection";
import { TaskAlt } from "@mui/icons-material";
import { toast } from "react-toastify";

export function StudentPlacementCheck() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allPlacementStudents = useSelector(getAllPlacementStudents);

  const { checkStatus, successMessage, error } = useSelector(
    (state) => state.placement
  );
  // Input values error state handling
  const [jhsIndexNoError, setJhsIndexNoError] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  const [formData, setFormData] = useState({
    jhsIndexNo: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const memoizedPlacementStudentData = useMemo(() => {
    const placementStudentFound = allPlacementStudents?.find(
      (std) => std?.jhsIndexNo === formData?.jhsIndexNo
    );
    return placementStudentFound;
  }, [allPlacementStudents, formData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(checkPlacement({ studentIndexNo: formData?.jhsIndexNo }));
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
  }, [formData, memoizedPlacementStudentData]);

  // Fetch data
  useEffect(() => {
    dispatch(fetchAllPlacementStudents());
  }, [formData, dispatch]);

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
      }, 3000);
      return;
    }
    if (checkStatus === "success") {
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
        navigate(
          `/sensec/students/enrollment/placement_check/${memoizedPlacementStudentData?.fullName?.replace(
            / /g,
            "_"
          )}/${memoizedPlacementStudentData?.jhsIndexNo}`
        );
      }, 9000);
    }
  }, [
    navigate,
    checkStatus,
    successMessage,
    error,
    loadingComplete,
    memoizedPlacementStudentData,
  ]);

  return (
    <ContainerBox
      component="div"
      id="placementVerificationWrap"
      sx={{
        px: { xs: ".5rem", sm: "auto" },
      }}
    >
      <h1 style={{ textAlign: "center", color: "#696969", fontSize: "1.5rem" }}>
        Student Placement Check
      </h1>
      <Box
        component="div"
        id="placementFormWrap"
        sx={{
          maxWidth: 600,
          mx: { xs: "0", sm: "auto" },
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
            fontSize={"1.1rem"}
            lineHeight={"1.2em"}
            letterSpacing={"1px"}
            // textAlign={"center"}
          >
            Kindly enter your JHS index number to check for your placement into
            Senya Senior High School.
          </Typography>
          <Grid container spacing={3}>
            {/* Student Index No */}
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
                {loadingComplete === true &&
                  checkStatus === "success" &&
                  !redirecting && (
                    <>
                      <span>Successful</span> <TaskAlt />
                    </>
                  )}
                {redirecting && <Redirection color={"#fff"} size={"1.5rem"} />}
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
  );
}
