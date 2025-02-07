import { useEffect, useMemo, useState } from "react";
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
import {
  Avatar,
  Box,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import ActionModal from "../../../modals/NewEmploymentModal";
import {
  FetchAllPlacementSBatches,
  FetchAllPlacementStudents,
  FetchPlacementBatchByYear,
  FetchPlacementStudentsByYear,
} from "../../../../data/students/FetchPlacementStudents";
import {
  conditionalRowStyles,
  customUserTableStyle,
} from "../../../../usersInfoDataFormat/usersInfoTableStyle";
import {
  FetchAllApprovedStudents,
  FetchAllGraduatedStudents,
  FetchAllStudents,
} from "../../../../data/students/FetchAllStudents";
import SearchFilter from "../../../searchForm/SearchFilter";
import { CustomTextField } from "../../../../muiStyling/muiStyling";

export function PlacementStudents() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const userInfo = {};
  const currentYear = new Date().getFullYear();
  const allPlacementStudents = FetchAllPlacementStudents();
  const allApprovedStudents = FetchAllApprovedStudents();
  const allGraduatedStudents = FetchAllGraduatedStudents();
  const allPlacementSBatches = FetchAllPlacementSBatches();
  const allStudents = FetchAllStudents();
  // console.log(placementStudentsByYear);

  // const { uploadExcelFileStatus, uploadExcelFileError } = useSelector(
  //   (state) => state.placement
  // );
  const { adminCurrentAction, adminCurrentLink } = useParams();
  const [searchStudent, setSearchStudent] = useState("");

  const [yearSelected, setYearSelected] = useState(false); // State to manage filter
  const [filter, setFilter] = useState(""); // State to manage filter
  const placementStudentsByYear = FetchPlacementBatchByYear(filter);
  // const placementStudentsByYear = FetchPlacementStudentsByYear(filter);
  const currentPlacementData = allPlacementSBatches?.find(
    (batch) => batch?.year === currentYear?.toString()
  );
  // Filter out current year placement batch
  const filteredPlacementBatches = allPlacementSBatches?.filter(
    (batch) => batch?.year !== currentYear?.toString()
  );
  const sortedCurrentPlacementData = useMemo(() => {
    if (currentPlacementData) {
      const data = [...currentPlacementData.students]?.sort(
        (newData, oldData) => oldData?.updatedAt - newData?.updatedAt
      );
      return data;
    }
  }, [currentPlacementData]);
  console.log(sortedCurrentPlacementData);

  //Filter students during search
  const filteredStudents = currentPlacementData?.students?.filter(
    (std) =>
      std?.firstName?.toLowerCase()?.includes(searchStudent) ||
      std?.firstName?.includes(searchStudent) ||
      std?.lastName?.toLowerCase()?.includes(searchStudent) ||
      std?.lastName?.includes(searchStudent) ||
      std?.fullName?.toLowerCase()?.includes(searchStudent) ||
      std?.fullName?.includes(searchStudent)
  );
  const filteredStudentsByYear = placementStudentsByYear?.students?.filter(
    (std) =>
      std?.firstName?.toLowerCase()?.includes(searchStudent) ||
      std?.firstName?.includes(searchStudent) ||
      std?.lastName?.toLowerCase()?.includes(searchStudent) ||
      std?.lastName?.includes(searchStudent) ||
      std?.fullName?.toLowerCase()?.includes(searchStudent) ||
      std?.fullName?.includes(searchStudent)
  );

  const placementDataToDisplay = yearSelected
    ? filteredStudentsByYear
    : filteredStudents;
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
  const placementStudentColumn = (data) => {
    const baseColumn = [
      {
        name: "Image",
        selector: (row) => {
          const foundStudent = allApprovedStudents?.find(
            (std) => std?.uniqueId === row?.enrollmentId
          );
          const foundGraduate = allGraduatedStudents?.find(
            (std) => std?.uniqueId === row?.enrollmentId
          );
          if (foundStudent) {
            return (
              <HashLink
                scroll={scrollWithOffset}
                smooth
                to={`/sensec/admin/Students/info/${row?.fullName?.replace(
                  / /g,
                  "_"
                )}/${row?.jhsIndexNo}/overview#studentInfo`}
                title="View Student Info"
              >
                <Avatar
                  // className="studentImg"
                  src={foundStudent?.personalInfo?.profilePicture?.url}
                  sx={{
                    width: "1.5em",
                    height: "1.5em",
                    borderRadius: ".4rem",
                    objectFit: "cover",
                  }}
                  alt=""
                />
              </HashLink>
            );
          }
          if (foundGraduate) {
            return (
              <HashLink
                scroll={scrollWithOffset}
                smooth
                to={`/sensec/admin/Students/info/${row?.fullName?.replace(
                  / /g,
                  "_"
                )}/${row?.jhsIndexNo}/overview#studentInfo`}
                title="View Student Info"
              >
                <Avatar
                  // className="studentImg"
                  src={foundGraduate?.personalInfo?.profilePicture?.url}
                  sx={{
                    width: "1.5em",
                    height: "1.5em",
                    borderRadius: ".4rem",
                    objectFit: "cover",
                  }}
                  alt=""
                />
              </HashLink>
            );
          }
          if (!foundStudent && !foundGraduate) {
            return (
              <HashLink
                scroll={scrollWithOffset}
                smooth
                to={`/sensec/admin/Students/info/${row?.fullName?.replace(
                  / /g,
                  "_"
                )}/${row?.jhsIndexNo}/overview#studentInfo`}
                title="View Student Info"
              >
                <Avatar
                  sx={{
                    width: "1.5em",
                    height: "1.5em",
                    borderRadius: ".4rem",
                    objectFit: "cover",
                  }}
                  alt=""
                />
              </HashLink>
            );
          }
        },
        // row?.profilePicture ? (
        //   <HashLink
        //     scroll={scrollWithOffset}
        //     smooth
        //     to={`/sensec/admin/Students/info/${row?.fullName?.replace(
        //       / /g,
        //       "_"
        //     )}/${row?.jhsIndexNo}/overview#studentInfo`}
        //     title="View Student Info"
        //   >
        //     {!row?.profilePicture?.url && (
        //       <img
        //         className="studentImg"
        //         src={row?.profilePicture?.url}
        //         alt=""
        //       />
        //     )}
        //     {row?.profilePicture?.url && (
        //       <img
        //         className="studentImg"
        //         src={row?.profilePicture?.url}
        //         alt=""
        //       />
        //     )}
        //   </HashLink>
        // ) : (
        //   <HashLink
        //     scroll={scrollWithOffset}
        //     smooth
        //     className="noImgLink"
        //     to={`/sensec/admin/Students/info/${row?.fullName?.replace(
        //       / /g,
        //       "_"
        //     )}/${row?.jhsIndexNo}/overview`}
        //     title="View Student Info"
        //   >
        //     {row?.gender && row?.gender === "Male" && (
        //       <img
        //         className="studentImg"
        //         src={"/assets/maleAvatar.png"}
        //         alt=""
        //       />
        //     )}
        //     {row?.gender === "Female" && (
        //       <img
        //         className="studentImg"
        //         src={"/assets/femaleAvatar.png"}
        //         alt=""
        //       />
        //     )}
        //     {row?.gender === "" && (
        //       <div className="noImg">
        //         <p>No</p>
        //         <p>Image</p>
        //       </div>
        //     )}
        //   </HashLink>
        // ),
      },
      // {
      //   name: "First Name",
      //   selector: (row) => <p title={row?.firstName}>{row?.firstName}</p>,
      //   sortable: true,
      //   omit: data.some((user) => user.fullName),
      // },
      // {
      //   name: "Surname",
      //   selector: (row) => <p title={row?.lastName}>{row?.lastName}</p>,
      //   omit: data.some((user) => user.fullName),
      // },
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
        selector: (row) =>
          row?.jhsAttended ? (
            <p title={row?.jhsAttended}>{row?.jhsAttended}</p>
          ) : (
            <p>---</p>
          ),
        sortable: true,
      },
      {
        name: "Index Number",
        selector: (row) =>
          row?.jhsIndexNo ? (
            <p title={`Index No: ${row?.jhsIndexNo}`}>{row?.jhsIndexNo}</p>
          ) : (
            <p>---</p>
          ),
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
        selector: (row) => (
          <p
            style={{
              color:
                row?.placementVerified && row?.enrolled
                  ? "#f9e82f"
                  : row?.placementVerified && !row?.enrolled
                  ? "green"
                  : "#af0f0f",
            }}
          >
            {row?.placementVerified ? "Yes" : "No"}
          </p>
        ),
      },
      {
        name: "Enrolled",
        selector: (row) => (
          <p style={{ color: row?.enrolled ? "#f9e82f" : "#af0f0f" }}>
            {row?.enrolled ? "Yes" : "No"}
          </p>
        ),
      },
      // {
      //   name: "Edit",
      //   selector: (row) => (
      //     <Link
      //       className="editLink"
      //       to={`/sensec/admin/Students/${row?.fullName?.replace(/ /g, "_")}/${
      //         row?.jhsIndexNo
      //       }/edit`}
      //     >
      //       <EditIcon
      //       // sx={{ color: "#fff" }}
      //       />
      //     </Link>
      //   ),
      // },
    ];
    return baseColumn;
  };

  // Handle change in TextField
  const handleFilterChange = (event) => {
    const value = event.target.value;
    // Filter data based on selection
    if (value === "Current Year") {
      setYearSelected(false);
      setFilter("");
    } else {
      setFilter(value);
    }
  };
  // Define subHeaderComponent with MUI TextField
  const subHeaderComponent = (
    <CustomTextField
      label="Filter by Year"
      select
      value={filter ? filter : "Current Year"}
      onChange={handleFilterChange}
      variant="outlined"
      size="small"
      style={{ width: "200px" }}
    >
      <MenuItem value="Current Year">Current Year</MenuItem>
      {filteredPlacementBatches?.map((batch) => (
        <MenuItem
          value={batch?.year}
          key={batch?._id}
          onClick={() => setYearSelected(true)}
        >
          {batch?.year}
        </MenuItem>
      ))}
      {/* <MenuItem value="not_enrolled">Not Enrolled</MenuItem> */}
    </CustomTextField>
  );
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
  const allStd = `All Placement Students / Total = ${
    placementDataToDisplay?.length > 0 ? placementDataToDisplay?.length : 0
  }`;
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
          {placementDataToDisplay?.length === 0 && searchStudent !== "" && (
            <p className="searchInfo">
              We couldn&apos;t find any matches for &quot;{searchStudent}&quot;
            </p>
          )}
          {placementDataToDisplay?.length === 0 && searchStudent !== "" && (
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
              Search Result = {placementDataToDisplay.length}
            </p>
          )}
          {!searchStudent && (
            <p className="searchInfo">
              Total Placement Students ={" "}
              {placementDataToDisplay?.length > 0
                ? placementDataToDisplay?.length
                : 0}
            </p>
          )}
        </Box>
        <Box className="studentDataTable" fontSize={"calc(0.7rem + 1vmin)"}>
          <DataTable
            title={allStd}
            columns={placementStudentColumn(placementDataToDisplay)}
            data={placementDataToDisplay}
            customStyles={customUserTableStyle}
            pagination
            selectableRows
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            responsive
            conditionalRowStyles={conditionalRowStyles}
            subHeader
            subHeaderComponent={subHeaderComponent} // Add MUI TextField as sub-header
          />
        </Box>
      </Box>
    </>
  );
}
