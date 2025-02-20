import React, { useEffect, useState } from "react";
import "./resetPassword.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuthUser, resetPassword } from "../../../features/auth/authSlice";
import { TaskAlt, Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingProgress from "../../../components/pageLoading/LoadingProgress";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { CustomTextField } from "../../../muiStyling/muiStyling";
import { NavigationBar } from "../../../components/navbar/NavigationBar";

export default function ResetPassword() {
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
    openSearchModal,
    setOpenSearchModal,
  } = useOutletContext();
  const authUser = useSelector(getAuthUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    resetPasswordStatus,
    resetPasswordSuccessMessage,
    resetPasswordError,
  } = useSelector((state) => state.authUser);
  const { userUniqueId, userIdString, token } = useParams();
  console.log(userUniqueId);
  console.log(userIdString);
  console.log(token);
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passLengthError, setPassLengthError] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");

  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleInputValues = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  //PASSWORD INPUT CONTROLL
  const pass = user.password.length > 0;
  const passCheck = user.password.length < 6;

  //CONFIRM PASSWORD INPUT CONTROLL
  const confirmPass = user.confirmPassword.length > 0;
  const confirmPassCheck = user?.confirmPassword === user?.password;

  const showPassword = () => setShowPass((show) => !show);
  const showConfirmPassword = () => setShowConfirmPass((show) => !show);

  // Function to redirect users to their dashboard
  const getUserRolePath = () => {
    if (authUser?.roles?.includes("Admin")) return "admin/Dashboard/Overview";
    if (authUser?.roles?.includes("Lecturer"))
      return "lecturer/Dashboard/Overview";
    if (authUser?.roles?.includes("Student"))
      return "student/Dashboard/Overview";
    if (authUser?.roles?.includes("NT-Staff"))
      return "nt_staff/Dashboard/Overview";
    return "*";
  };
  const userRolePath = getUserRolePath();

  const handleResetRequest = (e) => {
    e.preventDefault();
    if (authUser) {
      toast.error("Active user detected! Logout first!", {
        position: "top-right",
        theme: "light",
        // toastId: successId,
      });
      return;
    }
    if (passCheck) {
      toast.error("Password must be at least 6 characters long!", {
        position: "top-right",
        theme: "light",
        // toastId: successId,
      });
      return;
    } else if (!confirmPassCheck) {
      toast.error("Confirm password must be same as your password!", {
        position: "top-right",
        theme: "light",
        // toastId: successId,
      });
      return;
    } else {
      dispatch(
        resetPassword({
          id: userIdString,
          token,
          uniqueId: userUniqueId,
          password: user?.password,
          confirmPassword: user?.confirmPassword,
        })
      );
    }
  };
  const canRequest = user?.password && user?.confirmPassword;

  useEffect(() => {
    if (resetPasswordStatus === "pending") {
      setLoadingComplete(false);
      setTimeout(() => {
        setLoadingComplete(true);
      }, 3000);
    }
    if (resetPasswordStatus === "rejected") {
      setTimeout(() => {
        setLoadingComplete(null);
      }, 3000);
      resetPasswordError?.errorMessage?.message?.map((err) =>
        toast.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (resetPasswordStatus === "success") {
      toast.success(resetPasswordSuccessMessage, {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
      navigate(`/sensec/users/${authUser?.uniqueId}/${userRolePath}`);
      // if (authUser?.adminStatusExtend?.isAdmin) {
      //   localStorage.setItem("currentNavLink", "admin");
      //   navigate("/sensec/admin/Dashboard/Overview#admin");
      //   //   setTimeout(() => {
      //   //   }, 2000);
      // }
      // if (authUser?.teacherStatusExtend?.isTeacher) {
      //   localStorage.setItem("currentNavLink", "teacher");
      //   navigate("/sensec/teacher/Dashboard/Overview#teacher");
      //   //   setTimeout(() => {
      //   //   }, 2000);
      // }
      // if (authUser?.studentStatusExtend?.isStudent) {
      //   localStorage.setItem("currentNavLink", "student");
      //   navigate("/sensec/student/Dashboard/Overview#student");
      //   //   setTimeout(() => {
      //   //   }, 2000);
      // }
    }
  }, [
    authUser,
    resetPasswordStatus,
    resetPasswordError,
    resetPasswordSuccessMessage,
    navigate,
    userRolePath,
  ]);

  useEffect(() => {
    setPassLengthError("Password must be at least 6 characters long!");
    setConfirmPassError("Confirm password must be same as your password!");
  }, []);

  return (
    // <div className="resetPasswordWrap">
    //   <form onSubmit={handleResetRequest}>
    //     <h1>Reset Password</h1>
    //     <div className="inputContWrap passwordWrap">
    //       <div className="inputCont">
    //         <label htmlFor="password">
    //           New Password<span>*</span>
    //         </label>
    //         <div className="passwordInputBox">
    //           <input
    //             className="emailInput"
    //             type={showpass ? "text" : "password"}
    //             // placeholder="Enter new password..."
    //             onChange={handleInputValues}
    //             name="password"
    //             value={user.password}
    //           />
    //           <div
    //             style={{
    //               position: "absolute",
    //               right: "0",
    //               top: "1.2rem",
    //               width: "30px",
    //             }}
    //             onClick={showPassword}
    //           >
    //             {showpass ? (
    //               <Visibility style={{ color: "#a8a6a6" }} />
    //             ) : (
    //               <VisibilityOff style={{ color: "#a8a6a6" }} />
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //       {pass && passCheck && (
    //         <p
    //           style={{
    //             color: "red",
    //             position: "absolute",
    //             top: "3.6rem",
    //             // marginBottom: ".5rem",
    //             fontSize: ".9rem",
    //             fontWeight: "400",
    //             fontStyle: "italic",
    //           }}
    //         >
    //           {passLengthError}
    //         </p>
    //       )}
    //     </div>
    //     <div className="inputContWrap">
    //       <div className="inputCont confirmPasswordInput">
    //         <label htmlFor="confirmPassword">
    //           Confirm Password<span>*</span>
    //         </label>
    //         <div className="passwordInputBox">
    //           <input
    //             className="emailInput"
    //             type={showConfirmPass ? "text" : "password"}
    //             // placeholder="Enter new password..."
    //             onChange={handleInputValues}
    //             name="confirmPassword"
    //             value={user.confirmPassword}
    //           />
    //           <div
    //             style={{
    //               position: "absolute",
    //               right: "0",
    //               top: "1.2rem",
    //               width: "30px",
    //             }}
    //             onClick={showConfirmPassword}
    //           >
    //             {showConfirmPass ? (
    //               <Visibility style={{ color: "#a8a6a6" }} />
    //             ) : (
    //               <VisibilityOff style={{ color: "#a8a6a6" }} />
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //       {confirmPass && !confirmPassCheck && (
    //         <p
    //           style={{
    //             color: "red",
    //             position: "absolute",
    //             top: "4rem",
    //             marginBottom: ".5rem",
    //             fontSize: ".9rem",
    //             fontWeight: "400",
    //             fontStyle: "italic",
    //           }}
    //         >
    //           {confirmPassError}
    //         </p>
    //       )}
    //     </div>
    //     {/* <input
    //       className="emailInput"
    //       type="password"
    //       placeholder="Please confirm your password..."
    //       onChange={handleInputValues}
    //       name="confirmPassword"
    //       value={user.confirmPassword}
    //     /> */}
    //     <button type="submit" disabled={!canRequest}>
    //       {loadingComplete === false && (
    //         <LoadingProgress color={"#fff"} size={"1.3rem"} />
    //       )}
    //       {loadingComplete === true && resetPasswordStatus === "success" && (
    //         <>
    //           <span>Password Reset Successful</span> <TaskAlt />
    //         </>
    //       )}
    //       {loadingComplete === null && "Reset Password"}
    //     </button>
    //     <p>Having trouble? Contact our support team here.</p>
    //   </form>
    // </div>

    <Box>
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
          zIndex: 3,
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
          openSearchModal={openSearchModal}
          setOpenSearchModal={setOpenSearchModal}
        />
      </Box>
      <Box
        sx={{
          width: { xs: "95%", sm: "35rem" },
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
          <Box
            className="signUpSuccessContent"
            sx={{
              padding: { xs: "1rem .5rem", sm: "1rem" },
            }}
          >
            <h1>Reset Password</h1>
            <Box
              className="infoText"
              sx={{
                width: { xs: "95%", sm: "90%" },
                margin: "auto",
              }}
            >
              <Grid container spacing={3}>
                {/* Password */}
                <Grid item xs={12} position={"relative"}>
                  <CustomTextField
                    fullWidth
                    label={"New Password"}
                    name="password"
                    size="small"
                    value={user?.password}
                    onChange={handleInputValues}
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
                    // error={passwordInputError}
                    // helperText={
                    //   passwordInputError &&
                    //   newUser?.password?.length > 0 &&
                    //   newUser?.password?.length < 6
                    //     ? "Password must be at least 6 characters long!"
                    //     : ""
                    // }
                    sx={{
                      "& .MuiInputLabel-asterisk": {
                        color: user?.password ? "green" : "red", // Change the asterisk color to red
                      },
                    }}
                  />
                </Grid>
                {/* Confirm Password */}
                <Grid item xs={12} position={"relative"}>
                  <CustomTextField
                    fullWidth
                    label={"Confirm Password"}
                    name="confirmPassword"
                    size="small"
                    value={user?.confirmPassword}
                    onChange={handleInputValues}
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
                    sx={{
                      "& .MuiInputLabel-asterisk": {
                        color: user?.confirmPassword ? "green" : "red", // Change the asterisk color to red
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box display={"flex"} justifyContent={"center"} mb={2}>
              <Button
                variant="contained"
                onClick={handleResetRequest}
                disabled={!canRequest}
                sx={{
                  textTransform: "capitalize",
                  width: { xs: "95%", sm: "90%" },
                  bgcolor: "#008000",
                  fontSize: ".8em",
                  "&:hover": {
                    bgcolor: canRequest ? "#019001" : "#cccc",
                  },
                  minHeight: "2rem",
                  mt: 2,
                  "&.Mui-disabled": {
                    cursor: "not-allowed", // Show not-allowed cursor
                    pointerEvents: "auto",
                  },
                }}
              >
                {loadingComplete === false && (
                  <LoadingProgress color={"#fff"} size={"1.5rem"} />
                )}
                {loadingComplete === true &&
                  resetPasswordStatus === "success" && (
                    <>
                      <span>Request Successful</span> <TaskAlt />
                    </>
                  )}
                {loadingComplete === null && "Reset Password"}
              </Button>
            </Box>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: ".9rem",
                lineHeight: "1rem",
              }}
            >
              Having trouble? Contact our support team{" "}
              <span style={{ color: "#089ed9", cursor: "pointer" }}>here</span>.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
