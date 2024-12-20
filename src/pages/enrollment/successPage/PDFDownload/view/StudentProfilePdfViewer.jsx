import { StyleSheet, PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import StudentProfilePDF from "../pdfs/StudentProfilePDF";
import PropTypes from "prop-types";
import SmallFooter from "../../../../../components/footer/SmallFooter";
import { Box, Button } from "@mui/material";

export default function StudentProfilePdfViewer({ enrolledStudent }) {
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
            document={<StudentProfilePDF enrolledStudent={enrolledStudent} />}
            fileName="student_profile.pdf"
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
      <PDFViewer style={styles.PDFContainer} sh>
        <StudentProfilePDF enrolledStudent={enrolledStudent} />
      </PDFViewer>
      <SmallFooter />
    </Box>
  );
}

StudentProfilePdfViewer.propTypes = {
  enrolledStudent: PropTypes.object,
};
