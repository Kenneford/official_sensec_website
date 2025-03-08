import { Box, Typography } from "@mui/material";
import React from "react";
import SmallFooter from "../../components/footer/SmallFooter";

export function PrivacyPolicy() {
  return (
    <>
      <Box
        maxWidth={960}
        m={"0 auto 2rem"}
        p={2}
        color="#696969"
        sx={{
          // boxShadow: "0px 1px 2px 2px #cccc",
          borderRadius: ".4rem",
        }}
      >
        <Typography
          variant="h1"
          fontSize={"1.5rem"}
          fontWeight={500}
          color="#696969"
          m={".5rem 0 1rem"}
        >
          Privacy Policy - Senya SHS
        </Typography>
        <Box>
          <Typography fontWeight={500} color="#696969" mb={2}>
            Effective Date:{" "}
            <span style={{ fontStyle: "italic", fontWeight: 300 }}>
              7th March, 2025.
            </span>
          </Typography>
          <Typography mb={2}>
            <span style={{ fontWeight: 500 }}>
              Senya Senior High School (&quot;we,&quot; &quot;our,&quot;
              &quot;us&quot;)
            </span>{" "}
            is committed to protecting the privacy of users{" "}
            <span style={{ fontWeight: 500 }}>
              (&quot;you,&quot; &quot;your&quot;)
            </span>{" "}
            who visit our website{" "}
            <span style={{ fontWeight: 500 }}>(www.senyashs.com)</span>. This
            Privacy Policy outlines the types of personal information we
            collect, how we use it, and the measures we take to ensure your data
            is secure.
          </Typography>
          <Box mb={2}>
            <Typography fontWeight={500} mb={1}>
              1. <span>Information We Collect</span>
            </Typography>
            <Typography mb={1}>
              We may collect the following types of personal data:
            </Typography>
            <ul style={{ listStyle: "circle" }}>
              <li style={{ marginLeft: "2rem", marginBottom: ".5rem" }}>
                <Typography>
                  <span style={{ fontWeight: 500 }}>Personal Information:</span>{" "}
                  Name, email address, phone number, and other contact details
                  when voluntarily provided through forms, applications, or
                  email communications.
                </Typography>
              </li>
              <li style={{ marginLeft: "2rem", marginBottom: ".5rem" }}>
                <Typography>
                  <span style={{ fontWeight: 500 }}>Usage Data:</span>{" "}
                  Information about how you interact with our website, including
                  IP addresses, browser type, and browsing history.
                </Typography>
              </li>
              <li style={{ marginLeft: "2rem", marginBottom: ".5rem" }}>
                <Typography>
                  <span style={{ fontWeight: 500 }}>Cookies:</span> We use
                  cookies to enhance your experience on our website. You can
                  control the use of cookies via your browser settings.
                </Typography>
              </li>
            </ul>
          </Box>
          <Box mb={2}>
            <Typography fontWeight={500} mb={1}>
              2. <span>How We Use Your Information</span>
            </Typography>
            <Typography mb={1}>
              We use the personal data collected for the following purposes:
            </Typography>
            <ul style={{ listStyle: "circle" }}>
              <li style={{ marginLeft: "2rem", marginBottom: ".5rem" }}>
                <Typography>
                  To communicate with you regarding school activities,
                  admissions, and inquiries.
                </Typography>
              </li>
              <li style={{ marginLeft: "2rem", marginBottom: ".5rem" }}>
                <Typography>
                  To improve the functionality and content of our website.
                </Typography>
              </li>
              <li style={{ marginLeft: "2rem", marginBottom: ".5rem" }}>
                <Typography>
                  To comply with legal obligations under{" "}
                  <span style={{ fontWeight: 500 }}>
                    Ghana’s Data Protection Act, 2012 (Act 843)
                  </span>
                  .
                </Typography>
              </li>
              <li style={{ marginLeft: "2rem", marginBottom: ".5rem" }}>
                <Typography>
                  To analyze website traffic and user preferences to enhance
                  user experience.
                </Typography>
              </li>
            </ul>
          </Box>
          <Box mb={2}>
            <Typography fontWeight={500} mb={1}>
              3. <span>Sharing of Your Information</span>
            </Typography>
            <Typography mb={1}>
              We do not sell, trade, or rent personal information to third
              parties. However, we may share your data with trusted third
              parties for the following reasons:
            </Typography>
            <ul style={{ listStyle: "circle" }}>
              <li style={{ marginLeft: "2rem", marginBottom: ".5rem" }}>
                <Typography>
                  When legally required to comply with{" "}
                  <span style={{ fontWeight: 500 }}>Ghanaian law</span> or a{" "}
                  <span style={{ fontWeight: 500 }}>judicial proceeding</span>.
                </Typography>
              </li>
              <li style={{ marginLeft: "2rem", marginBottom: ".5rem" }}>
                <Typography>
                  With service providers who assist us in operating our website
                  or managing data, under strict confidentiality agreements.
                </Typography>
              </li>
            </ul>
          </Box>
          <Box mb={2}>
            <Typography fontWeight={500} mb={1}>
              4. <span>Data Security</span>
            </Typography>
            <Box>
              <Typography>
                We employ a range of security measures, including encryption and
                secure servers, to protect your personal information. However,
                no method of transmission over the internet is completely
                secure, and we cannot guarantee the absolute security of your
                data.
              </Typography>
            </Box>
          </Box>
          <Box mb={2}>
            <Typography fontWeight={500} mb={1}>
              5. <span>Your Rights</span>
            </Typography>
            <Typography mb={1}>
              Under the{" "}
              <span style={{ fontWeight: 500 }}>
                Data Protection Act, 2012 (Act 843)
              </span>
              , you have the right to:
            </Typography>
            <ul style={{ listStyle: "circle" }}>
              <li style={{ marginLeft: "2rem", marginBottom: ".5rem" }}>
                <Typography>
                  Request access to the personal data we hold about you.
                </Typography>
              </li>
              <li style={{ marginLeft: "2rem", marginBottom: ".5rem" }}>
                <Typography>
                  Request that inaccurate data be corrected.
                </Typography>
              </li>
              <li style={{ marginLeft: "2rem", marginBottom: ".5rem" }}>
                <Typography>
                  Request that your data be deleted or restricted under certain
                  circumstances.
                </Typography>
              </li>
              <li style={{ marginLeft: "2rem", marginBottom: ".5rem" }}>
                <Typography>
                  Withdraw consent to data processing, where consent was
                  previously given.
                </Typography>
              </li>
            </ul>
            <Box>
              <Typography fontWeight={500} fontStyle={"italic"}>
                If you wish to exercise any of these rights, please contact us
                at: +233 508 670 598/senya.shs.1991@gmail.com
              </Typography>
            </Box>
          </Box>
          <Box mb={2}>
            <Typography fontWeight={500} mb={1}>
              6. <span>Changes to This Privacy Policy</span>
            </Typography>
            <Box>
              <Typography>
                We reserve the right to update or modify this Privacy Policy at
                any time. We will notify you of any significant changes by
                updating the policy on this page. Please review this page
                periodically for the latest information.
              </Typography>
            </Box>
          </Box>
          <Box mb={2}>
            <Typography fontWeight={500} mb={1}>
              7. <span>Contact Us</span>
            </Typography>
            <Box>
              <Typography mb={1}>
                If you have any questions about this Privacy Policy or our data
                practices, please contact us at:
              </Typography>
              <Typography fontWeight={500}>Senya Senior High School</Typography>
              <Typography fontWeight={500}>
                GPS Address:{" "}
                <span
                  style={{
                    fontWeight: 300,
                  }}
                >
                  CG-2308-4841
                </span>
              </Typography>
              <Typography fontWeight={500}>
                Phone:{" "}
                <span
                  style={{
                    fontWeight: 300,
                  }}
                >
                  +233 508 670 598
                </span>
              </Typography>
              <Typography fontWeight={500}>
                Email:{" "}
                <span
                  style={{
                    fontWeight: 300,
                  }}
                >
                  senya.shs.1991@gmail.com
                </span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <SmallFooter />
    </>
  );
}
