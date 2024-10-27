import React, { useEffect, useState } from "react";
import "./signUpSuccessPage.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingProgress from "../pageLoading/LoadingProgress";
import Redirection from "../pageLoading/Redirection";
import {
  fetchAllUnVerifiedUsers,
  getUnVerifiedUsers,
} from "../../features/allUsers/usersSlice";
import PageLoading from "../pageLoading/PageLoading";
import { FetchAllUsers } from "../../dataFetching/fetchAllUsers/FetchAllUsers";

export default function SignUpSuccessPage() {
  const signUpId = localStorage.getItem("signUpId");
  const allUsers = FetchAllUsers();

  const currentYear = new Date().getFullYear();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [goToSignUpLoadingComplete, setGoToSignUpLoadingComplete] =
    useState(null);

  const signedUpUserfound = allUsers.find(
    (user) => user?.uniqueId === signUpId
  );

  const goToHome = () => {
    setGoToSignUpLoadingComplete(false);
    setTimeout(() => {
      setGoToSignUpLoadingComplete(true);
    }, 3000);
    setTimeout(() => {
      localStorage.removeItem("signUpId");
      navigate("/");
    }, 6000);
  };

  useEffect(() => {
    dispatch(fetchAllUnVerifiedUsers());
  }, [dispatch]);

  if (!signedUpUserfound) {
    return <PageLoading />;
  }
  return (
    <div className="confirmWrap">
      <div className="confirmContainer">
        <div className="confirmContent">
          <h1>Congratulations</h1>
          {/* <h1>🎆🎉🎇</h1> */}
          <div className="imageWrap">
            {/* {signedUpUserfound?.isAdmin && (
              <img src={signedUpUserfound?.profilePicture} alt="" />
            )} */}
            {signedUpUserfound && (
              <img
                src={signedUpUserfound?.personalInfo?.profilePicture.url}
                alt=""
              />
            )}
            {signedUpUserfound && (
              <p>
                Hi{" "}
                <span>
                  {signedUpUserfound?.personalInfo?.firstName}{" "}
                  {signedUpUserfound?.personalInfo?.lastName},
                </span>
              </p>
            )}
          </div>
          <div className="infoText">
            <p>
              Your sign-up was successful, and a confirmation message has been
              sent to your email.
            </p>
            <p>Kindly visit your email to verify your account.</p>
            <p className="thanks">To Go Home👇🏾</p>
          </div>
          <div className="confirmBtn">
            <button
              onClick={() => {
                goToHome();
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
