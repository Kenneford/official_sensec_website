import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";
import { NavigationBar } from "../navbar/NavigationBar";

export default function NotAuthorized() {
  const {
    currentAction,
    setCurrentAction,
    currentLink,
    setCurrentLink,
    isSidebarOpen,
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
  const navigate = useNavigate();
  return (
    <Box
      sx={
        {
          // position: isScrolled ? "none" : "block",
        }
      }
    >
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
      </Stack>
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
      <Box fontSize={"calc(0.7rem + 1vmin)"} mt={3} letterSpacing={1}>
        <h4
          style={{
            textAlign: "center",
            color: "red",
            fontSize: "1em",
          }}
        >
          Not Authorized!
        </h4>
      </Box>
    </Box>
  );
}
