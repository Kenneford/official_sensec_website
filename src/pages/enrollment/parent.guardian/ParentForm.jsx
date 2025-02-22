import "./parent.guardian.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
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
import { Avatar, Box, Button, Grid, Stack, Typography } from "@mui/material";
import { AddStudentParent } from "../../../features/students/parentSlice";
import { FetchAllStudents } from "../../../data/students/FetchAllStudents";
import { NavigationBar } from "../../../components/navbar/NavigationBar";
import Cookies from "js-cookie";

export function ParentForm() {
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
    isSidebarOpen,
    openSearchModal,
    setOpenSearchModal,
  } = useOutletContext();
  const authAdmin = useSelector(getAuthUser);
  const allStudents = FetchAllStudents();
  const allPlacementStudents = useSelector(getAllPlacementStudents);
  const [studentId, setStudentId] = useState("");
  console.log(allStudents);

  // Find student
  const foundStudent = allStudents?.find((std) => std?.uniqueId === studentId);
  console.log(foundStudent);

  // Find placement student
  const foundPlacementStudent = allPlacementStudents?.find(
    (std) => std.jhsIndexNo === foundStudent?.studentSchoolData?.jhsIndexNo
  );
  console.log(foundPlacementStudent);

  const { createStatus, error, successMessage } = useSelector(
    (state) => state.parent
  );
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminCurrentAction, adminCurrentLink } = useParams();

  const [newParent, setNewParent] = useState({
    studentId: studentId,
    indexNumber: "",
    fatherName: "",
    fathersOccupation: "",
    motherName: "",
    mothersOccupation: "",
    email: "",
    address: "",
    mobile: "",
  });
  const handleInputValues = (e) => {
    setNewParent({
      ...newParent,
      [e.target.name]: e.target.value,
    });
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
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

  const canSave =
    Boolean(newParent.fatherName) &&
    Boolean(newParent.fathersOccupation) &&
    Boolean(newParent.motherName) &&
    Boolean(newParent.mothersOccupation) &&
    Boolean(newParent.address) &&
    Boolean(newParent.phoneNumber);

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
      const parentData = {
        studentId: studentId,
        indexNumber: foundPlacementStudent?.jhsIndexNo,
        fatherName: newParent.fatherName,
        motherName: newParent.motherName,
        fathersOccupation: newParent.fathersOccupation,
        mothersOccupation: newParent.mothersOccupation,
        email: newParent.email,
        address: newParent.address,
        mobile: newParent.mobile,
      };
      dispatch(AddStudentParent(parentData));
    }
  };

  useEffect(() => {
    dispatch(fetchAllPlacementStudents());
    const studentId = Cookies?.get("masked_student_id");
    if (!studentId) {
      navigate("/sensec/students/enrollment/placement_verification");
    } else {
      setStudentId(studentId);
    }
  }, [dispatch, navigate]);

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
        if (adminCurrentAction) {
          navigate(
            `/sensec/users/${authAdmin?.uniqueId}/admin/User-Types/Students/${studentId}/enrollment/online/success/Overview`
          );
        } else {
          navigate(
            `/sensec/students/enrollment/online/${studentId}/success/Overview`
          );
        }
      }, 9000);
    }
  }, [
    navigate,
    dispatch,
    createStatus,
    error,
    successMessage,
    loadingComplete,
    foundPlacementStudent,
    studentId,
    authAdmin,
    adminCurrentAction,
  ]);

  //   useEffect(() => {
  //     if (singleStudentFound.guardian || singleStudentFound.parent) {
  //       navigate(
  //         `/sensec/students/enrollment/online/success/${singleStudentFound.uniqueId}/DASHBOARD`
  //       );
  //     }
  //   }, [navigate, singleStudentFound, studentId]);

  return (
    <>
      <Box
        sx={{
          position: isScrolled ? "none" : "block",
        }}
      >
        <Stack
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
        </Stack>
        <Box>
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
            isSidebarOpen={isSidebarOpen}
            openSearchModal={openSearchModal}
            setOpenSearchModal={setOpenSearchModal}
          />
        </Box>
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
        >
          <h1 className="dashAction">
            {adminCurrentAction?.replace(/_/g, "-")} /{" "}
            <span>{adminCurrentLink?.replace(/_/g, " ")}</span>
          </h1>
        </Box>
      )}
      <ContainerBox
        component="div"
        id="parentWrap"
        sx={{
          px: { xs: ".5rem", sm: "auto" },
        }}
      >
        <h1
          style={{ textAlign: "center", color: "#696969", fontSize: "1.5rem" }}
        >
          Student Parent Form
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
              Kindly fill all required fields in order to add your parent data.
              Click{" "}
              <a
                href={`/sensec/students/enrollment/online/${studentId}/guardian/add`}
              >
                here
              </a>{" "}
              to add guardian instead!
            </Typography>
            <Grid container spacing={3}>
              {/* Father */}
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label="Father's Name"
                  name="fatherName"
                  value={newParent?.fatherName}
                  onChange={handleInputValues}
                  required
                />
              </Grid>
              {/* Mother */}
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label="Mother's Name"
                  name="motherName"
                  value={newParent?.motherName}
                  onChange={handleInputValues}
                  required
                />
              </Grid>
              {/* Father Occupation */}
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label="Father's Occupation"
                  name="fathersOccupation"
                  value={newParent?.fathersOccupation}
                  onChange={handleInputValues}
                  required
                />
              </Grid>
              {/* Mother's Occupation */}
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label="Mother's Occupation"
                  name="mothersOccupation"
                  value={newParent?.mothersOccupation}
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
                  value={newParent?.address}
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
                  value={newParent?.mobile}
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
                  value={newParent?.email}
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
                  {redirecting && (
                    <Redirection color={"#fff"} size={"1.5rem"} />
                  )}
                  {loadingComplete === null && "Add Parent"}
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
