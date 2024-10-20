import React, { useEffect, useState } from "react";
import "./createClassLevel.scss";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Button, Grid } from "@mui/material";
import { CustomTextField } from "../../../../../../muiStyling/muiStyling";

export function CreateClassLevel() {
  const authAdminInfo = {};
  // const { createLevelStatus, successMessage, error } = useSelector(
  //   (state) => state.classLevel
  // );

  // const dispatch = useDispatch();

  const [loadingComplete, setLoadingComplete] = useState(null);
  const [classLevel, setClassLevel] = useState({
    name: "",
    createdBy: `${authAdminInfo.id}`,
    // adminId: authAdminInfo.uniqueId,
  });
  console.log(classLevel);

  const navigate = useNavigate();

  const handleInputValues = (e) => {
    setClassLevel({
      ...classLevel,
      [e.target.name]: e.target.value,
    });
  };

  const canSave = Boolean(classLevel.name);

  const handleClassLevel = (e) => {
    e.preventDefault();
    setLoadingComplete(false);
    const formData = new FormData();
    formData.append("name", classLevel.name);
    formData.append("createdBy", classLevel.createdBy);
    // formData.append("adminId", classLevel.adminId);
    // dispatch(createClassLevel(classLevel));
    setTimeout(() => {
      setLoadingComplete(true);
    }, 3000);
  };

  // useEffect(() => {
  //   if (createLevelStatus === "rejected") {
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
  //   if (createLevelStatus === "success") {
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //       window.location.reload();
  //     }, 6000);
  //   }
  // }, [error, successMessage, createLevelStatus, navigate]);

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "85%", md: "75%", lg: "60%", xl: "50%" },
        margin: "auto",
        paddingTop: "2rem",
        display: "flex",
        flexDirection: "column",
      }}
      className="createAcademicClassLevelWrap"
    >
      <Box component={"form"} onSubmit={handleClassLevel} minHeight={220} p={2}>
        <h1>Class Level Form</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
            <CustomTextField
              fullWidth
              label="Name"
              name="name"
              onChange={handleInputValues}
              value={classLevel.name}
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
