import axios from "axios";
import { Link } from "react-router-dom";
import { API_ENDPOINT } from "../apiEndPoint/api";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import EditIcon from "@mui/icons-material/Edit";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { ToastContainer, toast } from "react-toastify";
import { HashLink } from "react-router-hash-link";

export const programOptions = [
  { value: "658763d2b9ab5c8b037e872f", label: "Business" },
  { value: "658763e5b9ab5c8b037e8735", label: "Visaul Arts" },
  { value: "658763f7b9ab5c8b037e873b", label: "Agric Science" },
  { value: "64d751852d98841f7c9ee4d5", label: "General Arts 1" },
  { value: "64d752682d98841f7c9ee4dd", label: "General Arts 2" },
  { value: "64d752932d98841f7c9ee4e5", label: "General Arts 3" },
  { value: "64d753172d98841f7c9ee4ed", label: "General Arts 4" },
  { value: "64d751092d98841f7c9ee4cd", label: "General Science" },
  { value: "64d753832d98841f7c9ee4f5", label: "Home Economics 1" },
  { value: "64d753be2d98841f7c9ee4fd", label: "Home Economics 2" },
];
export const sectionsNameOptions = [
  { value: "Business", label: "Business" },
  { value: "Visaul Arts", label: "Visaul Arts" },
  { value: "Agric Science", label: "Agric Science" },
  { value: "General Arts 1", label: "General Arts 1" },
  { value: "General Arts 2", label: "General Arts 2" },
  { value: "General Arts 3", label: "General Arts 3" },
  { value: "General Arts 4", label: "General Arts 4" },
  { value: "General Science", label: "General Science" },
  { value: "Home Economics 1", label: "Home Economics 1" },
  { value: "Home Economics 2", label: "Home Economics 2" },
];
export const classSectionLabelOptions = [
  { value: "Level 100", label: "Level 100" },
  { value: "Level 200", label: "Level 200" },
  { value: "Level 300", label: "Level 300" },
];
export const academicBatchOptions = [
  { value: "65a1ed60a5941974989cb0ce", label: "2024-2027" },
  { value: "64bc5b2824b0183b8ede893f", label: "2025-2028" },
];
export const academicYearOptions = [
  { value: "6582a08c60343e69cf963302", label: "2023-2024" },
  { value: "65849c6e258028949d90ecfb", label: "2024-2025" },
  { value: "657a0c0235a6d0bdd5fc0ca0", label: "2026-2027" },
  // { value: "64c9341d6109338e6ca76bc2", label: "2026-2029" },
];
export const academicTermOptions = [
  { value: "64cfd54bc0970fa09be4e14f", label: "First Semester" },
  // { value: "64b2e4ce756a5a8432cf5df1", label: "Second Semester" },
  // { value: "64b2e4e1756a5a8432cf5df7", label: "Third Semester" },
];

export const classLevelOptions = [
  { value: "65882076fd47371364680523", label: "Level 100" },
  { value: "65882088fd47371364680529", label: "Level 200" },
  { value: "65882095fd4737136468052f", label: "Level 300" },
];
export const houseOptions = [
  { value: "658844b7f27676530e8b1ee0", label: "Kennedy House" },
  { value: "65883da06d6ff8196f65d178", label: "Saint Paul House" },
  { value: "65883db56d6ff8196f65d17c", label: "Mahama House" },
];
export const teachersOptions = [
  { value: "658740f52873500233ae44f5", label: "Mr. Stephen Mensah" },
  { value: "655291fc28a52cb317cbdc38", label: "Mrs. Joana Mensah" },
  // { value: "64e4a62a0550c6873cc567f8", label: "Mr. Matthias Menk" },
  // { value: "64f477e12cdcaff1ae0e5fad", label: "Mr. Patrick Kenneford Essuman" },
  // { value: "64d9cfbee6cafed115a764b9", label: "Mrs. Matilda Asare" },
  // { value: "64d9cfe6e6cafed115a764c4", label: "Mrs. Elena Bentum" },
  // { value: "64d9d010e6cafed115a764d1", label: "Mr. Patrick Kenneford Annan" },
  // { value: "64dbe883bdfd95a964f4720c", label: "Mr. Maxwell Mensah" },
];
export const timeOptions = [
  { value: "8:00 - 8:45", label: "1st Lesson" },
  { value: "8:45 - 9:30", label: "2ns Lesson" },
  { value: "9:30 - 10:45", label: "3rd Lesson" },
  { value: "9:45 - 10:15", label: "1st Break" },
  { value: "10:15 - 11:00", label: "4th Lesson" },
  { value: "11:00 - 11:45", label: "5th Lesson" },
  { value: "11:45 - 12:30", label: "6tn Lesson" },
  { value: "12:30 - 12:45", label: "2nd Break" },
  { value: "12:45 - 1:30", label: "7th Lesson" },
  { value: "1:30 - 2:15", label: "8th Lesson" },
];
export const daysOptions = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
];
export const breakLetterOptions = [
  { value: "B", label: "Monday" },
  { value: "R", label: "Tuesday" },
  { value: "E", label: "Wednesday" },
  { value: "A", label: "Thursday" },
  { value: "K", label: "Friday" },
];
export const otherTongueOptions = [
  { value: "English", label: "English" },
  { value: "Hausa", label: "Hausa" },
  { value: "French", label: "French" },
  { value: "Spanish", label: "Spanish" },
  { value: "Deutsch", label: "Deutsch" },
  { value: "Other", label: "Other" },
];
export const studentRoleOptions = [
  { value: "", label: "No Special Role" },
  { value: "Boys Prefect", label: "Boys Prefect" },
  { value: "Girls Prefect", label: "Girls Prefect" },
];
export const regionOptions = [
  { value: "Greater Accra", label: "Greater Accra" },
  { value: "Ashanti", label: "Ashanti" },
  { value: "Volta", label: "Volta" },
  { value: "Northern", label: "Northern" },
  { value: "Central", label: "Central" },
  { value: "Eastern", label: "Eastern" },
  { value: "Western", label: "Western" },
  { value: "Oti", label: "Oti" },
  { value: "Bono East", label: "Bono East" },
  { value: "Western North", label: "Western North" },
  { value: "Bono", label: "Bono" },
  { value: "Brong Ahafo", label: "Brong Ahafo" },
  { value: "Ahafo", label: "Ahafo" },
  { value: "Upper West", label: "Upper West" },
  { value: "Upper East", label: "Upper East" },
  { value: "North East", label: "North East" },
];
export const complexionOptions = [
  { value: "Very Fair/Ivory", label: "Very Fair/Ivory" },
  { value: "Fair", label: "Fair" },
  { value: "Medium/Normal", label: "Medium/Normal" },
  { value: "Olive", label: "Olive" },
  { value: "Brown", label: "Brown" },
  { value: "Black", label: "Black" },
];

