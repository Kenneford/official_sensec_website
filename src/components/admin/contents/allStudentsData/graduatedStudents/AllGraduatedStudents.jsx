import { useState } from "react";
import "../allStudentsData.scss";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { customUserTableStyle } from "../../../../../usersInfoDataFormat/usersInfoTableStyle";
import { Box, Grid } from "@mui/material";
import { AllStudentsPageQuickLinks } from "../../../../../linksFormat/LinksFormat";
import ActionModal from "../../../../modals/NewEmploymentModal";
import { getAuthUser } from "../../../../../features/auth/authSlice";
import { FetchAllClassLevels } from "../../../../../data/class/FetchClassLevel";
import { FetchAllGraduatedStudents } from "../../../../../data/students/FetchAllStudents";
import { graduatesColumn } from "../../../../../usersInfoDataFormat/UsersInfoDataFormat";
import SearchFilter from "../../../../searchForm/SearchFilter";

export function AllGraduatedStudents() {
  const authAdmin = useSelector(getAuthUser);
  const actionBtns = AllStudentsPageQuickLinks();
  //Get state data
  const allStudents = FetchAllGraduatedStudents();
  console.log(allStudents);
  const allClassLevels = FetchAllClassLevels();
  console.log(allClassLevels);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    adminCurrentLink,
    adminCurrentAction,
    class_level,
    student_category,
  } = useParams();
  console.log(class_level);

  const [searchStudent, setSearchStudent] = useState("");
  const [multiStudents, setMultiStudents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [uncompletedEmploymentTask, setUncompletedEmploymentTask] =
    useState("");

  //Filter students during search
  const filteredStudents = allStudents?.filter(
    (std) =>
      std?.personalInfo?.firstName?.toLowerCase()?.includes(searchStudent) ||
      std?.personalInfo?.firstName?.includes(searchStudent) ||
      std?.personalInfo?.lastName?.toLowerCase()?.includes(searchStudent) ||
      std?.personalInfo?.lastName?.includes(searchStudent)
  );

  console.log(multiStudents);
  console.log(allStudents);
  console.log(allClassLevels);

  const studentDataFormat = graduatesColumn();

  const handleMultiSelect = (state) => {
    setMultiStudents(state.selectedRows);
  };

  const handleNewEmployment = () => {
    setRedirecting(true);
    setUncompletedEmploymentTask("You're being redirected");
    setTimeout(() => {
      navigate(
        `/sensec/users/${authAdmin?.uniqueId}/admin/${adminCurrentAction}/${adminCurrentLink}/new_enrollment/placement_verification`
      );
    }, 3000);
  };

  const allStd = `All Graduated Students / Total = ${allStudents?.length}`;
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
        className="allStudentsData"
        id="allStudents"
        padding={{ xs: " 1rem .5rem", sm: " 1rem" }}
      >
        <Box className="searchDetails">
          {filteredStudents?.length === 0 && searchStudent !== "" && (
            <p className="searchInfo">
              We couldn&apos;t find any matches for &quot;{searchStudent}&quot;
            </p>
          )}
          {filteredStudents?.length === 0 && searchStudent !== "" && (
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
              Total Enrolled Students Found = {filteredStudents?.length}
            </p>
          )}
          {!searchStudent && (
            <p className="searchInfo">Total Students = {allStudents?.length}</p>
          )}
        </Box>
        <Box>
          <Grid
            container
            spacing={3}
            className="addNewStudentBtnsWrap"
            width={"100%"}
            m={"0 auto"}
          >
            {actionBtns.map((action) => (
              <Grid
                component={"span"}
                item
                xs={2.9}
                sm={2}
                // md={2}
                // lg={2}
                key={action.label}
                // minWidth={{ xs: "8rem", sm: "10rem" }}
                // maxWidth={{ xs: "10rem", sm: "15rem" }}
                // minWidth={"15rem"}
                onClick={() => {
                  // setCurrentActionBtn(action.label);
                  if (action.label === "Add New Student +") {
                    setOpenModal(true);
                  } else {
                    navigate(
                      `/sensec/users/${
                        authAdmin?.uniqueId
                      }/admin/${adminCurrentAction}/${adminCurrentLink}/${action.label.replace(
                        / /g,
                        "_"
                      )}`
                    );
                  }
                }}
                className={
                  student_category?.replace(/_/g, " ") === action.label
                    ? "studentDashBtn isActive"
                    : action?.label === "Add New Student +"
                    ? "studentDashAddBtn"
                    : "studentDashBtn"
                }
                // className={changeBackgroundColor}
              >
                {/* {action.label !== "All" && action.label} */}
                {action.label === "Enrolled"
                  ? "All Enrolled Students"
                  : action.label}
              </Grid>
            ))}
            <ActionModal
              open={openModal}
              onClose={() => setOpenModal(false)}
              handleNewEmployment={handleNewEmployment}
              redirecting={redirecting}
              uncompletedEmploymentTask={uncompletedEmploymentTask}
              question={"Are you sure you would like to enroll a new student?"}
            />
          </Grid>
        </Box>
        <Box>
          <Grid
            container
            spacing={3}
            // className="addNewAdminBtnsWrap"
            width={"100%"}
            m={"0 auto"}
            className="classLevelStudents"
          >
            <>
              {allClassLevels.map((cLevel) => (
                <Grid
                  component={"span"}
                  item
                  xs={2.9}
                  sm={2}
                  key={cLevel._id}
                  onClick={() =>
                    navigate(
                      `/sensec/users/${
                        authAdmin?.uniqueId
                      }/admin/${adminCurrentAction}/${adminCurrentLink}/Enrolled/${cLevel.name.replace(
                        / /g,
                        "_"
                      )}`
                    )
                  }
                  className={
                    cLevel?.name === class_level?.replace(/_/g, " ")
                      ? "classLevelStudentsBtn isActive"
                      : "classLevelStudentsBtn"
                  }
                >
                  {cLevel.name}
                </Grid>
              ))}
              <Grid
                component={"span"}
                item
                xs={2.9}
                sm={2}
                onClick={() =>
                  navigate(
                    `/sensec/users/${authAdmin?.uniqueId}/admin/${adminCurrentAction}/${adminCurrentLink}/Graduates`
                  )
                }
                className={
                  student_category === "Graduates"
                    ? "classLevelStudentsBtn isActive"
                    : "classLevelStudentsBtn"
                }
              >
                Graduates
              </Grid>
            </>
          </Grid>
        </Box>
        <Box className="studentDataTable">
          <DataTable
            title={allStd}
            columns={studentDataFormat}
            data={filteredStudents}
            customStyles={customUserTableStyle}
            pagination
            // selectableRows
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            responsive
            onSelectedRowsChange={handleMultiSelect}
          />
        </Box>
      </Box>
    </>
  );
}
