import { useEffect, useRef, useState } from "react";
import "../../sidebar.scss";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { HashLink, NavHashLink } from "react-router-hash-link";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { SidebarSubLinksContainer } from "../../../../muiStyling/muiStyling";
import {
  AppRegistration,
  Construction,
  PersonRemoveAlt1,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { getAuthUser } from "../../../../features/auth/authSlice";

const quickLinks = [
  // { name: "Register" },
  { name: "Create Data" },
  // { name: "Suspend & Withdraw" },
];

export function ActionsLinks({ hovered }) {
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
        <h5
          className="dashboardSidebarLinksTitle"
          style={{
            textTransform: hovered ? "uppercase" : "capitalize",
          }}
        >
          Actions
        </h5>
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
          hovered ? "sidebarContentLinks" : "sidebarContentLinks closed"
        }
      >
        <div ref={contentRef} className="allSidebarLinksWrap">
          {quickLinks.map((Qlink) => (
            <HashLink
              key={Qlink.name}
              to={`/sensec/users/${
                authAdmin?.uniqueId
              }/admin/Actions/${Qlink.name.replace(/ /g, "_")}`}
              // className="links"
              className={
                Qlink.name?.replace(/ /g, "_") === adminCurrentLink
                  ? "currentAdminSidebarLink"
                  : "notCurrentAdminSidebarLink"
              }
              smooth
              title={!hovered ? Qlink.name : ""}
              // onClick={() => {
              //   setCurrentAction("Dashboard");
              //   setCurrentLink(Qlink.name);
              // }}
            >
              {Qlink.name === "Register" && (
                <AppRegistration className="icon" />
              )}
              {Qlink.name === "Create Data" && (
                <Construction className="icon" />
              )}
              {Qlink.name === "Suspend & Withdraw" && (
                <PersonRemoveAlt1 className="icon" />
              )}
              {hovered && <h4>{Qlink.name}</h4>}
            </HashLink>
          ))}
        </div>
      </SidebarSubLinksContainer>
    </>
  );
}

ActionsLinks.propTypes = {
  // isSidebarOpen: PropTypes.bool,
  hovered: PropTypes.bool,
  // setCurrentAction: PropTypes.func,
  // setCurrentLink: PropTypes.func,
};
