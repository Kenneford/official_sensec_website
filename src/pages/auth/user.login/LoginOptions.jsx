import { useNavigate } from "react-router-dom";
import "./login.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Lock,
  LockOpen,
  LoginOutlined,
  Security,
  TaskAlt,
  Visibility,
  VisibilityOff,
  VpnKey,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { CustomTextField } from "../../../muiStyling/muiStyling";
import {
  fetchAllUsers,
  getAllUsers,
  getAuthUser,
  userLogin,
} from "../../../features/auth/authSlice";
import Redirection from "../../../components/pageLoading/Redirection";
import LoadingProgress from "../../../components/pageLoading/LoadingProgress";

export function LoginOptions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginAction = localStorage.getItem("loginAction");

  // Redux state management
  const { loginStatus, successMessage, error } = useSelector(
    (state) => state?.authUser
  );
  // Getting data from redux state
  const authUser = useSelector(getAuthUser);
  const allUsers = useSelector(getAllUsers);
  console.log(allUsers);

  const [loadingComplete, setLoadingComplete] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  // Handle password visibility
  const [showPass, setShowPass] = useState(false);
  // Input values error state handling
  const [uniqueIDInputError, setUniqueIDInputError] = useState(false);
  const [passwordInputError, setPasswordInputError] = useState(false);
  console.log(passwordInputError);

  const showPassword = (e) => {
    e.preventDefault();
    setShowPass((show) => !show);
  };

  // Initial user input state
  const [newUser, setNewUser] = useState({
    uniqueId: "",
    userName: "",
    password: "",
  });
  console.log(newUser);

  // Find student who want to sign-up
  const userFound = allUsers?.find(
    (user) => user?.uniqueId === newUser?.uniqueId
  );
  // Handle input value
  const handleInputValue = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };
  // handle user sign up
  const handleLogin = (e) => {
    e.preventDefault();
    if (newUser?.password?.length < 6) {
      setPasswordInputError(true);
    } else {
      console.log("Form submitted!");
      dispatch(
        userLogin({
          uniqueId: newUser?.uniqueId,
          password: newUser?.password,
        })
      );
    }
  };

  // Validate input data
  useEffect(() => {
    // Unique ID
    if (newUser?.uniqueId && !userFound) {
      setUniqueIDInputError(true);
      return;
    } else {
      setUniqueIDInputError(false);
    }
    // Password
    if (passwordInputError) {
      if (newUser?.password === "" || newUser?.password?.length >= 6) {
        setPasswordInputError(false);
      }
    }
  }, [newUser, userFound, passwordInputError]);
  // Fetch all users
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Function to redirect users to their dashboard
  useLayoutEffect(() => {
    if (authUser?.roles?.includes("Admin")) {
      return navigate(
        `/sensec/users/${authUser?.uniqueId}/admin/Dashboard/Overview`
      );
    }
    if (authUser?.roles?.includes("Lecturer")) {
      return navigate(
        `/sensec/users/${authUser?.uniqueId}/lecturer/Dashboard/Overview`
      );
    }
    if (authUser?.roles?.includes("Student")) {
      return navigate(
        `/sensec/users/${authUser?.uniqueId}/student/Dashboard/Overview`
      );
    }
    if (authUser?.roles?.includes("NT-Staff")) {
      return navigate(
        `/sensec/users/${authUser?.uniqueId}/nt_Staff/Dashboard/Overview`
      );
    }
  }, [authUser, navigate]);

  // Function to redirect users to their dashboard
  const getUserRolePath = () => {
    if (authUser?.roles?.includes("admin")) return "admin/Dashboard/Overview";
    if (authUser?.roles?.includes("lecturer"))
      return "lecturer/Dashboard/Overview";
    if (authUser?.roles?.includes("student"))
      return "student/Dashboard/Overview";
    if (authUser?.roles?.includes("nt-Staff"))
      return "nt_staff/Dashboard/Overview";
    return "*";
  };
  const userRolePath = getUserRolePath();

  // Check user login status
  useEffect(() => {
    if (loginStatus === "pending") {
      setLoadingComplete(false);
    }
    if (loginStatus === "rejected") {
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
    if (loginStatus === "success") {
      toast.success(successMessage, {
        position: "top-right",
        theme: "dark",
        toastId: successMessage,
      });
      if (!authUser) {
        setTimeout(() => {
          setRedirecting(true);
        }, 3000);
      } else {
        navigate(`/sensec/users/${authUser?.uniqueId}/${userRolePath}`);
      }
    }
  }, [
    loginStatus,
    error,
    successMessage,
    navigate,
    dispatch,
    userFound,
    authUser,
    userRolePath,
  ]);

  return (
    <Box
      sx={{
        width: { xs: "95%", sm: "36rem" },
      }}
      margin={"auto"}
      mt={5}
      mb={5}
      // height={"70vh"}
      display={"flex"}
      // flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      fontSize={"calc(.7rem + 1vmin)"}
      height={"100%"}
    >
      <Box
        component={"form"}
        onSubmit={handleLogin}
        color={"#696969"}
        sx={{
          filter: "drop-shadow(0 0 0.3em rgb(255, 255, 255, 0.68))",
          boxShadow: "0px 1px 9px 1px #454343ad",
          borderRadius: ".4rem",
          display: { xs: "block", sm: "flex" },
        }}
        p={1}
        width={"100%"}
      >
        <Box width={"22rem"} sx={{ display: { xs: "none", sm: "block" } }}>
          <Box className="left">
            <h1>Welcome, Cherished User.</h1>
            <p>Kindly select an option to proceed.</p>
          </Box>
        </Box>
        <Box ml={{ xs: 0, sm: 1 }} maxWidth={{ xs: "100%", sm: "19rem" }}>
          <Box
            mt={2}
            mb={4}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Lock style={{ color: "#767474", fontSize: "2rem" }} />
            <Typography
              variant="h5"
              component={"h1"}
              mb={2}
              sx={{ fontSize: "1.7rem" }}
            >
              Login
            </Typography>
            {/* <Avatar
            src="https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            sx={{ width: "6rem", height: "6rem" }}
          /> */}
            <Box className="profilePictureWrap">
              {/* {userFound && ( */}
              <Box className="profilePictureCont">
                <img
                  className="profileImg"
                  src={
                    userFound
                      ? userFound?.personalInfo?.profilePicture?.url
                      : "/assets/noAvatar.png"
                  }
                  alt=""
                />
              </Box>
              {/* )} */}
            </Box>
          </Box>
          <Grid container spacing={2} mb={2}>
            {/* Admin */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "green",
                  padding: ".5rem",
                  letterSpacing: "1px",
                  textTransform: "capitalize",
                  fontSize: "1em",
                  minHeight: "3.7rem",
                }}
                onClick={() => {
                  localStorage.setItem("loginAction", "Admins Login");
                  localStorage.removeItem("currentOtherNavLink");
                  navigate("/sensec/login");
                }}
              >
                {/* Sign-up */}
                {loadingComplete === false && (
                  <LoadingProgress color={"#fff"} size={"1.3rem"} />
                )}
                {loadingComplete === null && (
                  <>
                    Admins Login
                    <LoginOutlined
                      className="signupIcon"
                      sx={{ marginLeft: ".5rem" }}
                    />
                  </>
                )}
                {loadingComplete === true &&
                  loginStatus === "success" &&
                  !redirecting && (
                    <>
                      Success{" "}
                      <TaskAlt
                        className="signupIcon"
                        sx={{ marginLeft: ".5rem" }}
                      />
                    </>
                  )}
                {redirecting && <Redirection color={"#fff"} size={"1.3rem"} />}
              </Button>
            </Grid>
            {/* Lecturer */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "green",
                  padding: ".5rem",
                  letterSpacing: "1px",
                  textTransform: "capitalize",
                  fontSize: "1em",
                  minHeight: "3.7rem",
                }}
                onClick={() => {
                  localStorage.setItem("loginAction", "Lecturers Login");
                  localStorage.removeItem("currentOtherNavLink");
                  navigate("/sensec/login");
                }}
              >
                {/* Sign-up */}
                {loadingComplete === false && (
                  <LoadingProgress color={"#fff"} size={"1.3rem"} />
                )}
                {loadingComplete === null && (
                  <>
                    Lecturers Login
                    <LoginOutlined
                      className="signupIcon"
                      sx={{ marginLeft: ".5rem" }}
                    />
                  </>
                )}
                {loadingComplete === true &&
                  loginStatus === "success" &&
                  !redirecting && (
                    <>
                      Success{" "}
                      <TaskAlt
                        className="signupIcon"
                        sx={{ marginLeft: ".5rem" }}
                      />
                    </>
                  )}
                {redirecting && <Redirection color={"#fff"} size={"1.3rem"} />}
              </Button>
            </Grid>
            {/* Student */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "green",
                  padding: ".5rem",
                  letterSpacing: "1px",
                  textTransform: "capitalize",
                  fontSize: "1em",
                  minHeight: "3.7rem",
                }}
                onClick={() => {
                  localStorage.setItem("loginAction", "Students Login");
                  localStorage.removeItem("currentOtherNavLink");
                  navigate("/sensec/login");
                }}
              >
                {/* Sign-up */}
                {loadingComplete === false && (
                  <LoadingProgress color={"#fff"} size={"1.3rem"} />
                )}
                {loadingComplete === null && (
                  <>
                    Students Login
                    <LoginOutlined
                      className="signupIcon"
                      sx={{ marginLeft: ".5rem" }}
                    />
                  </>
                )}
                {loadingComplete === true &&
                  loginStatus === "success" &&
                  !redirecting && (
                    <>
                      Success{" "}
                      <TaskAlt
                        className="signupIcon"
                        sx={{ marginLeft: ".5rem" }}
                      />
                    </>
                  )}
                {redirecting && <Redirection color={"#fff"} size={"1.3rem"} />}
              </Button>
            </Grid>
            {/* NT-Staff */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "green",
                  padding: ".5rem",
                  letterSpacing: "1px",
                  textTransform: "capitalize",
                  fontSize: "1em",
                  minHeight: "3.7rem",
                }}
                onClick={() => {
                  localStorage.setItem("loginAction", "NT-Staffs Login");
                  localStorage.removeItem("currentOtherNavLink");
                  navigate("/sensec/login");
                }}
              >
                {/* Sign-up */}
                {loadingComplete === false && (
                  <LoadingProgress color={"#fff"} size={"1.3rem"} />
                )}
                {loadingComplete === null && (
                  <>
                    NT-Staff Login
                    <LoginOutlined
                      className="signupIcon"
                      sx={{ marginLeft: ".5rem" }}
                    />
                  </>
                )}
                {loadingComplete === true &&
                  loginStatus === "success" &&
                  !redirecting && (
                    <>
                      Success{" "}
                      <TaskAlt
                        className="signupIcon"
                        sx={{ marginLeft: ".5rem" }}
                      />
                    </>
                  )}
                {redirecting && <Redirection color={"#fff"} size={"1.3rem"} />}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
