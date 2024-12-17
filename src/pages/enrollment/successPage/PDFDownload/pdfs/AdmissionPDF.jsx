import React from "react";
import "../scss/prospectusPdf.scss";
import {
  Document,
  Page,
  Text,
  Image,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import PropTypes from "prop-types";

export default function AdmissionPDF({ enrolledStudent }) {
  console.log(enrolledStudent);

  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    headerTitleWrap: {
      marginTop: 8,
    },
    headerTitle: {
      textAlign: "center",
      textDecoration: "underline",
      color: "#696969",
      marginTop: 5,
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: "justify",
      //   fontFamily: "AntonFamily",
    },
    image: {
      marginTop: 24,
      marginHorizontal: "auto",
      borderRadius: ".4rem",
      width: 50,
      height: 50,
      objectFit: "cover",
    },
    h3: {
      fontSize: 16,
      color: "#696969",
      paddingLeft: 16,
      marginTop: 16,
      marginBottom: 8,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
      //   fontFamily: "AntonFamily",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
      //   fontFamily: "AntonFamily",
    },
  });
  const admission_text = `
Senya Senior High School
[School Address]

Date: [Insert Date]

Admission Letter

Dear [Student's Name],

Congratulations! You have been admitted into [Programme Name] at Senya Senior High School for the academic year [Year].

Your admission details are as follows:
- Name: [Full Name]
- Programme: [Programme Name]
- Index Number: [Index Number]
- House: [House Name]

You are expected to report to the school premises on [Reporting Date] with the required items as listed in the prospectus.

We look forward to welcoming you!

Best regards,
[Headmaster's Name]
Headmaster/Headmistress
`;
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>SENYA SENIOR HIGH SCHOOL</Text>
          <Text style={styles.headerTitle}>STUDENT ADMISSION LETTER</Text>
        </View>
        <Image
          style={styles.image}
          src={enrolledStudent?.personalInfo?.profilePicture.url}
        />
        {/* <Text style={styles.h3}>All Featured Programmes</Text> */}
        <Text style={styles.text}>{admission_text}</Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
}

AdmissionPDF.propTypes = {
  enrolledStudent: PropTypes.object,
};
