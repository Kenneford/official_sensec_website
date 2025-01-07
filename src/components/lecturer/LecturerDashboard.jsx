import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { NavigationBar } from "../navbar/NavigationBar";
import Reports from "./components/reports/Reports";
import "./lecturerDashboard.scss";
import { useSelector } from "react-redux";
import { getAuthUser } from "../../features/auth/authSlice";

export function LecturerDashboard() {
  const authUser = useSelector(getAuthUser);
  console.log(authUser);

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
    isSidebarOpen,
    openSearchModal,
    setOpenSearchModal,
    hovered,
    setHovered,
    drawerWidthCollapsed,
    drawerWidthExpanded,
  } = useOutletContext();
  const { lecturerCurrentAction, lecturerCurrentLink } = useParams();
  console.log(lecturerCurrentAction, lecturerCurrentLink);

  return (
    <Box>
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
      <Box
        sx={{
          fontSize: "calc(0.7rem + 1vmin)",
          // marginTop: fixedNavbar ? "20rem" : "",
        }}
      >
        {lecturerCurrentLink === "create_report" && <Reports />}
      </Box>
    </Box>
  );
}
