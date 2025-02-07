import {
  Box,
  Button,
  Container,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import "./modals.scss";
import { Editor } from "@tinymce/tinymce-react";
import { ExpandableTitleTextField } from "../../muiStyling/muiStyling";
import { useEffect, useRef, useState } from "react";
import { Close, TaskAlt } from "@mui/icons-material";
import LoadingProgress from "../pageLoading/LoadingProgress";

export default function StudentReportRemarkModal({
  open,
  onClose,
  setRemark,
  remark,
  handleScoreChange,
  loadingComplete,
  setLoadingComplete,
  studentId,
  allCoreSubjectStudents,
  fetchDraft,
  dispatch,
}) {
  const [blogText, setBlogText] = useState(localStorage.getItem("blogText"));
  const [blog, setBlog] = useState({
    image: "",
    postedBy: "",
    title: "",
    text: "",
  });
  const [studentRemark, setStudentRemark] = useState("");
  const canAssign = Boolean(remark);
  const tinyMCEKey = import.meta.env.VITE_APP_TINYMCE_KEY;
  const editorRef = useRef(null);
  useEffect(() => {
    const foundStudent = allCoreSubjectStudents?.find(
      (std) => std?.uniqueId === studentId
    );
    console.log(foundStudent);
    if (foundStudent) {
      setStudentRemark(foundStudent?.remark);
    }
  }, [allCoreSubjectStudents, studentId]);
  if (!open) return null;
  return (
    <Box className="employmentModalOverlay">
      <Modal
        open={open}
        // onClose={!confirmed ? onClose : ""}
        aria-labelledby="responsive-modal-title"
        aria-describedby="responsive-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: { minWidth: "50rem" } }, // Responsive width based on screen size
            maxWidth: { md: "50rem", lg: "50rem" }, // Responsive width based on screen size
            bgcolor: "background.paper",
            borderRadius: 2,
            //   boxShadow: 24,
            outline: "none",
          }}
        >
          <Box sx={{ backgroundColor: "#fff", margin: ".5rem" }}>
            <Box
              className="newEmploymentModalOverlay"
              sx={{
                //   position: "absolute",
                //   top: "50%",
                //   left: "50%",
                //   transform: "translate(-50%, -50%)",
                //   width: { xs: 300, sm: 400, md: 500 }, // Responsive width based on screen size
                //   bgcolor: "background.paper",
                //   borderRadius: 2,
                // boxShadow: 24,
                //   outline: "none",
                padding: { xs: 1, sm: 2 },
              }}
            >
              {/* Modal Content */}
              {/* <Typography
                id="responsive-modal-title"
                variant="h6"
                component="h2"
                textAlign={{ xs: "center", sm: "left" }}
              >
                Confirm Action
              </Typography>
              <Typography id="responsive-modal-description" sx={{ mt: 2 }}>
                Are you sure you would like to assign a new Lecturer under the
                selected academic subject?
              </Typography> */}
              <Box className="noticeBox">
                <Box className="noticeCont">
                  <Box
                    className="h3Cont"
                    sx={{ mb: 2 }}
                    fontSize={"calc(0.7rem + 1vmin)"}
                    // textAlign={"center"}
                    position={"relative"}
                  >
                    <h3 style={{ fontSize: ".9em", letterSpacing: "1px" }}>
                      ADD REPORT&apos;S REMARK
                    </h3>
                    <Box
                      sx={{
                        position: "absolute",
                        right: 0,
                        cursor: "pointer",
                        zIndex: 5,
                        top: "0",
                      }}
                    >
                      <Close
                        titleAccess="Close"
                        onClick={() => {
                          // setConfirmed(false);
                          // setSearchTeacher("");
                          // setProgramme("");
                          onClose();
                        }}
                        style={{
                          backgroundColor: "#292929",
                          color: "#fff",
                          borderRadius: "20%",
                          fontSize: "1.2rem",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      />
                    </Box>
                  </Box>
                  {/* <Container maxWidth="md" className="inputFields"> */}
                  {/* <form onSubmit={handleBlogPost}> */}
                  <Box className="content">
                    {/* <Box className="title">
                      <ExpandableTitleTextField
                        fullWidth
                        label="Title"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                        className="textField"
                        sx={{}}
                        // focused={focused}
                        // onFocus={() => setFocused(true)}
                        // onBlur={() => setFocused(false)}
                      />
                    </Box> */}
                    <Box className="editor">
                      {/* <h5 className="editorTitle">Blog Text</h5> */}
                      {/* <Typography variant="h5" gutterBottom>
                        Blog Text
                      </Typography> */}
                      <Box className="editorBox">
                        <Editor
                          apiKey={tinyMCEKey}
                          onInit={(evt, editor) => (editorRef.current = editor)}
                          // initialValue={localStorage.getItem("myContentText")}
                          value={remark || studentRemark}
                          onEditorChange={(newText) => {
                            setRemark(newText);
                            // localStorage.setItem("remarkText", newText);
                          }}
                          init={{
                            height: 400,
                            min_width: 500,
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
                    </Box>{" "}
                    <Button
                      fullWidth
                      className="noticeBtn"
                      disabled={!canAssign}
                      sx={{
                        mt: 2,
                        "&:hover": {
                          backgroundColor: "green",
                          color: "#fff",
                        },
                        backgroundColor: canAssign
                          ? "green"
                          : "#cccc !important",
                        color: "#fff",
                        "&.Mui-disabled": {
                          cursor: "not-allowed", // Show not-allowed cursor
                          pointerEvents: "auto",
                          color: "#292929",
                        },
                        letterSpacing: 1,
                        textTransform: "capitalize",
                        minHeight: "3rem",
                      }}
                      onClick={() => {
                        setLoadingComplete(false);
                        setTimeout(() => {
                          setLoadingComplete(true);
                          handleScoreChange(studentId, "", remark);
                        }, 3000);
                        setTimeout(() => {
                          setLoadingComplete(null);
                          setRemark("");
                          // dispatch(fetchDraft);
                          onClose();
                        }, 5000);
                        // localStorage.setItem("remarkText", remark);
                      }}
                    >
                      {loadingComplete === false && (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            // marginTop: "1rem",
                          }}
                        >
                          <p>Processing</p>
                          {/* <CircularProgress style={{ color: "#555" }} size={"1.3em"} /> */}
                          <span className="dot-ellipsis">
                            <span className="dot">.</span>
                            <span className="dot">.</span>
                            <span className="dot">.</span>
                          </span>
                        </Box>
                      )}
                      {loadingComplete && (
                        <>
                          <span>Saved</span>{" "}
                          <TaskAlt style={{ fontSize: "1.3em" }} />
                        </>
                      )}
                      {loadingComplete === null && "Save Remark"}
                    </Button>
                  </Box>
                  {/* </form> */}
                  {/* </Container> */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

StudentReportRemarkModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  remark: PropTypes.string,
  setRemark: PropTypes.func,
  handleScoreChange: PropTypes.func,
  setRedirect: PropTypes.func,
  setAssignLecturerInProgress: PropTypes.func,
  navigateTo: PropTypes.func,
  loadingComplete: PropTypes.bool,
  authAdminId: PropTypes.string,
  studentId: PropTypes.string,
  setLoadingComplete: PropTypes.func,
  fetchDraft: PropTypes.func,
  lecturerDataToAssign: PropTypes.object,
  lecturerDataToRemove: PropTypes.object,
  dispatch: PropTypes.func,
  allCoreSubjectStudents: PropTypes.array,
};