export const roleOptions = [
  { value: "Admin", label: "Admin" },
  { value: "Teacher", label: "Teacher" },
  { value: "Non-Teaching Staff", label: "Non-Teaching Staff" },
];
export const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];
export const residentialStatusOptions = [
  { value: "Day", label: "Day" },
  { value: "Boarding", label: "Boarding" },
  { value: "Hostel", label: "Hostel" },
  { value: "Private", label: "Private" },
  { value: "Teachers Bangalow", label: "Teachers Bangalow" },
];

//THIS REMOVES THE HASHLINK TAG FROM THE URL
if (window.location.hash) {
  window.history.replaceState("", document.title, window.location.pathname);
}

const scrollWithOffset = (el) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = -150;
  window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
};

export const studentColumn = [
  // {
  //   name: (
  //     <>
  //       <p>All</p>{" "}
  //       <input
  //         type="checkbox"
  //         style={{ marginLeft: "1rem" }}
  //         onSelect={(e) => e.target.value}
  //       />
  //     </>
  //   ),
  //   selector: (row) => (
  //     <div>
  //       <input type="checkbox" />
  //     </div>
  //   ),
  // },
  {
    name: "Image",
    selector: (row) =>
      row?.personalInfo?.profilePicture ? (
        <HashLink
          scroll={scrollWithOffset}
          smooth
          to={`/sensec/admin/student_info/${row?.personalInfo?.firstName.replace(
            / /g,
            "_"
          )}_${row?.personalInfo?.lastName}/${
            row?.personalInfo?.uniqueId
          }/#studentInfo`}
          title="View Student Info"
        >
          <img
            className="studentImg"
            src={row?.personalInfo?.profilePicture?.url}
            alt=""
          />
        </HashLink>
      ) : (
        <HashLink
          scroll={scrollWithOffset}
          smooth
          className="noImgLink"
          to={`/sensec/admin/student_info/${row?.personalInfo?.firstName}_${row?.personalInfo?.lastName}/${row?.personalInfo?.uniqueId}/#studentInfo`}
          title="View Student Info"
        >
          {row?.personalInfo?.gender === "Male" && (
            <img className="studentImg" src={"/assets/maleAvatar.png"} alt="" />
          )}
          {row?.personalInfo?.gender === "Female" && (
            <img
              className="studentImg"
              src={"/assets/femaleAvatar.png"}
              alt=""
            />
          )}
          {row?.personalInfo?.gender === "" && (
            <div className="noImg">
              <p>No</p>
              <p>Image</p>
            </div>
          )}
        </HashLink>
      ),
  },
  {
    name: "First Name",
    selector: (row) => row?.personalInfo?.firstName,
    sortable: true,
  },
  { name: "Surname", selector: (row) => row?.personalInfo?.lastName },
  {
    name: "Date Of Birth",
    selector: (row) =>
      row?.personalInfo?.dateOfBirth
        ? row?.personalInfo?.dateOfBirth
        : "Unknown",
  },
  {
    name: "Program",
    selector: (row) =>
      row?.studentSchoolData?.program
        ? row?.studentSchoolData?.program.name
        : "Unknown",
  },
  {
    name: "Student-ID",
    selector: (row) => row?.uniqueId,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) =>
      row?.contactAddress?.email ? row?.contactAddress?.email : "Unknown",
  },
  { name: "Enrolled Date", selector: (row) => row?.dateEnrolled },
  {
    name: "Batch",
    selector: (row) =>
      row?.studentSchoolData?.batch?.yearRange
        ? row?.studentSchoolData?.batch?.yearRange
        : "Unknown",
  },
  {
    name: "Level",
    selector: (row) =>
      row.studentSchoolData.currentClassLevel && (
        <div className="tableClassLevel">
          {row.studentSchoolData.currentClassLevel.name === "Level 100" && (
            <div className="firstYearTag" title="1st Year">
              1
            </div>
          )}
          {row.studentSchoolData.currentClassLevel.name === "Level 200" && (
            <div className="secondYearTag" title="2nd Year">
              2
            </div>
          )}
          {row.studentSchoolData?.currentClassLevel?.name === "Level 300" &&
            !row.isGraduated && (
              <div className="thirdYearTag" title="3rd Year">
                3
              </div>
            )}
          {row.isGraduated && (
            <div className="isGraduated" title="Graduated">
              <SchoolOutlinedIcon />
            </div>
          )}
        </div>
      ),
  },
  {
    name: "Promote",
    selector: (row) =>
      row?.studentStudentSchoolData?.currentClassLevel && (
        <>
          {row?.studentStudentSchoolData?.currentClassLevel?.name ===
            "Level 100" && (
            <Link
              className="editLink"
              onClick={async () => {
                try {
                  const res = await axios.put(
                    `${API_ENDPOINT}/admin/promote_student_200/${row._id}`
                  );
                  if (res) {
                    toast.success("Student promoted successfully...", {
                      position: "top-right",
                      theme: "dark",
                      // toastId: successId,
                    });
                    setTimeout(() => {
                      window.location.reload();
                    }, 5000);
                  }
                } catch (error) {
                  toast.error(
                    "Student promotion failed! Class level or section not found!",
                    {
                      position: "top-right",
                      theme: "light",
                      // toastId: successId,
                    }
                  );
                }
              }}
              // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
            >
              P-L200
            </Link>
          )}
          {row?.studentStudentSchoolData?.currentClassLevel?.name ===
            "Level 200" && (
            <Link
              className="editLink"
              onClick={async () => {
                try {
                  const res = await axios.put(
                    `${API_ENDPOINT}/admin/promote_student_300/${row._id}`
                  );
                  if (res) {
                    toast.success("Student promoted successfully...", {
                      position: "top-right",
                      theme: "dark",
                      // toastId: successId,
                    });
                    setTimeout(() => {
                      window.location.reload();
                    }, 5000);
                  }
                } catch (error) {
                  toast.error(
                    "Student promotion failed! Class level or section not found!",
                    {
                      position: "top-right",
                      theme: "light",
                      // toastId: successId,
                    }
                  );
                }
              }}
              // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
            >
              P-L300
            </Link>
          )}
          {row?.studentStudentSchoolData?.currentClassLevel?.name ===
            "Level 300" &&
            !row.isGraduated && (
              <Link
                className="editLink"
                onClick={async () => {
                  try {
                    const res = await axios.put(
                      `${API_ENDPOINT}/admin/isgraduated/${row._id}`
                    );
                    if (res) {
                      toast.success("Student graduated successfully...", {
                        position: "top-right",
                        theme: "dark",
                        // toastId: successId,
                      });
                      setTimeout(() => {
                        window.location.reload();
                      }, 5000);
                    }
                  } catch (error) {
                    toast.error("Student graduation failed! Try again later.", {
                      position: "top-right",
                      theme: "light",
                      // toastId: successId,
                    });
                  }
                }}
              >
                Graduate
              </Link>
            )}
          {row.isGraduated && (
            <Link
              className="editLink"
              // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
            >
              Graduated
            </Link>
          )}
        </>
      ),
  },
  {
    name: "Edit",
    selector: (row) => (
      <Link
        className="editLink"
        to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row.uniqueId}`}
      >
        <EditIcon />
      </Link>
    ),
  },
];

export const classLevelStudentsColumn = [
  // {
  //   name: (
  //     <>
  //       <p>All</p>{" "}
  //       <input
  //         type="checkbox"
  //         style={{ marginLeft: "1rem" }}
  //         onSelect={(e) => e.target.value}
  //       />
  //     </>
  //   ),
  //   selector: (row) => (
  //     <div>
  //       <input type="checkbox" />
  //     </div>
  //   ),
  // },
  {
    name: "Image",
    selector: (row) =>
      row?.personalInfo?.profilePicture ? (
        <HashLink
          scroll={scrollWithOffset}
          smooth
          to={`/sensec/admin/student_info/${row?.personalInfo?.firstName.replace(
            / /g,
            "_"
          )}_${row?.personalInfo?.lastName}/${
            row?.personalInfo?.uniqueId
          }/#studentInfo`}
          title="View Student Info"
        >
          <img
            className="studentImg"
            src={row?.personalInfo?.profilePicture}
            alt=""
          />
        </HashLink>
      ) : (
        <HashLink
          scroll={scrollWithOffset}
          smooth
          className="noImgLink"
          to={`/sensec/admin/student_info/${row?.personalInfo?.firstName}_${row?.personalInfo?.lastName}/${row?.personalInfo?.uniqueId}/#studentInfo`}
          title="View Student Info"
        >
          {row?.personalInfo?.gender === "Male" && (
            <img className="studentImg" src={"/assets/maleAvatar.png"} alt="" />
          )}
          {row?.personalInfo?.gender === "Female" && (
            <img
              className="studentImg"
              src={"/assets/femaleAvatar.png"}
              alt=""
            />
          )}
          {row?.personalInfo?.gender === "" && (
            <div className="noImg">
              <p>No</p>
              <p>Image</p>
            </div>
          )}
        </HashLink>
      ),
  },
  {
    name: "First Name",
    selector: (row) => row?.personalInfo?.firstName,
    sortable: true,
  },
  { name: "Surname", selector: (row) => row?.personalInfo?.lastName },
  {
    name: "Date Of Birth",
    selector: (row) =>
      row?.personalInfo?.dateOfBirth
        ? row?.personalInfo?.dateOfBirth
        : "Unknown",
  },
  {
    name: "Program",
    selector: (row) =>
      row?.studentStudentSchoolData?.program
        ? row?.studentStudentSchoolData?.program.name
        : "Unknown",
  },
  {
    name: "Student-ID",
    selector: (row) => row?.uniqueId,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) =>
      row?.contactAddress?.email ? row?.contactAddress?.email : "Unknown",
  },
  { name: "Enrolled Date", selector: (row) => row?.dateEnrolled },
  {
    name: "Batch",
    selector: (row) =>
      row?.studentStudentSchoolData?.batch?.yearRange
        ? row?.studentStudentSchoolData?.batch?.yearRange
        : "Unknown",
  },
  {
    name: "Level",
    selector: (row) =>
      row.studentStudentSchoolData.currentClassLevel && (
        <div className="tableClassLevel">
          {row.studentStudentSchoolData.currentClassLevel.name ===
            "Level 100" && (
            <div className="firstYearTag" title="1st Year">
              1
            </div>
          )}
          {row.studentStudentSchoolData.currentClassLevel.name ===
            "Level 200" && (
            <div className="secondYearTag" title="2nd Year">
              2
            </div>
          )}
          {row.studentStudentSchoolData.currentClassLevel.name ===
            "Level 300" &&
            !row.isGraduated && (
              <div className="thirdYearTag" title="3rd Year">
                3
              </div>
            )}
          {row.isGraduated && (
            <div className="isGraduated" title="Graduated">
              <SchoolOutlinedIcon />
            </div>
          )}
        </div>
      ),
  },
  {
    name: "Promote",
    selector: (row) =>
      row?.studentStudentSchoolData?.currentClassLevel && (
        <>
          {row?.studentStudentSchoolData?.currentClassLevel?.name ===
            "Level 100" && (
            <Link
              className="editLink"
              onClick={async () => {
                try {
                  const res = await axios.put(
                    `${API_ENDPOINT}/students/promote_student_200/${row._id}`
                  );
                  if (res) {
                    toast.success("Student promoted successfully...", {
                      position: "top-right",
                      theme: "dark",
                      // toastId: successId,
                    });
                    setTimeout(() => {
                      window.location.reload();
                    }, 5000);
                  }
                } catch (error) {
                  toast.error(
                    "Student promotion failed! Class level or section not found!",
                    {
                      position: "top-right",
                      theme: "light",
                      // toastId: successId,
                    }
                  );
                }
              }}
              // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
            >
              P-L200
            </Link>
          )}
          {row?.studentStudentSchoolData?.currentClassLevel?.name ===
            "Level 200" && (
            <Link
              className="editLink"
              onClick={async () => {
                try {
                  const res = await axios.put(
                    `${API_ENDPOINT}/students/promote_student_300/${row._id}`
                  );
                  if (res) {
                    toast.success("Student promoted successfully...", {
                      position: "top-right",
                      theme: "dark",
                      // toastId: successId,
                    });
                    setTimeout(() => {
                      window.location.reload();
                    }, 5000);
                  }
                } catch (error) {
                  toast.error(
                    "Student promotion failed! Class level or section not found!",
                    {
                      position: "top-right",
                      theme: "light",
                      // toastId: successId,
                    }
                  );
                }
              }}
              // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
            >
              P-L300
            </Link>
          )}
          {row?.studentStudentSchoolData?.currentClassLevel?.name ===
            "Level 300" &&
            !row.isGraduated && (
              <Link
                className="editLink"
                onClick={async () => {
                  try {
                    const res = await axios.put(
                      `${API_ENDPOINT}/students/isgraduated/${row._id}`
                    );
                    if (res) {
                      toast.success("Student graduated successfully...", {
                        position: "top-right",
                        theme: "dark",
                        // toastId: successId,
                      });
                      setTimeout(() => {
                        window.location.reload();
                      }, 5000);
                    }
                  } catch (error) {
                    toast.error("Student graduation failed! Try again later.", {
                      position: "top-right",
                      theme: "light",
                      // toastId: successId,
                    });
                  }
                }}
              >
                Graduate
              </Link>
            )}
          {row.isGraduated && (
            <Link
              className="editLink"
              // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
            >
              Graduated
            </Link>
          )}
        </>
      ),
  },
  {
    name: "Edit",
    selector: (row) => (
      <Link
        className="editLink"
        to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row.uniqueId}`}
      >
        <EditIcon />
      </Link>
    ),
  },
];

export const pendingStudentsColumn = [
  // {
  //   name: (
  //     <>
  //       <p>All</p>{" "}
  //       <input
  //         type="checkbox"
  //         style={{ marginLeft: "1rem" }}
  //         onSelect={(e) => e.target.value}
  //       />
  //     </>
  //   ),
  //   selector: (row) => (
  //     <div>
  //       <input type="checkbox" />
  //     </div>
  //   ),
  // },
  {
    name: "Image",
    selector: (row) =>
      row.profilePicture ? (
        <HashLink
          scroll={scrollWithOffset}
          smooth
          to={`/sensec/admin/student_info/${row.firstName}_${row.lastName}/${row.uniqueId}/#studentInfo`}
          title="View Student Info"
        >
          <img className="studentImg" src={row.profilePicture} alt="" />
        </HashLink>
      ) : (
        <HashLink
          scroll={scrollWithOffset}
          smooth
          to={`/sensec/admin/student_info/${row.firstName}_${row.lastName}/${row.uniqueId}/#studentInfo`}
          title="View Student Info"
        >
          {row.gender === "Male" && (
            <img className="studentImg" src={"/assets/maleAvatar.png"} alt="" />
          )}
          {row.gender === "Female" && (
            <img
              className="studentImg"
              src={"/assets/femaleAvatar.png"}
              alt=""
            />
          )}
          {row.gender === "" && "No Image"}
        </HashLink>
      ),
  },
  {
    name: "First Name",
    selector: (row) => row.firstName,
    sortable: true,
  },
  { name: "Surname", selector: (row) => row.lastName },
  {
    name: "Date Of Birth",
    selector: (row) =>
      row.studentStudentSchoolData.dateOfBirth
        ? row.studentStudentSchoolData.dateOfBirth
        : "Unknown",
  },
  {
    name: "Program",
    selector: (row) =>
      row.studentStudentSchoolData.program
        ? row.studentStudentSchoolData.program.name
        : "Unknown",
  },
  { name: "Student-ID", selector: (row) => row.uniqueId, sortable: true },
  { name: "Email", selector: (row) => (row.email ? row.email : "Unknown") },
  { name: "Enrolled Date", selector: (row) => row.dateEnrolled },
  {
    name: "Batch",
    selector: (row) =>
      row.academicYear
        ? `${row.studentStudentSchoolData.academicYear.fromYear}-${row.studentStudentSchoolData.academicYear.toYear}`
        : "Unknown",
  },
  {
    name: "Level",
    selector: (row) =>
      row.currentClassLevel && (
        <div className="tableClassLevel">
          {row.studentStudentSchoolData.currentClassLevel?.name ===
            "Level 100" && (
            <div className="firstYearTag" title="1st Year">
              1
            </div>
          )}
          {row.studentStudentSchoolData.currentClassLevel?.name ===
            "Level 200" && (
            <div className="secondYearTag" title="2nd Year">
              2
            </div>
          )}
          {row.studentStudentSchoolData.currentClassLevel?.name ===
            "Level 300" &&
            !row.isGraduated && (
              <div className="thirdYearTag" title="3rd Year">
                3
              </div>
            )}
          {row.isGraduated && (
            <div className="isGraduated" title="Graduated">
              <SchoolOutlinedIcon />
            </div>
          )}
        </div>
      ),
  },
  {
    // name: "Promote",
    selector: (row) =>
      row.pending && (
        <HashLink
          className="approveLink"
          onClick={async () => {
            try {
              const res = await axios.put(
                `${API_ENDPOINT}/students/approve_pending_student/${row._id}`
              );
              if (res) {
                toast.success(
                  "Student's application approved successfully...",
                  {
                    position: "top-right",
                    theme: "dark",
                    // toastId: successId,
                  }
                );
                setTimeout(() => {
                  window.location.reload();
                }, 5000);
              }
            } catch (error) {
              toast.error("Student approval failed! Try again later", {
                position: "top-right",
                theme: "light",
                // toastId: successId,
              });
            }
          }}
          // to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row._id}`}
        >
          Approve
        </HashLink>
      ),
  },
  {
    // name: "Edit",
    selector: (row) => (
      <HashLink
        className="rejectLink"
        onClick={async () => {
          try {
            const res = await axios.delete(
              `${API_ENDPOINT}/students/reject_student_application/${row._id}`
            );
            if (res) {
              toast.success("Student disapproved successfully...", {
                position: "top-right",
                theme: "dark",
                // toastId: successId,
              });
              setTimeout(() => {
                window.location.reload();
              }, 5000);
            }
          } catch (error) {
            toast.error("Student disapproved failed! Try again later", {
              position: "top-right",
              theme: "light",
              // toastId: successId,
            });
          }
        }}
      >
        Reject
      </HashLink>
    ),
  },
];

