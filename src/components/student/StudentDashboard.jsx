import React, { useState } from "react";
import "./studentDashboard.scss";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { useDemoData } from "@mui/x-data-grid-generator";
import { Avatar, Box } from "@mui/material";
import DataTable from "react-data-table-component";

const fakeStudents = [
  {
    firstName: "Evans",
    lastName: "Osei-Tutu",
    programme: "Agric Science",
    classLevel: "Level 100",
  },
  {
    firstName: "Mavis",
    lastName: "Donkor",
    programme: "General Arts",
    classLevel: "Level 200",
  },
];

export function StudentDashboard() {
  const [multiStudents, setMultiStudents] = useState([]);
  const customUserTableStyle = {
    headRow: {
      style: {
        backgroundColor: "#555",
        color: "#fff",
      },
    },
    headColumn: {
      style: {
        border: "1rem solid red",
        justifyContent: "center",
        // color: "#fff",
      },
    },
    headCells: {
      style: {
        fontSize: "1.2rem",
        justifyContent: "center",
        // borderLeft: ".2rem solid red",
        // backgroundColor: "blue",
        // color: "#fff",
      },
    },
    cells: {
      style: {
        // backgroundColor: "#cccc",
        // color: "#fff",
        paddingTop: ".5rem",
        paddingBottom: ".5rem",
        fontSize: "1rem",
        justifyContent: "center",
        // marginTop: ".5rem",
        // marginBottom: ".5rem",
      },
    },
  };

  const handleMultiSelect = (state) => {
    setMultiStudents(state.selectedRows);
  };
  const studentDataFormat = [
    {
      name: "Image",
      selector: (row) =>
        row?.profilePicture ? (
          <Avatar
            className="studentImg"
            src={
              row?.personalInfo
                ? row?.personalInfo?.profilePicture?.url
                : row?.personalInfo?.profilePicture
            }
            alt=""
          />
        ) : (
          <Avatar
            className="studentImg"
            src={"/assets/femaleAvatar.png"}
            alt=""
          />
        ),
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row) => row?.firstName,
      sortable: true,
    },
    { name: "Surname", selector: (row) => row?.lastName },
    {
      name: "Program",
      selector: (row) => (row?.programme ? row?.programme : "---"),
    },
    {
      name: "Level",
      selector: (row) => (row?.classLevel ? row?.classLevel : "---"),
    },
  ];
  const title = "All Enrolled Students Data";
  return (
    <DataTable
      title={title}
      columns={studentDataFormat}
      data={fakeStudents}
      customStyles={customUserTableStyle}
      pagination
      selectableRows
      fixedHeader
      selectableRowsHighlight
      highlightOnHover
      responsive
      onSelectedRowsChange={handleMultiSelect}
    />
  );
}
