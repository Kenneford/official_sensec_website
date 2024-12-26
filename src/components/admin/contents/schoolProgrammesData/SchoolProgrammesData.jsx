import React, { useEffect, useState } from "react";
import "./schoolProgrammesData.scss";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { FetchAllProgrammes } from "../../../../data/programme/FetchProgrammeData";
import { FetchProgrammeStudents } from "../../../../data/students/FetchAllStudents";
import { FetchProgrammeLecturers } from "../../../../data/lecturers/FetchLecturers";
import {
  FetchAllCoreSubjects,
  FetchAllElectiveSubjects,
  FetchAllSubjects,
} from "../../../../data/subjects/FetchSubjects";
// import DeleteProgramDataModal from "./deleteProgramData/DeleteProgramDataModal";

export function SchoolProgrammesData() {
  const { adminCurrentAction, adminCurrentLink } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [program, setProgram] = useState(false);
  const [electiveSub, setElectiveSub] = useState(false);
  const [coreSub, setCoreSub] = useState(false);
  const [currentRowId, setCurrentRowId] = useState("");
  const [itemToDelete, setItemToDelete] = useState("");
  const [electiveSubProgram, setElectiveSubProgram] = useState("");
  const [electiveSubClassLevel, setElectiveSubClassLevel] = useState("");
  const deleteProgramStatus = "";
  const allProgrammes = FetchAllProgrammes();
  const allSubjectsData = FetchAllSubjects();
  const allElectiveSubjectsData = FetchAllElectiveSubjects();
  const allCoreSubjectsData = FetchAllCoreSubjects();
  const foundProgram = allProgrammes.find(
    (program) => program._id === currentRowId
  );
  const foundElectiveSubject = allElectiveSubjectsData.find(
    (eSubj) => eSubj._id === currentRowId
  );

  const foundCoreSubject = allCoreSubjectsData.find(
    (cSubj) => cSubj._id === currentRowId
  );
  const subjects = 34;
  const deleteSubjectStatus = "";

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
  const programmesColumn = [
    {
      name: "Programme",
      selector: (row) => (row?.name ? row?.name : "---"),
    },
    {
      name: "Code",
      selector: (row) => (row?.code ? row?.code : "---"),
      sortable: true,
    },
    {
      name: "Divisions",
      selector: (row) =>
        row?.programDivisions ? row?.programDivisions?.length : "---",
      sortable: true,
    },
    {
      name: "Students",
      selector: (row) => {
        const allApprovedStudents = FetchProgrammeStudents(row?._id);
        return <p>{allApprovedStudents?.length}</p>;
      },
    },
    {
      name: "Teachers",
      selector: (row) => {
        const allApprovedStudents = FetchProgrammeLecturers(row?._id);
        return <p>{allApprovedStudents?.length}</p>;
      },
      sortable: true,
    },
    {
      name: "Duration",
      selector: (row) => (row?.duration ? row?.duration : "---"),
    },
    {
      name: "CreatedBy",
      selector: (row) => (
        <p
          title={
            row?.createdBy?.personalInfo?.fullName?.length > 20
              ? row?.createdBy?.personalInfo?.fullName
              : ""
          }
        >
          {row?.createdBy ? row?.createdBy?.personalInfo?.fullName : "---"}
        </p>
      ),
    },
    {
      name: "Last Updated By",
      selector: (row) =>
        row?.lastUpdatedBy ? row?.lastUpdatedBy?.personalInfo?.fullName : "---",
    },
    {
      name: "Edit",
      selector: (row) => (
        <Link
          className="editLink"
          to={`/sensec/admin/${adminCurrentAction}/${adminCurrentLink}/Programme/${row?.name.replace(
            / /g,
            "_"
          )}/edit`}
        >
          <EditIcon />
        </Link>
      ),
    },
    {
      name: "Delete",
      selector: (row) => (
        <>
          <button
            onClick={async () => {
              setCurrentRowId(row._id);
              setItemToDelete(row?.name);
              setOpenModal(true);
              setProgram(true);
              setElectiveSub(false);
              setCoreSub(false);
            }}
            className="deleteLink"
          >
            {foundProgram && foundProgram?._id === row._id && (
              <>
                {loadingComplete === false && "Deleting..."}
                {loadingComplete && deleteProgramStatus === "success" && (
                  <>
                    <span>Deleted</span> <TaskAltIcon />
                  </>
                )}
              </>
            )}
            {loadingComplete === null && <DeleteForeverIcon />}
            {row._id !== foundProgram?._id && loadingComplete !== null && (
              <DeleteForeverIcon />
            )}
          </button>
        </>
      ),
    },
  ];
  const electiveSubColumn = [
    {
      name: "Subject",
      selector: (row) =>
        row?.subjectName ? (
          <p title={row?.subjectName}>{row?.subjectName}</p>
        ) : (
          <p>---</p>
        ),
    },
    {
      name: "Programme",
      selector: (row) =>
        row?.electiveSubInfo ? row?.electiveSubInfo?.programId?.name : "---",
      sortable: true,
    },
    // {
    //   name: "Class Level",
    //   selector: (row) => (row?.classLevel ? row?.classLevel?.name : "---"),
    //   sortable: true,
    // },
    // {
    //   name: "Current Teacher",
    //   selector: (row) =>
    //     row?.currentTeacher
    //       ? row?.currentTeacher?.personalInfo?.fullName
    //       : "---",
    //   sortable: true,
    // },
    {
      name: "Teachers",
      selector: (row) => (row?.teachers ? row?.teachers?.length : "---"),
      sortable: true,
    },
    {
      name: "Optional",
      selector: (row) => (row?.electiveSubInfo?.isOptional ? "Yes" : "No"),
    },
    // {
    //   name: "Duration",
    //   selector: (row) => (row?.duration ? row?.duration : "---"),
    // },
    {
      name: "CreatedBy",
      selector: (row) => (
        <p
          title={
            row?.createdBy?.personalInfo?.fullName?.length > 20
              ? row?.createdBy?.personalInfo?.fullName
              : ""
          }
        >
          {row?.createdBy ? row?.createdBy?.personalInfo?.fullName : "---"}
        </p>
      ),
    },
    {
      name: "Last Updated By",
      selector: (row) =>
        row?.lastUpdatedBy ? row?.lastUpdatedBy?.personalInfo?.fullName : "---",
    },
    {
      name: "Edit",
      selector: (row) => (
        <Link
          className="editLink"
          to={`/sensec/admin/${adminCurrentAction}/${adminCurrentLink}/Subject/${row?.subjectName.replace(
            / /g,
            "_"
          )}/edit`}
        >
          <EditIcon />
        </Link>
      ),
    },
    {
      name: "Delete",
      selector: (row) => (
        <button
          onClick={async () => {
            setCurrentRowId(row._id);
            setItemToDelete(row?.subjectName);
            setElectiveSubProgram(row?.nameOfProgram);
            setElectiveSubClassLevel(row?.classLevel?._id);
            setOpenModal(true);
            setProgram(false);
            setElectiveSub(true);
            setCoreSub(false);
          }}
          className="deleteLink"
        >
          {foundElectiveSubject && foundElectiveSubject?._id === row._id && (
            <>
              {loadingComplete === false && "Deleting..."}
              {loadingComplete && deleteSubjectStatus === "success" && (
                <>
                  <span>Deleted</span> <TaskAltIcon />
                </>
              )}
            </>
          )}
          {loadingComplete === null && <DeleteForeverIcon />}
          {row._id !== foundElectiveSubject?._id &&
            loadingComplete !== null && <DeleteForeverIcon />}
        </button>
      ),
    },
  ];

  const coreSubColumn = [
    {
      name: "Subject",
      selector: (row) =>
        row?.subjectName ? (
          <p title={row?.subjectName}>{row?.subjectName}</p>
        ) : (
          <p>---</p>
        ),
    },
    // {
    //   name: "Class Level",
    //   selector: (row) => (row?.classLevel ? row?.classLevel?.name : "---"),
    //   sortable: true,
    // },
    // {
    //   name: "Current Teacher",
    //   selector: (row) =>
    //     row?.currentTeacher
    //       ? row?.currentTeacher?.personalInfo?.fullName
    //       : "---",
    //   sortable: true,
    // },
    {
      name: "Teachers",
      selector: (row) => (row?.teachers ? row?.teachers?.length : "---"),
      sortable: true,
    },
    // {
    //   name: "Duration",
    //   selector: (row) => (row?.duration ? row?.duration : "---"),
    // },
    {
      name: "CreatedBy",
      selector: (row) => (
        <p
          title={
            row?.createdBy?.personalInfo?.fullName?.length > 20
              ? row?.createdBy?.personalInfo?.fullName
              : ""
          }
        >
          {row?.createdBy ? row?.createdBy?.personalInfo?.fullName : "---"}
        </p>
      ),
    },
    {
      name: "Last Updated By",
      selector: (row) =>
        row?.lastUpdatedBy ? row?.lastUpdatedBy?.personalInfo?.fullName : "---",
    },
    {
      name: "Edit",
      selector: (row) => (
        <Link
          className="editLink"
          to={`/sensec/admin/${adminCurrentAction}/${adminCurrentLink}/Subject/${row?.subjectName.replace(
            / /g,
            "_"
          )}/edit`}
        >
          <EditIcon />
        </Link>
      ),
    },
    {
      name: "Delete",
      selector: (row) => (
        <>
          <button
            onClick={async () => {
              setCurrentRowId(row._id);
              setItemToDelete(row?.subjectName);
              setOpenModal(true);
              setProgram(false);
              setElectiveSub(false);
              setCoreSub(true);
            }}
            className="deleteLink"
          >
            {foundCoreSubject && foundCoreSubject._id === row._id && (
              <>
                {loadingComplete === false && "Deleting..."}
                {loadingComplete && deleteSubjectStatus === "success" && (
                  <>
                    <span>Deleted</span> <TaskAltIcon />
                  </>
                )}
              </>
            )}
            {loadingComplete === null && <DeleteForeverIcon />}
            {row._id !== foundCoreSubject?._id && loadingComplete !== null && (
              <DeleteForeverIcon />
            )}
          </button>
        </>
      ),
    },
  ];

  const allPrograms = `All Programmes / Total = ${allProgrammes?.length}`;
  const allSubjects = `All Subjects / Total = ${allSubjectsData?.length}`;
  const allESubjects = `Elective Subjects / Total = ${allElectiveSubjectsData?.length}`;
  const allCSubjects = `Core Subjects / Total = ${allCoreSubjectsData?.length}`;

  const handleProgramDeletion = () => {
    // if (program) {
    //   dispatch(deleteProgram({ id: currentRowId, deletedBy: userInfo?.id }));
    // }
    // if (electiveSub) {
    //   dispatch(
    //     deleteSubject({
    //       id: currentRowId,
    //       // electiveSubProgram,
    //       // classLevel: electiveSubClassLevel,
    //       adminId: userInfo?.uniqueId,
    //     })
    //   );
    // }
    // if (coreSub) {
    //   dispatch(
    //     deleteSubject({ id: currentRowId, adminId: userInfo?.uniqueId })
    //   );
    // }
  };
  // useEffect(() => {
  //   dispatch(fetchAllProgrammes());
  //   dispatch(fetchAllCoreSubjects());
  //   dispatch(fetchAllElectiveSubjects());
  // }, [dispatch]);

  //Delete Program Status Check
  // useEffect(() => {
  //   if (deleteProgramStatus === "pending") {
  //     setLoadingComplete(false);
  //     setTimeout(() => {
  //       setLoadingComplete(true);
  //     }, 3000);
  //   }
  //   if (deleteProgramStatus === "rejected") {
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //     }, 3000);
  //     setTimeout(() => {
  //       deleteProgramError?.errorMessage?.message?.map((err) =>
  //         toast.error(err, {
  //           position: "top-right",
  //           theme: "light",
  //           // toastId: successId,
  //         })
  //       );
  //     }, 2000);
  //     return;
  //   }
  //   if (loadingComplete && deleteProgramStatus === "success") {
  //     setTimeout(() => {
  //       toast.success(deleteProgramSuccessMessage, {
  //         position: "top-right",
  //         theme: "dark",
  //       });
  //     }, 1000);
  //     setTimeout(() => {
  //       dispatch(fetchAllProgrammes());
  //     }, 6000);
  //   }
  // }, [
  //   deleteProgramStatus,
  //   deleteProgramSuccessMessage,
  //   deleteProgramError,
  //   dispatch,
  //   loadingComplete,
  // ]);

  //Delete Elective Subject Status Check
  // useEffect(() => {
  //   if (deleteElectiveSubjectStatus === "pending") {
  //     setLoadingComplete(false);
  //     setTimeout(() => {
  //       setLoadingComplete(true);
  //     }, 3000);
  //   }
  //   if (deleteElectiveSubjectStatus === "rejected") {
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //     }, 3000);
  //     setTimeout(() => {
  //       deleteElectiveSubjectError.errorMessage.message.map((err) =>
  //         toast.error(err, {
  //           position: "top-right",
  //           theme: "light",
  //           // toastId: successId,
  //         })
  //       );
  //     }, 2000);
  //     return;
  //   }
  //   if (loadingComplete && deleteElectiveSubjectStatus === "success") {
  //     setTimeout(() => {
  //       toast.success(deleteElectiveSubjectSuccessMessage, {
  //         position: "top-right",
  //         theme: "dark",
  //       });
  //     }, 1000);
  //     setTimeout(() => {
  //       dispatch(fetchAllElectiveSubjects());
  //     }, 6000);
  //   }
  // }, [
  //   deleteElectiveSubjectStatus,
  //   deleteElectiveSubjectSuccessMessage,
  //   deleteElectiveSubjectError,
  //   dispatch,
  //   loadingComplete,
  // ]);

  //Delete Subject Status Check
  // useEffect(() => {
  //   if (deleteSubjectStatus === "pending") {
  //     setLoadingComplete(false);
  //     setTimeout(() => {
  //       setLoadingComplete(true);
  //     }, 3000);
  //   }
  //   if (deleteSubjectStatus === "rejected") {
  //     setTimeout(() => {
  //       setLoadingComplete(null);
  //     }, 3000);
  //     setTimeout(() => {
  //       deleteSubjectError?.errorMessage?.message?.map((err) =>
  //         toast.error(err, {
  //           position: "top-right",
  //           theme: "light",
  //           // toastId: successId,
  //         })
  //       );
  //     }, 2000);
  //     return;
  //   }
  //   if (loadingComplete && deleteSubjectStatus === "success") {
  //     setTimeout(() => {
  //       toast.success(deleteSubjectSuccessMessage, {
  //         position: "top-right",
  //         theme: "dark",
  //       });
  //     }, 1000);
  //     setTimeout(() => {
  //       dispatch(fetchAllCoreSubjects());
  //       dispatch(fetchAllElectiveSubjects());
  //     }, 6000);
  //   }
  // }, [
  //   deleteSubjectStatus,
  //   deleteSubjectSuccessMessage,
  //   deleteSubjectError,
  //   dispatch,
  //   loadingComplete,
  // ]);

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
      {/* Dashboard content */}
      <Box className="programDataWrap">
        <h2>{allPrograms}</h2>
        <Box className="programDataCont">
          <DataTable
            // title={allCLevels}
            columns={programmesColumn}
            data={allProgrammes}
            customStyles={customStyle}
            pagination
            // selectableRows
            fixedHeader
            // selectableRowsHighlight
            highlightOnHover
            responsive
          />
        </Box>
        <h2 className="allSubjectsh2">{allSubjects}</h2>
        <h4>{allCSubjects}</h4>
        <Box className="programDataCont">
          <DataTable
            // title={allCLevels}
            columns={coreSubColumn}
            data={allCoreSubjectsData}
            customStyles={customStyle}
            pagination
            // selectableRows
            fixedHeader
            // selectableRowsHighlight
            highlightOnHover
            responsive
          />
        </Box>
        <h4 className="electiveSubJHead">{allESubjects}</h4>
        <Box className="programDataCont">
          <DataTable
            // title={allCLevels}
            columns={electiveSubColumn}
            data={allElectiveSubjectsData}
            customStyles={customStyle}
            pagination
            // selectableRows
            fixedHeader
            // selectableRowsHighlight
            highlightOnHover
            responsive
          />
        </Box>
        {/* <DeleteProgramDataModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        handleProgramDeletion={handleProgramDeletion}
        // program={program}
        // electiveSub={electiveSub}
        // coreSub={coreSub}
        // itemToDelete={itemToDelete}
      /> */}
      </Box>
    </>
  );
}
