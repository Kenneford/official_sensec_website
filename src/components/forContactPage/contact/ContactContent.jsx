import React, { useEffect, useRef, useState } from "react";
import "./contact.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DraftsIcon from "@mui/icons-material/Drafts";
import { CircularProgress } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Footer from "../../footer/Footer";
// import { receiveMail, sendMail } from "../../../store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
// import { render as EmailRender } from "@react-email/render";
// import { receiveEmail } from "../../../features/email/emailSlice";
import { toast } from "react-toastify";
// import EmailTemplate from "../../emailTemplate/EmailTemplate";

export default function ContactContent() {
  const dispatch = useDispatch();
  const emailStatus = "";
  // const { emailStatus, error, success } = useSelector((state) => state.email);
  const [email, setEmail] = useState({
    userName: "",
    userEmail: "",
    subject: "",
    message: "",
    //   EmailRender(<EmailTemplate />, {
    //   pretty: true,
    // }),
  });

  function handleStateChange(e) {
    setEmail((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const sendEmail = (e) => {
    e.preventDefault();
    const { userName, userEmail, subject, message } = email;
    console.log({ email });

    // dispatch(
    //   receiveEmail({
    //     userName,
    //     userEmail,
    //     message,
    //     subject,
    //   })
    // );
  };
  // useEffect(() => {
  //   if (emailStatus === "rejected") {
  //     error?.errorMessage?.message?.map((err) =>
  //       toast.error(err, {
  //         position: "top-right",
  //         theme: "light",
  //         // toastId: successId,
  //       })
  //     );
  //     return;
  //   }
  //   if (emailStatus === "success") {
  //     toast.success(success, {
  //       position: "top-right",
  //       theme: "light",
  //       // toastId: successId,
  //     });
  //     setEmail({
  //       userName: "",
  //       userEmail: "",
  //       subject: "",
  //       message: "",
  //     });
  //     // setTimeout(() => {
  //     //   window.location.reload();
  //     // }, 3000);
  //   }
  // }, [emailStatus, error, success]);

  return (
    <div className="contactWrap">
      <div className="contactContainer">
        <div className="contactContent">
          <div className="title">
            <h2>Get in touch</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
            <div className="contactsDetails">
              <div className="address">
                <h3>Address/GPS</h3>
                <div>
                  <LocationOnOutlinedIcon />
                  <span>CG-2308-4841</span>
                  {/* <a href="https://www.ghanapostgps.com" target="_blank">
                    Open GPS
                  </a> */}
                </div>
              </div>
              <div className="email">
                <h3>Email</h3>
                <div>
                  <EmailIcon />
                  <span
                    style={{
                      flexWrap: "wrap",
                      wordBreak: "break-word", // Allows breaking words to wrap text
                      overflowWrap: "break-word", // Ensures long words like email addresses wrap
                    }}
                  >
                    senyashs@ges.gov.gh
                  </span>
                </div>
              </div>
              <div className="phone">
                <h3>Mobile</h3>
                <div>
                  <LocalPhoneIcon />
                  <span>+233 508 670 598</span>
                </div>
                <div>
                  <WhatsAppIcon />
                  <span>+233 245 940 586 </span>
                </div>
              </div>
              <div className="support">
                <h3>Support</h3>
                <div>
                  <DraftsIcon />
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
              </div>
            </div>
          </div>
          <div className="messageBox">
            <h2>Email Us</h2>
            <p>
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
            <form onSubmit={sendEmail}>
              <div className="emailSender">
                <div className="userLeft">
                  <h4> Full Name</h4>
                  <input
                    type="text"
                    name="userName"
                    className="input"
                    onChange={handleStateChange}
                    value={email.userName}
                    // placeholder="Enter your name here..."
                  />
                </div>
                <div className="userRight">
                  <h4>Email</h4>
                  <input
                    type="email"
                    name="userEmail"
                    className="input"
                    onChange={handleStateChange}
                    value={email.userEmail}
                    // placeholder="Enter your email here..."
                  />
                </div>
              </div>
              <div className="subject">
                <h4>Subject</h4>
                <input
                  type="text"
                  name="subject"
                  className="input"
                  onChange={handleStateChange}
                  value={email.subject}
                  // placeholder="Enter your subject here..."
                />
              </div>
              <div className="message">
                <h4>Message</h4>
                <textarea
                  className="textarea"
                  type="text"
                  name="message"
                  onChange={handleStateChange}
                  value={email.message}
                  // placeholder="How can we help?"
                />
              </div>
              <button type="submit" className="sendMessageBtn">
                {emailStatus === "pending" ? (
                  <CircularProgress style={{ color: "white", size: "15px" }} />
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
          <div className="locationMap">
            <h2>Location</h2>
            <iframe
              title="sensecMap"
              // src="https://www.google.com/maps?q=5.410616, -0.505370&hl=en&z=14&output=embed"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6680.147688730123!2d-0.5097847354054883!3d5.410943016471147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdfb72dbac8012d%3A0x32e187eb1c520b4e!2sSENYA%20SENIOR%20HIGH%20SCHOOL!5e0!3m2!1sen!2sde!4v1681719352650!5m2!1sen!2sde"
              width="600"
              height="450"
              style={{ border: "1px solid #292929" }}
              allowfullscreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="follow">
            <h2>Follow Us</h2>
            <div className="icons">
              <div className="icon">
                <FacebookIcon style={{ fontSize: "2rem" }} />
              </div>
              <div className="icon">
                <InstagramIcon style={{ fontSize: "2rem" }} />
              </div>
              <div className="icon">
                <TwitterIcon style={{ fontSize: "2rem" }} />
              </div>
              <div className="icon">
                <LinkedInIcon style={{ fontSize: "2rem" }} />
              </div>
            </div>
          </div>
        </div>
        <div className="contactRight"></div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
