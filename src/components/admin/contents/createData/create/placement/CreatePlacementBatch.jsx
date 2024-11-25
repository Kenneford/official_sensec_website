import React, { useEffect, useState } from "react";
import "../create.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import LoadingProgress from "../../pageLoading/LoadingProgress";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import { getUser } from "../../../features/allUsers/usersSlice";
// import { createPlacementBatch } from "../../../features/placementStudents/PlacementStudentsSlice";
import { toast } from "react-toastify";
import { Box, Button, Grid } from "@mui/material";
import { CustomTextField } from "../../../../../../muiStyling/muiStyling";
import { createPlacementBatch } from "../../../../../../features/academics/placementSlice";
import { getAuthUser } from "../../../../../../features/auth/authSlice";
import LoadingProgress from "../../../../../pageLoading/LoadingProgress";

export function CreatePlacementBatch() {
  const authAdmin = useSelector(getAuthUser);
  const { createStatus, successMessage, error } = useSelector(
    (state) => state.placement
  );
  // console.log(authAdminInfo);
  const dispatch = useDispatch();

  const [loadingComplete, setLoadingComplete] = useState(null);
  const [placementBatch, setPlacementBatch] = useState({
    year: "",
    createdBy: `${authAdmin.id}`,
  });
  console.log(placementBatch);

  const navigate = useNavigate();

  const handleInputValues = (e) => {
    setPlacementBatch({
      ...placementBatch,
      [e.target.name]: e.target.value,
    });
  };

  const canSave = Boolean(placementBatch.year);
  const handleBatch = (e) => {
    e.preventDefault();
    dispatch(createPlacementBatch({ placementBatch }));
  };

  useEffect(() => {
    if (createStatus === "pending") {
      setLoadingComplete(false);
    }
    if (createStatus === "rejected") {
      setTimeout(() => {
        return error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "light",
            // toastId: successId,
          })
        );
      }, 2000);
      setTimeout(() => {
        setLoadingComplete(null);
      }, 3000);
    }
    if (createStatus === "success") {
      setTimeout(() => {
        setLoadingComplete(true);
      }, 3000);
      setTimeout(() => {
        setLoadingComplete(null);
        setPlacementBatch({
          year: "",
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
        <h1>Placement Batch Form</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
            <CustomTextField
              fullWidth
              label="Placement Year"
              name="year"
              onChange={handleInputValues}
              value={placementBatch.year}
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
              <span>Successful</span> <TaskAltIcon />
            </>
          )}
          {loadingComplete === null && "Create Academic Term"}
        </Button>
      </Box>
    </Box>
  );
}
