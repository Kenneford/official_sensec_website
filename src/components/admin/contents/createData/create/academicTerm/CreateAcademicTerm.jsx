import React, { useEffect, useState } from "react";
import "./createAcademicTerm.scss";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
} from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { academicYearOptions } from "../../../options/options";
// import { getAdminInfo } from "../../../features/admin/adminsSlice";
// import { createAcademicYear } from "../../../features/academics/academicYear/academicYearSlice";
import { useNavigate } from "react-router-dom";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import { createAcademicTerm } from "../../../features/academics/academicTerm/academicTermSlice";
// import { getUser } from "../../../features/allUsers/usersSlice";
// import LoadingProgress from "../../pageLoading/LoadingProgress";
import { toast } from "react-toastify";
import { CustomTextField } from "../../../../../../muiStyling/muiStyling";

export function CreateAcademicTerm() {
  const authAdminInfo = {};
  // const { createTermStatus, successMessage, academicTermError } = useSelector(
  //   (state) => state.academicTerm
  // );
  // const dispatch = useDispatch();

  const [loadingComplete, setLoadingComplete] = useState(null);
  const [academicTerm, setAcademicTerm] = useState({
    name: "",
    from: "",
    to: "",
    duration: "",
    createdBy: `${authAdminInfo.id}`,
  });

  const navigate = useNavigate();

  const handleInputValues = (e) => {
    setAcademicTerm({
      ...academicTerm,
      [e.target.name]: e.target.value,
    });
  };

  const canSave = Boolean(academicTerm.name);
  const handleAcademicTerm = (e) => {
    e.preventDefault();
    setLoadingComplete(false);
    const formData = new FormData();
    formData.append("name", academicTerm.name);
    formData.append("from", academicTerm.from);
    formData.append("to", academicTerm.to);
    formData.append("duration", academicTerm.duration);
    formData.append("createdBy", academicTerm.createdBy);
    // dispatch(createAcademicTerm(academicTerm));
    setTimeout(() => {
      setLoadingComplete(true);
    }, 3000);
  };

  // useEffect(() => {
  //   if (createTermStatus === "rejected") {
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //       academicTermError?.errorMessage?.message?.map((err) =>
  //         toast.error(err, {
  //           position: "top-right",
  //           theme: "light",
  //           // toastId: successId,
  //         })
  //       );
  //     }, 3000);
  //     return;
  //   }
  //   if (createTermStatus === "success") {
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //       window.location.reload();
  //     }, 6000);
  //   }
  // }, [academicTermError, successMessage, createTermStatus, navigate]);

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "85%", md: "75%", lg: "60%", xl: "50%" },
        margin: "auto",
        paddingTop: "2rem",
        display: "flex",
        flexDirection: "column",
      }}
      className="createAcademicTermWrap"
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
            <CustomTextField
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
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
            <CustomTextField
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
            />
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
          Create Academic Term
          {/* {loadingComplete === false && (
            <LoadingProgress color={"#fff"} size={"1.3rem"} />
          )}
          {loadingComplete === true && createTermStatus === "success" && (
            <>
              <span> Academic Term Created Successfully...</span>{" "}
              <TaskAltIcon />
            </>
          )}
          {loadingComplete === null && "Create Academic Term"} */}
        </Button>
      </Box>
    </Box>
  );
}
