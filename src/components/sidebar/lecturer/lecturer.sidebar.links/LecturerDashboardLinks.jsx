import { useEffect, useRef, useState } from "react";
import "../../sidebar.scss";
import PropTypes from "prop-types";
import {
  Architecture,
  AutoStories,
  Class,
  Equalizer,
  ExpandLess,
  ExpandMore,
  RssFeed,
  Tv,
} from "@mui/icons-material";
import { HashLink, NavHashLink } from "react-router-hash-link";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { SidebarSubLinksContainer } from "../../../../muiStyling/muiStyling";
import { Link } from "react-router-dom";
import { getAuthUser } from "../../../../features/auth/authSlice";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const quickLinks = [
  { name: "Overview" },
  { name: "Class Handling Students" },
  { name: "Programme Students" },
  // { name: "Staff Members" },
  { name: "Subjects" },
  // { name: "Blogs" },
];

export function LecturerDashboardLinks({ hovered }) {
  const authLecturer = useSelector(getAuthUser);
  const { lecturerCurrentLink } = useParams();

  // Set sub-link to expand on page render
  const [openDashBoardLinks, setOpenDashBoardLinks] = useState(true);
  // Set initial height for sidebar sub-links
  const [contentHeight, setContentHeight] = useState(0);
  // Set a ref for the div that holds the sub-links
  const contentRef = useRef(null);

  // Adjust content height after the first render
  useEffect(() => {
    if (contentRef.current) {
      // Calculate the actual content height after mounting
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);
  // Toggle to show or hide sub-links
  const toggleExpandDashBoardLinks = () => {
    setOpenDashBoardLinks(!openDashBoardLinks);
  };

  //THIS REMOVES THE HASHLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }

  return (
    <>
      <Box
        component={"button"}
        // Position sidebar action title (h5) in the middle
        className={hovered ? "sidebarLinksTitle" : "sidebarLinksTitle closed"}
        onClick={toggleExpandDashBoardLinks}
      >
        <h5
          className="dashboardSidebarLinksTitle"
          style={{
            textTransform: hovered ? "uppercase" : "capitalize",
          }}
        >
          Dashboard
        </h5>
        {!openDashBoardLinks ? (
          <ExpandMore
            className="expandMoreIcon"
            // onClick={() => setOpenDashBoardLinks(!openDashBoardLinks)}
          />
        ) : (
          <ExpandLess
            className="expandMoreIcon"
            // onClick={() => setOpenDashBoardLinks(!openDashBoardLinks)}
          />
        )}
      </Box>
      <SidebarSubLinksContainer
        isExpanded={openDashBoardLinks}
        contentHeight={contentHeight}
        className={
          // Hide text on closed sidebar
          hovered ? "sidebarContentLinks" : "sidebarContentLinks closed"
        }
      >
        <div ref={contentRef} className="allSidebarLinksWrap">
          {quickLinks?.map((qLink) => (
            <HashLink
              key={qLink?.name}
              to={`/sensec/users/${
                authLecturer?.uniqueId
              }/lecturer/Dashboard/${qLink?.name?.replace(/ /g, "_")}`}
              smooth
              title={!hovered ? qLink.name : ""}
              className={
                qLink.name === lecturerCurrentLink?.replace(/_/g, " ")
                  ? "currentAdminSidebarLink"
                  : "notCurrentAdminSidebarLink"
              }
              onClick={() => {
                if (qLink.name === "Subjects") {
                  Cookies?.set("currentSubjectType", "electives", {
                    expires: 1, // 1 day
                    secure: false, // Set to true in production if using HTTPS
                    sameSite: "Strict",
                  });
                }
                // setCurrentAction("Dashboard");
                // setCurrentLink(qLink.name);
              }}
            >
              {qLink.name === "Overview" && <Tv className="icon" />}
              {qLink.name === "Class Handling Students" && (
                <Equalizer className="icon" />
              )}
              {qLink.name === "Programme Students" && (
                <Architecture className="icon" />
              )}
              {/* {qLink.name === "Staff Members" && <Class className="icon" />} */}
              {qLink.name === "Subjects" && <AutoStories className="icon" />}
              {/* {qLink.name === "Blogs" && <RssFeed className="icon" />} */}
              {hovered && <h4>{qLink.name}</h4>}
            </HashLink>
          ))}
        </div>
      </SidebarSubLinksContainer>
    </>
  );
}

LecturerDashboardLinks.propTypes = {
  hovered: PropTypes.bool,
};
