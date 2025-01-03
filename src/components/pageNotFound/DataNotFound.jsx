import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { NavigationBar } from "../navbar/NavigationBar";
import { useNavigate, useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";

export default function DataNotFound({ message }) {
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
  const navigate = useNavigate();

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
          zIndex: 5,
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
      <Box
        fontSize={"calc( 0.7rem + 1vmin )"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
      >
        <p
          style={{
            textAlign: "center",
            color: "red",
            margin: "1rem 0",
            fontSize: "1em",
          }}
        >
          {message}
        </p>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#028c02",
            mt: "3rem",
            maxWidth: "8rem",
            margin: "auto",
            transition: ".5s ease",
            "&:hover": {
              backgroundColor: "#036f03",
            },
          }}
          onClick={() => navigate(-1)}
        >
          Go back
        </Button>
      </Box>
    </Box>
  );
}

DataNotFound.propType = {
  message: PropTypes.string,
};
