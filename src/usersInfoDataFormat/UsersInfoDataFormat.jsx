import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import EditIcon from "@mui/icons-material/Edit";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import DirectionsIcon from "@mui/icons-material/Directions";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
// import { approveAdminEmployment } from "../../features/admin/adminsSlice";
import axios from "axios";
// import { API_ENDPOINT } from "../../apiEndPoint/api";
// import {
//   approvedStudentEnrollment,
//   graduateStudent,
//   promotingToLevel200,
//   promotingToLevel300,
//   rejectStudentEnrollment,
// } from "../../features/student/promotionSlice";
// import { approveTeacherEmploymentment } from "../../features/teacher/teachersSlice";
// import {
//   approveNTStaffEmploymentment,
//   rejectNTStaffEmploymentment,
// } from "../../features/staff/nTStaffSlice";
// import ApproveEmploymentModal from "../approvalModal/ApproveEmploymentModal";
// import ApproveEnrollmentModal from "../approvalModal/ApproveEnrollmentModal";
// import RejectionModal from "../approvalModal/RejectionModal";
import { dateFormatter } from "../dateFormatter/DateFormatter";
import { Box } from "@mui/material";
import { approvedStudentEnrollment } from "../features/students/studentsSlice";
import ApproveEnrollmentModal from "../components/approvalModal/ApproveEnrollmentModal";
import RejectEnrollmentModal from "../components/approvalModal/RejectionModal";

