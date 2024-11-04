import { Box, Collapse, IconButton, Typography } from "@mui/material";
import PropTypes from "prop-types";
import {
  AdminPanelSettings,
  AppRegistration,
  ArrowBack,
  ArrowForward,
  Assessment,
  AutoStories,
  Class,
  Construction,
  Diversity2,
  Diversity3,
  DryCleaning,
  Edit,
  EmojiPeople,
  Equalizer,
  ExpandLess,
  ExpandMore,
  Help,
  ListAltOutlined,
  Person,
  PersonRemoveAlt1,
  RssFeed,
  SchoolOutlined,
  Search,
  Settings,
  SupervisedUserCircle,
  Tv,
} from "@mui/icons-material";
import "./adminSidebar.scss";
import {
  AccountLinks,
  ActionsLinks,
  AdminAttendanceLinks,
  AssessmentLinks,
  AdminDashboardLinks,
  UsersLinks,
} from "../../lazyLoading/auth/AuthLazyComponents";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  getAllUsers,
  getAuthUser,
} from "../../../features/auth/authSlice";
import { useEffect } from "react";

export function AdminSidebar({
  isSidebarOpen,
  toggleSidebar,
  setCurrentAction,
  setCurrentLink,
  navbar,
  hovered,
}) {
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
      {/* Button to toggle sidebar */}
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
              in={isSidebarOpen}
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
          padding: isSidebarOpen ? "0 1rem" : "0 .5rem",
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
            <>
              <AdminDashboardLinks
                isSidebarOpen={isSidebarOpen}
                setCurrentAction={setCurrentAction}
                setCurrentLink={setCurrentLink}
                hovered={hovered}
              />
            </>
            {/* Actions */}
            <>
              <ActionsLinks
                isSidebarOpen={isSidebarOpen}
                setCurrentAction={setCurrentAction}
                setCurrentLink={setCurrentLink}
                hovered={hovered}
              />
            </>
            {/* Users */}
            <>
              <UsersLinks
                isSidebarOpen={isSidebarOpen}
                setCurrentAction={setCurrentAction}
                setCurrentLink={setCurrentLink}
                hovered={hovered}
              />
            </>
            {/* Attendance */}
            <>
              <AdminAttendanceLinks
                isSidebarOpen={isSidebarOpen}
                setCurrentAction={setCurrentAction}
                setCurrentLink={setCurrentLink}
                hovered={hovered}
              />
            </>
            {/* Assessment */}
            <>
              <AssessmentLinks
                isSidebarOpen={isSidebarOpen}
                setCurrentAction={setCurrentAction}
                setCurrentLink={setCurrentLink}
                hovered={hovered}
              />
            </>
            {/* Account */}
            <>
              <AccountLinks
                isSidebarOpen={isSidebarOpen}
                setCurrentAction={setCurrentAction}
                setCurrentLink={setCurrentLink}
                hovered={hovered}
              />
            </>
          </div>
        </Box>
      </Box>
    </>
  );
}

AdminSidebar.propTypes = {
  isSidebarOpen: PropTypes.bool,
  toggleSidebar: PropTypes.func,
  setCurrentAction: PropTypes.func,
  setCurrentLink: PropTypes.func,
  navbar: PropTypes.bool,
};
