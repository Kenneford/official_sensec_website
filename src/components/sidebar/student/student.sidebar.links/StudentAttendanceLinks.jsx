import { useEffect, useRef, useState } from "react";
import "../../sidebar.scss";
import PropTypes from "prop-types";
import { HashLink, NavHashLink } from "react-router-hash-link";
import { useParams } from "react-router-dom";
import {
  ExpandLess,
  ExpandMore,
  ListAltOutlined,
  Search,
} from "@mui/icons-material";
import { SidebarSubLinksContainer } from "../../../../muiStyling/muiStyling";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { getAuthUser } from "../../../../features/auth/authSlice";

const quickLinks = [{ name: "View Attendance" }, { name: "Search Attendance" }];

export function StudentAttendanceLinks({ hovered }) {
  const authAdmin = useSelector(getAuthUser);
  const { adminCurrentLink } = useParams();

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
        className={hovered ? "sidebarLinksTitle" : "sidebarLinksTitle closed"}
        onClick={toggleExpandDashBoardLinks}
      >
        <h5 className="dashboardSidebarLinksTitle">Attendance</h5>
        {!openDashBoardLinks ? (
          <ExpandMore
            className="expandMoreIcon"
            // onClick={() => setOpenActionsLinks(!openActionsLinks)}
          />
        ) : (
          <ExpandLess
            className="expandMoreIcon"
            // onClick={() => setOpenActionsLinks(!openActionsLinks)}
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
          {quickLinks.map((Qlink) => (
            <HashLink
              key={Qlink.name}
              to={`/sensec/users/${
                authAdmin?.uniqueId
              }/student/Attendance/${Qlink.name.replace(/ /g, "_")}`}
              // className="links"
              className={
                Qlink.name?.replace(/ /g, "_") === adminCurrentLink
                  ? "currentAdminSidebarLink"
                  : "notCurrentAdminSidebarLink"
              }
              smooth
              title={!hovered ? Qlink.name : ""}
            >
              {Qlink.name === "View Attendance" && (
                <ListAltOutlined className="icon" />
              )}
              {Qlink.name === "Search Attendance" && (
                <Search className="icon" />
              )}
              {hovered && <h4>{Qlink.name}</h4>}
            </HashLink>
          ))}
        </div>
      </SidebarSubLinksContainer>
    </>
  );
}

StudentAttendanceLinks.propTypes = {
  hovered: PropTypes.bool,
};
