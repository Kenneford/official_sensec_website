import React, { useEffect, useRef, useState } from "react";
import "../create.scss";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import LoadingProgress from "../../pageLoading/LoadingProgress";
import { toast } from "react-toastify";
import { CustomTextField } from "../../../../../../muiStyling/muiStyling";

export function CreateOldStudentsGroup() {
  const authAdminInfo = {};
  const allBatches = [];
  // const {
  //   createStatus,
  //   successMessage,
  //   oldStudentsGroupError,
  //   fetchingStatus,
  // } = useSelector((state) => state.yearGroup);
  const allAcademicYears = [];

  // const dispatch = useDispatch();
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [yearGroup, setYearGroup] = useState({
    yearOfGraduation: "",
    createdBy: `${authAdminInfo.id}`,
  });
  const navigate = useNavigate();
  const handleInputValues = (e) => {
    setYearGroup({
      ...yearGroup,
      [e.target.name]: e.target.value,
    });
  };

  const canSave = Boolean(yearGroup.yearOfGraduation);

  const handleYearGroup = (e) => {
    e.preventDefault();
    setLoadingComplete(false);
    // dispatch(
    //   createOldStudentsGroup({
    //     yearOfGraduation: yearGroup.yearOfGraduation,
    //     createdBy: `${authAdminInfo.id}`,
    //   })
    // );
  };

  // useEffect(() => {
  //   if (createStatus === "pending") {
  //     setTimeout(() => {
  //       setLoadingComplete(true);
  //     }, 3000);
  //   }
  //   if (createStatus === "rejected") {
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //       return;
  //     }, 3000);
  //     setTimeout(() => {
  //       oldStudentsGroupError?.errorMessage?.message?.map((err) =>
  //         toast.error(err, {
  //           position: "top-right",
  //           theme: "light",
  //           // toastId: successId,
  //         })
  //       );
  //     }, 2000);
  //   }
  //   if (createStatus === "success") {
  //     setTimeout(() => {
  //       toast.success(successMessage, {
  //         position: "top-right",
  //         theme: "dark",
  //         // toastId: successId,
  //       });
  //     }, 2000);
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //       setYearGroup({
  //         yearOfGraduation: "",
  //       });
  //     }, 6000);
  //   }
  // }, [
  //   oldStudentsGroupError,
  //   successMessage,
  //   createStatus,
  //   toastOptions,
  //   navigate,
  // ]);

  return (
    <div className="olsStudentsWrap">
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
          onSubmit={handleYearGroup}
          minHeight={220}
          p={2}
        >
          <h1>Old Students Group Form</h1>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
              <CustomTextField
                fullWidth
                label="From"
                name="fromYear"
                onChange={handleInputValues}
                value={yearGroup?.yearOfGraduation}
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
            Create Old Students Group
            {/* {loadingComplete === false && (
            <LoadingProgress color={"#fff"} size={"1.3rem"} />
          )}
          {loadingComplete === true && createTermStatus === "success" && (
            <>
              <span> Academic Term Created Successfully...</span>{" "}
              <TaskAlt />
            </>
          )}
          {loadingComplete === null && "Create Academic Term"} */}
          </Button>
        </Box>
      </Box>
    </div>
  );
}
