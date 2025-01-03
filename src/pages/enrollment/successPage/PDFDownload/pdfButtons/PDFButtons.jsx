import { FileDownload } from "@mui/icons-material";
import { Box, Button, Grid, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { pdf } from "@react-pdf/renderer";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import ProspectusPDF from "../pdfs/ProspectusPDF";
import AdmissionPDF from "../pdfs/AdmissionPDF";
import StudentProfilePDF from "../pdfs/StudentProfilePDF";
import ProgrammesPDF from "../pdfs/ProgrammesPDF";
import UndertakingPDF from "../pdfs/UndertakingPDF";

export default function PDFButtons({
  enrolledStudent,
  currentTerm,
  currentAcademicYear,
  studentProgramme,
  isMobile,
  allCoreSubjects,
  allProgrammes,
}) {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const downloadProspectusPDF = async () => {
    pdf(<ProspectusPDF enrolledStudent={enrolledStudent} />)
      .toBlob()
      .then((blob) => {
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
      });
  };
  const downloadAdmissionPDF = async () => {
    pdf(
      <AdmissionPDF
        enrolledStudent={enrolledStudent}
        currentTerm={currentTerm}
        currentAcademicYear={currentAcademicYear}
        studentProgramme={studentProgramme}
      />
    )
      .toBlob()
      .then((blob) => {
        try {
          const save = saveAs(blob, "Senya Senior High School Admission");
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
      });
  };
  const downloadStudentProfilePDF = async () => {
    pdf(<StudentProfilePDF enrolledStudent={enrolledStudent} />)
      .toBlob()
      .then((blob) => {
        try {
          const save = saveAs(
            blob,
            "Senya Senior High School Student's Profile"
          );
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
      });
  };
  const downloadProgrammesPDF = async () => {
    pdf(
      <ProgrammesPDF
        enrolledStudent={enrolledStudent}
        allCoreSubjects={allCoreSubjects}
        allProgrammes={allProgrammes}
        // nonDivisionPrograms={nonDivisionPrograms}
        // allDivisionProgrammes={allCreatedDivisionProgrammes}
      />
    )
      .toBlob()
      .then((blob) => {
        try {
          const save = saveAs(blob, "Senya Senior High School Programmes");
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
      });
  };
  const downloadUndertakingPDF = async () => {
    pdf(<UndertakingPDF enrolledStudent={enrolledStudent} />)
      .toBlob()
      .then((blob) => {
        try {
          const save = saveAs(blob, "Senya Senior High School Undertaking");
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
      });
  };

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
                  onClick={() => {
                    navigate(
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
                  onClick={() => {
                    downloadProspectusPDF();
                  }}
                  className="docItem"
                >
                  <FileDownload className="downloadIcon" />
                  <span>Prospectus</span>
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              {!isMobile && (
                <Button
                  onClick={() => {
                    navigate(
                      `/sensec/students/enrollment/online/${studentId}/success/pdf_download/admission_pdf`
                    );
                  }}
                  className="docItem"
                >
                  <FileDownload className="downloadIcon" />
                  <span>Admission Letter</span>
                </Button>
              )}
              {isMobile && (
                <Button
                  onClick={() => {
                    downloadAdmissionPDF();
                  }}
                  className="docItem"
                >
                  <FileDownload className="downloadIcon" />
                  <span>Admission Letter</span>
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              {!isMobile && (
                <Button
                  onClick={() => {
                    navigate(
                      `/sensec/students/enrollment/online/${studentId}/success/pdf_download/student_profile`
                    );
                  }}
                  className="docItem"
                >
                  <FileDownload className="downloadIcon" />
                  <span>Personal Profile</span>
                </Button>
              )}
              {isMobile && (
                <Button
                  onClick={() => {
                    downloadStudentProfilePDF();
                  }}
                  className="docItem"
                >
                  <FileDownload className="downloadIcon" />
                  <span>Personal Profile</span>
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              {!isMobile && (
                <Button
                  onClick={() => {
                    navigate(
                      `/sensec/students/enrollment/online/${studentId}/success/pdf_download/programmes_subjects_pdf`
                    );
                  }}
                  className="docItem"
                >
                  <FileDownload className="downloadIcon" />
                  <span>Programme/Subject</span>
                </Button>
              )}
              {isMobile && (
                <Button
                  onClick={() => {
                    downloadProgrammesPDF();
                  }}
                  className="docItem"
                >
                  <FileDownload className="downloadIcon" />
                  <span>Programme/Subject</span>
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              {!isMobile && (
                <Button
                  onClick={() => {
                    navigate(
                      `/sensec/students/enrollment/online/${studentId}/success/pdf_download/undertaking_&_medical_status_pdf`
                    );
                  }}
                  className="docItem"
                >
                  <FileDownload className="downloadIcon" />
                  <span>Undertaking/Medical</span>
                </Button>
              )}
              {isMobile && (
                <Button
                  onClick={() => {
                    downloadUndertakingPDF();
                  }}
                  className="docItem"
                >
                  <FileDownload className="downloadIcon" />
                  <span>Undertaking/Medical</span>
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

PDFButtons.propTypes = {
  enrolledStudent: PropTypes.object,
  currentTerm: PropTypes.object,
  currentAcademicYear: PropTypes.object,
  studentProgramme: PropTypes.object,
  isMobile: PropTypes.bool,
  allCoreSubjects: PropTypes.array,
  allProgrammes: PropTypes.array,
  allDivisionProgrammes: PropTypes.array,
};
