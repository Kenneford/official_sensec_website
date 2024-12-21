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
import { dateFormatter } from "../../../../../dateFormatter/DateFormatter";

export default function AdmissionPDF({
  enrolledStudent,
  currentTerm,
  currentAcademicYear,
  studentProgramme,
}) {
  console.log(enrolledStudent);
  console.log(studentProgramme);
  const todaysDate = new Date();

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
      color: "#292929",
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
    list: {
      margin: 0,
      padding: 0,
    },
    listItem: {
      // marginBottom: 5,
      paddingLeft: 7,
      position: "relative",
    },
    bullet: {
      position: "absolute",
      left: 0,
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
  return (
    <Document title={"Admission.pdf"}>
      <Page style={styles.body}>
        <Image style={styles.image} src={"/assets/sensec-logo1.png"} />
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>SENYA SENIOR HIGH SCHOOL</Text>
          <Text style={styles.headerTitle}>STUDENT ADMISSION LETTER</Text>
        </View>
        <View style={styles.letterBody}>
          <View style={styles.letterViews}>
            <Text style={styles.text}>Senya Senior High School</Text>
            <Text style={styles.text}>P.O. Box 23</Text>
            <Text style={styles.text}>GPS: CG-2308-4841</Text>
            <Text style={styles.date}>
              Date: <Text>{dateFormatter?.format(new Date(todaysDate))}.</Text>
            </Text>
          </View>
          <View style={styles.letterViews}>
            <Text style={styles.letterTitle}>Student Admission Letter</Text>
          </View>
          <View style={styles.letterViews}>
            <Text style={styles.text}>
              Dear {enrolledStudent?.personalInfo?.firstName},
            </Text>
          </View>
          <View style={styles.letterViews}>
            <Text style={styles.text}>
              Congratulations! You&apos;ve been admitted into{" "}
              <Text style={[styles.text, styles.textSpan]}>
                {studentProgramme?.divisionName
                  ? studentProgramme?.divisionName
                  : studentProgramme?.name}
              </Text>{" "}
              programme at Senya Senior High School for the academic year{" "}
              <Text style={[styles.text, styles.textSpan]}>
                {currentAcademicYear?.yearRange}
              </Text>
              .
            </Text>
          </View>
          <View style={styles.letterViews}>
            <Text style={styles.text}>
              Your admission details are as follows:
            </Text>
            <View style={styles.list}>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listItem}>
                  <Text style={[styles.text, styles.textSpan1]}>
                    Name:{" "}
                    <Text style={styles.text}>
                      {enrolledStudent?.personalInfo?.fullName}
                    </Text>
                  </Text>
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listItem}>
                  <Text style={[styles.text, styles.textSpan1]}>
                    Programme:{" "}
                  </Text>
                  <Text style={styles.text}>
                    {enrolledStudent?.studentSchoolData?.program?.name}
                  </Text>
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listItem}>
                  <Text style={[styles.text, styles.textSpan1]}>
                    Index Number:{" "}
                  </Text>
                  <Text style={styles.text}>
                    {enrolledStudent?.studentSchoolData?.jhsIndexNo}
                  </Text>
                </Text>
              </View>
              <View style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listItem}>
                  <Text style={[styles.text, styles.textSpan1]}>House: </Text>
                  <Text style={styles.text}>
                    {enrolledStudent?.studentSchoolData?.house?.name}&apos;s
                    House
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.letterViews}>
            <Text style={styles.text}>
              You are expected to report to the school premises on{" "}
              <Text style={[styles.text, styles.textSpan]}>
                {currentTerm
                  ? dateFormatter?.format(new Date(currentTerm?.from))
                  : "___________________"}
              </Text>{" "}
              with the required items as listed in the prospectus.
            </Text>
            <Text style={styles.text}>We look forward to welcoming you!</Text>
          </View>
          <View style={styles.letterViews}>
            <Text style={styles.text}>Best regards,</Text>
          </View>
          <View style={styles.letterViews}>
            <Text style={[styles.text, styles.textSpan1]}>
              Ebenezer Nana Wilson,
            </Text>
            <Text style={[styles.text, styles.textSpan1]}>
              Head of Administration.
            </Text>
          </View>
        </View>
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
  currentTerm: PropTypes.object,
  currentAcademicYear: PropTypes.object,
  studentProgramme: PropTypes.object,
};
