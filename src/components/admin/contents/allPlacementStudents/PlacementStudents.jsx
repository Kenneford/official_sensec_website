import { useEffect, useState } from "react";
import "./placementStudentsData.scss";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DataTable from "react-data-table-component";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { toast } from "react-toastify";
import UploadPlacementExcelData from "./placementExcelDataUpload/PlacementDataUpload";
import { Box, Grid } from "@mui/material";
import ActionModal from "../../../actionModal/NewEmploymentModal";
import { FetchAllPlacementStudents } from "../../../../data/students/FetchPlacementStudents";
import { customUserTableStyle } from "../../../../usersInfoDataFormat/usersInfoTableStyle";
import { FetchAllStudents } from "../../../../data/students/FetchAllStudents";
import SearchFilter from "../../../searchForm/SearchFilter";

export function PlacementStudents() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const userInfo = {};
  const allPlacementStudents = FetchAllPlacementStudents();
  const allStudents = FetchAllStudents();
  const placementStudents = [];
  // const { uploadExcelFileStatus, uploadExcelFileError } = useSelector(
  //   (state) => state.placement
  // );
  const { adminCurrentAction, adminCurrentLink } = useParams();
  const [searchStudent, setSearchStudent] = useState("");

  //Filter students during search
  const filteredStudents = allPlacementStudents?.filter(
    (std) =>
      std?.firstName?.toLowerCase()?.includes(searchStudent) ||
      std?.firstName?.includes(searchStudent) ||
      std?.lastName?.toLowerCase()?.includes(searchStudent) ||
      std?.lastName?.includes(searchStudent) ||
      std?.fullName?.toLowerCase()?.includes(searchStudent) ||
      std?.fullName?.includes(searchStudent)
  );

  const customStyle = {
    headRow: {
      style: {
        backgroundColor: "#555",
        color: "#fff",
      },
    },
    headColumn: {
      style: {
        border: "1rem solid red",
        // color: "#fff",
      },
    },
    headCells: {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.2rem",
        // borderLeft: ".2rem solid red",
        // backgroundColor: "blue",
        // color: "#fff",
      },
    },
    cells: {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#cccc",
        // color: "#fff",
        // paddingTop: ".5rem",
        // paddingBottom: ".5rem",
        fontSize: ".9rem",
        // marginTop: ".5rem",
        // marginBottom: ".5rem",
      },
    },
  };

  //THIS REMOVES THE HASHLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -150;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const student_name = query.get("student_name");
  const location = useLocation();

  const handleStudentSearch = (e) => {
    e.preventDefault();
    if (searchStudent) {
      // dispatch(studentSearch(searchStudent));
    } else {
      toast.error("Search field is empty!", {
        position: "top-right",
        theme: "light",
        // toastId: successId,
      });
    }
  };
  const studentColumn = (data) => {
    const baseColumn = [
      {
        name: "Image",
        selector: (row) =>
          row?.profilePicture ? (
            <HashLink
              scroll={scrollWithOffset}
              smooth
              to={`/sensec/admin/Students/info/${row?.fullName?.replace(
                / /g,
                "_"
              )}/${row?.jhsIndexNo}/overview#studentInfo`}
              title="View Student Info"
            >
              {!row?.profilePicture?.url && (
                <img className="studentImg" src={row?.profilePicture} alt="" />
              )}
              {row?.profilePicture?.url && (
                <img
                  className="studentImg"
                  src={row?.profilePicture?.url}
                  alt=""
                />
              )}
            </HashLink>
          ) : (
            <HashLink
              scroll={scrollWithOffset}
              smooth
              className="noImgLink"
              to={`/sensec/admin/Students/info/${row?.fullName?.replace(
                / /g,
                "_"
              )}/${row?.jhsIndexNo}/overview`}
              title="View Student Info"
            >
              {row?.gender && row?.gender === "Male" && (
                <img
                  className="studentImg"
                  src={"/assets/maleAvatar.png"}
                  alt=""
                />
              )}
              {row?.gender === "Female" && (
                <img
                  className="studentImg"
                  src={"/assets/femaleAvatar.png"}
                  alt=""
                />
              )}
              {row?.gender === "" && (
                <div className="noImg">
                  <p>No</p>
                  <p>Image</p>
                </div>
              )}
            </HashLink>
          ),
      },
      {
        name: "First Name",
        selector: (row) => <p title={row?.firstName}>{row?.firstName}</p>,
        sortable: true,
        omit: data.some((user) => user.fullName),
      },
      {
        name: "Surname",
        selector: (row) => <p title={row?.lastName}>{row?.lastName}</p>,
        omit: data.some((user) => user.fullName),
      },
      {
        name: "Full Name",
        selector: (row) => <p title={row?.fullName}>{row?.fullName}</p>,
        // omit: data.some((user) => user.firstName || user.lastName),
        sortable: true,
      },
      {
        name: "Gender",
        selector: (row) => (row?.gender ? row?.gender : "---"),
      },
      {
        name: "JHS Attended",
        selector: (row) => (row?.jhsAttended ? row?.jhsAttended : "---"),
        sortable: true,
      },
      {
        name: "Index Number",
        selector: (row) => (row?.jhsIndexNo ? row?.jhsIndexNo : "---"),
      },
      {
        name: "Year",
        selector: (row) => (row?.yearGraduated ? row?.yearGraduated : "---"),
      },
      {
        name: "Programme",
        selector: (row) =>
          row?.programme ? (
            <p title={row?.programme}>{row?.programme}</p>
          ) : (
            "---"
          ),
      },
      {
        name: "Verified",
        selector: (row) => (row?.placementVerified ? "Yes" : "No"),
      },
      {
        name: "Enrolled",
        selector: (row) => (row?.enrolled ? "Yes" : "No"),
      },
      {
        name: "Edit",
        selector: (row) => (
          <Link
            className="editLink"
            to={`/sensec/admin/Students/${row?.fullName?.replace(/ /g, "_")}/${
              row?.jhsIndexNo
            }/edit`}
          >
            <EditIcon />
          </Link>
        ),
      },
    ];
    return baseColumn;
  };

  // useEffect(() => {
  //   dispatch(fetchAllPlacementStudents());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (uploadExcelFileStatus === "success") {
  //     setTimeout(() => {
  //       dispatch(fetchAllPlacementStudents());
  //     }, 2000);
  //     //   setTimeout(() => {
  //     //     setFileUploadErrorMsg("");
  //     //   }, 6000);
  //   }
  // }, [dispatch, uploadExcelFileError, uploadExcelFileStatus]);

  const [inFocus, setInFocus] = useState(false);
  const [searchStudentStatus, setSearchStudentStatus] = useState("");
  const allStd = `All Placement Students / Total = ${allPlacementStudents?.length}`;
  return (
    <>
      {/* Current dashboard title */}
      <Box
        component={"div"}
        id="adminDashboardHeaderWrap"
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          padding: 0,
          // zIndex: 1,
        }}
        minHeight={"4rem"}
      >
        <h1 className="dashAction">
          {adminCurrentAction?.replace(/_/g, "-")} /{" "}
          <span>{adminCurrentLink?.replace(/_/g, " ")}</span>
        </h1>
        {/* Main search bar */}
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <SearchFilter
            value={searchStudent}
            onChange={setSearchStudent}
            placeholder={"Search"}
          />
        </Box>
      </Box>
      <Box
        className="allPlacementStudentsData"
        id="allStudents"
        padding={{ xs: " 1rem .5rem", sm: " 1rem" }}
      >
        <UploadPlacementExcelData />
        <Box className="searchDetails">
          {allPlacementStudents?.length === 0 && searchStudent !== "" && (
            <p className="searchInfo">
              We couldn't find any matches for "{searchStudent}"
            </p>
          )}
          {allPlacementStudents?.length === 0 && searchStudent !== "" && (
            <p
              style={{
                paddingLeft: "1.5rem",
                display: "flex",
                alignItems: "center",
                color: "red",
              }}
            >
              ||
            </p>
          )}
          {searchStudent && (
            <p className="searchInfo">
              Search Result = {placementStudents.length}
            </p>
          )}
          {!searchStudent && (
            <p className="searchInfo">
              Total Placement Students = {allPlacementStudents?.length}
            </p>
          )}
        </Box>
        <Box className="studentDataTable">
          <DataTable
            title={allStd}
            columns={studentColumn(allPlacementStudents)}
            data={filteredStudents}
            customStyles={customUserTableStyle}
            pagination
            selectableRows
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            responsive
            actions={<button>Export PDF</button>}
          />
        </Box>
      </Box>
    </>
  );
}
