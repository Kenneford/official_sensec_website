import { Box, Typography } from "@mui/material";
import React from "react";
import SmallFooter from "../../components/footer/SmallFooter";

export function TermsOfService() {
  return (
    <>
      <Box
        maxWidth={960}
        m={"0 auto 2rem"}
        p={2}
        color="#696969"
        sx={{
          //   boxShadow: "0px 1px 2px 2px #cccc",
          borderRadius: ".4rem",
        }}
      >
        <Typography
          variant="h1"
          fontSize={"1.5rem"}
          fontWeight={500}
          color="#696969"
          m={"0 0 1rem"}
        >
          Terms Of Service | Senya SHS
        </Typography>
        <Box>
          <Typography fontWeight={500} color="#696969" mb={2}>
            Effective Date:{" "}
            <span style={{ fontStyle: "italic", fontWeight: 300 }}>
              7th March, 2025.
            </span>
          </Typography>
          <Typography mb={2}>
            These Terms of Service (&quot;Terms&quot;) govern your use of the
            website (www.senyashs.com) operated by Senya Senior High School
            (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;). By accessing or
            using this website, you agree to be bound by these Terms. If you do
            not agree, you should not use our website.
          </Typography>
          <Box mb={2}>
            <Typography fontWeight={500} mb={1}>
              1. <span>Use of the Website</span>
            </Typography>
            <ul style={{ listStyle: "circle" }}>
              <li style={{ marginLeft: "2rem", marginBottom: ".5rem" }}>
                <Typography>
                  This website is provided for informational purposes about
                  Senya Senior High School, its programs, and activities. You
                  may use the website solely for personal, non-commercial use.
                </Typography>
              </li>
              <li style={{ marginLeft: "2rem", marginBottom: ".5rem" }}>
                <Typography>
                  You must not use the website for any unlawful purposes,
                  including but not limited to fraud, defamation, or
                  transmitting harmful materials.
                </Typography>
              </li>
              <li style={{ marginLeft: "2rem" }}>
                <Typography>
                  Unauthorized use of the website, such as hacking or attempting
                  to access restricted areas, is prohibited.
                </Typography>
              </li>
            </ul>
          </Box>
          <Box mb={2}>
            <Typography fontWeight={500} mb={1}>
              2. <span>Content Ownership</span>
            </Typography>
            <Box>
              <Typography>
                All content on the website, including text, images, logos, and
                other materials, is the intellectual property of Senya Senior
                High School unless otherwise stated. You may not reproduce,
                distribute, or modify any content without prior written consent
                from the school.
              </Typography>
            </Box>
          </Box>
          <Box mb={2}>
            <Typography fontWeight={500} mb={1}>
              3. <span>User Submissions</span>
            </Typography>
            <Box>
              <Typography>
                If you submit any content (e.g., inquiries, comments, or
                feedback) through the website, you grant us a non-exclusive,
                royalty-free, worldwide license to use, display, and distribute
                such content. You are solely responsible for the legality and
                accuracy of any content you submit.
              </Typography>
            </Box>
          </Box>
          <Box mb={2}>
            <Typography fontWeight={500} mb={1}>
              4. <span>Third-Party Links</span>
            </Typography>
            <Box>
              <Typography>
                Our website may contain links to third-party websites. These
                links are provided for your convenience and do not signify that
                we endorse the content on those websites. We are not responsible
                for the privacy practices or content of third-party sites.
              </Typography>
            </Box>
          </Box>
          <Box mb={2}>
            <Typography fontWeight={500} mb={1}>
              5. <span>Disclaimers</span>
            </Typography>
            <ul style={{ listStyle: "circle" }}>
              <li style={{ marginLeft: "2rem" }}>
                <Typography>
                  We strive to ensure the information on the website is accurate
                  and up-to-date. However, we make no warranties regarding the
                  completeness, accuracy, or reliability of any information.
                </Typography>
              </li>
              <li style={{ marginLeft: "2rem" }}>
                <Typography>
                  The website is provided &quot;as is,&quot; without any express
                  or implied warranties. We do not guarantee that the website
                  will be error-free, secure, or available at all times.
                </Typography>
              </li>
            </ul>
          </Box>
          <Box mb={2}>
            <Typography fontWeight={500} mb={1}>
              6. <span>Limitation of Liability</span>
            </Typography>
            <Box>
              <Typography>
                To the fullest extent permitted by law, Senya Senior High School
                will not be liable for any damages arising out of or in
                connection with the use of our website. This includes direct,
                indirect, incidental, consequential, or punitive damages, even
                if we were advised of the possibility of such damages.
              </Typography>
            </Box>
          </Box>
          <Box mb={2}>
            <Typography fontWeight={500} mb={1}>
              7. <span>Indemnification</span>
            </Typography>
            <Box>
              <Typography>
                You agree to indemnify and hold harmless Senya Senior High
                School, its staff, and affiliates from any claims, damages,
                losses, or expenses (including legal fees) that arise from your
                use of the website or violation of these Terms.
              </Typography>
            </Box>
          </Box>
          <Box mb={2}>
            <Typography fontWeight={500} mb={1}>
              8. <span>Modifications to Terms</span>
            </Typography>
            <Box>
              <Typography>
                We reserve the right to modify or update these Terms at any time
                without prior notice. By continuing to use the website after
                changes are posted, you agree to be bound by the updated Terms.
              </Typography>
            </Box>
          </Box>
          <Box mb={2}>
            <Typography fontWeight={500} mb={1}>
              9. <span>Governing Law</span>
            </Typography>
            <Box>
              <Typography>
                These Terms shall be governed by and construed in accordance
                with the laws of Ghana. Any disputes arising from these Terms or
                your use of the website will be subject to the exclusive
                jurisdiction of the Ghanaian courts.
              </Typography>
            </Box>
          </Box>
          <Box mb={2}>
            <Typography fontWeight={500} mb={1}>
              10. <span>Contact Us</span>
            </Typography>
            <Box>
              <Typography mb={1}>
                If you have any questions about these Terms, please contact us
                at:
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
          <Box>
            <Typography fontWeight={500} fontStyle={"italic"}>
              This Terms of Service have been crafted to meet the legal
              standards and guidelines set by the Data Protection Act, 2012 (Act
              843) of Ghana.
            </Typography>
          </Box>
        </Box>
      </Box>
      <SmallFooter />
    </>
  );
}
