import React, { useEffect, useState } from "react";
import "../create.scss";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
// import { createAcademicYear } from "../../../features/academics/academicYear/academicYearSlice";
import { useNavigate } from "react-router-dom";
// import LoadingProgress from "../../pageLoading/LoadingProgress";
// import { getUser } from "../../../features/allUsers/usersSlice";
import { toast } from "react-toastify";
import { CustomTextField } from "../../../../../../muiStyling/muiStyling";
import { createAcademicYear } from "../../../../../../features/academics/academicYearSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "../../../../../../features/auth/authSlice";
import LoadingProgress from "../../../../../pageLoading/LoadingProgress";
import { TaskAlt } from "@mui/icons-material";

export function CreateAcademicYear() {
  const authAdmin = useSelector(getAuthUser);
  const { createStatus, successMessage, error } = useSelector(
    (state) => state.academicYear
  );

  const dispatch = useDispatch();

  const [loadingComplete, setLoadingComplete] = useState(null);
  const [academicYear, setAcademicYear] = useState({
    fromYear: "",
    toYear: "",
    createdBy: `${authAdmin.id}`,
  });
  console.log(academicYear);

  // const navigate = useNavigate();

  const handleInputValues = (e) => {
    setAcademicYear({
      ...academicYear,
      [e.target.name]: e.target.value,
    });
  };

  const canSave =
    Boolean(academicYear.fromYear) && Boolean(academicYear.toYear);

  const handleAcademicYear = (e) => {
    e.preventDefault();
    setLoadingComplete(false);
    dispatch(createAcademicYear({ academicYear }));
    setTimeout(() => {
      setLoadingComplete(true);
    }, 3000);
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
            toastId: "createAcademicYearError",
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
        setAcademicYear({
          fromYear: "",
          toYear: "",
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
        onSubmit={handleAcademicYear}
        minHeight={220}
        p={2}
      >
        <h1>Academic Year Form</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
            <CustomTextField
              fullWidth
              label="From"
              name="fromYear"
              onChange={handleInputValues}
              value={academicYear.fromYear}
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
              name="toYear"
              onChange={handleInputValues}
              value={academicYear.toYear}
              required
              className="textField"
              sx={{
                "&:hover": {
                  borderColor: "none",
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
          {loadingComplete === null && "Create Academic Year"}
        </Button>
      </Box>
    </Box>
  );
}
