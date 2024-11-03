import { useEffect, useRef, useState } from "react";
import "../../sidebar.scss";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import DryCleaningIcon from "@mui/icons-material/DryCleaning";
import { NavHashLink } from "react-router-hash-link";
import { useParams } from "react-router-dom";
import { SidebarSubLinksContainer } from "../../../../muiStyling/muiStyling";
import { Box } from "@mui/material";
import { AdminSidebarUserTypesLinks } from "../../../../linksFormat/LinksFormat";
import { useSelector } from "react-redux";
import { getAuthUser } from "../../../../features/auth/authSlice";

// const quickLinks = [
//   { name: "Admins" },
//   { name: "Lecturers" },
//   { name: "Students" },
//   { name: "NT-Staffs" },
//   { name: "Team" },
//   { name: "Placement Students" },
//   { name: "Hanging Employments" },
// ];

export function UsersLinks({
  isSidebarOpen,
  setCurrentAction,
  setCurrentLink,
}) {
  const authAdmin = useSelector(getAuthUser);
  const { adminCurrentLink } = useParams();

  // Get Admin's sidebar user-types links
  const quickLinks = AdminSidebarUserTypesLinks();

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
        <h5 className="dashboardSidebarLinksTitle">User Types</h5>
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
              to={
                Qlink.name === "Admins"
                  ? `/sensec/users/${
                      authAdmin?.uniqueId
                    }/admin/User_Types/${Qlink?.name?.replace(
                      / /g,
                      "_"
                    )}/employees/All`
                  : Qlink.name === "Lecturers"
                  ? `/sensec/users/${
                      authAdmin?.uniqueId
                    }/admin/User_Types/${Qlink?.name?.replace(
                      / /g,
                      "_"
                    )}/employees/All`
                  : Qlink.name === "Hanging Employments"
                  ? `/sensec/users/${
                      authAdmin?.uniqueId
                    }/admin/User_Types/${Qlink?.name?.replace(
                      / /g,
                      "_"
                    )}/employees/All`
                  : Qlink.name === "NT-Staffs"
                  ? `/sensec/users/${
                      authAdmin?.uniqueId
                    }/admin/User_Types/${Qlink?.name?.replace(
                      / /g,
                      "_"
                    )}/employees/All`
                  : Qlink.name === "Students"
                  ? `/sensec/users/${
                      authAdmin?.uniqueId
                    }/admin/User_Types/${Qlink?.name?.replace(
                      / /g,
                      "_"
                    )}/Enrolled`
                  : `/sensec/users/${
                      authAdmin?.uniqueId
                    }/admin/User_Types/${Qlink?.name?.replace(/ /g, "_")}`
              }
              // to={`/sensec/users/admin/User_Types/${Qlink.name.replace(
              //   / /g,
              //   "_"
              // )}`}
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
              {Qlink.name === "Admins" && (
                <AdminPanelSettingsIcon className="icon" />
              )}
              {Qlink.name === "Hanging Employments" && (
                <DryCleaningIcon className="icon" />
              )}
              {Qlink.name === "NT-Staffs" && (
                <Diversity3Icon className="icon" />
              )}
              {Qlink.name === "Lecturers" && (
                <SupervisedUserCircleIcon className="icon" />
              )}
              {Qlink.name === "Students" && (
                <SchoolOutlinedIcon className="icon" />
              )}
              {Qlink.name === "Placement Students" && (
                <EmojiPeopleIcon className="icon" />
              )}
              {Qlink.name === "Team" && <Diversity2Icon className="icon" />}
              {isSidebarOpen && <h4>{Qlink.name}</h4>}
            </NavHashLink>
          ))}
        </div>
      </SidebarSubLinksContainer>
    </>
  );
}

UsersLinks.propTypes = {
  isSidebarOpen: PropTypes.bool,
  setCurrentAction: PropTypes.func,
  setCurrentLink: PropTypes.func,
};
