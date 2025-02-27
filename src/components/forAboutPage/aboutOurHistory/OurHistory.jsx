import React from "react";
import "./ourHistory.scss";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { ContainerBox } from "../../../muiStyling/muiStyling";
import Parser from "html-react-parser";
import { FetchSensecSchoolData } from "../../../data/blogs/FetchSensecSchoolData";
import { getAuthUser } from "../../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { HashLink } from "react-router-hash-link";
import { Edit } from "@mui/icons-material";

export function OurHistory() {
  const authUser = useSelector(getAuthUser);
  const sensecSchoolData = FetchSensecSchoolData();

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };
  //THIS REMOVES THE NavLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }

  return (
    <Box borderTop={"1px solid #ccc"}>
      <ContainerBox
        sx={{
          width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
          margin: "auto",
          padding: { xs: "1rem .5rem", sm: "2rem 1rem" },
        }}
      >
        <Box className="historyWrap" id="history">
          <Box className="historyCont">
            <h4 id="ourHistory">
              Our History{" "}
              {authUser?.roles?.includes("Admin") && (
                <HashLink
                  to={`/sensec/users/${authUser?.uniqueId}/admin/Actions/Create_Data/school_data/new#editHistoryOfSchool`}
                  smooth
                  scroll={scrollWithOffset}
                  onClick={() =>
                    localStorage.setItem(
                      "updateSensecSchoolData",
                      "Name Of School"
                    )
                  }
                >
                  <Edit
                    titleAccess="Update History Of School"
                    sx={{ fontSize: "1em" }}
                  />
                </HashLink>
              )}
            </h4>
            <Box className="history">
              <Box className="historyRight">
                <Box
                  component="img"
                  className="historyImg"
                  src="https://images.unsplash.com/photo-1522661067900-ab829854a57f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt="Sample"
                  sx={{
                    width: "30rem",
                    marginRight: 2,
                    marginBottom: 2,
                  }}
                />
              </Box>
              <Box className="historyLeft">
                {Parser(`${sensecSchoolData[0]?.history}`)}
                {/* <p>
                  In the heart of Senya Beraku, a coastal community nestled
                  along the serene shores of the Central Region of Ghana, Senya
                  Senior High School, affectionately called &quot;
                  <span style={{ fontWeight: 500 }}>The Great Sensec</span>
                  &quot;, was established on{" "}
                  <span style={{ fontWeight: 500 }}>7th February, 1991</span>,
                  when a group of visionary educators and community leaders came
                  together with a shared dream – to provide quality education to
                  the youth of Senya Beraku and its catchment areas. These
                  founders believed that{" "}
                  <span style={{ fontWeight: 500 }}>“Knowledge is Light”</span>,
                  a belief that later became motto of the school and would come
                  to define the essence of the school.
                </p>
                <p>
                  During its early years, the school faced numerous challenges,
                  from inadequate infrastructure to limited resources. However,
                  the determination and dedication of the founding team, along
                  with support from the local community, ensured that{" "}
                  <span style={{ fontWeight: 500 }}>The Great Sensec</span>{" "}
                  continued to grow and flourish.
                </p>
                <p>
                  <span style={{ fontWeight: 500 }}>The Great Sensec</span>{" "}
                  started in a private residence with only four students and
                  acting Headmaster{" "}
                  <span style={{ fontWeight: 500 }}>Mr. George Mettle</span> and{" "}
                  <span style={{ fontWeight: 500 }}>Mr. E.N.Q. Sackey</span> who
                  was a national service personnel. Not long after this modest
                  beginning,{" "}
                  <span style={{ fontWeight: 500 }}>Mr. J.K Addo</span> became
                  the substantive headmaster of the school. The school was
                  originally meant to be a Community Day School, but due to
                  Ministry of Education&apos;s computerised School Selection and
                  Placement System{" "}
                  <span style={{ fontWeight: 500 }}>(CSSPS)</span>, Management
                  of the school introduced the boarding and hostel systems to
                  accommodate students who came from afar.
                </p> */}
                {/* <Link to={"#"}>
                  <button className="historyBtn">Learn More</button>
                </Link> */}
              </Box>
            </Box>
          </Box>
        </Box>
      </ContainerBox>
    </Box>
  );
}
