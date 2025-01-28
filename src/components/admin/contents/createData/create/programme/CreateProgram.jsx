import React, { useEffect, useState } from "react";
import "../create.scss";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomTextField } from "../../../../../../muiStyling/muiStyling";
import { useDispatch, useSelector } from "react-redux";
import {
  createProgramme,
  resetCreateProgrammeState,
} from "../../../../../../features/academics/programmeSlice";
import LoadingProgress from "../../../../../pageLoading/LoadingProgress";
import { getAuthUser } from "../../../../../../features/auth/authSlice";
import { TaskAlt } from "@mui/icons-material";

export function CreateProgram() {
  const authAdmin = useSelector(getAuthUser);
  const { createStatus, successMessage, error } = useSelector(
    (state) => state.programme
  );
  const dispatch = useDispatch();

  const [loadingComplete, setLoadingComplete] = useState(null);
  const [program, setProgram] = useState({
    name: "",
    createdBy: `${authAdmin?.id}`,
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
    dispatch(createProgramme(program));
  };

  useEffect(() => {
    if (createStatus === "pending") {
      setLoadingComplete(false);
    }
    if (createStatus === "rejected") {
      setTimeout(() => {
        setLoadingComplete(null);
      }, 3000);
      setTimeout(() => {
        error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "dark",
            toastId: "createProgrammeError",
          })
        );
        dispatch(resetCreateProgrammeState());
      }, 1000);
      return;
    }
    if (createStatus === "success") {
      setTimeout(() => {
        setLoadingComplete(true);
      }, 2000);
      setTimeout(() => {
        toast.success(successMessage, {
          position: "top-right",
          theme: "dark",
          toastId: successMessage,
        });
      }, 1000);
      setTimeout(() => {
        setProgram({
          name: "",
          createdBy: `${authAdmin?.id}`,
        });
        dispatch(resetCreateProgrammeState());
        setLoadingComplete(null);
      }, 4000);
    }
  }, [error, successMessage, createStatus, authAdmin, dispatch]);

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
          {loadingComplete === false && (
            <LoadingProgress color={"#fff"} size={"1.3rem"} />
          )}
          {loadingComplete === true && createStatus === "success" && (
            <>
              <span>Successful</span> <TaskAlt />
            </>
          )}
          {loadingComplete === null && "Create Programme"}
        </Button>
      </Box>
    </Box>
  );
}
