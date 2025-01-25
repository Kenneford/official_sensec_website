import { useEffect, useRef, useState } from "react";
import "../../sidebar.scss";
import PropTypes from "prop-types";
import { HashLink, NavHashLink } from "react-router-hash-link";
import { useParams } from "react-router-dom";
import {
  Construction,
  Create,
  ExpandLess,
  ExpandMore,
  ListAltOutlined,
  Search,
} from "@mui/icons-material";
import { SidebarSubLinksContainer } from "../../../../muiStyling/muiStyling";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { getAuthUser } from "../../../../features/auth/authSlice";

const quickLinks = [
  { name: "Create Report" },
  // { name: "Search" }
];

export function LecturerReportLinks({ hovered }) {
  const authUser = useSelector(getAuthUser);
  const { adminCurrentLink } = useParams();

  // Set sub-link to expand on page render
  const [openDashBoardLinks, setOpenDashBoardLinks] = useState(true);
  const [openReportsOptions, setOpenReportsOptions] = useState(false);
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
        <h5 className="dashboardSidebarLinksTitle">Reports</h5>
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
        <Box ref={contentRef} className="allSidebarLinksWrap">
          {quickLinks.map((Qlink) => (
            <Box
              minHeight={Qlink.name === "Create Report" ? "1.5rem" : ""}
              key={Qlink.name}
            >
              <HashLink
                to={
                  `/sensec/users/${authUser?.uniqueId}/lecturer/academic_report/create_report/elective`
                  // Qlink.name === "Create Report"
                  //   ? "#"
                  //   : `/sensec/users/${
                  //       authUser?.uniqueId
                  //     }/lecturer/Academic_Report/${Qlink.name
                  //       .replace(/ /g, "_")
                  //       .toLocaleLowerCase()}`
                }
                // className="links"
                className={
                  Qlink.name?.replace(/ /g, "_") === adminCurrentLink
                    ? "currentAdminSidebarLink"
                    : "notCurrentAdminSidebarLink"
                }
                smooth
                title={!hovered ? Qlink.name : ""}
                onClick={() => {
                  if (Qlink.name === "Create Report") {
                    setOpenReportsOptions(!openReportsOptions);
                  }
                }}
              >
                {Qlink.name === "Create Report" && (
                  <Construction className="icon" />
                )}
                {Qlink.name === "Search" && <Search className="icon" />}
                {hovered && <h4>{Qlink.name}</h4>}
                {/* {Qlink.name === "Create Report" && hovered && (
                  <Box position={"absolute"} right={0} top={10}>
                    {!openReportsOptions ? (
                      <ExpandMore
                      // className="expandMoreIcon"
                      // onClick={() => setOpenActionsLinks(!openActionsLinks)}
                      />
                    ) : (
                      <ExpandLess
                      // className="expandMoreIcon"
                      // onClick={() => setOpenActionsLinks(!openActionsLinks)}
                      />
                    )}
                  </Box>
                )} */}
              </HashLink>
              {/* {Qlink.name === "Create Report" &&
                openReportsOptions &&
                hovered && (
                  <Box className="reportOptionsWrap">
                    <HashLink
                      to={`/sensec/users/${authUser?.uniqueId}/lecturer/academic_report/create_report/elective`}
                    >
                      Elective
                    </HashLink>
                    <HashLink
                      to={`/sensec/users/${authUser?.uniqueId}/lecturer/academic_report/create_report/core`}
                    >
                      Core
                    </HashLink>
                  </Box>
                )} */}
            </Box>
          ))}
        </Box>
      </SidebarSubLinksContainer>
    </>
  );
}

LecturerReportLinks.propTypes = {
  hovered: PropTypes.bool,
};
