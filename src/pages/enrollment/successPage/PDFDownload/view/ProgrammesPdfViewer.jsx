import { StyleSheet, PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ProgrammesPDF from "../pdfs/ProgrammesPDF";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import SmallFooter from "../../../../../components/footer/SmallFooter";
import { memo } from "react";

export default function ProgrammesPdfViewer({
  enrolledStudent,
  allCoreSubjects,
  allProgrammes,
}) {
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
          <ProgrammesPDF
            enrolledStudent={enrolledStudent}
            allCoreSubjects={allCoreSubjects}
            allProgrammes={allProgrammes}
          />
        </PDFViewer>
      );
    },
    (prevProps, nextProps) =>
      prevProps.enrolledStudent === nextProps.enrolledStudent &&
      prevProps.allCoreSubjects === nextProps.allCoreSubjects &&
      prevProps.allProgrammes === nextProps.allProgrammes
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
            document={
              <ProgrammesPDF
                enrolledStudent={enrolledStudent}
                allCoreSubjects={allCoreSubjects}
                allProgrammes={allProgrammes}
              />
            }
            fileName="programme.pdf"
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
        <MemoizedPDFViewer
          enrolledStudent={enrolledStudent}
          allCoreSubjects={allCoreSubjects}
          allProgrammes={allProgrammes}
        />
      </Box>
      <SmallFooter />
    </Box>
  );
}

ProgrammesPdfViewer.propTypes = {
  enrolledStudent: PropTypes.object,
  allCoreSubjects: PropTypes.array,
  allProgrammes: PropTypes.array,
};
