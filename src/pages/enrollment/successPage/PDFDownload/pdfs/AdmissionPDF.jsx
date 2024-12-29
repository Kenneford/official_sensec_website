import "../scss/prospectusPdf.scss";
import {
  Document,
  Page,
  Text,
  Image,
  StyleSheet,
  View,
  Font,
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
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const todaysDate = new Date();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const monthInWords = monthNames[currentMonth];

  // Register fonts
  Font.register({
    family: "Roboto",
    fonts: [
      {
        src: "/fonts/Roboto-Regular.ttf", // Regular font
      },
      {
        src: "/fonts/Roboto-Bold.ttf", // Bold font
        fontWeight: "bold",
      },
    ],
  });

  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
      fontFamily: "Roboto",
    },
    letterBody: {
      marginTop: 35,
    },
    addressedTo: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
    },
    letterViews: {
      paddingTop: 16,
    },
    headerTitleWrap: {
      marginTop: 8,
    },
    headerTitle: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 18,
      // textDecoration: "underline",
      color: "#555",
      marginTop: 5,
      letterSpacing: 1,
    },
    textBox: {
      marginTop: 24,
      fontSize: 14,
      textAlign: "justify",
      //   fontFamily: "AntonFamily",
    },
    centeredText: {
      marginVertical: 5,
      fontSize: 12,
      textAlign: "center",
      color: "#696969",
      // lineHeight: 1.5,
      fontWeight: "medium",
    },
    rightAlignedText: {
      marginVertical: 1,
      fontSize: 10,
      textAlign: "right",
      color: "#696969",
      // lineHeight: 1.5,
      fontWeight: "light",
    },
    rightAlignedBold: {
      marginVertical: 1,
      fontSize: 11,
      textAlign: "right",
      color: "#292929",
      // lineHeight: 1.5,
      fontWeight: "medium",
    },
    text: {
      marginVertical: 2,
      fontSize: 12,
      textAlign: "justify",
      color: "#555",
      lineHeight: 1.5,
    },
    textSpan: {
      color: "#555",
    },
    textSpan1: {
      fontWeight: "extrabold",
      color: "#696969",
    },
    textSpan2: {
      fontWeight: "extrabold",
      color: "#292929",
    },
    letterTitle: {
      marginBottom: 2,
      fontSize: 12,
      fontWeight: "bold",
      textAlign: "center",
      color: "#555",
      textDecoration: "underline",
      textTransform: "uppercase",
      // letterSpacing: 1,
    },
    date: {
      // marginTop: 6,
      fontSize: 12,
      textAlign: "center",
      fontWeight: "bold",
      color: "#696969",
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
          <Text style={styles.centeredText}>
            P.O. Box 23, Senya-Beraku / GPS: CG-2308-4841
          </Text>
          <Text style={styles.date}>
            {monthInWords}, {currentYear}.
          </Text>
        </View>
        <View style={styles.letterBody}>
          <View style={styles.addressedTo}>
            <View>
              <Text style={styles.text}>
                Dear {enrolledStudent?.personalInfo?.firstName}{" "}
                {enrolledStudent?.personalInfo?.lastName},
              </Text>
            </View>
            <View>
              <Text style={styles.rightAlignedText}>
                <Text style={styles.rightAlignedBold}>Enrollment Code:</Text>{" "}
                {enrolledStudent?.enrollmentCode
                  ? enrolledStudent?.enrollmentCode
                  : "327GA-24"}
              </Text>
              <Text style={styles.rightAlignedText}>
                <Text style={styles.rightAlignedBold}>Student ID:</Text>{" "}
                {enrolledStudent?.uniqueId}
              </Text>
            </View>
          </View>
          <View style={styles.letterViews}>
            <Text style={styles.letterTitle}>
              Senya Senior High School Admission{" "}
              {currentAcademicYear?.yearRange} Academic Year
            </Text>
          </View>
          <View style={styles.letterViews}>
            <Text style={styles.text}>
              I am glad to inform you that you have been offered admitted at
              {/* <Text style={[styles.text, styles.textSpan]}>
                {studentProgramme?.divisionName
                  ? studentProgramme?.divisionName
                  : studentProgramme?.name}
              </Text>{" "}
              programme at */}
              Senya Senior High School with effect from{" "}
              <Text style={[styles.text, styles.textSpan]}>
                {currentTerm
                  ? dateFormatter?.format(new Date(currentTerm?.from))
                  : "___________________"}
              </Text>{" "}
              to pursue a 3-Year Senior High School programme
              {/* <Text style={[styles.text, styles.textSpan]}>
                {currentAcademicYear?.yearRange}
              </Text> */}
              .
            </Text>
          </View>
          <View style={styles.letterViews}>
            <Text style={styles.text}>
              You are allocated to{" "}
              {enrolledStudent?.studentSchoolData?.house?.name}&apos;s house as
              a{" "}
              <Text style={{ textTransform: "lowercase" }}>
                {enrolledStudent?.status?.residentialStatus}
              </Text>{" "}
              student and the programme offered you is{" "}
              {enrolledStudent?.studentSchoolData?.program?.name}. This will{" "}
              <Text
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: 10,
                }}
              >
                Not
              </Text>{" "}
              be change since changes invariably result in the reduction of
              classes and number of teachers.
            </Text>
          </View>
          <View style={styles.letterViews}>
            <Text style={styles.text}>
              The school will also{" "}
              <Text
                style={{
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: 10,
                }}
              >
                Not
              </Text>{" "}
              accept any change of name apart from the one that appears
              officially on the result slip. You are expected to live within the
              limits of the school rules and regulations. The school reserves
              the right to terminate your admission if you misconduct yourself.
              A copy of the school&apos;s rules and regulations has been
              enclosed for your serious study and strict compliance.
            </Text>
          </View>
          <View style={styles.letterViews}>
            <Text style={styles.text}>
              If your academic performance falls below expectation you will be
              repeated.
            </Text>
          </View>
          <View style={styles.letterViews}>
            <Text style={styles.text}>
              As it is in all public education institutes in the country,
              tuition is free. The official opening date for SHS-1 is{" "}
              <Text style={[styles.text, styles.textSpan]}>
                {currentTerm
                  ? dateFormatter?.format(new Date(currentTerm?.from))
                  : "___________________"}
              </Text>
              , school management will meet all parents at 11:00 am at the
              school assembly hall the same day. Please note that without your
              placement slip, enrollment form and BECE result slip, you will not
              be admitted.
            </Text>
          </View>
          <View style={styles.letterViews}>
            <Text style={styles.text}>
              I wish you a happy stay at Senya Senior High School.
            </Text>
          </View>
          <View style={styles.letterViews}>
            <Text style={styles.text}>Your faithfully,</Text>
            <Text style={styles.text}>Signed</Text>
            <Text style={[styles.text, styles.textSpan1]}>Headmaster</Text>
            <Text style={[styles.text, styles.textSpan1]}>
              Senya Senior High School.
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
