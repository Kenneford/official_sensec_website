import { useNavigate } from "react-router-dom";
import "../user.signUp/signUp.scss";
// import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Lock,
  LockOpen,
  Security,
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

// A reusable asterisk component
const RequiredAsterisk = () => (
  <span style={{ color: "red", marginLeft: "4px" }}>*</span>
);

export function Login() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  //Get current year and random number for user's unique-Id
  const currentYear = new Date().getFullYear();
  const [num] = useState(Math.floor(10000 + Math.random() * 90000));

  // const { signUpUserStatus, signUpUserSuccessMessage, signUpUserError } =
  //   useSelector((state) => state.sensosa);

  // Get all users
  const allUsersData = [];
  console.log(allUsersData);

  const [userFound, setUserFound] = useState("");
  const [newSensosaId, setNewSensosaId] = useState("");
  console.log(newSensosaId);
  // Handle password visibility
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [redirecting, setRedirecting] = useState("");
  const [checked, setChecked] = useState(false);
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

  // Handle input value
  const handleInputValue = (e) => {
    if (e.target.name === "uniqueId" && e.target.value === "STD-68649KG-2024") {
      setUniqueIDInputError(false);
    }
    if (
      (e.target.name === "password" && !e.target.value?.length > 0) ||
      e.target.value?.length >= 6
    ) {
      setPasswordInputError(false);
    }
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };
  const letsGo =
    newUser?.uniqueId || newUser?.password || newUser?.confirmPassword;
  // handle user sign up
  const handleSignUp = (e) => {
    e.preventDefault();
    if (newUser?.uniqueId !== "STD-68649KG-2024") {
      setUniqueIDInputError(true);
      return;
    }
    if (newUser?.password?.length < 6) {
      setPasswordInputError(true);
      console.log("Error: Form submission rejected!");
      // toast.error("Password and confirm password does not match!", {
      //   position: "top-center",
      //   theme: "light",
      //   // toastId: successId,
      // });
      //   navigate("/");
      //   return;
    } else {
      console.log("Form submitted!");

      // dispatch(
      //   oldStudentSignUp({
      //     sensosaUserName: newUser?.sensosaUserName,
      //     uniqueId: newUser?.uniqueId,
      //     yearGraduated: newUser?.yearGraduated,
      //     positionHeld: newUser?.positionHeld,
      //     password: newUser?.password,
      //     newSensosaId,
      //   })
      // );
    }
  };

  // Fetch all users
  // useEffect(() => {
  //   dispatch(fetchAllUsers());
  // }, [dispatch]);

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
  // useEffect(() => {
  //   if (signUpUserStatus === "pending") {
  //     setLoadingComplete(false);
  //     setTimeout(() => {
  //       setLoadingComplete(true);
  //     }, 3000);
  //   }
  //   if (signUpUserStatus === "rejected") {
  //     signUpUserError?.errorMessage?.message?.map((err) => {
  //       // setLoginErrorMsg(err);
  //       toast.error(err, {
  //         position: "top-center",
  //         theme: "light",
  //         // toastId: successId,
  //       });
  //     });
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //       dispatch(refreshSensosaSignUpState());
  //     }, 3000);
  //     return;
  //   }
  //   if (signUpUserStatus === "success") {
  //     toast.success(signUpUserSuccessMessage, {
  //       position: "top-center",
  //       theme: "dark",
  //       // toastId: successId,
  //     });
  //     setTimeout(() => {
  //       setNewSensosaId("");
  //       setNewUser({
  //         uniqueId: "",
  //         sensosaUserName: "",
  //         password: "",
  //         confirmPassword: "",
  //       });
  //     }, 2000);
  //     setTimeout(() => {
  //       dispatch(refreshSensosaSignUpState());
  //       navigate(
  //         `/sensosa_chat/user/sign_up/successful/${userFound?.uniqueId}`
  //       );
  //       window.location.reload();
  //     }, 3000);
  //   }
  // }, [
  //   signUpUserStatus,
  //   signUpUserError,
  //   signUpUserSuccessMessage,
  //   navigate,
  //   dispatch,
  //   userFound,
  // ]);

  return (
    <Box
      sx={{
        width: { xs: "95%", sm: "70%", md: "60%", lg: "50%", xl: "35%" },
      }}
      margin={"auto"}
      mt={5}
      mb={5}
      // height={"70vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      fontSize={"calc(.7rem + 1vmin)"}
    >
      <Box
        component={"form"}
        onSubmit={handleSignUp}
        color={"#696969"}
        sx={{
          filter: "drop-shadow(0 0 0.3em rgb(255, 255, 255, 0.68))",
          boxShadow: "0px 1px 9px 1px #454343ad",
          borderRadius: ".4rem",
        }}
        p={2}
        width={"100%"}
      >
        <Box
          mt={2}
          mb={4}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Lock style={{ color: "#767474", fontSize: "2rem" }} />
          <Typography variant="h4" component={"h1"} mb={2}>
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
          <Grid item xs={12} sm={6}>
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
                    newUser?.uniqueId && !uniqueIDInputError ? "green" : "red", // Change the asterisk color to red
                },
              }}
            />
          </Grid>
          {/* Password */}
          <Grid item xs={12} sm={6}>
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
                    newUser?.password && !passwordInputError ? "green" : "red", // Change the asterisk color to red
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
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
