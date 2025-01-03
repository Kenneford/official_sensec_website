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
import { generalItems, girlsItems, boysItems } from "../options/pdfArrayData";

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
  letterTitleWrap: {
    marginTop: 20,
  },
  letterTitle: {
    // marginVertical: 2,
    paddingTop: 3,
    fontSize: 12,
    fontWeight: "extrabold",
    // textAlign: "center",
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
  itemsWrap: {
    flexDirection: "row", // Horizontal layout for text and image
    justifyContent: "space-between", // Push content to edges
    gap: 3,
    // backgroundColor: "red",
  },
  itemsFlex: {
    flex: 1,
  },
  listItem: {
    // marginBottom: 5,
    paddingLeft: 12,
    position: "relative",
  },
  listItemName: {
    fontWeight: "bold",
    color: "#696969",
    marginVertical: 10,
    letterSpacing: 1,
    fontSize: 14,
    textDecoration: "underline",
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
export default function ProspectusPDF({ enrolledStudent }) {
  return (
    <Document title={"Prospectus.pdf"}>
      <Page style={styles.body}>
        <Image style={styles.image} src={"/assets/sensec-logo1.png"} />
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>SENYA SENIOR HIGH SCHOOL</Text>
          <Text style={styles.centeredText}>
            P.O. Box 23, Senya-Beraku / GPS: CG-2308-4841
          </Text>
          <Text style={styles.miniTitle}>STUDENT PROSPECTUS</Text>
        </View>
        {/* <Image
          style={styles.image}
          src={enrolledStudent?.personalInfo?.profilePicture?.url}
        /> */}
        <View style={styles.letterTitleWrap}>
          <Text style={styles.letterTitle}>Items Required Upon Admission:</Text>
        </View>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.text}>
            Please take note of the specific items as{" "}
            <Text style={styles.textSpan1}>
              required by the school (all items are in relation to the
              Government provided list)
            </Text>
            .
          </Text>
        </View>
        <View>
          <Text style={styles.listItemName}>General Items</Text>
          <View style={styles.list}>
            {generalItems?.map((item) => (
              <View key={item?.name} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={[styles.text, styles.listItem]}>{item?.name}</Text>
              </View>
            ))}
          </View>
          <View style={styles.itemsWrap}>
            <View style={{ width: "50%" }}>
              <Text style={styles.listItemName}>Extra For Girls</Text>
              <View style={styles.list}>
                {girlsItems?.map((item) => (
                  <View key={item?.name} style={styles.listItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={[styles.text, styles.listItem]}>
                      {item?.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={{ width: "50%" }}>
              <Text style={styles.listItemName}>Extra For Boys</Text>
              <View style={styles.list}>
                {boysItems?.map((item) => (
                  <View key={item?.name} style={styles.listItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={[styles.text, styles.listItem]}>
                      {item?.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.letterViews}>
          <Text style={[styles?.text, styles.textSpan1]}>
            All items should be embossed with students’ names. (Embroidery for
            Dresses and for other items use Permanent marker)
          </Text>
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

ProspectusPDF.propTypes = {
  enrolledStudent: PropTypes.object,
};
