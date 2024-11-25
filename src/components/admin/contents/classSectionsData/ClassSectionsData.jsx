import "./classSectionsData.scss";
import { Link, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DataTable from "react-data-table-component";
import { ContainerBox } from "../../../../muiStyling/muiStyling";
import { Box } from "@mui/material";
import { FetchAllClassSections } from "../../../../data/class/FetchClassSections";
import { FetchAllClassSectionLecturers } from "../../../../data/lecturers/FetchLecturers";
import { FetchClassSectionStudents } from "../../../../data/students/FetchAllStudents";
// import { FetchClassSections } from "../../../dataFetching/fetchClassSections/FetchAllClassSections";

const allClassLevels = [
  {
    name: "Level 100",
    sections: { length: 4 },
    students: { length: 76 },
    pendingStudents: {
      length: 27,
    },
    teachers: {
      length: 30,
    },
    createdBy: {
      personalInfo: {
        fullName: "Patrick Kenneford Annan",
      },
      gender: "Male",
    },
    lastUpdatedBy: {
      personalInfo: {
        fullName: "Patrick Kenneford Annan",
      },
      gender: "Male",
    },
  },
];

export function ClassSectionsData() {
  const allClassLevelSections = FetchAllClassSections();

  const { adminCurrentLink, adminCurrentAction } = useParams();

  const level100Section = allClassLevelSections?.filter(
    (section) => section?.classLevelName === "Level 100"
  );

  const level200Section = allClassLevelSections?.filter(
    (section) => section?.classLevelName === "Level 200"
  );

  const level300Section = allClassLevelSections?.filter(
    (section) => section?.classLevelName === "Level 300"
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
        justifyContent: "center",
        fontSize: "1.2rem",
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
        fontSize: "1rem",
        // marginTop: ".5rem",
        // marginBottom: ".5rem",
      },
    },
  };

  const classLevelsColumn = [
    {
      name: "Section",
      selector: (row) => row?.label,
      sortable: true,
    },
    {
      name: "Class Level",
      selector: (row) => (row?.classLevelName ? row?.classLevelName : "---"),
    },
    {
      name: "Students",
      selector: (row) => {
        const allApprovedStudents = FetchClassSectionStudents(row?._id);
        return <p>{allApprovedStudents?.length}</p>;
      },
    },
    {
      name: "Programme",
      selector: (row) =>
        row?.program ? (
          <p title={row?.program?.name}>{row?.program?.name}</p>
        ) : (
          <p>---</p>
        ),
    },
    {
      name: "Teachers",
      selector: (row) => {
        const allApprovedStudents = FetchAllClassSectionLecturers(row?._id);
        return <p>{allApprovedStudents?.length}</p>;
      },
      sortable: true,
    },
    {
      name: "Current Teacher",
      selector: (row) => (
        <p title={row?.currentTeacher?.personalInfo?.fullName}>
          {row?.currentTeacher &&
            row?.currentTeacher?.personalInfo?.gender === "Male" &&
            "Mr."}{" "}
          {row?.currentTeacher &&
            row?.currentTeacher?.personalInfo?.gender === "Female" &&
            "Mrs."}{" "}
          {row?.currentTeacher
            ? row?.currentTeacher?.personalInfo?.fullName
            : "---"}
        </p>
      ),
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
          to={`/sensec/admin/${adminCurrentAction}/${adminCurrentLink}/${row?.sectionName?.replace(
            / /g,
            "_"
          )}/${row?.classLevelName?.replace(/ /g, "_")}/edit`}
        >
          <EditIcon />
        </Link>
      ),
    },
  ];

  const allCLevels = `All Class Level Sections / Total = ${allClassLevelSections?.length}`;
  const allCLevel100Sections = `Class Level 100  Sections / Total = ${level100Section?.length}`;
  const allCLevel200Sections = `Class Level 200 Sections / Total = ${level200Section?.length}`;
  const allCLevel300Sections = `Class Level 300 Sections / Total = ${level300Section?.length}`;

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
        {/* <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <SearchForm
            value={searchedBlog}
            onChange={handleOnChange}
            placeholder={"Search"}
          />
        </Box> */}
      </Box>
      <h2>{allCLevels}</h2>
      <Box className="classLevelSectionsDataCont">
        <DataTable
          title={allCLevel100Sections}
          columns={classLevelsColumn}
          data={level100Section}
          customStyles={customStyle}
          pagination
          // selectableRows
          fixedHeader
          // selectableRowsHighlight
          highlightOnHover
          responsive
        />
      </Box>
      <Box className="classLevelSectionsDataCont">
        <DataTable
          title={allCLevel200Sections}
          columns={classLevelsColumn}
          data={level200Section}
          customStyles={customStyle}
          pagination
          // selectableRows
          fixedHeader
          // selectableRowsHighlight
          highlightOnHover
          responsive
        />
      </Box>
      <Box className="classLevelSectionsDataCont">
        <DataTable
          title={allCLevel300Sections}
          columns={classLevelsColumn}
          data={level300Section}
          customStyles={customStyle}
          pagination
          // selectableRows
          fixedHeader
          // selectableRowsHighlight
          highlightOnHover
          responsive
        />
      </Box>
    </>
  );
}
