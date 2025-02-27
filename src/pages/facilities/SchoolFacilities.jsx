import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useOutletContext } from "react-router-dom";
import { NavigationBar } from "../../components/navbar/NavigationBar";
import UserDataNotFound from "../../components/userNotFound/UserDataNotFound";

export default function SchoolFacilities() {
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
    isSidebarOpen,
    openSearchModal,
    setOpenSearchModal,
  } = useOutletContext();

  const navigate = useNavigate();

  return (
    <Box>
      <Helmet>
        <title>School Facilities - Senya SHS</title>
        <meta
          name="description"
          content="Explore Senya Senior High School's facilities like laboratory, computer classroom, library, etc..."
        />
        <meta
          name="keywords"
          content="Senya SHS Facilities, Sensec Facilities, Sensec Official Website Facilities"
        />
        <meta property="og:title" content="School Facilities | Senya SHS" />
        <meta
          property="og:description"
          content="Explore Senya Senior High School's facilities like laboratory, computer classroom, library, etc..."
        />
        <link
          rel="canonical"
          href="https://www.senyashs.com/sensec/facilities"
        />
        <link
          rel="icon"
          type="image/png"
          href="https://www.senyashs.com/assets/sensec-logo1.png"
        />
      </Helmet>
      {/* <Box>
        <Stack
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
              src="https://www.senyashs.com/assets/sensec-logo1.png"
              alt="Sensec Logo"
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
        </Stack>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            padding: 0,
            zIndex: 3,
            mb: 4,
          }}
        >
          <Box>
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
              isSidebarOpen={isSidebarOpen}
              openSearchModal={openSearchModal}
              setOpenSearchModal={setOpenSearchModal}
            />
          </Box>
        </Box>
      </Box> */}
      <Box>
        <UserDataNotFound dataType={"Facilities"} />
      </Box>
    </Box>
  );
}
