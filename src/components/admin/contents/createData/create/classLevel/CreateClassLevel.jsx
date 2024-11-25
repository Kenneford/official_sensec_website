import React, { useEffect, useState } from "react";
import "../create.scss";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Button, Grid } from "@mui/material";
import { CustomTextField } from "../../../../../../muiStyling/muiStyling";
import { createClassLevel } from "../../../../../../features/academics/classLevelsSlice";
import { getAuthUser } from "../../../../../../features/auth/authSlice";
import LoadingProgress from "../../../../../pageLoading/LoadingProgress";

export function CreateClassLevel() {
  const authAdmin = useSelector(getAuthUser);
  const { createStatus, successMessage, error } = useSelector(
    (state) => state.classLevel
  );

  const dispatch = useDispatch();

  const [loadingComplete, setLoadingComplete] = useState(null);
  const [classLevel, setClassLevel] = useState({
    name: "",
    createdBy: `${authAdmin.id}`,
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
    dispatch(createClassLevel({ classLevelData: classLevel }));
  };

  // Create academic year status check
  useEffect(() => {
    if (createStatus === "pending") {
      setLoadingComplete(false);
    }
    if (createStatus === "rejected") {
      setTimeout(() => {
        setLoadingComplete(null);
        error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "light",
            // toastId: successId,
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
        setClassLevel({
          name: "",
          createdBy: `${authAdmin.id}`,
        });
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
          {loadingComplete === false && (
            <LoadingProgress color={"#fff"} size={"1.3rem"} />
          )}
          {loadingComplete === true && createStatus === "success" && (
            <>
              <span>Successfully</span> <TaskAltIcon />
            </>
          )}
          {loadingComplete === null && "Create Class Level"}
        </Button>
      </Box>
    </Box>
  );
}