export const graduatesColumn = [
  {
    name: "Image",
    selector: (row) =>
      row?.personalInfo?.profilePicture ? (
        <HashLink
          scroll={scrollWithOffset}
          smooth
          to={`/sensec/admin/student_info/${row?.personalInfo?.firstName.replace(
            / /g,
            "_"
          )}_${row?.personalInfo?.lastName}/${row?.uniqueId}#studentInfo`}
          title="View Student Info"
        >
          <img
            className="studentImg"
            src={row?.personalInfo?.profilePicture}
            alt=""
          />
        </HashLink>
      ) : (
        <HashLink
          scroll={scrollWithOffset}
          smooth
          className="noImgLink"
          to={`/sensec/admin/student_info/${row?.personalInfo?.firstName}_${row?.personalInfo?.lastName}/${row?.personalInfo?.uniqueId}/#studentInfo`}
          title="View Student Info"
        >
          {row?.personalInfo?.gender === "Male" && (
            <img className="studentImg" src={"/assets/maleAvatar.png"} alt="" />
          )}
          {row?.personalInfo?.gender === "Female" && (
            <img
              className="studentImg"
              src={"/assets/femaleAvatar.png"}
              alt=""
            />
          )}
          {row?.personalInfo?.gender === "" && (
            <div className="noImg">
              <p>No</p>
              <p>Image</p>
            </div>
          )}
        </HashLink>
      ),
  },
  {
    name: "First Name",
    selector: (row) => row?.personalInfo?.firstName,
    sortable: true,
  },
  { name: "Surname", selector: (row) => row?.personalInfo?.lastName },
  {
    name: "Date Of Birth",
    selector: (row) =>
      row?.personalInfo?.dateOfBirth
        ? row?.personalInfo?.dateOfBirth
        : "Unknown",
  },
  {
    name: "Program",
    selector: (row) =>
      row?.studentSchoolData?.program
        ? row?.studentSchoolData?.program.name
        : "Unknown",
  },
  {
    name: "Student-ID",
    selector: (row) => row?.uniqueId,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) =>
      row?.contactAddress?.email ? row?.contactAddress?.email : "Unknown",
  },
  { name: "Enrolled Date", selector: (row) => row?.dateEnrolled },
  {
    name: "Batch",
    selector: (row) =>
      row?.studentSchoolData?.batch?.yearRange
        ? row?.studentSchoolData?.batch?.yearRange
        : "Unknown",
  },
  {
    name: "Graduate",
    selector: (row) =>
      row.status?.isGraduated && (
        <div className="isGraduated" title="Graduated">
          <SchoolOutlinedIcon />
        </div>
      ),
  },
];

