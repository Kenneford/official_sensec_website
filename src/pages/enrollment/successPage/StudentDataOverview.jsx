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
} from "@mui/material";
import { useParams } from "react-router-dom";
import { FetchAllStudents } from "../../../data/students/FetchAllStudents";
import { FetchCurrentAcademicTerms } from "../../../data/term.year/FetchAcademicTerms";
import { FetchCurrentAcademicYear } from "../../../data/term.year/FetchAcademicYears";
import { HashLink } from "react-router-hash-link";
import { ContainerBox } from "../../../muiStyling/muiStyling";
import { dateFormatter } from "../../../dateFormatter/DateFormatter";

export function StudentDataOverview() {
  const { studentId, adminCurrentAction, current_link } = useParams();
  const allStudents = FetchAllStudents();
  const enrolledStudent = allStudents?.find(
    (std) => std?.uniqueId === studentId
  );

  const links = [
    {
      name: "Overview",
      ulr: `/sensec/students/enrollment/online/${enrolledStudent?.uniqueId}/success/Overview`,
    },
    {
      name: "View Profile",
      ulr: `/sensec/students/enrollment/online/${enrolledStudent?.uniqueId}/success/View_Profile`,
    },
    {
      name: "Update",
      ulr: `/sensec/students/enrollment/online/${enrolledStudent?.uniqueId}/success/Update`,
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
    <Box display={"flex"}>
      <Box>
        {!isMobile && (
          <Drawer
            variant="permanent"
            anchor="left"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="sidebar"
            sx={{
              "& .MuiDrawer-paper": {
                position: "fixed", // Fix the drawer to the viewport
                top: 0,
                left: 0,
                height: "100vh",
                width: hovered ? drawerWidthExpanded : drawerWidthCollapsed, // Expand on hover
                transition: "width 0.3s", // Smooth width transition
                overflowX: "hidden", // Prevent content from spilling
                backgroundColor: "#292929", // Optional background color
              },
            }}
          >
            {/* Button to toggle sidebar */}
            <Box
              sx={{
                backgroundColor: "#292929",
                padding: ".5rem",
                borderBottom: "2px solid #fff",
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
              {/* User Info */}
              <Box className="userInfo">
                <img
                  src={enrolledStudent?.personalInfo?.profilePicture?.url}
                  alt=""
                />
                {hovered && (
                  <Collapse
                    in={hovered}
                    className="infoText"
                    //   sx={{
                    //     transition: "0.5s ease", // Smooth transition when toggling
                    //   }}
                  >
                    <span>{enrolledStudent?.personalInfo?.fullName}</span>
                  </Collapse>
                )}
              </Box>
            </Box>
            <Box className="links">
              {links?.map((link) => (
                <HashLink
                  to={link?.ulr}
                  key={link?.name}
                  className={
                    current_link &&
                    current_link?.replace(/_/g, " ") !== link?.name
                      ? "link"
                      : "link active"
                  }
                >
                  {link?.name}
                </HashLink>
              ))}
            </Box>
          </Drawer>
        )}
      </Box>
      <Box
        className="rightWrap"
        width={!isMobile ? "calc(100% - 160px)" : "100%"}
        ml={!isMobile ? "160px" : 0}
        flexShrink={!adminCurrentAction ? 1 : 0}
      >
        <ContainerBox
          sx={{
            width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
            margin: "auto",
          }}
        >
          <Paper
            sx={{
              width: "100%",
              overflowX: "auto",
              mb: 2,
              fontSize: "calc(0.7rem + 1vmin)",
            }}
          >
            <TableContainer className="tableContainer">
              <Box>
                <h3>Personal Details</h3>
                <Table>
                  <TableHead className="tableHeader">
                    <TableRow>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        ID
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        Full Name
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        Date of Birth
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        Place of Birth
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        Gender
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        Nationality
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="tableBody">
                    {/* {users.map((user) => ( */}
                    <TableRow key={enrolledStudent?.uniqueId}>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.uniqueId}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.personalInfo?.fullName}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.personalInfo?.dateOfBirth
                          ? dateFormatter.format(
                              new Date(
                                enrolledStudent?.personalInfo?.dateOfBirth
                              )
                            )
                          : "---"}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.personalInfo?.placeOfBirth}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.personalInfo?.gender}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.personalInfo?.nationality}
                      </TableCell>
                    </TableRow>
                    {/* ))} */}
                  </TableBody>
                </Table>
              </Box>
            </TableContainer>
          </Paper>
          <Paper sx={{ width: "100%", overflowX: "auto", mb: 2 }}>
            <TableContainer className="tableContainer">
              <Box>
                <h3>School Data</h3>
                <Table>
                  <TableHead className="tableHeader">
                    <TableRow>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        JHS Attended
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        JHS Index-No.
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        Student ID
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        Class Level
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        Program
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        Batch
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        Class
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="tableBody">
                    {/* {users.map((user) => ( */}
                    <TableRow key={enrolledStudent?.uniqueId}>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.studentSchoolData?.jhsAttended}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.studentSchoolData?.jhsIndexNo}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.uniqueId}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {
                          enrolledStudent?.studentSchoolData?.currentClassLevel
                            ?.name
                        }
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.studentSchoolData?.program?.name}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.studentSchoolData?.batch?.yearRange}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.studentSchoolData
                          ?.currentClassLevelSection
                          ? enrolledStudent?.studentSchoolData
                              ?.currentClassLevelSection?.label
                          : "---"}
                      </TableCell>
                    </TableRow>
                    {/* ))} */}
                  </TableBody>
                </Table>
              </Box>
            </TableContainer>
          </Paper>
          <Paper sx={{ width: "100%", overflowX: "auto", mb: 2 }}>
            <TableContainer className="tableContainer">
              <Box>
                <h3>Status</h3>
                <Table>
                  <TableHead className="tableHeader">
                    <TableRow>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        Residential Status
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        Height
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        Weight
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        Complexion
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        Mother Tongue
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        Other Tongue
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="tableBody">
                    {/* {users.map((user) => ( */}
                    <TableRow key={enrolledStudent?.uniqueId}>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.status.residentialStatus}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.status.height}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.status.weight}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.status.complexion}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.status.motherTongue}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.status.otherTongue}
                      </TableCell>
                    </TableRow>
                    {/* ))} */}
                  </TableBody>
                </Table>
              </Box>
            </TableContainer>
          </Paper>
          <Paper sx={{ width: "100%", overflowX: "auto", mb: 2 }}>
            <TableContainer className="tableContainer">
              <Box>
                <h3>Location Address/Contacts</h3>
                <Table>
                  <TableHead className="tableHeader">
                    <TableRow>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        Home Town
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        Region
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        District
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        Current City
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        House Address
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        GPS Address
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        Email
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="headerCell"
                      >
                        Mobile Phone
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="tableBody">
                    {/* {users.map((user) => ( */}
                    <TableRow key={enrolledStudent?.uniqueId}>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.contactAddress.homeTown}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.contactAddress.region}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.contactAddress.district}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.contactAddress.currentCity}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.contactAddress.address}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.contactAddress.gpsAddress}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.contactAddress.email}
                      </TableCell>
                      <TableCell
                        sx={{ whiteSpace: "nowrap" }}
                        className="bodyCell"
                      >
                        {enrolledStudent?.contactAddress.mobile}
                      </TableCell>
                    </TableRow>
                    {/* ))} */}
                  </TableBody>
                </Table>
              </Box>
            </TableContainer>
          </Paper>
        </ContainerBox>

        {/* <div className="studentInfoContent">
          <table className="studentInfoTable">
            <h1>Your Records Details</h1>
            <table>
              <h3>Personal Details</h3>
              <tr>
                <th className="tableHearder">First Name</th>
                <th className="tableHearder">Last Name</th>
                <th className="tableHearder">Other Name</th>
                <th className="tableHearder">Date of Birth</th>
                <th className="tableHearder">Place of Birth</th>
                <th className="tableHearder">Gender</th>
                <th className="tableHearder">Nationality</th>
              </tr>
              <tr>
                <td className="alignTextLeft">
                  {enrolledStudent?.personalInfo?.firstName}
                </td>
                <td className="alignTextLeft">
                  {enrolledStudent?.personalInfo?.lastName}
                </td>
                <td className="alignTextLeft">
                  {enrolledStudent?.personalInfo?.otherName
                    ? enrolledStudent?.personalInfo?.otherName
                    : "-----"}
                </td>
                <td className="alignTextLeft">
                  {enrolledStudent?.personalInfo?.dateOfBirth}
                </td>
                <td className="alignTextLeft">
                  {enrolledStudent?.personalInfo?.placeOfBirth}
                </td>
                <td className="alignTextLeft">
                  {enrolledStudent?.personalInfo?.gender}
                </td>
                <td className="alignTextLeft">
                  {enrolledStudent?.personalInfo?.nationality}
                </td>
              </tr>
            </table>
            <table>
              <h3>School Data</h3>
              <tr>
                <th className="tableHearder">JHS Attended</th>
                <th className="tableHearder">JHS Index-No.</th>
                <th className="tableHearder">Student ID</th>
                <th className="tableHearder">Class Level</th>
                <th className="tableHearder">Program</th>
                <th className="tableHearder">Batch</th>
                <th className="tableHearder">Class</th>
              </tr>
              <tr>
                <td className="alignTextLeft">
                  {enrolledStudent?.schoolData?.jhsAttended}
                </td>
                <td className="alignTextLeft">
                  {enrolledStudent?.schoolData?.jhsIndexNumber}
                </td>
                <td className="alignTextLeft">{enrolledStudent?.uniqueId}</td>
                <td className="alignTextLeft">
                  {enrolledStudent?.schoolData?.currentClassLevel?.name}
                </td>
                <td className="alignTextLeft">
                  {enrolledStudent?.schoolData?.program?.name}
                </td>
                <td className="alignTextLeft">
                  {enrolledStudent?.schoolData?.batch?.yearRange}
                </td>
                <td className="alignTextLeft">
                  {enrolledStudent?.schoolData?.currentClassLevelSection?.label}
                </td>
              </tr>
            </table>
            <table>
              <h3>Status</h3>
              <tr>
                <th className="tableHearder">Residencial Status</th>
                <th className="tableHearder">Height</th>
                <th className="tableHearder">Weight</th>
                <th className="tableHearder">Complexion</th>
                <th className="tableHearder">Mother Tongue</th>
                <th className="tableHearder">Other Tongue</th>
              </tr>
              <tr>
                <td className="alignTextLeft">
                  {enrolledStudent?.status.residentialStatus}
                </td>
                <td className="alignTextLeft">
                  {enrolledStudent?.status.height}
                </td>
                <td className="alignTextLeft">
                  {enrolledStudent?.status.weight}
                </td>
                <td className="alignTextLeft">
                  {enrolledStudent?.status.complexion}
                </td>
                <td className="alignTextLeft">
                  {enrolledStudent?.status.motherTongue}
                </td>
                <td className="alignTextLeft">
                  {enrolledStudent?.status.otherTongue}
                </td>
              </tr>
            </table>
            <table>
              <h3>Location Address/Contacts</h3>
              <tr>
                <th className="tableHearder">Home Town</th>
                <th className="tableHearder">Region</th>
                <th className="tableHearder">District</th>
                <th className="tableHearder">Current City</th>
                <th className="tableHearder">House Address</th>
                <th className="tableHearder">GPS Address</th>
                <th className="tableHearder">Email</th>
                <th className="tableHearder">Mobile Phone</th>
              </tr>
              <tr>
                <td className="alignTextLeft">
                  {enrolledStudent?.contactAddress.homeTown}
                </td>
                <td className="alignTextLeft">
                  {enrolledStudent?.contactAddress.region}
                </td>
                <td className="alignTextLeft">
                  {enrolledStudent?.contactAddress.district}
                </td>
                <td className="alignTextLeft">
                  {enrolledStudent?.contactAddress.currentCity}
                </td>
                <td className="alignTextLeft">
                  {enrolledStudent?.contactAddress.address}
                </td>
                <td className="alignTextLeft">
                  {enrolledStudent?.contactAddress.gpsAddress}
                </td>
                <td className="alignTextLeft">
                  {enrolledStudent?.contactAddress.email}
                </td>
                <td className="alignTextLeft">
                  {enrolledStudent?.contactAddress.mobile}
                </td>
              </tr>
            </table>
            {enrolledStudent?.parents && (
              <>
                <h2>Parent Profile</h2>
                <table>
                  <h3>Parents Contact Details</h3>
                  <tr>
                    <th className="tableHearder">Father's Name</th>
                    <th className="tableHearder">Mother's Name</th>
                    <th className="tableHearder">Address</th>
                    <th className="tableHearder">Email</th>
                    <th className="tableHearder">Mobile Phone</th>
                  </tr>
                  <tr>
                    <td className="alignTextLeft">
                      {enrolledStudent?.parents.fatherName}
                    </td>
                    <td className="alignTextLeft">
                      {enrolledStudent?.parents.motherName}
                    </td>
                    <td className="alignTextLeft">
                      {enrolledStudent?.parents.address}
                    </td>
                    <td className="alignTextLeft">
                      {enrolledStudent?.parents.email}
                    </td>
                    <td className="alignTextLeft">
                      {enrolledStudent?.parents?.phoneNumber}
                    </td>
                  </tr>
                </table>
              </>
            )}
            {enrolledStudent?.guardian && (
              <>
                <h2>Guardian Profile</h2>
                <table>
                  <h3>Guardian Contact Details</h3>
                  <tr>
                    <th className="tableHearder">Guardian's Name</th>
                    <th className="tableHearder">Address</th>
                    <th className="tableHearder">Email</th>
                    <th className="tableHearder">Mobile Phone</th>
                  </tr>
                  <tr>
                    <td className="alignTextLeft">
                      {enrolledStudent?.guardian.guardianName}
                    </td>
                    <td className="alignTextLeft">
                      {enrolledStudent?.guardian.address}
                    </td>
                    <td className="alignTextLeft">
                      {enrolledStudent?.guardian.email}
                    </td>
                    <td className="alignTextLeft">
                      {enrolledStudent?.guardian?.phoneNumber}
                    </td>
                  </tr>
                </table>
              </>
            )}
          </table>
        </div> */}
        {/* <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Field</strong>
                </TableCell>
                <TableCell>
                  <strong>Value</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={row.field}>
                  <TableCell>{row.field}</TableCell>
                  <TableCell>
                    {row.editable ? (
                      <TextField
                        value={row.value}
                        onChange={(e) => handleChange(index, e.target.value)}
                        fullWidth
                      />
                    ) : (
                      row.value
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ margin: "16px" }}
          >
            Submit
          </Button>
        </TableContainer> */}
      </Box>
    </Box>
  );
  //   const [formData, setFormData] = useState([
  //     { id: 1, name: "", age: "", gender: "", active: false },
  //     { id: 2, name: "", age: "", gender: "", active: false },
  //   ]);

  //   const handleInputChange = (index, field, value) => {
  //     const updatedFormData = [...formData];
  //     updatedFormData[index][field] = value;
  //     setFormData(updatedFormData);
  //   };

  //   const handleSubmit = () => {
  //     console.log("Form Data:", formData);
  //     alert("Form Submitted");
  //   };

  //   return (
  //     <TableContainer>
  //       <Table>
  //         <TableHead>
  //           <TableRow>
  //             <TableCell>ID</TableCell>
  //             <TableCell>Name</TableCell>
  //             <TableCell>Age</TableCell>
  //             <TableCell>Gender</TableCell>
  //             <TableCell>Active</TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           {formData.map((row, index) => (
  //             <TableRow key={row.id}>
  //               <TableCell>{row.id}</TableCell>
  //               <TableCell>
  //                 <TextField
  //                   variant="outlined"
  //                   size="small"
  //                   value={row.name}
  //                   onChange={(e) =>
  //                     handleInputChange(index, "name", e.target.value)
  //                   }
  //                 />
  //               </TableCell>
  //               <TableCell>
  //                 <TextField
  //                   variant="outlined"
  //                   size="small"
  //                   type="number"
  //                   value={row.age}
  //                   onChange={(e) =>
  //                     handleInputChange(index, "age", e.target.value)
  //                   }
  //                 />
  //               </TableCell>
  //               <TableCell>
  //                 <Select
  //                   value={row.gender}
  //                   onChange={(e) =>
  //                     handleInputChange(index, "gender", e.target.value)
  //                   }
  //                   displayEmpty
  //                   size="small"
  //                 >
  //                   <MenuItem value="">Select</MenuItem>
  //                   <MenuItem value="Male">Male</MenuItem>
  //                   <MenuItem value="Female">Female</MenuItem>
  //                 </Select>
  //               </TableCell>
  //               <TableCell>
  //                 <Checkbox
  //                   checked={row.active}
  //                   onChange={(e) =>
  //                     handleInputChange(index, "active", e.target.checked)
  //                   }
  //                 />
  //               </TableCell>
  //             </TableRow>
  //           ))}
  //         </TableBody>
  //       </Table>
  //       <Button
  //         variant="contained"
  //         color="primary"
  //         onClick={handleSubmit}
  //         style={{ marginTop: "16px" }}
  //       >
  //         Submit
  //       </Button>
  //     </TableContainer>
  //   );
  //   return (
  //     <TableContainer component={Paper}>
  //       <Table>
  //         <TableHead>
  //           <TableRow>
  //             <TableCell>ID</TableCell>
  //             <TableCell>Name</TableCell>
  //             <TableCell>Email</TableCell>
  //             <TableCell>Role</TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           {users.map((user) => (
  //             <TableRow key={user.id}>
  //               <TableCell>{user.id}</TableCell>
  //               <TableCell>{user.name}</TableCell>
  //               <TableCell>{user.email}</TableCell>
  //               <TableCell>{user.role}</TableCell>
  //             </TableRow>
  //           ))}
  //         </TableBody>
  //       </Table>
  //     </TableContainer>
  //   );
}
