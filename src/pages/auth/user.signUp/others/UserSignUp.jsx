import { useNavigate, useParams } from "react-router-dom";
import "./signUp.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  PersonAddAlt,
  TaskAlt,
  Visibility,
  VisibilityOff,
  VpnKey,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import { CustomTextField } from "../../../../muiStyling/muiStyling";
import {
  fetchAllUsers,
  getAllUsers,
  resetSignUpState,
  userSignUp,
} from "../../../../features/auth/authSlice";
import Redirection from "../../../../components/pageLoading/Redirection";
import LoadingProgress from "../../../../components/pageLoading/LoadingProgress";
import {
  fetchAllClassSections,
  getAllClassSections,
} from "../../../../features/academics/classSectionSlice";
import { FetchAllProgrammes } from "../../../../data/programme/FetchProgrammeData";
import { FetchAllUsers } from "../../../../data/allUsers/FetchAllUsers";

export function UserSignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signUpAction } = useParams();
  console.log(signUpAction);

  // Getting data from redux state
  const allUsers = FetchAllUsers(getAllUsers);
  const allProgrammes = FetchAllProgrammes();
  const allClassSections = useSelector(getAllClassSections);

  // Redux state management
  const { signUpStatus, successMessage, error } = useSelector(
    (state) => state?.authUser
  );

  // Handle password visibility
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [redirecting, setRedirecting] = useState(false);
  const [checked, setChecked] = useState(false);

  // Input values error state handling
  const [uniqueIDInputError, setUniqueIDInputError] = useState(false);
  const [programmeInputError, setProgrammeInputError] = useState(false);
  const [classInputError, setClassInputError] = useState(false);
  const [userNameInputError, setUserNameInputError] = useState(false);
  const [passwordInputError, setPasswordInputError] = useState(false);
  const [confirmPasswordInputError, setConfirmPasswordInputError] =
    useState(false);

  // Handle terms & conditions
  const handleTermsAcceptance = (event) => {
    setChecked(event.target.checked);
  };
  // Password display toggling
  const showPassword = (e) => {
    e.preventDefault();
    setShowPass((show) => !show);
  };
  // Confirm password display toggling
  const showConfirmPassword = (e) => {
    e.preventDefault();
    setShowConfirmPass((show) => !show);
  };

  // Initial user input state
  const [newUser, setNewUser] = useState({
    uniqueId: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  console.log(newUser);

  // Find student who want to sign-up
  const userFound = allUsers?.find(
    (user) => user?.uniqueId === newUser?.uniqueId
  );
  console.log(userFound);

  // Check for existing username
  // const existingUserName = allUsers?.find(
  //   (user) => user?.userSignUpDetails?.userName === newUser?.userName
  // );

  // Handle input value
  const handleInputValue = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  // handle student sign up
  const handleSignUp = (e) => {
    e.preventDefault();
    // if (newUser?.userName && existingUserName) {
    //   setUserNameInputError(true);
    //   return;
    // }
    if (newUser?.password?.length < 6) {
      setPasswordInputError(true);
      return;
    } else if (newUser?.confirmPassword !== newUser?.password) {
      setConfirmPasswordInputError(true);
      return;
    } else {
      dispatch(userSignUp(newUser));
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
    // Username
    if (userNameInputError) {
      if (newUser?.userName === "" || !existingUserName) {
        setUserNameInputError(false);
      }
    }
    // Password
    if (passwordInputError) {
      if (newUser?.password === "" || newUser?.password?.length >= 6) {
        setPasswordInputError(false);
      }
    }
    // Confirm password
    if (confirmPasswordInputError) {
      if (
        newUser?.confirmPassword === "" ||
        newUser?.confirmPassword === newUser?.password
      ) {
        setConfirmPasswordInputError(false);
      }
    }
  }, [
    newUser,
    userFound,
    userNameInputError,
    // existingUserName,
    passwordInputError,
    confirmPasswordInputError,
  ]);

  // Check user sign up status
  useEffect(() => {
    if (signUpAction === "partners" && signUpStatus === "pending") {
      setLoadingComplete(false);
    }
    if (signUpAction === "partners" && signUpStatus === "rejected") {
      error?.errorMessage?.message?.map((err) => {
        toast.error(err, {
          position: "top-right",
          theme: "light",
          toastId: err,
        });
      });
      setTimeout(() => {
        setLoadingComplete(null);
        dispatch(resetSignUpState());
      }, 3000);
      return;
    }
    if (signUpAction === "partners" && signUpStatus === "success") {
      toast.success(successMessage, {
        position: "top-right",
        theme: "dark",
        toastId: successMessage,
      });
      setTimeout(() => {
        setLoadingComplete(true);
      }, 3000);
      setTimeout(() => {
        setRedirecting(true);
      }, 5000);
      setTimeout(() => {
        navigate(
          `/sensec/sign_up/${signUpAction}/${userFound?.uniqueId}/successful`
        );
        dispatch(resetSignUpState());
      }, 7000);
    }
  }, [
    signUpStatus,
    error,
    successMessage,
    navigate,
    dispatch,
    userFound,
    signUpAction,
  ]);

  return (
    <Box
      sx={{
        width: { xs: "95%", sm: "36rem" },
      }}
      margin={"auto"}
      mt={5}
      mb={2}
      // height={"70vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      fontSize={"calc(.7rem + 1vmin)"}
      // height={"100%"}
    >
      <Box
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
        <Box width={"15rem"} sx={{ display: { xs: "none", sm: "block" } }}>
          <Box className="left">
            <h1>Welcome, Cherished Partner.</h1>
            <p>
              The Great Sensec is glad to have you here. Kindly fill all
              required fields to create a new account.
            </p>
          </Box>
        </Box>
        <Box
          component={"form"}
          onSubmit={handleSignUp}
          ml={{ xs: 0, sm: 1 }}
          width={{ xs: "100%", sm: "60%" }}
        >
          <Box>
            <Box
              mt={1}
              mb={2}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <VpnKey style={{ color: "#767474", fontSize: "2rem" }} />
              <Typography
                variant="h5"
                component={"h1"}
                mb={2}
                sx={{ fontSize: "1.7rem" }}
              >
                Partners Sign-Up
              </Typography>
              <Box className="profilePictureWrap">
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
              </Box>
            </Box>
            <Grid container spacing={2}>
              {/* Unique ID */}
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  label={"Unique ID"}
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
              {/* Username */}
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  label={"Username"}
                  name="userName"
                  value={newUser?.userName}
                  onChange={handleInputValue}
                  required
                  error={userNameInputError}
                  // helperText={
                  //   userNameInputError ? "Username already in use!" : ""
                  // }
                  // sx={{
                  //   "& .MuiInputLabel-asterisk": {
                  //     color:
                  //       newUser?.userName && !userNameInputError
                  //         ? "green"
                  //         : "red", // Change the asterisk color to red
                  //   },
                  // }}
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
                  error={passwordInputError}
                  helperText={
                    passwordInputError &&
                    newUser?.password?.length > 0 &&
                    newUser?.password?.length < 6
                      ? "Password must be at least 6 characters long!"
                      : ""
                  }
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
              {/* Confirm Password */}
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  label={"Confirm Password"}
                  name="confirmPassword"
                  value={newUser?.confirmPassword}
                  onChange={handleInputValue}
                  required
                  type={showConfirmPass ? "text" : "password"}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <Box
                          component={"button"}
                          onClick={showConfirmPassword}
                          bgcolor={"transparent"}
                        >
                          {showConfirmPass ? (
                            <Visibility sx={{ color: "#696969" }} />
                          ) : (
                            <VisibilityOff sx={{ color: "#696969" }} />
                          )}
                        </Box>
                      ),
                    },
                  }}
                  error={confirmPasswordInputError}
                  helperText={
                    confirmPasswordInputError
                      ? "Confirm password must be same as password!"
                      : ""
                  }
                  sx={{
                    "& .MuiInputLabel-asterisk": {
                      color:
                        newUser?.confirmPassword && !confirmPasswordInputError
                          ? "green"
                          : "red", // Change the asterisk color to red
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleTermsAcceptance}
                    inputProps={{ "aria-label": "controlled" }}
                    color="success"
                  />
                }
                label="Accept terms and conditions"
                required
                sx={{
                  "& .MuiFormControlLabel-asterisk": {
                    color: `${!checked ? "red" : "green"}`, // Change the color of the asterisk to red
                  },
                }}
              />
            </Box>
            <Box mt={1}>
              <Typography>
                Already have an account?{" "}
                <Typography
                  component={"span"}
                  onClick={() => navigate("/sensec/login")}
                  sx={{ cursor: "pointer", color: "green" }}
                >
                  Login
                </Typography>
              </Typography>
            </Box>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "green",
                margin: "1rem 0",
                padding: ".5rem",
                letterSpacing: "1px",
                textTransform: "capitalize",
                fontSize: "1em",
                minHeight: "3.7rem",
              }}
            >
              {loadingComplete === false && (
                <LoadingProgress color={"#fff"} size={"1.3rem"} />
              )}
              {loadingComplete === null && (
                <>
                  Sign Up{" "}
                  <PersonAddAlt
                    className="signupIcon"
                    sx={{ marginLeft: ".5rem" }}
                  />
                </>
              )}
              {loadingComplete === true &&
                signUpStatus === "success" &&
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
    </Box>
  );
}
