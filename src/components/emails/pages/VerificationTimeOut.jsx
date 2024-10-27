import { useEffect, useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAllUsers, getAllUsers } from "../../../features/auth/authSlice";
import LoadingProgress from "../../pageLoading/LoadingProgress";
import Redirection from "../../pageLoading/Redirection";

export function VerificationTimeOut() {
  const allUsers = useSelector(getAllUsers);

  const currentYear = new Date().getFullYear();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uniqueId, emailToken } = useParams();
  console.log(uniqueId);
  console.log(emailToken);

  const [goToSignUpLoadingComplete, setGoToSignUpLoadingComplete] =
    useState(null);

  const signedUpUserFound = allUsers.find(
    (user) => user?.uniqueId === uniqueId
  );
  console.log(signedUpUserFound);

  const goToSignUp = () => {
    setGoToSignUpLoadingComplete(false);
    setTimeout(() => {
      setGoToSignUpLoadingComplete(true);
      // dispatch(deleteExpiredVerificationData({ uniqueId, emailToken }));
    }, 3000);
    setTimeout(() => {
      localStorage.removeItem("emailVerificationToken");
      navigate("/sensec/sign_up");
    }, 6000);
  };
  useEffect(() => {
    dispatch(fetchAllUsers());
    // dispatch(fetchAllVerifiedUsers());
  }, [dispatch]);

  return (
    <div className="confirmWrap">
      <div className="confirmContainer">
        <div className="confirmContent">
          <h1>Verification Expired!</h1>
          <div className="imageWrap">
            {signedUpUserFound && (
              <img
                src={signedUpUserFound?.personalInfo?.profilePicture.url}
                alt=""
              />
            )}
            {signedUpUserFound && (
              <p>
                Hi{" "}
                <span>
                  {signedUpUserFound?.personalInfo?.firstName}{" "}
                  {signedUpUserFound?.personalInfo?.lastName},
                </span>
              </p>
            )}
          </div>
          <div className="infoText">
            <p>
              Your verification token has expired. Kindly sign up again and
              verify your email to activate a new user account.
            </p>
            <p className="thanks">Go To Sign Up👇🏾</p>
          </div>
          <div className="confirmBtn">
            <button
              onClick={() => {
                goToSignUp();
              }}
            >
              {goToSignUpLoadingComplete === false && (
                <LoadingProgress color={"#fff"} size={"1.3rem"} />
              )}
              {goToSignUpLoadingComplete === true && (
                <Redirection color={"#fff"} size={"1.3rem"} />
              )}
              {goToSignUpLoadingComplete === null && "Click Here"}
            </button>
          </div>
          <hr />
          <div className="socials">
            <span>
              <FacebookIcon className="icon" titleAccess="Facebook Link" />
            </span>
            <span>
              <InstagramIcon className="icon" titleAccess="Instagram Link" />
            </span>
            <span>
              <TwitterIcon className="icon" titleAccess="Twitter Link" />
            </span>
            <span>
              <LinkedInIcon className="icon" titleAccess="LinkedIn Link" />
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
  );
}