export const studentProgramColumn = [
  {
    name: "Image",
    selector: (row) =>
      row.profilePicture ? (
        <HashLink
          scroll={scrollWithOffset}
          smooth
          to={`/sensec/admin/student_info/${row.firstName}_${row.lastName}/${row.uniqueId}/#studentInfo`}
          title="View Student Info"
        >
          <img className="studentImg" src={row.profilePicture} alt="" />
        </HashLink>
      ) : (
        <HashLink
          scroll={scrollWithOffset}
          smooth
          to={`/sensec/admin/student_info/${row.firstName}_${row.lastName}/${row.uniqueId}/#studentInfo`}
          title="View Student Info"
        >
          {row.gender === "Male" && (
            <img className="studentImg" src={"/assets/maleAvatar.png"} alt="" />
          )}
          {row.gender === "Female" && (
            <img
              className="studentImg"
              src={"/assets/femaleAvatar.png"}
              alt=""
            />
          )}
          {row.gender === "" && "No Image"}
        </HashLink>
      ),
  },
  {
    name: "First Name",
    selector: (row) => row.firstName,
    sortable: true,
  },
  { name: "Surname", selector: (row) => row.lastName },
  {
    name: "Date Of Birth",
    selector: (row) => (row.dateOfBirth ? row.dateOfBirth : "Unknown"),
  },
  { name: "Student-ID", selector: (row) => row.uniqueId, sortable: true },
  { name: "Email", selector: (row) => (row.email ? row.email : "Unknown") },
  { name: "Enrolled Date", selector: (row) => row.dateEnrolled },
  {
    name: "Batch",
    selector: (row) =>
      row.academicYear
        ? `${row.academicYear.fromYear}-${row.academicYear.toYear}`
        : "Unknown",
  },
  {
    name: "Level",
    selector: (row) =>
      row.currentClassLevel ? (
        <div className="tableClassLevel">
          {row.currentClassLevel.name === "Level_100" && (
            <div className="firstYearTag" title="1st Year">
              1
            </div>
          )}
          {row.currentClassLevel.name === "Level_200" && (
            <div className="secondYearTag" title="2nd Year">
              2
            </div>
          )}
          {row.currentClassLevel.name === "Level_300" && (
            <div className="thirdYearTag" title="3rd Year">
              3
            </div>
          )}
        </div>
      ) : (
        "Unknown"
      ),
  },
  {
    name: "Attendance",
    selector: (row) => (
      <HashLink
        className="editLink"
        to={`/sensec/admin/${row.uniqueId}/attendance`}
      >
        <CoPresentIcon titleAccess="View Attendance" />
      </HashLink>
    ),
  },
  {
    name: "Edit",
    selector: (row) => (
      <HashLink
        className="editLink"
        to={`/sensec/admin/edit_student/${row.firstName}_${row.lastName}/${row.uniqueId}`}
      >
        <EditIcon />
      </HashLink>
    ),
  },
];

