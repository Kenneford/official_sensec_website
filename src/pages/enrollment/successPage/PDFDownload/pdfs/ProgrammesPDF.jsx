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

export default function ProgrammesPDF({
  enrolledStudent,
  allCoreSubjects,
  allProgrammes,
  nonDivisionPrograms,
  allDivisionProgrammes,
}) {
  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    letterBody: {
      marginTop: 35,
    },
    letterViews: {
      paddingTop: 16,
    },
    headerTitleWrap: {
      marginTop: 8,
    },
    headerTitle: {
      textAlign: "center",
      textDecoration: "underline",
      color: "#555",
      marginTop: 5,
    },
    textBox: {
      marginTop: 24,
      fontSize: 14,
      textAlign: "justify",
      //   fontFamily: "AntonFamily",
    },
    text: {
      marginVertical: 2,
      fontSize: 14,
      textAlign: "justify",
      color: "#696969",
      lineHeight: 1.5,
    },
    textSpan: {
      color: "#555",
    },
    textSpan1: {
      fontWeight: "extrabold",
      color: "#555",
    },
    textSpan2: {
      fontWeight: "extrabold",
      color: "#292929",
    },
    letterTitle: {
      marginVertical: 2,
      fontSize: 20,
      fontWeight: "extrabold",
      textAlign: "center",
      color: "#555",
      textDecoration: "underline",
    },
    date: {
      marginTop: 6,
      fontSize: 14,
      textAlign: "justify",
      color: "#292929",
    },
    image: {
      marginTop: -20,
      marginHorizontal: "auto",
      borderRadius: ".4rem",
      width: 40,
      height: 40,
      objectFit: "cover",
    },
    underTakingWrap: {
      marginTop: 20,
    },
    underTakingHeader: {
      marginTop: 10,
      marginBottom: 3,
      fontSize: 16,
      color: "#555",
      textDecoration: "underline",
    },
    h3: {
      fontSize: 16,
      color: "#696969",
      // paddingLeft: 16,
      marginTop: 5,
      marginBottom: 8,
      textDecoration: "underline",
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
      //   fontFamily: "AntonFamily",
    },
    list: {
      margin: 0,
      padding: 0,
    },
    listItem: {
      // marginBottom: 5,
      paddingLeft: 20,
      position: "relative",
    },
    listItemName: {
      // fontWeight: "bold",
      color: "#555",
      marginBottom: 0,
      letterSpacing: 1,
    },
    bullet: {
      position: "absolute",
      left: 10,
      top: 0,
      fontSize: 12,
      lineHeight: 1,
      marginTop: 2,
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

  const programmesText = `
    1. Agricultural Science
      - Core Subjects: English, Mathematics, Integrated Science, Social Studies
      - Elective Subjects: General Agriculture, Animal Husbandry, Chemistry, Physics

    2. General Arts
      - Core Subjects: English, Mathematics, Integrated Science, Social Studies
      - Elective Subjects: History, Geography, Economics, Literature

    3. Business
      - Core Subjects: English, Mathematics, Integrated Science, Social Studies
      - Elective Subjects: Accounting, Business Management, Economics, Cost Accounting

    4. Visual Arts
      - Core Subjects: English, Mathematics, Integrated Science, Social Studies
      - Elective Subjects: Graphic Design, Sculpture, Painting, Ceramics

    5. Home Economics
      - Core Subjects: English, Mathematics, Integrated Science, Social Studies
      - Elective Subjects: Food and Nutrition, Clothing and Textiles, Management in Living

    6. General Science
      - Core Subjects: English, Mathematics, Integrated Science, Social Studies
      - Elective Subjects: Physics, Chemistry, Biology, Elective Mathematics
    `;
  return (
    <Document title="Programme_&_Subject.pdf">
      <Page style={styles.body}>
        <Image style={styles.image} src={"/assets/sensec-logo1.png"} />
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>SENYA SENIOR HIGH SCHOOL</Text>
          <Text style={styles.headerTitle}>PROGRAMMES AND SUBJECTS</Text>
        </View>
        <Text style={styles.h3}>All Featured Programmes</Text>
        <View style={styles.list}>
          {allProgrammes?.map((program) => (
            <View key={program?._id} style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text>{program?.name}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.h3}>Core Subjects</Text>
        <View style={styles.list}>
          {allCoreSubjects?.map((subj) => (
            <View key={subj?._id} style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text>{subj?.subjectName}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.h3}>Programme Subjects</Text>
        <View style={styles.list}>
          {nonDivisionPrograms?.map((program) => (
            <View key={program?._id}>
              <Text>{program?.name}</Text>
              {program?.electiveSubjects?.map((subj) => (
                <View style={styles.listItem} key={subj?._id}>
                  <Text style={styles.bullet}>•</Text>
                  <Text>{subj?.subjectName}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
        <View style={styles.list}>
          {allDivisionProgrammes?.map((program) => (
            <View key={program?._id}>
              <Text>{program?.divisionName}</Text>
              {program?.electiveSubjects?.map((subj) => (
                <View style={styles.listItem} key={subj?._id}>
                  <Text style={styles.bullet}>•</Text>
                  <Text>{subj?.subjectName}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <Text style={styles.text}>{programmesText}</Text>
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

ProgrammesPDF.propTypes = {
  enrolledStudent: PropTypes.object,
  allProgrammes: PropTypes.array,
  allCoreSubjects: PropTypes.array,
  nonDivisionPrograms: PropTypes.array,
  allDivisionProgrammes: PropTypes.array,
};