// const adminsColumn = (
//   setCurrentStudentId,
//   currentStudentId,
//   loadingComplete,
//   redirecting
// ) => {
//   const hangingAdminsColumn = [
//     {
//       name: "Image",
//       selector: (row) =>
//         row?.personalInfo?.profilePicture ? (
//           <HashLink
//             to={`/sensec/admin/Users/Admins/${row?.personalInfo?.firstName.replace(
//               / /g,
//               "_"
//             )}_${row?.personalInfo?.lastName}/${
//               row?.uniqueId
//             }/admin_info#studentInfo`}
//             title="View Admin Info"
//           >
//             <img
//               className="studentImg"
//               src={
//                 row?.personalInfo
//                   ? row?.personalInfo?.profilePicture?.url
//                   : row?.personalInfo?.profilePicture
//               }
//               alt=""
//             />
//           </HashLink>
//         ) : (
//           <HashLink
//             className="noImgLink"
//             to={`/sensec/admin/Users/Admins/${row?.personalInfo?.firstName}_${row?.personalInfo?.lastName}/${row?.personalInfo?.uniqueId}/admin_info#studentInfo`}
//             title="View Admin Info"
//           >
//             {row?.personalInfo?.gender === "Male" && (
//               <img
//                 className="studentImg"
//                 src={"/assets/maleAvatar.png"}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.gender === "Female" && (
//               <img
//                 className="studentImg"
//                 src={"/assets/femaleAvatar.png"}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.gender === "" && (
//               <div className="noImg">
//                 <p>No</p>
//                 <p>Image</p>
//               </div>
//             )}
//           </HashLink>
//         ),
//     },
//     {
//       name: "First Name",
//       selector: (row) => row?.personalInfo?.firstName,
//       sortable: true,
//     },
//     { name: "Surname", selector: (row) => row?.personalInfo?.lastName },
//     {
//       name: "Date Of Birth",
//       selector: (row) => (
//         <p
//           title={dateFormatter.format(
//             new Date(
//               row?.personalInfo?.dateOfBirth
//                 ? row?.personalInfo?.dateOfBirth
//                 : "---"
//             )
//           )}
//         >
//           {dateFormatter.format(
//             new Date(
//               row?.personalInfo?.dateOfBirth
//                 ? row?.personalInfo?.dateOfBirth
//                 : "---"
//             )
//           )}
//         </p>
//       ),
//     },
//     {
//       name: "Unique-ID",
//       selector: (row) => <p title={row?.uniqueId}>{row?.uniqueId}</p>,
//       sortable: true,
//     },
//     {
//       name: "Email",
//       selector: (row) => (
//         <p title={row?.contactAddress?.email}>
//           {row?.contactAddress?.email ? row?.contactAddress?.email : "---"}
//         </p>
//       ),
//     },
//     {
//       name: "Date Employed",
//       selector: (row) =>
//         !row?.employment?.employmentApprovedDate
//           ? "---"
//           : dateFormatter?.format(
//               new Date(row?.employment?.employmentApprovedDate)
//             ),
//     },
//     {
//       name: "Update",
//       selector: (row) => (
//         <>
//           {row?.employment?.employmentStatus === "approved" && (
//             <Link
//               className="editLink"
//               to={`/sensec/admin/Users/Admins/${row.personalInfo?.firstName}_${row.personalInfo?.lastName}/${row.uniqueId}/update`}
//             >
//               <EditIcon />
//             </Link>
//           )}
//           {row?.employment?.employmentStatus === "in progress" && (
//             <Link
//               className="editLink"
//               onClick={async () => {
//                 setCurrentStudentId(row);
//               }}
//             >
//               {currentStudentId && currentStudentId?._id === row?._id && (
//                 <>
//                   {loadingComplete === false && "Processing..."}
//                   {loadingComplete &&
//                     currentStudentId?._id === row?._id &&
//                     redirecting && <Redirection color={"#555"} size={"1rem"} />}
//                 </>
//               )}
//               <>
//                 {loadingComplete === null && <EditIcon />}
//                 {row?._id !== currentStudentId?._id &&
//                   loadingComplete !== null && <EditIcon />}
//               </>
//             </Link>
//           )}
//         </>
//       ),
//     },
//   ];
//   return hangingAdminsColumn;
// };
// const hangingAdminsColumn = (
//   setCurrentStudentId,
//   currentStudentId,
//   loadingComplete,
//   redirecting,
//   toast,
//   setLoadingComplete,
//   dispatch,
//   userInfo,
//   foundAdmin,
//   approveAdminStatus
// ) => {
//   const hangingAdminsColumn = [
//     {
//       name: "Image",
//       selector: (row) =>
//         row?.personalInfo?.profilePicture ? (
//           <HashLink
//             to={`/sensec/admin/Users/Admins/${row?.personalInfo?.firstName.replace(
//               / /g,
//               "_"
//             )}_${row?.personalInfo?.lastName}/${
//               row?.uniqueId
//             }/admin_info#studentInfo`}
//             title="View Admin Info"
//           >
//             <img
//               className="studentImg"
//               src={
//                 row?.personalInfo
//                   ? row?.personalInfo?.profilePicture?.url
//                   : row?.personalInfo?.profilePicture
//               }
//               alt=""
//             />
//           </HashLink>
//         ) : (
//           <HashLink
//             className="noImgLink"
//             to={`/sensec/admin/Users/Admins/${row?.personalInfo?.firstName}_${row?.personalInfo?.lastName}/${row?.personalInfo?.uniqueId}/admin_info#studentInfo`}
//             title="View Admin Info"
//           >
//             {row?.personalInfo?.gender === "Male" && (
//               <img
//                 className="studentImg"
//                 src={"/assets/maleAvatar.png"}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.gender === "Female" && (
//               <img
//                 className="studentImg"
//                 src={"/assets/femaleAvatar.png"}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.gender === "" && (
//               <div className="noImg">
//                 <p>No</p>
//                 <p>Image</p>
//               </div>
//             )}
//           </HashLink>
//         ),
//     },
//     {
//       name: "First Name",
//       selector: (row) => row?.personalInfo?.firstName,
//       sortable: true,
//     },
//     { name: "Surname", selector: (row) => row?.personalInfo?.lastName },
//     {
//       name: "Date Of Birth",
//       selector: (row) =>
//         dateFormatter.format(
//           new Date(
//             row?.personalInfo?.dateOfBirth
//               ? row?.personalInfo?.dateOfBirth
//               : "---"
//           )
//         ),
//     },
//     {
//       name: "Unique-ID",
//       selector: (row) => (row?.uniqueId ? row?.uniqueId : "---"),
//       sortable: true,
//     },
//     {
//       name: "Email",
//       selector: (row) =>
//         row?.contactAddress?.email ? row?.contactAddress?.email : "---",
//     },
//     {
//       name: "Update",
//       selector: (row) => (
//         <>
//           {row?.employment?.employmentStatus === "approved" && (
//             <Link
//               className="editLink"
//               to={`/sensec/admin/Users/Admins/${row.personalInfo?.firstName}_${row.personalInfo?.lastName}/${row.uniqueId}/update`}
//             >
//               <EditIcon />
//             </Link>
//           )}
//           {row?.employment?.employmentStatus === "in progress" && (
//             <Link
//               className="editLink"
//               onClick={async () => {
//                 setCurrentStudentId(row);
//               }}
//             >
//               {currentStudentId && currentStudentId?._id === row?._id && (
//                 <>
//                   {loadingComplete === false && "Processing..."}
//                   {loadingComplete &&
//                     currentStudentId?._id === row?._id &&
//                     redirecting && <Redirection color={"#555"} size={"1rem"} />}
//                 </>
//               )}
//               <>
//                 {loadingComplete === null && <EditIcon />}
//                 {row?._id !== currentStudentId?._id &&
//                   loadingComplete !== null && <EditIcon />}
//               </>
//             </Link>
//           )}
//         </>
//       ),
//     },
//   ];
//   return hangingAdminsColumn;
// };
// const pendingAdminsColumn = (
//   setCurrentAdmin,
//   loadingComplete,
//   setLoadingComplete,
//   toast,
//   dispatch,
//   userInfo,
//   foundAdmin,
//   approveAdminStatus,
//   openApproveEmploymentModal,
//   setOpenApproveEmploymentModal
// ) => {
//   const pendingAdminsColumn = [
//     {
//       name: "Image",
//       selector: (row) =>
//         row?.personalInfo?.profilePicture ? (
//           <HashLink
//             to={`/sensec/admin/Users/Admins/${row?.personalInfo?.firstName.replace(
//               / /g,
//               "_"
//             )}_${row?.personalInfo?.lastName}/${
//               row?.uniqueId
//             }/admin_info#studentInfo`}
//             title="View Admin Info"
//           >
//             <img
//               className="studentImg"
//               src={
//                 row?.personalInfo
//                   ? row?.personalInfo?.profilePicture?.url
//                   : row?.personalInfo?.profilePicture
//               }
//               alt=""
//             />
//           </HashLink>
//         ) : (
//           <HashLink
//             className="noImgLink"
//             to={`/sensec/admin/Users/Admins/${row?.personalInfo?.firstName}_${row?.personalInfo?.lastName}/${row?.personalInfo?.uniqueId}/admin_info#studentInfo`}
//             title="View Admin Info"
//           >
//             {row?.personalInfo?.gender === "Male" && (
//               <img
//                 className="studentImg"
//                 src={"/assets/maleAvatar.png"}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.gender === "Female" && (
//               <img
//                 className="studentImg"
//                 src={"/assets/femaleAvatar.png"}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.gender === "" && (
//               <div className="noImg">
//                 <p>No</p>
//                 <p>Image</p>
//               </div>
//             )}
//           </HashLink>
//         ),
//     },
//     {
//       name: "First Name",
//       selector: (row) => row?.personalInfo?.firstName,
//       sortable: true,
//     },
//     { name: "Surname", selector: (row) => row?.personalInfo?.lastName },
//     {
//       name: "Date Of Birth",
//       selector: (row) => (
//         <p
//           title={dateFormatter.format(
//             new Date(
//               row?.personalInfo?.dateOfBirth
//                 ? row?.personalInfo?.dateOfBirth
//                 : "---"
//             )
//           )}
//         >
//           {dateFormatter.format(
//             new Date(
//               row?.personalInfo?.dateOfBirth
//                 ? row?.personalInfo?.dateOfBirth
//                 : "---"
//             )
//           )}
//         </p>
//       ),
//     },
//     {
//       name: "Unique-ID",
//       selector: (row) => <p title={row?.uniqueId}>{row?.uniqueId}</p>,
//       sortable: true,
//     },
//     {
//       name: "Email",
//       selector: (row) => (
//         <p title={row?.contactAddress?.email}>
//           {row?.contactAddress?.email ? row?.contactAddress?.email : "---"}
//         </p>
//       ),
//     },
//     {
//       name: "Date Processed",
//       selector: (row) =>
//         !row?.employment?.employmentProcessedDate
//           ? "---"
//           : dateFormatter?.format(
//               new Date(row?.employment?.employmentProcessedDate)
//             ),
//     },
//     {
//       name: "Update",
//       selector: (row) => (
//         <Link
//           className="editLink"
//           to={`/sensec/admin/Users/Admins/${row.personalInfo?.firstName}_${row.personalInfo?.lastName}/${row.uniqueId}/update`}
//         >
//           <EditIcon />
//         </Link>
//       ),
//     },
//     {
//       name: "Approve",
//       selector: (row) =>
//         row?.employment?.employmentStatus === "pending" && (
//           <>
//             <HashLink
//               className="approveLink"
//               onClick={async () => {
//                 setCurrentAdmin(row?._id);
//                 setOpenApproveEmploymentModal(true);
//                 // dispatch(
//                 //   approveAdminEmployment({
//                 //     userUniqueId: row?.uniqueId,
//                 //     employmentApprovedBy: `${userInfo?.id}`,
//                 //     // enrolmentApprovementDate: date,
//                 //   })
//                 // );
//               }}
//             >
//               {foundAdmin && foundAdmin._id === row._id && (
//                 <>
//                   {loadingComplete === false && "Processing..."}
//                   {loadingComplete && approveAdminStatus === "success" && (
//                     <>
//                       <span>Approved</span> <TaskAltIcon />
//                     </>
//                   )}
//                 </>
//               )}
//               <>
//                 {loadingComplete === null && (
//                   <HowToRegIcon
//                     titleAccess="Approve Employment"
//                     style={{ fontSize: "2rem" }}
//                   />
//                 )}
//                 {row?._id !== foundAdmin?._id && loadingComplete !== null && (
//                   <HowToRegIcon
//                     titleAccess="Approve Employment"
//                     style={{ fontSize: "2rem" }}
//                   />
//                 )}
//               </>
//             </HashLink>
//             {foundAdmin && foundAdmin._id === row._id && (
//               <ApproveEmploymentModal
//                 open={openApproveEmploymentModal}
//                 onClose={() => setOpenApproveEmploymentModal(false)}
//                 approveEmploymentmentFunction={approveAdminEmployment({
//                   adminUniqueId: row?.uniqueId,
//                   employmentApprovedBy: `${userInfo?.id}`,
//                   // enrolmentApprovementDate: date,
//                 })}
//                 setLoadingComplete={setLoadingComplete}
//                 dispatch={dispatch}
//                 setCurrentUser={setCurrentAdmin}
//                 currentUserId={row?._id}
//               />
//             )}
//           </>
//         ),
//     },
//     {
//       name: "Reject",
//       selector: (row) =>
//         row?.employment?.employmentStatus === "pending" && (
//           <HashLink
//             className="rejectLink"
//             onClick={async () => {
//               try {
//                 const res = await axios.delete(
//                   `${API_ENDPOINT}/admin/reject_student_application/${row._id}`
//                 );
//                 if (res) {
//                   toast.success("Student disapproved successfully...", {
//                     position: "top-right",
//                     theme: "dark",
//                     // toastId: successId,
//                   });
//                   setTimeout(() => {
//                     window.location.reload();
//                   }, 5000);
//                 }
//               } catch (error) {
//                 toast.error("Student disapproved failed! Try again later", {
//                   position: "top-right",
//                   theme: "light",
//                   // toastId: successId,
//                 });
//               }
//             }}
//           >
//             <PersonRemoveIcon
//               titleAccess="Reject Employment"
//               style={{ fontSize: "2rem" }}
//             />
//           </HashLink>
//         ),
//     },
//   ];
//   return pendingAdminsColumn;
// };
const pendingStudentsColumn = (
  authAdmin,
  setCurrentStudent,
  loadingComplete,
  setLoadingComplete,
  toast,
  dispatch,
  foundStudent,
  enrollmentApprovalStatus,
  openApproveEnrollmentModal,
  setOpenApproveEnrollmentModal,
  setRejectStudent,
  studentToReject,
  openRejectModal,
  setOpenRejectModal,
  rejectEnrollmentStatus,
  adminCurrentAction,
  adminCurrentLink
) => {
  const pendingStudentsColumn = [
    {
      name: "Image",
      selector: (row) =>
        row?.personalInfo?.profilePicture ? (
          <HashLink
            to={`/sensec/admin/${adminCurrentAction}/${adminCurrentLink}/${row?.personalInfo?.firstName?.replace(
              / /g,
              "_"
            )}_${row?.personalInfo?.lastName}/${
              row?.uniqueId
            }/student_info#studentInfo`}
            title="View Student Info"
          >
            <img
              className="studentImg"
              src={
                row?.personalInfo
                  ? row?.personalInfo?.profilePicture?.url
                  : row?.personalInfo?.profilePicture
              }
              alt=""
            />
          </HashLink>
        ) : (
          <HashLink
            className="noImgLink"
            to={`/sensec/admin/Students/student_info/${row?.personalInfo?.firstName}_${row?.personalInfo?.lastName}/${row?.personalInfo?.uniqueId}#studentInfo`}
            title="View Student Info"
          >
            {row?.personalInfo?.gender === "Male" && (
              <img
                className="studentImg"
                src={"/assets/maleAvatar.png"}
                alt=""
              />
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
        dateFormatter.format(
          new Date(
            row?.personalInfo?.dateOfBirth
              ? row?.personalInfo?.dateOfBirth
              : "---"
          )
        ),
    },
    {
      name: "Unique-ID",
      selector: (row) => (row?.uniqueId ? row?.uniqueId : "---"),
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) =>
        row?.contactAddress?.email ? row?.contactAddress?.email : "---",
    },
    {
      name: "Date Enrolled",
      selector: (row) =>
        !row?.studentStatusExtend?.dateEnrolled
          ? "---"
          : dateFormatter?.format(
              new Date(row?.studentStatusExtend?.dateEnrolled)
            ),
    },
    {
      name: "Level",
      selector: (row) =>
        row.studentSchoolData?.currentClassLevel && (
          <div className="tableClassLevel">
            {row.studentSchoolData?.currentClassLevel?.name === "Level 100" && (
              <div className="firstYearTag" title="1st Year">
                1
              </div>
            )}
            {row.studentSchoolData?.currentClassLevel?.name === "Level 200" && (
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
      name: "Update",
      selector: (row) => (
        <Link
          className="editLink"
          to={`/sensec/admin/${adminCurrentAction}/${adminCurrentLink}/${row.personalInfo?.firstName}_${row.personalInfo?.lastName}/${row.uniqueId}/update`}
        >
          <EditIcon />
        </Link>
      ),
    },
    {
      name: "Approve",
      selector: (row) =>
        row?.studentStatusExtend?.enrollmentStatus === "pending" && (
          <>
            <HashLink
              className="approveLink"
              onClick={async () => {
                setCurrentStudent(row._id);
                setOpenApproveEnrollmentModal(true);
                setOpenRejectModal(false);
              }}
            >
              {foundStudent && foundStudent._id === row._id && (
                <>
                  {loadingComplete === false && (
                    <Box className="promotionSpinner">
                      <span>Processing</span>
                      <span className="dot-ellipsis">
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                      </span>
                    </Box>
                  )}
                  {loadingComplete &&
                    enrollmentApprovalStatus === "success" && (
                      <>
                        <span>Approved</span> <TaskAltIcon />
                      </>
                    )}
                </>
              )}
              <>
                {loadingComplete === null && (
                  <HowToRegIcon
                    titleAccess="Approve Enrollment"
                    style={{ fontSize: "2rem" }}
                  />
                )}
                {row?._id !== foundStudent?._id && loadingComplete !== null && (
                  <HowToRegIcon
                    titleAccess="Approve Enrollment"
                    style={{ fontSize: "2rem" }}
                  />
                )}
              </>
            </HashLink>
            {foundStudent && foundStudent._id === row._id && (
              <ApproveEnrollmentModal
                open={openApproveEnrollmentModal}
                onClose={() => setOpenApproveEnrollmentModal(false)}
                approveEnrollmentFunction={approvedStudentEnrollment({
                  studentId: row?.uniqueId,
                  enrolmentApprovedBy: `${authAdmin?.id}`,
                })}
                setLoadingComplete={setLoadingComplete}
                dispatch={dispatch}
                setCurrentStudent={setCurrentStudent}
                currentStudentId={row?._id}
              />
            )}
          </>
        ),
    },
    {
      name: "Reject",
      selector: (row) =>
        row?.studentStatusExtend?.enrollmentStatus === "pending" && (
          <>
            <HashLink
              className="rejectLink"
              onClick={async () => {
                setRejectStudent(row._id);
                setOpenRejectModal(true);
                setOpenApproveEnrollmentModal(false);
              }}
            >
              {studentToReject && studentToReject._id === row._id && (
                <>
                  {loadingComplete === false && (
                    <Box className="promotionSpinner">
                      <span>Processing</span>
                      <span className="dot-ellipsis">
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                      </span>
                    </Box>
                  )}
                  {loadingComplete && rejectEnrollmentStatus === "success" && (
                    <>
                      <span>Rejected</span> <TaskAltIcon />
                    </>
                  )}
                </>
              )}
              <>
                {loadingComplete === null && (
                  <PersonRemoveIcon
                    titleAccess="Reject Enrollment"
                    style={{ fontSize: "2rem" }}
                  />
                )}
                {row?._id !== studentToReject?._id &&
                  loadingComplete !== null && (
                    <PersonRemoveIcon
                      titleAccess="Reject Enrollment"
                      style={{ fontSize: "2rem" }}
                    />
                  )}
              </>
            </HashLink>
            {studentToReject && studentToReject._id === row._id && (
              <RejectEnrollmentModal
                open={openRejectModal}
                onClose={() => setOpenRejectModal(false)}
                // rejectionFunction={rejectStudentEnrollment({
                //   studentId: row?.uniqueId,
                //   adminId: authAdmin?.uniqueId,
                // })}
                setLoadingComplete={setLoadingComplete}
                dispatch={dispatch}
                setUserToReject={setRejectStudent}
                currentStudent={row?._id}
                rejectAction={"Reject Enrollment"}
              />
            )}
          </>
        ),
    },
  ];
  return pendingStudentsColumn;
};
// const courseMatesColumn = () => {
//   const studentColumn = [
//     {
//       name: "Image",
//       selector: (row) =>
//         row?.personalInfo?.profilePicture ? (
//           <HashLink
//             // scroll={scrollWithOffset}
//             // smooth
//             to={`/sensec/admin/Students/student_info/${row?.personalInfo?.firstName.replace(
//               / /g,
//               "_"
//             )}_${row?.personalInfo?.lastName}/${row?.uniqueId}#studentInfo`}
//             title="View Student Info"
//           >
//             <img
//               className="studentImg"
//               src={
//                 row?.personalInfo?.profilePicture?.url
//                   ? row?.personalInfo?.profilePicture?.url
//                   : row?.personalInfo?.profilePicture
//               }
//               alt=""
//             />
//           </HashLink>
//         ) : (
//           <HashLink
//             // scroll={scrollWithOffset}
//             // smooth
//             className="noImgLink"
//             to={`/sensec/admin/Students/student_info/${row?.personalInfo?.firstName}_${row?.personalInfo?.lastName}/${row?.personalInfo?.uniqueId}#studentInfo`}
//             title="View Student Info"
//           >
//             {row?.personalInfo?.gender === "Male" && (
//               <img
//                 className="studentImg"
//                 src={"/assets/maleAvatar.png"}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.gender === "Female" && (
//               <img
//                 className="studentImg"
//                 src={"/assets/femaleAvatar.png"}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.gender === "" && (
//               <div className="noImg">
//                 <p>No</p>
//                 <p>Image</p>
//               </div>
//             )}
//           </HashLink>
//         ),
//     },
//     {
//       name: "First Name",
//       selector: (row) => row?.personalInfo?.firstName,
//       sortable: true,
//     },
//     { name: "Surname", selector: (row) => row?.personalInfo?.lastName },
//     // {
//     //   name: "Date Of Birth",
//     //   selector: (row) =>
//     //     row?.personalInfo?.dateOfBirth
//     //       ? dateFormatter.format(new Date(row?.personalInfo?.dateOfBirth))
//     //       : "---",
//     // },
//     {
//       name: "Program",
//       selector: (row) =>
//         row?.studentSchoolData?.program
//           ? row.studentSchoolData?.program.name
//           : "---",
//     },
//     {
//       name: "Student-ID",
//       selector: (row) => row?.uniqueId,
//       sortable: true,
//     },
//     {
//       name: "Email",
//       selector: (row) =>
//         row?.contactAddress?.email ? row?.contactAddress?.email : "---",
//     },
//     {
//       name: "Enrolled Date",
//       selector: (row) =>
//         row?.studentStatusExtend?.dateEnrolled
//           ? dateFormatter.format(
//               new Date(row?.studentStatusExtend?.dateEnrolled)
//             )
//           : "---",
//     },
//     {
//       name: "Batch",
//       selector: (row) =>
//         row.studentSchoolData?.batch?.yearRange
//           ? `${row?.studentSchoolData?.batch?.yearRange.replace(/-/g, "/")}`
//           : "---",
//     },
//   ];
//   return studentColumn;
// };
const studentsColumn = (
  authAdmin,
  foundStudent,
  adminCurrentAction,
  adminCurrentLink,
  setCurrentStudentId,
  setLevel100LoadingComplete,
  setLevel200LoadingComplete,
  setLevel300LoadingComplete,
  level100loadingComplete,
  level200loadingComplete,
  level300loadingComplete,
  level100PromotionStatus,
  level200PromotionStatus,
  level300PromotionStatus,
  dispatch
) => {
  const studentColumn = [
    {
      name: "Image",
      selector: (row) =>
        row?.personalInfo?.profilePicture ? (
          <HashLink
            to={`/sensec/admin/${adminCurrentAction}/${adminCurrentLink}/${row?.personalInfo?.firstName?.replace(
              / /g,
              "_"
            )}_${row?.personalInfo?.lastName}/${
              row?.uniqueId
            }/student_info#studentInfo`}
            title="View Student Info"
          >
            <img
              className="studentImg"
              src={
                row?.personalInfo?.profilePicture?.url
                  ? row?.personalInfo?.profilePicture?.url
                  : row?.personalInfo?.profilePicture
              }
              alt=""
            />
          </HashLink>
        ) : (
          <HashLink
            className="noImgLink"
            to={`/sensec/admin/${adminCurrentAction}/${adminCurrentLink}/${row?.personalInfo?.firstName?.replace(
              / /g,
              "_"
            )}_${row?.personalInfo?.lastName}/${
              row?.personalInfo?.uniqueId
            }/student_info#studentInfo`}
            title="View Student Info"
          >
            {row?.personalInfo?.gender === "Male" && (
              <img
                className="studentImg"
                src={"/assets/maleAvatar.png"}
                alt=""
              />
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
      selector: (row) => (
        <p
          title={dateFormatter?.format(
            new Date(row?.personalInfo?.dateOfBirth)
          )}
        >
          {row?.personalInfo?.dateOfBirth
            ? dateFormatter.format(new Date(row?.personalInfo?.dateOfBirth))
            : "---"}
        </p>
      ),
    },
    {
      name: "Program",
      selector: (row) =>
        row?.studentSchoolData ? row.studentSchoolData?.program?.name : "---",
    },
    {
      name: "Student-ID",
      selector: (row) => row?.uniqueId,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) =>
        row?.contactAddress?.email ? row?.contactAddress?.email : "---",
    },
    {
      name: "Enrolled Date",
      selector: (row) =>
        dateFormatter.format(new Date(row?.studentStatusExtend?.dateEnrolled)),
    },
    {
      name: "Batch",
      selector: (row) =>
        row.studentSchoolData?.batch?.yearRange
          ? `${row?.studentSchoolData?.batch?.yearRange.replace(/-/g, "/")}`
          : "---",
    },
    {
      name: "Level",
      selector: (row) =>
        row.studentSchoolData?.currentClassLevel && (
          <div className="tableClassLevel">
            {row.studentSchoolData?.currentClassLevel?.name === "Level 100" && (
              <div className="firstYearTag" title="1st Year">
                1
              </div>
            )}
            {row.studentSchoolData?.currentClassLevel?.name === "Level 200" && (
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
        row?.studentSchoolData?.currentClassLevel && (
          <>
            {row?.studentSchoolData?.currentClassLevel?.name ===
              "Level 100" && (
              <Link
                className="editLink"
                onClick={async () => {
                  setLevel100LoadingComplete(false);
                  setCurrentStudentId(row._id);
                  //   dispatch(
                  //     promotingToLevel200({
                  //       uniqueId: row.uniqueId,
                  //       lastPromotedBy: `${authAdmin.id}`,
                  //     })
                  //   );
                }}
              >
                {foundStudent && foundStudent._id === row._id && (
                  <>
                    {level100loadingComplete === false && (
                      <Box className="promotionSpinner">
                        <p>Processing</p>
                        <span className="dot-ellipsis">
                          <span className="dot">.</span>
                          <span className="dot">.</span>
                          <span className="dot">.</span>
                        </span>
                      </Box>
                    )}
                    {level100loadingComplete &&
                      level100PromotionStatus === "success" && (
                        <>
                          <span style={{ color: "green" }}>Promoted</span>{" "}
                          <TaskAltIcon style={{ color: "green" }} />
                        </>
                      )}
                  </>
                )}
                <>
                  {level100loadingComplete === null && "P-L200"}
                  {row._id !== foundStudent?._id &&
                    level100loadingComplete !== null &&
                    "P-L200"}
                </>
              </Link>
            )}
            {row?.studentSchoolData?.currentClassLevel?.name ===
              "Level 200" && (
              <Link
                className="editLink"
                onClick={async () => {
                  setLevel200LoadingComplete(false);
                  setCurrentStudentId(row._id);
                  //   dispatch(
                  //     promotingToLevel300({
                  //       uniqueId: row.uniqueId,
                  //       lastPromotedBy: `${authAdmin.id}`,
                  //     })
                  //   );
                }}
              >
                {foundStudent && foundStudent._id === row._id && (
                  <>
                    {level200loadingComplete === false && (
                      <Box className="promotionSpinner">
                        <p>Processing</p>
                        <span className="dot-ellipsis">
                          <span className="dot">.</span>
                          <span className="dot">.</span>
                          <span className="dot">.</span>
                        </span>
                      </Box>
                    )}
                    {level200loadingComplete &&
                      level200PromotionStatus === "success" && (
                        <>
                          <span style={{ color: "green" }}>Promoted</span>{" "}
                          <TaskAltIcon style={{ color: "green" }} />
                        </>
                      )}
                  </>
                )}
                <>
                  {level200loadingComplete === null && "P-L300"}
                  {row._id !== foundStudent?._id &&
                    level200loadingComplete !== null &&
                    "P-L300"}
                </>
              </Link>
            )}
            {row?.studentSchoolData?.currentClassLevel?.name ===
              "Level 300" && (
              <Link
                className="editLink"
                onClick={async () => {
                  setLevel300LoadingComplete(false);
                  setCurrentStudentId(row._id);
                  //   dispatch(
                  //     graduateStudent({
                  //       uniqueId: row.uniqueId,
                  //       lastPromotedBy: `${authAdmin.id}`,
                  //     })
                  //   );
                }}
              >
                {foundStudent && foundStudent._id === row._id && (
                  <>
                    {level300loadingComplete === false && (
                      <Box className="promotionSpinner">
                        <span>Processing</span>
                        <span className="dot-ellipsis">
                          <span className="dot">.</span>
                          <span className="dot">.</span>
                          <span className="dot">.</span>
                        </span>
                      </Box>
                    )}
                    {level300loadingComplete &&
                      level300PromotionStatus === "success" && (
                        <>
                          <span style={{ color: "green" }}>Graduated</span>{" "}
                          <TaskAltIcon style={{ color: "green" }} />
                        </>
                      )}
                  </>
                )}
                <>
                  {level300loadingComplete === null && "Graduate"}
                  {row._id !== foundStudent?._id &&
                    level300loadingComplete !== null &&
                    "Graduate"}
                </>
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
          to={`/sensec/admin/${adminCurrentAction}/${adminCurrentLink}/${row.personalInfo?.firstName}_${row.personalInfo?.lastName}/${row.uniqueId}/update`}
        >
          <EditIcon />
        </Link>
      ),
    },
  ];
  return studentColumn;
};
// const teachersColumn = (
//   setCurrentStudentId,
//   currentStudentId,
//   loadingComplete,
//   redirecting
// ) => {
//   const teachersDataFormat = [
//     {
//       name: "Image",
//       selector: (row) =>
//         row?.personalInfo?.profilePicture ? (
//           <HashLink
//             to={`/sensec/admin/Users/Lecturers/${row?.personalInfo?.firstName.replace(
//               / /g,
//               "_"
//             )}_${row?.personalInfo?.lastName}/${
//               row?.uniqueId
//             }/lecturer_info#teacherInfo`}
//             title="View Student Info"
//           >
//             {!row?.personalInfo?.profilePicture?.url && (
//               <img
//                 className="studentImg"
//                 src={row?.personalInfo?.profilePicture}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.profilePicture?.url && (
//               <img
//                 className="studentImg"
//                 src={row?.personalInfo?.profilePicture?.url}
//                 alt=""
//               />
//             )}
//           </HashLink>
//         ) : (
//           <HashLink
//             className="noImgLink"
//             to={`/sensec/admin/Students/student_info/${row?.personalInfo?.firstName}_${row?.personalInfo?.lastName}/${row?.personalInfo?.uniqueId}#studentInfo`}
//             title="View Lecturer Info"
//           >
//             {row?.personalInfo?.gender === "Male" && (
//               <img
//                 className="studentImg"
//                 src={"/assets/maleAvatar.png"}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.gender === "Female" && (
//               <img
//                 className="studentImg"
//                 src={"/assets/femaleAvatar.png"}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.gender === "" && (
//               <div className="noImg">
//                 <p>No</p>
//                 <p>Image</p>
//               </div>
//             )}
//           </HashLink>
//         ),
//     },
//     {
//       name: "First Name",
//       selector: (row) => row?.personalInfo?.firstName,
//       sortable: true,
//     },
//     { name: "Surname", selector: (row) => row?.personalInfo?.lastName },
//     {
//       name: "Date Of Birth",
//       selector: (row) => (
//         <p
//           title={dateFormatter.format(
//             new Date(
//               row?.personalInfo?.dateOfBirth
//                 ? row?.personalInfo?.dateOfBirth
//                 : "---"
//             )
//           )}
//         >
//           {dateFormatter.format(
//             new Date(
//               row?.personalInfo?.dateOfBirth
//                 ? row?.personalInfo?.dateOfBirth
//                 : "---"
//             )
//           )}
//         </p>
//       ),
//     },
//     {
//       name: "Class Handling",
//       selector: (row) => (
//         <p title={row?.teacherSchoolData?.classLevelHandling?.sectionName}>
//           {row?.teacherSchoolData?.classLevelHandling
//             ? row?.teacherSchoolData?.classLevelHandling?.label
//             : "None"}
//         </p>
//       ),
//     },
//     {
//       name: "Unique-ID",
//       selector: (row) => <p title={row?.uniqueId}>{row?.uniqueId}</p>,
//       sortable: true,
//     },
//     {
//       name: "Email",
//       selector: (row) => (
//         <p title={row?.contactAddress?.email}>
//           {row?.contactAddress?.email ? row?.contactAddress?.email : "---"}
//         </p>
//       ),
//     },
//     {
//       name: "Date Employed",
//       selector: (row) =>
//         row?.employment?.employmentApprovedDate
//           ? dateFormatter.format(
//               new Date(row?.employment.employmentApprovedDate)
//             )
//           : "---",
//     },
//     {
//       name: "Class Levels",
//       selector: (row) =>
//         row?.teacherSchoolData?.classLevels
//           ? row?.teacherSchoolData?.classLevels?.length
//           : "---",
//     },
//     {
//       name: "Update",
//       selector: (row) => (
//         <>
//           {row?.employment?.employmentStatus === "approved" && (
//             <Link
//               className="editLink"
//               to={`/sensec/admin/Users/Lecturers/${row.personalInfo?.firstName}_${row.personalInfo?.lastName}/${row.uniqueId}/update`}
//             >
//               <EditIcon />
//             </Link>
//           )}
//           {row?.employment?.employmentStatus === "pending" && (
//             <Link
//               className="editLink"
//               to={`/sensec/admin/Users/Lecturers/${row.personalInfo?.firstName}_${row.personalInfo?.lastName}/${row.uniqueId}/update`}
//             >
//               <EditIcon />
//             </Link>
//           )}
//           {row?.employment?.employmentStatus === "in progress" && (
//             <Link
//               className="editLink"
//               onClick={async () => {
//                 setCurrentStudentId(row);
//               }}
//             >
//               {currentStudentId && currentStudentId?._id === row?._id && (
//                 <>
//                   {loadingComplete === false && "Processing..."}
//                   {loadingComplete &&
//                     currentStudentId?._id === row?._id &&
//                     redirecting && <Redirection color={"#555"} size={"1rem"} />}
//                 </>
//               )}
//               <>
//                 {loadingComplete === null && <EditIcon />}
//                 {row?._id !== currentStudentId?._id &&
//                   loadingComplete !== null && <EditIcon />}
//               </>
//             </Link>
//           )}
//         </>
//       ),
//     },
//   ];
//   return teachersDataFormat;
// };
// const hangingTeachersColumn = (
//   setCurrentStudentId,
//   currentStudentId,
//   loadingComplete,
//   redirecting
// ) => {
//   const teachersDataFormat = [
//     {
//       name: "Image",
//       selector: (row) =>
//         row?.personalInfo?.profilePicture ? (
//           <HashLink
//             to={`/sensec/admin/Users/Lecturers/${row?.personalInfo?.firstName.replace(
//               / /g,
//               "_"
//             )}_${row?.personalInfo?.lastName}/${
//               row?.uniqueId
//             }/lecturer_info#teacherInfo`}
//             title="View Student Info"
//           >
//             {!row?.personalInfo?.profilePicture?.url && (
//               <img
//                 className="studentImg"
//                 src={row?.personalInfo?.profilePicture}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.profilePicture?.url && (
//               <img
//                 className="studentImg"
//                 src={row?.personalInfo?.profilePicture?.url}
//                 alt=""
//               />
//             )}
//           </HashLink>
//         ) : (
//           <HashLink
//             className="noImgLink"
//             to={`/sensec/admin/Students/student_info/${row?.personalInfo?.firstName}_${row?.personalInfo?.lastName}/${row?.personalInfo?.uniqueId}#studentInfo`}
//             title="View Student Info"
//           >
//             {row?.personalInfo?.gender === "Male" && (
//               <img
//                 className="studentImg"
//                 src={"/assets/maleAvatar.png"}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.gender === "Female" && (
//               <img
//                 className="studentImg"
//                 src={"/assets/femaleAvatar.png"}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.gender === "" && (
//               <div className="noImg">
//                 <p>No</p>
//                 <p>Image</p>
//               </div>
//             )}
//           </HashLink>
//         ),
//     },
//     {
//       name: "First Name",
//       selector: (row) => row?.personalInfo?.firstName,
//       sortable: true,
//     },
//     { name: "Surname", selector: (row) => row?.personalInfo?.lastName },
//     {
//       name: "Date Of Birth",
//       selector: (row) =>
//         dateFormatter.format(
//           new Date(
//             row?.personalInfo?.dateOfBirth
//               ? row?.personalInfo?.dateOfBirth
//               : "---"
//           )
//         ),
//     },
//     {
//       name: "Unique-ID",
//       selector: (row) => row?.uniqueId,
//       sortable: true,
//     },
//     {
//       name: "Email",
//       selector: (row) =>
//         row?.contactAddress?.email ? row?.contactAddress?.email : "---",
//     },
//     {
//       name: "Update",
//       selector: (row) => (
//         <>
//           {row?.employment?.employmentStatus === "approved" && (
//             <Link
//               className="editLink"
//               to={`/sensec/admin/Users/Lecturers/${row.personalInfo?.firstName}_${row.personalInfo?.lastName}/${row.uniqueId}/update`}
//             >
//               <EditIcon />
//             </Link>
//           )}
//           {row?.employment?.employmentStatus === "pending" && (
//             <Link
//               className="editLink"
//               to={`/sensec/admin/Users/Lecturers/${row.personalInfo?.firstName}_${row.personalInfo?.lastName}/${row.uniqueId}/update`}
//             >
//               <EditIcon />
//             </Link>
//           )}
//           {row?.employment?.employmentStatus === "in progress" && (
//             <Link
//               className="editLink"
//               onClick={async () => {
//                 setCurrentStudentId(row);
//               }}
//             >
//               {currentStudentId && currentStudentId?._id === row?._id && (
//                 <>
//                   {loadingComplete === false && "Processing..."}
//                   {loadingComplete &&
//                     currentStudentId?._id === row?._id &&
//                     redirecting && <Redirection color={"#555"} size={"1rem"} />}
//                 </>
//               )}
//               <>
//                 {loadingComplete === null && <EditIcon />}
//                 {row?._id !== currentStudentId?._id &&
//                   loadingComplete !== null && <EditIcon />}
//               </>
//             </Link>
//           )}
//         </>
//       ),
//     },
//   ];
//   return teachersDataFormat;
// };
// const pendingTeachersColumn = (
//   setCurrentLecturer,
//   loadingComplete,
//   setLoadingComplete,
//   toast,
//   dispatch,
//   userInfo,
//   foundLecturer,
//   approveTeacherEmploymentStatus,
//   openApproveEmploymentModal,
//   setOpenApproveEmploymentModal
// ) => {
//   const teachersDataFormat = [
//     {
//       name: "Image",
//       selector: (row) =>
//         row?.personalInfo?.profilePicture ? (
//           <HashLink
//             to={`/sensec/admin/Users/Lecturers/${row?.personalInfo?.firstName.replace(
//               / /g,
//               "_"
//             )}_${row?.personalInfo?.lastName}/${
//               row?.uniqueId
//             }/lecturer_info#teacherInfo`}
//             title="View Lecturer Info"
//           >
//             {!row?.personalInfo?.profilePicture?.url && (
//               <img
//                 className="studentImg"
//                 src={row?.personalInfo?.profilePicture}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.profilePicture?.url && (
//               <img
//                 className="studentImg"
//                 src={row?.personalInfo?.profilePicture?.url}
//                 alt=""
//               />
//             )}
//           </HashLink>
//         ) : (
//           <HashLink
//             className="noImgLink"
//             to={`/sensec/admin/Students/student_info/${row?.personalInfo?.firstName}_${row?.personalInfo?.lastName}/${row?.personalInfo?.uniqueId}#studentInfo`}
//             title="View Student Info"
//           >
//             {row?.personalInfo?.gender === "Male" && (
//               <img
//                 className="studentImg"
//                 src={"/assets/maleAvatar.png"}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.gender === "Female" && (
//               <img
//                 className="studentImg"
//                 src={"/assets/femaleAvatar.png"}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.gender === "" && (
//               <div className="noImg">
//                 <p>No</p>
//                 <p>Image</p>
//               </div>
//             )}
//           </HashLink>
//         ),
//     },
//     {
//       name: "First Name",
//       selector: (row) => row?.personalInfo?.firstName,
//       sortable: true,
//     },
//     { name: "Surname", selector: (row) => row?.personalInfo?.lastName },
//     {
//       name: "Date Of Birth",
//       selector: (row) => (
//         <p
//           title={dateFormatter.format(
//             new Date(
//               row?.personalInfo?.dateOfBirth
//                 ? row?.personalInfo?.dateOfBirth
//                 : "---"
//             )
//           )}
//         >
//           {dateFormatter.format(
//             new Date(
//               row?.personalInfo?.dateOfBirth
//                 ? row?.personalInfo?.dateOfBirth
//                 : "---"
//             )
//           )}
//         </p>
//       ),
//     },
//     {
//       name: "Unique-ID",
//       selector: (row) => <p title={row?.uniqueId}>{row?.uniqueId}</p>,
//       sortable: true,
//     },
//     {
//       name: "Email",
//       selector: (row) => (
//         <p title={row?.contactAddress?.email}>
//           {row?.contactAddress?.email ? row?.contactAddress?.email : "---"}
//         </p>
//       ),
//     },
//     {
//       name: "Update",
//       selector: (row) => (
//         <>
//           {row?.employment?.employmentStatus === "pending" && (
//             <Link
//               className="editLink"
//               to={`/sensec/admin/Users/Lecturers/${row.personalInfo?.firstName}_${row.personalInfo?.lastName}/${row.uniqueId}/update`}
//             >
//               <EditIcon />
//             </Link>
//           )}
//         </>
//       ),
//     },
//     {
//       name: "Approve",
//       selector: (row) =>
//         row?.employment?.employmentStatus === "pending" && (
//           <>
//             <HashLink
//               className="approveLink"
//               onClick={async () => {
//                 setCurrentLecturer(row._id);
//                 setOpenApproveEmploymentModal(true);
//               }}
//             >
//               {foundLecturer && foundLecturer._id === row._id && (
//                 <>
//                   {loadingComplete === false && "Processing..."}
//                   {loadingComplete &&
//                     approveTeacherEmploymentStatus === "success" && (
//                       <>
//                         <span>Approved</span> <TaskAltIcon />
//                       </>
//                     )}
//                 </>
//               )}
//               <>
//                 {loadingComplete === null && (
//                   <HowToRegIcon
//                     titleAccess="Approve Employment"
//                     style={{ fontSize: "2rem" }}
//                   />
//                 )}
//                 {row?._id !== foundLecturer?._id &&
//                   loadingComplete !== null && (
//                     <HowToRegIcon
//                       titleAccess="Approve Employment"
//                       style={{ fontSize: "2rem" }}
//                     />
//                   )}
//               </>
//             </HashLink>
//             {foundLecturer && foundLecturer._id === row._id && (
//               <ApproveEmploymentModal
//                 open={openApproveEmploymentModal}
//                 onClose={() => setOpenApproveEmploymentModal(false)}
//                 approveEmploymentmentFunction={approveTeacherEmploymentment({
//                   teacherUniqueId: row?.uniqueId,
//                   employmentApprovedBy: `${userInfo?.id}`,
//                   // enrolmentApprovementDate: date,
//                 })}
//                 setLoadingComplete={setLoadingComplete}
//                 dispatch={dispatch}
//                 setCurrentUser={setCurrentLecturer}
//                 currentUserId={row?._id}
//               />
//             )}
//           </>
//         ),
//     },
//     {
//       name: "Reject",
//       selector: (row) =>
//         row?.employment?.employmentStatus === "pending" && (
//           <HashLink
//             className="rejectLink"
//             onClick={async () => {
//               try {
//                 const res = await axios.delete(
//                   `${API_ENDPOINT}/admin/reject_student_application/${row._id}`
//                 );
//                 if (res) {
//                   toast.success("Student disapproved successfully...", {
//                     position: "top-right",
//                     theme: "dark",
//                     // toastId: successId,
//                   });
//                   setTimeout(() => {
//                     window.location.reload();
//                   }, 5000);
//                 }
//               } catch (error) {
//                 toast.error("Student disapproved failed! Try again later", {
//                   position: "top-right",
//                   theme: "light",
//                   // toastId: successId,
//                 });
//               }
//             }}
//           >
//             <PersonRemoveIcon
//               titleAccess="Reject Employment"
//               style={{ fontSize: "2rem" }}
//             />
//           </HashLink>
//         ),
//     },
//   ];
//   return teachersDataFormat;
// };
// const nTStaffsColumn = (adminCurrentLink) => {
//   const nTStaffsDataFormat = [
//     {
//       name: "Image",
//       selector: (row) =>
//         row?.personalInfo?.profilePicture ? (
//           <HashLink
//             to={`/sensec/admin/Users/${adminCurrentLink}/${row?.personalInfo?.firstName.replace(
//               / /g,
//               "_"
//             )}_${row?.personalInfo?.lastName}/${row?.uniqueId}/nt_staff_info`}
//             title="View NT-Staff Info"
//           >
//             {!row?.personalInfo?.profilePicture?.url && (
//               <img
//                 className="studentImg"
//                 src={row?.personalInfo?.profilePicture}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.profilePicture?.url && (
//               <img
//                 className="studentImg"
//                 src={row?.personalInfo?.profilePicture?.url}
//                 alt=""
//               />
//             )}
//           </HashLink>
//         ) : (
//           <HashLink
//             className="noImgLink"
//             to={`/sensec/admin/Students/student_info/${row?.personalInfo?.firstName}_${row?.personalInfo?.lastName}/${row?.personalInfo?.uniqueId}#studentInfo`}
//             title="View Lecturer Info"
//           >
//             {row?.personalInfo?.gender === "Male" && (
//               <img
//                 className="studentImg"
//                 src={"/assets/maleAvatar.png"}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.gender === "Female" && (
//               <img
//                 className="studentImg"
//                 src={"/assets/femaleAvatar.png"}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.gender === "" && (
//               <div className="noImg">
//                 <p>No</p>
//                 <p>Image</p>
//               </div>
//             )}
//           </HashLink>
//         ),
//     },
//     {
//       name: "First Name",
//       selector: (row) => row?.personalInfo?.firstName,
//       sortable: true,
//     },
//     { name: "Surname", selector: (row) => row?.personalInfo?.lastName },
//     {
//       name: "Date Of Birth",
//       selector: (row) => (
//         <p
//           title={dateFormatter.format(
//             new Date(
//               row?.personalInfo?.dateOfBirth
//                 ? row?.personalInfo?.dateOfBirth
//                 : "---"
//             )
//           )}
//         >
//           {dateFormatter.format(
//             new Date(
//               row?.personalInfo?.dateOfBirth
//                 ? row?.personalInfo?.dateOfBirth
//                 : "---"
//             )
//           )}
//         </p>
//       ),
//     },
//     {
//       name: "Unique-ID",
//       selector: (row) => <p title={row?.uniqueId}>{row?.uniqueId}</p>,
//       sortable: true,
//     },
//     {
//       name: "Email",
//       selector: (row) => (
//         <p title={row?.contactAddress?.email}>
//           {row?.contactAddress?.email ? row?.contactAddress?.email : "---"}
//         </p>
//       ),
//     },
//     {
//       name: "Date Employed",
//       selector: (row) =>
//         row?.employment?.employmentApprovedDate
//           ? dateFormatter.format(
//               new Date(row?.employment.employmentApprovedDate)
//             )
//           : "---",
//     },
//     {
//       name: "Update",
//       selector: (row) => (
//         <>
//           {row?.employment?.employmentStatus === "approved" && (
//             <Link
//               className="editLink"
//               to={`/sensec/admin/Users/${adminCurrentLink}/${row.personalInfo?.firstName}_${row.personalInfo?.lastName}/${row.uniqueId}/update`}
//             >
//               <EditIcon />
//             </Link>
//           )}
//         </>
//       ),
//     },
//   ];
//   return nTStaffsDataFormat;
// };
// const pendingNTStaffsColumn = (
//   setCurrentNTStaff,
//   loadingComplete,
//   setLoadingComplete,
//   toast,
//   dispatch,
//   userInfo,
//   foundNTStaff,
//   approveNTStaffEmploymentStatus,
//   openApproveEmploymentModal,
//   setOpenApproveEmploymentModal,
//   setRejectNTStaff,
//   nTStaffToReject,
//   openRejectModal,
//   setOpenRejectModal
// ) => {
//   const nTStaffsDataFormat = [
//     {
//       name: "Image",
//       selector: (row) =>
//         row?.personalInfo?.profilePicture ? (
//           <HashLink
//             to={`/sensec/admin/Users/Lecturers/${row?.personalInfo?.firstName.replace(
//               / /g,
//               "_"
//             )}_${row?.personalInfo?.lastName}/${
//               row?.uniqueId
//             }/lecturer_info#teacherInfo`}
//             title="View Student Info"
//           >
//             {!row?.personalInfo?.profilePicture?.url && (
//               <img
//                 className="studentImg"
//                 src={row?.personalInfo?.profilePicture}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.profilePicture?.url && (
//               <img
//                 className="studentImg"
//                 src={row?.personalInfo?.profilePicture?.url}
//                 alt=""
//               />
//             )}
//           </HashLink>
//         ) : (
//           <HashLink
//             className="noImgLink"
//             to={`/sensec/admin/Students/student_info/${row?.personalInfo?.firstName}_${row?.personalInfo?.lastName}/${row?.personalInfo?.uniqueId}#studentInfo`}
//             title="View Lecturer Info"
//           >
//             {row?.personalInfo?.gender === "Male" && (
//               <img
//                 className="studentImg"
//                 src={"/assets/maleAvatar.png"}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.gender === "Female" && (
//               <img
//                 className="studentImg"
//                 src={"/assets/femaleAvatar.png"}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.gender === "" && (
//               <div className="noImg">
//                 <p>No</p>
//                 <p>Image</p>
//               </div>
//             )}
//           </HashLink>
//         ),
//     },
//     {
//       name: "First Name",
//       selector: (row) => row?.personalInfo?.firstName,
//       sortable: true,
//     },
//     { name: "Surname", selector: (row) => row?.personalInfo?.lastName },
//     {
//       name: "Date Of Birth",
//       selector: (row) => (
//         <p
//           title={dateFormatter.format(
//             new Date(
//               row?.personalInfo?.dateOfBirth
//                 ? row?.personalInfo?.dateOfBirth
//                 : "---"
//             )
//           )}
//         >
//           {dateFormatter.format(
//             new Date(
//               row?.personalInfo?.dateOfBirth
//                 ? row?.personalInfo?.dateOfBirth
//                 : "---"
//             )
//           )}
//         </p>
//       ),
//     },
//     {
//       name: "Unique-ID",
//       selector: (row) => <p title={row?.uniqueId}>{row?.uniqueId}</p>,
//       sortable: true,
//     },
//     {
//       name: "Email",
//       selector: (row) => (
//         <p title={row?.contactAddress?.email}>
//           {row?.contactAddress?.email ? row?.contactAddress?.email : "---"}
//         </p>
//       ),
//     },
//     {
//       name: "Date Processed",
//       selector: (row) =>
//         row?.employment?.employmentProcessedDate
//           ? dateFormatter.format(
//               new Date(row?.employment.employmentProcessedDate)
//             )
//           : "---",
//     },
//     {
//       name: "Update",
//       selector: (row) => (
//         <>
//           {row?.employment?.employmentStatus === "pending" && (
//             <Link
//               className="editLink"
//               to={`/sensec/admin/Users/NT-Staffs/${row.personalInfo?.firstName}_${row.personalInfo?.lastName}/${row.uniqueId}/update`}
//             >
//               <EditIcon />
//             </Link>
//           )}
//         </>
//       ),
//     },
//     {
//       name: "Approve",
//       selector: (row) =>
//         row?.employment?.employmentStatus === "pending" && (
//           <>
//             <HashLink
//               className="approveLink"
//               onClick={async () => {
//                 setCurrentNTStaff(row?._id);
//                 setOpenApproveEmploymentModal(true);
//                 // dispatch(
//                 // approveNTStaffEmploymentment({
//                 //   nTStaffUniqueId: row?.uniqueId,
//                 //   employmentApprovedBy: `${userInfo?.id}`,
//                 //   // enrolmentApprovementDate: date,
//                 // });
//                 // );
//               }}
//             >
//               {foundNTStaff && foundNTStaff._id === row._id && (
//                 <>
//                   {loadingComplete === false && "Processing..."}
//                   {loadingComplete &&
//                     approveNTStaffEmploymentStatus === "success" && (
//                       <>
//                         <span>Approved</span> <TaskAltIcon />
//                       </>
//                     )}
//                 </>
//               )}
//               <>
//                 {loadingComplete === null && (
//                   <HowToRegIcon
//                     titleAccess="Approve Employment"
//                     style={{ fontSize: "2rem" }}
//                   />
//                 )}
//                 {row?._id !== foundNTStaff?._id && loadingComplete !== null && (
//                   <HowToRegIcon
//                     titleAccess="Approve Employment"
//                     style={{ fontSize: "2rem" }}
//                   />
//                 )}
//               </>
//             </HashLink>
//             {foundNTStaff && foundNTStaff._id === row._id && (
//               <ApproveEmploymentModal
//                 open={openApproveEmploymentModal}
//                 onClose={() => setOpenApproveEmploymentModal(false)}
//                 approveEmploymentmentFunction={approveNTStaffEmploymentment({
//                   nTStaffUniqueId: row?.uniqueId,
//                   employmentApprovedBy: `${userInfo?.id}`,
//                   // enrolmentApprovementDate: date,
//                 })}
//                 setLoadingComplete={setLoadingComplete}
//                 dispatch={dispatch}
//                 setCurrentUser={setCurrentNTStaff}
//                 currentUserId={row?._id}
//               />
//             )}
//           </>
//         ),
//     },
//     {
//       name: "Reject",
//       selector: (row) =>
//         row?.employment?.employmentStatus === "pending" && (
//           <HashLink
//             className="rejectLink"
//             onClick={async () => {
//               setRejectNTStaff(row._id);
//               setOpenRejectModal(true);
//               setOpenApproveEmploymentModal(false);
//             }}
//           >
//             <PersonRemoveIcon
//               titleAccess="Reject Employment"
//               style={{ fontSize: "2rem" }}
//             />
//             {nTStaffToReject && nTStaffToReject._id === row._id && (
//               <RejectionModal
//                 open={openRejectModal}
//                 onClose={() => setOpenRejectModal(false)}
//                 rejectionFunction={rejectNTStaffEmploymentment({
//                   nTStaffUniqueId: row?.uniqueId,
//                   adminId: userInfo?.uniqueId,
//                 })}
//                 setLoadingComplete={setLoadingComplete}
//                 dispatch={dispatch}
//                 setUserToReject={setRejectNTStaff}
//                 currentUserId={row?._id}
//                 rejectAction={"Reject Employment"}
//               />
//             )}
//           </HashLink>
//         ),
//     },
//   ];
//   return nTStaffsDataFormat;
// };
// const hangingNTStaffsColumn = (
//   setCurrentStudentId,
//   currentStudentId,
//   loadingComplete,
//   redirecting
// ) => {
//   const nTStaffsDataFormat = [
//     {
//       name: "Image",
//       selector: (row) =>
//         row?.personalInfo?.profilePicture ? (
//           <HashLink
//             to={`/sensec/admin/Users/Lecturers/${row?.personalInfo?.firstName.replace(
//               / /g,
//               "_"
//             )}_${row?.personalInfo?.lastName}/${
//               row?.uniqueId
//             }/lecturer_info#teacherInfo`}
//             title="View Student Info"
//           >
//             {!row?.personalInfo?.profilePicture?.url && (
//               <img
//                 className="studentImg"
//                 src={row?.personalInfo?.profilePicture}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.profilePicture?.url && (
//               <img
//                 className="studentImg"
//                 src={row?.personalInfo?.profilePicture?.url}
//                 alt=""
//               />
//             )}
//           </HashLink>
//         ) : (
//           <HashLink
//             className="noImgLink"
//             to={`/sensec/admin/Students/student_info/${row?.personalInfo?.firstName}_${row?.personalInfo?.lastName}/${row?.personalInfo?.uniqueId}#studentInfo`}
//             title="View Lecturer Info"
//           >
//             {row?.personalInfo?.gender === "Male" && (
//               <img
//                 className="studentImg"
//                 src={"/assets/maleAvatar.png"}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.gender === "Female" && (
//               <img
//                 className="studentImg"
//                 src={"/assets/femaleAvatar.png"}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.gender === "" && (
//               <div className="noImg">
//                 <p>No</p>
//                 <p>Image</p>
//               </div>
//             )}
//           </HashLink>
//         ),
//     },
//     {
//       name: "First Name",
//       selector: (row) => row?.personalInfo?.firstName,
//       sortable: true,
//     },
//     { name: "Surname", selector: (row) => row?.personalInfo?.lastName },
//     {
//       name: "Date Of Birth",
//       selector: (row) =>
//         dateFormatter.format(
//           new Date(
//             row?.personalInfo?.dateOfBirth
//               ? row?.personalInfo?.dateOfBirth
//               : "---"
//           )
//         ),
//     },
//     {
//       name: "Unique-ID",
//       selector: (row) => row?.uniqueId,
//       sortable: true,
//     },
//     {
//       name: "Email",
//       selector: (row) =>
//         row?.contactAddress?.email ? row?.contactAddress?.email : "---",
//     },
//     {
//       name: "Update",
//       selector: (row) => (
//         <>
//           {row?.employment?.employmentStatus === "approved" && (
//             <Link
//               className="editLink"
//               to={`/sensec/admin/Users/Lecturers/${row.personalInfo?.firstName}_${row.personalInfo?.lastName}/${row.uniqueId}/update`}
//             >
//               <EditIcon />
//             </Link>
//           )}
//           {row?.employment?.employmentStatus === "pending" && (
//             <Link
//               className="editLink"
//               to={`/sensec/admin/Users/Lecturers/${row.personalInfo?.firstName}_${row.personalInfo?.lastName}/${row.uniqueId}/update`}
//             >
//               <EditIcon />
//             </Link>
//           )}
//           {row?.employment?.employmentStatus === "in progress" && (
//             <Link
//               className="editLink"
//               onClick={async () => {
//                 setCurrentStudentId(row);
//               }}
//             >
//               {currentStudentId && currentStudentId?._id === row?._id && (
//                 <>
//                   {loadingComplete === false && "Processing..."}
//                   {loadingComplete &&
//                     currentStudentId?._id === row?._id &&
//                     redirecting && <Redirection color={"#555"} size={"1rem"} />}
//                 </>
//               )}
//               <>
//                 {loadingComplete === null && <AssistantDirectionIcon />}
//                 {row?._id !== currentStudentId?._id &&
//                   loadingComplete !== null && <AssistantDirectionIcon />}
//               </>
//             </Link>
//           )}
//         </>
//       ),
//     },
//   ];
//   return nTStaffsDataFormat;
// };
// const hangingEmploymentsColumn = (
//   setCurrentUser,
//   currentUser,
//   loadingComplete,
//   setLoadingComplete,
//   redirecting
// ) => {
//   const hangingEmploymentsColumn = [
//     {
//       name: "Image",
//       selector: (row) => (
//         <>
//           {row?.role === "admin" && row?.personalInfo?.profilePicture ? (
//             <HashLink
//               to={`/sensec/admin/Users/Admins/${row?.personalInfo?.firstName.replace(
//                 / /g,
//                 "_"
//               )}_${row?.personalInfo?.lastName}/${
//                 row?.uniqueId
//               }/admin_info#adminInfo`}
//               title="View Admin Info"
//             >
//               <img
//                 className="studentImg"
//                 src={
//                   row?.personalInfo
//                     ? row?.personalInfo?.profilePicture?.url
//                     : row?.personalInfo?.profilePicture
//                 }
//                 alt=""
//               />
//             </HashLink>
//           ) : row?.role === "teacher" && row?.personalInfo?.profilePicture ? (
//             <HashLink
//               to={`/sensec/admin/Users/Lecturers/${row?.personalInfo?.firstName.replace(
//                 / /g,
//                 "_"
//               )}_${row?.personalInfo?.lastName}/${
//                 row?.uniqueId
//               }/lecturer_info#teacherInfo`}
//               title="View Teacher's Info"
//             >
//               {!row?.personalInfo?.profilePicture?.url && (
//                 <img
//                   className="studentImg"
//                   src={row?.personalInfo?.profilePicture}
//                   alt=""
//                 />
//               )}
//               {row?.personalInfo?.profilePicture?.url && (
//                 <img
//                   className="studentImg"
//                   src={row?.personalInfo?.profilePicture?.url}
//                   alt=""
//                 />
//               )}
//             </HashLink>
//           ) : row?.role === "NT-Staff" && row?.personalInfo?.profilePicture ? (
//             <HashLink
//               to={`/sensec/admin/Users/NT-Staffs/${row?.personalInfo?.firstName.replace(
//                 / /g,
//                 "_"
//               )}_${row?.personalInfo?.lastName}/${
//                 row?.uniqueId
//               }/nt_staff_info#teacherInfo`}
//               title="View NT-Staff's Info"
//             >
//               {!row?.personalInfo?.profilePicture?.url && (
//                 <img
//                   className="studentImg"
//                   src={row?.personalInfo?.profilePicture}
//                   alt=""
//                 />
//               )}
//               {row?.personalInfo?.profilePicture?.url && (
//                 <img
//                   className="studentImg"
//                   src={row?.personalInfo?.profilePicture?.url}
//                   alt=""
//                 />
//               )}
//             </HashLink>
//           ) : (
//             <HashLink
//               className="noImgLink"
//               to={`/sensec/admin/Users/Admins/${row?.personalInfo?.firstName}_${row?.personalInfo?.lastName}/${row?.personalInfo?.uniqueId}/admin_info#studentInfo`}
//               title="View Admin Info"
//             >
//               {row?.personalInfo?.gender === "Male" && (
//                 <img
//                   className="studentImg"
//                   src={"/assets/maleAvatar.png"}
//                   alt=""
//                 />
//               )}
//               {row?.personalInfo?.gender === "Female" && (
//                 <img
//                   className="studentImg"
//                   src={"/assets/femaleAvatar.png"}
//                   alt=""
//                 />
//               )}
//               {row?.personalInfo?.gender === "" && (
//                 <div className="noImg">
//                   <p>No</p>
//                   <p>Image</p>
//                 </div>
//               )}
//             </HashLink>
//           )}
//         </>
//       ),
//     },
//     {
//       name: "First Name",
//       selector: (row) => row?.personalInfo?.firstName,
//       sortable: true,
//     },
//     { name: "Surname", selector: (row) => row?.personalInfo?.lastName },
//     {
//       name: "Date Of Birth",
//       selector: (row) => (
//         <p
//           title={dateFormatter.format(
//             new Date(
//               row?.personalInfo?.dateOfBirth
//                 ? row?.personalInfo?.dateOfBirth
//                 : "---"
//             )
//           )}
//         >
//           {dateFormatter.format(
//             new Date(
//               row?.personalInfo?.dateOfBirth
//                 ? row?.personalInfo?.dateOfBirth
//                 : "---"
//             )
//           )}
//         </p>
//       ),
//     },
//     {
//       name: "Unique-ID",
//       selector: (row) => <p title={row?.uniqueId}>{row?.uniqueId}</p>,
//       sortable: true,
//     },
//     {
//       name: "Email",
//       selector: (row) => (
//         <p title={row?.contactAddress?.email}>
//           {row?.contactAddress?.email ? row?.contactAddress?.email : "---"}
//         </p>
//       ),
//     },
//     {
//       name: "Redirect",
//       selector: (row) => (
//         <>
//           {row?.employment?.employmentStatus === "in progress" && (
//             <Link
//               className="editLink"
//               onClick={async () => {
//                 setCurrentUser(row);
//               }}
//             >
//               {currentUser && currentUser?._id === row?._id && (
//                 <>
//                   {loadingComplete === false && "Processing..."}
//                   {loadingComplete &&
//                     currentUser?._id === row?._id &&
//                     redirecting && <Redirection color={"#555"} size={"1rem"} />}
//                 </>
//               )}
//               <>
//                 {loadingComplete === null && (
//                   <AssistantDirectionIcon
//                     style={{ fontSize: "1.7rem", color: "#000" }}
//                   />
//                 )}
//                 {row?._id !== currentUser?._id && loadingComplete !== null && (
//                   <AssistantDirectionIcon
//                     style={{ fontSize: "1.7rem", color: "#000" }}
//                   />
//                 )}
//               </>
//             </Link>
//           )}
//         </>
//       ),
//     },
//   ];
//   return hangingEmploymentsColumn;
// };
// const graduatesColumn = () => {
//   const graduatesColumn = [
//     {
//       name: "Image",
//       selector: (row) =>
//         row?.personalInfo?.profilePicture ? (
//           <HashLink
//             to={`/sensec/admin/student_info/${row?.personalInfo?.firstName.replace(
//               / /g,
//               "_"
//             )}_${row?.personalInfo?.lastName}/${row?.uniqueId}#studentInfo`}
//             title="View Student Info"
//           >
//             <img
//               className="studentImg"
//               src={
//                 row?.personalInfo?.profilePicture
//                   ? row?.personalInfo?.profilePicture.url
//                   : "/assets/noAvatar.png"
//               }
//               alt=""
//             />
//           </HashLink>
//         ) : (
//           <HashLink
//             className="noImgLink"
//             to={`/sensec/admin/student_info/${row?.personalInfo?.firstName}_${row?.personalInfo?.lastName}/${row?.personalInfo?.uniqueId}/#studentInfo`}
//             title="View Student Info"
//           >
//             {row?.personalInfo?.gender === "Male" && (
//               <img
//                 className="studentImg"
//                 src={"/assets/maleAvatar.png"}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.gender === "Female" && (
//               <img
//                 className="studentImg"
//                 src={"/assets/femaleAvatar.png"}
//                 alt=""
//               />
//             )}
//             {row?.personalInfo?.gender === "" && (
//               <div className="noImg">
//                 <p>No</p>
//                 <p>Image</p>
//               </div>
//             )}
//           </HashLink>
//         ),
//     },
//     {
//       name: "First Name",
//       selector: (row) => row?.personalInfo?.firstName,
//       sortable: true,
//     },
//     { name: "Surname", selector: (row) => row?.personalInfo?.lastName },
//     {
//       name: "Date Of Birth",
//       selector: (row) =>
//         row?.personalInfo?.dateOfBirth
//           ? dateFormatter.format(new Date(row?.personalInfo?.dateOfBirth))
//           : "---",
//     },
//     {
//       name: "Program",
//       selector: (row) =>
//         row?.studentSchoolData?.program
//           ? row?.studentSchoolData?.program.name
//           : "---",
//     },
//     {
//       name: "Student-ID",
//       selector: (row) => row?.uniqueId,
//       sortable: true,
//     },
//     {
//       name: "Email",
//       selector: (row) =>
//         row?.contactAddress?.email ? row?.contactAddress?.email : "---",
//     },
//     {
//       name: "Enrolled Date",
//       selector: (row) =>
//         row?.studentStatusExtend?.dateEnrolled
//           ? dateFormatter.format(
//               new Date(row?.studentStatusExtend?.dateEnrolled)
//             )
//           : "---",
//     },
//     {
//       name: "Batch",
//       selector: (row) =>
//         row?.studentSchoolData?.batch?.yearRange
//           ? row?.studentSchoolData?.batch?.yearRange
//           : "---",
//     },
//     {
//       name: "Graduate",
//       selector: (row) =>
//         row?.studentStatusExtend?.isGraduated && (
//           <div className="isGraduated" title="Graduated">
//             <SchoolOutlinedIcon />
//           </div>
//         ),
//     },
//   ];
//   return graduatesColumn;
// };

export {
  //   adminsColumn,
  //   hangingAdminsColumn,
  //   pendingAdminsColumn,
  //   teachersColumn,
  //   pendingTeachersColumn,
  //   hangingTeachersColumn,
  studentsColumn,
  pendingStudentsColumn,
  //   courseMatesColumn,
  //   hangingEmploymentsColumn,
  //   graduatesColumn,
  //   nTStaffsColumn,
  //   pendingNTStaffsColumn,
  //   hangingNTStaffsColumn,
};
