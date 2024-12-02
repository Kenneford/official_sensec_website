import { Box, Collapse, Typography } from "@mui/material";
import PropTypes from "prop-types";
import "./adminSidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  getAllUsers,
  getAuthUser,
} from "../../../features/auth/authSlice";
import { useEffect } from "react";
import { AdminDashboardLinks } from "./admin.sidebar.links/AdminDashboardLinks";
import { ActionsLinks } from "./admin.sidebar.links/ActionsLinks";
import { UsersLinks } from "./admin.sidebar.links/UsersLinks";
import { AdminAttendanceLinks } from "./admin.sidebar.links/AdminAttendanceLinks";
import { AssessmentLinks } from "./admin.sidebar.links/AssessmentLinks";
import { AccountLinks } from "./admin.sidebar.links/AccountLinks";

export function AdminSidebar({ hovered, currentTerm, currentAcademicYear }) {
  const dispatch = useDispatch();
  const authUser = useSelector(getAuthUser);
  const allUsers = useSelector(getAllUsers);
  // Find logged in admin
  const authAdminInfo = allUsers?.find(
    (user) => user?.uniqueId === authUser?.uniqueId
  );

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <>
      {/* User Info */}
      <Box
        sx={{
          backgroundColor: "#292929",
          padding: ".5rem",
          // position: "fixed",
          // top: navbar ? "4.5rem" : "9rem",
          // width: "inherit",
          // height: "100vh",
          // left: "0",
          // zIndex: "1",
          borderBottom: "2px solid #02b202",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            color: "#696969",
            pt: 1,
            fontSize: "1rem",
          }}
        >
          <span>{currentTerm?.name}</span>
          {"-"}
          <span>{currentAcademicYear?.yearRange}</span>
        </Box>
        {/* <IconButton
          sx={{
            position: "absolute",
            top: ".5rem",
            right: "0",
            color: "#fff",
          }}
          onClick={toggleSidebar}
        >
          {!isSidebarOpen ? (
            <ArrowForward
              sx={{
                transition: "width 0.5s ease", // Smooth transition when toggling
              }}
            />
          ) : (
            <ArrowBack
              sx={{
                transition: "width 0.5s ease", // Smooth transition when toggling
              }}
            />
          )}
        </IconButton> */}
        {/* User Info */}
        <Box className="userInfo">
          <img src={authUser?.personalInfo?.profilePicture?.url} alt="" />
          {hovered && (
            <Collapse
              in={hovered}
              className="infoText"
              //   sx={{
              //     transition: "0.5s ease", // Smooth transition when toggling
              //   }}
            >
              <span>
                {authUser?.personalInfo?.gender === "Male" ? "Mr." : "Mrs."}{" "}
                {authUser?.personalInfo?.lastName}
              </span>
              {authUser && authAdminInfo?.status.positionHolding && (
                <Typography>
                  ({authAdminInfo?.status.positionHolding})
                </Typography>
              )}
            </Collapse>
          )}
        </Box>
      </Box>
      <Box
        component={"div"}
        id="sidebarContentWrap"
        sx={{
          padding: hovered ? "0 1rem" : "0 .5rem",
        }}
      >
        {/* Sidebar content */}
        <Box
          sx={{
            color: "#fff",
            // display: isSidebarOpen ? "block" : "none",
          }}
        >
          {/* Add content that overflows */}
          <div className="sidebarContentLinksWrap">
            {/* Dashboard */}
            <AdminDashboardLinks hovered={hovered} />
            {/* Actions */}
            <ActionsLinks hovered={hovered} />
            {/* Users */}
            <UsersLinks hovered={hovered} />
            {/* Attendance */}
            <AdminAttendanceLinks hovered={hovered} />
            {/* Assessment */}
            <AssessmentLinks hovered={hovered} />
            {/* Account */}

            <AccountLinks hovered={hovered} />
          </div>
        </Box>
      </Box>
    </>
  );
}

AdminSidebar.propTypes = {
  hovered: PropTypes.bool,
  currentTerm: PropTypes.object,
  currentAcademicYear: PropTypes.object,
};
