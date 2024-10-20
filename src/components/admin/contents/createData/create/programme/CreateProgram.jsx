import React, { useEffect, useState } from "react";
import "./createProgramme.scss";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomTextField } from "../../../../../../muiStyling/muiStyling";

export function CreateProgram() {
  const authAdminInfo = {};
  // const { createStatus, successMessage, error } = useSelector(
  //   (state) => state.program
  // );
  // const dispatch = useDispatch();

  const [loadingComplete, setLoadingComplete] = useState(null);
  const [program, setProgram] = useState({
    name: "",
    createdBy: authAdminInfo.id,
  });
  console.log(program);

  const navigate = useNavigate();

  const handleInputValues = (e) => {
    setProgram({
      ...program,
      [e.target.name]: e.target.value,
    });
  };

  const canSave = Boolean(program.name);

  const handleProgram = (e) => {
    e.preventDefault();
    setLoadingComplete(false);
    // dispatch(createProgram(program));
    setTimeout(() => {
      setLoadingComplete(true);
    }, 3000);
    setTimeout(() => {
      setLoadingComplete(null);
      setProgram({
        name: "",
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
  //           theme: "dark",
  //           // toastId: successId,
  //         })
  //       );
  //     }, 2000);
  //     return;
  //   }
  //   if (createStatus === "success") {
  //     setTimeout(() => {
  //       toast.success(successMessage, {
  //         position: "top-right",
  //         theme: "dark",
  //         // toastId: successId,
  //       });
  //     }, 1000);
  //     setTimeout(() => {
  //       resetCreateProgramState();
  //       setProgram({
  //         name: "",
  //         createdBy: authAdminInfo.id,
  //       });
  //     }, 6000);
  //   }
  // }, [error, successMessage, createStatus, navigate, authAdminInfo]);

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "85%", md: "75%", lg: "60%", xl: "50%" },
        margin: "auto",
        paddingTop: "2rem",
        display: "flex",
        flexDirection: "column",
      }}
      className="createAcademicProgrammeWrap"
    >
      <Box component={"form"} onSubmit={handleProgram} minHeight={220} p={2}>
        <h1>Programme Form</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
            <CustomTextField
              fullWidth
              label="Name"
              name="name"
              onChange={handleInputValues}
              value={program.name}
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
