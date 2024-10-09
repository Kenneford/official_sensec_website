import { ContainerBox, CustomTextField } from "../../../muiStyling/muiStyling";
import "./studentPlacementVerification.scss";
import { useNavigate } from "react-router-dom";
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
  Typography,
} from "@mui/material";
import { useState } from "react";

export function StudentPlacementVerification() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    yearGraduated: "",
    jhsIndexNo: "",
    age: "",
    gender: "",
    course: "",
    otherCourse: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission logic here (e.g., send to API, validation, etc.)
    console.log(formData);
    navigate("/sensec/students/enrollment/online");
  };

  return (
    <ContainerBox component="div" id="placementVerificationWrap">
      <h1>Student Placement Verification</h1>
      <Box
        component="div"
        id="placementFormWrap"
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 5,
          p: 3,
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Box
          component="form"
          validate
          autoComplete="off"
          onSubmit={handleSubmit}
          style={{
            // backgroundColor: "red",
            padding: ".5rem ",
          }}
        >
          <Typography
            variant="h6"
            component={"h3"}
            mb={3}
            color="#696969"
            fontSize={"1em"}
            lineHeight={"1.2em"}
            letterSpacing={"1px"}
            textAlign={"center"}
          >
            Kindly verify your placement to begin your enrollment.
          </Typography>
          <Grid container spacing={3}>
            {/* Student Name */}
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData?.firstName}
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
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="Surname"
                name="lastName"
                value={formData?.lastName}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="Year Graduated [ JHS ]"
                name="yearGraduated"
                value={formData?.yearGraduated}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label="JHS Index No."
                name="jhsIndexNo"
                value={formData?.jhsIndexNo}
                onChange={handleChange}
                required
                // error={!formData?.jhsIndexNo}
                // helperText="Incorrect entry."
                // id="filled-error"
              />
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
                  fontSize: "1em",
                }}
              >
                Verify Placement
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Button
        variant="contained"
        size="sm"
        sx={{ bgcolor: "green" }}
        onClick={() => navigate("/sensec/students/enrollment/online")}
      >
        Enroll
      </Button> */}
    </ContainerBox>
  );
}
