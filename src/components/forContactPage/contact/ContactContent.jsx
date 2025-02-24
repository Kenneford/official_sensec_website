import React, { useEffect, useRef, useState } from "react";
import "./contact.scss";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
// import { receiveMail, sendMail } from "../../../store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
// import { render as EmailRender } from "@react-email/render";
// import { receiveEmail } from "../../../features/email/emailSlice";
import { toast } from "react-toastify";
import {
  resetSentEmailState,
  sendSupportEmail,
} from "../../../features/supportCenter/supportEmailSlice";
import LoadingProgress from "../../pageLoading/LoadingProgress";
import {
  Drafts,
  Email,
  Facebook,
  Instagram,
  LinkedIn,
  LocalPhone,
  LocationOnOutlined,
  TaskAlt,
  Twitter,
  WhatsApp,
} from "@mui/icons-material";
import { ContainerBox, CustomTextField } from "../../../muiStyling/muiStyling";
// import EmailTemplate from "../../emailTemplate/EmailTemplate";

export default function ContactContent() {
  const dispatch = useDispatch();
  const { sendSupportEmailStatus, error, success } = useSelector(
    (state) => state.supportEmail
  );
  // Send message loading state
  const [loadingComplete, setLoadingComplete] = useState(null);

  // Email state
  const [email, setEmail] = useState({
    userName: "",
    userEmail: "",
    subject: "",
    message: "",
  });

  function handleStateChange(e) {
    setEmail((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  const canSendMessage =
    Boolean(email?.userName) &&
    Boolean(email?.userEmail) &&
    Boolean(email?.subject) &&
    Boolean(email?.message);
  // Handle message send
  const sendEmail = (e) => {
    e.preventDefault();
    const data = {
      userName: email?.userName,
      userEmail: email?.userEmail,
      subject: email?.subject,
      message: email?.message,
    };
    if (data) {
      console.log(data);
      dispatch(sendSupportEmail(data));
    }
  };
  useEffect(() => {
    if (sendSupportEmailStatus === "pending") {
      setLoadingComplete(false);
    }
    if (sendSupportEmailStatus === "rejected") {
      setTimeout(() => {
        error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "light",
            toastId: err,
          })
        );
      }, 1000);
      setTimeout(() => {
        setLoadingComplete(null);
        dispatch(resetSentEmailState());
      }, 3000);
      return;
    }
    if (sendSupportEmailStatus === "success") {
      setTimeout(() => {
        toast.success(success, {
          position: "top-right",
          theme: "dark",
          toastId: success,
        });
        setLoadingComplete(true);
      }, 2000);
      setTimeout(() => {
        setLoadingComplete(null);
        setEmail({
          userName: "",
          userEmail: "",
          subject: "",
          message: "",
        });
        dispatch(resetSentEmailState());
      }, 5000);
    }
  }, [sendSupportEmailStatus, error, success, dispatch]);

  return (
    <ContainerBox
      className="contactWrap"
      sx={{
        width: { xs: "100%", sm: "95%", md: "90%", lg: "80%", xl: "70%" },
        padding: "1rem .5rem",
        margin: "auto",
      }}
    >
      <Box className="contactContainer">
        <Grid container spacing={2} className="contactContent">
          <Grid item xs={12} sm={12} md={6} className="title">
            <h2>Get in touch</h2>
            <p>
              Have questions or need assistance? We&apos;re here to help!
              Contact Senya Senior High School for inquiries, admissions, or
              support. We look forward to hearing from you!
            </p>
            <h2>Working hours</h2>
            <p>Mon - Fri / 8am – 4pm (GMT)</p>
            <Box className="contactsDetails">
              <Box className="contactItem">
                <h3>Address/GPS</h3>
                <Box>
                  <LocationOnOutlined
                    className="icons"
                    // style={{ fontSize: "1em" }}
                  />
                  <span style={{ fontSize: ".7em" }}>CG-2308-4841</span>
                  {/* <a href="https://www.ghanapostgps.com" target="_blank">
                    Open GPS
                  </a> */}
                </Box>
              </Box>
              <Box className="contactItem">
                <h3>Email</h3>
                <Box>
                  <Email className="icons" />
                  <span
                    style={{
                      flexWrap: "wrap",
                      wordBreak: "break-word", // Allows breaking words to wrap text
                      overflowWrap: "break-word", // Ensures long words like email addresses wrap
                    }}
                  >
                    senyashs@ges.gov.gh
                  </span>
                </Box>
              </Box>
              <Box className="contactItem">
                <h3>Mobile</h3>
                <div>
                  <LocalPhone className="icons" />
                  <span>+233 508 670 598</span>
                </div>
                <div>
                  <WhatsApp className="icons" />
                  <span>+233 245 940 586 </span>
                </div>
              </Box>
              <Box className="contactItem">
                <h3>Support</h3>
                <div>
                  <Drafts className="icons" />
                  <span
                    style={{
                      flexWrap: "wrap",
                      wordBreak: "break-word", // Allows breaking words to wrap text
                      overflowWrap: "break-word", // Ensures long words like email addresses wrap
                    }}
                  >
                    senya.shs.1991@gmail.com
                  </span>
                </div>
              </Box>
            </Box>
            <Box item xs={12} sm={6} className="locationMap">
              <h2>Location</h2>
              <iframe
                title="sensec_location"
                // src="https://www.google.com/maps?q=5.410616, -0.505370&hl=en&z=14&output=embed"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6680.147688730123!2d-0.5097847354054883!3d5.410943016471147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdfb72dbac8012d%3A0x32e187eb1c520b4e!2sSENYA%20SENIOR%20HIGH%20SCHOOL!5e0!3m2!1sen!2sde!4v1681719352650!5m2!1sen!2sde"
                width="600"
                height="450"
                style={{ border: "1px solid #292929" }}
                allowfullscreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} className="messageBox">
            <Box sx={{ paddingTop: { xs: 0, sm: "2rem" } }}>
              <h2>Email Us</h2>
            </Box>
            {/* <p>
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p> */}
            <Box
              className="form"
              sx={{
                padding: { xs: "1rem .5rem", sm: "1rem" },
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  {/* <h4> Full Name</h4> */}
                  <CustomTextField
                    fullWidth
                    size="small"
                    label="Full Name"
                    name="userName"
                    onChange={handleStateChange}
                    value={email?.userName}
                    required
                    sx={{
                      "& .MuiInputLabel-asterisk": {
                        color: email?.userName ? "green" : "red", // Change the asterisk color to red
                      },
                      fontSize: ".8em",
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className="userRight">
                  {/* <h4>Email</h4> */}
                  <CustomTextField
                    fullWidth
                    type="email"
                    name="userEmail"
                    size="small"
                    label="Email"
                    onChange={handleStateChange}
                    value={email?.userEmail}
                    required
                    sx={{
                      "& .MuiInputLabel-asterisk": {
                        color: email?.userEmail ? "green" : "red", // Change the asterisk color to red
                      },
                      fontSize: ".8em",
                    }}
                  />
                </Grid>
                <Grid item xs={12} className="subject">
                  {/* <h4>Subject</h4> */}
                  <CustomTextField
                    fullWidth
                    name="subject"
                    label="Subject"
                    size="small"
                    onChange={handleStateChange}
                    value={email?.subject}
                    required
                    sx={{
                      "& .MuiInputLabel-asterisk": {
                        color: email?.subject ? "green" : "red", // Change the asterisk color to red
                      },
                      fontSize: ".8em",
                    }}
                  />
                </Grid>
              </Grid>
              <div className="message">
                <h4>Message</h4>
                <textarea
                  className="textarea"
                  type="text"
                  name="message"
                  onChange={handleStateChange}
                  value={email?.message}
                  // placeholder="How can we help?"
                />
              </div>
              <Button
                // sx={{ display: "flex", alignItems: "center" }}
                variant="contained"
                fullWidth
                disabled={!canSendMessage}
                sx={{
                  letterSpacing: "1px",
                  textTransform: "capitalize",
                  fontSize: ".9em",
                  minHeight: "1.5rem",
                  marginTop: ".5rem",
                  transition: ".5s ease",
                  "&:hover": {
                    backgroundColor: "#059d26",
                    color: "#fff",
                  },
                  backgroundColor: canSendMessage
                    ? "green"
                    : "#cccc !important",
                  color: "#fff",
                  "&.Mui-disabled": {
                    cursor: "not-allowed", // Show not-allowed cursor
                    pointerEvents: "auto",
                    color: "#939292",
                  },
                }}
                onClick={sendEmail}
                // className="sendMessageBtn"
              >
                {loadingComplete === false && (
                  <LoadingProgress color={"#fff"} size={"1.5rem"} />
                )}
                {loadingComplete === true &&
                  sendSupportEmailStatus === "success" && (
                    <>
                      <span>Message Sent</span> <TaskAlt />
                    </>
                  )}
                {loadingComplete === null && "Send Message"}
              </Button>
            </Box>
            <Grid item xs={12} sm={6} className="follow">
              <h2>Follow Us</h2>
              <div className="icons">
                <div className="icon">
                  <Facebook style={{ fontSize: "1.2em" }} />
                </div>
                <div className="icon">
                  <Instagram style={{ fontSize: "1.2em" }} />
                </div>
                <div className="icon">
                  <Twitter style={{ fontSize: "1.2em" }} />
                </div>
                <div className="icon">
                  <LinkedIn style={{ fontSize: "1.2em" }} />
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <div className="contactRight"></div>
      </Box>
    </ContainerBox>
  );
}
