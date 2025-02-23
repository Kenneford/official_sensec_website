import ContactBanner from "../../components/forContactPage/banner/ContactBanner";
import ContactContent from "../../components/forContactPage/contact/ContactContent";
import { Box } from "@mui/material";
import Footer from "../../components/footer/Footer";
import { Helmet } from "react-helmet-async";

export function Contact() {
  return (
    <Box id="contactPage">
      <Helmet>
        <title>Contact Us - Senya SHS</title>
        <meta
          name="description"
          content="For inquiries, admissions, or support, feel free to reach out to us. We're here to help!"
        />
        <meta
          name="keywords"
          content="Senya SHS Contact Us, Sensec Contact Us, Contact Us"
        />
        <meta property="og:title" content="Contact Us | Senya SHS" />
        <meta
          property="og:description"
          content="For inquiries, admissions, or support, feel free to reach out to us. We're here to help!"
        />
        <link rel="canonical" href="https://www.senyashs.com/sensec/contact" />
        <link rel="icon" type="image/png" href="/assets/sensec-logo1.png" />
      </Helmet>
      <ContactBanner />
      <ContactContent />
      <Footer />
    </Box>
  );
}
