import React from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../../../../features/allUsers/usersSlice";
import {
  Document,
  Page,
  Text,
  Image,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import DashBoardFooter from "../../../../footer/DashBoardFooter";
import ProspectusPDF from "../pdfs/ProspectusPDF";

export default function ProspectusPdfViewer({ enroledStudent }) {
  const userInfo = useSelector(getUser);
  console.log(enroledStudent);
  const styles = StyleSheet.create({
    PDFContainer: {
      width: "100%",
      height: "82vh", //As per your page layout
    },
  });
  return (
    <div style={{ marginTop: "10rem" }}>
      <PDFViewer style={styles.PDFContainer}>
        <ProspectusPDF enroledStudent={enroledStudent} />
      </PDFViewer>
      {/* <div className="footer">
        <DashBoardFooter />
      </div> */}
    </div>
  );
}
