import React, { useEffect, useState } from "react";
import "../create.scss";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { academicYearOptions } from "../../../options/options";
// import { getAdminInfo } from "../../../features/admin/adminsSlice";
// import { createAcademicYear } from "../../../features/academics/academicYear/academicYearSlice";
import { useNavigate } from "react-router-dom";
// import { createAcademicTerm } from "../../../features/academics/academicTerm/academicTermSlice";
// import { getUser } from "../../../features/allUsers/usersSlice";
// import LoadingProgress from "../../pageLoading/LoadingProgress";
import { toast } from "react-toastify";
import {
  CustomMobileDatePicker,
  // CustomMobileDatePicker,
  CustomTextField,
} from "../../../../../../muiStyling/muiStyling";
import { createAcademicTerm } from "../../../../../../features/academics/academicTermSlice";
import { getAuthUser } from "../../../../../../features/auth/authSlice";
import LoadingProgress from "../../../../../pageLoading/LoadingProgress";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { parseISO } from "date-fns";
import { TaskAlt } from "@mui/icons-material";

export function CreateAcademicTerm() {
  const authAdmin = useSelector(getAuthUser);
  const { createStatus, successMessage, error } = useSelector(
    (state) => state.academicTerm
  );
  const dispatch = useDispatch();

  const [loadingComplete, setLoadingComplete] = useState(null);
  const [academicTerm, setAcademicTerm] = useState({
    name: "",
    from: "",
    to: "",
    duration: "",
    createdBy: `${authAdmin.id}`,
  });
  console.log(academicTerm);

  const navigate = useNavigate();

  const handleInputValues = (e) => {
    setAcademicTerm({
      ...academicTerm,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (field, date) => {
    setAcademicTerm((prev) => ({
      ...prev,
      [field]: date, // Store the Date object directly
    }));
  };

  const canSave = Boolean(academicTerm.name);
  const handleAcademicTerm = (e) => {
    e.preventDefault();
    let startDate =
      typeof selectedDate === "string"
        ? parseISO(academicTerm?.from)
        : academicTerm?.from;
    let endDate =
      typeof selectedDate === "string"
        ? parseISO(academicTerm?.to)
        : academicTerm?.to;
    const data = {
      name: academicTerm?.name,
      from: startDate,
      to: endDate,
      duration: academicTerm?.duration,
      createdBy: `${authAdmin.id}`,
    };
    dispatch(createAcademicTerm({ academicTermData: data }));
  };

  // Create academic year status check
  useEffect(() => {
    if (createStatus === "pending") {
      setLoadingComplete(false);
    }
    if (createStatus === "rejected") {
      setTimeout(() => {
        setLoadingComplete(null);
        error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "light",
            // toastId: successId,
          })
        );
      }, 3000);
      return;
    }
    if (createStatus === "success") {
      setTimeout(() => {
        setLoadingComplete(true);
      }, 3000);
      setTimeout(() => {
        setLoadingComplete(null);
        setAcademicTerm({
          name: "",
          from: "",
          to: "",
          duration: "",
          createdBy: `${authAdmin.id}`,
        });
      }, 6000);
    }
  }, [error, successMessage, createStatus, authAdmin]);

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "85%", md: "75%", lg: "60%", xl: "50%" },
        margin: "auto",
        paddingTop: "2rem",
        display: "flex",
        flexDirection: "column",
      }}
      className="createDataWrap"
    >
      <Box
        component={"form"}
        onSubmit={handleAcademicTerm}
        minHeight={300}
        p={2}
      >
        <h1>Academic Term Form</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CustomTextField
              fullWidth
              label="Name"
              name="name"
              onChange={handleInputValues}
              value={academicTerm.name}
              required
              className="textField"
              sx={{
                "&:hover": {
                  borderColor: "none",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
            {/* <CustomTextField
              fullWidth
              label="From"
              name="from"
              onChange={handleInputValues}
              value={academicTerm.from}
              required
              className="textField"
              sx={{
                "&:hover": {
                  borderColor: "none",
                },
              }}
            /> */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CustomMobileDatePicker
                label="From"
                name="from"
                // inputFormat="MM/dd/yyyy"
                value={academicTerm.from}
                onChange={(date) => handleDateChange("from", date)}
                renderInput={(params) => <CustomTextField {...params} />}
                error={false} // Make sure this is false
                helperText="" // Optionally clear helper text
                sx={{
                  width: "100%",
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
            {/* <CustomTextField
              fullWidth
              label="To"
              name="to"
              onChange={handleInputValues}
              value={academicTerm.to}
              required
              className="textField"
              sx={{
                "&:hover": {
                  borderColor: "none",
                },
              }}
            /> */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CustomMobileDatePicker
                label="To"
                name="to"
                // inputFormat="MM/dd/yyyy"
                value={academicTerm.to}
                onChange={(date) => handleDateChange("to", date)}
                renderInput={(params) => <CustomTextField {...params} />}
                error={false} // Make sure this is false
                helperText="" // Optionally clear helper text
                sx={{
                  width: "100%",
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
            <CustomTextField
              fullWidth
              // type="date"
              label="Duration"
              name="duration"
              onChange={handleInputValues}
              value={academicTerm.duration}
              required
              className="textField"
              sx={{
                "&:hover": {
                  borderColor: "none",
                },
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">mth</InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
        </Grid>
        <Button type="submit" disabled={!canSave}>
          {loadingComplete === false && (
            <LoadingProgress color={"#fff"} size={"1.3rem"} />
          )}
          {loadingComplete === true && createStatus === "success" && (
            <>
              <span>Successfully</span> <TaskAlt />
            </>
          )}
          {loadingComplete === null && "Create Academic Term"}
        </Button>
      </Box>
    </Box>
  );
}
