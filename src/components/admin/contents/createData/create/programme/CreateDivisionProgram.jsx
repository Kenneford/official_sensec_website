import React, { useEffect, useState } from "react";
import "../create.scss";
import { Box, Button, CircularProgress, Grid, MenuItem } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomTextField } from "../../../../../../muiStyling/muiStyling";
import { useDispatch, useSelector } from "react-redux";
import {
  createDivisionProgramme,
  createProgramme,
  resetCreateProgrammeState,
} from "../../../../../../features/academics/programmeSlice";
import LoadingProgress from "../../../../../pageLoading/LoadingProgress";
import { getAuthUser } from "../../../../../../features/auth/authSlice";
import { FetchAllProgrammes } from "../../../../../../data/programme/FetchProgrammeData";

export function CreateDivisionProgram() {
  const authAdmin = useSelector(getAuthUser);
  const allProgrammes = FetchAllProgrammes();
  const { createStatus, successMessage, error } = useSelector(
    (state) => state.programme
  );
  const dispatch = useDispatch();

  const [loadingComplete, setLoadingComplete] = useState(null);
  const [program, setProgram] = useState({
    programName: "",
    divisionName: "",
    programId: "",
    createdBy: `${authAdmin?.id}`,
  });
  console.log(program);
  // Find class-level
  const programmeFound = allProgrammes?.find(
    (programme) => programme && programme?._id === program?.programId
  );

  const navigate = useNavigate();

  const handleInputValues = (e) => {
    setProgram({
      ...program,
      [e.target.name]: e.target.value,
    });
  };

  const canSave = Boolean(program.divisionName) && Boolean(program.programId);

  const handleProgram = (e) => {
    e.preventDefault();
    const data = {
      programName: `${programmeFound?.name}`,
      divisionName: program?.divisionName,
      programId: program?.programId,
      createdBy: `${authAdmin?.id}`,
    };
    dispatch(createDivisionProgramme({ data }));
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
            toastId: "createDivisionProgrammeError",
          })
        );
        resetCreateProgrammeState();
      }, 2000);
      return;
    }
    if (createStatus === "success") {
      setTimeout(() => {
        setLoadingComplete(true);
      }, 3000);
      setTimeout(() => {
        toast.success(successMessage, {
          position: "top-right",
          theme: "dark",
          toastId: successMessage,
        });
      }, 1000);
      setTimeout(() => {
        setProgram({
          programName: "",
          divisionName: "",
          programId: "",
          createdBy: `${authAdmin?.id}`,
        });
        resetCreateProgrammeState();
        setLoadingComplete(null);
      }, 6000);
    }
  }, [error, successMessage, createStatus, authAdmin]);

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
        <h1>Division Programme Form</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
            <CustomTextField
              fullWidth
              label="Division Name"
              name="divisionName"
              onChange={handleInputValues}
              value={program.divisionName}
              required
              className="textField"
              sx={{
                "&:hover": {
                  borderColor: "none",
                },
              }}
            />
          </Grid>
          {/* Programme Selection */}
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CustomTextField
              select
              fullWidth
              label="Select Programme"
              name="programId"
              value={program?.programId}
              onChange={handleInputValues}
              required
            >
              {allProgrammes?.map((programme) => (
                <MenuItem key={programme?._id} value={programme?._id}>
                  {programme?.name}
                </MenuItem>
              ))}
            </CustomTextField>
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
          {loadingComplete === null && "Create Programme"}
        </Button>
      </Box>
    </Box>
  );
}
