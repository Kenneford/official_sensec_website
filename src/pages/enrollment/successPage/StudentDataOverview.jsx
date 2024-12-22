import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  Button,
  Box,
  Drawer,
  useMediaQuery,
  Collapse,
  useTheme,
  Grid,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { FetchAllStudents } from "../../../data/students/FetchAllStudents";
import { FetchCurrentAcademicTerms } from "../../../data/term.year/FetchAcademicTerms";
import { FetchCurrentAcademicYear } from "../../../data/term.year/FetchAcademicYears";
import { HashLink } from "react-router-hash-link";
import { ContainerBox } from "../../../muiStyling/muiStyling";
import { dateFormatter } from "../../../dateFormatter/DateFormatter";
import EnrollmentSuccessSidebar from "./sidebar/EnrollmentSuccessSidebar";
import SmallFooter from "../../../components/footer/SmallFooter";

export function StudentDataOverview() {
  const { studentId, adminCurrentAction, current_link } = useParams();
  const navigate = useNavigate();
  const allStudents = FetchAllStudents();
  const enrolledStudent = allStudents?.find(
    (std) => std?.uniqueId === studentId
  );

  const links = [
    {
      name: "Overview",
      ulr: `/sensec/students/enrollment/online/${enrolledStudent?.uniqueId}/success/Overview#enrollmentOverview`,
    },
    {
      name: "View Profile",
      ulr: `/sensec/students/enrollment/online/${enrolledStudent?.uniqueId}/success/View_Profile#enrollmentProfile`,
    },
    {
      name: "Update",
      ulr: `/sensec/students/enrollment/online/${enrolledStudent?.uniqueId}/success/Update#enrollmentDataUpdate`,
    },
  ];
  const [hovered, setHovered] = useState(false);
  const drawerWidthCollapsed = 160; // Collapsed width
  const drawerWidthExpanded = 300; // Expanded width
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("1024")); // 'md' is typically 900px
  const currentTerm = FetchCurrentAcademicTerms();
  const currentAcademicYear = FetchCurrentAcademicYear();

  const [data, setData] = useState([
    { field: "Name", value: "John Doe", editable: true },
    { field: "Email", value: "johndoe@example.com", editable: true },
    { field: "Phone", value: "123-456-7890", editable: true },
    { field: "Address", value: "123 Main St", editable: false },
  ]);

  const handleChange = (index, newValue) => {
    const updatedData = [...data];
    updatedData[index].value = newValue;
    setData(updatedData);
  };

  const handleSubmit = () => {
    console.log("Form Data:", data);
  };
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ];

  return (
    <>
      <Box display={"flex"}>
        <EnrollmentSuccessSidebar
          currentTerm={currentTerm}
          currentAcademicYear={currentAcademicYear}
          enrolledStudent={enrolledStudent}
          current_link={current_link}
        />
        <Box
          className="rightWrap"
          width={!isMobile ? "calc(100% - 160px)" : "100%"}
          ml={!isMobile ? "160px" : 0}
          flexShrink={!adminCurrentAction ? 1 : 0}
          id="enrollmentProfile"
        >
          {/* Current dashboard title */}
          <Box
            component={"div"}
            id="adminDashboardHeaderWrap"
            sx={{
              position: "sticky",
              top: 0,
              backgroundColor: "#fff",
              padding: 0,
              zIndex: 6,
              mb: "4rem",
            }}
            minHeight={"4rem"}
          >
            <h1 className="dashAction">
              Enrollment / <span>Profile</span>
            </h1>
          </Box>
          <ContainerBox
            sx={{
              width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
              margin: "auto",
            }}
          >
            <Grid container spacing={5}>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    width: "100%",
                    overflowX: "auto",
                    mb: 6,
                    fontSize: "calc(0.7rem + 1vmin)",
                  }}
                >
                  <TableContainer className="tableContainer">
                    <Box>
                      <h3>Personal Details</h3>
                      <Table>
                        <TableBody className="tableBody">
                          {/* Row 1 */}
                          <TableRow>
                            <TableCell className="headerCell">ID</TableCell>
                            <TableCell className="bodyCell">
                              {enrolledStudent?.uniqueId}
                            </TableCell>
                          </TableRow>
                          {/* Row 2 */}
                          <TableRow>
                            <TableCell className="headerCell">
                              Full Name
                            </TableCell>
                            <TableCell className="bodyCell">
                              {enrolledStudent?.personalInfo?.fullName}
                            </TableCell>
                          </TableRow>
                          {/* Row 3 */}
                          <TableRow>
                            <TableCell className="headerCell">
                              Date of Birth
                            </TableCell>
                            <TableCell className="bodyCell">
                              {enrolledStudent?.personalInfo?.dateOfBirth
                                ? dateFormatter.format(
                                    new Date(
                                      enrolledStudent?.personalInfo?.dateOfBirth
                                    )
                                  )
                                : "---"}
                            </TableCell>
                          </TableRow>
                          {/* Row 4 */}
                          <TableRow>
                            <TableCell className="headerCell">
                              Place of Birth
                            </TableCell>
                            <TableCell className="bodyCell">
                              {enrolledStudent?.personalInfo?.placeOfBirth}
                            </TableCell>
                          </TableRow>
                          {/* Row 5 */}
                          <TableRow>
                            <TableCell className="headerCell">Gender</TableCell>
                            <TableCell className="bodyCell">
                              {enrolledStudent?.personalInfo?.gender}
                            </TableCell>
                          </TableRow>
                          {/* Row 6 */}
                          <TableRow>
                            <TableCell className="headerCell">
                              Nationality
                            </TableCell>
                            <TableCell className="bodyCell">
                              {enrolledStudent?.personalInfo?.nationality}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Box>
                  </TableContainer>
                </Paper>
                <Paper
                  sx={{
                    width: "100%",
                    overflowX: "auto",
                    mb: 6,
                    fontSize: "calc(0.7rem + 1vmin)",
                  }}
                >
                  <TableContainer className="tableContainer">
                    <Box>
                      <h3>School Data</h3>
                      <Table>
                        <TableBody className="tableBody">
                          <TableRow>
                            <TableCell className="headerCell">
                              JHS Attended
                            </TableCell>
                            <TableCell className="bodyCell">
                              {enrolledStudent?.studentSchoolData?.jhsAttended}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="headerCell">
                              JHS Index-No.
                            </TableCell>
                            <TableCell className="bodyCell">
                              {enrolledStudent?.studentSchoolData?.jhsIndexNo}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="headerCell">
                              Student ID
                            </TableCell>
                            <TableCell className="bodyCell">
                              {enrolledStudent?.uniqueId}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="headerCell">
                              Class Level
                            </TableCell>
                            <TableCell className="bodyCell">
                              {
                                enrolledStudent?.studentSchoolData
                                  ?.currentClassLevel?.name
                              }
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="headerCell">
                              Program
                            </TableCell>
                            <TableCell className="bodyCell">
                              {
                                enrolledStudent?.studentSchoolData?.program
                                  ?.name
                              }
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="headerCell">Batch</TableCell>
                            <TableCell className="bodyCell">
                              {
                                enrolledStudent?.studentSchoolData?.batch
                                  ?.yearRange
                              }
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="headerCell">Class</TableCell>
                            <TableCell className="bodyCell">
                              {enrolledStudent?.studentSchoolData
                                ?.currentClassLevelSection
                                ? enrolledStudent?.studentSchoolData
                                    ?.currentClassLevelSection?.label
                                : "---"}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Box>
                  </TableContainer>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    width: "100%",
                    overflowX: "auto",
                    mb: 6,
                    fontSize: "calc(0.7rem + 1vmin)",
                  }}
                >
                  <TableContainer className="tableContainer">
                    <Box>
                      <h3>Status</h3>
                      <Table>
                        <TableBody className="tableBody">
                          <TableRow>
                            <TableCell className="headerCell">
                              Residential Status
                            </TableCell>
                            <TableCell className="bodyCell">
                              {enrolledStudent?.status.residentialStatus}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="headerCell">Height</TableCell>
                            <TableCell className="bodyCell">
                              {enrolledStudent?.status.height}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="headerCell">Weight</TableCell>
                            <TableCell className="bodyCell">
                              {enrolledStudent?.status.weight}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="headerCell">
                              Complexion
                            </TableCell>
                            <TableCell className="bodyCell">
                              {enrolledStudent?.status.complexion}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="headerCell">
                              Mother Tongue
                            </TableCell>
                            <TableCell className="bodyCell">
                              {enrolledStudent?.status.motherTongue}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="headerCell">
                              Other Tongue
                            </TableCell>
                            <TableCell className="bodyCell">
                              {enrolledStudent?.status.otherTongue}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Box>
                  </TableContainer>
                </Paper>
                <Paper
                  sx={{
                    width: "100%",
                    overflowX: "auto",
                    mb: 6,
                    fontSize: "calc(0.7rem + 1vmin)",
                  }}
                >
                  <TableContainer className="tableContainer">
                    <Box>
                      <h3>Location Address/Contacts</h3>
                      <Table>
                        <TableBody className="tableBody">
                          <TableRow>
                            <TableCell className="headerCell">
                              Home Town
                            </TableCell>
                            <TableCell className="bodyCell">
                              {enrolledStudent?.contactAddress.homeTown}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="headerCell">Region</TableCell>
                            <TableCell className="bodyCell">
                              {enrolledStudent?.contactAddress.region}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="headerCell">
                              District
                            </TableCell>
                            <TableCell className="bodyCell">
                              {enrolledStudent?.contactAddress.district}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="headerCell">
                              Current City
                            </TableCell>
                            <TableCell className="bodyCell">
                              {enrolledStudent?.contactAddress.currentCity}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="headerCell">
                              House Address
                            </TableCell>
                            <TableCell className="bodyCell">
                              {
                                enrolledStudent?.contactAddress
                                  ?.residentialAddress
                              }
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="headerCell">
                              GPS Address
                            </TableCell>
                            <TableCell className="bodyCell">
                              {enrolledStudent?.contactAddress.gpsAddress}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="headerCell">Email</TableCell>
                            <TableCell className="bodyCell">
                              {enrolledStudent?.contactAddress.email}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="headerCell">
                              Mobile Phone
                            </TableCell>
                            <TableCell className="bodyCell">
                              {enrolledStudent?.contactAddress.mobile}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Box>
                  </TableContainer>
                </Paper>
              </Grid>
            </Grid>
          </ContainerBox>
        </Box>
      </Box>
      <SmallFooter />
    </>
  );
}
