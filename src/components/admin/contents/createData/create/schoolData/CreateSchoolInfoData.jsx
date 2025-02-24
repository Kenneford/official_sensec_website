import React, { useEffect, useRef, useState } from "react";
import "./createSchoolData.scss";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./modal/Modal";
import { useNavigate } from "react-router-dom";
// import LoadingProgress from "../../pageLoading/LoadingProgress";
import { toast } from "react-toastify";
import { Avatar, Box, Button, Grid } from "@mui/material";
import {
  ContainerBox,
  CustomTextField,
} from "../../../../../../muiStyling/muiStyling";
import {
  addSchoolData,
  resetAddSchoolData,
  resetUpdateSchoolDataState,
  updateSchoolData,
} from "../../../../../../features/schoolDataSlice/schoolDataSlice";
import LoadingProgress from "../../../../../pageLoading/LoadingProgress";
import { Save, TaskAlt } from "@mui/icons-material";
import SmallFooter from "../../../../../footer/SmallFooter";
import { FetchSensecSchoolData } from "../../../../../../data/blogs/FetchSensecSchoolData";
import { getAuthUser } from "../../../../../../features/auth/authSlice";
import PageLoading from "../../../../../pageLoading/PageLoading";

export function CreateSchoolInfoData() {
  const authUser = useSelector(getAuthUser);
  const sensecSchoolDataObject = FetchSensecSchoolData();
  const {
    successMessage,
    error,
    addSchoolStatus,
    updateSchoolStatus,
    fetchSchoolDataStatus,
    fetchSuccessMessage,
    fetchErrorMessage,
  } = useSelector((state) => state.schoolData);
  const nameOfSchool = localStorage.getItem("nameOfSchool");
  const sloganOfSchool = localStorage.getItem("sloganOfSchool");
  const greetingsOfSchool = localStorage.getItem("greetingsOfSchool");
  const anthemText = localStorage.getItem("anthemText");
  const visionText = localStorage.getItem("visionText");
  const missionText = localStorage.getItem("missionText");
  const coreValuesText = localStorage.getItem("coreValuesText");
  const historyText = localStorage.getItem("historyText");
  const whoWeAreText = localStorage.getItem("whoWeAreText");
  const academicExcellenceText = localStorage.getItem("academicExcellenceText");
  const achievementText = localStorage.getItem("achievementText");
  const updateSensecSchoolData = localStorage.getItem("updateSensecSchoolData");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tinyMCEKey = import.meta.env.VITE_APP_TINYMCE_KEY;
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [loadLogo, setLoadLogo] = useState("");
  const [updateLogo, setUpdateLogo] = useState("");
  const [whoWeArePreview, setWhoWeArePreview] = useState(false);
  const [academicExcellencePreview, setAcademicExcellencePreview] =
    useState(false);
  const [anthemPreview, setAnthemPreview] = useState(false);
  const [visionPreview, setVisionPreview] = useState(false);
  const [missionPreview, setMissionPreview] = useState(false);
  const [coreValuesPreview, setCoreValuesPreview] = useState(false);
  const [historyPreview, setHistoryPreview] = useState(false);
  const [achievementPreview, setAchievementPreview] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [emptyAchievementError, setEmptyAchievementError] = useState("");
  const [emptyWhoWeAreError, setEmptyWhoWeAreError] = useState("");
  const [emptyAnthemError, setEmptyAnthemError] = useState("");
  const [emptyVisionError, setEmptyVisionError] = useState("");
  const [emptyMissionError, setEmptyMissionError] = useState("");
  const [emptyCoreValuesError, setEmptyCoreValuesError] = useState("");
  const [emptyHistoryError, setEmptyHistoryError] = useState("");
  const [emptyAcademicExcellenceError, setEmptyAcademicExcellenceError] =
    useState("");

  // School data update state
  const [sensecSchoolData, setSensecSchoolData] = useState(null);
  const [foundSchoolData, setFoundSchoolData] = useState(null);
  const [currentUpdate, setCurrentUpdate] = useState("");
  console.log("sensecSchoolDataObject: ", sensecSchoolDataObject);
  console.log("sensecSchoolData: ", sensecSchoolData);
  console.log("foundSchoolData: ", foundSchoolData);

  //TINYMCE Editr ref
  const editorRef = useRef(null);
  const [schoolData, setSchoolData] = useState();
  console.log(schoolData);

  // Handle input value change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle nested fields like "personalInfo.lastName"
    if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");
      setSensecSchoolData((prevStudent) => ({
        ...prevStudent,
        [parentKey]: {
          ...prevStudent[parentKey],
          [childKey]: value,
        },
      }));
    } else {
      // Handle top-level fields
      setSensecSchoolData((prevStudent) => ({
        ...prevStudent,
        [name]: value,
      }));
    }
  };

  const handleLogoFileUpload = (e) => {
    if (e.target.files.length !== 0) {
      setSchoolData({ ...schoolData, [e.target.name]: e.target.files[0] });
    }
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setLoadLogo(reader.result);
        localStorage.setItem("sensecLogo", reader.result);
      };
    }
  };
  const handleUpdateLogoFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setUpdateLogo(reader.result);
      };
    }
  };

  const canCreate = Boolean(loadLogo);
  // Handle create school data
  const createSchoolData = (e) => {
    e.preventDefault();
    const data = {
      nameOfSchool: schoolData.nameOfSchool,
      greetings: schoolData.greetings,
      slogan: schoolData.slogan,
      schoolLogo: loadLogo ? loadLogo : null,
      whoWeAre: schoolData.whoWeAre,
      academicExcellence: schoolData.academicExcellence,
      anthem: schoolData.anthem,
      achievementText: schoolData.achievementText,
      visionStatement: schoolData.visionStatement,
      mission: schoolData.mission,
      coreValues: schoolData.coreValues,
      history: schoolData.history,
    };
    dispatch(addSchoolData(data));
  };

  // Reinitialize state with sensecSchoolDataObject
  useEffect(() => {
    const dataFound = sensecSchoolDataObject[0];
    if (dataFound) {
      const matchingSchoolData = sensecSchoolDataObject?.find(
        (data) => data?._id === dataFound?._id
      );
      setFoundSchoolData(matchingSchoolData);
      // const formattedSchoolData = {
      //   ...dataFound,
      //   visionStatement: dataFound?.schoolVision?.visionStatement,
      //   mission: dataFound?.schoolVision?.missionStatement,
      //   achievementText: dataFound?.achievements?.text,
      //   coreValues: dataFound?.schoolVision?.coreValues,
      // };
      setSensecSchoolData(dataFound);
    }
  }, [sensecSchoolDataObject]);

  useEffect(() => {
    // Set logo to local storage
    const sensecLogo = localStorage.getItem("sensecLogo");
    if (sensecLogo) {
      setLoadLogo(sensecLogo);
    }
    // return () => {
    //   if (updateSensecSchoolData) {
    //     localStorage.removeItem("updateSensecSchoolData");
    //   }
    // };
  }, []);
  // Set School data state
  useEffect(() => {
    setSchoolData({
      nameOfSchool: nameOfSchool ? nameOfSchool : "",
      slogan: sloganOfSchool ? sloganOfSchool : "",
      greetings: greetingsOfSchool ? greetingsOfSchool : "",
      schoolLogo: loadLogo ? loadLogo : null,
      whoWeAre: whoWeAreText ? whoWeAreText : "",
      academicExcellence: academicExcellenceText ? academicExcellenceText : "",
      anthem: anthemText ? anthemText : "",
      visionStatement: visionText ? visionText : "",
      mission: missionText ? missionText : "",
      achievementText: achievementText ? achievementText : "",
      coreValues: coreValuesText ? coreValuesText : "",
      history: historyText ? historyText : "",
    });
  }, [
    nameOfSchool,
    sloganOfSchool,
    greetingsOfSchool,
    loadLogo,
    whoWeAreText,
    academicExcellenceText,
    anthemText,
    visionText,
    missionText,
    achievementText,
    coreValuesText,
    historyText,
  ]);
  // Handle input errors
  useEffect(() => {
    if (anthemText) {
      setEmptyAnthemError("");
    }
    if (visionText) {
      setEmptyVisionError("");
    }
    if (historyText) {
      setEmptyHistoryError("");
    }
    if (whoWeAreText) {
      setEmptyWhoWeAreError("");
    }
    if (academicExcellenceText) {
      setEmptyAcademicExcellenceError("");
    }
    if (missionText) {
      setEmptyMissionError("");
    }
    if (coreValuesText) {
      setEmptyCoreValuesError("");
    }
  }, [
    whoWeAreText,
    academicExcellenceText,
    anthemText,
    visionText,
    missionText,
    coreValuesText,
    historyText,
  ]);
  // Add school data status check
  useEffect(() => {
    if (addSchoolStatus === "pending") {
      setLoadingComplete(false);
    }
    if (addSchoolStatus === "rejected") {
      setTimeout(() => {
        setLoadingComplete(null);
        dispatch(resetAddSchoolData());
      }, 3000);
      setTimeout(() => {
        error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "light",
            // toastId: successId,
          })
        );
      }, 2000);
      return;
    }
    if (addSchoolStatus === "success") {
      setTimeout(() => {
        setLoadingComplete(true);
        toast.success(successMessage, {
          position: "top-right",
          theme: "dark",
          toastId: successMessage,
        });
      }, 3000);
      // Reset State
      setTimeout(() => {
        // setLoadLogo("");
        // localStorage.removeItem("nameOfSchool");
        // localStorage.removeItem("sloganOfSchool");
        // localStorage.removeItem("greetingsOfSchool");
        // localStorage.removeItem("anthemText");
        // localStorage.removeItem("visionText");
        // localStorage.removeItem("missionText");
        // localStorage.removeItem("coreValuesText");
        // localStorage.removeItem("historyText");
        // localStorage.removeItem("whoWeAreText");
        // localStorage.removeItem("academicExcellenceText");
        // window.location.reload();
        setLoadingComplete(null);
        dispatch(resetAddSchoolData());
      }, 6000);
    }
  }, [navigate, dispatch, addSchoolStatus, error, successMessage]);
  // Update school data status check
  useEffect(() => {
    if (updateSensecSchoolData) {
      if (updateSchoolStatus === "pending") {
        setLoadingComplete(false);
      }
      if (updateSchoolStatus === "rejected") {
        setTimeout(() => {
          setLoadingComplete(null);
          dispatch(resetUpdateSchoolDataState());
        }, 3000);
        setTimeout(() => {
          error?.errorMessage?.message?.map((err) =>
            toast.error(err, {
              position: "top-right",
              theme: "light",
              // toastId: successId,
            })
          );
        }, 2000);
        return;
      }
      if (updateSchoolStatus === "success") {
        setTimeout(() => {
          setLoadingComplete(true);
          toast.success(successMessage, {
            position: "top-right",
            theme: "dark",
            toastId: successMessage,
          });
        }, 3000);
        // Reset State
        setTimeout(() => {
          // setLoadLogo("");
          // localStorage.removeItem("nameOfSchool");
          // localStorage.removeItem("sloganOfSchool");
          // localStorage.removeItem("greetingsOfSchool");
          // localStorage.removeItem("anthemText");
          // localStorage.removeItem("visionText");
          // localStorage.removeItem("missionText");
          // localStorage.removeItem("coreValuesText");
          // localStorage.removeItem("historyText");
          // localStorage.removeItem("whoWeAreText");
          // localStorage.removeItem("academicExcellenceText");
          // window.location.reload();
          setLoadingComplete(null);
          setCurrentUpdate("");
          dispatch(resetUpdateSchoolDataState());
        }, 6000);
      }
    }
  }, [
    dispatch,
    updateSchoolStatus,
    error,
    successMessage,
    updateSensecSchoolData,
  ]);

  return (
    <>
      {!updateSensecSchoolData ? (
        <ContainerBox
          className="schoolDataCont"
          sx={{
            width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "60%" },
            padding: "1rem .5rem",
            margin: "auto",
          }}
        >
          <Box className="schoolDataWrap">
            <h1>Create School Data</h1>
            <Box className="form">
              <Box className="topSchData">
                <Grid
                  container
                  spacing={1}
                  direction={{
                    xs: "row", // Reverse rows on extra-small screens (mobile)
                    sm: "row-reverse", // Default row direction on small screens (tablets)
                    // md: "row", // Reverse rows on medium screens (desktops)
                  }}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    className="logoFile"
                    sx={{
                      display: "flex",
                      justifyContent: { xs: "center", sm: "flex-end" },
                    }}
                  >
                    <Box className="logoUploadWrap">
                      <label htmlFor="logo" className="logoUpload">
                        <Avatar
                          // className="logoImg"
                          src={!loadLogo ? "/assets/noAvatar.png" : loadLogo}
                          alt="Sensec Logo"
                          sx={{
                            width: { xs: "3.5rem", sm: "5rem" },
                            height: { xs: "3.5rem", sm: "5rem" },
                            objectFit: "cover",
                          }}
                        />
                      </label>
                    </Box>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      onChange={handleLogoFileUpload}
                      name="logo"
                      id="logo"
                      accept=".png,.jpeg,.jpg"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} className="topInputs">
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={12}
                        // sm={6}
                        // md={6}
                        // lg={6}
                        // className="topInputs"
                      >
                        <CustomTextField
                          fullWidth
                          size="small"
                          label="Enter name of school"
                          name="name"
                          onChange={(e) => {
                            setSchoolData({ name: e?.target?.value });
                            localStorage.setItem(
                              "nameOfSchool",
                              e?.target?.value
                            );
                          }}
                          value={
                            nameOfSchool
                              ? nameOfSchool
                              : schoolData?.nameOfSchool
                          }
                          required
                          // className="textField"
                          sx={{
                            "&:hover": {
                              borderColor: "none",
                            },
                            "& .MuiInputLabel-asterisk": {
                              color: schoolData?.nameOfSchool ? "green" : "red", // Change the asterisk color to red
                            },
                            fontSize: ".8em",
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        // className="topInputs"
                      >
                        <CustomTextField
                          fullWidth
                          size="small"
                          label="School Slogan"
                          name="slogan"
                          onChange={(e) => {
                            setSchoolData({ slogan: e?.target?.value });
                            localStorage.setItem(
                              "sloganOfSchool",
                              e?.target?.value
                            );
                          }}
                          value={
                            sloganOfSchool ? sloganOfSchool : schoolData?.slogan
                          }
                          required
                          // className="textField"
                          sx={{
                            "&:hover": {
                              borderColor: "none",
                            },
                            "& .MuiInputLabel-asterisk": {
                              color: schoolData?.slogan ? "green" : "red", // Change the asterisk color to red
                            },
                            fontSize: ".8em",
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        // className="topInputs"
                      >
                        <CustomTextField
                          fullWidth
                          size="small"
                          label="School greetings"
                          name="greetings"
                          onChange={(e) => {
                            setSchoolData({ greetings: e?.target?.value });
                            localStorage.setItem(
                              "greetingsOfSchool",
                              e?.target?.value
                            );
                          }}
                          value={
                            greetingsOfSchool
                              ? greetingsOfSchool
                              : schoolData?.greetings
                          }
                          required
                          // className="textField"
                          sx={{
                            "&:hover": {
                              borderColor: "none",
                            },
                            "& .MuiInputLabel-asterisk": {
                              color: schoolData?.greetings ? "green" : "red", // Change the asterisk color to red
                            },
                            fontSize: ".8em",
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box className="textEditorWrap">
              <Box className="preview">
                <h4>Who we are</h4>
                <button
                  onClick={() => {
                    if (whoWeAreText) {
                      setEmptyWhoWeAreError("");
                      setOpenModal(
                        true,
                        setWhoWeArePreview(true),
                        setAnthemPreview(false),
                        setVisionPreview(false),
                        setMissionPreview(false),
                        setCoreValuesPreview(false),
                        setHistoryPreview(false),
                        setAcademicExcellencePreview(false)
                      );
                    } else {
                      setEmptyWhoWeAreError("Who We Are Text Box Is Empty!");
                    }
                  }}
                >
                  Preview
                </button>
                {emptyWhoWeAreError && <p>{emptyWhoWeAreError}</p>}
              </Box>
              <Editor
                apiKey={tinyMCEKey}
                onInit={(evt, editor) => (editorRef.current = editor)}
                // initialValue={localStorage.getItem("myContentText")}
                value={schoolData?.whoWeAre}
                onEditorChange={(newText) => {
                  setSchoolData({ whoWeAre: newText });
                  localStorage.setItem("whoWeAreText", newText);
                }}
                init={{
                  height: 400,
                  // width: 500,
                  menubar: true,
                  // menu: {
                  //   favs: {
                  //     title: "My Favorites",
                  //     items: "code visualaid | searchreplace | emoticons",
                  //   },
                  // },
                  plugins: [
                    "advlist",
                    "autolink",
                    "link",
                    "image",
                    "lists",
                    "charmap",
                    "preview",
                    "anchor",
                    "pagebreak",
                    "searchreplace",
                    "wordcount",
                    "visualblocks",
                    "visualchars",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "emoticons",
                    "template",
                    "help",
                    "linkchecker",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | link image media | print preview | forecolor backcolor  emoticons " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  style_formats: [
                    {
                      title: "Blocks",
                      items: [
                        { title: "Box", format: "Box" },
                        { title: "Pre", format: "pre" },
                      ],
                    },
                  ],
                }}
              />
            </Box>
            <Box className="textEditorWrap">
              <Box className="preview">
                <h4>Academic Excellence</h4>
                <button
                  onClick={() => {
                    if (academicExcellenceText) {
                      setEmptyAcademicExcellenceError("");
                      setOpenModal(
                        true,
                        setAcademicExcellencePreview(true),
                        setAnthemPreview(false),
                        setWhoWeArePreview(false),
                        setVisionPreview(false),
                        setMissionPreview(false),
                        setCoreValuesPreview(false),
                        setHistoryPreview(false)
                      );
                    } else {
                      setEmptyAcademicExcellenceError(
                        "Academic Excellence Text Box Is Empty!"
                      );
                    }
                  }}
                >
                  Preview
                </button>
                {emptyAcademicExcellenceError && (
                  <p>{emptyAcademicExcellenceError}</p>
                )}
              </Box>
              <Editor
                apiKey={tinyMCEKey}
                onInit={(evt, editor) => (editorRef.current = editor)}
                // initialValue={localStorage.getItem("myContentText")}
                value={schoolData?.academicExcellence}
                onEditorChange={(newText) => {
                  setSchoolData({ academicExcellence: newText });
                  localStorage.setItem("academicExcellenceText", newText);
                }}
                init={{
                  height: 400,
                  // width: 500,
                  menubar: true,
                  // menu: {
                  //   favs: {
                  //     title: "My Favorites",
                  //     items: "code visualaid | searchreplace | emoticons",
                  //   },
                  // },
                  plugins: [
                    "advlist",
                    "autolink",
                    "link",
                    "image",
                    "lists",
                    "charmap",
                    "preview",
                    "anchor",
                    "pagebreak",
                    "searchreplace",
                    "wordcount",
                    "visualblocks",
                    "visualchars",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "emoticons",
                    "template",
                    "help",
                    "linkchecker",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | link image media | print preview | forecolor backcolor  emoticons " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  style_formats: [
                    {
                      title: "Blocks",
                      items: [
                        { title: "Box", format: "Box" },
                        { title: "Pre", format: "pre" },
                      ],
                    },
                  ],
                }}
              />
            </Box>
            <Box className="textEditorWrap">
              <Box className="preview">
                <h4>Anthem of the School</h4>
                <button
                  onClick={() => {
                    if (anthemText) {
                      setEmptyAnthemError("");
                      setOpenModal(
                        true,
                        setAnthemPreview(true),
                        setWhoWeArePreview(false),
                        setVisionPreview(false),
                        setMissionPreview(false),
                        setCoreValuesPreview(false),
                        setHistoryPreview(false),
                        setAcademicExcellencePreview(false)
                      );
                    } else {
                      setEmptyAnthemError("Anthem Text Box Is Empty!");
                    }
                  }}
                >
                  Preview
                </button>
                {emptyAnthemError && <p>{emptyAnthemError}</p>}
              </Box>
              <Editor
                apiKey={tinyMCEKey}
                onInit={(evt, editor) => (editorRef.current = editor)}
                // initialValue={localStorage.getItem("myContentText")}
                value={schoolData?.anthem}
                onEditorChange={(newText) => {
                  setSchoolData({ anthem: newText });
                  localStorage.setItem("anthemText", newText);
                }}
                init={{
                  height: 400,
                  // width: 500,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "link",
                    "image",
                    "lists",
                    "charmap",
                    "preview",
                    "anchor",
                    "pagebreak",
                    "searchreplace",
                    "wordcount",
                    "visualblocks",
                    "visualchars",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "emoticons",
                    "template",
                    "help",
                    "linkchecker",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | link image media | print preview | forecolor backcolor  emoticons " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  style_formats: [
                    {
                      title: "Blocks",
                      items: [
                        { title: "Box", format: "Box" },
                        { title: "Pre", format: "pre" },
                      ],
                    },
                  ],
                }}
              />
            </Box>
            <Box className="textEditorWrap">
              <Box className="preview">
                <h4>Vision of the School</h4>
                <button
                  onClick={() => {
                    if (visionText) {
                      setEmptyVisionError("");
                      setOpenModal(
                        true,
                        setVisionPreview(true),
                        setAnthemPreview(false),
                        setMissionPreview(false),
                        setCoreValuesPreview(false),
                        setHistoryPreview(false),
                        setAcademicExcellencePreview(false),
                        setWhoWeArePreview(false)
                      );
                    } else {
                      setEmptyVisionError("Vision Text Box Is Empty!");
                    }
                  }}
                >
                  Preview
                </button>
                {emptyVisionError && <p>{emptyVisionError}</p>}
              </Box>
              <Editor
                apiKey={tinyMCEKey}
                onInit={(evt, editor) => (editorRef.current = editor)}
                // initialValue={localStorage.getItem("myContentText")}
                value={schoolData?.visionStatement}
                onEditorChange={(newText) => {
                  setSchoolData({ vision: newText });
                  localStorage.setItem("visionText", newText);
                }}
                init={{
                  height: 400,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "link",
                    "image",
                    "lists",
                    "charmap",
                    "preview",
                    "anchor",
                    "pagebreak",
                    "searchreplace",
                    "wordcount",
                    "visualblocks",
                    "visualchars",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "emoticons",
                    "template",
                    "help",
                    "linkchecker",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | link image media | print preview | forecolor backcolor  emoticons " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  style_formats: [
                    {
                      title: "Blocks",
                      items: [
                        { title: "Box", format: "Box" },
                        { title: "Pre", format: "pre" },
                      ],
                    },
                  ],
                }}
              />
            </Box>
            <Box className="textEditorWrap">
              <Box className="preview">
                <h4>Mission of the School</h4>
                <button
                  onClick={() => {
                    if (missionText) {
                      setEmptyMissionError("");
                      setOpenModal(
                        true,
                        setMissionPreview(true),
                        setAnthemPreview(false),
                        setVisionPreview(false),
                        setCoreValuesPreview(false),
                        setHistoryPreview(false),
                        setAcademicExcellencePreview(false),
                        setWhoWeArePreview(false)
                      );
                    } else {
                      setEmptyMissionError("Mission Text Box Is Empty!");
                    }
                  }}
                >
                  Preview
                </button>
                {emptyMissionError && <p>{emptyMissionError}</p>}
              </Box>
              <Editor
                apiKey={tinyMCEKey}
                onInit={(evt, editor) => (editorRef.current = editor)}
                // initialValue={localStorage.getItem("myContentText")}
                value={schoolData?.mission}
                onEditorChange={(newText) => {
                  setSchoolData({ mission: newText });
                  localStorage.setItem("missionText", newText);
                }}
                init={{
                  height: 400,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "link",
                    "image",
                    "lists",
                    "charmap",
                    "preview",
                    "anchor",
                    "pagebreak",
                    "searchreplace",
                    "wordcount",
                    "visualblocks",
                    "visualchars",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "emoticons",
                    "template",
                    "help",
                    "linkchecker",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | link image media | print preview | forecolor backcolor  emoticons " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  style_formats: [
                    {
                      title: "Blocks",
                      items: [
                        { title: "Box", format: "Box" },
                        { title: "Pre", format: "pre" },
                      ],
                    },
                  ],
                }}
              />
            </Box>
            <Box className="textEditorWrap">
              <Box className="preview">
                <h4>Core Values</h4>
                <button
                  onClick={() => {
                    if (visionText) {
                      setEmptyCoreValuesError("");
                      setOpenModal(
                        true,
                        setCoreValuesPreview(true),
                        setAnthemPreview(false),
                        setVisionPreview(false),
                        setMissionPreview(false),
                        setHistoryPreview(false),
                        setAcademicExcellencePreview(false),
                        setWhoWeArePreview(false)
                      );
                    } else {
                      setEmptyCoreValuesError("Vision Text Box Is Empty!");
                    }
                  }}
                >
                  Preview
                </button>
                {emptyCoreValuesError && <p>{emptyCoreValuesError}</p>}
              </Box>
              <Editor
                apiKey={tinyMCEKey}
                onInit={(evt, editor) => (editorRef.current = editor)}
                // initialValue={localStorage.getItem("myContentText")}
                value={schoolData?.coreValues}
                onEditorChange={(newText) => {
                  setSchoolData({ coreValues: newText });
                  localStorage.setItem("coreValuesText", newText);
                }}
                init={{
                  height: 400,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "link",
                    "image",
                    "lists",
                    "charmap",
                    "preview",
                    "anchor",
                    "pagebreak",
                    "searchreplace",
                    "wordcount",
                    "visualblocks",
                    "visualchars",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "emoticons",
                    "template",
                    "help",
                    "linkchecker",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | link image media | print preview | forecolor backcolor  emoticons " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  style_formats: [
                    {
                      title: "Blocks",
                      items: [
                        { title: "Box", format: "Box" },
                        { title: "Pre", format: "pre" },
                      ],
                    },
                  ],
                }}
              />
            </Box>
            <Box className="textEditorWrap">
              <Box className="preview">
                <h4>History of the School</h4>
                <button
                  onClick={() => {
                    if (historyText) {
                      setEmptyHistoryError("");
                      setOpenModal(
                        true,
                        setHistoryPreview(true),
                        setVisionPreview(false),
                        setAnthemPreview(false),
                        setMissionPreview(false),
                        setCoreValuesPreview(false),
                        setAcademicExcellencePreview(false),
                        setWhoWeArePreview(false)
                      );
                    } else {
                      setEmptyHistoryError("History Text Box Is Empty!");
                    }
                  }}
                >
                  Preview
                </button>
                {emptyHistoryError && <p>{emptyHistoryError}</p>}
              </Box>
              <Editor
                apiKey={tinyMCEKey}
                onInit={(evt, editor) => (editorRef.current = editor)}
                // initialValue={localStorage.getItem("myContentText")}
                value={schoolData?.history}
                onEditorChange={(newText) => {
                  setSchoolData({ history: newText });
                  localStorage.setItem("historyText", newText);
                }}
                init={{
                  height: 400,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "link",
                    "image",
                    "lists",
                    "charmap",
                    "preview",
                    "anchor",
                    "pagebreak",
                    "searchreplace",
                    "wordcount",
                    "visualblocks",
                    "visualchars",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "emoticons",
                    "template",
                    "help",
                    "linkchecker",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | link image media | print preview | forecolor backcolor  emoticons " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  style_formats: [
                    {
                      title: "Blocks",
                      items: [
                        { title: "Box", format: "Box" },
                        { title: "Pre", format: "pre" },
                      ],
                    },
                  ],
                }}
              />
            </Box>
            <Box className="textEditorWrap">
              <Box className="preview">
                <h4>Achievement Story</h4>
                <button
                  onClick={() => {
                    if (historyText) {
                      setEmptyAchievementError("");
                      setOpenModal(
                        true,
                        setAchievementPreview(true),
                        setHistoryPreview(false),
                        setVisionPreview(false),
                        setAnthemPreview(false),
                        setMissionPreview(false),
                        setCoreValuesPreview(false),
                        setAcademicExcellencePreview(false),
                        setWhoWeArePreview(false)
                      );
                    } else {
                      setEmptyAchievementError(
                        "Achievement Story Box Is Empty!"
                      );
                    }
                  }}
                >
                  Preview
                </button>
                {emptyAchievementError && <p>{emptyAchievementError}</p>}
              </Box>
              <Editor
                apiKey={tinyMCEKey}
                onInit={(evt, editor) => (editorRef.current = editor)}
                // initialValue={localStorage.getItem("myContentText")}
                value={schoolData?.achievementText}
                onEditorChange={(newText) => {
                  setSchoolData({ achievementText: newText });
                  localStorage.setItem("achievementText", newText);
                }}
                init={{
                  height: 400,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "link",
                    "image",
                    "lists",
                    "charmap",
                    "preview",
                    "anchor",
                    "pagebreak",
                    "searchreplace",
                    "wordcount",
                    "visualblocks",
                    "visualchars",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "emoticons",
                    "template",
                    "help",
                    "linkchecker",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | link image media | print preview | forecolor backcolor  emoticons " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  style_formats: [
                    {
                      title: "Blocks",
                      items: [
                        { title: "Box", format: "Box" },
                        { title: "Pre", format: "pre" },
                      ],
                    },
                  ],
                }}
              />
            </Box>
            <Modal
              open={openModal}
              onClose={() => setOpenModal(false)}
              anthemText={anthemText}
              visionText={visionText}
              missionText={missionText}
              coreValuesText={coreValuesText}
              historyText={historyText}
              whoWeAreText={whoWeAreText}
              academicExcellenceText={academicExcellenceText}
              achievementText={achievementText}
              anthem={anthemPreview}
              vision={visionPreview}
              mission={missionPreview}
              coreValues={coreValuesPreview}
              history={historyPreview}
              whoWeAre={whoWeArePreview}
              academicExcellence={academicExcellencePreview}
              achievements={achievementPreview}
            />
            {!updateSensecSchoolData && (
              <Box className="schDataBtn">
                <Button
                  size="small"
                  // fullWidth
                  disabled={!canCreate}
                  onClick={createSchoolData}
                  sx={{
                    backgroundColor: canCreate
                      ? "green"
                      : "#adacaccc !important",
                    borderRadius: ".4rem",
                    color: "#fff !important",
                    "&.Mui-disabled": {
                      cursor: "not-allowed", // Show not-allowed cursor
                      pointerEvents: "auto",
                    },
                    minHeight: "2.5rem",
                    marginTop: "1rem",
                    minWidth: "20%",
                  }}
                >
                  {loadingComplete === false && (
                    <LoadingProgress color={"#fff"} size={"1.5rem"} />
                  )}
                  {loadingComplete === true &&
                    addSchoolStatus === "success" && (
                      <>
                        <span>Data Saved</span> <TaskAlt />
                      </>
                    )}
                  {loadingComplete === null && "Create Data"}
                </Button>
              </Box>
            )}
          </Box>
        </ContainerBox>
      ) : (
        <ContainerBox
          className="schoolDataCont"
          sx={{
            width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "60%" },
            padding: "1rem .5rem",
            margin: "auto",
          }}
        >
          <Box className="schoolDataWrap">
            <h1>Update School Data</h1>
            <Box className="form">
              <Box className="topSchData">
                <Grid
                  container
                  spacing={1}
                  direction={{
                    xs: "row", // Reverse rows on extra-small screens (mobile)
                    sm: "row-reverse", // Default row direction on small screens (tablets)
                    // md: "row", // Reverse rows on medium screens (desktops)
                  }}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={6}
                    className="logoFile"
                    sx={{
                      display: "flex",
                      justifyContent: { xs: "center", sm: "flex-end" },
                    }}
                  >
                    <Box className="logoUploadWrap">
                      <label htmlFor="logo" className="logoUpload">
                        <Avatar
                          // className="logoImg"
                          src={
                            updateLogo
                              ? updateLogo
                              : sensecSchoolData?.schoolLogo?.url
                          }
                          alt="Sensec Logo"
                          sx={{
                            width: { xs: "3.5rem", sm: "5rem" },
                            height: { xs: "3.5rem", sm: "5rem" },
                            objectFit: "cover",
                          }}
                        />
                      </label>
                    </Box>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      onChange={handleUpdateLogoFileUpload}
                      name="logo"
                      id="logo"
                      accept=".png,.jpeg,.jpg"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} className="topInputs">
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box
                          id="editNameOfSchool"
                          position={"relative"}
                          display={"flex"}
                          alignItems={"center"}
                        >
                          <CustomTextField
                            fullWidth
                            size="small"
                            label="Enter name of school"
                            name="nameOfSchool"
                            value={sensecSchoolData?.nameOfSchool || ""}
                            onChange={handleInputChange}
                            // required
                            sx={{
                              "&:hover": {
                                borderColor: "none",
                              },
                              "& .MuiInputLabel-asterisk": {
                                color: schoolData?.nameOfSchool
                                  ? "green"
                                  : "red", // Change the asterisk color to red
                              },
                              fontSize: ".8em",
                              "& input": {
                                paddingRight: "30px", // Adjust space for the button
                              },
                            }}
                          />
                          {loadingComplete === false &&
                            currentUpdate === "Name of school" && (
                              <Box
                                sx={{
                                  position: "absolute",
                                  right: 5,
                                  color: "green",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  zIndex: 1,
                                  fontSize: "1em",
                                }}
                              >
                                <Box
                                  className="promotionSpinner"
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: ".8em",
                                    color: "#05b60e",
                                    fontWeight: "500",
                                  }}
                                >
                                  <span className="dot-ellipsis">
                                    <span className="dot">.</span>
                                    <span className="dot">.</span>
                                    <span className="dot">.</span>
                                  </span>
                                </Box>
                              </Box>
                            )}
                          {loadingComplete === true &&
                            currentUpdate === "Name of school" &&
                            updateSchoolStatus === "success" && (
                              <>
                                <TaskAlt
                                  sx={{
                                    position: "absolute",
                                    right: 5,
                                    color: "green",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    zIndex: 1,
                                    fontSize: "1em",
                                  }}
                                />
                              </>
                            )}
                          {loadingComplete === null &&
                            currentUpdate !== "Name of school" && (
                              <Save
                                titleAccess={
                                  foundSchoolData?.nameOfSchool ===
                                  sensecSchoolData?.nameOfSchool
                                    ? ""
                                    : "Save Changes"
                                }
                                onClick={() => {
                                  setCurrentUpdate("Name of school");
                                  if (
                                    foundSchoolData?.nameOfSchool !==
                                    sensecSchoolData?.nameOfSchool
                                  ) {
                                    const data = {
                                      nameOfSchool:
                                        sensecSchoolData?.nameOfSchool,
                                      lastUpdatedBy: authUser?.id,
                                      currentUpdate: "Name of school",
                                    };
                                    dispatch(updateSchoolData(data));
                                    // localStorage.removeItem(
                                    //   "updateSensecSchoolData"
                                    // );
                                  }
                                }}
                                sx={{
                                  position: "absolute",
                                  right: 5,
                                  borderRadius: "0 .4rem .4rem 0",
                                  color:
                                    foundSchoolData?.nameOfSchool ===
                                    sensecSchoolData?.nameOfSchool
                                      ? "grey"
                                      : "green",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  zIndex: 1,
                                  fontSize: "1em",
                                  "&:hover": {
                                    cursor:
                                      foundSchoolData?.nameOfSchool ===
                                      sensecSchoolData?.nameOfSchool
                                        ? "not-allowed"
                                        : "pointer",
                                  },
                                }}
                              />
                            )}
                          {loadingComplete !== null &&
                            currentUpdate !== "Name of school" && (
                              <Save
                                titleAccess={
                                  foundSchoolData?.nameOfSchool ===
                                  sensecSchoolData?.nameOfSchool
                                    ? ""
                                    : "Save Changes"
                                }
                                onClick={() => {
                                  setCurrentUpdate("Name of school");
                                  if (
                                    foundSchoolData?.nameOfSchool !==
                                    sensecSchoolData?.nameOfSchool
                                  ) {
                                    const data = {
                                      nameOfSchool:
                                        sensecSchoolData?.nameOfSchool,
                                      lastUpdatedBy: authUser?.id,
                                      currentUpdate,
                                    };
                                    dispatch(updateSchoolData(data));
                                    // localStorage.removeItem(
                                    //   "updateSensecSchoolData"
                                    // );
                                  }
                                }}
                                sx={{
                                  position: "absolute",
                                  right: 5,
                                  borderRadius: "0 .4rem .4rem 0",
                                  color:
                                    foundSchoolData?.nameOfSchool ===
                                    sensecSchoolData?.nameOfSchool
                                      ? "grey"
                                      : "green",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  zIndex: 1,
                                  fontSize: "1em",
                                  "&:hover": {
                                    cursor:
                                      foundSchoolData?.nameOfSchool ===
                                      sensecSchoolData?.nameOfSchool
                                        ? "not-allowed"
                                        : "pointer",
                                  },
                                }}
                              />
                            )}
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        // className="topInputs"
                      >
                        <Box
                          position={"relative"}
                          display={"flex"}
                          alignItems={"center"}
                        >
                          <CustomTextField
                            fullWidth
                            size="small"
                            label="School Slogan"
                            name="slogan"
                            value={sensecSchoolData?.slogan || ""}
                            onChange={handleInputChange}
                            // required
                            // className="textField"
                            sx={{
                              "&:hover": {
                                borderColor: "none",
                              },
                              "& .MuiInputLabel-asterisk": {
                                color: schoolData?.slogan ? "green" : "red", // Change the asterisk color to red
                              },
                              fontSize: ".8em",
                              "& input": {
                                paddingRight: "30px", // Adjust space for the button
                              },
                            }}
                          />
                          {loadingComplete === false &&
                            currentUpdate === "Slogan" && (
                              <Box
                                sx={{
                                  position: "absolute",
                                  right: 5,
                                  color: "green",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  zIndex: 1,
                                  fontSize: "1em",
                                }}
                              >
                                <Box
                                  className="promotionSpinner"
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: ".8em",
                                    color: "#05b60e",
                                    fontWeight: "500",
                                  }}
                                >
                                  <span className="dot-ellipsis">
                                    <span className="dot">.</span>
                                    <span className="dot">.</span>
                                    <span className="dot">.</span>
                                  </span>
                                </Box>
                              </Box>
                            )}
                          {loadingComplete === true &&
                            currentUpdate === "Slogan" &&
                            updateSchoolStatus === "success" && (
                              <>
                                <TaskAlt
                                  sx={{
                                    position: "absolute",
                                    right: 5,
                                    color: "green",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    zIndex: 1,
                                    fontSize: "1em",
                                  }}
                                />
                              </>
                            )}
                          {loadingComplete === null &&
                            currentUpdate !== "Slogan" && (
                              <Save
                                titleAccess={
                                  foundSchoolData?.slogan ===
                                  sensecSchoolData?.slogan
                                    ? ""
                                    : "Save Changes"
                                }
                                onClick={() => {
                                  setCurrentUpdate("Slogan");
                                  if (
                                    foundSchoolData?.slogan !==
                                    sensecSchoolData?.slogan
                                  ) {
                                    const data = {
                                      slogan: sensecSchoolData?.slogan,
                                      lastUpdatedBy: authUser?.id,
                                      currentUpdate: "Slogan",
                                    };
                                    dispatch(updateSchoolData(data));
                                    // localStorage.removeItem(
                                    //   "updateSensecSchoolData"
                                    // );
                                  }
                                }}
                                sx={{
                                  position: "absolute",
                                  right: 5,
                                  borderRadius: "0 .4rem .4rem 0",
                                  color:
                                    foundSchoolData?.slogan ===
                                    sensecSchoolData?.slogan
                                      ? "grey"
                                      : "green",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  zIndex: 1,
                                  fontSize: "1em",
                                  "&:hover": {
                                    cursor:
                                      foundSchoolData?.slogan ===
                                      sensecSchoolData?.slogan
                                        ? "not-allowed"
                                        : "pointer",
                                  },
                                }}
                              />
                            )}
                          {loadingComplete !== null &&
                            currentUpdate !== "Slogan" && (
                              <Save
                                titleAccess={
                                  foundSchoolData?.slogan ===
                                  sensecSchoolData?.slogan
                                    ? ""
                                    : "Save Changes"
                                }
                                onClick={() => {
                                  setCurrentUpdate("Slogan");
                                  if (
                                    foundSchoolData?.slogan !==
                                    sensecSchoolData?.slogan
                                  ) {
                                    const data = {
                                      slogan: sensecSchoolData?.slogan,
                                      lastUpdatedBy: authUser?.id,
                                      currentUpdate,
                                    };
                                    dispatch(updateSchoolData(data));
                                    // localStorage.removeItem(
                                    //   "updateSensecSchoolData"
                                    // );
                                  }
                                }}
                                sx={{
                                  position: "absolute",
                                  right: 5,
                                  borderRadius: "0 .4rem .4rem 0",
                                  color:
                                    foundSchoolData?.slogan ===
                                    sensecSchoolData?.slogan
                                      ? "grey"
                                      : "green",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  zIndex: 1,
                                  fontSize: "1em",
                                  "&:hover": {
                                    cursor:
                                      foundSchoolData?.slogan ===
                                      sensecSchoolData?.slogan
                                        ? "not-allowed"
                                        : "pointer",
                                  },
                                }}
                              />
                            )}
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        // className="topInputs"
                      >
                        <Box
                          id="editGreetingsOfSchool"
                          position={"relative"}
                          display={"flex"}
                          alignItems={"center"}
                        >
                          <CustomTextField
                            fullWidth
                            size="small"
                            label="School greetings"
                            name="greetings"
                            value={sensecSchoolData?.greetings || ""}
                            onChange={handleInputChange}
                            // required
                            // className="textField"
                            sx={{
                              "&:hover": {
                                borderColor: "none",
                              },
                              "& .MuiInputLabel-asterisk": {
                                color: schoolData?.greetings ? "green" : "red", // Change the asterisk color to red
                              },
                              fontSize: ".8em",
                              "& input": {
                                paddingRight: "30px", // Adjust space for the button
                              },
                            }}
                          />
                          {loadingComplete === false &&
                            currentUpdate === "Greetings" && (
                              <Box
                                sx={{
                                  position: "absolute",
                                  right: 5,
                                  color: "green",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  zIndex: 1,
                                  fontSize: "1em",
                                }}
                              >
                                <Box
                                  className="promotionSpinner"
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: ".8em",
                                    color: "#05b60e",
                                    fontWeight: "500",
                                  }}
                                >
                                  <span className="dot-ellipsis">
                                    <span className="dot">.</span>
                                    <span className="dot">.</span>
                                    <span className="dot">.</span>
                                  </span>
                                </Box>
                              </Box>
                            )}
                          {loadingComplete === true &&
                            currentUpdate === "Greetings" &&
                            updateSchoolStatus === "success" && (
                              <>
                                <TaskAlt
                                  sx={{
                                    position: "absolute",
                                    right: 5,
                                    color: "green",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    zIndex: 1,
                                    fontSize: "1em",
                                  }}
                                />
                              </>
                            )}
                          {loadingComplete === null &&
                            currentUpdate !== "Greetings" && (
                              <Save
                                titleAccess={
                                  foundSchoolData?.greetings ===
                                  sensecSchoolData?.greetings
                                    ? ""
                                    : "Save Changes"
                                }
                                onClick={() => {
                                  setCurrentUpdate("Greetings");
                                  if (
                                    foundSchoolData?.greetings !==
                                    sensecSchoolData?.greetings
                                  ) {
                                    const data = {
                                      greetings: sensecSchoolData?.greetings,
                                      lastUpdatedBy: authUser?.id,
                                      currentUpdate: "Greetings",
                                    };
                                    dispatch(updateSchoolData(data));
                                    // localStorage.removeItem(
                                    //   "updateSensecSchoolData"
                                    // );
                                  }
                                }}
                                sx={{
                                  position: "absolute",
                                  right: 5,
                                  borderRadius: "0 .4rem .4rem 0",
                                  color:
                                    foundSchoolData?.greetings ===
                                    sensecSchoolData?.greetings
                                      ? "grey"
                                      : "green",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  zIndex: 1,
                                  fontSize: "1em",
                                  "&:hover": {
                                    cursor:
                                      foundSchoolData?.greetings ===
                                      sensecSchoolData?.greetings
                                        ? "not-allowed"
                                        : "pointer",
                                  },
                                }}
                              />
                            )}
                          {loadingComplete !== null &&
                            currentUpdate !== "Greetings" && (
                              <Save
                                titleAccess={
                                  foundSchoolData?.greetings ===
                                  sensecSchoolData?.greetings
                                    ? ""
                                    : "Save Changes"
                                }
                                onClick={() => {
                                  setCurrentUpdate("Greetings");
                                  if (
                                    foundSchoolData?.greetings !==
                                    sensecSchoolData?.greetings
                                  ) {
                                    const data = {
                                      slogan: sensecSchoolData?.slogan,
                                      lastUpdatedBy: authUser?.id,
                                      currentUpdate,
                                    };
                                    dispatch(updateSchoolData(data));
                                    // localStorage.removeItem(
                                    //   "updateSensecSchoolData"
                                    // );
                                  }
                                }}
                                sx={{
                                  position: "absolute",
                                  right: 5,
                                  borderRadius: "0 .4rem .4rem 0",
                                  color:
                                    foundSchoolData?.greetings ===
                                    sensecSchoolData?.greetings
                                      ? "grey"
                                      : "green",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  zIndex: 1,
                                  fontSize: "1em",
                                  "&:hover": {
                                    cursor:
                                      foundSchoolData?.greetings ===
                                      sensecSchoolData?.greetings
                                        ? "not-allowed"
                                        : "pointer",
                                  },
                                }}
                              />
                            )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box className="textEditorWrap">
              <Box className="preview">
                <h4 id="editWhoWeAre">Who we are</h4>
                <button
                  onClick={() => {
                    if (whoWeAreText) {
                      setEmptyWhoWeAreError("");
                      setOpenModal(
                        true,
                        setWhoWeArePreview(true),
                        setAnthemPreview(false),
                        setVisionPreview(false),
                        setMissionPreview(false),
                        setCoreValuesPreview(false),
                        setHistoryPreview(false),
                        setAcademicExcellencePreview(false)
                      );
                    } else {
                      setEmptyWhoWeAreError("Who We Are Text Box Is Empty!");
                    }
                  }}
                >
                  Preview
                </button>
                {emptyWhoWeAreError && <p>{emptyWhoWeAreError}</p>}
              </Box>
              <Editor
                apiKey={tinyMCEKey}
                onInit={(evt, editor) => (editorRef.current = editor)}
                value={sensecSchoolData?.whoWeAre || ""}
                onEditorChange={(newText) => {
                  setSensecSchoolData({
                    ...sensecSchoolData,
                    whoWeAre: newText,
                  });
                }}
                init={{
                  height: 400,
                  // width: 500,
                  menubar: true,
                  // menu: {
                  //   favs: {
                  //     title: "My Favorites",
                  //     items: "code visualaid | searchreplace | emoticons",
                  //   },
                  // },
                  plugins: [
                    "advlist",
                    "autolink",
                    "link",
                    "image",
                    "lists",
                    "charmap",
                    "preview",
                    "anchor",
                    "pagebreak",
                    "searchreplace",
                    "wordcount",
                    "visualblocks",
                    "visualchars",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "emoticons",
                    "template",
                    "help",
                    "linkchecker",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | link image media | print preview | forecolor backcolor  emoticons " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  style_formats: [
                    {
                      title: "Blocks",
                      items: [
                        { title: "Box", format: "Box" },
                        { title: "Pre", format: "pre" },
                      ],
                    },
                  ],
                }}
              />
              <Button
                disabled={
                  foundSchoolData?.whoWeAre === sensecSchoolData?.whoWeAre
                }
                sx={{
                  textTransform: "capitalize",
                  backgroundColor:
                    foundSchoolData?.whoWeAre !== sensecSchoolData?.whoWeAre
                      ? "green"
                      : "#adacaccc !important",
                  borderRadius: ".4rem",
                  color: "#fff !important",
                  "&.Mui-disabled": {
                    cursor: "not-allowed", // Show not-allowed cursor
                    pointerEvents: "auto",
                  },
                  fontSize: ".8em",
                  "&:hover": {
                    bgcolor: "#019001",
                  },
                  maxHeight: "2rem",
                  mt: ".5rem",
                }}
              >
                Save Changes
              </Button>
            </Box>
            <Box className="textEditorWrap">
              <Box className="preview">
                <h4 id="editAcademicExcellence">Academic Excellence</h4>
                <button
                  onClick={() => {
                    if (academicExcellenceText) {
                      setEmptyAcademicExcellenceError("");
                      setOpenModal(
                        true,
                        setAcademicExcellencePreview(true),
                        setAnthemPreview(false),
                        setWhoWeArePreview(false),
                        setVisionPreview(false),
                        setMissionPreview(false),
                        setCoreValuesPreview(false),
                        setHistoryPreview(false)
                      );
                    } else {
                      setEmptyAcademicExcellenceError(
                        "Academic Excellence Text Box Is Empty!"
                      );
                    }
                  }}
                >
                  Preview
                </button>
                {emptyAcademicExcellenceError && (
                  <p>{emptyAcademicExcellenceError}</p>
                )}
              </Box>
              <Editor
                apiKey={tinyMCEKey}
                onInit={(evt, editor) => (editorRef.current = editor)}
                value={sensecSchoolData?.academicExcellence || ""}
                onEditorChange={(newText) => {
                  setSensecSchoolData({
                    ...sensecSchoolData,
                    academicExcellence: newText,
                  });
                }}
                init={{
                  height: 400,
                  // width: 500,
                  menubar: true,
                  // menu: {
                  //   favs: {
                  //     title: "My Favorites",
                  //     items: "code visualaid | searchreplace | emoticons",
                  //   },
                  // },
                  plugins: [
                    "advlist",
                    "autolink",
                    "link",
                    "image",
                    "lists",
                    "charmap",
                    "preview",
                    "anchor",
                    "pagebreak",
                    "searchreplace",
                    "wordcount",
                    "visualblocks",
                    "visualchars",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "emoticons",
                    "template",
                    "help",
                    "linkchecker",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | link image media | print preview | forecolor backcolor  emoticons " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  style_formats: [
                    {
                      title: "Blocks",
                      items: [
                        { title: "Box", format: "Box" },
                        { title: "Pre", format: "pre" },
                      ],
                    },
                  ],
                }}
              />
              <Button
                disabled={
                  foundSchoolData?.academicExcellence ===
                  sensecSchoolData?.academicExcellence
                }
                sx={{
                  textTransform: "capitalize",
                  backgroundColor:
                    foundSchoolData?.academicExcellence !==
                    sensecSchoolData?.academicExcellence
                      ? "green"
                      : "#adacaccc !important",
                  borderRadius: ".4rem",
                  color: "#fff !important",
                  "&.Mui-disabled": {
                    cursor: "not-allowed", // Show not-allowed cursor
                    pointerEvents: "auto",
                  },
                  fontSize: ".8em",
                  "&:hover": {
                    bgcolor: "#019001",
                  },
                  maxHeight: "2rem",
                  mt: ".5rem",
                }}
              >
                Save Changes
              </Button>
            </Box>
            <Box className="textEditorWrap">
              <Box className="preview">
                <h4 id="editAnthem">Anthem of the School</h4>
                <button
                  onClick={() => {
                    if (anthemText) {
                      setEmptyAnthemError("");
                      setOpenModal(
                        true,
                        setAnthemPreview(true),
                        setWhoWeArePreview(false),
                        setVisionPreview(false),
                        setMissionPreview(false),
                        setCoreValuesPreview(false),
                        setHistoryPreview(false),
                        setAcademicExcellencePreview(false)
                      );
                    } else {
                      setEmptyAnthemError("Anthem Text Box Is Empty!");
                    }
                  }}
                >
                  Preview
                </button>
                {emptyAnthemError && <p>{emptyAnthemError}</p>}
              </Box>
              <Editor
                apiKey={tinyMCEKey}
                onInit={(evt, editor) => (editorRef.current = editor)}
                // initialValue={localStorage.getItem("myContentText")}
                value={schoolData?.anthem}
                onEditorChange={(newText) => {
                  setSchoolData({ anthem: newText });
                  localStorage.setItem("anthemText", newText);
                }}
                init={{
                  height: 400,
                  // width: 500,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "link",
                    "image",
                    "lists",
                    "charmap",
                    "preview",
                    "anchor",
                    "pagebreak",
                    "searchreplace",
                    "wordcount",
                    "visualblocks",
                    "visualchars",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "emoticons",
                    "template",
                    "help",
                    "linkchecker",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | link image media | print preview | forecolor backcolor  emoticons " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  style_formats: [
                    {
                      title: "Blocks",
                      items: [
                        { title: "Box", format: "Box" },
                        { title: "Pre", format: "pre" },
                      ],
                    },
                  ],
                }}
              />
              <Button
                disabled={
                  foundSchoolData?.anthems === sensecSchoolData?.anthems
                }
                sx={{
                  textTransform: "capitalize",
                  backgroundColor:
                    foundSchoolData?.anthems !== sensecSchoolData?.anthems
                      ? "green"
                      : "#adacaccc !important",
                  borderRadius: ".4rem",
                  color: "#fff !important",
                  "&.Mui-disabled": {
                    cursor: "not-allowed", // Show not-allowed cursor
                    pointerEvents: "auto",
                  },
                  fontSize: ".8em",
                  "&:hover": {
                    bgcolor: "#019001",
                  },
                  maxHeight: "2rem",
                  mt: ".5rem",
                }}
              >
                Save Changes
              </Button>
            </Box>
            <Box className="textEditorWrap">
              <Box className="preview">
                <h4 id="editVisionOfSchool">Vision of the School</h4>
                <button
                  onClick={() => {
                    if (visionText) {
                      setEmptyVisionError("");
                      setOpenModal(
                        true,
                        setVisionPreview(true),
                        setAnthemPreview(false),
                        setMissionPreview(false),
                        setCoreValuesPreview(false),
                        setHistoryPreview(false),
                        setAcademicExcellencePreview(false),
                        setWhoWeArePreview(false)
                      );
                    } else {
                      setEmptyVisionError("Vision Text Box Is Empty!");
                    }
                  }}
                >
                  Preview
                </button>
                {emptyVisionError && <p>{emptyVisionError}</p>}
              </Box>
              <Editor
                apiKey={tinyMCEKey}
                onInit={(evt, editor) => (editorRef.current = editor)}
                value={sensecSchoolData?.schoolVision?.visionStatement || ""}
                onEditorChange={(newText) => {
                  setSensecSchoolData({
                    ...sensecSchoolData,
                    "sensecSchoolData?.schoolVision?.visionStatement": newText,
                  });
                }}
                init={{
                  height: 400,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "link",
                    "image",
                    "lists",
                    "charmap",
                    "preview",
                    "anchor",
                    "pagebreak",
                    "searchreplace",
                    "wordcount",
                    "visualblocks",
                    "visualchars",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "emoticons",
                    "template",
                    "help",
                    "linkchecker",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | link image media | print preview | forecolor backcolor  emoticons " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  style_formats: [
                    {
                      title: "Blocks",
                      items: [
                        { title: "Box", format: "Box" },
                        { title: "Pre", format: "pre" },
                      ],
                    },
                  ],
                }}
              />
              <Button
                disabled={
                  foundSchoolData?.schoolVision?.visionStatement ===
                  sensecSchoolData?.schoolVision?.visionStatement
                }
                sx={{
                  textTransform: "capitalize",
                  backgroundColor:
                    foundSchoolData?.schoolVision?.visionStatement !==
                    sensecSchoolData?.schoolVision?.visionStatement
                      ? "green"
                      : "#adacaccc !important",
                  borderRadius: ".4rem",
                  color: "#fff !important",
                  "&.Mui-disabled": {
                    cursor: "not-allowed", // Show not-allowed cursor
                    pointerEvents: "auto",
                  },
                  fontSize: ".8em",
                  "&:hover": {
                    bgcolor: "#019001",
                  },
                  maxHeight: "2rem",
                  mt: ".5rem",
                }}
              >
                Save Changes
              </Button>
            </Box>
            <Box className="textEditorWrap">
              <Box className="preview">
                <h4 id="editMissionOfSchool">Mission of the School</h4>
                <button
                  onClick={() => {
                    if (missionText) {
                      setEmptyMissionError("");
                      setOpenModal(
                        true,
                        setMissionPreview(true),
                        setAnthemPreview(false),
                        setVisionPreview(false),
                        setCoreValuesPreview(false),
                        setHistoryPreview(false),
                        setAcademicExcellencePreview(false),
                        setWhoWeArePreview(false)
                      );
                    } else {
                      setEmptyMissionError("Mission Text Box Is Empty!");
                    }
                  }}
                >
                  Preview
                </button>
                {emptyMissionError && <p>{emptyMissionError}</p>}
              </Box>
              <Editor
                apiKey={tinyMCEKey}
                onInit={(evt, editor) => (editorRef.current = editor)}
                value={sensecSchoolData?.schoolVision?.missionStatement || ""}
                onEditorChange={(newText) => {
                  setSensecSchoolData({
                    ...sensecSchoolData,
                    "sensecSchoolData.schoolVision.missionStatement": newText,
                  });
                }}
                init={{
                  height: 400,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "link",
                    "image",
                    "lists",
                    "charmap",
                    "preview",
                    "anchor",
                    "pagebreak",
                    "searchreplace",
                    "wordcount",
                    "visualblocks",
                    "visualchars",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "emoticons",
                    "template",
                    "help",
                    "linkchecker",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | link image media | print preview | forecolor backcolor  emoticons " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  style_formats: [
                    {
                      title: "Blocks",
                      items: [
                        { title: "Box", format: "Box" },
                        { title: "Pre", format: "pre" },
                      ],
                    },
                  ],
                }}
              />
              <Button
                disabled={
                  foundSchoolData?.schoolVision?.missionStatement ===
                  sensecSchoolData?.schoolVision?.missionStatement
                }
                sx={{
                  textTransform: "capitalize",
                  backgroundColor:
                    foundSchoolData?.schoolVision?.missionStatement !==
                    sensecSchoolData?.schoolVision?.missionStatement
                      ? "green"
                      : "#adacaccc !important",
                  borderRadius: ".4rem",
                  color: "#fff !important",
                  "&.Mui-disabled": {
                    cursor: "not-allowed", // Show not-allowed cursor
                    pointerEvents: "auto",
                  },
                  fontSize: ".8em",
                  "&:hover": {
                    bgcolor: "#019001",
                  },
                  maxHeight: "2rem",
                  mt: ".5rem",
                }}
              >
                Save Changes
              </Button>
            </Box>
            <Box className="textEditorWrap">
              <Box className="preview">
                <h4 id="editValuesOfSchool">Core Values</h4>
                <button
                  onClick={() => {
                    if (visionText) {
                      setEmptyCoreValuesError("");
                      setOpenModal(
                        true,
                        setCoreValuesPreview(true),
                        setAnthemPreview(false),
                        setVisionPreview(false),
                        setMissionPreview(false),
                        setHistoryPreview(false),
                        setAcademicExcellencePreview(false),
                        setWhoWeArePreview(false)
                      );
                    } else {
                      setEmptyCoreValuesError("Vision Text Box Is Empty!");
                    }
                  }}
                >
                  Preview
                </button>
                {emptyCoreValuesError && <p>{emptyCoreValuesError}</p>}
              </Box>
              <Editor
                apiKey={tinyMCEKey}
                onInit={(evt, editor) => (editorRef.current = editor)}
                value={sensecSchoolData?.schoolVision?.coreValues}
                onEditorChange={(newText) => {
                  setSensecSchoolData({
                    ...sensecSchoolData,
                    "sensecSchoolData.schoolVision.coreValues": newText,
                  });
                }}
                init={{
                  height: 400,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "link",
                    "image",
                    "lists",
                    "charmap",
                    "preview",
                    "anchor",
                    "pagebreak",
                    "searchreplace",
                    "wordcount",
                    "visualblocks",
                    "visualchars",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "emoticons",
                    "template",
                    "help",
                    "linkchecker",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | link image media | print preview | forecolor backcolor  emoticons " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  style_formats: [
                    {
                      title: "Blocks",
                      items: [
                        { title: "Box", format: "Box" },
                        { title: "Pre", format: "pre" },
                      ],
                    },
                  ],
                }}
              />
              <Button
                disabled={
                  foundSchoolData?.schoolVision?.coreValues ===
                  sensecSchoolData?.schoolVision?.coreValues
                }
                sx={{
                  textTransform: "capitalize",
                  backgroundColor:
                    foundSchoolData?.schoolVision?.coreValues !==
                    sensecSchoolData?.schoolVision?.coreValues
                      ? "green"
                      : "#adacaccc !important",
                  borderRadius: ".4rem",
                  color: "#fff !important",
                  "&.Mui-disabled": {
                    cursor: "not-allowed", // Show not-allowed cursor
                    pointerEvents: "auto",
                  },
                  fontSize: ".8em",
                  "&:hover": {
                    bgcolor: "#019001",
                  },
                  maxHeight: "2rem",
                  mt: ".5rem",
                }}
              >
                Save Changes
              </Button>
            </Box>
            <Box className="textEditorWrap">
              <Box className="preview">
                <h4 id="editHistoryOfSchool">History of the School</h4>
                <button
                  onClick={() => {
                    if (historyText) {
                      setEmptyHistoryError("");
                      setOpenModal(
                        true,
                        setHistoryPreview(true),
                        setVisionPreview(false),
                        setAnthemPreview(false),
                        setMissionPreview(false),
                        setCoreValuesPreview(false),
                        setAcademicExcellencePreview(false),
                        setWhoWeArePreview(false)
                      );
                    } else {
                      setEmptyHistoryError("History Text Box Is Empty!");
                    }
                  }}
                >
                  Preview
                </button>
                {emptyHistoryError && <p>{emptyHistoryError}</p>}
              </Box>
              <Editor
                apiKey={tinyMCEKey}
                onInit={(evt, editor) => (editorRef.current = editor)}
                value={sensecSchoolData?.history || ""}
                onEditorChange={(newText) => {
                  setSensecSchoolData({
                    ...sensecSchoolData,
                    history: newText,
                  });
                }}
                init={{
                  height: 400,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "link",
                    "image",
                    "lists",
                    "charmap",
                    "preview",
                    "anchor",
                    "pagebreak",
                    "searchreplace",
                    "wordcount",
                    "visualblocks",
                    "visualchars",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "emoticons",
                    "template",
                    "help",
                    "linkchecker",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | link image media | print preview | forecolor backcolor  emoticons " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  style_formats: [
                    {
                      title: "Blocks",
                      items: [
                        { title: "Box", format: "Box" },
                        { title: "Pre", format: "pre" },
                      ],
                    },
                  ],
                }}
              />
              <Button
                disabled={
                  foundSchoolData?.history === sensecSchoolData?.history
                }
                sx={{
                  textTransform: "capitalize",
                  backgroundColor:
                    foundSchoolData?.history !== sensecSchoolData?.history
                      ? "green"
                      : "#adacaccc !important",
                  borderRadius: ".4rem",
                  color: "#fff !important",
                  "&.Mui-disabled": {
                    cursor: "not-allowed", // Show not-allowed cursor
                    pointerEvents: "auto",
                  },
                  fontSize: ".8em",
                  "&:hover": {
                    bgcolor: "#019001",
                  },
                  maxHeight: "2rem",
                  mt: ".5rem",
                }}
              >
                Save Changes
              </Button>
            </Box>
            <Box className="textEditorWrap">
              <Box className="preview">
                <h4 id="editAchievementsOfSchool">Achievement Story</h4>
                <button
                  onClick={() => {
                    if (historyText) {
                      setEmptyAchievementError("");
                      setOpenModal(
                        true,
                        setAchievementPreview(true),
                        setHistoryPreview(false),
                        setVisionPreview(false),
                        setAnthemPreview(false),
                        setMissionPreview(false),
                        setCoreValuesPreview(false),
                        setAcademicExcellencePreview(false),
                        setWhoWeArePreview(false)
                      );
                    } else {
                      setEmptyAchievementError(
                        "Achievement Story Box Is Empty!"
                      );
                    }
                  }}
                >
                  Preview
                </button>
                {emptyAchievementError && <p>{emptyAchievementError}</p>}
              </Box>
              <Editor
                apiKey={tinyMCEKey}
                onInit={(evt, editor) => (editorRef.current = editor)}
                value={sensecSchoolData?.achievements.text || ""}
                onEditorChange={(newText) => {
                  setSensecSchoolData({
                    ...sensecSchoolData,
                    "achievements.text": newText,
                  });
                }}
                init={{
                  height: 400,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "link",
                    "image",
                    "lists",
                    "charmap",
                    "preview",
                    "anchor",
                    "pagebreak",
                    "searchreplace",
                    "wordcount",
                    "visualblocks",
                    "visualchars",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "emoticons",
                    "template",
                    "help",
                    "linkchecker",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | link image media | print preview | forecolor backcolor  emoticons " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  style_formats: [
                    {
                      title: "Blocks",
                      items: [
                        { title: "Box", format: "Box" },
                        { title: "Pre", format: "pre" },
                      ],
                    },
                  ],
                }}
              />
              <Button
                disabled={
                  foundSchoolData?.achievements.text ===
                  sensecSchoolData?.achievements.text
                }
                sx={{
                  textTransform: "capitalize",
                  backgroundColor:
                    foundSchoolData?.achievements.text !==
                    sensecSchoolData?.achievements.text
                      ? "green"
                      : "#adacaccc !important",
                  borderRadius: ".4rem",
                  color: "#fff !important",
                  "&.Mui-disabled": {
                    cursor: "not-allowed", // Show not-allowed cursor
                    pointerEvents: "auto",
                  },
                  fontSize: ".8em",
                  "&:hover": {
                    bgcolor: "#019001",
                  },
                  maxHeight: "2rem",
                  mt: ".5rem",
                }}
              >
                Save Changes
              </Button>
            </Box>
            <Modal
              open={openModal}
              onClose={() => setOpenModal(false)}
              anthemText={anthemText}
              visionText={visionText}
              missionText={missionText}
              coreValuesText={coreValuesText}
              historyText={historyText}
              whoWeAreText={whoWeAreText}
              academicExcellenceText={academicExcellenceText}
              achievementText={achievementText}
              anthem={anthemPreview}
              vision={visionPreview}
              mission={missionPreview}
              coreValues={coreValuesPreview}
              history={historyPreview}
              whoWeAre={whoWeArePreview}
              academicExcellence={academicExcellencePreview}
              achievements={achievementPreview}
            />
          </Box>
        </ContainerBox>
      )}
      <SmallFooter />
    </>
  );
}
