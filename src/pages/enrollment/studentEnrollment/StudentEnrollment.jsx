import React, { useState } from "react";
import "./studentEnrollment.scss";
import { ContainerBox, CustomTextField } from "../../../muiStyling/muiStyling";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Box,
  Avatar,
  InputAdornment,
  Typography,
} from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";

export function StudentEnrollment() {
  const indexNumber = localStorage.getItem("indexNumber");
  // New Student state
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    otherName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    nationality: "",
    gender: "",
    profilePicture: "",
    // School Data
    jhsAttended: "",
    completedJhs: "",
    jhsIndexNumber: indexNumber,
    program: "",
    programName: "",
    nameOfDivisionProgram: "",
    divisionProgramId: "",
    optionalElectiveSubject: "",
    optionalElectiveSubjectName: "",
    currentClassLevel: "",
    currentClassLevelName: "",
    currentAcademicYear: "",
    currentAcademicYearName: "",
    batch: "",
    batchName: "",
    house: "",
    // Status
    height: "",
    weight: "",
    complexion: "",
    motherTongue: "",
    otherTongue: "",
    residentialStatus: "",
    // Contact Address
    homeTown: "",
    district: "",
    region: "",
    currentCity: "",
    residentialAddress: "",
    gpsAddress: "",
    mobile: "",
    email: "",
  });
  console.log(newStudent);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewStudent({
      ...newStudent,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission logic here (e.g., send to API, validation, etc.)
    console.log(newStudent);
  };
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <ContainerBox
      component="div"
      id="studentEnrollmentWrap"
      sx={{
        width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
        margin: "auto",
        paddingTop: "2rem",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <h1>Student Online Enrollment</h1>
      <Box
        component="div"
        id="enrollmentFormWrap"
        sx={{
          maxWidth: 1000,
          mx: "auto",
          mt: 5,
          p: 3,
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {/* <Typography
          variant="h6"
          component={"p"}
          fontWeight={300}
          mb={3}
          color="#cccc"
          fontSize={"1em"}
          lineHeight={"1.2em"}
          letterSpacing={"1px"}
          // textAlign={"center"}
          bgcolor={"#292929"}
          borderRadius={".4rem"}
          padding={"1rem"}
        >
          To enroll into Senya Senior High School, you will be redirected to few
          other pages. Please, kindly go through all the processes and also make
          sure to fill all required fields in order to ensure a successful
          enrollment.
        </Typography> */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            padding: ".5rem 0",
          }}
        >
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            sx={{
              width: "7rem",
              height: "7rem",
              "&:hover": { cursor: "pointer" },
            }}
          />
          {/* <Avatar {...stringAvatar("Kent Dodds")} /> */}
          <Grid container spacing={3}>
            {/* Student First Name */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                fullWidth
                label="First Name"
                name="firstName"
                value={newStudent?.firstName}
                onChange={handleChange}
                required
                className="textField"
                sx={{
                  "&:hover": {
                    borderColor: "none",
                  },
                }}
              />
            </Grid>
            {/* Student Surname */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                fullWidth
                label="Surname"
                name="lastName"
                value={newStudent?.lastName}
                onChange={handleChange}
                required
              />
            </Grid>
            {/* Student Other Name */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                fullWidth
                label="Other Name"
                name="otherName"
                value={newStudent?.otherName}
                onChange={handleChange}
              />
            </Grid>
            {/* Place Of Birth */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                fullWidth
                label="Place Of Birth"
                name="placeOfBirth"
                value={newStudent?.placeOfBirth}
                onChange={handleChange}
                required
              />
            </Grid>
            {/* Date Of Birth */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                fullWidth
                // label="DD/MM/YYYY"
                name="dateOfBirth"
                type="date"
                value={newStudent?.dateOfBirth}
                onChange={handleChange}
                required
                // helperText="Your Date Of Birth."
                // slotProps={{
                //   input: {
                //     endAdornment: (
                //       <InputAdornment position="end">
                //         <CalendarMonth
                //           sx={{
                //             "&:hover": { cursor: "pointer" },
                //           }}
                //         />
                //       </InputAdornment>
                //     ),
                //   },
                // }}
              />
            </Grid>
            {/* Nationality */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                fullWidth
                label="Nationality"
                name="nationality"
                value={newStudent?.nationality}
                onChange={handleChange}
                required
              />
            </Grid>
            {/* Gender Selection */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                select
                fullWidth
                label="Gender"
                name="gender"
                value={newStudent?.gender}
                onChange={handleChange}
                required
              >
                <MenuItem value="science">Male</MenuItem>
                <MenuItem value="commerce">Female</MenuItem>
              </CustomTextField>
            </Grid>
            {/* Mother Tongue */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                select
                fullWidth
                label="Mother Tongue"
                name="motherTongue"
                value={newStudent?.motherTongue}
                onChange={handleChange}
                required
              >
                <MenuItem value="science">Twi</MenuItem>
                <MenuItem value="commerce">Fante</MenuItem>
                <MenuItem value="arts">Ga</MenuItem>
                <MenuItem value="arts">Hausa</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </CustomTextField>
            </Grid>
            {/* Other Tongue */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                select
                fullWidth
                label="Other Tongue"
                name="otherTongue"
                value={newStudent?.otherTongue}
                onChange={handleChange}
              >
                <MenuItem value="science">English</MenuItem>
                <MenuItem value="commerce">Spanish</MenuItem>
                <MenuItem value="arts">Deutsch</MenuItem>
                <MenuItem value="arts">Italian</MenuItem>
                <MenuItem value="arts">Arabic</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </CustomTextField>
            </Grid>
            {/* Complexion */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                select
                fullWidth
                label="Complexion"
                name="complexion"
                value={newStudent?.complexion}
                onChange={handleChange}
                required
              >
                <MenuItem value="Very Fair">Very Fair</MenuItem>
                <MenuItem value="Fair">Fair</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Olive">Olive</MenuItem>
                <MenuItem value="Brown">Brown</MenuItem>
                <MenuItem value="Black">Black</MenuItem>
              </CustomTextField>
            </Grid>
            {/* Height */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                fullWidth
                label="Height"
                name="height"
                value={newStudent?.height}
                onChange={handleChange}
                // required
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">ft</InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            {/* Weight */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                fullWidth
                label="Weight"
                name="weight"
                value={newStudent?.weight}
                onChange={handleChange}
                // required
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">kg</InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            {/* Region */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                fullWidth
                select
                label="Region"
                name="region"
                value={newStudent?.region}
                onChange={handleChange}
                required
              >
                <MenuItem value="Greater Accra">Greater Accra</MenuItem>
                <MenuItem value="Ashanti">Ashanti</MenuItem>
                <MenuItem value="Volta">Volta</MenuItem>
                <MenuItem value="Central">Central</MenuItem>
                <MenuItem value="Eastern">Eastern</MenuItem>
                <MenuItem value="Western">Western</MenuItem>
                <MenuItem value="Oti">Oti</MenuItem>
                <MenuItem value="Bono">Bono</MenuItem>
                <MenuItem value="Bono East">Bono East</MenuItem>
                <MenuItem value="Ahafo">Ahafo</MenuItem>
                <MenuItem value="Brong Ahafo">Brong Ahafo</MenuItem>
                <MenuItem value="Northern">Northern</MenuItem>
                <MenuItem value="Western North">Western North</MenuItem>
                <MenuItem value="Upper West">Upper West</MenuItem>
                <MenuItem value="Upper East">Upper East</MenuItem>
                <MenuItem value="North East">North East</MenuItem>
              </CustomTextField>
            </Grid>
            {/* HomeTown */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                fullWidth
                label="HomeTown"
                name="homeTown"
                value={newStudent?.homeTown}
                onChange={handleChange}
                required
              />
            </Grid>
            {/* Current City */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                fullWidth
                label="Current City"
                name="currentCity"
                value={newStudent?.currentCity}
                onChange={handleChange}
                required
              />
            </Grid>
            {/* GPS Address */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                fullWidth
                label="GPS Address"
                name="gpsAddress"
                value={newStudent?.gpsAddress}
                onChange={handleChange}
                // required
              />
            </Grid>
            {/* Email */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                fullWidth
                label="Email"
                name="email"
                value={newStudent?.email}
                onChange={handleChange}
                // required
              />
            </Grid>
            {/* Mobile */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                fullWidth
                label="Mobile"
                name="mobile"
                value={newStudent?.mobile}
                onChange={handleChange}
                required
              />
            </Grid>
            {/* JHS Attended */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                fullWidth
                label="JHS Attended"
                name="jhsAttended"
                value={newStudent?.jhsAttended}
                onChange={handleChange}
                required
              />
            </Grid>
            {/* JHS Graduated Year */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                fullWidth
                label="Year Graduated [ JHS ]"
                name="yearGraduated"
                value={newStudent?.yearGraduated}
                onChange={handleChange}
                required
              />
            </Grid>
            {/* JHS Index No. */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                fullWidth
                label="JHS Index No."
                name="jhsIndexNo"
                value={newStudent?.jhsIndexNo}
                onChange={handleChange}
                required
                // error={!newStudent.jhsIndexNo}
                // helperText="Incorrect entry."
                // id="filled-error"
              />
            </Grid>
            {/* Programme Selection */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                select
                fullWidth
                label="Select Programme"
                name="program"
                value={newStudent?.program}
                onChange={handleChange}
                required
              >
                <MenuItem value="Agric Science">Agric Science</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="General Science">General Science</MenuItem>
                <MenuItem value="General Arts">General Arts</MenuItem>
                <MenuItem value="Visual Arts">Visual Arts</MenuItem>
                <MenuItem value="Home Economics">Home Economics</MenuItem>
              </CustomTextField>
            </Grid>
            {/* Division Program (conditional) */}
            {newStudent && newStudent?.program === "General Arts" && (
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomTextField
                  select
                  fullWidth
                  label="Division Program"
                  name="nameOfDivisionProgram"
                  value={newStudent?.nameOfDivisionProgram}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="General Arts 1">General Arts 1</MenuItem>
                  <MenuItem value="General Arts 2">General Arts 2</MenuItem>
                  <MenuItem value="General Arts 3">General Arts 3</MenuItem>
                </CustomTextField>
              </Grid>
            )}
            {/* Optional Elective Subject (conditional) */}
            {newStudent &&
              newStudent?.nameOfDivisionProgram === "General Arts 3" && (
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <CustomTextField
                    select
                    fullWidth
                    label="Optional Elective Subject"
                    name="optionalElectiveSubject"
                    value={newStudent?.optionalElectiveSubject}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="History">History</MenuItem>
                    <MenuItem value="Elective Mathematics">
                      Elective Mathematics
                    </MenuItem>
                  </CustomTextField>
                </Grid>
              )}
            {/* Class Level Selection */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                select
                fullWidth
                label="Class Level"
                name="currentClassLevelName"
                value={newStudent?.currentClassLevelName}
                onChange={handleChange}
                required
              >
                <MenuItem value="Level 100">Level 100</MenuItem>
                <MenuItem value="Level 200">Level 200</MenuItem>
                <MenuItem value="Level 300">Level 300</MenuItem>
              </CustomTextField>
            </Grid>
            {/* Batch Selection */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                select
                fullWidth
                label="Batch"
                name="batchName"
                value={newStudent?.batchName}
                onChange={handleChange}
                required
              >
                <MenuItem value="2024-2027">2024-2027</MenuItem>
                <MenuItem value="2025-2028">2025-2028</MenuItem>
                <MenuItem value="2026-2029">2026-2029</MenuItem>
              </CustomTextField>
            </Grid>
            {/* Academic Year Selection */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                select
                fullWidth
                label="Academic Year"
                name="currentAcademicYearName"
                value={newStudent?.currentAcademicYearName}
                onChange={handleChange}
                required
              >
                <MenuItem value="2024-2025">2024-2025</MenuItem>
                <MenuItem value="2025-2026">2025-2026</MenuItem>
                <MenuItem value="2026-2027">2026-2027</MenuItem>
              </CustomTextField>
            </Grid>
            {/* Residential Status Selection */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                select
                fullWidth
                label="Residential Status"
                name="residentialStatus"
                value={newStudent?.residentialStatus}
                onChange={handleChange}
                required
              >
                <MenuItem value="Day">Day</MenuItem>
                <MenuItem value="Boarding">Boarding</MenuItem>
                <MenuItem value="Hostel">Hostel</MenuItem>
                <MenuItem value="Private">Private</MenuItem>
                <MenuItem value="Lecturers Bangalow">
                  Lecturers Bangalow
                </MenuItem>
              </CustomTextField>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="success"
                type="submit"
                fullWidth
                sx={{
                  height: "3.5rem",
                  letterSpacing: "1px",
                  textTransform: "capitalize",
                  fontSize: "1.2rem",
                }}
              >
                Submit Enrollment
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </ContainerBox>
  );
}
