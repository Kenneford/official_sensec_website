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

export default function UndertakingPDF({ enrolledStudent }) {
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
  const undertaking = `
    I, [Parent/Guardian Name], the parent/guardian of [Student Name], hereby pledge that my 
    child/ward will abide by all the rules and regulations of Senya Senior High School.

    I agree to ensure the following:
      1. My child/ward will attend school regularly and punctually.
      2. My child/ward will respect all school authorities, staff, and students.
      3. My child/ward will strictly adhere to the school’s dress code.
      4. My child/ward will participate in all academic and extracurricular activities.
    
    Should my child/ward breach any school rules, I understand that disciplinary measures may be taken.
    
    Signed: _____________________            Date: ________________
    Parent/Guardian Name: _________________________
  `;

  const medical_form = `
    Student Information:
      - Full Name: _____________________________
      - Date of Birth: _____________________________
    
    Medical History:
      - Allergies: ______________________________
      - Chronic Illnesses: _______________________
      - Immunization Record: _____________________
    
    Physical Examination:
      - Height: _____________   Weight: _____________
      - Blood Pressure: _____________
    
    Doctor’s Remarks:
    _____________________________________________________________________________________
    
    Doctor’s Name: _____________________________
    Signature: _______________________      Date: _____________
  `;

  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>SENYA SENIOR HIGH SCHOOL</Text>
          <Text style={styles.headerTitle}>UNDERTAKING AND MEDICAL STATUS</Text>
        </View>
        {/* <Image
          style={styles.image}
          src={enrolledStudent?.personalInfo?.profilePicture.url}
        /> */}
        <Text style={styles.h3}>UNDERTAKING</Text>
        <Text style={styles.text}>{undertaking}</Text>
        <Text style={styles.h3}>MEDICAL STATUS</Text>
        <Text style={styles.text}>{medical_form}</Text>
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

UndertakingPDF.propTypes = {
  enrolledStudent: PropTypes.object,
};
