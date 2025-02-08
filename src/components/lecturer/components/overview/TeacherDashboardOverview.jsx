import React, { useEffect, useState } from "react";
import "./teacherDashboardOverview.scss";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MoneyOutlinedIcon from "@mui/icons-material/MoneyOutlined";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HashLink } from "react-router-hash-link";
import { getAuthUser } from "../../../../features/auth/authSlice";
import SmallFooter from "../../../footer/SmallFooter";
import { Box, Grid } from "@mui/material";
import {
  AdminPanelSettings,
  AutoStories,
  Diversity3,
  ListAltOutlined,
  RssFeed,
  SchoolOutlined,
  SupervisedUserCircle,
} from "@mui/icons-material";
import SearchForm from "../../../searchForm/SearchForm";
import { FetchAllLecturers } from "../../../../data/lecturers/FetchLecturers";
import { FetchClassSectionStudents } from "../../../../data/students/FetchAllStudents";
import Cookies from "js-cookie";
import {
  fetchWeeklyClassAttendances,
  getWeeklyClassAttendance,
} from "../../../../features/academics/attendanceSlice";

export function TeacherDashboardOverview() {
  const allStudents = [];
  const allPendingStudents = [];
  const allAdmins = [];
  const allStaffs = [];
  const allTeachers = [];
  const allSubjectStudents = [];
  const allPosts = [];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lecturerCurrentLink, lecturerCurrentAction } = useParams();
  const authUser = useSelector(getAuthUser);
  const weeklyClassAttendance = useSelector(getWeeklyClassAttendance);
  const allLecturers = FetchAllLecturers();
  const [searchStudent, setSearchStudent] = useState("");
  const lecturerFound = allLecturers?.find(
    (lect) => lect?.uniqueId === authUser?.uniqueId
  );
  const sectionStudents = FetchClassSectionStudents({
    class_section: lecturerFound?.lecturerSchoolData?.classLevelHandling?._id,
  });

  console.log(weeklyClassAttendance);

  // Calculate total present and absent counts
  const { totalPresent, totalAbsent } =
    weeklyClassAttendance &&
    weeklyClassAttendance.reduce(
      (totals, record) => {
        record?.students?.forEach((student) => {
          if (student.status === "Present") {
            totals.totalPresent += 1;
          } else if (student.status === "Absent") {
            totals.totalAbsent += 1;
          }
        });
        return totals;
      },
      { totalPresent: 0, totalAbsent: 0 }
    );

  // Calculate percentages
  const totalRecords = totalPresent + totalAbsent;
  const presentPercentage = totalRecords
    ? ((totalPresent / totalRecords) * 100).toFixed(1)
    : "0.0";
  const absentPercentage = totalRecords
    ? ((totalAbsent / totalRecords) * 100).toFixed(1)
    : "0.0";
  console.log(totalPresent, presentPercentage);
  console.log(totalAbsent, absentPercentage);

  // Filter out duplicates based on the _id property
  const electiveSubjects = Array.from(
    new Map(
      lecturerFound?.lecturerSchoolData?.teachingSubjects?.electives?.map(
        (subj) => [subj?.subject?._id, subj]
      )
    ).values()
  );
  const coreSubjects = Array.from(
    new Map(
      lecturerFound?.lecturerSchoolData?.teachingSubjects?.cores?.map(
        (subj) => [subj?.subject?._id, subj]
      )
    ).values()
  );

  useEffect(() => {
    dispatch(fetchWeeklyClassAttendances());
  }, [dispatch]);

  return (
    <>
      <Box
        id="adminDashboardHeaderWrap"
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          padding: 0,
          // zIndex: 1,
        }}
      >
        <h1 className="dashAction">
          {lecturerCurrentAction?.replace(/_/g, "-")} /{" "}
          <span>{lecturerCurrentLink?.replace(/_/g, " ")}</span>
        </h1>
        {/* Main search bar */}
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <SearchForm
            // value={searchItem}
            // onChange={handleOnChange}
            placeholder={"Search"}
          />
        </Box>
      </Box>
      <Box
        className="teacherOverviewWrap"
        // minHeight={"106vh"}
      >
        <Box
          className="content"
          sx={{
            padding: {
              xs: "1rem .5rem",
              sm: "1rem .5rem",
              md: "1rem 2rem",
            },
            letterSpacing: 1,
          }}
        >
          <Box className="dashBoardContent">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Box className="card" sx={{ backgroundColor: "#005780" }}>
                  <h3>Students Data</h3>
                  <HashLink
                    to={`/sensec/users/${authUser?.uniqueId}/lecturer/Dashboard/Class_Handling_Students`}
                    className="cardInfo"
                  >
                    <div
                      title="Class Handling Students"
                      className="cardInfoIcons"
                    >
                      <SchoolOutlined
                        style={{
                          fontSize: "1.5em",
                          marginRight: 4,
                        }}
                        // titleAccess="Class Handling Students"
                      />
                      <h4 style={{ fontSize: ".9em", fontWeight: 400 }}>C/S</h4>
                    </div>
                    <Box className="cardTotal">
                      {sectionStudents?.length > 0
                        ? sectionStudents?.length
                        : 0}
                    </Box>
                  </HashLink>
                  <HashLink
                    to={`/sensec/users/${authUser?.uniqueId}/lecturer/Dashboard/Programme_Students`}
                    className="pending"
                  >
                    <h4>Programme Student(s)</h4>
                    <Box className="cardPending">Unset</Box>
                  </HashLink>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Box className="card" sx={{ backgroundColor: "green" }}>
                  <h3>Assigned Subjects</h3>
                  <HashLink
                    to={`/sensec/users/${authUser?.uniqueId}/lecturer/Dashboard/Subjects`}
                    className="cardInfo"
                    onClick={() => {
                      Cookies?.set("currentSubjectType", "cores", {
                        expires: 1, // 1 day
                        secure: false, // Set to true in production if using HTTPS
                        sameSite: "Strict",
                      });
                      // localStorage.setItem("currentSubjectType", "cores");
                    }}
                  >
                    <div title="Core Subjects" className="cardInfoIcons">
                      <AutoStories
                        style={{
                          fontSize: "1.5em",
                          marginRight: 4,
                        }}
                      />
                      <h4 style={{ fontSize: ".9em", fontWeight: 400 }}>C/S</h4>
                    </div>
                    <Box className="cardTotal">
                      {coreSubjects?.length > 0 ? coreSubjects?.length : 0}
                    </Box>
                  </HashLink>
                  <HashLink
                    to={`/sensec/users/${authUser?.uniqueId}/lecturer/Dashboard/Subjects`}
                    className="pending"
                    onClick={() => {
                      Cookies?.set("currentSubjectType", "electives", {
                        expires: 1, // 1 day
                        secure: false, // Set to true in production if using HTTPS
                        sameSite: "Strict",
                      });
                      // localStorage.setItem("currentSubjectType", "electives");
                    }}
                  >
                    <h4>Elective Subject(s)</h4>
                    <Box className="cardPending">
                      {electiveSubjects?.length > 0
                        ? electiveSubjects?.length
                        : 0}
                    </Box>
                  </HashLink>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Box className="card" sx={{ backgroundColor: "#7a0080" }}>
                  <h3>Weekly Attendance</h3>
                  <HashLink
                    to={`/sensec/users/${authUser?.uniqueId}/admin/User_Types/Students/Enrolled`}
                    className="cardInfo"
                  >
                    <div className="cardInfoIcons" title="All Presents Data">
                      <ListAltOutlined
                        style={{
                          fontSize: "1.5em",
                          marginRight: 4,
                        }}
                      />
                      <h4 style={{ fontSize: ".9em", fontWeight: 400 }}>P/D</h4>
                    </div>
                    <Box className="cardTotal">
                      {totalPresent} /{" "}
                      {presentPercentage ? presentPercentage : 0}%
                    </Box>
                  </HashLink>
                  <HashLink
                    to={`/sensec/users/${authUser?.uniqueId}/admin/User_Types/Students/Pending_Students`}
                    className="pending"
                  >
                    <h4>All Absents Data</h4>
                    <Box className="cardPending">
                      {totalAbsent} / {absentPercentage ? absentPercentage : 0}%
                    </Box>
                  </HashLink>
                </Box>
              </Grid>
              {/* <Grid item xs={12} sm={6} md={4} lg={4}>
                <Box className="card" sx={{ backgroundColor: "#7a0080" }}>
                  <h3>Total NT-Staffs</h3>
                  <HashLink
                    to={`/sensec/users/${authUser?.uniqueId}/admin/User-Types/NT-Staffs/employees/All`}
                    className="cardInfo"
                  >
                    <Box className="cardInfoIcons">
                      <Diversity3
                        style={{
                          fontSize: "2rem",
                        }}
                        titleAccess="All Employed NT Staffs"
                      />
                    </Box>
                    <Box className="cardTotal">12</Box>
                  </HashLink>
                  <HashLink
                    to={`/sensec/users/${authUser?.uniqueId}/admin/User-Types/NT-Staffs/employees/Pending_NT-Staffs`}
                    className="pending"
                  >
                    <h4>Pending Staff(s)</h4>
                    <Box className="cardPending">22</Box>
                  </HashLink>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Box className="card" sx={{ backgroundColor: "#005780" }}>
                  <HashLink
                    to={`/sensec/users/${authUser?.uniqueId}/admin/Dashboard/Blogs`}
                  >
                    <Box className="titleFlex">
                      <h3>Blogs</h3>
                    </Box>
                    <Box className="cardInfo">
                      <Box className="cardInfoIcons">
                        <RssFeed
                          style={{
                            fontSize: "2rem",
                          }}
                        />
                      </Box>
                      <Box className="cardTotal">{30}</Box>
                    </Box>
                    <Box className="pending">
                      <h4>Old Blogs</h4>
                      <Box className="cardPending">/ 2023</Box>
                    </Box>
                  </HashLink>
                </Box>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
      </Box>
      <SmallFooter />
    </>
    // <div id="teacherOverviewWrap">
    //   <h1 className="currentPageTitle">
    //     {lecturerCurrentAction} / <span>{lecturerCurrentLink}</span>
    //   </h1>
    //   <div className="content">
    //     <div className="dashBoardContent">
    //       {/* <HashLink to={"/sensec/teacher/Users/Admins"} className="teachers">
    //         <h3>Total Admins</h3>
    //         <div className="teachersInfo">
    //           <div className="teachersInfoIcons">
    //             <SupervisedUserCircleIcon
    //               style={{
    //                 fontSize: "2rem",
    //               }}
    //               titleAccess="All Employed Teachers"
    //             />
    //           </div>
    //           <div className="totalTeachers">{allAdmins.length}</div>
    //         </div>
    //         <div className="pending">
    //           <h4>Pending Admin(s)</h4>
    //           <div className="pendingTeachers">2</div>
    //         </div>
    //       </HashLink> */}
    //       <HashLink to={"/sensec/teacher/Users/Lecturers"} className="teachers">
    //         <h3>Total Lecturers</h3>
    //         <div className="teachersInfo">
    //           <div className="teachersInfoIcons">
    //             <SupervisedUserCircleIcon
    //               style={{
    //                 fontSize: "2rem",
    //               }}
    //               titleAccess="All Employed Teachers"
    //             />
    //           </div>
    //           <div className="totalTeachers">{allTeachers.length}</div>
    //         </div>
    //         <div className="pending">
    //           <h4>Pending Lecturer(s)</h4>
    //           <div className="pendingTeachers">2</div>
    //         </div>
    //       </HashLink>
    //       <HashLink to={"/sensec/teacher/Students/"} className="teachers">
    //         <h3>Total Students</h3>
    //         <HashLink
    //           to={`/sensec/admin/Users/Students`}
    //           className="teachersInfo"
    //         >
    //           <div className="teachersInfoIcons">
    //             <SchoolOutlinedIcon
    //               style={{
    //                 fontSize: "2rem",
    //               }}
    //               titleAccess="All Enrolled Students"
    //             />
    //           </div>
    //           <div className="totalTeachers">{currentStudents?.length}</div>
    //         </HashLink>
    //         <HashLink
    //           to={`/sensec/admin/Users/Students/${authUser.uniqueId}/all_pending_students`}
    //           className="pending"
    //         >
    //           <h4>Pending Student(s)</h4>
    //           <div className="pendingTeachers">
    //             {allPendingStudents?.length}
    //           </div>
    //         </HashLink>
    //       </HashLink>
    //       <HashLink
    //         to={"/sensec/teacher/Users/Staff_Members"}
    //         className="teachers"
    //       >
    //         <h3>Total Staffs</h3>
    //         <div className="teachersInfo">
    //           <div className="teachersInfoIcons">
    //             <MoneyOutlinedIcon
    //               style={{
    //                 fontSize: "2rem",
    //               }}
    //               titleAccess="All Employed NT Staffs"
    //             />
    //           </div>
    //           <div className="totalTeachers">{allStaffs?.length}</div>
    //         </div>
    //         <div className="pending">
    //           <h4>Pending Staff(s)</h4>
    //           <div className="pendingTeachers">7</div>
    //         </div>
    //       </HashLink>
    //       <HashLink to={"/sensec/teacher/Users/Blogs"} className="teachers">
    //         <div className="titleFlex">
    //           <h3>Blogs</h3>
    //           <p>Year 2023</p>
    //         </div>
    //         <div className="teachersInfo">
    //           <div className="teachersInfoIcons">
    //             <RssFeedIcon
    //               style={{
    //                 fontSize: "2rem",
    //               }}
    //             />
    //           </div>
    //           <div className="totalTeachers">{allPosts.length}</div>
    //         </div>
    //         <div className="pending">
    //           <h4>Old Blogs</h4>
    //           <div className="pendingTeachers">/ 2023</div>
    //         </div>
    //       </HashLink>
    //     </div>
    //   </div>
    // </div>
  );
}
