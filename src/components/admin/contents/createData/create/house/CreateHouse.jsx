import React, { useEffect, useState } from "react";
import "./createHouse.scss";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import LoadingProgress from "../../pageLoading/LoadingProgress";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { toast } from "react-toastify";
import { CustomTextField } from "../../../../../../muiStyling/muiStyling";

export function CreateHouse() {
  const authAdminInfo = {};
  // const { createStatus, successMessage, error } = useSelector(
  //   (state) => state.house
  // );
  console.log(authAdminInfo);
  // const dispatch = useDispatch();

  const [loadingComplete, setLoadingComplete] = useState(null);
  const [house, setHouse] = useState({
    name: "",
    createdBy: `${authAdminInfo.id}`,
  });
  console.log(house);

  const navigate = useNavigate();

  const handleInputValues = (e) => {
    setHouse({
      ...house,
      [e.target.name]: e.target.value,
    });
  };

  const canSave = Boolean(house.name) && Boolean(house.createdBy);
  const handlehouse = (e) => {
    e.preventDefault();
    setLoadingComplete(false);
    const formData = new FormData();
    formData.append("name", house.name);
    formData.append("createdBy", house.createdBy);
    // dispatch(createHouse(house));
    setTimeout(() => {
      setLoadingComplete(true);
    }, 3000);
    setTimeout(() => {
      setLoadingComplete(null);
      setHouse({
        name: "",
        toYear: "",
      });
    }, 6000);
  };

  // useEffect(() => {
  //   if (createStatus === "rejected") {
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //       error?.errorMessage?.message?.map((err) =>
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
  //     }, 6000);
  //   }
  // }, [error, successMessage, createStatus, navigate]);

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "85%", md: "75%", lg: "60%", xl: "50%" },
        margin: "auto",
        paddingTop: "2rem",
        display: "flex",
        flexDirection: "column",
      }}
      className="createHouseWrap"
    >
      <Box component={"form"} onSubmit={handlehouse} minHeight={220} p={2}>
        <h1>House Form</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
            <CustomTextField
              fullWidth
              label="Name"
              name="name"
              onChange={handleInputValues}
              value={house?.name}
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
