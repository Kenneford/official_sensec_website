import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
// import { studentSearch } from "../../../features/student/studentsSlice";
import { getAuthUser } from "../../../../features/auth/authSlice";
import { FetchAllClassSections } from "../../../../data/class/FetchClassSections";
import { customUserTableStyle } from "../../../../usersInfoDataFormat/usersInfoTableStyle";
import { studentsColumn } from "../../../../usersInfoDataFormat/UsersInfoDataFormat";
import { FetchClassSectionStudents } from "../../../../data/students/FetchAllStudents";

export function CourseMates() {
  const userInfo = useSelector(getAuthUser);
  const allClassLevelSections = FetchAllClassSections();
  const {
    fetchingStudentStatus,
    searchStatus,
    searchStudentStatus,
    studentError,
    studentSuccessMessage,
  } = useSelector((state) => state.student);
  console.log(allClassLevelSections);
  const classSection = allClassLevelSections.find(
    (section) =>
      section._id === userInfo?.studentSchoolData?.currentClassLevelSection?._id
  );
  console.log(classSection);
  const [searchStudent, setSearchStudent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { studentCurrentAction, studentCurrentLink } = useParams();

  const courseMates = FetchClassSectionStudents(userInfo);
  const filteredMates = classSection?.students?.filter(
    (std) => std?.uniqueId !== userInfo?.uniqueId
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
        fontSize: "1.2rem",
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
        // marginTop: ".5rem",
        // marginBottom: ".5rem",
      },
    },
  };

  const studentColumn = studentsColumn();
  const handleStudentSearch = (e) => {
    e.preventDefault();
    if (searchStudent) {
      // dispatch(studentSearch(searchStudent));
      navigate(`/sensec/admin/search_student?student_name=${searchStudent}`);
    }
  };
  //Filter current logged in student from coursemates
  // useEffect(() => {
  //   setCourseMates(
  //     classSection?.students?.filter(
  //       (student) => student.uniqueId !== userInfo.uniqueId
  //     )
  //   );
  // }, [classSection?.students, userInfo.uniqueId]);

  return (
    <div className="studentTotal" id="allStudents">
      <div className="searchWrap">
        <div className="searchCont">
          <h1 className="dashAction" style={{ backgroundColor: "#383838" }}>
            {studentCurrentAction} / <span>{studentCurrentLink}</span>
          </h1>
          <form onSubmit={handleStudentSearch} className="studentSearch">
            <input
              type="text"
              value={searchStudent}
              onChange={(e) => setSearchStudent(e.target.value)}
              placeholder="Search for a student..."
              autoComplete="off"
              id="search"
            />
            <button type="submit">
              <SearchIcon className="searchIcon" />
            </button>
          </form>
        </div>
      </div>
      <div className="totalStudentsWrap">
        <div className="searchDetails">
          {courseMates?.length === 0 && searchStudent !== "" && (
            <p className="searchInfo">
              We couldn't find any matches for "{searchStudent}"
            </p>
          )}
          {courseMates?.length === 0 && searchStudent !== "" && (
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
              Total Students Found = {courseMates?.length}
            </p>
          )}
          {!searchStudent && (
            <p className="searchInfo">
              Total Students = {filteredMates?.length}
            </p>
          )}
        </div>
        <div className="totalStudentsCont">
          <DataTable
            columns={studentColumn}
            data={courseMates}
            customStyles={customUserTableStyle}
            pagination
            // selectableRows
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
            responsive
          />
        </div>
      </div>
    </div>
  );
}
