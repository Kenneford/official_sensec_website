import { FileDownload } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

export default function PDFButtons() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  return (
    <Box p={"1rem"}>
      <Box className="docDownloadWrap">
        <h3>
          DOCUMENTS FOR DOWNLOAD (PLEASE DOWNLOAD AND PRINT ALL DOCUMENTS)
        </h3>
        <Box className="docList">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4} md={3} lg={3}>
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
