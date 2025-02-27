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
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllUsers,
  getAllUsers,
  getAuthUser,
} from "../../../features/auth/authSlice";
import { useEffect } from "react";
import {
  FetchAllFlattenedProgrammes,
  FetchAllProgrammes,
} from "../../../data/programme/FetchProgrammeData";
import { FetchAllUsers } from "../../../data/allUsers/FetchAllUsers";
import { StudentDashboardLinks } from "./student.sidebar.links/StudentDashboardLinks";
import { StudentAccountLinks } from "./student.sidebar.links/StudentAccountLinks";
import { StudentAttendanceLinks } from "./student.sidebar.links/StudentAttendanceLinks";
import { StudentReportLinks } from "./student.sidebar.links/StudentReportLinks";

export function StudentSideBar({ hovered, currentTerm, currentAcademicYear }) {
  const dispatch = useDispatch();
  const authUser = useSelector(getAuthUser);
  const allUsers = FetchAllUsers();
  const allProgrammes = FetchAllFlattenedProgrammes();
  // Find logged in student
  const studentInfo = allUsers?.find(
    (user) => user?.uniqueId === authUser?.uniqueId
  );
  // Find student's programme
  const studentProgrammeInfo = allProgrammes?.find(
    (programme) =>
      programme?._id === studentInfo?.studentSchoolData?.program?.programId
  );
  console.log(authUser);
  console.log(allProgrammes);
  console.log(studentProgrammeInfo);

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
            <Box
              className="infoText"
              //   sx={{
              //     transition: "0.5s ease", // Smooth transition when toggling
              //   }}
            >
              <span>{authUser?.personalInfo?.fullName}</span>
              {studentProgrammeInfo && (
                <Typography>
                  [{" "}
                  {studentProgrammeInfo?.divisionName
                    ? studentProgrammeInfo?.divisionName
                    : studentProgrammeInfo?.programmeName}{" "}
                  ]
                </Typography>
              )}
            </Box>
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
          <Box className="sidebarContentLinksWrap">
            <StudentDashboardLinks hovered={hovered} />
            <StudentAttendanceLinks hovered={hovered} />
            <StudentReportLinks hovered={hovered} />
            <StudentAccountLinks hovered={hovered} />
          </Box>
        </Box>
      </Box>
    </>
  );
}

StudentSideBar.propTypes = {
  hovered: PropTypes.bool,
  currentTerm: PropTypes.object,
  currentAcademicYear: PropTypes.object,
};