export const studentCourseMatesColumn = [
  {
    name: "Image",
    selector: (row) =>
      row.profilePicture ? (
        <HashLink
          scroll={scrollWithOffset}
          smooth
          to={`/sensec/student_info/${row.firstName}_${row.lastName}/${row.uniqueId}/#studentInfo`}
          title="View Student Info"
        >
          <img className="studentImg" src={row.profilePicture} alt="" />
        </HashLink>
      ) : (
        <HashLink
          scroll={scrollWithOffset}
          smooth
          to={`/sensec/admin/student_info/${row.firstName}_${row.lastName}/${row.uniqueId}/#studentInfo`}
          title="View Student Info"
        >
          {row.gender === "Male" && (
            <img className="studentImg" src={"/assets/maleAvatar.png"} alt="" />
          )}
          {row.gender === "Female" && (
            <img
              className="studentImg"
              src={"/assets/femaleAvatar.png"}
              alt=""
            />
          )}
          {row.gender === "" && "No Image"}
        </HashLink>
      ),
  },
  {
    name: "First Name",
    selector: (row) => row.firstName,
    sortable: true,
  },
  { name: "Surname", selector: (row) => row.lastName },
  {
    name: "Date Of Birth",
    selector: (row) => (row.dateOfBirth ? row.dateOfBirth : "Unknown"),
  },
  // { name: "Student-ID", selector: (row) => row.uniqueId, sortable: true },
  { name: "Email", selector: (row) => (row.email ? row.email : "Unknown") },
  { name: "Enrolled Date", selector: (row) => row.dateEnrolled },
  // {
  //   name: "Batch",
  //   selector: (row) =>
  //     row.academicYear
  //       ? `${row.academicYear.fromYear}-${row.academicYear.toYear}`
  //       : "Unknown",
  // },
  // {
  //   name: "Level",
  //   selector: (row) =>
  //     row.currentClassLevel ? (
  //       <div className="tableClassLevel">
  //         {row.currentClassLevel.name === "Level_100" && (
  //           <div className="firstYearTag" title="1st Year">
  //             1
  //           </div>
  //         )}
  //         {row.currentClassLevel.name === "Level_200" && (
  //           <div className="secondYearTag" title="2nd Year">
  //             2
  //           </div>
  //         )}
  //         {row.currentClassLevel.name === "Level_300" && (
  //           <div className="thirdYearTag" title="3rd Year">
  //             3
  //           </div>
  //         )}
  //       </div>
  //     ) : (
  //       "Unknown"
  //     ),
  // },
];

