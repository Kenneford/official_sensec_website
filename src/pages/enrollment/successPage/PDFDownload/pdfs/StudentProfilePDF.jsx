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
export default function StudentProfilePDF({ enrolledStudent }) {
  console.log(enrolledStudent);

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 20,
    },
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
      fontFamily: "Roboto",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 10,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
      //   fontFamily: "AntonFamily",
    },
    logo: {
      marginTop: -20,
      marginHorizontal: "auto",
      borderRadius: ".4rem",
      width: 40,
      height: 40,
      objectFit: "cover",
    },
    imageWrap: { alignItems: "flex-end" },
    image: {
      marginTop: 10,
      // marginHorizontal: "auto",
      right: 0,
      borderRadius: ".4rem",
      width: 65,
      height: 70,
      objectFit: "cover",
    },
    h3: {
      fontSize: 16,
      color: "#696969",
      paddingLeft: 16,
      marginTop: 10,
      marginBottom: 8,
    },
    table: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      borderWidth: 1,
      borderColor: "#ccc",
    },
    tableRow: {
      flexDirection: "column",
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      borderBottomStyle: "solid",
    },
    headerTitleWrap: {
      marginTop: 0,
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
    tableHeader: {
      // display: "flex",
      backgroundColor: "#f5f5f5",
    },
    centeredText: {
      marginVertical: 5,
      fontSize: 12,
      textAlign: "center",
      color: "#696969",
      // lineHeight: 1.5,
      fontWeight: "medium",
    },
    miniTitle: {
      // marginTop: 6,
      fontSize: 12,
      textAlign: "center",
      fontWeight: "bold",
      color: "#696969",
    },
    row: {
      flexDirection: "column",
      // justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: "#bfbfbf",
      borderBottomStyle: "solid",
      alignItems: "center", // Align content vertically
    },
    header: {
      padding: 5,
      paddingLeft: 16,
      fontSize: 12,
      letterSpacing: 1,
      fontWeight: "bold",
      color: "#555",
    },
    header1: {
      flex: 1,
    },
    header2: {
      flex: 2,
    },
    rowBg: {
      backgroundColor: "#f0f0f0",
    },
    tableCell: {
      fontWeight: "thin",
      letterSpacing: 1,
      padding: 6,
      paddingLeft: 16,
      fontSize: 10,
      color: "#696969",
      // borderRightWidth: 1,
      // borderRightColor: "#ccc",
    },
    lastCell: {
      borderRightWidth: 0, // Remove the right border for the last cell
    },
  });

  return (
    <Document title={"Student_Profile.pdf"}>
      <Page size="A4" style={styles.body}>
        <View>
          <Image style={styles.logo} src={"/assets/sensec-logo1.png"} />
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>SENYA SENIOR HIGH SCHOOL</Text>
            <Text style={styles.centeredText}>
              P.O. Box 23, Senya-Beraku / GPS: CG-2308-4841
            </Text>
            <Text style={styles.miniTitle}>STUDENT PROFILE</Text>
          </View>
          {/* <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>SENYA SENIOR HIGH SCHOOL</Text>
            <Text style={styles.miniTitle}>STUDENT PROFILE</Text>
          </View> */}
          <View style={styles.imageWrap}>
            <Image
              style={styles.image}
              src={enrolledStudent?.personalInfo?.profilePicture.url}
            />
          </View>
          <Text style={styles.h3}>Personal Details</Text>
          <View style={styles.table}>
            <View style={styles.header1}>
              <Text style={[styles.header, styles.rowBg]}>ID</Text>
              <Text style={styles.header}>Full Name</Text>
              <Text style={[styles.header, styles.rowBg]}>Date of Birth</Text>
              <Text style={styles.header}>Place of Birth</Text>
              <Text style={[styles.header, styles.rowBg]}>Gender</Text>
              <Text style={styles.header}>Nationality</Text>
            </View>
            <View style={styles.header2}>
              <Text style={[styles.tableCell]}>
                {enrolledStudent?.uniqueId}
              </Text>
              <Text style={[styles.tableCell, styles.rowBg]}>
                {enrolledStudent?.personalInfo?.fullName}
              </Text>
              <Text style={[styles.tableCell]}>
                {enrolledStudent?.personalInfo?.dateOfBirth
                  ? dateFormatter.format(
                      new Date(enrolledStudent?.personalInfo?.dateOfBirth)
                    )
                  : "---"}
              </Text>
              <Text style={[styles.tableCell, styles.rowBg]}>
                {enrolledStudent?.personalInfo?.placeOfBirth}
              </Text>
              <Text style={[styles.tableCell]}>
                {enrolledStudent?.personalInfo?.gender}
              </Text>
              <Text style={[styles.tableCell, styles.rowBg]}>
                {enrolledStudent?.personalInfo?.nationality}
              </Text>
            </View>
          </View>
          <Text style={styles.h3}>School Data</Text>
          <View style={styles.table}>
            <View style={styles.header1}>
              <Text style={[styles.header, styles.rowBg]}>JHS Attended</Text>
              <Text style={styles.header}>JHS Index-No.</Text>
              <Text style={[styles.header, styles.rowBg]}>Student ID</Text>
              <Text style={styles.header}>Class Level</Text>
              <Text style={[styles.header, styles.rowBg]}>Program</Text>
              <Text style={styles.header}>Batch</Text>
              <Text style={[styles.header, styles.rowBg]}>Class</Text>
            </View>
            <View style={styles.header2}>
              <View key={enrolledStudent?.uniqueId}>
                <Text style={[styles.tableCell]}>
                  {enrolledStudent?.studentSchoolData?.jhsAttended}
                </Text>
                <Text style={[styles.tableCell, styles.rowBg]}>
                  {enrolledStudent?.studentSchoolData?.jhsIndexNo}
                </Text>
                <Text style={[styles.tableCell]}>
                  {enrolledStudent?.uniqueId}
                </Text>
                <Text style={[styles.tableCell, styles.rowBg]}>
                  {enrolledStudent?.studentSchoolData?.currentClassLevel?.name}
                </Text>
                <Text style={[styles.tableCell]}>
                  {enrolledStudent?.studentSchoolData?.program?.name}
                </Text>
                <Text style={[styles.tableCell, styles.rowBg]}>
                  {enrolledStudent?.studentSchoolData?.batch?.yearRange}
                </Text>
                <Text style={[styles.tableCell]}>
                  {enrolledStudent?.studentSchoolData?.currentClassLevelSection
                    ? enrolledStudent?.studentSchoolData
                        ?.currentClassLevelSection?.label
                    : "---"}
                </Text>
              </View>
            </View>
          </View>
          <Text style={styles.h3}>Status</Text>
          <View style={styles.table}>
            <View style={styles.header1}>
              <Text style={[styles.header, styles.rowBg]}>
                Residential Status
              </Text>
              <Text style={[styles.header]}>Height</Text>
              <Text style={[styles.header, styles.rowBg]}>Weight</Text>
              <Text style={[styles.header]}>Complexion</Text>
              <Text style={[styles.header, styles.rowBg]}>Mother Tongue</Text>
              <Text style={[styles.header]}>Other Tongue</Text>
            </View>
            <View style={styles.header2}>
              <Text style={[styles.tableCell]}>
                {enrolledStudent?.status?.residentialStatus}
              </Text>
              <Text style={[styles.tableCell, styles.rowBg]}>
                {enrolledStudent?.status?.height}
              </Text>
              <Text style={[styles.tableCell]}>
                {enrolledStudent?.status?.weight}
              </Text>
              <Text style={[styles.tableCell, styles.rowBg]}>
                {enrolledStudent?.status?.complexion}
              </Text>
              <Text style={[styles.tableCell]}>
                {enrolledStudent?.status?.motherTongue}
              </Text>
              <Text style={[styles.tableCell, styles.rowBg]}>
                {enrolledStudent?.status?.otherTongue}
              </Text>
            </View>
          </View>
          <Text style={styles.h3}>Location Address/Contacts</Text>
          <View style={styles.table}>
            <View style={styles.header1}>
              <Text style={[styles.header, styles.rowBg]}>Home Town</Text>
              <Text style={[styles.header]}>Region</Text>
              <Text style={[styles.header, styles.rowBg]}>District</Text>
              <Text style={[styles.header]}>Current City</Text>
              <Text style={[styles.header, styles.rowBg]}>House Address</Text>
              <Text style={[styles.header]}>GPS Address</Text>
              <Text style={[styles.header, styles.rowBg]}>Email</Text>
              <Text style={[styles.header]}>Mobile Phone</Text>
            </View>
            <View style={styles.header2}>
              <Text style={[styles.tableCell]}>
                {enrolledStudent?.contactAddress?.homeTown}
              </Text>
              <Text style={[styles.tableCell, styles.rowBg]}>
                {enrolledStudent?.contactAddress?.region}
              </Text>
              <Text style={[styles.tableCell]}>
                {enrolledStudent?.contactAddress?.district}
              </Text>
              <Text style={[styles.tableCell, styles.rowBg]}>
                {enrolledStudent?.contactAddress?.currentCity}
              </Text>
              <Text style={[styles.tableCell]}>
                {enrolledStudent?.contactAddress?.residentialAddress}
              </Text>
              <Text style={[styles.tableCell, styles.rowBg]}>
                {enrolledStudent?.contactAddress?.gpsAddress}
              </Text>
              <Text style={[styles.tableCell]}>
                {enrolledStudent?.contactAddress?.email}
              </Text>
              <Text style={[styles.tableCell, styles.rowBg]}>
                {enrolledStudent?.contactAddress?.mobile}
              </Text>
            </View>
          </View>
          {enrolledStudent?.parent && (
            <>
              <Text style={styles.h3}>Parent</Text>
              <View style={styles.table}>
                <View style={styles.header1}>
                  <Text style={[styles.header, styles.rowBg]}>
                    Father&apos;s Name
                  </Text>
                  <Text style={[styles.header]}>Father&apos;s Occupation</Text>
                  <Text style={[styles.header, styles.rowBg]}>
                    Mother&apos;s Name
                  </Text>
                  <Text style={[styles.header]}>Mother&apos;s Occupation</Text>
                  <Text style={[styles.header, styles.rowBg]}>
                    House Address
                  </Text>
                  <Text style={[styles.header]}>Mobile Phone</Text>
                  <Text style={[styles.header, styles.rowBg]}>Email</Text>
                </View>
                <View style={styles.header2}>
                  <Text style={[styles.tableCell]}>
                    {enrolledStudent?.parent?.fatherName}
                  </Text>
                  <Text style={[styles.tableCell, styles.rowBg]}>
                    {enrolledStudent?.parent?.fathersOccupation}
                  </Text>
                  <Text style={[styles.tableCell]}>
                    {enrolledStudent?.parent?.motherName}
                  </Text>
                  <Text style={[styles.tableCell, styles.rowBg]}>
                    {enrolledStudent?.parent?.mothersOccupation}
                  </Text>
                  <Text style={[styles.tableCell]}>
                    {enrolledStudent?.parent?.address}
                  </Text>
                  <Text style={[styles.tableCell, styles.rowBg]}>
                    {enrolledStudent?.parent?.mobile}
                  </Text>
                  <Text style={[styles.tableCell]}>
                    {enrolledStudent?.parent?.email
                      ? enrolledStudent?.parent?.email
                      : "---"}
                  </Text>
                </View>
              </View>
            </>
          )}
          {enrolledStudent?.guardian && (
            <>
              <Text style={styles.h3}>Guardian</Text>
              <View style={styles.table}>
                <View style={styles.header1}>
                  <Text style={[styles.header, styles.rowBg]}>
                    Guardian Name
                  </Text>
                  <Text style={[styles.header]}>House Address</Text>
                  <Text style={[styles.header, styles.rowBg]}>Email</Text>
                  <Text style={[styles.header]}>Mobile Phone</Text>
                </View>
                <View style={styles.header2}>
                  <Text style={[styles.tableCell]}>
                    {enrolledStudent?.guardian?.guardianName}
                  </Text>
                  <Text style={[styles.tableCell, styles.rowBg]}>
                    {enrolledStudent?.guardian?.address}
                  </Text>
                  <Text style={[styles.tableCell]}>
                    {enrolledStudent?.guardian?.email}
                  </Text>
                  <Text style={[styles.tableCell, styles.rowBg]}>
                    {enrolledStudent?.guardian?.mobile}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
}

StudentProfilePDF.propTypes = {
  enrolledStudent: PropTypes.object,
};
