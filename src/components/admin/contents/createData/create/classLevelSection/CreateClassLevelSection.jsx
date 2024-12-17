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

export function CreateClassLevelSection() {
  const authAdmin = useSelector(getAuthUser);
  const allClassLevels = FetchAllClassLevels();
  const allProgrammes = FetchAllProgrammes();
  const allDivisionProgrammes = useSelector(getAllDivisionProgrammes);
  const { error, successMessage, createStatus } = useSelector(
    (state) => state.classSection
  );
  const allTeachers = [];
  console.log(allTeachers);
  console.log(allClassLevels);
  console.log(allProgrammes);

  const dispatch = useDispatch();
  const [loadingComplete, setLoadingComplete] = useState(null);

  const [classSection, setClassSection] = useState({
    sectionName: "",
    classLevelId: "",
    programId: "",
    divisionProgramId: "",
    createdBy: `${authAdmin.id}`,
  });
  console.log(classSection);
  // Find class-level
  const classLevelFound = allClassLevels?.find(
    (cLevel) => cLevel && cLevel?._id === classSection?.classLevelId
  );

  const canSave =
    Boolean(classSection.sectionName) &&
    Boolean(classSection.classLevelId) &&
    Boolean(classSection.programId);
  // Boolean(currentTeacherValue);

  const handleClassSection = (e) => {
    e.preventDefault();
    const data = {
      sectionName: classSection?.sectionName,
      classLevelId: classSection?.classLevelId,
      classLevelName: classLevelFound?.name,
      programId: classSection?.programId,
      divisionProgramId: classSection?.divisionProgramId,
      createdBy: classSection.createdBy,
    };
    dispatch(createClassLevelSection({ data }));
  };
  const handleInputValues = (e) => {
    const { name, value } = e.target;
    setClassSection({
      ...classSection,
      [name]: value,
    });
  };

  // Fetch division programs
  useEffect(() => {
    if (classSection?.programId) {
      dispatch(
        fetchAllDivisionProgrammes({ programId: classSection?.programId })
      );
    }
  }, [dispatch, classSection]);
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
        setClassSection({
          sectionName: "",
          classLevelId: "",
          programId: "",
          divisionProgramId: "",
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
      <Box
        component={"form"}
        onSubmit={handleClassSection}
        minHeight={220}
        p={2}
      >
        <h1>Class Section Form</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
            <CustomTextField
              fullWidth
              label="Section Name"
              name="sectionName"
              onChange={handleInputValues}
              value={classSection.sectionName}
              required
              className="textField"
              sx={{
                "&:hover": {
                  borderColor: "none",
                },
              }}
            />
          </Grid>
          {/* Class Level Selection */}
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CustomTextField
              select
              fullWidth
              label="Class Level"
              name="classLevelId"
              value={classSection?.classLevelId}
              onChange={handleInputValues}
              required
            >
              {allClassLevels?.map((cLevel) => (
                <MenuItem key={cLevel?._id} value={cLevel?._id}>
                  {cLevel?.name}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
          {/* Programme Selection */}
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <CustomTextField
              select
              fullWidth
              label="Select Programme"
              name="programId"
              value={classSection?.programId}
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
          {/* Division Program (conditional) */}
          {allDivisionProgrammes && allDivisionProgrammes?.length > 0 && (
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <CustomTextField
                select
                fullWidth
                label="Division Program"
                name="divisionProgramId"
                value={classSection?.divisionProgramId}
                onChange={handleInputValues}
              >
                {allDivisionProgrammes?.map((programme) => (
                  <MenuItem key={programme?._id} value={programme?._id}>
                    {programme?.divisionName}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
          )}
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
          {loadingComplete === null && "Create Class Section"}
        </Button>
      </Box>
    </Box>
  );
}
