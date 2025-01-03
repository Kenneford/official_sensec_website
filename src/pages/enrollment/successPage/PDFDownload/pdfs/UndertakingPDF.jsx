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
    paddingTop: 25,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: "Roboto",
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
    fontWeight: "bold",
    fontSize: 18,
    // textDecoration: "underline",
    color: "#555",
    marginTop: 5,
    letterSpacing: 1,
  },
  miniTitle: {
    // marginTop: 6,
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
    color: "#696969",
  },
  itemsWrap: {
    flexDirection: "row", // Horizontal layout for text and image
    justifyContent: "space-between", // Push content to edges
    gap: 3,
    // backgroundColor: "red",
  },
  textBox: {
    marginTop: 24,
    fontSize: 14,
    textAlign: "justify",
    //   fontFamily: "AntonFamily",
  },
  text: {
    marginVertical: 2,
    fontSize: 12,
    textAlign: "justify",
    color: "#696969",
    lineHeight: 1.5,
  },
  centeredText: {
    marginVertical: 5,
    fontSize: 12,
    textAlign: "center",
    color: "#696969",
    // lineHeight: 1.5,
    fontWeight: "medium",
  },
  textSpan: {
    fontWeight: "extrabold",
    color: "#696969",
    marginTop: 10,
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
    marginVertical: 2,
    fontSize: 20,
    fontWeight: "extrabold",
    textAlign: "center",
    color: "#555",
    textDecoration: "underline",
  },
  date: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
    color: "#696969",
  },
  image: {
    marginTop: -10,
    marginHorizontal: "auto",
    borderRadius: ".4rem",
    width: 40,
    height: 40,
    objectFit: "cover",
  },
  underTakingWrap: {
    marginTop: 10,
  },
  h3: {
    fontSize: 16,
    color: "#696969",
    // paddingLeft: 16,
    marginTop: 0,
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
    paddingLeft: 12,
    position: "relative",
  },
  listItemName: {
    // fontWeight: "bold",
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
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
  bullet2: {
    position: "absolute",
    left: 3,
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

export default function UndertakingPDF({ enrolledStudent }) {
  console.log(enrolledStudent);
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
  const dateToday = new Date();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const monthInWords = monthNames[currentMonth];

  return (
    <Document title="Undertaking_&_Medical_Status.pdf">
      <Page style={styles.body}>
        <Image style={styles.image} src={"/assets/sensec-logo1.png"} />
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>SENYA SENIOR HIGH SCHOOL</Text>
          <Text style={styles.centeredText}>
            STUDENT’S UNDERTAKING ({" "}
            <Text style={{ fontWeight: "bold" }}>
              {enrolledStudent?.studentSchoolData?.batch?.fromYear}/
              {Number(enrolledStudent?.studentSchoolData?.batch?.fromYear) + 1}
            </Text>{" "}
            ACADEMIC YEAR )
          </Text>
          <Text style={styles.date}>
            {dateToday ? dateFormatter?.format(new Date(dateToday)) : ""}.
            {/* {monthInWords}, {currentYear}. */}
          </Text>
        </View>
        {/* <Image
          style={styles.image}
          src={enrolledStudent?.personalInfo?.profilePicture.url}
        /> */}
        <View style={styles.underTakingWrap}>
          <View style={styles.letterViews}>
            <Text style={styles.text}>
              I
              .....................................................................................,
              of ...........................................................
              having been admitted to Senya Senior High School, hereby undertake
              and affirm that;
            </Text>
          </View>
          {/* <View style={styles.letterViews}>
            <Text style={styles.listItemName}>
              I agree to ensure the following:
            </Text>
          </View> */}
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>1.</Text>
              <Text style={[styles.text, styles.listItem]}>
                I shall not flout lawful authority.
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>2.</Text>
              <Text style={[styles.text, styles.listItem]}>
                I shall not absent myself from school.
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>3.</Text>
              <Text style={[styles.text, styles.listItem]}>
                My child/ward will strictly adhere to the school’s dress code.
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>4.</Text>
              <Text style={[styles.text, styles.listItem]}>
                I shall not absent myself from school without any reasonable
                excuse or permission.
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>5.</Text>
              <Text style={[styles.text, styles.listItem]}>
                I shall not loiter around during instructional hours.
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>6.</Text>
              <Text style={[styles.text, styles.listItem]}>
                I shall participate in all academic activities.
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>7.</Text>
              <Text style={[styles.text, styles.listItem]}>
                I shall not engage in any form of examination malpractices.
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>8.</Text>
              <Text style={[styles.text, styles.listItem]}>
                I shall not break bounds (boarders moving out of school
                premises) .
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.bullet}>9.</Text>
              <Text style={[styles.text, styles.listItem]}>
                I shall be punctual to school gathering and functions.
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.bullet2}>10.</Text>
              <Text style={[styles.text, styles.listItem]}>
                I shall dress neatly and wear prescribed hair cut, attire and
                foot ware always.
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.bullet2}>11.</Text>
              <Text style={[styles.text, styles.listItem]}>
                I shall not bring or use any unprescribed item in the school.
                Eg: Mobile phone, electrical heater, mp3 player music box etc.
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.bullet2}>12.</Text>
              <Text style={[styles.text, styles.listItem]}>
                I shall not cause damage to any school property .
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.bullet2}>13.</Text>
              <Text style={[styles.text, styles.listItem]}>
                I shall not engage in any sexual misconduct in the school or
                outside the school.
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.bullet2}>14.</Text>
              <Text style={[styles.text, styles.listItem]}>
                I shall not do anything to harm another student physically or
                psychologically. Eg: assault or bullying .
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.bullet2}>15.</Text>
              <Text style={[styles.text, styles.listItem]}>
                I shall not cause any harm to any staff member or his or her
                relations.
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.bullet2}>16.</Text>
              <Text style={[styles.text, styles.listItem]}>
                I shall not engage in any occultic practices.
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.bullet2}>17.</Text>
              <Text style={[styles.text, styles.listItem]}>
                I shall not incite or participate in any riot or demonstration
                in the school.
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.bullet2}>18.</Text>
              <Text style={[styles.text, styles.listItem]}>
                I shall not engage in any form of gambling/betting, smoking,
                stealing, fighting.
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.bullet2}>19.</Text>
              <Text style={[styles.text, styles.listItem]}>
                I shall not possess or circulate any pornographic material.
              </Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.bullet2}>20.</Text>
              <Text style={[styles.text, styles.listItem]}>
                Boarders moving out of school premises should always take exeat.
              </Text>
            </View>
          </View>
          <Text style={[styles.text, styles.textSpan]}>
            In case I indulge in any of the acts as listed above, I hold myself
            liable to any disciplinary action the school authorities deem
            appropriate.
          </Text>
          <View style={styles.letterViews}>
            <Text style={[styles.text]}>
              This undertaking is signed on this day of
              ...............................................................
            </Text>
            <Text style={[styles.text]}>
              Student signature
              .......................................................
            </Text>
          </View>
          <View style={styles.letterViews}>
            <View style={styles.itemsWrap}>
              <View style={{ width: "50%" }}>
                <Text style={[styles.text, styles.textSpan1]}>
                  Parent/Guardian&apos;s Details
                </Text>
                <Text style={[styles.text]}>
                  Name of parent:
                  ..................................................
                </Text>
                <Text style={[styles.text]}>
                  Address:
                  ..............................................................
                </Text>
                <Text style={[styles.text]}>
                  ..............................................................................
                </Text>
                <Text style={[styles.text]}>
                  Contact:
                  ...............................................................
                </Text>
                <Text style={[styles.text]}>
                  Signature:
                  ............................................................
                </Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text style={[styles.text, styles.textSpan1]}>
                  School Administration
                </Text>
                <Text style={[styles.text]}>
                  .......................................................
                </Text>
                <Text style={[styles.text]}>Assist. Head (Adm) Sign</Text>
              </View>
            </View>
          </View>
        </View>
        {/* <View style={styles.underTakingWrap}>
          <Text style={styles.underTakingHeader}>MEDICAL STATUS</Text>
          <View style={styles.letterViews}>
            <Text style={styles.h3}>Student Information:</Text>
            <Text style={[styles.text, styles.textSpan1]}>
              Full Name: _____________________________
            </Text>
            <Text style={[styles.text, styles.textSpan1]}>
              Date of Birth: _____________________________
            </Text>
          </View>
          <View style={styles.letterViews}>
            <Text style={styles.h3}>Medical History:</Text>
            <Text style={[styles.text, styles.textSpan1]}>
              Allergies: _____________________________
            </Text>
            <Text style={[styles.text, styles.textSpan1]}>
              Chronic Illnesses: _____________________________
            </Text>
            <Text style={[styles.text, styles.textSpan1]}>
              Immunization Record: _____________________________
            </Text>
          </View>
          <View style={styles.letterViews}>
            <Text style={styles.h3}>Physical Examination:</Text>
            <Text style={[styles.text, styles.textSpan1]}>
              Height: _____________ <Text> </Text> Weight: _____________
            </Text>
            <Text style={[styles.text, styles.textSpan1]}>
              Blood Pressure: _____________
            </Text>
          </View>
          <View style={styles.letterViews}>
            <Text style={styles.h3}>Doctor’s Remarks:</Text>
            <Text style={[styles.text, styles.textSpan1]}>
              __________________________________________________________
              __________________________________________________________
              __________________________________________________________
              ____________________________________________________________________
            </Text>
          </View>
        </View> */}
        {/* <Text style={styles.text}>{medical_form}</Text> */}
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
