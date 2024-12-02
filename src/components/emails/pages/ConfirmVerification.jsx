import { useEffect, useState } from "react";
import "./confirmVerification.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingProgress from "../../pageLoading/LoadingProgress";
import Redirection from "../../pageLoading/Redirection";
import {
  fetchAllUsers,
  fetchVerificationData,
  getAllUsers,
  getAuthUser,
  getUserVerificationData,
  resetEmailVerificationState,
  verifyUser,
} from "../../../features/auth/authSlice";
import {
  NotSignedUp,
  VerificationTimeOut,
} from "../../lazyLoading/auth/AuthLazyComponents";
import { FetchAllUsers } from "../../../data/allUsers/FetchAllUsers";
import { Box, Button } from "@mui/material";

export function ConfirmVerification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allUsers = FetchAllUsers();
  const { uniqueId, emailToken } = useParams();
  console.log(uniqueId);

  const userInfo = useSelector(getAuthUser);
  const verificationData = useSelector(getUserVerificationData);
  console.log(verificationData);

  const currentDate = new Date().toISOString();
  console.log(verificationData?.expiryDate);

  const checkDataExpiry = verificationData?.expiryDate < currentDate;

  const { verifyEmailStatus, successMessage, error } = useSelector(
    (state) => state.authUser
  );

  console.log(userInfo);
  console.log(verificationData);
  console.log(checkDataExpiry);

  const currentYear = new Date().getFullYear();
  console.log(uniqueId);
  console.log(emailToken);
  // console.log(currentDate);

  const [errorMsg, setErrorMsg] = useState("");
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [loadingPageComplete, setLoadingPageComplete] = useState(false);
  const [tokenExpire, setTokenExpire] = useState(false);
  const [redirecting, setRedirecting] = useState("");

  const allVerifiedUsers = allUsers.filter((user) => user.isVerified && user);
  const allUnVerifiedUsers = allUsers.filter(
    (user) => !user.isVerified && user
  );
  console.log(allUnVerifiedUsers);

  const existingVerifiedUser = allUsers.find(
    (user) => user.uniqueId === uniqueId && user?.isVerified
  );
  const signedUpUser = allUsers.find(
    (user) => user?.uniqueId === uniqueId && user?.signedUp
  );

  const signedUpButNotLoggedIn = signedUpUser?.uniqueId !== userInfo.uniqueId;
  console.log(signedUpButNotLoggedIn);
  console.log(existingVerifiedUser);
  console.log(uniqueId);

  const userFound = allUsers.find((user) => user?.uniqueId === uniqueId);
  console.log(userFound);
  const userRedirectingToLogin =
    userInfo && userInfo?.uniqueId !== userFound?.uniqueId;

  const user = existingVerifiedUser || userFound;

  //Handle User Verification
  const handleVerification = () => {
    dispatch(verifyUser({ userId: uniqueId, emailToken }));
  };

  useEffect(() => {
    dispatch(fetchVerificationData(emailToken));
  }, [dispatch, emailToken]);

  //User email verification status controls
  useEffect(() => {
    if (verifyEmailStatus === "pending") {
      setLoadingComplete(false);
    }
    if (verifyEmailStatus === "success") {
      setTimeout(() => {
        setLoadingComplete(true);
      }, 3000);
      setTimeout(() => {
        setRedirecting(true);
      }, 6000);
      setTimeout(() => {
        dispatch(resetEmailVerificationState());
        if (user?.adminStatusExtend?.isAdmin) {
          navigate(`/sensec/users/${user?.uniqueId}/admin/Dashboard/Overview`);
          // localStorage.setItem("currentNavLink", "admin");
        }
        if (user?.lecturerStatusExtend?.isLecturer) {
          navigate(
            `/sensec/users/${user?.uniqueId}/lecturer/Dashboard/Overview`
          );
        }
        if (user?.studentStatusExtend?.isStudent) {
          navigate(
            `/sensec/users/${user?.uniqueId}/student/Dashboard/Overview`
          );
        }
        if (user?.nTStaffStatusExtend?.isNTStaff) {
          navigate(
            `/sensec/users/${user?.uniqueId}/nt_staff/Dashboard/Overview`
          );
        }
      }, 9000);
    }
    if (verifyEmailStatus === "rejected") {
      setTimeout(() => {
        setLoadingComplete(null);
        dispatch(resetEmailVerificationState());
      }, 3000);
      error.errorMessage.message.map((err) =>
        setTimeout(() => {
          toast.error(err, {
            position: "top-right",
            theme: "dark",
            toastId: "EmailVerificationError",
          });
          setErrorMsg(err);
        }, 2000)
      );
    }
  }, [dispatch, navigate, verifyEmailStatus, error, successMessage, user]);

  if (!user) {
    return (
      <h3
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginTop: "2rem",
          color: "#cccc",
        }}
      >
        Loading data...
        {/* <LoadingProgress color={"#696969"} size={"1.3rem"} /> */}
      </h3>
    );
  }
  return (
    <>
      {checkDataExpiry && <VerificationTimeOut />}
      {!verificationData && <NotSignedUp />}
      {!checkDataExpiry && user && (
        <Box className="confirmWrap">
          {/* Require user to confirm verification to login */}
          <Box className="confirmContainer">
            <Box className="confirmContent">
              <h1>Verify Your Email Address</h1>
              <Box className="imageWrap">
                {user && (
                  <img src={user?.personalInfo?.profilePicture?.url} alt="" />
                )}
                <p>
                  Hi{" "}
                  <span>
                    {user?.personalInfo?.firstName}{" "}
                    {user?.personalInfo?.lastName},
                  </span>
                </p>
              </Box>
              <Box className="infoText">
                <p>
                  Please confirm that you want to use this as your account email
                  address. Once it&apos;s done you will be able to use your
                  dashboard.
                </p>
                <p className="thanks">Thanks a lot for signing up!</p>
              </Box>
              {/* {errorMsg && (
                    <p className="verificationErrorMsg">{errorMsg}</p>
                  )} */}
              <Box display={"flex"} justifyContent={"center"} mb={2}>
                <Button
                  variant="contained"
                  disabled={existingVerifiedUser}
                  onClick={() => {
                    handleVerification();
                  }}
                  sx={{
                    textTransform: "capitalize",
                    width: "90%",
                    bgcolor: "#008000",
                    "&:hover": {
                      bgcolor: "#019001",
                    },
                    minHeight: "2.5rem",
                  }}
                >
                  {loadingComplete === false && !redirecting && (
                    <LoadingProgress color={"#fff"} size={"1.3rem"} />
                  )}
                  {loadingComplete === true &&
                    verifyEmailStatus === "success" &&
                    !redirecting && (
                      <>
                        <span>Email Verified</span> <TaskAltIcon />
                      </>
                    )}
                  {loadingComplete === null &&
                    !existingVerifiedUser &&
                    "Verify Your Email"}
                  {loadingComplete === null &&
                    existingVerifiedUser &&
                    "Email Verified"}
                  {redirecting && (
                    <Redirection color={"#fff"} size={"1.3rem"} />
                  )}
                </Button>
              </Box>
              <hr />
              <Box className="socials">
                <span>
                  <FacebookIcon className="icon" titleAccess="Facebook Link" />
                </span>
                <span>
                  <InstagramIcon
                    className="icon"
                    titleAccess="Instagram Link"
                  />
                </span>
                <span>
                  <TwitterIcon className="icon" titleAccess="Twitter Link" />
                </span>
                <span>
                  <LinkedInIcon className="icon" titleAccess="LinkedIn Link" />
                </span>
              </Box>
              <Box className="sensecRigth">
                <p>
                  &copy;{currentYear} <span>Sen</span>
                  <span>sec</span>
                </p>
                <Box
                  style={{
                    border: "1px solid #555",
                    height: "15px",
                  }}
                ></Box>
                <p>All Rights Reserved!</p>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
