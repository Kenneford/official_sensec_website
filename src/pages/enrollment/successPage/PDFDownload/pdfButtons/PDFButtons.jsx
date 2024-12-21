import { FileDownload } from "@mui/icons-material";
import { Box, Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { FetchAllStudents } from "../../../../../data/students/FetchAllStudents";
import ProspectusPDF from "../pdfs/ProspectusPDF";
import { pdf } from "@react-pdf/renderer";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

export default function PDFButtons() {
  const allStudents = FetchAllStudents();
  const { studentId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("1024"));

  const enrolledStudent = allStudents?.find(
    (std) => std?.uniqueId === studentId
  );

  const downloadProspectusPDF = () => {
    pdf(<ProspectusPDF enrolledStudent={enrolledStudent} />)
      .toBlob()
      .then(
        (blob) => {
          try {
            const save = saveAs(blob, "Senya Senior High School Prospectus");
            if (save) {
              return save;
            }
          } catch (error) {
            toast.error("Failed to download PDF!", {
              position: "top-right",
              theme: "light",
              // toastId: successId,
            });
            console.log(error);
          }
        }
        // setTimeout(() => {
        // }, 1000)
      );
    // .then(() =>
    //   navigate(
    //     `/sensec/students/enrollment/online/info/${studentId}/admission_pdf`
    //   )
    // );
  };
  // const downloadAdmissionPDF = () => {
  //   pdf(<AdmissionPDF enrolledStudent={enrolledStudent} />)
  //     .toBlob()
  //     .then(
  //       (blob) => {
  //         try {
  //           const save = saveAs(blob, "Senya Senior High School Admission");
  //           if (save) {
  //             return save;
  //           }
  //         } catch (error) {
  //           toast.error("Failed to download PDF!", {
  //             position: "top-right",
  //             theme: "light",
  //             // toastId: successId,
  //           });
  //           console.log(error);
  //         }
  //       }
  //       // setTimeout(() => {
  //       // }, 1000)
  //     );
  //   // .then(() =>
  //   //   navigate(
  //   //     `/sensec/students/enrollment/online/info/${studentId}/admission_pdf`
  //   //   )
  //   // );
  // };
  // const downloadStudentProfilePDF = () => {
  //   pdf(<StudentProfilePDF enrolledStudent={enrolledStudent} />)
  //     .toBlob()
  //     .then(
  //       (blob) => {
  //         try {
  //           const save = saveAs(
  //             blob,
  //             "Senya Senior High School Student's Profile"
  //           );
  //           if (save) {
  //             return save;
  //           }
  //         } catch (error) {
  //           toast.error("Failed to download PDF!", {
  //             position: "top-right",
  //             theme: "light",
  //             // toastId: successId,
  //           });
  //           console.log(error);
  //         }
  //       }
  //       // setTimeout(() => {
  //       // }, 1000)
  //     );
  //   // .then(() =>
  //   //   navigate(
  //   //     `/sensec/students/enrollment/online/info/${studentId}/admission_pdf`
  //   //   )
  //   // );
  // };
  // const downloadProgrammesPDF = () => {
  //   pdf(
  //     <ProgrammesPDF
  //       enrolledStudent={enrolledStudent}
  //       allCoreSubjects={allCoreSubjects}
  //       allProgrammes={allProgrammes}
  //       nonDivisionPrograms={nonDivisionPrograms}
  //       allDivisionProgrammes={allCreatedDivisionProgrammes}
  //     />
  //   )
  //     .toBlob()
  //     .then(
  //       (blob) => {
  //         try {
  //           const save = saveAs(blob, "Senya Senior High School Programmes");
  //           if (save) {
  //             return save;
  //           }
  //         } catch (error) {
  //           toast.error("Failed to download PDF!", {
  //             position: "top-right",
  //             theme: "light",
  //             // toastId: successId,
  //           });
  //           console.log(error);
  //         }
  //       }
  //       // setTimeout(() => {
  //       // }, 1000)
  //     );
  //   // .then(() =>
  //   //   navigate(
  //   //     `/sensec/students/enrollment/online/info/${studentId}/admission_pdf`
  //   //   )
  //   // );
  // };
  // const downloadUndertakingPDF = () => {
  //   pdf(<UndertakingPDF enrolledStudent={enrolledStudent} />)
  //     .toBlob()
  //     .then(
  //       (blob) => {
  //         try {
  //           const save = saveAs(blob, "Senya Senior High School Undertaking");
  //           if (save) {
  //             return save;
  //           }
  //         } catch (error) {
  //           toast.error("Failed to download PDF!", {
  //             position: "top-right",
  //             theme: "light",
  //             // toastId: successId,
  //           });
  //           console.log(error);
  //         }
  //       }
  //       // setTimeout(() => {
  //       // }, 1000)
  //     );
  //   // .then(() =>
  //   //   navigate(
  //   //     `/sensec/students/enrollment/online/info/${studentId}/admission_pdf`
  //   //   )
  //   // );
  // };

  return (
    <Box p={"1rem"}>
      <Box className="docDownloadWrap">
        <h3>
          DOCUMENTS FOR DOWNLOAD (PLEASE DOWNLOAD AND PRINT ALL DOCUMENTS)
        </h3>
        <Box className="docList">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              {!isMobile && (
                <Button
                  // variant="outlined"
                  onClick={() => {
                    // downloadProspectusPDF();
                    navigate(
                      // "#"
                      `/sensec/students/enrollment/online/${studentId}/success/pdf_download/prospectus_pdf`
                    );
                  }}
                  className="docItem"
                >
                  <FileDownload className="downloadIcon" />
                  <span>Prospectus</span>
                </Button>
              )}
              {isMobile && (
                <Button
                  // variant="outlined"
                  onClick={() => {
                    downloadProspectusPDF();
                    navigate(
                      "#"
                      // `/sensec/students/enrollment/online/${studentId}/success/pdf_download/prospectus_pdf`
                    );
                  }}
                  className="docItem"
                >
                  <FileDownload className="downloadIcon" />
                  <span>Prospectus</span>
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <Button
                onClick={() => {
                  // downloadAdmissionPDF();
                  navigate(
                    // "#"
                    `/sensec/students/enrollment/online/${studentId}/success/pdf_download/admission_pdf`
                  );
                }}
                className="docItem"
              >
                <FileDownload className="downloadIcon" />
                <span>Admission Letter</span>
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <Button
                onClick={() => {
                  // downloadStudentProfilePDF();
                  navigate(
                    // "#"
                    `/sensec/students/enrollment/online/${studentId}/success/pdf_download/student_profile`
                  );
                }}
                className="docItem"
              >
                <FileDownload className="downloadIcon" />
                <span>Personal Profile</span>
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <Button
                onClick={() => {
                  // downloadProgrammesPDF();
                  navigate(
                    // "#"
                    `/sensec/students/enrollment/online/${studentId}/success/pdf_download/programmes_subjects_pdf`
                  );
                }}
                className="docItem"
              >
                <FileDownload className="downloadIcon" />
                <span>Programme/Subject</span>
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <Button
                onClick={() => {
                  // downloadUndertakingPDF();
                  navigate(
                    // "#"
                    `/sensec/students/enrollment/online/${studentId}/success/pdf_download/undertaking_&_medical_status_pdf`
                  );
                }}
                className="docItem"
              >
                <FileDownload className="downloadIcon" />
                <span>Undertaking/Medical</span>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

PDFButtons.propTypes = {};
