import React, { useState } from "react";
import "./enrollmentForm.scss";
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
} from "@mui/material";

export function EnrollmentForm() {
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

  return (
    <ContainerBox
      component="div"
      id="studentEnrollmentForm"
      sx={{
        width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
        margin: "auto",
        paddingTop: "2rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Student Online Enrollment</h1>
      <Box
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
        <form
          onSubmit={handleSubmit}
          style={{
            // backgroundColor: "red",
            padding: ".5rem 0",
          }}
        >
          <Grid container spacing={3}>
            {/* Student First Name */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CustomTextField
                fullWidth
                label="First Name"
                name="firstName"
                value={newStudent.name}
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
                value={newStudent.name}
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
                value={newStudent.otherName}
                onChange={handleChange}
                required
              />
            </Grid>
            {/* JHS Graduated Year */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="Year Graduated [ JHS ]"
                name="yearGraduated"
                value={newStudent.yearGraduated}
                onChange={handleChange}
                required
              />
            </Grid>
            {/* JHS Index No. */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="JHS Index No."
                name="jhsIndexNo"
                value={newStudent.jhsIndexNo}
                onChange={handleChange}
                required
                // error={!newStudent.jhsIndexNo}
                // helperText="Incorrect entry."
                // id="filled-error"
              />
            </Grid>
            {/* <Box bgcolor="primary.light">Box</Box> */}
            {/* Date Of Birth */}
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                // label="Date Of Birth"
                name="dateOfBirth"
                type="date"
                value={newStudent.age}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Gender Selection */}
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender"
                  value={newStudent.gender}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Course Selection */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel>Select Course</FormLabel>
                <Select
                  label="Course"
                  name="course"
                  value={newStudent.course}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="science">Science</MenuItem>
                  <MenuItem value="commerce">Commerce</MenuItem>
                  <MenuItem value="arts">Arts</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Other Course (conditional) */}
            {newStudent.course === "other" && (
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  label="Other Course"
                  name="otherCourse"
                  value={newStudent.otherCourse}
                  onChange={handleChange}
                  required
                />
              </Grid>
            )}

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
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
