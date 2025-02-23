import { Avatar, Box, List, ListItem, Typography } from "@mui/material";
import "./enrollmentDocumentation.scss";
import { useNavigate, useOutletContext } from "react-router-dom";
import { NavigationBar } from "../../../../components/navbar/NavigationBar";
import { ContainerBox } from "../../../../muiStyling/muiStyling";
import { HashLink } from "react-router-hash-link";
import Footer from "../../../../components/footer/Footer";
import { Helmet } from "react-helmet-async";

export function EnrollmentDocumentation() {
  const {
    currentAction,
    setCurrentAction,
    currentLink,
    setCurrentLink,
    setOpenSubNavLinks,
    openSubNavLinks,
    setOpenUserActions,
    openUserActions,
    setOpenSignUpActions,
    openSignUpActions,
    setOpenMenuLinks,
    openMenuLinks,
  } = useOutletContext();
  const navigate = useNavigate();

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
    const yOffset = -150;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };
  //THIS REMOVES THE NavLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }

  return (
    <Box id="enrollmentDocumentation">
      <Helmet>
        <link rel="icon" type="image/png" href="/assets/sensec-logo1.png" />
        <title>Enrollment - Senya SHS</title>
        <meta
          name="description"
          content="After the Ghana Education Service (GES) placement, students are required to check if they have been placed in Senya SHS. Follow these steps to check your placement:"
        />
        <meta
          name="keywords"
          content="Senya SHS Enrollment, Sensec Enrollment, Sensec Official Website Enrollment"
        />
        <meta property="og:title" content="Enrollment | Senya SHS" />
        <meta
          property="og:description"
          content="After the Ghana Education Service (GES) placement, students are required to check if they have been placed in Senya SHS. Follow these steps to check your placement:"
        />
        <link
          rel="canonical"
          href="https://www.senyashs.com/sensec/students/enrollment/documentation"
        />
        <link
          rel="icon"
          type="image/png"
          href="https://www.senyashs.com/assets/sensec-logo1.png"
        />
      </Helmet>
      {/* School Logo */}
      <Box
        direction="column"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: ".3rem 0",
          height: "4.5rem",
        }}
      >
        <Box
          onClick={() => {
            // Click handler
            localStorage.removeItem("currentNavLink");
            navigate("/sensec/homepage");
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Avatar
            src="/assets/sensec-logo1.png"
            sx={{ alignItems: "center" }}
          />
          <Box sx={{ display: "flex", height: "1.5rem" }}>
            <Typography variant="h6" color="green">
              Sen
            </Typography>
            <Typography variant="h6" color="#aeae0d">
              sec
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* Main navbar links */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          padding: 0,
          zIndex: 5,
        }}
      >
        <NavigationBar
          setOpenSubNavLinks={setOpenSubNavLinks}
          openSubNavLinks={openSubNavLinks}
          setOpenUserActions={setOpenUserActions}
          openUserActions={openUserActions}
          setOpenSignUpActions={setOpenSignUpActions}
          openSignUpActions={openSignUpActions}
          setOpenMenuLinks={setOpenMenuLinks}
          openMenuLinks={openMenuLinks}
          currentAction={currentAction}
          setCurrentAction={setCurrentAction}
          currentLink={currentLink}
          setCurrentLink={setCurrentLink}
        />
      </Box>
      <ContainerBox
        sx={{
          width: { xs: "95%", sm: { minWidth: "50rem" } }, // Responsive width based on screen size
          maxWidth: { md: "90rem", lg: "90rem" },
          margin: "auto",
          padding: { xs: "0", sm: "1rem .5rem" },
          fontSize: "calc(0.7rem + 1vmin)",
          letterSpacing: "1px",
        }}
        bgcolor="#fff"
      >
        <Box
          className="container"
          sx={{
            width: { xs: "100%", sm: "90%", md: "80%" },
            margin: "auto",
            padding: { xs: "1rem .5rem", sm: "2rem 1rem" },
            borderRadius: ".4rem",
          }}
        >
          <Box sx={{ color: "#696969", textAlign: "center" }}>
            <h1 style={{ fontSize: "1.5em", textDecoration: "underline" }}>
              Senya Senior High School
            </h1>
            <p
              style={{
                fontStyle: "italic",
                textDecoration: "underline",
                letterSpacing: "2px",
                marginTop: ".5rem",
              }}
            >
              Enrollment Process Documentation
            </p>
          </Box>
          <Box sx={{ m: "2rem 0 1rem" }}>
            <p className="welcomeMsg">
              Welcome to Senya Senior High School! Below is the detailed guide
              to help prospective students complete their enrollment process
              smoothly.
            </p>
          </Box>
          <Box sx={{ m: "2rem 0 1rem" }}>
            <h3>
              Step 1: <span>Placement Check</span>
            </h3>
            <p className="stepInfo">
              After the Ghana Education Service (GES) placement, students are
              required to check if they have been placed in Senya SHS. Follow
              these steps to check your placement:
            </p>
            <List>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  •
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  Students can visit our website at{" "}
                  <a
                    href="https://www.senyashs.com/sensec/students/enrollment/placement_check"
                    target="blank"
                    style={{
                      color: "#0794bf",
                      textDecoration: "underline",
                      flexWrap: "wrap",
                      wordBreak: "break-word", // Allows breaking long words
                      overflowWrap: "break-word", // Ensures proper wrapping
                      whiteSpace: "normal", // Allows wrapping instead of keeping in one line
                    }}
                  >
                    www.senyashs.com/sensec/students/enrollment/placement_check
                  </a>{" "}
                  to check their placement.
                </Typography>
              </ListItem>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  •
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  Enter your Index Number and year of completion.
                </Typography>
              </ListItem>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  •
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  Click Submit to view your placement details.
                </Typography>
              </ListItem>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  •
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  Check if Senya Senior High School is your placed institution.
                </Typography>
              </ListItem>
            </List>
          </Box>
          <Box sx={{ m: "2rem 0 1rem" }}>
            <h3>
              Step 2: <span>Placement Data Update</span>
            </h3>
            <p className="stepInfo">
              If you have been successfully placed in Senya SHS, you are
              required to update your placement data. Follow these steps:
            </p>
            <List>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  1.
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  On the placement success page, click on the Update Placement
                  Data button.
                </Typography>
              </ListItem>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  2.
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  Fill in the required fields:
                </Typography>
              </ListItem>
              <Box sx={{ ml: 3, mt: 0 }}>
                <List>
                  <ListItem style={{ alignItems: "flex-start" }}>
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                      •
                    </Typography>
                    <Typography sx={{ fontSize: ".9em" }}>Full Name</Typography>
                  </ListItem>
                  <ListItem style={{ alignItems: "flex-start" }}>
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                      •
                    </Typography>
                    <Typography sx={{ fontSize: ".9em" }}>
                      JHS Attended
                    </Typography>
                  </ListItem>
                  <ListItem style={{ alignItems: "flex-start" }}>
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                      •
                    </Typography>
                    <Typography sx={{ fontSize: ".9em" }}>
                      Year Graduated
                    </Typography>
                  </ListItem>
                  <ListItem style={{ alignItems: "flex-start" }}>
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                      •
                    </Typography>
                    <Typography sx={{ fontSize: ".9em" }}>
                      Contact Number
                    </Typography>
                  </ListItem>
                  <ListItem style={{ alignItems: "flex-start" }}>
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                      •
                    </Typography>
                    <Typography sx={{ fontSize: ".9em" }}>
                      Other required fields as specified on the page.
                    </Typography>
                  </ListItem>
                </List>
              </Box>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  3.
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  Double-check all details for accuracy.
                </Typography>
              </ListItem>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  4.
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  Click Save to update your data.
                </Typography>
              </ListItem>
            </List>
            <Box className="note">
              <span>Note: </span>
              <p>
                Ensure that the information provided is accurate, as it will be
                used throughout your enrollment process.
              </p>
            </Box>
          </Box>
          <Box sx={{ m: "2rem 0 1rem" }}>
            <h3>
              Step 3: <span>Enrollment Process</span>
            </h3>
            <p className="stepInfo">
              The enrollment process is divided into two main stages:
            </p>
            <h5>
              A. <span>Placement Verification</span>
            </h5>
            <p className="stepPartsInfo">
              Students must verify their placement before being allowed to
              proceed with filling out the enrollment form. Steps for
              verification include:
            </p>
            <List>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  1.
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  Visit the Senya SHS Enrollment Portal via{" "}
                  <a
                    href="https://www.senyashs.com/sensec/students/enrollment/placement_verification"
                    target="blank"
                    style={{
                      color: "#0794bf",
                      textDecoration: "underline",
                      flexWrap: "wrap",
                      wordBreak: "break-word", // Allows breaking long words
                      overflowWrap: "break-word", // Ensures proper wrapping
                      whiteSpace: "normal", // Allows wrapping instead of keeping in one line
                    }}
                  >
                    www.senyashs.com/sensec/students/enrollment/placement_verification
                  </a>{" "}
                  to verify your placement or report to the school&apos;s
                  admissions office.
                </Typography>
              </ListItem>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  2.
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  Enter your placement details, including:
                </Typography>
              </ListItem>
              <Box sx={{ ml: 3, mt: 0 }}>
                <List>
                  <ListItem style={{ alignItems: "flex-start" }}>
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                      •
                    </Typography>
                    <Typography sx={{ fontSize: ".9em" }}>
                      Placement/JHS Index Number
                    </Typography>
                  </ListItem>
                  <ListItem style={{ alignItems: "flex-start" }}>
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                      •
                    </Typography>
                    <Typography sx={{ fontSize: ".9em" }}>
                      Year Graduated
                    </Typography>
                  </ListItem>
                </List>
              </Box>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  3.
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  Click on the verification button to verify your placement
                  data.
                </Typography>
              </ListItem>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  4.
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  Once verification is successful, you will be redirected to the
                  enrollment page to fill out your enrollment form.
                </Typography>
              </ListItem>
            </List>
            <h5>
              B. <span>Enrollment Form Submission</span>
            </h5>
            <p className="stepPartsInfo">
              After placement verification, proceed with filling out the
              enrollment form:
            </p>
            <List>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  1.
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  Fill in the form with the following details:
                </Typography>
              </ListItem>
              <Box sx={{ ml: 3, mt: 0 }}>
                <List>
                  <ListItem style={{ alignItems: "flex-start" }}>
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                      •
                    </Typography>
                    <Typography sx={{ fontSize: ".9em" }}>
                      Personal Information (Full Name, Date of Birth, etc.)
                    </Typography>
                  </ListItem>
                  <ListItem style={{ alignItems: "flex-start" }}>
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                      •
                    </Typography>
                    <Typography sx={{ fontSize: ".9em" }}>
                      Educational Background
                    </Typography>
                  </ListItem>
                  <ListItem style={{ alignItems: "flex-start" }}>
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                      •
                    </Typography>
                    <Typography sx={{ fontSize: ".9em" }}>
                      Parent/Guardian Information
                    </Typography>
                  </ListItem>
                  <ListItem style={{ alignItems: "flex-start" }}>
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                      •
                    </Typography>
                    <Typography sx={{ fontSize: ".9em" }}>
                      Residential and Contact Details
                    </Typography>
                  </ListItem>
                </List>
              </Box>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  2.
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  Upload a passport-sized photo (if required).
                </Typography>
              </ListItem>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  3.
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  Review the form for completeness and accuracy.
                </Typography>
              </ListItem>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  4.
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  Submit the enrollment and wait for your approval. Any update
                  on your enrollment status will be sent to you via email or
                  sms.
                </Typography>
              </ListItem>
            </List>
          </Box>
          <Box sx={{ m: "2rem 0 1rem" }}>
            <h3>
              Step 4: <span>Download Required Documents</span>
            </h3>
            <p className="stepInfo">
              Before reporting to Senya SHS, students must download all required
              documents from the enrollment portal. These include:
            </p>
            <List className="downloadDocs">
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  1.
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  <span>Admission Letter</span> – This will serve as proof of
                  your admission to the school.
                </Typography>
              </ListItem>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  2.
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  <span>Prospectus</span> – A list of items you are required to
                  bring when reporting.
                </Typography>
              </ListItem>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  3.
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  <span>Medical Forms</span> – To be completed by a certified
                  medical professional.
                </Typography>
              </ListItem>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  4.
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  <span>Rules and Regulations</span> – A document outlining the
                  school’s code of conduct.
                </Typography>
              </ListItem>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  5.
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  <span>Other Forms</span> – Any additional forms specified
                  during the enrollment process.
                </Typography>
              </ListItem>
            </List>
            <p className="note">
              <span>Note: </span>Ensure all documents are printed, signed (where
              applicable), and submitted during your reporting day.
            </p>
          </Box>
          <Box sx={{ m: "2rem 0 1rem" }}>
            <h3>
              <span>Reporting Day Checklist</span>
            </h3>
            <p className="stepInfo">
              On the day of reporting, students must bring along the following
              items:
            </p>
            <List>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  •
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  A printed copy of the Admission Letter.
                </Typography>
              </ListItem>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  •
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  A completed Medical Form.
                </Typography>
              </ListItem>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  •
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  All items listed in the Prospectus.
                </Typography>
              </ListItem>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  •
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  A valid national ID or certified birth certificate.
                </Typography>
              </ListItem>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  •
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  Original copies of academic certificates (e.g., BECE results
                  slip).
                </Typography>
              </ListItem>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  •
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  Any other documents specified during the enrolment process.
                </Typography>
              </ListItem>
            </List>
          </Box>
          <Box sx={{ m: "2rem 0 1rem" }}>
            <h3>
              <span>Additional Notes</span>
            </h3>
            <List>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  •
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  Students are advised to complete all steps promptly to secure
                  their admission.
                </Typography>
              </ListItem>
              <ListItem style={{ alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  •
                </Typography>
                <Typography sx={{ fontSize: ".9em" }}>
                  For any challenges during the enrollment process, contact
                  Senya SHS Admissions Office:
                </Typography>
              </ListItem>
              <Box sx={{ ml: 3, mt: 0 }}>
                <List>
                  <ListItem style={{ alignItems: "flex-start" }}>
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                      •
                    </Typography>
                    <Typography sx={{ fontSize: ".9em" }}>
                      Phone: +233 508 670 598
                    </Typography>
                  </ListItem>
                  <ListItem style={{ alignItems: "flex-start" }}>
                    <Typography variant="body1" sx={{ marginRight: 2 }}>
                      •
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: ".9em",
                        flexWrap: "wrap",
                        wordBreak: "break-word", // Allows breaking words to wrap text
                        overflowWrap: "break-word", // Ensures long words like email addresses wrap
                      }}
                    >
                      Email: senya.shs.1991@gmail.com
                    </Typography>
                  </ListItem>
                </List>
              </Box>
              <p className="docLastWord">
                We look forward to welcoming you to Senya Senior High School!
              </p>
              <Box className="docEnrollmentLink">
                <HashLink
                  to={`/sensec/students/enrollment/placement_verification`}
                  smooth
                  scroll={scrollWithOffset}
                >
                  Enroll Now!
                </HashLink>
              </Box>
            </List>
          </Box>
        </Box>
      </ContainerBox>
      <Footer />
    </Box>
  );
}
