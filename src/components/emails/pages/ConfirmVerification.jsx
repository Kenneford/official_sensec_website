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
  getAllUsers,
  getAuthUser,
} from "../../../features/auth/authSlice";
import { VerificationTimeOut } from "../../lazyLoading/auth/AuthLazyComponents";

export function ConfirmVerification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uniqueId, emailToken } = useParams();
  const userInfo = useSelector(getAuthUser);
  const allUsers = useSelector(getAllUsers);
  const verificationData = {};

  const currentDate = new Date("2024-10-26T20:48:52.432+00:00").toISOString();
  const checkDataExpiry = verificationData?.expiryDate < currentDate;

  // const { verificationStatus, verificationSuccessMessage, verificationError } =
  //   useSelector((state) => state.user);

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

  const existingVerifiedUser = allVerifiedUsers.find(
    (user) => user.uniqueId === uniqueId
  );
  const signedUpUser = allUnVerifiedUsers.find(
    (user) => user?.uniqueId === uniqueId && user?.signedUp
  );

  const signedUpButNotLoggedIn = signedUpUser?.uniqueId !== userInfo.uniqueId;
  console.log(signedUpButNotLoggedIn);
  console.log(existingVerifiedUser);
  console.log(uniqueId);
  const userFound = allUnVerifiedUsers.find(
    (user) => user?.uniqueId === uniqueId
  );
  console.log(userFound);
  const userRedirectingToLogin =
    userInfo && userInfo?.uniqueId !== userFound?.uniqueId;

  const user = existingVerifiedUser || userFound;

  //Handle User Verification
  const handleVerification = () => {
    setLoadingComplete(false);
    if (!user) {
      toast.error("User Not Found!", {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
      setTimeout(() => {
        setLoadingComplete(null);
      }, 3000);
    } else if (!verificationData) {
      toast.error("Verification Data Not Found!", {
        position: "top-right",
        theme: "dark",
        // toastId: successId,
      });
      setTimeout(() => {
        // setLoadingComplete(null);
        setRedirecting(true);
        // dispatch(deleteExpiredVerificationData({ uniqueId, emailToken }));
      }, 3000);
      setTimeout(() => {
        navigate(`/sensec/email/${uniqueId}/${emailToken}/verify/redirection`);
      }, 6000);
    } else if (user && checkDataExpiry) {
      setTimeout(() => {
        setTokenExpire(true);
        // dispatch(deleteExpiredVerificationData({ uniqueId, emailToken }));
      }, 3000);
    } else if (signedUpUser && !signedUpUser?.isVerified) {
      // dispatch(verifyUser({ uniqueId, emailToken }));
    } else {
      setTimeout(() => {
        setLoadingComplete(true);
        setRedirecting(true);
      }, 3000);
      setTimeout(() => {
        navigate(`/sensec/email/${uniqueId}/${emailToken}/verify/redirection`);
      }, 6000);
    }
  };

  useEffect(() => {
    // dispatch(fetchVerificationData(emailToken));
    dispatch(fetchAllUsers());
    // dispatch(fetchAllUnVerifiedUsers());
  }, [dispatch, emailToken]);

  //User email verification status controls
  // useEffect(() => {
  //   if (verificationStatus === "pending") {
  //     setTimeout(() => {
  //       setLoadingComplete(true);
  //     }, 3000);
  //   }
  //   if (verificationStatus === "success") {
  //     setTimeout(() => {
  //       setLoadingComplete(true);
  //     }, 3000);
  //     setTimeout(() => {
  //       setRedirecting(true);
  //     }, 6000);
  //     setTimeout(() => {
  //       if (user?.adminStatusExtend?.isAdmin) {
  //         navigate("/sensec/admin/Dashboard/Overview#admin");
  //         localStorage.setItem("currentNavLink", "admin");
  //       }
  //       if (user?.teacherStatusExtend?.isTeacher) {
  //         navigate("/sensec/teacher/Dashboard/Overview");
  //       }
  //       if (user?.studentStatusExtend?.isStudent) {
  //         navigate("/sensec/student/Dashboard/Overview");
  //       }
  //       if (user?.nTStaffStatusExtend?.isNTStaff) {
  //         navigate("/sensec/nt_staff/Dashboard/Overview");
  //       }
  //     }, 9000);
  //   }
  //   if (verificationStatus === "rejected") {
  //     dispatch(fetchAllUsers());
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //     }, 3000);
  //     verificationError.errorMessage.message.map((err) =>
  //       setTimeout(() => {
  //         toast.error(err, {
  //           position: "top-right",
  //           theme: "dark",
  //           // toastId: successId,
  //         });
  //         setErrorMsg(err);
  //       }, 2000)
  //     );
  //   }
  // }, [
  //   dispatch,
  //   navigate,
  //   user,
  //   verificationStatus,
  //   existingVerifiedUser,
  //   verificationError,
  //   verificationSuccessMessage,
  //   loadingComplete,
  //   tokenExpire,
  //   errorMsg,
  // ]);
  if (!user) {
    return (
      <h3
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginTop: "2rem",
          color: "#696969",
        }}
      >
        Page Loading...
        <LoadingProgress color={"#696969"} size={"1.3rem"} />
      </h3>
    );
  }
  return (
    <>
      {tokenExpire ? (
        <VerificationTimeOut />
      ) : (
        <>
          {user && (
            <div className="confirmWrap">
              {/* Require user to confirm verification to login */}
              <div className="confirmContainer">
                <div className="confirmContent">
                  <h1>Verify Your Email Address</h1>
                  <div className="imageWrap">
                    {user && (
                      <img
                        src={user?.personalInfo?.profilePicture?.url}
                        alt=""
                      />
                    )}
                    <p>
                      Hi{" "}
                      <span>
                        {user?.personalInfo?.firstName}{" "}
                        {user?.personalInfo?.lastName},
                      </span>
                    </p>
                  </div>
                  <div className="infoText">
                    <p>
                      Please confirm that you want to use this as your account
                      email address. Once it's done you will be able to use your
                      dashboard.
                    </p>
                    <p className="thanks">Thanks a lot for signing up!</p>
                  </div>
                  {errorMsg && (
                    <p className="verificationErrorMsg">{errorMsg}</p>
                  )}
                  <div className="confirmBtn">
                    <button
                      onClick={() => {
                        handleVerification();
                      }}
                    >
                      {loadingComplete === false && !redirecting && (
                        <LoadingProgress color={"#fff"} size={"1.3rem"} />
                      )}
                      {loadingComplete === true &&
                        // verificationStatus === "success" &&
                        !redirecting && (
                          <>
                            <span> Email Verified</span> <TaskAltIcon />
                          </>
                        )}
                      {loadingComplete === null && "Verify Your Email"}
                      {redirecting && (
                        <Redirection color={"#fff"} size={"1.3rem"} />
                      )}
                    </button>
                  </div>
                  <hr />
                  <div className="socials">
                    <span>
                      <FacebookIcon
                        className="icon"
                        titleAccess="Facebook Link"
                      />
                    </span>
                    <span>
                      <InstagramIcon
                        className="icon"
                        titleAccess="Instagram Link"
                      />
                    </span>
                    <span>
                      <TwitterIcon
                        className="icon"
                        titleAccess="Twitter Link"
                      />
                    </span>
                    <span>
                      <LinkedInIcon
                        className="icon"
                        titleAccess="LinkedIn Link"
                      />
                    </span>
                  </div>
                  <div className="sensecRigth">
                    <p>
                      &copy;{currentYear} <span>Sen</span>
                      <span>sec</span>
                    </p>
                    <div
                      style={{
                        border: "1px solid #555",
                        height: "15px",
                      }}
                    ></div>
                    <p>All Rights Reserved!</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
