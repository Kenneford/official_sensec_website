import React, { useEffect, useState } from "react";
import "./signUpSuccessPage.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllUsers } from "../../../../data/allUsers/FetchAllUsers";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import LoadingProgress from "../../../../components/pageLoading/LoadingProgress";
import Redirection from "../../../../components/pageLoading/Redirection";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { NavigationBar } from "../../../../components/navbar/NavigationBar";

export function SignUpSuccessPage() {
  const signUpId = localStorage.getItem("signUpId");
  const allUsers = FetchAllUsers();

  const currentYear = new Date().getFullYear();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uniqueId } = useParams();
  console.log(uniqueId);

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

  const [goToSignUpLoadingComplete, setGoToSignUpLoadingComplete] =
    useState(null);

  const signedUpUserFound = allUsers.find(
    (user) => user?.uniqueId === signUpId
  );

  const goToHome = () => {
    setGoToSignUpLoadingComplete(false);
    setTimeout(() => {
      setGoToSignUpLoadingComplete(true);
    }, 3000);
    setTimeout(() => {
      navigate("/");
    }, 6000);
  };

  if (!signedUpUserFound) {
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
    <Box>
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
            <h1>Congratulations</h1>
            {/* <h1>🎆🎉🎇</h1> */}
            <Box className="imageWrap">
              {/* {signedUpUserFound?.isAdmin && (
                <img src={signedUpUserFound?.profilePicture} alt="" />
              )} */}
              {signedUpUserFound && (
                <img
                  src={signedUpUserFound?.personalInfo?.profilePicture?.url}
                  alt=""
                />
              )}
              {signedUpUserFound && (
                <p>
                  Hi{" "}
                  <span>
                    {signedUpUserFound?.personalInfo?.firstName}{" "}
                    {signedUpUserFound?.personalInfo?.lastName}
                  </span>
                </p>
              )}
            </Box>
            <Box
              className="infoText"
              sx={{
                width: { xs: "95%", sm: "90%" },
                margin: "auto",
              }}
            >
              <p>
                Your sign-up was successful, and a confirmation message has been
                sent to your email. Kindly visit your email to verify your
                account.
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
    </Box>
  );
}
