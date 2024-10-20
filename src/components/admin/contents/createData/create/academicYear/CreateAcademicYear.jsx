import React, { useEffect, useState } from "react";
import "./createAcademicYear.scss";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
// import { createAcademicYear } from "../../../features/academics/academicYear/academicYearSlice";
import { useNavigate } from "react-router-dom";
// import LoadingProgress from "../../pageLoading/LoadingProgress";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import { getUser } from "../../../features/allUsers/usersSlice";
import { toast } from "react-toastify";
import { CustomTextField } from "../../../../../../muiStyling/muiStyling";

export function CreateAcademicYear() {
  const authAdminInfo = {};
  // const { createStatus, successMessage, academicYearError } = useSelector(
  //   (state) => state.academicYear
  // );

  // const dispatch = useDispatch();

  const [loadingComplete, setLoadingComplete] = useState(null);
  const [academicYear, setAcademicYear] = useState({
    fromYear: "",
    toYear: "",
    createdBy: `${authAdminInfo.id}`,
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
    const formData = new FormData();
    formData.append("fromYear", academicYear.fromYear);
    formData.append("toYear", academicYear.toYear);
    formData.append("createdBy", academicYear.createdBy);
    // dispatch(createAcademicYear(academicYear));
    setTimeout(() => {
      setLoadingComplete(true);
    }, 3000);
  };

  // useEffect(() => {
  //   if (createStatus === "rejected") {
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //       academicYearError?.errorMessage?.message?.map((err) =>
  //         toast.error(err, {
  //           position: "top-right",
  //           theme: "light",
  //           // toastId: successId,
  //         })
  //       );
  //     }, 3000);
  //     return;
  //   }
  //   if (createStatus === "success") {
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //       window.location.reload();
  //     }, 6000);
  //   }
  // }, [academicYearError, successMessage, createStatus, navigate]);

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "85%", md: "75%", lg: "60%", xl: "50%" },
        margin: "auto",
        paddingTop: "2rem",
        display: "flex",
        flexDirection: "column",
      }}
      className="createAcademicYearWrap"
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
          Create Academic Batch
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