export const staffColumn = [
  {
    name: "Image",
    selector: (row) =>
      row.profilePicture ? (
        <HashLink
          scroll={scrollWithOffset}
          smooth
          to={`/sensec/admin/staff_info/${row.staffId}`}
          title="View Staff Info"
        >
          <img className="staffImg" src={row.profilePicture} alt="" />
        </HashLink>
      ) : (
        <HashLink scroll={scrollWithOffset} smooth>
          {row.gender === "Male" && (
            <img className="studentImg" src={"/assets/maleAvatar.png"} alt="" />
          )}
          {row.gender === "Female" && (
            <img
              className="studentImg"
              src={"/assets/femaleAvatar.png"}
              alt=""
            />
          )}
          {row.gender === "" && "No Image"}
        </HashLink>
      ),
  },
  {
    name: "First Name",
    selector: (row) => row.firstName,
    sortable: true,
  },
  { name: "Surname", selector: (row) => row.lastName },
  {
    name: "Date Of Birth",
    selector: (row) => (row.dateOfBirth ? row.dateOfBirth : "Unknown"),
  },
  {
    name: "Staff Role",
    selector: (row) => (row.role ? row.role : "Unknown"),
  },
  { name: "Staff-ID", selector: (row) => row.staffId, sortable: true },
  { name: "Email", selector: (row) => (row.email ? row.email : "Unknown") },
  { name: "Date Employed", selector: (row) => row.dateEmployed },
  {
    name: "Edit",
    selector: (row) => (
      <HashLink
        className="editLink"
        to={`/sensec/admin/edit_staff/${row.staffId}`}
      >
        <EditIcon />
      </HashLink>
    ),
  },
];

