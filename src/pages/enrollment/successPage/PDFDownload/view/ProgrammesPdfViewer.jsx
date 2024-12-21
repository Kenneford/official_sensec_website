import { StyleSheet, PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ProgrammesPDF from "../pdfs/ProgrammesPDF";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import SmallFooter from "../../../../../components/footer/SmallFooter";

export default function ProgrammesPdfViewer({
  enrolledStudent,
  allCoreSubjects,
  allProgrammes,
}) {
  const styles = StyleSheet.create({
    PDFContainer: {
      width: "100%",
      height: "82vh", //As per your page layout
    },
  });
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
      <PDFViewer style={styles.PDFContainer}>
        <ProgrammesPDF
          allCoreSubjects={allCoreSubjects}
          allProgrammes={allProgrammes}
        />
      </PDFViewer>
      <SmallFooter />
    </Box>
  );
}

ProgrammesPdfViewer.propTypes = {
  enrolledStudent: PropTypes.object,
  allCoreSubjects: PropTypes.array,
  allProgrammes: PropTypes.array,
};
