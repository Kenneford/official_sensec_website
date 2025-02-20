import { useEffect, useState } from "react";
import "./forgotPassword.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword } from "../../../features/auth/authSlice";
import LoadingProgress from "../../../components/pageLoading/LoadingProgress";
import {
  Facebook,
  Instagram,
  LinkedIn,
  TaskAlt,
  Twitter,
} from "@mui/icons-material";
import { NavigationBar } from "../../../components/navbar/NavigationBar";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { CustomTextField } from "../../../muiStyling/muiStyling";
import Redirection from "../../../components/pageLoading/Redirection";
import { FetchAllUsers } from "../../../data/allUsers/FetchAllUsers";

export default function ForgotPassword() {
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const allUsers = FetchAllUsers();
  const {
    forgotPasswordStatus,
    forgotPasswordSuccessMessage,
    forgotPasswordError,
  } = useSelector((state) => state.authUser);
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [goToSignUpLoadingComplete, setGoToSignUpLoadingComplete] =
    useState(null);
  const [signedUpUserFound, setSignedUpUserFound] = useState("");
  const [requestSuccessful, setRequestSuccessful] = useState(false);
  const [user, setUser] = useState({
    email: "",
  });
  console.log(user);

  // const validateEmail = validator?.isEmail(user?.email);
  // console.log(validateEmail);
  const handleInputValues = (e) => {
    setUser({
      ...user,
      [e?.target?.name]: e?.target?.value,
    });
  };
  const goToHome = () => {
    setGoToSignUpLoadingComplete(false);
    setTimeout(() => {
      setGoToSignUpLoadingComplete(true);
    }, 3000);
    setTimeout(() => {
      navigate("/");
    }, 6000);
  };
  const handleResetRequest = (e) => {
    e.preventDefault();
    const data = { email: user?.email };
    if (data) {
      dispatch(forgotPassword(data));
    }
  };
  const canRequest = Boolean(user?.email);

  useEffect(() => {
    const email = user?.email;
    const userFound =
      allUsers &&
      allUsers?.find((user) => user?.contactAddress?.email === email);
    if (userFound) {
      setSignedUpUserFound(userFound);
    } else {
      setSignedUpUserFound("");
    }
  }, [allUsers, user]);

  useEffect(() => {
    if (forgotPasswordStatus === "pending") {
      setLoadingComplete(false);
    }
    if (forgotPasswordStatus === "rejected") {
      setTimeout(() => {
        setLoadingComplete(null);
      }, 3000);
      forgotPasswordError?.errorMessage?.message?.map((err) =>
        toast?.error(err, {
          position: "top-right",
          theme: "light",
          // toastId: successId,
        })
      );
      return;
    }
    if (forgotPasswordStatus === "success") {
      setTimeout(() => {
        toast?.success(forgotPasswordSuccessMessage, {
          position: "top-right",
          theme: "dark",
          // toastId: successId,
        });
      }, 1000);
      setTimeout(() => {
        setLoadingComplete(true);
      }, 3000);
      setTimeout(() => {
        setLoadingComplete(null);
      }, 5000);
      setTimeout(() => {
        setRequestSuccessful(true);
      }, 6000);
    }
  }, [
    forgotPasswordStatus,
    forgotPasswordError,
    forgotPasswordSuccessMessage,
    navigate,
  ]);

  return (
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
      {!requestSuccessful && (
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
              <h1>Forgot Password</h1>
              {/* <h1>🎆🎉🎇</h1> */}
              <Box
                className="infoText"
                sx={{
                  width: { xs: "95%", sm: "90%" },
                  margin: "auto",
                }}
              >
                <CustomTextField
                  fullWidth
                  label="Email"
                  onChange={handleInputValues}
                  name="email"
                  value={user?.email}
                  size="small"
                  required
                />
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
                    forgotPasswordStatus === "success" && (
                      <>
                        <span>Request Successful</span> <TaskAlt />
                      </>
                    )}
                  {loadingComplete === null && "Request Reset"}
                </Button>
              </Box>
              {/* <Divider /> */}
              <Box className="socials">
                <span>
                  <Facebook className="icon" titleAccess="Facebook Link" />
                </span>
                <span>
                  <Instagram className="icon" titleAccess="Instagram Link" />
                </span>
                <span>
                  <Twitter className="icon" titleAccess="Twitter Link" />
                </span>
                <span>
                  <LinkedIn className="icon" titleAccess="LinkedIn Link" />
                </span>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: { xs: 0, sm: ".5rem" },
                  textAlign: "center",
                  fontSize: ".8em",
                }}
                flexDirection={{ xs: "column", sm: "row" }}
              >
                <Box>
                  <p>
                    &copy;{currentYear} <span>Sen</span>
                    <span>sec</span>
                  </p>
                </Box>
                <Box
                  display={{ xs: "none", sm: "block" }}
                  style={{
                    border: "1px solid #a3a3a3",
                    height: "1.2rem",
                  }}
                ></Box>
                <Box>
                  <p>All Rights Reserved!</p>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {signedUpUserFound && requestSuccessful && (
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
              <h1>Request Sent</h1>
              {/* <h1>🎆🎉🎇</h1> */}
              <Box className="imageWrap">
                {/* {signedUpUserFound?.isAdmin && (
                <img src={signedUpUserFound?.profilePicture} alt="" />
              )} */}
                <img
                  src={signedUpUserFound?.personalInfo?.profilePicture?.url}
                  alt=""
                />
                <p>
                  Hi{" "}
                  <span>{signedUpUserFound?.userSignUpDetails?.userName}</span>
                </p>
              </Box>
              <Box
                className="infoText"
                sx={{
                  width: { xs: "95%", sm: "90%" },
                  margin: "auto",
                }}
              >
                <p>
                  Your password reset request was successful, and a confirmation
                  message has been sent to your email. Kindly visit your email
                  to complete your password reset.
                </p>
                <p className="thanks">To Go Home👇🏾</p>
              </Box>
              <Box display={"flex"} justifyContent={"center"} mb={2}>
                <Button
                  variant="contained"
                  onClick={() => {
                    goToHome();
                  }}
                  sx={{
                    textTransform: "capitalize",
                    width: { xs: "95%", sm: "90%" },
                    bgcolor: "#008000",
                    fontSize: "1em",
                    "&:hover": {
                      bgcolor: "#019001",
                    },
                    minHeight: "2.5rem",
                  }}
                >
                  {goToSignUpLoadingComplete === false && (
                    <LoadingProgress color={"#fff"} size={"1.3rem"} />
                  )}
                  {goToSignUpLoadingComplete === true && (
                    <Redirection color={"#fff"} size={"1.3rem"} />
                  )}
                  {goToSignUpLoadingComplete === null && "Click Here"}
                </Button>
              </Box>
              <hr />
              <Box className="socials">
                <span>
                  <Facebook className="icon" titleAccess="Facebook Link" />
                </span>
                <span>
                  <Instagram className="icon" titleAccess="Instagram Link" />
                </span>
                <span>
                  <Twitter className="icon" titleAccess="Twitter Link" />
                </span>
                <span>
                  <LinkedIn className="icon" titleAccess="LinkedIn Link" />
                </span>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: { xs: 0, sm: ".5rem" },
                  textAlign: "center",
                  fontSize: "1em",
                }}
                flexDirection={{ xs: "column", sm: "row" }}
              >
                <Box>
                  <p>
                    &copy;{currentYear} <span>Sen</span>
                    <span>sec</span>
                  </p>
                </Box>
                <Box
                  display={{ xs: "none", sm: "block" }}
                  style={{
                    border: "1px solid #a3a3a3",
                    height: "1.2rem",
                  }}
                ></Box>
                <Box>
                  <p>All Rights Reserved!</p>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
