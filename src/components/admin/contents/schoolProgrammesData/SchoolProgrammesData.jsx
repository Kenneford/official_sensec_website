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
// import DeleteProgramDataModal from "./deleteProgramData/DeleteProgramDataModal";

export function SchoolProgrammesData() {
  const { adminCurrentAction, adminCurrentLink } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const subjects = 34;

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
      name: "Students",
      selector: (row) => (row?.students ? row?.students?.length : "---"),
    },
    {
      name: "Teachers",
      selector: (row) => (row?.teachers ? row?.teachers?.length : "---"),
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
      selector: (row) => (row?.subjectName ? row?.subjectName : "---"),
    },
    {
      name: "Programme",
      selector: (row) =>
        row?.electiveSubInfo?.nameOfProgram
          ? row?.electiveSubInfo?.nameOfProgram
          : "---",
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
      selector: (row) => (row?.subjectName ? row?.subjectName : "---"),
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

  const allPrograms = `All Programmes / Total = ${23}`;
  const allSubjects = `All Subjects / Total = ${subjects}`;
  const allESubjects = `Elective Subjects / Total = ${14}`;
  const allCSubjects = `Core Subjects / Total = ${20}`;

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
      {/* Dashboard content */}
      <Box className="programDataWrap">
        <h2>{allPrograms}</h2>
        <Box className="programDataCont">
          <DataTable
            // title={allCLevels}
            columns={programmesColumn}
            // data={allProgrammes}
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
            // data={allCoreSubjects}
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
            // data={allElectiveSubjects}
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
