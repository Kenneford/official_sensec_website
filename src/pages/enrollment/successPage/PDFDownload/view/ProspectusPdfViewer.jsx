import { StyleSheet, PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ProspectusPDF from "../pdfs/ProspectusPDF";
import SmallFooter from "../../../../../components/footer/SmallFooter";
import { Box, Button } from "@mui/material";
import PageLoading from "../../../../../components/pageLoading/PageLoading";
import LoadingProgress from "../../../../../components/pageLoading/LoadingProgress";
// import PropTypes from "prop-types";

export default function ProspectusPdfViewer() {
  // console.log(enrolledStudent);
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
            document={<ProspectusPDF />}
            fileName="prospectus.pdf"
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
        <ProspectusPDF />
      </PDFViewer>
      <SmallFooter />
    </Box>
  );
}

// ProspectusPdfViewer.propTypes = {
//   enrolledStudent: PropTypes.object,
// };
