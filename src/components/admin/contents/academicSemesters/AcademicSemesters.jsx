import { Link } from "react-router-dom";
import "./academicSemesters.scss";
import { useParams } from "react-router-dom";
import { DeleteForever, Edit } from "@mui/icons-material";
import DataTable from "react-data-table-component";
import { Box, Button } from "@mui/material";
import { FetchAllClassLevels } from "../../../../data/class/FetchClassLevel";
import {
  FetchApprovedClassLevelStudents,
  FetchPendingClassLevelStudents,
} from "../../../../data/students/FetchAllStudents";
import { FetchAllClassLevelLecturers } from "../../../../data/lecturers/FetchLecturers";
import { useSelector } from "react-redux";
import { getAuthUser } from "../../../../features/auth/authSlice";
import NotAuthorized from "../../../notAuthorized/NotAuthorized";
import { FetchAllAcademicTerms } from "../../../../data/term.year/FetchAcademicTerms";
import { dateFormatter } from "../../../../dateFormatter/DateFormatter";
import { useState } from "react";
import UpdateSemesterStatusModal from "../../../modals/UpdateSemesterStatusModal";

export function AcademicSemesters() {
  const authAdmin = useSelector(getAuthUser);
  const { adminCurrentAction, adminCurrentLink } = useParams();

  const allAcademicSemesters = FetchAllAcademicTerms();
  console.log(allAcademicSemesters);

  const [openUpdateSemesterStatusModal, setOpenUpdateSemesterStatusModal] =
    useState(false);
  const [semesterToUpdate, setSemesterToUpdate] = useState(null);

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
        justifyContent: "center",
        fontSize: "1.2em",
        // borderLeft: ".2rem solid red",
        // backgroundColor: "blue",
        // color: "#fff",
      },
    },
    cells: {
      style: {
        display: "flex",
        justifyContent: "center",
        // backgroundColor: "#cccc",
        // color: "#fff",
        paddingTop: ".5rem",
        paddingBottom: ".5rem",
        fontSize: "1em",
        // marginTop: ".5rem",
        // marginBottom: ".5rem",
      },
    },
  };

  const semesterColumn = [
    {
      name: "Semesters",
      selector: (row) => row?.name?.slice(0, -9),
      sortable: true,
    },
    {
      name: "From",
      selector: (row) =>
        row?.from ? dateFormatter?.format(new Date(row?.from)) : "---",
    },
    {
      name: "To",
      selector: (row) =>
        row?.to ? dateFormatter?.format(new Date(row?.to)) : "---",
    },
    { name: "Duration", selector: (row) => row?.duration },
    {
      name: "Status",
      selector: (row) => (
        <Button
          size="small"
          sx={{
            color: "#696969",
            padding: "unset",
            // fontWeight: 300,
            fontSize: ".75rem",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
          onClick={() => {
            setSemesterToUpdate(row);
            setOpenUpdateSemesterStatusModal(true);
          }}
        >
          <span style={{ color: "#248e07" }}>
            {row?.status?.includes("isCurrent") && "Current"}
          </span>
          <span style={{ color: "#acaf1a" }}>
            {row?.status?.includes("isNext") && "Next"}
          </span>
          <span style={{ color: "#565655" }}>
            {!row?.status?.includes("isCurrent") &&
              !row?.status?.includes("isNext") &&
              "Pending"}
          </span>
        </Button>
      ),
    },
    // {
    //   name: "CreatedBy",
    //   selector: (row) => (
    //     <p
    //     // title={
    //     //   row?.createdBy?.personalInfo?.lastName
    //     //     ? row?.createdBy?.personalInfo?.lastName
    //     //     : ""
    //     // }
    //     >
    //       {row?.createdBy &&
    //         row?.createdBy?.personalInfo?.gender === "Male" &&
    //         "Mr."}{" "}
    //       {row?.createdBy &&
    //         row?.createdBy?.personalInfo?.gender === "Female" &&
    //         "Mrs."}{" "}
    //       {row?.createdBy ? row?.createdBy?.personalInfo?.lastName : "---"}
    //     </p>
    //   ),
    // },
    // {
    //   name: "Last Updated By",
    //   selector: (row) => (
    //     <p
    //       title={
    //         row?.lastUpdatedBy?.personalInfo?.lastName?.length > 10
    //           ? row?.lastUpdatedBy?.personalInfo?.lastName
    //           : ""
    //       }
    //     >
    //       {row?.lastUpdatedBy &&
    //         row?.lastUpdatedBy?.personalInfo?.gender === "Male" &&
    //         "Mr."}{" "}
    //       {row?.lastUpdatedBy &&
    //         row?.lastUpdatedBy?.personalInfo?.gender === "Female" &&
    //         "Mrs."}{" "}
    //       {row?.lastUpdatedBy
    //         ? row?.lastUpdatedBy?.personalInfo?.lastName
    //         : "---"}
    //     </p>
    //   ),
    // },
    // {
    //   name: "Edit",
    //   selector: (row) => (
    //     <Link
    //       className="editLink"
    //       to={`/sensec/admin/${adminCurrentAction}/${adminCurrentLink}/${row?.name.replace(
    //         / /g,
    //         "_"
    //       )}/edit`}
    //     >
    //       <Edit />
    //     </Link>
    //   ),
    // },
    // {
    //   name: "Delete",
    //   selector: (row) => (
    //     <button className="deleteLink">
    //       <DeleteForever />
    //     </button>
    //   ),
    // },
  ];

  const allCLevels = `All Class Levels / Total = ${allAcademicSemesters?.length}`;
  if (!authAdmin?.roles?.includes("Admin")) {
    return <NotAuthorized />;
  }
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
        {/* <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <SearchForm
            value={searchedBlog}
            onChange={handleOnChange}
            placeholder={"Search"}
          />
        </Box> */}
      </Box>
      <h2>{allCLevels}</h2>
      <Box className="classLevelsDataCont">
        <DataTable
          // title={allCLevels}
          columns={semesterColumn}
          data={allAcademicSemesters}
          customStyles={customStyle}
          pagination
          // selectableRows
          fixedHeader
          // selectableRowsHighlight
          highlightOnHover
          responsive
        />
        <UpdateSemesterStatusModal
          open={openUpdateSemesterStatusModal}
          onClose={() => setOpenUpdateSemesterStatusModal(false)}
          semesterToUpdate={semesterToUpdate}
          authAdmin={authAdmin}
          // subject={currentRowId}
          // Semesterme={programToUpdate}
          // loadingComplete={loadingComplete}
          // assignLecturerStatus={assignLecturerStatus}
        />
      </Box>
    </>
  );
}
