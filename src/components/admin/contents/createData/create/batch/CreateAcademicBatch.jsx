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
import { useNavigate } from "react-router-dom";
// import LoadingProgress from "../../pageLoading/LoadingProgress";
// import { createBatch } from "../../../features/academics/batch/batchSlice";
// import { getUser } from "../../../features/allUsers/usersSlice";
import { toast } from "react-toastify";
import { CustomTextField } from "../../../../../../muiStyling/muiStyling";
import { createBatch } from "../../../../../../features/academics/batchSlice";
import { getAuthUser } from "../../../../../../features/auth/authSlice";
import LoadingProgress from "../../../../../pageLoading/LoadingProgress";
import { TaskAlt } from "@mui/icons-material";

export function CreateAcademicBatch() {
  const authAdmin = useSelector(getAuthUser);
  const { createStatus, successMessage, error } = useSelector(
    (state) => state.batch
  );
  const dispatch = useDispatch();

  const [loadingComplete, setLoadingComplete] = useState(null);
  const [batch, setBatch] = useState({
    fromYear: "",
    toYear: "",
    createdBy: `${authAdmin.id}`,
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
    dispatch(createBatch({ data: batch }));
  };
  // Create batch status check
  useEffect(() => {
    if (createStatus === "pending") {
      setLoadingComplete(false);
    }
    if (createStatus === "rejected") {
      setTimeout(() => {
        setLoadingComplete(null);
      }, 2000);
      setTimeout(() => {
        error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "light",
            toastId: "createBatchError",
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
        setBatch({
          fromYear: "",
          toYear: "",
          createdBy: `${authAdmin.id}`,
        });
      }, 6000);
    }
  }, [error, successMessage, createStatus, navigate, authAdmin]);

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
          {loadingComplete === false && (
            <LoadingProgress color={"#fff"} size={"1.3rem"} />
          )}
          {loadingComplete === true && createStatus === "success" && (
            <>
              <span>Successfully!</span> <TaskAlt />
            </>
          )}
          {loadingComplete === null && "Create Academic Batch"}
        </Button>
      </Box>
    </Box>
  );
}
