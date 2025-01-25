import { useEffect, useState } from "react";
import "../../create.scss";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CustomTextField } from "../../../../../../../muiStyling/muiStyling";
import {
  FetchAllFlattenedProgrammes,
  FetchAllProgrammes,
} from "../../../../../../../data/programme/FetchProgrammeData";
import { getAuthUser } from "../../../../../../../features/auth/authSlice";
import {
  createESubject,
  resetCreateSubjectState,
} from "../../../../../../../features/academics/subjectsSlice";
import { TaskAlt } from "@mui/icons-material";
import LoadingProgress from "../../../../../../pageLoading/LoadingProgress";
import {
  fetchAllDivisionProgrammes,
  getAllDivisionProgrammes,
} from "../../../../../../../features/academics/programmeSlice";

export function CreateElectiveSubject() {
  const authAdmin = useSelector(getAuthUser);
  const allProgrammes = FetchAllProgrammes();
  const allFlattenedProgrammes = FetchAllFlattenedProgrammes();
  // const allDivisionProgrammes = useSelector(getAllDivisionProgrammes);
  // console.log(allDivisionProgrammes);

  const dispatch = useDispatch();
  const [loadingComplete, setLoadingComplete] = useState(null);

  const { createStatus, successMessage, error } = useSelector(
    (state) => state.subject
  );

  const [electiveSubject, setElectiveSubject] = useState({
    subjectName: "",
    programId: "",
    isOptional: "",
    createdBy: `${authAdmin.id}`,
  });
  console.log(electiveSubject);

  const handleInputValues = (e) => {
    setElectiveSubject({
      ...electiveSubject,
      [e.target.name]: e.target.value,
    });
  };

  const canSave =
    Boolean(electiveSubject.subjectName) && Boolean(electiveSubject?.programId);

  const handleElectiveSubject = (e) => {
    e.preventDefault();
    if (!electiveSubject?.isOptional) {
      toast?.error("Please select an option", {
        position: "top-right",
        theme: "light",
        toastId: "optionSelectionError",
      });
      return;
    }
    const data = {
      subjectName: electiveSubject?.subjectName,
      isCore: false,
      program: electiveSubject?.programId,
      isOptional: electiveSubject?.isOptional
        ? electiveSubject?.isOptional
        : null,
      createdBy: authAdmin?.id,
    };
    dispatch(createESubject({ data }));
  };

  // Create subject status check
  useEffect(() => {
    if (createStatus === "pending") {
      setLoadingComplete(false);
    }
    if (createStatus === "rejected") {
      setTimeout(() => {
        error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "light",
            toastId: "createSubjectError",
          })
        );
      }, 2000);
      setTimeout(() => {
        setLoadingComplete(null);
        dispatch(resetCreateSubjectState());
      }, 3000);
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
        setElectiveSubject({
          subjectName: "",
          programId: "",
          divisionProgramId: "",
          isOptional: "",
          createdBy: `${authAdmin.id}`,
        });
        dispatch(resetCreateSubjectState());
        setLoadingComplete(null);
      }, 6000);
    }
  }, [error, successMessage, createStatus, authAdmin, dispatch]);

  // useEffect(() => {
  //   if (electiveSubject?.programId) {
  //     dispatch(
  //       fetchAllDivisionProgrammes({ programId: electiveSubject?.programId })
  //     );
  //   }
  // }, [dispatch, electiveSubject?.programId]);

  return (
    <div className="electiveSubjectWrap">
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
          onSubmit={handleElectiveSubject}
          minHeight={220}
          p={2}
        >
          <h1>Elective Subject Form</h1>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
              <CustomTextField
                fullWidth
                label="Subject Name"
                name="subjectName"
                onChange={handleInputValues}
                value={electiveSubject?.subjectName}
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
                value={electiveSubject?.programId}
                onChange={handleInputValues}
                required
              >
                {allFlattenedProgrammes?.map((programme) => (
                  <MenuItem key={programme?._id} value={programme?._id}>
                    {programme?.name
                      ? programme?.name
                      : programme?.divisionName}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            {/* Division Program Selection (conditional) */}
            {/* {allDivisionProgrammes && allDivisionProgrammes?.length > 0 && (
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <CustomTextField
                  select
                  fullWidth
                  label="Division Program"
                  name="divisionProgramId"
                  value={electiveSubject?.divisionProgramId}
                  onChange={handleInputValues}
                  //   required
                >
                  {allDivisionProgrammes?.map((programme) => (
                    <MenuItem key={programme?._id} value={programme?._id}>
                      {programme?.divisionName}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
            )} */}
            <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
              <FormControl component="fieldset">
                <Box>
                  <FormLabel
                    component="legend"
                    // className="title"
                    sx={{
                      fontWeight: "600",
                      marginRight: "1rem",
                      color: "red",
                    }}
                  >
                    <h5>Optional E-Subject:</h5>
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label="options"
                    name="isOptional"
                    value={electiveSubject?.isOptional}
                    onChange={handleInputValues}
                  >
                    <FormControlLabel
                      value={true}
                      control={
                        <Radio
                          sx={{
                            color: "green",
                            "&.Mui-checked": {
                              color: "#04a214",
                            },
                          }}
                        />
                      }
                      label="True"
                      sx={{
                        color:
                          electiveSubject.isOptional === true ? "#04a214" : "",
                      }}
                    />
                    <FormControlLabel
                      value={false}
                      control={
                        <Radio
                          sx={{
                            color: "red",
                            "&.Mui-checked": {
                              color: "#f00808",
                            },
                          }}
                        />
                      }
                      label="False"
                      sx={{
                        color:
                          electiveSubject.isOptional === false ? "#f00808" : "",
                      }}
                    />
                  </RadioGroup>
                </Box>
              </FormControl>
            </Grid>
          </Grid>
          <Button type="submit" disabled={!canSave}>
            {loadingComplete === false && (
              <LoadingProgress color={"#fff"} size={"1.3rem"} />
            )}
            {loadingComplete === true && createStatus === "success" && (
              <>
                <span>Successfully</span> <TaskAlt />
              </>
            )}
            {loadingComplete === null && "Create Elective Subject"}
          </Button>
        </Box>
      </Box>
    </div>
  );
}
