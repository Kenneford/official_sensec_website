import { useEffect, useState } from "react";
import "../../create.scss";
import { Box, Button, Grid } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CustomTextField } from "../../../../../../../muiStyling/muiStyling";
import { getAuthUser } from "../../../../../../../features/auth/authSlice";
import {
  createSubject,
  resetCreateSubjectState,
} from "../../../../../../../features/academics/subjectsSlice";
import LoadingProgress from "../../../../../../pageLoading/LoadingProgress";

export function CreateCoreSubject() {
  const authAdmin = useSelector(getAuthUser);

  const dispatch = useDispatch();
  const [loadingComplete, setLoadingComplete] = useState(null);

  const { createStatus, successMessage, error } = useSelector(
    (state) => state.subject
  );

  const [coreSubject, setCoreSubject] = useState({
    subjectName: "",
    isCore: true,
    createdBy: authAdmin?.id,
  });
  console.log(coreSubject);

  const handleInputValues = (e) => {
    setCoreSubject({
      ...coreSubject,
      [e.target.name]: e.target.value,
    });
  };

  const canSave = Boolean(coreSubject.subjectName);

  const handleCoreSubject = (e) => {
    e.preventDefault();
    const data = {
      subjectName: coreSubject.subjectName,
      isCore: true,
      createdBy: authAdmin?.id,
    };
    dispatch(createSubject({ data }));
  };
  // Create subject status check
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
            theme: "light",
            toastId: "createSubjectError",
          })
        );
        dispatch(resetCreateSubjectState());
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
        setCoreSubject({
          subjectName: "",
          isCore: true,
          createdBy: authAdmin?.id,
        });
        dispatch(resetCreateSubjectState());
        setLoadingComplete(null);
      }, 6000);
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
      <Box
        component={"form"}
        onSubmit={handleCoreSubject}
        minHeight={220}
        p={2}
      >
        <h1>Core Subject Form</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
            <CustomTextField
              fullWidth
              label="Subject Name"
              name="subjectName"
              onChange={handleInputValues}
              value={coreSubject.subjectName}
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
          {loadingComplete === null && "Create Core Subject"}
        </Button>
      </Box>
    </Box>
  );
}