export const teachersColumn = [
  {
    name: "Image",
    selector: (row) =>
      row.profilePicture ? (
        <HashLink
          scroll={scrollWithOffset}
          smooth
          to={`/sensec/admin/teacher_info/${row.teacherId}/#teacher`}
          title="View Teacher Info"
        >
          <img className="staffImg" src={row.profilePicture} alt="" />
        </HashLink>
      ) : (
        <HashLink
          scroll={scrollWithOffset}
          smooth
          to={`/sensec/admin/teacher_info/${row.teacherId}/#teacher`}
          title="View Teacher Info"
        >
          {row.gender === "Male" && (
            <img className="studentImg" src={"/assets/maleAvatar.png"} alt="" />
          )}
          {row.gender === "Female" && (
            <img
              className="studentImg"
              src={"/assets/femaleAvatar.png"}
              alt=""
            />
          )}
          {row.gender === "" && "No Image"}
        </HashLink>
      ),
  },
  {
    name: "First Name",
    selector: (row) => row.firstName,
    sortable: true,
  },
  { name: "Surname", selector: (row) => row.lastName },
  {
    name: "Date Of Birth",
    selector: (row) => (row.dateOfBirth ? row.dateOfBirth : "Unknown"),
  },
  {
    name: "Teacher Role",
    selector: (row) => (row.role ? row.role : "Unknown"),
  },
  {
    name: "Program",
    selector: (row) => (row.program ? row.program.name : "Unknown"),
  },
  {
    name: "Subject(s) Teaching",
    selector: (row) =>
      row.teachingSubjects ? row.teachingSubjects.length : "Unknown",
  },
  { name: "Teacher-ID", selector: (row) => row.teacherId, sortable: true },
  { name: "Email", selector: (row) => (row.email ? row.email : "Unknown") },
  { name: "Date Employed", selector: (row) => row.dateEmployed },
  {
    name: "Edit",
    selector: (row) => (
      <HashLink
        className="editLink"
        to={`/sensec/admin/edit_teacher/${row.staffId}`}
      >
        <EditIcon />
      </HashLink>
    ),
    // cell: (props) => (
    //   <Link
    //     to={`/sensec/admin/edit_student/${row.id}`}
    //     onClick={() => {
    //       clickHandler(props);
    //     }}
    //   >
    //     Edit
    //   </Link>
    // ),
  },
];
export const teachersSubjectColumn = [
  {
    name: "Image",
    selector: (row) =>
      row.profilePicture ? (
        <HashLink
          scroll={scrollWithOffset}
          smooth
          to={`/sensec/admin/teacher_info/${row.teacherId}/#teacher`}
          title="View Teacher Info"
        >
          <img className="staffImg" src={row.profilePicture} alt="" />
        </HashLink>
      ) : (
        <HashLink
          scroll={scrollWithOffset}
          smooth
          to={`/sensec/admin/teacher_info/${row.teacherId}/#teacher`}
          title="View Teacher Info"
        >
          {row.gender === "Male" && (
            <img className="studentImg" src={"/assets/maleAvatar.png"} alt="" />
          )}
          {row.gender === "Female" && (
            <img
              className="studentImg"
              src={"/assets/femaleAvatar.png"}
              alt=""
            />
          )}
          {row.gender === "" && "No Image"}
        </HashLink>
      ),
  },
  {
    name: "First Name",
    selector: (row) => row.firstName,
    sortable: true,
  },
  { name: "Surname", selector: (row) => row.lastName },
  {
    name: "Date Of Birth",
    selector: (row) => (row.dateOfBirth ? row.dateOfBirth : "Unknown"),
  },
  {
    name: "Teacher Role",
    selector: (row) => (row.role ? row.role : "Unknown"),
  },
  {
    name: "Program",
    selector: (row) => (row.program ? row.program.name : "Unknown"),
  },
  {
    name: "Subject Teaching",
    selector: (row) =>
      row.teachingSubject ? row.teachingSubject.name : "Unknown",
  },
  { name: "Teacher-ID", selector: (row) => row.teacherId, sortable: true },
  { name: "Email", selector: (row) => (row.email ? row.email : "Unknown") },
  { name: "Date Employed", selector: (row) => row.dateEmployed },
  {
    name: "Edit",
    selector: (row) => (
      <HashLink
        className="editLink"
        to={`/sensec/admin/edit_teacher/${row.staffId}`}
      >
        <EditIcon />
      </HashLink>
    ),
  },
];

