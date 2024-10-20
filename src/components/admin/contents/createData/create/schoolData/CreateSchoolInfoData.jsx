import React, { useEffect, useRef, useState } from "react";
import "./createSchoolData.scss";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Editor } from "@tinymce/tinymce-react";
// import { useDispatch, useSelector } from "react-redux";
import Modal from "./modal/Modal";
import { useNavigate } from "react-router-dom";
// import LoadingProgress from "../../pageLoading/LoadingProgress";
import { toast } from "react-toastify";
import { Box, Grid } from "@mui/material";
import {
  ContainerBox,
  CustomTextField,
} from "../../../../../../muiStyling/muiStyling";

export function CreateSchoolInfoData() {
  const allSensecDatas = [];
  console.log(allSensecDatas);
  // const {
  //   successMessage,
  //   errorMessage,
  //   addSchoolStatus,
  //   fetchSchoolDataStatus,
  //   fetchSuccessMessage,
  //   fetchErrorMessage,
  // } = useSelector((state) => state.sensecData);
  const nameOfSchool = localStorage.getItem("nameOfSchool");
  const sloganOfSchool = localStorage.getItem("sloganOfSchool");
  const greetingsOfSchool = localStorage.getItem("greetingsOfSchool");
  const anthemText = localStorage.getItem("anthemText");
  const visionText = localStorage.getItem("visionText");
  const missionText = localStorage.getItem("missionText");
  const coreValuesText = localStorage.getItem("coreValuesText");
  const historyText = localStorage.getItem("historyText");
  console.log(nameOfSchool);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const tinyMCEKey = import.meta.env.VITE_APP_TINYMCE_KEY;
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [loadLogo, setLoadLogo] = useState("");
  const [anthemPreview, setAnthemPreview] = useState(false);
  const [visionPreview, setVisionPreview] = useState(false);
  const [missionPreview, setMissionPreview] = useState(false);
  const [coreValuesPreview, setCoreValuesPreview] = useState(false);
  const [historyPreview, setHistoryPreview] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [emptyAnthemError, setEmptyAnthemError] = useState("");
  const [emptyVisionError, setEmptyVisionError] = useState("");
  const [emptyMissionError, setEmptyMissionError] = useState("");
  const [emptyCoreValuesError, setEmptyCoreValuesError] = useState("");
  const [emptyHistoryError, setEmptyHistoryError] = useState("");
  console.log(emptyAnthemError);
  //TINYMCE Editr ref
  const editorRef = useRef(null);
  const [schoolData, setSchoolData] = useState({
    name: nameOfSchool ? nameOfSchool : "",
    slogan: sloganOfSchool ? sloganOfSchool : "",
    greetings: greetingsOfSchool ? greetingsOfSchool : "",
    logo: "",
    anthem: anthemText ? anthemText : "",
    vision: visionText ? visionText : "",
    mission: missionText ? missionText : "",
    coreValues: coreValuesText ? coreValuesText : "",
    history: historyText ? historyText : "",
  });

  const handleInputValue = (e) => {
    setSchoolData({
      ...schoolData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "nameofSchool") {
      localStorage.setItem("nameofSchool", e.target.value);
    }
    if (e.target.name === "slogan") {
      localStorage.setItem("sloganofSchool", e.target.value);
    }
    if (e.target.name === "greetings") {
      localStorage.setItem("greetingsofSchool", e.target.value);
    }
  };
  // console.log(schoolData);

  const handleLogoFileUpload = (e) => {
    if (e.target.files.length !== 0) {
      setSchoolData({ ...schoolData, [e.target.name]: e.target.files[0] });
    }
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setLoadLogo(reader.result);
    };
  };

  const canCreate = schoolData?.logo;
  const createSchoolData = (e) => {
    e.preventDefault();
    if (allSensecDatas && allSensecDatas.length === 1) {
      toast.error("School Data Already Created! You Can Only Update!", {
        position: "top-right",
        theme: "light",
        // toastId: successId,
      });
      return;
    }
    if (!schoolData.logo) {
      toast.error("Please upload school logo!", {
        position: "top-right",
        theme: "light",
        // toastId: successId,
      });
      return;
    }
    // dispatch(
    //   addSchoolData({
    //     name: schoolData.nameOfSchool,
    //     greetings: schoolData.greetings,
    //     slogan: schoolData.slogan,
    //     logo: loadLogo,
    //     anthem: schoolData.anthem,
    //     vision: schoolData.vision,
    //     mission: schoolData.mission,
    //     coreValues: schoolData.coreValues,
    //     history: schoolData.history,
    //   })
    // );
    // dispatch(addSchoolData(formData));
    // setSchoolData({});
    // setLoadLogo("");
    // setAnthemBody(localStorage.setItem("anthemText", ""));
    // setVisionBody(localStorage.setItem("visionText", ""));
    // setHistoryBody(localStorage.setItem("historyText", ""));
  };

  // useEffect(() => {
  //   if (anthemText) {
  //     setEmptyAnthemError("");
  //   }
  //   if (visionText) {
  //     setEmptyVisionError("");
  //   }
  //   if (historyText) {
  //     setEmptyHistoryError("");
  //   }
  // }, [anthemText, visionText, historyText]);

  // useEffect(() => {
  //   dispatch(fetchAllSchoolDatas());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (addSchoolStatus === "pending") {
  //     setLoadingComplete(false);
  //     setTimeout(() => {
  //       setLoadingComplete(true);
  //     }, 3000);
  //   }
  //   if (addSchoolStatus === "rejected") {
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //     }, 3000);
  //     setTimeout(() => {
  //       errorMessage?.errorMessage?.message?.map((err) =>
  //         toast.error(err, {
  //           position: "top-right",
  //           theme: "light",
  //           // toastId: successId,
  //         })
  //       );
  //     }, 2000);
  //     return;
  //   }
  //   if (addSchoolStatus === "success") {
  //     setTimeout(() => {
  //       setLoadLogo("");
  //       localStorage.removeItem("nameOfSchool");
  //       localStorage.removeItem("sloganOfSchool");
  //       localStorage.removeItem("greetingsOfSchool");
  //       localStorage.removeItem("anthemText");
  //       localStorage.removeItem("visionText");
  //       localStorage.removeItem("missionText");
  //       localStorage.removeItem("coreValuesText");
  //       localStorage.removeItem("historyText");
  //       window.location.reload();
  //       setLoadingComplete(null);
  //     }, 6000);
  //   }
  // }, [
  //   navigate,
  //   dispatch,
  //   addSchoolStatus,
  //   errorMessage,
  //   successMessage,
  //   loadingComplete,
  // ]);

  return (
    <ContainerBox className="schoolDataCont">
      <Box
        sx={{
          width: { xs: "100%", sm: "95%", md: "80%", lg: "70%", xl: "55%" },
          // padding: "1rem .5rem",
        }}
        className="schoolDataWrap"
      >
        <h1>Create School Data</h1>
        <form onSubmit={createSchoolData}>
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
                    <img
                      className="logoImg"
                      src={!loadLogo ? "/assets/noAvatar.png" : loadLogo}
                      alt="school logo"
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
                      label="Enter name of school"
                      name="name"
                      onChange={(e) => {
                        setSchoolData({ name: e?.target?.value });
                        localStorage.setItem("nameOfSchool", e?.target?.value);
                      }}
                      value={nameOfSchool ? nameOfSchool : schoolData?.name}
                      required
                      // className="textField"
                      sx={{
                        "&:hover": {
                          borderColor: "none",
                        },
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
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </form>
        <Box className="anthemEditor">
          <Box className="preview">
            <h4>Anthem of the School</h4>
            <button
              onClick={() => {
                if (anthemText) {
                  setEmptyAnthemError("");
                  setOpenModal(
                    true,
                    setAnthemPreview(true),
                    setVisionPreview(false),
                    setMissionPreview(false),
                    setCoreValuesPreview(false),
                    setHistoryPreview(false)
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
        <Box className="visionEditor">
          <Box className="preview">
            <h4>Vision of the School</h4>
            <button
              onClick={() => {
                if (visionText) {
                  setEmptyVisionError("");
                  setOpenModal(
                    true,
                    setVisionPreview(
                      true,
                      setAnthemPreview(false),
                      setMissionPreview(false),
                      setCoreValuesPreview(false),
                      setHistoryPreview(false)
                    )
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
            value={schoolData?.vision}
            onEditorChange={(newText) => {
              setSchoolData({ vision: newText });
              localStorage.setItem("visionText", newText);
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
        <Box className="visionEditor">
          <Box className="preview">
            <h4>Mission of the School</h4>
            <button
              onClick={() => {
                if (visionText) {
                  setEmptyMissionError("");
                  setOpenModal(
                    true,
                    setMissionPreview(true),
                    setAnthemPreview(false),
                    setVisionPreview(false),
                    setCoreValuesPreview(false),
                    setHistoryPreview(false)
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
        <Box className="visionEditor">
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
                    setHistoryPreview(false)
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
        <Box className="historyEditor">
          <Box className="preview">
            <h4>History of the School</h4>
            <button
              onClick={() => {
                if (historyText) {
                  setEmptyHistoryError("");
                  setOpenModal(
                    true,
                    setHistoryPreview(
                      true,
                      setVisionPreview(false),
                      setAnthemPreview(false),
                      setMissionPreview(false),
                      setCoreValuesPreview(false)
                    )
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
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          anthemText={anthemText}
          visionText={visionText}
          missionText={missionText}
          coreValuesText={coreValuesText}
          historyText={historyText}
          anthem={anthemPreview}
          vision={visionPreview}
          mission={missionPreview}
          coreValues={coreValuesPreview}
          history={historyPreview}
        />
        <Box className="schDataBtn">
          <button
            disabled={!canCreate}
            onClick={(e) => createSchoolData(e)}
            type="submit"
          >
            {/* {loadingComplete === false && (
              <LoadingProgress color={"#fff"} size={"1.5rem"} />
            )}
            {loadingComplete && addSchoolStatus === "success" && (
              <>
                <span> Data Saved</span> <TaskAltIcon />
              </>
            )}
            {loadingComplete === null && "Create Data"} */}
            Create Data
          </button>
        </Box>
      </Box>
    </ContainerBox>
  );
}
