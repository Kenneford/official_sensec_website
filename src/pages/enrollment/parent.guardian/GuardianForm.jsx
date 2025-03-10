import "./parent.guardian.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthUser } from "../../../features/auth/authSlice";
import {
  fetchAllPlacementStudents,
  getAllPlacementStudents,
} from "../../../features/academics/placementSlice";
import { toast } from "react-toastify";
import LoadingProgress from "../../../components/pageLoading/LoadingProgress";
import { TaskAlt } from "@mui/icons-material";
import Redirection from "../../../components/pageLoading/Redirection";
import { ContainerBox, CustomTextField } from "../../../muiStyling/muiStyling";
import { Box, Button, Grid, Typography } from "@mui/material";
import { AddStudentGuardian } from "../../../features/students/guardianSlice";

export function GuardianForm() {
  const authAdminInfo = useSelector(getAuthUser);
  const { studentId } = useParams();
  console.log(studentId);

  const allPlacementStudents = useSelector(getAllPlacementStudents);
  // const studentId = localStorage.getItem("studentId");
  const indexNumber = localStorage.getItem("indexNumber");

  // Find placement student
  const foundPlacementStudent = allPlacementStudents.find(
    (std) => std.enrollmentId === studentId
  );

  const foundStudent = allPlacementStudents.find(
    (std) => std.enrollmentId === studentId
  );
  const singleStudentFound = {};
  const { createStatus, error, successMessage } = useSelector(
    (state) => state.student
  );
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newGuardian, setNewGuardian] = useState({
    studentId: studentId,
    guardianName: "",
    email: "",
    address: "",
    mobile: "",
  });
  const handleInputValues = (e) => {
    setNewGuardian({
      ...newGuardian,
      [e.target.name]: e.target.value,
    });
  };

  const canSave =
    Boolean(newGuardian.guardianName) &&
    Boolean(newGuardian.email) &&
    Boolean(newGuardian.address) &&
    Boolean(newGuardian.mobile);

  const handleParent = (e) => {
    e.preventDefault();
    setLoadingComplete(false);
    if (!studentId) {
      toast.error("Your ID Was Not Found!", {
        position: "top-right",
        theme: "light",
        // toastId: successId,
      });
      return;
    } else {
      const guardianData = {
        studentId: studentId,
        indexNumber: foundPlacementStudent?.jhsIndexNo,
        guardianName: newGuardian.guardianName,
        email: newGuardian.email,
        address: newGuardian.address,
        mobile: newGuardian.mobile,
      };
      dispatch(AddStudentGuardian(guardianData));
    }
  };

  useEffect(() => {
    dispatch(fetchAllPlacementStudents());
    // dispatch(fetchSingleStudent({ uniqueId: studentId }));
  }, [dispatch]);

  //   useEffect(() => {
  //     if (foundStudent?.placementVerified && singleStudentFound?.parent) {
  //       setCurrentEnrolmentSuccessLink("DASHBOARD");
  //       localStorage.setItem("indexNumber", foundStudent?.generatedIndexNumber);
  //       localStorage.setItem("studentUniqueId", foundStudent?.uniqueId);
  //       navigate(
  //         `/sensec/students/enrollment/online/success/${singleStudentFound?.uniqueId}`
  //       );
  //     }
  //   }, [
  //     foundStudent,
  //     navigate,
  //     singleStudentFound,
  //     setCurrentEnrolmentSuccessLink,
  //   ]);

  useEffect(() => {
    if (createStatus === "pending") {
      setLoadingComplete(false);
    }
    if (createStatus === "rejected") {
      setTimeout(() => {
        setLoadingComplete(null);
      }, 3000);
      setTimeout(() => {
        error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "light",
            // toastId: successId,
          })
        );
      }, 2000);
      return;
    }
    if (createStatus === "success") {
      setTimeout(() => {
        setLoadingComplete(true);
      }, 3000);
      setTimeout(() => {
        setRedirecting(true);
      }, 6000);
      setTimeout(() => {
        // localStorage.removeItem("studentUniqueId");
        // localStorage.removeItem("indexNumber");
        navigate(`/sensec/students/${studentId}/enrollment/online/success`);
      }, 9000);
    }
  }, [
    navigate,
    dispatch,
    createStatus,
    error,
    successMessage,
    loadingComplete,
    foundStudent,
    singleStudentFound,
    studentId,
  ]);
  //   useEffect(() => {
  //     if (singleStudentFound.guardian || singleStudentFound.parent) {
  //       navigate(
  //         `/sensec/students/enrollment/online/success/${singleStudentFound.uniqueId}/DASHBOARD`
  //       );
  //     }
  //   }, [navigate, singleStudentFound, studentId]);

  return (
    <ContainerBox
      component="div"
      id="parentWrap"
      sx={{
        px: { xs: ".5rem", sm: "auto" },
      }}
    >
      <h1 style={{ textAlign: "center", color: "#696969", fontSize: "1.5rem" }}>
        Student Guardian Form
      </h1>
      <Box
        component="div"
        id="parentFormWrap"
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
          onSubmit={handleParent}
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
            Kindly fill all required fields in order to add your guardian data.
            Click{" "}
            <a
              href={`/sensec/students/enrollment/online/${studentId}/parent/add`}
            >
              here
            </a>{" "}
            to add parent instead!
          </Typography>
          <Grid container spacing={3}>
            {/* Father */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="Guardian's Name"
                name="guardianName"
                value={newGuardian?.guardianName}
                onChange={handleInputValues}
                required
              />
            </Grid>
            {/* Address */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="Address"
                name="address"
                value={newGuardian?.address}
                onChange={handleInputValues}
                required
              />
            </Grid>
            {/* Mobile */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="Mobile"
                name="mobile"
                value={newGuardian?.mobile}
                onChange={handleInputValues}
                required
              />
            </Grid>
            {/* Email */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="Email"
                name="email"
                value={newGuardian?.email}
                onChange={handleInputValues}
                // required
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
                  createStatus === "success" &&
                  !redirecting && (
                    <>
                      <span>Successful</span> <TaskAlt />
                    </>
                  )}
                {redirecting && <Redirection color={"#fff"} size={"1.5rem"} />}
                {loadingComplete === null && "Add Guardian"}
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
