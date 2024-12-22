import { StyleSheet, PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import UndertakingPDF from "../pdfs/UndertakingPDF";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import SmallFooter from "../../../../../components/footer/SmallFooter";
import { memo } from "react";

export default function UndertakingPdfViewer({ enrolledStudent }) {
  const styles = StyleSheet.create({
    PDFContainer: {
      width: "100%",
      height: "100%",
    },
  });
  // Wrap the PDFViewer component with React.memo
  // to prevent prevent pdf reload if state update
  const MemoizedPDFViewer = memo(
    ({ enrolledStudent }) => {
      return (
        <PDFViewer style={styles.PDFContainer}>
          <UndertakingPDF enrolledStudent={enrolledStudent} />
        </PDFViewer>
      );
    },
    (prevProps, nextProps) =>
      prevProps.enrolledStudent === nextProps.enrolledStudent &&
      prevProps.currentTerm === nextProps.currentTerm &&
      prevProps.currentAcademicYear === nextProps.currentAcademicYear &&
      prevProps.studentProgramme === nextProps.studentProgramme
  );
  // Set a display name for debugging
  MemoizedPDFViewer.displayName = "MemoizedPDFViewer";
  return (
    <Box>
      <Box
        sx={{
          bgcolor: "#292929",
          padding: "1rem 1rem 1rem 0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <PDFDownloadLink
            style={{ display: "inline-block" }}
            document={<UndertakingPDF enrolledStudent={enrolledStudent} />}
            fileName="undertaking_&_medical_status.pdf"
          >
            {({ loading }) =>
              loading ? (
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "green",
                    letterSpacing: "1px",
                    minWidth: "9rem",
                    padding: ".5rem",
                  }}
                >
                  Loading ...
                  {/* <LoadingProgress color={"#fff"} size={"1.5rem"} /> */}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "green",
                    letterSpacing: "1px",
                    minWidth: "9rem",
                    padding: ".5rem",
                  }}
                >
                  Download PDF
                </Button>
              )
            }
          </PDFDownloadLink>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "72.9vh",
        }}
      >
        <MemoizedPDFViewer enrolledStudent={enrolledStudent} />
      </Box>
      <SmallFooter />
    </Box>
  );
}

UndertakingPdfViewer.propTypes = {
  enrolledStudent: PropTypes.object,
};
