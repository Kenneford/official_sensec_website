import React from "react";
import ContactBanner from "../../components/forContactPage/banner/ContactBanner";
import ContactContent from "../../components/forContactPage/contact/ContactContent";
import { Box } from "@mui/material";
import Footer from "../../components/footer/Footer";

export function Contact() {
  return (
    <Box id="contactPage">
      <ContactBanner />
      <ContactContent />
      <Footer />
    </Box>
  );
}
