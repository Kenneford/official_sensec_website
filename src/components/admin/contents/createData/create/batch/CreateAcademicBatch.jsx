import React, { useEffect, useState } from "react";
import "./batch.scss";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
} from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import LoadingProgress from "../../pageLoading/LoadingProgress";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import { createBatch } from "../../../features/academics/batch/batchSlice";
// import { getUser } from "../../../features/allUsers/usersSlice";
import { toast } from "react-toastify";
import { CustomTextField } from "../../../../../../muiStyling/muiStyling";

export function CreateAcademicBatch() {
  const authAdminInfo = {};
  // const { createStatus, successMessage, batchError } = useSelector(
  //   (state) => state.batch
  // );
  console.log(authAdminInfo);
  // const dispatch = useDispatch();

  const [loadingComplete, setLoadingComplete] = useState(null);
  const [batch, setBatch] = useState({
    fromYear: "",
    toYear: "",
    createdBy: `${authAdminInfo.id}`,
  });
  console.log(batch);

  const navigate = useNavigate();

  const handleInputValues = (e) => {
    setBatch({
      ...batch,
      [e.target.name]: e.target.value,
    });
  };

  const canSave = Boolean(batch.fromYear) && Boolean(batch.toYear);
  const handleBatch = (e) => {
    e.preventDefault();
    setLoadingComplete(false);
    const formData = new FormData();
    formData.append("fromYear", batch.fromYear);
    formData.append("toYear", batch.toYear);
    formData.append("createdBy", batch.createdBy);
    // dispatch(createBatch(batch));
    setTimeout(() => {
      setLoadingComplete(true);
    }, 3000);
    setTimeout(() => {
      setLoadingComplete(null);
      setBatch({
        fromYear: "",
        toYear: "",
      });
    }, 6000);
  };

  // useEffect(() => {
  //   if (createStatus === "rejected") {
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //       batchError?.errorMessage?.message?.map((err) =>
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
  //       window.location.reload();
  //     }, 6000);
  //   }
  // }, [batchError, successMessage, createStatus, navigate]);

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "85%", md: "75%", lg: "60%", xl: "50%" },
        margin: "auto",
        paddingTop: "2rem",
        display: "flex",
        flexDirection: "column",
      }}
      className="createAcademicBatchWrap"
    >
      <Box component={"form"} onSubmit={handleBatch} minHeight={220} p={2}>
        <h1>Batch Form</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
            <CustomTextField
              fullWidth
              label="From"
              name="fromYear"
              onChange={handleInputValues}
              value={batch.fromYear}
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
              value={batch.toYear}
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
