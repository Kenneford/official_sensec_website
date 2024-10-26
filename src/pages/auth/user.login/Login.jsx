import { useNavigate } from "react-router-dom";
import "../user.signUp/signUp.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
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

export function Login() {
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

  // Find signed up user
  // useEffect(() => {
  //   if (newUser?.uniqueId) {
  //     const userFound = allUsersData?.find(
  //       (std) => std?.uniqueId === newUser?.uniqueId
  //     );
  //     setUserFound(userFound);
  //   }
  // }, [allUsersData, newUser?.uniqueId]);

  // Generate new sensosa ID for new member
  // useEffect(() => {
  //   if (newUser?.sensosaUserName) {
  //     const newSensosaId = `OSA-${num}${newUser?.sensosaUserName.charAt(
  //       0
  //     )}${newUser?.sensosaUserName
  //       .charAt(newUser?.sensosaUserName?.length - 1)
  //       .toUpperCase()}-${currentYear}`;

  //     setNewSensosaId(newSensosaId);
  //   }
  // }, [dispatch, newUser?.sensosaUserName, num, currentYear, userFound]);

  // Check user sign up status
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
        navigate(`/sensec/users/admin/Dashboard/Overview`);
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
            <h1>
              Welcome, Cherished {loginAction === "Admins Login" && "Admin"}
              {loginAction === "Lecturers Login" && "Lecturer"}
              {loginAction === "NT-Staffs Login" && "NT-Staff"}
              {loginAction === "Students Login" && "Student"}.
            </h1>
            <p>
              The Great Sensec is glad to have you here. Kindly login to access
              your dashboard.
            </p>
          </Box>
        </Box>
        <Box ml={{ xs: 0, sm: 1 }}>
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
          <Grid container spacing={2}>
            {/* Username */}
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label={"Unique-ID"}
                name="uniqueId"
                value={newUser?.uniqueId}
                onChange={handleInputValue}
                required
                error={uniqueIDInputError}
                helperText={uniqueIDInputError ? "Invalid user-ID!" : ""}
                sx={{
                  "& .MuiInputLabel-asterisk": {
                    color:
                      newUser?.uniqueId && !uniqueIDInputError
                        ? "green"
                        : "red", // Change the asterisk color to red
                  },
                }}
              />
            </Grid>
            {/* Password */}
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label={"Password"}
                name="password"
                value={newUser?.password}
                onChange={handleInputValue}
                required
                error={passwordInputError}
                helperText={
                  passwordInputError &&
                  newUser?.password?.length > 0 &&
                  newUser?.password?.length < 6
                    ? "Password must be at least 6 characters long!"
                    : ""
                }
                type={showPass ? "text" : "password"}
                slotProps={{
                  input: {
                    endAdornment: (
                      <Box
                        component={"button"}
                        onClick={showPassword}
                        bgcolor={"transparent"}
                      >
                        {showPass ? (
                          <Visibility sx={{ color: "#696969" }} />
                        ) : (
                          <VisibilityOff sx={{ color: "#696969" }} />
                        )}
                      </Box>
                    ),
                  },
                }}
                sx={{
                  "& .MuiInputLabel-asterisk": {
                    color:
                      newUser?.password && !passwordInputError
                        ? "green"
                        : "red", // Change the asterisk color to red
                  },
                }}
              />
            </Grid>
          </Grid>
          <div className="forgotPassword">
            <p onClick={() => navigate("/sensec/forgot_password")}>
              Forgot Password
            </p>
          </div>
          <Box mt={1}>
            <Typography>
              Don't have an account?{" "}
              <Typography
                component={"span"}
                onClick={() => navigate("/sensec/sign_up")}
                sx={{ cursor: "pointer", color: "green" }}
              >
                Sign-up
              </Typography>
            </Typography>
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "green",
              margin: "2rem 0",
              padding: ".5rem",
              letterSpacing: "1px",
              textTransform: "capitalize",
              fontSize: "1em",
              minHeight: "3.7rem",
            }}
          >
            {/* Sign-up */}
            {loadingComplete === false && (
              <LoadingProgress color={"#fff"} size={"1.3rem"} />
            )}
            {loadingComplete === null && (
              <>
                Login
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
        </Box>
      </Box>
    </Box>
  );
}