export const adminsColumn = [
  {
    name: "Image",
    selector: (row) =>
      row?.profilePicture ? (
        <HashLink
          scroll={scrollWithOffset}
          smooth
          to={`/sensec/admin/admin_info/${row?.teacherId}/#adminInfo`}
          title="View Teacher Info"
        >
          <img className="staffImg" src={row?.profilePicture} alt="" />
        </HashLink>
      ) : (
        <HashLink
          scroll={scrollWithOffset}
          smooth
          to={`/sensec/admin/admin_info/${row?.teacherId}/#adminInfo`}
          title="View Teacher Info"
        >
          {row?.gender === "Male" && (
            <img className="studentImg" src={"/assets/maleAvatar.png"} alt="" />
          )}
          {row?.gender === "Female" && (
            <img
              className="studentImg"
              src={"/assets/femaleAvatar.png"}
              alt=""
            />
          )}
          {row?.gender === "" && "No Image"}
        </HashLink>
      ),
  },
  {
    name: "First Name",
    selector: (row) => row?.firstName,
    sortable: true,
  },
  { name: "Surname", selector: (row) => row?.lastName },
  {
    name: "Date Of Birth",
    selector: (row) => (row?.dateOfBirth ? row?.dateOfBirth : "Unknown"),
  },
  {
    name: "Admin Role",
    selector: (row) => (row?.role ? row?.role : "Unknown"),
  },
  { name: "Admin-ID", selector: (row) => row?.adminId, sortable: true },
  { name: "Email", selector: (row) => (row?.email ? row?.email : "Unknown") },
  { name: "Date Employed", selector: (row) => row?.dateEmployed },
  {
    name: "Edit",
    selector: (row) => (
      <HashLink
        className="editLink"
        to={`/sensec/admin/edit_teacher/${row?.staffId}`}
      >
        <EditIcon />
      </HashLink>
    ),
  },
];
