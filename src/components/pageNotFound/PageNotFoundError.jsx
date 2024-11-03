import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { CenteredBox, PageNotFoundWrapBox } from "../../muiStyling/muiStyling";
import { NavigationBar } from "../lazyLoading/LazyComponents";

export function PageNotFoundError() {
  const navigate = useNavigate();
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
  } = useOutletContext();
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
          zIndex: 1,
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
        />
      </Box>
      <CenteredBox className="empty-page">
        <PageNotFoundWrapBox>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "700",
              fontSize: "4em",
              color: "#696969",
            }}
            className="page404"
          >
            404
          </Typography>
          <Typography variant="h6" sx={{ mb: 2, color: "#696969" }}>
            Page Not Found!
          </Typography>
          <Box className="emptyWrap">
            {/* <img style={{}} /> */}
            <Avatar
              src="/assets/sad-dog1.jpg"
              alt="sad dog"
              sx={{
                width: "10rem",
                height: "10rem",
              }}
            />
          </Box>
          <Typography
            variant="h3"
            sx={{
              fontSize: "1.3em",
              padding: ".5rem 0 0",
              color: "#696969",
            }}
          >
            Oooops!
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontSize: "1.3em",
              padding: ".5rem 0",
              color: "#696969",
            }}
          >
            There is nothing in here...
          </Typography>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => navigate(-1)}
            sx={{ mt: 2 }}
          >
            Go Back
          </Button>
        </PageNotFoundWrapBox>
      </CenteredBox>
    </Box>
  );
}
