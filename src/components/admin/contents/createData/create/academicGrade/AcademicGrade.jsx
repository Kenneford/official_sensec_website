import React, { useEffect, useRef, useState } from "react";
import "../create.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import LoadingProgress from "../../pageLoading/LoadingProgress";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import { CustomTextField } from "../../../../../../muiStyling/muiStyling";
import { FetchAllClassLevels } from "../../../../../../data/class/FetchClassLevel";
import { getAuthUser } from "../../../../../../features/auth/authSlice";
import { FetchAllProgrammes } from "../../../../../../data/programme/FetchProgrammeData";
import { createClassLevelSection } from "../../../../../../features/academics/classSectionSlice";
import {
  fetchAllDivisionProgrammes,
  getAllDivisionProgrammes,
} from "../../../../../../features/academics/programmeSlice";
import LoadingProgress from "../../../../../pageLoading/LoadingProgress";
import { TaskAlt } from "@mui/icons-material";
import { addGrade } from "../../../../../../features/reports/reportSlice";

export function AcademicGrade() {
  const authAdmin = useSelector(getAuthUser);
  const allClassLevels = FetchAllClassLevels();
  const allProgrammes = FetchAllProgrammes();
  const allDivisionProgrammes = useSelector(getAllDivisionProgrammes);
  const { error, successMessage, createStatus } = useSelector(
    (state) => state.reports
  );
  const allTeachers = [];
  console.log(allTeachers);
  console.log(allClassLevels);
  console.log(allProgrammes);

  const dispatch = useDispatch();
  const [loadingComplete, setLoadingComplete] = useState(null);

  const [grade, setGrade] = useState({
    minScore: "",
    maxScore: "",
    grade: "",
    remark: "",
    createdBy: `${authAdmin.id}`,
  });
  console.log(grade);
  // Find class-level
  const classLevelFound = allClassLevels?.find(
    (cLevel) => cLevel && cLevel?._id === grade?.classLevelId
  );

  const canSave =
    Boolean(grade.minScore) &&
    Boolean(grade.maxScore) &&
    Boolean(grade.grade) &&
    Boolean(grade.remark);
  // Boolean(currentTeacherValue);

  const handleGrade = (e) => {
    e.preventDefault();
    const data = {
      minScore: grade?.minScore,
      maxScore: grade?.maxScore,
      grade: grade?.grade,
      remark: grade?.remark,
      createdBy: grade.createdBy,
    };
    dispatch(addGrade(data));
  };
  const handleInputValues = (e) => {
    const { name, value } = e.target;
    setGrade({
      ...grade,
      [name]: value,
    });
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
            toastId: "createClassSectionError",
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
        setGrade({
          minScore: "",
          maxScore: "",
          grade: "",
          remark: "",
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
      <Box component={"form"} onSubmit={handleGrade} minHeight={220} p={2}>
        <h1>Academic Grade Form</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
            <CustomTextField
              fullWidth
              label="Min Score"
              name="minScore"
              onChange={handleInputValues}
              value={grade.minScore}
              required
              className="textField"
              sx={{
                "&:hover": {
                  borderColor: "none",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
            <CustomTextField
              fullWidth
              label="Max Score"
              name="maxScore"
              onChange={handleInputValues}
              value={grade.maxScore}
              required
              className="textField"
              sx={{
                "&:hover": {
                  borderColor: "none",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
            <CustomTextField
              fullWidth
              label="Grade"
              name="grade"
              onChange={handleInputValues}
              value={grade.grade}
              required
              className="textField"
              sx={{
                "&:hover": {
                  borderColor: "none",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
            <CustomTextField
              fullWidth
              label="Remark"
              name="remark"
              onChange={handleInputValues}
              value={grade.remark}
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
          {loadingComplete === null && "Add Grade"}
        </Button>
      </Box>
    </Box>
  );
}
