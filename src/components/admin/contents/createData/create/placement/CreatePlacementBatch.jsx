import React, { useEffect, useState } from "react";
import "./placementBatch.scss";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import LoadingProgress from "../../pageLoading/LoadingProgress";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import { getUser } from "../../../features/allUsers/usersSlice";
// import { createPlacementBatch } from "../../../features/placementStudents/PlacementStudentsSlice";
import { toast } from "react-toastify";
import { Box, Button, Grid } from "@mui/material";
import { CustomTextField } from "../../../../../../muiStyling/muiStyling";

export function CreatePlacementBatch() {
  const authAdminInfo = {};
  // const {
  //   placementBatchStatus,
  //   placementBatchSuccessMessage,
  //   placementBatchError,
  // } = useSelector((state) => state.placement);
  // console.log(authAdminInfo);
  // const dispatch = useDispatch();

  const [loadingComplete, setLoadingComplete] = useState(null);
  const [placementBatch, setPlacementBatch] = useState({
    year: "",
    createdBy: `${authAdminInfo.id}`,
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
    setLoadingComplete(false);
    const formData = new FormData();
    formData.append("year", placementBatch.year);
    formData.append("createdBy", placementBatch.createdBy);
    // dispatch(createPlacementBatch(placementBatch));
    setTimeout(() => {
      setLoadingComplete(true);
    }, 3000);
  };

  // useEffect(() => {
  //   if (placementBatchStatus === "rejected") {
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //       return placementBatchError?.errorMessage?.message?.map((err) =>
  //         toast.error(err, {
  //           position: "top-right",
  //           theme: "light",
  //           // toastId: successId,
  //         })
  //       );
  //     }, 3000);
  //   }
  //   if (placementBatchStatus === "success") {
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //       window.location.reload();
  //     }, 6000);
  //   }
  // }, [
  //   placementBatchError,
  //   placementBatchSuccessMessage,
  //   placementBatchStatus,
  //   navigate,
  // ]);

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "85%", md: "75%", lg: "60%", xl: "50%" },
        margin: "auto",
        paddingTop: "2rem",
        display: "flex",
        flexDirection: "column",
      }}
      className="createAcademicPlacementWrap"
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
