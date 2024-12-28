import React from "react";
import ContactBanner from "../../components/forContactPage/banner/ContactBanner";
import ContactContent from "../../components/forContactPage/contact/ContactContent";
import { Box } from "@mui/material";

export function Contact() {
  return (
    <Box id="contactPage">
      <ContactBanner />
      <ContactContent />
    </Box>
  );
}
