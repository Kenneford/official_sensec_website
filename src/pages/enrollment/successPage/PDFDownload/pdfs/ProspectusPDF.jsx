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
import {
  beddingItems,
  clothingItems,
  miscellaneous,
  personalHygieneItems,
  stationery,
} from "../options/pdfArrayData";

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
  letterTitleWrap: {
    paddingTop: 7,
  },
  letterTitle: {
    marginVertical: 2,
    paddingTop: 7,
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
  itemsWrap: {
    flexDirection: "row", // Horizontal layout for text and image
    justifyContent: "space-between", // Push content to edges
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
    color: "#292929",
    marginVertical: 10,
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

export default function ProspectusPDF({ enrolledStudent }) {
  return (
    <Document title={"Prospectus.pdf"}>
      <Page style={styles.body}>
        <Image style={styles.image} src={"/assets/sensec-logo1.png"} />
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>SENYA SENIOR HIGH SCHOOL</Text>
          <Text style={styles.headerTitle}>STUDENT PROSPECTUS</Text>
        </View>
        {/* <Image
          style={styles.image}
          src={enrolledStudent?.personalInfo?.profilePicture?.url}
        /> */}
        <View style={styles.letterTitleWrap}>
          <Text style={styles.letterTitle}>Items Required Upon Admission</Text>
        </View>
        <View style={styles.letterViews}>
          <Text style={styles.text}>
            Your required prospectus items are as follows:
          </Text>
        </View>
        <View style={styles.itemsWrap}>
          <View>
            <Text style={styles.listItemName}>Clothing:</Text>
            <View style={styles.list}>
              {clothingItems?.map((item) => (
                <View key={item?.name} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={[styles.text, styles.listItem]}>
                    {item?.name}
                  </Text>
                </View>
              ))}
            </View>
            <Text style={styles.listItemName}>Bedding:</Text>
            <View style={styles.list}>
              {beddingItems?.map((item) => (
                <View key={item?.name} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={[styles.text, styles.listItem]}>
                    {item?.name}
                  </Text>
                </View>
              ))}
            </View>
            <Text style={styles.listItemName}>Stationery:</Text>
            <View style={styles.list}>
              {stationery?.map((item) => (
                <View key={item?.name} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={[styles.text, styles.listItem]}>
                    {item?.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View>
            <Text style={styles.listItemName}>Personal Hygiene Items:</Text>
            <View style={styles.list}>
              {personalHygieneItems?.map((item) => (
                <View key={item?.name} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={[styles.text, styles.listItem]}>
                    {item?.name}
                  </Text>
                </View>
              ))}
            </View>
            <Text style={styles.listItemName}>Miscellaneous:</Text>
            <View style={styles.list}>
              {miscellaneous?.map((item) => (
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
