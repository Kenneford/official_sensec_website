import React, { useEffect, useState } from "react";
import "./schoolProgrammesData.scss";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Button } from "@mui/material";
import {
  FetchAllFlattenedProgrammes,
  FetchAllProgrammes,
} from "../../../../data/programme/FetchProgrammeData";
import { FetchProgrammeStudents } from "../../../../data/students/FetchAllStudents";
import {
  FetchAllLecturers,
  FetchProgrammeLecturers,
} from "../../../../data/lecturers/FetchLecturers";
import {
  FetchAllCoreSubjects,
  FetchAllElectiveSubjects,
  FetchAllSubjects,
} from "../../../../data/subjects/FetchSubjects";
import { Add, Close, Remove, TaskAlt } from "@mui/icons-material";
import { HashLink } from "react-router-hash-link";
import { getAuthUser } from "../../../../features/auth/authSlice";
import RemoveSubjectLecturerModal from "../../../modals/RemoveSubjectLecturerModal";
import AssignSubjectLecturerModal from "../../../modals/AssignSubjectLecturerModal";
import {
  fetchAllSubjects,
  resetAssignSubjectLecturerState,
} from "../../../../features/academics/subjectsSlice";
// import DeleteProgramDataModal from "./deleteProgramData/DeleteProgramDataModal";

