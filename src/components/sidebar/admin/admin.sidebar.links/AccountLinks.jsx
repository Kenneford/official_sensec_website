import { useEffect, useRef, useState } from "react";
import "../../sidebar.scss";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { NavHashLink } from "react-router-hash-link";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { SidebarSubLinksContainer } from "../../../../muiStyling/muiStyling";
import { Edit, Help, Person, Settings } from "@mui/icons-material";

const quickLinks = [
  { name: "Profile" },
  { name: "Edit" },
  { name: "Settings" },
  { name: "Help" },
];

export function AccountLinks({
  isSidebarOpen,
  setCurrentAction,
  setCurrentLink,
}) {
  const { adminCurrentLink } = useParams();

  // Set sub-link to expand on page render
  const [openDashBoardLinks, setOpenDashBoardLinks] = useState(false);
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
        className={
          isSidebarOpen ? "sidebarLinksTitle" : "sidebarLinksTitle closed"
        }
        onClick={toggleExpandDashBoardLinks}
      >
        <h5 className="dashboardSidebarLinksTitle">Account</h5>
        {!openDashBoardLinks ? (
          <ExpandMoreIcon
            className="expandMoreIcon"
            // onClick={() => setOpenActionsLinks(!openActionsLinks)}
          />
        ) : (
          <ExpandLessIcon
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
          isSidebarOpen ? "sidebarContentLinks" : "sidebarContentLinks closed"
        }
      >
        <div ref={contentRef} className="allSidebarLinksWrap">
          {quickLinks.map((Qlink) => (
            <NavHashLink
              key={Qlink.name}
              to={`/sensec/users/admin/Account/${Qlink.name.replace(
                / /g,
                "_"
              )}`}
              // className="links"
              className={
                Qlink.name?.replace(/ /g, "_") === adminCurrentLink
                  ? "currentAdminSidebarLink"
                  : "notCurrentAdminSidebarLink"
              }
              smooth
              title={!isSidebarOpen ? Qlink.name : ""}
              onClick={() => {
                setCurrentAction("Dashboard");
                setCurrentLink(Qlink.name);
              }}
            >
              {Qlink.name === "Profile" && <Person className="icon" />}
              {Qlink.name === "Edit" && <Edit className="icon" />}
              {Qlink.name === "Settings" && <Settings className="icon" />}
              {Qlink.name === "Help" && <Help className="icon" />}
              {isSidebarOpen && <h4>{Qlink.name}</h4>}
            </NavHashLink>
          ))}
        </div>
      </SidebarSubLinksContainer>
    </>
  );
}

AccountLinks.propTypes = {
  isSidebarOpen: PropTypes.bool,
  setCurrentAction: PropTypes.func,
  setCurrentLink: PropTypes.func,
};
