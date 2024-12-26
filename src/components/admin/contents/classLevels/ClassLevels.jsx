import { Link } from "react-router-dom";
import "./classLevels.scss";
import { useParams } from "react-router-dom";
import { DeleteForever, Edit } from "@mui/icons-material";
import DataTable from "react-data-table-component";
import { Box } from "@mui/material";
import { FetchAllClassLevels } from "../../../../data/class/FetchClassLevel";
import {
  FetchApprovedClassLevelStudents,
  FetchPendingClassLevelStudents,
} from "../../../../data/students/FetchAllStudents";
import { FetchAllClassLevelLecturers } from "../../../../data/lecturers/FetchLecturers";

export function ClassLevels() {
  const { adminCurrentAction, adminCurrentLink } = useParams();

  const allClassLevels = FetchAllClassLevels();

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

  const classLevelsColumn = [
    {
      name: "Class Level",
      selector: (row) => row?.name,
      sortable: true,
    },
    {
      name: "Students",
      selector: (row) => {
        const allApprovedStudents = FetchApprovedClassLevelStudents(row?._id);
        return <p>{allApprovedStudents?.length}</p>;
      },
    },
    {
      name: "Pending Students",
      selector: (row) => {
        const allPendingStudents = FetchPendingClassLevelStudents(row?._id);
        return <p>{allPendingStudents?.length}</p>;
      },
    },
    { name: "Sections", selector: (row) => row?.sections?.length },
    {
      name: "Teachers",
      selector: (row) => {
        const allPendingStudents = FetchAllClassLevelLecturers(row?._id);
        return <p>{allPendingStudents?.length}</p>;
      },
      sortable: true,
    },
    {
      name: "CreatedBy",
      selector: (row) => (
        <p
          title={
            row?.createdBy?.personalInfo?.fullName?.length > 10
              ? row?.createdBy?.personalInfo?.fullName
              : ""
          }
        >
          {row?.createdBy &&
            row?.createdBy?.personalInfo?.gender === "Male" &&
            "Mr."}{" "}
          {row?.createdBy &&
            row?.createdBy?.personalInfo?.gender === "Female" &&
            "Mrs."}{" "}
          {row?.createdBy ? row?.createdBy?.personalInfo?.fullName : "---"}
        </p>
      ),
    },
    {
      name: "Last Updated By",
      selector: (row) => (
        <p
          title={
            row?.lastUpdatedBy?.personalInfo?.fullName?.length > 10
              ? row?.lastUpdatedBy?.personalInfo?.fullName
              : ""
          }
        >
          {row?.lastUpdatedBy &&
            row?.lastUpdatedBy?.personalInfo?.gender === "Male" &&
            "Mr."}{" "}
          {row?.lastUpdatedBy &&
            row?.lastUpdatedBy?.personalInfo?.gender === "Female" &&
            "Mrs."}{" "}
          {row?.lastUpdatedBy
            ? row?.lastUpdatedBy?.personalInfo?.fullName
            : "---"}
        </p>
      ),
    },
    {
      name: "Edit",
      selector: (row) => (
        <Link
          className="editLink"
          to={`/sensec/admin/${adminCurrentAction}/${adminCurrentLink}/${row?.name.replace(
            / /g,
            "_"
          )}/edit`}
        >
          <Edit />
        </Link>
      ),
    },
    {
      name: "Delete",
      selector: (row) => (
        <button className="deleteLink">
          <DeleteForever />
        </button>
      ),
    },
  ];

  const allCLevels = `All Class Levels / Total = ${allClassLevels?.length}`;
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
      <div className="classLevelsDataCont">
        <DataTable
          // title={allCLevels}
          columns={classLevelsColumn}
          data={allClassLevels}
          customStyles={customStyle}
          pagination
          // selectableRows
          fixedHeader
          // selectableRowsHighlight
          highlightOnHover
          responsive
        />
      </div>
    </>
  );
}