export function SchoolProgrammesData() {
  const { adminCurrentAction, adminCurrentLink } = useParams();
  const authAdmin = useSelector(getAuthUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [program, setProgram] = useState(false);
  const [electiveSub, setElectiveSub] = useState(false);
  const [coreSub, setCoreSub] = useState(false);
  const [currentRowId, setCurrentRowId] = useState({});
  const [itemToDelete, setItemToDelete] = useState("");
  const [electiveSubProgram, setElectiveSubProgram] = useState("");
  const [electiveSubClassLevel, setElectiveSubClassLevel] = useState("");

  const deleteProgramStatus = "";
  const allProgrammes = FetchAllProgrammes();
  const allSubjectsData = FetchAllSubjects();
  const allFlattenedProgrammes = FetchAllFlattenedProgrammes();
  const allElectiveSubjectsData = FetchAllElectiveSubjects();

  const allCoreSubjectsData = FetchAllCoreSubjects();

  const { assignLecturerStatus, successMessage, removeLecturerStatus, error } =
    useSelector((state) => state.subject);

  const [loadingComplete, setLoadingComplete] = useState(null);
  const [deleteLoadingComplete, setDeleteLoadingComplete] = useState(null);
  const [openAssignLecturerModal, setOpenAssignLecturerModal] = useState(false);

  const [openRemoveLecturerModal, setOpenRemoveLecturerModal] = useState(false);

  const foundProgram = allProgrammes.find(
    (program) => program._id === currentRowId
  );
  const foundElectiveSubject = allElectiveSubjectsData.find(
    (eSubj) => eSubj._id === currentRowId
  );

  const foundCoreSubject = allCoreSubjectsData.find(
    (cSubj) => cSubj._id === currentRowId
  );

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
      selector: (row) => {
        const programFound = allFlattenedProgrammes?.find(
          (program) => program?._id === row?.subjectInfo?.program?.programId
        );
        if (programFound) {
          return (
            <p
              title={
                programFound?.name
                  ? programFound?.name
                  : programFound?.divisionName
              }
            >
              {programFound?.name && programFound?.name}
              {programFound?.divisionName && programFound?.divisionName}
            </p>
          );
        }
        return "---";
      },
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
      selector: (row) => (
        // <Box
        //   sx={{
        //     width: "100%",
        //   }}
        // >
        <Button
          fullWidth
          title="View All Lecturer"
          onClick={() => {
            setCurrentRowId(row?._id);
            setOpenRemoveLecturerModal(true);
          }}
          sx={{
            bgcolor: "transparent",
            fontSize: ".9em",
            textTransform: "capitalize",
            color: "green",
          }}
        >
          {row?.teachers ? row?.teachers?.length : "---"}
          {/* (row?.teachers ? row?.teachers?.length : "---") */}
        </Button>
        // </Box>
      ),
      sortable: true,
    },
    {
      name: "Assign Lecturers",
      selector: (row) => {
        return (
          <Box display={"flex"}>
            <Button
              title="Add New Lecturer"
              onClick={() => {
                setCurrentRowId(row);
                setOpenAssignLecturerModal(true);
              }}
              sx={{
                bgcolor: "transparent",
                fontSize: ".9em",
                textTransform: "capitalize",
                color: "green",
              }}
            >
              ANL
              <Add
                style={{
                  position: "absolute",
                  top: ".5rem",
                  right: ".7rem",
                  fontSize: ".9em",
                }}
              />
            </Button>
            {row?.teachers?.length > 0 && (
              <Button
                title="Remove Existing Lecturer"
                onClick={() => {
                  setCurrentRowId(row);
                  setOpenRemoveLecturerModal(true);
                }}
                sx={{
                  bgcolor: "transparent",
                  fontSize: ".9em",
                  textTransform: "capitalize",
                  color: "red",
                }}
              >
                REL
                <Remove
                  style={{
                    position: "absolute",
                    top: ".5rem",
                    right: ".7rem",
                    fontSize: ".9em",
                  }}
                />
              </Button>
            )}
          </Box>
        );
      },
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
              {deleteLoadingComplete === false && "Deleting..."}
              {deleteLoadingComplete && deleteSubjectStatus === "success" && (
                <>
                  <span>Deleted</span> <TaskAltIcon />
                </>
              )}
            </>
          )}
          {deleteLoadingComplete === null && <DeleteForeverIcon />}
          {row._id !== foundElectiveSubject?._id &&
            deleteLoadingComplete !== null && <DeleteForeverIcon />}
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
      sortable: true,
    },
    {
      name: "Lecturers",
      selector: (row) => (row?.teachers ? row?.teachers?.length : "---"),
    },
    {
      name: "Current Lecturer",
      selector: (row) => {
        const allLecturers = FetchAllLecturers();
        const lecturerFound = allLecturers?.find(
          (lecturer) => lecturer?._id === row?.currentTeacher
        );

        return (
          <>
            {row?.currentTeacher && (
              <p title={lecturerFound?.personalInfo?.fullName}>
                {lecturerFound?.personalInfo?.gender === "Male"
                  ? "Mr. "
                  : "Mrs. "}
                {lecturerFound?.personalInfo?.fullName}
              </p>
            )}
            {!row?.currentTeacher && (
              <Button
                onClick={() => {
                  if (!row?.currentTeacher) {
                    setOpenModal(true);
                  }
                }}
                sx={{
                  bgcolor: "transparent",
                  fontSize: ".9em",
                  textTransform: "capitalize",
                }}
              >
                Assign Lecturer
              </Button>
            )}
          </>
        );
      },
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

  //Delete Program Status Check
  useEffect(() => {
    if (assignLecturerStatus === "pending") {
      setLoadingComplete(false);
    }
    if (assignLecturerStatus === "rejected") {
      setTimeout(() => {
        error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "light",
            // toastId: successId,
          })
        );
      }, 1000);
      setTimeout(() => {
        setLoadingComplete(null);
        dispatch(resetAssignSubjectLecturerState());
      }, 2000);
      return;
    }
    if (assignLecturerStatus === "success") {
      setTimeout(() => {
        toast.success(successMessage, {
          position: "top-right",
          theme: "dark",
          toastId: successMessage,
        });
      }, 1000);
      setTimeout(() => {
        setLoadingComplete(true);
      }, 2000);
      setTimeout(() => {
        setLoadingComplete(null);
        dispatch(resetAssignSubjectLecturerState());
      }, 4000);
    }
  }, [assignLecturerStatus, successMessage, error, dispatch]);

  useEffect(() => {
    if (removeLecturerStatus === "success") {
      setTimeout(() => {
        dispatch(fetchAllSubjects());
      }, 4000);
    }
  }, [removeLecturerStatus, dispatch]);

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
      {/* <SubjectLecturerModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        // handleNewEmployment={handleNewEmployment}
        redirecting={redirect}
        // uncompletedEmploymentTask={uncompletedEmploymentTask}
        question={"Are you sure you would like to employ a new Lecturer?"}
      /> */}
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
        <AssignSubjectLecturerModal
          open={openAssignLecturerModal}
          onClose={() => setOpenAssignLecturerModal(false)}
          authAdmin={authAdmin}
          // lecturer={lecturerFound}
          subject={currentRowId}
          loadingComplete={loadingComplete}
          assignLecturerStatus={assignLecturerStatus}
        />
        <RemoveSubjectLecturerModal
          open={openRemoveLecturerModal}
          onClose={() => setOpenRemoveLecturerModal(false)}
          authAdmin={authAdmin}
          subject={currentRowId}
        />
      </Box>
    </>
  );
}
