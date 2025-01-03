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
// import "./adminSidebar.scss";
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
import { FetchAllProgrammes } from "../../../data/programme/FetchProgrammeData";
import { FetchAllUsers } from "../../../data/allUsers/FetchAllUsers";

export function StudentSideBar({
  isSidebarOpen,
  toggleSidebar,
  setCurrentAction,
  setCurrentLink,
  navbar,
}) {
  const dispatch = useDispatch();
  const authUser = useSelector(getAuthUser);
  const allUsers = FetchAllUsers();
  const allProgrammes = FetchAllProgrammes();
  // Find logged in student
  const studentInfo = allUsers?.find(
    (user) => user?.uniqueId === authUser?.uniqueId
  );
  // Find student's programme
  const studentProgrammeInfo = allProgrammes?.find(
    (programme) => programme?._id === studentInfo?.studentSchoolData?.program
  );
  console.log(allProgrammes);
  console.log(studentProgrammeInfo);

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
        <IconButton
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
        </IconButton>
        {/* User Info */}
        <Box className="userInfo">
          <img src={authUser?.personalInfo?.profilePicture?.url} alt="" />
          {isSidebarOpen && (
            <Collapse
              in={isSidebarOpen}
              className="infoText"
              //   sx={{
              //     transition: "0.5s ease", // Smooth transition when toggling
              //   }}
            >
              <span>{authUser?.personalInfo?.fullName}</span>
              {authUser && (
                <Typography>({studentProgrammeInfo?.name})</Typography>
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
              />
            </>
            {/* Actions */}
            <>
              <ActionsLinks
                isSidebarOpen={isSidebarOpen}
                setCurrentAction={setCurrentAction}
                setCurrentLink={setCurrentLink}
              />
            </>
            {/* Users */}
            <>
              <UsersLinks
                isSidebarOpen={isSidebarOpen}
                setCurrentAction={setCurrentAction}
                setCurrentLink={setCurrentLink}
              />
            </>
            {/* Attendance */}
            <>
              <AdminAttendanceLinks
                isSidebarOpen={isSidebarOpen}
                setCurrentAction={setCurrentAction}
                setCurrentLink={setCurrentLink}
              />
            </>
            {/* Assessment */}
            <>
              <AssessmentLinks
                isSidebarOpen={isSidebarOpen}
                setCurrentAction={setCurrentAction}
                setCurrentLink={setCurrentLink}
              />
            </>
            {/* Account */}
            <>
              <AccountLinks
                isSidebarOpen={isSidebarOpen}
                setCurrentAction={setCurrentAction}
                setCurrentLink={setCurrentLink}
              />
            </>
          </div>
        </Box>
      </Box>
    </>
  );
}

StudentSideBar.propTypes = {
  isSidebarOpen: PropTypes.bool,
  toggleSidebar: PropTypes.func,
  setCurrentAction: PropTypes.func,
  setCurrentLink: PropTypes.func,
  navbar: PropTypes.bool,
};
