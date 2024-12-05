import React from "react";
import "./contactBanner.scss";
import { Link } from "react-router-dom";

export default function ContactBanner() {
  return (
    <div className="contactBannerWrap">
      <div
        className="contactBannerImg"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1534536281715-e28d76689b4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")`,
        }}
      >
        <div className="overlay">
          <h1>Contact US</h1>
          <span>( Senya Senior High School )</span>
          {/* <Link to={"/sensec/book_appointment"}>
            <button className="appointment">Book Appointment</button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}
