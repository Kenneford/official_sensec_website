import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./tokenExpiry.scss";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthUser,
  getRefreshToken,
  refreshSessionToken,
  resetSessionUpdateState,
  userLogout,
} from "../../../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TouchApp } from "@mui/icons-material";

const WARNING_TIME = 2 * 60 * 1000; // 2 minutes before session expiration
// const refreshToken = localStorage.getItem("refreshToken");

export default function TokenExpiry() {
  const token = localStorage.getItem("userToken");
  const authUser = useSelector(getAuthUser);
  const refreshToken = useSelector(getRefreshToken);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [tokenRenewed, setTokenRenewed] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state management
  const { refreshTokenStatus, successMessage, error } = useSelector(
    (state) => state?.authUser
  );

  useEffect(() => {
    if (!token) return;
    // Decode token to get expiration time
    const decodedToken = jwtDecode(token);
    let expiresAt = decodedToken.exp * 1000; // Convert expiry time to milliseconds

    const calculateRemainingTime = () => {
      const remainingTime = expiresAt - Date.now();
      setTimeLeft(remainingTime);

      if (remainingTime <= WARNING_TIME && remainingTime > 0) {
        setShowWarning(true);
        setTokenRenewed(true);
      } else if (remainingTime <= 0) {
        setSessionExpired(true);
        setShowWarning(false);
      }
    };

    // Calculate the initial remaining time
    calculateRemainingTime();

    // Set up interval to update the time left every second
    const timerInterval = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(timerInterval);
  }, [showWarning, authUser, token]);

  // Handle session refresh or logout
  const onRefreshToken = () => {
    console.log("Refresh Token");
    if (token) {
      // Update expiresAt based on the new token
      const decodedNewToken = jwtDecode(token);
      const newExpiresAt = decodedNewToken.exp * 1000; // Convert to milliseconds
      setTimeLeft(newExpiresAt - Date.now());
      setShowWarning(false);
      setSessionExpired(false);
    }
  };

  // Handle session refresh or logout
  const handleLogout = () => {
    // Clear token and log out
    dispatch(userLogout());
    setTokenRenewed(null);
    getUserLoginPath();
  };

  const handleExtendSession = () => {
    try {
      dispatch(refreshSessionToken(token));
      setShowWarning(false);
      onRefreshToken(); // Call the function to refresh the token
    } catch (error) {
      console.error("Failed to refresh token:", error);
      handleLogout();
    }
  };

  // Function to redirect users to their dashboard
  const getUserLoginPath = () => {
    if (authUser?.roles?.includes("admin")) {
      localStorage?.setItem("loginAction", "Admins Login");
      navigate("/sensec/login");
    }
    if (authUser?.roles?.includes("lecturer")) {
      localStorage?.setItem("loginAction", "Lecturers Login");
      navigate("/sensec/login");
    }
    if (authUser?.roles?.includes("student")) {
      localStorage?.setItem("loginAction", "Students Login");
      navigate("/sensec/login");
    }
    if (authUser?.roles?.includes("nt-Staff")) {
      localStorage?.setItem("loginAction", "NT-Staffs Login");
      navigate("/sensec/login");
    }
    return;
  };

  // Check user login status
  useEffect(() => {
    if (refreshTokenStatus === "rejected") {
      error?.errorMessage?.message?.map((err) => {
        toast.error(err, {
          position: "top-right",
          theme: "light",
          toastId: err,
        });
      });
      return;
    }
    if (refreshTokenStatus === "success") {
      toast.success(successMessage, {
        position: "top-right",
        theme: "dark",
        toastId: successMessage,
      });
      setTokenRenewed(null);
      setTimeout(() => {
        dispatch(resetSessionUpdateState());
      }, 4000);
    }
  }, [refreshTokenStatus, error, successMessage, navigate, dispatch]);

  return (
    <>
      {tokenRenewed && (
        <Box
          position={"absolute"}
          top={"50%"}
          left={"50%"}
          display={"flex"}
          justifyItems={"center"}
          alignItems={"center"}
          sx={{
            transform: "translate(-50%, -50%)",
          }}
          zIndex={5}
          color={"#fff"}
          bgcolor={"#000"}
        >
          {/* Session Warning Modal */}
          <Dialog
            open={showWarning && !sessionExpired}
            onClose={() => setShowWarning(false)}
            aria-labelledby="session-expiry-dialog-title"
            aria-describedby="session-expiry-dialog-description"
          >
            <Box minHeight={"150px"} position={"relative"} overflow={"hidden"}>
              <DialogTitle id="session-expiry-dialog-title">
                Session Expiring Soon!
              </DialogTitle>
              <DialogContent sx={{ pb: 0 }}>
                <DialogContentText id="session-expiry-dialog-description">
                  {/* Your session will expire in two (2) minutes. */}
                  Your session will expire in about{" "}
                  {Math.floor(timeLeft / 1000)} seconds.
                </DialogContentText>
              </DialogContent>
              <DialogActions sx={{ mx: 2.5, position: "relative" }}>
                <Button
                  id="renewSessionBtn"
                  onClick={handleExtendSession}
                  color="primary"
                >
                  Renew Session
                  <TouchApp className="renewSessionIcon" sx={{ ml: 1 }} />
                </Button>
                {/* Finger Icon with Animation */}
                <Button
                  bgcolor={"red"}
                  onClick={handleLogout}
                  color="error"
                  sx={{
                    letterSpacing: "1px",
                    color: "#e04c4c",
                    "&:hover": { backgroundColor: "#e35454", color: "#fff" },
                  }}
                >
                  Logout
                </Button>
              </DialogActions>
            </Box>
          </Dialog>
          {/* Session Expiry Modal */}
          <Dialog
            open={sessionExpired && !showWarning}
            onClose={handleLogout}
            aria-labelledby="session-expiry-dialog-title"
            aria-describedby="session-expiry-dialog-description"
          >
            <Box minHeight={"150px"} position={"relative"}>
              <DialogTitle id="session-expiry-dialog-title">
                Session Expired!
              </DialogTitle>
              <DialogContent sx={{ pb: 0 }}>
                <DialogContentText id="session-expiry-dialog-description">
                  Your session has expired. Please log in again.
                </DialogContentText>
              </DialogContent>
              <DialogActions sx={{ px: 2.5 }}>
                <Button
                  id="expiredSessionBtn"
                  onClick={handleLogout}
                  color="secondary"
                  bgcolor="secondary"
                  //   sx={{ border: "1px solid #be14e0" }}
                >
                  Log In Again
                  <TouchApp className="expiredSessionIcon" />
                </Button>
              </DialogActions>
            </Box>
          </Dialog>
        </Box>
      )}
    </>
  );
}

TokenExpiry.propTypes = {
  token: PropTypes.string,
  onLogout: PropTypes.func,
  onRefreshToken: PropTypes.func,
};
