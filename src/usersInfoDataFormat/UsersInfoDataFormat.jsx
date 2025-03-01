import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { dateFormatter } from "../dateFormatter/DateFormatter";
import { Avatar, Box, Button, InputAdornment, Typography } from "@mui/material";
import {
  approveStudentEnrollment,
  rejectStudentEnrollment,
} from "../features/students/studentsSlice";
import RejectionModal from "../components/modals/RejectionModal";
import {
  approveEmployee,
  rejectEmployee,
} from "../features/employments/employmentSlice";
import ApprovalModal from "../components/modals/ApprovalModal";
import { promoteStudent } from "../features/students/promotionSlice";
import PromotionsModal from "../components/modals/PromotionsModal";
import DemotionsModal from "../components/modals/DemotionsModal";
import {
  Add,
  Close,
  Edit,
  HowToReg,
  PersonRemove,
  Save,
  SchoolOutlined,
  TaskAlt,
} from "@mui/icons-material";
import { removeClassSectionLecturer } from "../features/academics/classSectionSlice";
import AssignClassLecturerModal from "../components/modals/AssignClassLecturerModal";
import RemoveClassLecturerModal from "../components/modals/RemoveClassLecturerModal";
import { CustomTextField } from "../muiStyling/muiStyling";
import { createStudentReport } from "../features/reports/reportSlice";
import { toast } from "react-toastify";
import { color } from "framer-motion";
import { FetchAllFlattenedProgrammes } from "../data/programme/FetchProgrammeData";

const adminsColumn = (authAdmin) => {
  const adminsColumn = [
    {
      name: "Image",
      selector: (row) =>
        row?.personalInfo?.profilePicture ? (
          <HashLink
            to={`/sensec/admin/Users/Admins/${row?.personalInfo?.firstName.replace(
              / /g,
              "_"
            )}_${row?.personalInfo?.lastName}/${
              row?.uniqueId
            }/admin_info#studentInfo`}
            title="View Admin Info"
          >
            <Avatar
              // className="studentImg"
              src={
                row?.personalInfo
                  ? row?.personalInfo?.profilePicture?.url
                  : row?.personalInfo?.profilePicture
              }
              sx={{
                width: "1.5em",
                height: "1.5em",
                borderRadius: ".4rem",
                objectFit: "cover",
              }}
              alt=""
            />
          </HashLink>
        ) : (
          <HashLink
            className="noImgLink"
            to={`/sensec/admin/Users/Admins/${row?.personalInfo?.firstName}_${row?.personalInfo?.lastName}/${row?.personalInfo?.uniqueId}/admin_info#studentInfo`}
            title="View Admin Info"
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
      selector: (row) => {
        if (!row?.personalInfo?.dateOfBirth) return "---";
        const date = new Date(row?.personalInfo?.dateOfBirth);
        // Adjust for timezones explicitly if needed
        const utcDate = new Date(
          date.getTime() + date.getTimezoneOffset() * 60000
        );
        return (
          <p title={dateFormatter.format(utcDate)}>
            {dateFormatter.format(utcDate)}
          </p>
        );
      },
    },
    {
      name: "Unique-ID",
      selector: (row) => <p title={row?.uniqueId}>{row?.uniqueId}</p>,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => (
        <p title={row?.contactAddress?.email}>
          {row?.contactAddress?.email ? row?.contactAddress?.email : "---"}
        </p>
      ),
    },
    {
      name: "Date Employed",
      selector: (row) =>
        !row?.employment?.createdAt
          ? "---"
          : dateFormatter?.format(
              new Date(row?.employment?.employmentApprovedDate)
            ),
    },
    {
      name: "Update",
      selector: (row) => (
        <>
          {row?.employment?.employmentStatus === "approved" && (
            <Link
              className="editLink"
              to={`/sensec/users/${authAdmin.uniqueId}/admin/Admins/${row.uniqueId}/admin_update`}
            >
              <Edit style={{ fontSize: "1.5em" }} />
            </Link>
          )}
        </>
      ),
    },
  ];
  return adminsColumn;
};
const pendingAdminsColumn = (columnObjData) => {
  const pendingAdminsColumn = [
    {
      name: "Image",
      selector: (row) =>
        row?.personalInfo?.profilePicture ? (
          <HashLink
            to={`/sensec/admin/Users/Admins/${row?.personalInfo?.firstName.replace(
              / /g,
              "_"
            )}_${row?.personalInfo?.lastName}/${
              row?.uniqueId
            }/admin_info#studentInfo`}
            title="View Admin Info"
          >
            <Avatar
              // className="studentImg"
              src={
                row?.personalInfo
                  ? row?.personalInfo?.profilePicture?.url
                  : row?.personalInfo?.profilePicture
              }
              sx={{
                width: "1.5em",
                height: "1.5em",
                borderRadius: ".4rem",
                objectFit: "cover",
              }}
              alt=""
            />
          </HashLink>
        ) : (
          <HashLink
            className="noImgLink"
            to={`/sensec/admin/Users/Admins/${row?.personalInfo?.firstName}_${row?.personalInfo?.lastName}/${row?.personalInfo?.uniqueId}/admin_info#studentInfo`}
            title="View Admin Info"
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
      selector: (row) => {
        if (!row?.personalInfo?.dateOfBirth) return "---";
        const date = new Date(row?.personalInfo?.dateOfBirth);
        // Adjust for timezones explicitly if needed
        const utcDate = new Date(
          date.getTime() + date.getTimezoneOffset() * 60000
        );
        return (
          <p title={dateFormatter.format(utcDate)}>
            {dateFormatter.format(utcDate)}
          </p>
        );
      },
    },
    {
      name: "Unique-ID",
      selector: (row) => <p title={row?.uniqueId}>{row?.uniqueId}</p>,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => (
        <p title={row?.contactAddress?.email}>
          {row?.contactAddress?.email ? row?.contactAddress?.email : "---"}
        </p>
      ),
    },
    {
      name: "Date Processed",
      selector: (row) => (
        <p
          title={
            row?.employment
              ? dateFormatter.format(new Date(row?.employment?.createdAt))
              : "---"
          }
        >
          {row?.employment
            ? dateFormatter.format(new Date(row?.employment?.createdAt))
            : "---"}
        </p>
      ),
    },
    {
      name: "Update",
      selector: (row) => (
        <Link
          className="editLink"
          to={`/sensec/users/${columnObjData?.authAdmin.uniqueId}/admin/Admins/${row.uniqueId}/admin_update`}
        >
          <Edit style={{ fontSize: "1.5em" }} />
        </Link>
      ),
    },
    {
      name: "Approve",
      selector: (row) =>
        row?.employment?.employmentStatus === "pending" && (
          <>
            <HashLink
              className="approveLink"
              onClick={async () => {
                // Do not open modal if approval/rejection is in progress
                if (
                  !columnObjData?.rejectionInProgress &&
                  !columnObjData?.approvalInProgress
                ) {
                  columnObjData?.setCurrentAdmin(row?._id);
                  columnObjData?.setOpenApproveEmploymentModal(true);
                  columnObjData?.setOpenRejectModal(false);
                }
              }}
            >
              {columnObjData?.foundAdmin &&
                columnObjData?.foundAdmin._id === row._id && (
                  <>
                    {columnObjData?.loadingComplete === false && (
                      <Box
                        className="promotionSpinner"
                        sx={{
                          marginTop: ".7rem",
                        }}
                      >
                        <p>Processing</p>
                        {/* <CircularProgress style={{ color: "#555" }} size={"1.3em"} /> */}
                        <span className="dot-ellipsis">
                          <span className="dot">.</span>
                          <span className="dot">.</span>
                          <span className="dot">.</span>
                        </span>
                      </Box>
                    )}
                    {columnObjData?.loadingComplete &&
                      columnObjData?.approveEmploymentStatus === "success" && (
                        <>
                          <span>Approved</span> <TaskAlt />
                        </>
                      )}
                  </>
                )}
              <>
                {columnObjData?.loadingComplete === null && (
                  <HowToReg
                    titleAccess="Approve Employment"
                    style={{ fontSize: "2rem" }}
                  />
                )}
                {row?._id !== columnObjData?.foundAdmin?._id &&
                  columnObjData?.loadingComplete !== null && (
                    <HowToReg
                      titleAccess="Approve Employment"
                      style={{ fontSize: "2rem" }}
                    />
                  )}
              </>
            </HashLink>
            {columnObjData?.foundAdmin &&
              columnObjData?.foundAdmin._id === row._id && (
                <ApprovalModal
                  open={columnObjData?.openApproveEmploymentModal}
                  onClose={async () =>
                    columnObjData?.setOpenApproveEmploymentModal(false)
                  }
                  approvalFunction={approveEmployee({
                    employeeId: row?.uniqueId,
                    employmentApprovedBy: columnObjData?.authAdmin?.id,
                  })}
                  setLoadingComplete={columnObjData?.setLoadingComplete}
                  setSelectedUserToApprove={columnObjData?.setCurrentAdmin}
                  selectedUserToApproveId={row?._id}
                  userDataToApprove={columnObjData?.foundAdmin}
                  userDataToReject={columnObjData?.adminToReject}
                />
              )}
          </>
        ),
    },
    {
      name: "Reject",
      selector: (row) =>
        row?.employment?.employmentStatus === "pending" && (
          <HashLink
            className="rejectLink"
            onClick={async () => {
              // Do not open modal if rejection/approval is in progress
              if (
                !columnObjData?.approvalInProgress &&
                !columnObjData?.rejectionInProgress
              ) {
                columnObjData?.setRejectAdmin(row._id);
                columnObjData?.setOpenRejectModal(true);
                columnObjData?.setOpenApproveEmploymentModal(false);
              }
            }}
          >
            {columnObjData?.rejectLoadingComplete === null && (
              <PersonRemove
                titleAccess="Reject Employment"
                style={{ fontSize: "2rem" }}
              />
            )}
            {row?._id !== columnObjData?.adminToReject?._id &&
              columnObjData?.rejectLoadingComplete !== null && (
                <PersonRemove
                  titleAccess="Reject Employment"
                  style={{ fontSize: "2rem" }}
                />
              )}
            {columnObjData?.adminToReject &&
              columnObjData?.adminToReject._id === row?._id && (
                <>
                  {columnObjData?.rejectLoadingComplete === false && (
                    <Box
                      className="promotionSpinner"
                      sx={{
                        marginTop: ".7rem",
                      }}
                    >
                      <p>Processing</p>
                      {/* <CircularProgress style={{ color: "#555" }} size={"1.3em"} /> */}
                      <span className="dot-ellipsis">
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                      </span>
                    </Box>
                  )}
                  {columnObjData?.rejectLoadingComplete &&
                    columnObjData?.rejectEmploymentStatus === "success" && (
                      <>
                        <span>Rejected</span> <TaskAlt />
                      </>
                    )}
                  <RejectionModal
                    open={columnObjData?.openRejectModal}
                    onClose={() => columnObjData?.setOpenRejectModal(false)}
                    rejectionFunction={rejectEmployee({
                      employeeId: row?.uniqueId,
                      employmentRejectedBy: columnObjData?.authAdmin?.id,
                    })}
                    setLoadingComplete={columnObjData?.setRejectLoadingComplete}
                    setSelectedUserToReject={columnObjData?.setRejectAdmin}
                    selectedUserToRejectId={row?._id}
                    userDataToApprove={columnObjData?.foundAdmin}
                    userDataToReject={columnObjData?.adminToReject}
                  />
                </>
              )}
          </HashLink>
        ),
    },
  ];
  return pendingAdminsColumn;
};
const studentsColumn = (columnData) => {
  const studentColumn = [
    {
      name: "Image",
      selector: (row) =>
        row?.personalInfo?.profilePicture ? (
          <Box>
            <HashLink
              to={`/sensec/admin/${columnData?.adminCurrentAction}/${
                columnData?.adminCurrentLink
              }/${row?.personalInfo?.firstName?.replace(/ /g, "_")}_${
                row?.personalInfo?.lastName
              }/${row?.uniqueId}/student_info#studentInfo`}
              title="View Student Info"
            >
              <Avatar
                // className="studentImg"
                src={
                  row?.personalInfo?.profilePicture?.url
                    ? row?.personalInfo?.profilePicture?.url
                    : row?.personalInfo?.profilePicture
                }
                sx={{
                  width: "1.5em",
                  height: "1.5em",
                  borderRadius: ".4rem",
                  objectFit: "cover",
                }}
                alt=""
              />
            </HashLink>
          </Box>
        ) : (
          <HashLink
            className="noImgLink"
            to={`/sensec/admin/${columnData?.adminCurrentAction}/${
              columnData?.adminCurrentLink
            }/${row?.personalInfo?.firstName?.replace(/ /g, "_")}_${
              row?.personalInfo?.lastName
            }/${row?.personalInfo?.uniqueId}/student_info#studentInfo`}
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
      name: "Full Name",
      selector: (row) => (
        <Box>
          <p>{row?.personalInfo?.fullName}</p>
        </Box>
      ),
      sortable: true,
    },
    {
      name: "Date Of Birth",
      selector: (row) => {
        if (!row?.personalInfo?.dateOfBirth) return "---";
        const date = new Date(row?.personalInfo?.dateOfBirth);
        // Adjust for timezones explicitly if needed
        const utcDate = new Date(
          date.getTime() + date.getTimezoneOffset() * 60000
        );
        return (
          <Box>
            <p title={dateFormatter.format(utcDate)}>
              {dateFormatter.format(utcDate)}
            </p>
          </Box>
        );
      },
    },
    {
      name: "Programme",
      selector: (row) => {
        const allFlattenedProgrammes = FetchAllFlattenedProgrammes();
        const studentProgramFound = allFlattenedProgrammes?.find(
          (program) =>
            program?._id === row.studentSchoolData?.program?.programId
        );
        if (studentProgramFound) {
          return (
            <Box>
              <p
                title={
                  studentProgramFound?.name
                    ? studentProgramFound?.name
                    : studentProgramFound?.divisionName
                }
              >
                {studentProgramFound?.name
                  ? studentProgramFound?.name
                  : studentProgramFound?.divisionName}
              </p>
            </Box>
          );
        }
        return "---";
      },
    },
    {
      name: "Student-ID",
      selector: (row) => (
        <Box>
          <p>{row?.uniqueId}</p>
        </Box>
      ),
      sortable: true,
    },
    // {
    //   name: "Email",
    //   selector: (row) =>
    //     row?.contactAddress?.email ? row?.contactAddress?.email : "---",
    // },
    // {
    //   name: "Enrolled Date",
    //   selector: (row) =>
    //     dateFormatter.format(new Date(row?.studentStatusExtend?.dateEnrolled)),
    // },
    {
      name: "Batch",
      selector: (row) => (
        <Box>
          <p>
            {row.studentSchoolData?.batch?.yearRange
              ? `${row?.studentSchoolData?.batch?.yearRange.replace(/-/g, "/")}`
              : "---"}
          </p>
        </Box>
      ),
    },
    {
      name: "Level",
      selector: (row) =>
        row.studentSchoolData?.currentClassLevel && (
          <Box className="tableClassLevel">
            {row.studentSchoolData?.currentClassLevel?.name === "Level 100" && (
              <p
                // style={{
                //   fontSize: ".7em",
                //   backgroundColor: "#da076d",
                //   width: "1em",
                //   height: "1em",
                //   display: "flex",
                //   justifyContent: "center",
                //   alignItems: "center",
                //   padding: ".7em",
                //   borderRadius: "50%",
                //   color: "#fff",
                // }}
                className="firstYearTag"
                title="1st Year"
              >
                1
              </p>
            )}
            {row.studentSchoolData?.currentClassLevel?.name === "Level 200" && (
              <p className="secondYearTag" title="2nd Year">
                2
              </p>
            )}
            {row.studentSchoolData?.currentClassLevel?.name === "Level 300" &&
              !row.isGraduated && (
                <p className="thirdYearTag" title="3rd Year">
                  3
                </p>
              )}
            {row.isGraduated && (
              <p className="isGraduated" title="Graduated">
                <SchoolOutlined />
              </p>
            )}
          </Box>
        ),
    },
    {
      name: "Promote",
      selector: (row) => {
        const disableBtn = Boolean(columnData?.isProgramStudents);
        if (row?.studentSchoolData?.currentClassLevel) {
          return (
            <Box>
              {row?.studentSchoolData?.currentClassLevel?.name ===
                "Level 100" && (
                <>
                  <Button
                    disabled={!disableBtn}
                    // size="small"
                    sx={{
                      fontSize: ".9em",
                      textTransform: "capitalize",
                      ":hover": {
                        backgroundColor: "transparent",
                      },
                      color: !disableBtn ? "grey" : "#03950a !important",
                      "&.Mui-disabled": {
                        cursor: "not-allowed", // Show not-allowed cursor
                        pointerEvents: "auto",
                      },
                    }}
                    // className="approveLink"

                    onClick={async () => {
                      // Do not open modal if approval/rejection is in progress
                      if (
                        !columnData?.demotionInProgress &&
                        !columnData?.promotionInProgress
                      ) {
                        columnData?.setCurrentStudent(row._id);
                        columnData?.setOpenPromotionModal(true);
                        columnData?.setOpenDemotionModal(false);
                      }
                    }}
                  >
                    {columnData?.studentToPromote &&
                      columnData?.studentToPromote._id === row._id && (
                        <>
                          {columnData?.loadingComplete === false && (
                            <Box
                              className="promotionSpinner"
                              sx={{
                                marginTop: ".8rem",
                              }}
                            >
                              <span>Processing</span>
                              <span className="dot-ellipsis">
                                <span className="dot">.</span>
                                <span className="dot">.</span>
                                <span className="dot">.</span>
                              </span>
                            </Box>
                          )}
                          {columnData?.loadingComplete &&
                            columnData?.promotionStatus === "success" && (
                              <>
                                <span>Promoted</span> <TaskAlt />
                              </>
                            )}
                        </>
                      )}
                    <>
                      {columnData?.loadingComplete === null && "P-L200"}
                      {row._id !== columnData?.studentToPromote?._id &&
                        columnData?.loadingComplete !== null &&
                        "P-L200"}
                    </>
                  </Button>
                  {columnData?.studentToPromote &&
                    columnData?.studentToPromote._id === row._id && (
                      <PromotionsModal
                        open={columnData?.openPromotionModal}
                        onClose={() => columnData?.setOpenPromotionModal(false)}
                        promotionFunction={promoteStudent({
                          studentId: row?.uniqueId,
                          lastPromotedBy: `${columnData?.authAdmin?.id}`,
                        })}
                        setLoadingComplete={columnData?.setLoadingComplete}
                        setSelectedUserToPromote={columnData?.setCurrentStudent}
                        selectedUserToPromoteId={row?._id}
                        userDataToPromote={columnData?.studentToPromote}
                        userDataToDemote={columnData?.studentToDemote}
                      />
                    )}
                </>
              )}
              {row?.studentSchoolData?.currentClassLevel?.name ===
                "Level 200" && (
                <>
                  <Button
                    disabled={!disableBtn}
                    // size="small"
                    sx={{
                      fontSize: ".9em",
                      textTransform: "capitalize",
                      ":hover": {
                        backgroundColor: "transparent",
                      },
                      color: !disableBtn ? "grey" : "#03950a !important",
                      "&.Mui-disabled": {
                        cursor: "not-allowed", // Show not-allowed cursor
                        pointerEvents: "auto",
                      },
                    }}
                    // className="approveLink"
                    onClick={async () => {
                      // Do not open modal if approval/rejection is in progress
                      if (
                        !columnData?.demotionInProgress &&
                        !columnData?.promotionInProgress
                      ) {
                        columnData?.setCurrentStudent(row._id);
                        columnData?.setOpenPromotionModal(true);
                        columnData?.setOpenDemotionModal(false);
                      }
                    }}
                  >
                    {columnData?.studentToPromote &&
                      columnData?.studentToPromote._id === row._id && (
                        <>
                          {columnData?.loadingComplete === false && (
                            <Box
                              className="promotionSpinner"
                              sx={{
                                marginTop: ".8rem",
                              }}
                            >
                              <span>Processing</span>
                              <span className="dot-ellipsis">
                                <span className="dot">.</span>
                                <span className="dot">.</span>
                                <span className="dot">.</span>
                              </span>
                            </Box>
                          )}
                          {columnData?.loadingComplete &&
                            columnData?.promotionStatus === "success" && (
                              <>
                                <span>Promoted</span> <TaskAlt />
                              </>
                            )}
                        </>
                      )}
                    <>
                      {columnData?.loadingComplete === null && "P-L300"}
                      {row._id !== columnData?.studentToPromote?._id &&
                        columnData?.loadingComplete !== null &&
                        "P-L300"}
                    </>
                  </Button>
                  {columnData?.studentToPromote &&
                    columnData?.studentToPromote._id === row._id && (
                      <PromotionsModal
                        open={columnData?.openPromotionModal}
                        onClose={() => columnData?.setOpenPromotionModal(false)}
                        promotionFunction={promoteStudent({
                          studentId: row?.uniqueId,
                          lastPromotedBy: `${columnData?.authAdmin?.id}`,
                        })}
                        setLoadingComplete={columnData?.setLoadingComplete}
                        setSelectedUserToPromote={columnData?.setCurrentStudent}
                        selectedUserToPromoteId={row?._id}
                        userDataToPromote={columnData?.studentToPromote}
                        userDataToDemote={columnData?.studentToDemote}
                      />
                    )}
                </>
              )}
              {row?.studentSchoolData?.currentClassLevel?.name ===
                "Level 300" && (
                <>
                  <Button
                    disabled={!disableBtn}
                    // size="small"
                    sx={{
                      fontSize: ".9em",
                      textTransform: "capitalize",
                      ":hover": {
                        backgroundColor: "transparent",
                      },
                      color: !disableBtn ? "grey" : "#03950a !important",
                      "&.Mui-disabled": {
                        cursor: "not-allowed", // Show not-allowed cursor
                        pointerEvents: "auto",
                      },
                    }}
                    // className="approveLink"
                    onClick={async () => {
                      // Do not open modal if approval/rejection is in progress
                      if (
                        !columnData?.demotionInProgress &&
                        !columnData?.promotionInProgress
                      ) {
                        columnData?.setCurrentStudent(row._id);
                        columnData?.setOpenPromotionModal(true);
                        columnData?.setOpenDemotionModal(false);
                      }
                    }}
                  >
                    {columnData?.studentToPromote &&
                      columnData?.studentToPromote._id === row._id && (
                        <>
                          {columnData?.loadingComplete === false && (
                            <Box
                              className="promotionSpinner"
                              sx={{
                                marginTop: ".8rem",
                              }}
                            >
                              <span>Processing</span>
                              <span className="dot-ellipsis">
                                <span className="dot">.</span>
                                <span className="dot">.</span>
                                <span className="dot">.</span>
                              </span>
                            </Box>
                          )}
                          {columnData?.loadingComplete &&
                            columnData?.promotionStatus === "success" && (
                              <>
                                <span>Promoted</span> <TaskAlt />
                              </>
                            )}
                        </>
                      )}
                    <>
                      {columnData?.loadingComplete === null && "Graduate"}
                      {row._id !== columnData?.studentToPromote?._id &&
                        columnData?.loadingComplete !== null &&
                        "Graduate"}
                    </>
                  </Button>
                  {columnData?.studentToPromote &&
                    columnData?.studentToPromote._id === row._id && (
                      <PromotionsModal
                        open={columnData?.openPromotionModal}
                        onClose={() => columnData?.setOpenPromotionModal(false)}
                        promotionFunction={promoteStudent({
                          studentId: row?.uniqueId,
                          lastPromotedBy: `${columnData?.authAdmin?.id}`,
                        })}
                        setLoadingComplete={columnData?.setLoadingComplete}
                        setSelectedUserToPromote={columnData?.setCurrentStudent}
                        selectedUserToPromoteId={row?._id}
                        userDataToPromote={columnData?.studentToPromote}
                        userDataToDemote={columnData?.studentToDemote}
                      />
                    )}
                </>
              )}
            </Box>
          );
        }
      },
    },
    // {
    //   name: "Demote",
    //   selector: (row) =>
    //     row?.studentSchoolData?.currentClassLevel && (
    //       <>
    //         {row?.studentSchoolData?.currentClassLevel?.name ===
    //           "Level 100" && (
    //           <>
    //             <HashLink
    //               to={"#"}
    //               className="approveLink"
    //               style={{ color: "#696969" }}
    //             >
    //               {columnData?.demotionLoadingComplete === null &&
    //                 row?.studentSchoolData?.currentClassLevel?.name ===
    //                   "Level 100" &&
    //                 "---"}
    //               {row._id !== columnData?.studentToDemote?._id &&
    //                 columnData?.demotionLoadingComplete !== null &&
    //                 row?.studentSchoolData?.currentClassLevel?.name ===
    //                   "Level 100" &&
    //                 "---"}
    //             </HashLink>
    //             {columnData?.studentToDemote &&
    //               columnData?.studentToDemote._id === row._id && (
    //                 <DemotionsModal
    //                   open={columnData?.openDemotionModal}
    //                   onClose={() => columnData?.setOpenDemotionModal(false)}
    //                   promotionFunction={approveStudentEnrollment({
    //                     studentId: row?.uniqueId,
    //                     enrollmentApprovedBy: `${columnData?.authAdmin?.id}`,
    //                   })}
    //                   setLoadingComplete={
    //                     columnData?.setDemotionLoadingComplete
    //                   }
    //                   setSelectedUserToDemote={columnData?.setDemoteStudent}
    //                   selectedUserToDemoteId={row?._id}
    //                   userDataToPromote={columnData?.studentToPromote}
    //                   userDataToDemote={columnData?.studentToDemote}
    //                 />
    //               )}
    //           </>
    //         )}
    //         {row?.studentSchoolData?.currentClassLevel?.name ===
    //           "Level 200" && (
    //           <>
    //             <HashLink
    //               to={"#"}
    //               className="approveLink"
    //               onClick={async () => {
    //                 // Do not open modal if approval/rejection is in progress
    //                 if (
    //                   !columnData?.demotionInProgress &&
    //                   !columnData?.promotionInProgress
    //                 ) {
    //                   columnData?.setDemoteStudent(row._id);
    //                   columnData?.setOpenDemotionModal(true);
    //                   columnData?.setOpenPromotionModal(false);
    //                 }
    //               }}
    //               style={{ color: "#696969" }}
    //             >
    //               {columnData?.studentToDemote &&
    //                 columnData?.studentToDemote._id === row._id && (
    //                   <>
    //                     {columnData?.demotionLoadingComplete === false && (
    //                       <Box
    //                         className="promotionSpinner"
    //                         sx={{
    //                           marginTop: ".8rem",
    //                           color: "red",
    //                         }}
    //                       >
    //                         <span>Processing</span>
    //                         <span className="dot-ellipsis">
    //                           <span className="dot">.</span>
    //                           <span className="dot">.</span>
    //                           <span className="dot">.</span>
    //                         </span>
    //                       </Box>
    //                     )}
    //                     {columnData?.demotionLoadingComplete &&
    //                       columnData?.promotionStatus === "success" && (
    //                         <>
    //                           <span>Demoted</span> <TaskAlt />
    //                         </>
    //                       )}
    //                   </>
    //                 )}
    //               <>
    //                 {columnData?.demotionLoadingComplete === null &&
    //                   row?.studentSchoolData?.currentClassLevel?.name ===
    //                     "Level 200" &&
    //                   "D-L100"}
    //                 {row._id !== columnData?.studentToDemote?._id &&
    //                   columnData?.demotionLoadingComplete !== null &&
    //                   row?.studentSchoolData?.currentClassLevel?.name ===
    //                     "Level 200" &&
    //                   "D-L100"}
    //               </>
    //             </HashLink>
    //             {columnData?.studentToDemote &&
    //               columnData?.studentToDemote._id === row._id && (
    //                 <DemotionsModal
    //                   open={columnData?.openDemotionModal}
    //                   onClose={() => columnData?.setOpenDemotionModal(false)}
    //                   promotionFunction={approveStudentEnrollment({
    //                     studentId: row?.uniqueId,
    //                     enrollmentApprovedBy: `${columnData?.authAdmin?.id}`,
    //                   })}
    //                   setLoadingComplete={
    //                     columnData?.setDemotionLoadingComplete
    //                   }
    //                   setSelectedUserToDemote={columnData?.setDemoteStudent}
    //                   selectedUserToDemoteId={row?._id}
    //                   userDataToPromote={columnData?.studentToPromote}
    //                   userDataToDemote={columnData?.studentToDemote}
    //                 />
    //               )}
    //           </>
    //         )}
    //         {row?.studentSchoolData?.currentClassLevel?.name ===
    //           "Level 300" && (
    //           <>
    //             <HashLink
    //               to={"#"}
    //               className="approveLink"
    //               onClick={async () => {
    //                 // Do not open modal if approval/rejection is in progress
    //                 if (
    //                   !columnData?.demotionInProgress &&
    //                   !columnData?.promotionInProgress
    //                 ) {
    //                   columnData?.setDemoteStudent(row._id);
    //                   columnData?.setOpenDemotionModal(true);
    //                   columnData?.setOpenPromotionModal(false);
    //                 }
    //               }}
    //               style={{ color: "#696969" }}
    //             >
    //               {columnData?.studentToDemote &&
    //                 columnData?.studentToDemote._id === row._id && (
    //                   <>
    //                     {columnData?.demotionLoadingComplete === false && (
    //                       <Box
    //                         className="promotionSpinner"
    //                         sx={{
    //                           marginTop: ".8rem",
    //                           color: "red",
    //                         }}
    //                       >
    //                         <span>Processing</span>
    //                         <span className="dot-ellipsis">
    //                           <span className="dot">.</span>
    //                           <span className="dot">.</span>
    //                           <span className="dot">.</span>
    //                         </span>
    //                       </Box>
    //                     )}
    //                     {columnData?.demotionLoadingComplete &&
    //                       columnData?.promotionStatus === "success" && (
    //                         <>
    //                           <span>Demoted</span> <TaskAlt />
    //                         </>
    //                       )}
    //                   </>
    //                 )}
    //               <>
    //                 {columnData?.demotionLoadingComplete === null &&
    //                   row?.studentSchoolData?.currentClassLevel?.name ===
    //                     "Level 300" &&
    //                   "D-L200"}
    //                 {row._id !== columnData?.studentToDemote?._id &&
    //                   columnData?.demotionLoadingComplete !== null &&
    //                   row?.studentSchoolData?.currentClassLevel?.name ===
    //                     "Level 300" &&
    //                   "D-L200"}
    //               </>
    //             </HashLink>
    //             {columnData?.studentToDemote &&
    //               columnData?.studentToDemote._id === row._id && (
    //                 <DemotionsModal
    //                   open={columnData?.openDemotionModal}
    //                   onClose={() => columnData?.setOpenDemotionModal(false)}
    //                   promotionFunction={approveStudentEnrollment({
    //                     studentId: row?.uniqueId,
    //                     enrollmentApprovedBy: `${columnData?.authAdmin?.id}`,
    //                   })}
    //                   setLoadingComplete={
    //                     columnData?.setDemotionLoadingComplete
    //                   }
    //                   setSelectedUserToDemote={columnData?.setDemoteStudent}
    //                   selectedUserToDemoteId={row?._id}
    //                   userDataToPromote={columnData?.studentToPromote}
    //                   userDataToDemote={columnData?.studentToDemote}
    //                 />
    //               )}
    //           </>
    //         )}
    //       </>
    //     ),
    // },
    {
      name: "Update",
      selector: (row) => (
        <Link
          className="editLink"
          to={`/sensec/users/${columnData?.authAdmin?.uniqueId}/admin/Students/${row.uniqueId}/student_update`}
        >
          <Box>
            <Edit style={{ fontSize: "1.5em" }} />
          </Box>
        </Link>
      ),
    },
  ];
  return studentColumn;
};
const studentsReportColumn = (columnData) => {
  // console.log(columnData);

  const studentColumn = [
    {
      name: "Image",
      selector: (row) =>
        row?.personalInfo?.profilePicture?.url ? (
          <HashLink
            // to={`/sensec/admin/${columnData?.adminCurrentAction}/${
            //   columnData?.adminCurrentLink
            // }/${row?.personalInfo?.firstName?.replace(/ /g, "_")}_${
            //   row?.personalInfo?.lastName
            // }/${row?.uniqueId}/student_info#studentInfo`}
            title="View Student Info"
          >
            <Avatar
              // className="studentImg"
              src={
                row?.personalInfo
                  ? row?.personalInfo?.profilePicture?.url
                  : row?.personalInfo?.profilePicture
              }
              sx={{
                width: "1.5em",
                height: "1.5em",
                borderRadius: ".4rem",
                objectFit: "cover",
              }}
              alt=""
            />
          </HashLink>
        ) : (
          <HashLink
            className="noImgLink"
            // to={`/sensec/admin/${columnData?.adminCurrentAction}/${
            //   columnData?.adminCurrentLink
            // }/${row?.personalInfo?.firstName?.replace(/ /g, "_")}_${
            //   row?.personalInfo?.lastName
            // }/${row?.personalInfo?.uniqueId}/student_info#studentInfo`}
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
      name: "Full Name",
      selector: (row) => (
        <Box fontSize={".9em"} color={"#696969"}>
          {row?.personalInfo?.fullName}
        </Box>
      ),
      sortable: true,
    },
    {
      name: "Class Score",
      selector: (row) => (
        <CustomTextField
          type="number"
          name="classScore"
          value={row.classScore || ""}
          size="small"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment
                  position="start"
                  sx={{
                    width: ".5rem",
                    // fontSize: ".7em", // Adjust font size of the adornment
                    marginLeft: "0.2rem", // Prevent overlap with input
                    color: "#555",
                  }}
                >
                  <Typography sx={{ fontSize: "0.75rem", color: "#af0bd8" }}>
                    /30
                  </Typography>
                </InputAdornment>
              ),
              sx: {
                color: "#555",
                // paddingRight: "1rem", // Add padding for increment icons
                // textAlign: "center", // Center the input text
              },
            },
          }}
          onChange={(e) =>
            columnData?.handleScoreChange(
              row.uniqueId,
              "classScore",
              e.target.value
            )
          }
          sx={{
            width: "5rem",
            // textAlign: "center",
            ".MuiInputBase-root": {
              display: "flex",
              alignItems: "center",
            },
            fontSize: ".9em",
          }}
        />
      ),
    },
    {
      name: "Exam Score",
      selector: (row) => (
        <CustomTextField
          type="number"
          name="examScore"
          value={row.examScore || ""}
          size="small"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment
                  position="start"
                  sx={{
                    width: ".5rem",
                    // fontSize: ".7em", // Adjust font size of the adornment
                    marginLeft: "0.2rem", // Prevent overlap with input
                    color: "#555",
                  }}
                >
                  <Typography sx={{ fontSize: "0.75rem", color: "#0b94d8" }}>
                    /70
                  </Typography>
                </InputAdornment>
              ),
              sx: {
                color: "#555",
                // paddingRight: "1rem", // Add padding for increment icons
                // textAlign: "center", // Center the input text
              },
            },
          }}
          onChange={(e) =>
            columnData?.handleScoreChange(
              row.uniqueId,
              "examScore",
              e.target.value
            )
          }
          sx={{
            width: "5rem",
            // textAlign: "center",
            ".MuiInputBase-root": {
              display: "flex",
              alignItems: "center",
            },
            fontSize: ".9em",
          }}
        />
      ),
    },
    {
      name: "Total Score",
      selector: (row) => <Box fontSize={".9em"}>{row.totalScore || 0}</Box>,
      // sortable: true,
    },
    {
      name: "Grade",
      selector: (row) => {
        const getGrade = columnData?.calculateGrade(row?.totalScore || 0);
        return (
          <Box
            bgcolor={columnData?.gradeBgColor(getGrade)}
            sx={{
              padding: ".2rem",
              borderRadius: ".4rem",
              color: "#fff",
              fontSize: ".9em",
            }}
          >
            {columnData?.calculateGrade(row.totalScore || 0)}
          </Box>
        );
      },
    },
    {
      name: "Remark",
      selector: (row) => {
        const getGrade = columnData?.calculateGrade(row?.totalScore || 0);
        return (
          <Box
            sx={{
              padding: ".2rem",
              borderRadius: ".4rem",
              // color: "#fff",
              fontSize: ".9em",
              fontWeight: "bold",
              letterSpacing: 1,
              color: columnData?.gradeBgColor(getGrade),
            }}
          >
            {columnData?.gradeRemark(row.totalScore || 0)}
          </Box>
          // <>
          //   {!columnData?.subjectMultiStudentsReports ? (
          //     <Button
          //       size="small"
          //       sx={{
          //         padding: ".2rem",
          //         borderRadius: ".4rem",
          //         color: "#0ab312",
          //         fontSize: ".9em",
          //         textTransform: "capitalize",
          //         ":hover": {
          //           backgroundColor: "transparent",
          //         },
          //       }}
          //       onClick={() => {
          //         columnData?.setStudentId(row?.uniqueId);
          //         columnData?.setOpenRemarkModal(true);
          //       }}
          //     >
          //       {!row?.remark ? (
          //         <>
          //           Add <Add fontSize=".8em" />
          //         </>
          //       ) : (
          //         <Edit style={{ color: "#696969" }} />
          //       )}
          //     </Button>
          //   ) : (
          //     "---"
          //   )}
          // </>
        );
      },
    },
    {
      name: "Save",
      selector: (row) => {
        const disableBtn = Boolean(
          columnData?.subjectMultiStudentsReports &&
            columnData?.subjectMultiStudentsReports?.subject ===
              columnData?.draftReportInfo?.subject
        );
        return (
          <Button
            disabled={disableBtn}
            // sx={{
            //   // color: "#fff !important",
            //   "&.Mui-disabled": {
            //     cursor: "not-allowed", // Show not-allowed cursor
            //     pointerEvents: "auto",
            //   },
            // }}
            sx={{
              textTransform: "capitalize",
              ":hover": {
                backgroundColor: "transparent",
              },
              color:
                columnData?.subjectMultiStudentsReports &&
                columnData?.subjectMultiStudentsReports?.subject ===
                  columnData?.draftReportInfo?.subject
                  ? ""
                  : "#03950a !important",
              "&.Mui-disabled": {
                cursor: "not-allowed", // Show not-allowed cursor
                pointerEvents: "auto",
              },
            }}
            // className="editLink"
            onClick={async () => {
              // Only set current student if data saving is not in progress
              if (!columnData?.saveDataInProgress) {
                columnData?.setCurrentStudent(row._id);
              }
            }}
          >
            {columnData?.foundStudent &&
              columnData?.foundStudent._id === row._id && (
                <>
                  {columnData?.loadingComplete === false && (
                    <Box
                      className="promotionSpinner"
                      sx={{
                        // marginTop: ".8rem",
                        fontSize: "calc( 0.7rem 1vmin)",
                      }}
                    >
                      <span style={{ fontSize: "1em" }}>Saving</span>
                      <span className="dot-ellipsis">
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                      </span>
                    </Box>
                  )}
                  {columnData?.loadingComplete &&
                    columnData?.createStatus === "success" && (
                      <Box
                        sx={{ display: "flex", alignItems: "center" }}
                        fontSize={".8em"}
                      >
                        <span>Saved</span> <TaskAlt />
                      </Box>
                    )}
                </>
              )}
            <>
              {columnData?.loadingComplete === null && (
                <Save
                  titleAccess="Save"
                  onClick={() => {
                    const data = {
                      studentId: row?.uniqueId,
                      classScore: row?.classScore,
                      examScore: row?.examScore,
                      totalScore: row?.totalScore,
                      remark: row?.remark,
                      semester: columnData?.currentAcademicTerm?.name,
                      classLevel: columnData?.classLevel,
                      subject: columnData?.selectedSubject,
                      lecturer: columnData?.authUser?.id,
                      year: new Date().getFullYear(),
                      isDraftSave: true,
                    };
                    if (!disableBtn) {
                      columnData?.dispatch(createStudentReport(data));
                    }
                  }}
                />
              )}
              {row?._id !== columnData?.foundStudent?._id &&
                columnData?.loadingComplete !== null && (
                  <Save
                    titleAccess="Save"
                    onClick={() => {
                      const data = {
                        studentId: row?.uniqueId,
                        classScore: row?.classScore,
                        examScore: row?.examScore,
                        totalScore: row?.totalScore,
                        semester: columnData?.currentAcademicTerm?.name,
                        classLevel: columnData?.classLevel,
                        subject: columnData?.selectedSubject,
                        lecturer: columnData?.authUser?.id,
                        year: new Date().getFullYear(),
                        isDraftSave: true,
                      };
                      if (!disableBtn) {
                        columnData?.dispatch(createStudentReport(data));
                      }
                    }}
                  />
                )}
            </>
          </Button>
        );
      },
    },
  ];
  return studentColumn;
};
const studentsReportOverviewColumn = (columnData) => {
  // console.log(columnData);

  const studentColumn = [
    {
      name: "Image",
      selector: (row) =>
        row?.profilePicture ? (
          <HashLink
            // to={`/sensec/admin/${columnData?.adminCurrentAction}/${
            //   columnData?.adminCurrentLink
            // }/${row?.firstName?.replace(/ /g, "_")}_${
            //   row?.lastName
            // }/${row?.uniqueId}/student_info#studentInfo`}
            title="View Student Info"
          >
            <Avatar
              // className="studentImg"
              src={
                row?.personalInfo
                  ? row?.personalInfo?.profilePicture?.url
                  : row?.personalInfo?.profilePicture
              }
              sx={{
                width: "1.5em",
                height: "1.5em",
                borderRadius: ".4rem",
                objectFit: "cover",
              }}
              alt=""
            />
          </HashLink>
        ) : (
          <HashLink
            className="noImgLink"
            // to={`/sensec/admin/${columnData?.adminCurrentAction}/${
            //   columnData?.adminCurrentLink
            // }/${row?.personalInfo?.firstName?.replace(/ /g, "_")}_${
            //   row?.personalInfo?.lastName
            // }/${row?.personalInfo?.uniqueId}/student_info#studentInfo`}
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
      name: "Full Name",
      selector: (row) => (
        <Box fontSize={".9em"} color={"#696969"}>
          {row?.fullName}
        </Box>
      ),
      sortable: true,
    },
    {
      name: "Class Score",
      selector: (row) => (
        <CustomTextField
          type="number"
          name="classScore"
          value={row.classScore || ""}
          size="small"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment
                  position="start"
                  sx={{
                    width: ".5rem",
                    // fontSize: ".7em", // Adjust font size of the adornment
                    marginLeft: "0.2rem", // Prevent overlap with input
                    color: "#555",
                  }}
                >
                  <Typography sx={{ fontSize: "0.75rem", color: "#af0bd8" }}>
                    /30
                  </Typography>
                </InputAdornment>
              ),
              sx: {
                color: "#555",
                // paddingRight: "1rem", // Add padding for increment icons
                // textAlign: "center", // Center the input text
              },
            },
          }}
          onChange={(e) =>
            columnData?.handleScoreChange(
              row.uniqueId,
              "classScore",
              e.target.value
            )
          }
          sx={{
            width: "5rem",
            // textAlign: "center",
            ".MuiInputBase-root": {
              display: "flex",
              alignItems: "center",
            },
            fontSize: ".9em",
          }}
        />
      ),
    },
    {
      name: "Exam Score",
      selector: (row) => (
        <CustomTextField
          type="number"
          name="examScore"
          value={row.examScore || ""}
          size="small"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment
                  position="start"
                  sx={{
                    width: ".5rem",
                    // fontSize: ".7em", // Adjust font size of the adornment
                    marginLeft: "0.2rem", // Prevent overlap with input
                    color: "#555",
                  }}
                >
                  <Typography sx={{ fontSize: "0.75rem", color: "#0b94d8" }}>
                    /70
                  </Typography>
                </InputAdornment>
              ),
              sx: {
                color: "#555",
                // paddingRight: "1rem", // Add padding for increment icons
                // textAlign: "center", // Center the input text
              },
            },
          }}
          onChange={(e) =>
            columnData?.handleScoreChange(
              row.uniqueId,
              "examScore",
              e.target.value
            )
          }
          sx={{
            width: "5rem",
            // textAlign: "center",
            ".MuiInputBase-root": {
              display: "flex",
              alignItems: "center",
            },
            fontSize: ".9em",
          }}
        />
      ),
    },
    {
      name: "Total Score",
      selector: (row) => <Box fontSize={".9em"}>{row.totalScore || 0}</Box>,
      // sortable: true,
    },
    {
      name: "Grade",
      selector: (row) => {
        const getGrade = columnData?.calculateGrade(row?.totalScore || 0);
        return (
          <Box
            bgcolor={columnData?.gradeBgColor(getGrade)}
            sx={{
              padding: ".2rem",
              borderRadius: ".4rem",
              color: "#fff",
              fontSize: ".9em",
            }}
          >
            {columnData?.calculateGrade(row.totalScore || 0)}
          </Box>
        );
      },
    },
  ];
  return studentColumn;
};
const pendingStudentsColumn = (columnData) => {
  const pendingStudentsColumn = [
    {
      name: "Image",
      selector: (row) =>
        row?.personalInfo?.profilePicture ? (
          <Box>
            <HashLink
              to={`/sensec/admin/${columnData?.adminCurrentAction}/${
                columnData?.adminCurrentLink
              }/${row?.personalInfo?.firstName?.replace(/ /g, "_")}_${
                row?.personalInfo?.lastName
              }/${row?.uniqueId}/student_info#studentInfo`}
              title="View Student Info"
            >
              <Avatar
                // className="studentImg"
                src={
                  row?.personalInfo?.profilePicture?.url
                    ? row?.personalInfo?.profilePicture?.url
                    : row?.personalInfo?.profilePicture
                }
                sx={{
                  width: "1.5em",
                  height: "1.5em",
                  borderRadius: ".4rem",
                  objectFit: "cover",
                }}
                alt=""
              />
            </HashLink>
          </Box>
        ) : (
          <HashLink
            className="noImgLink"
            to={`/sensec/admin/${columnData?.adminCurrentAction}/${
              columnData?.adminCurrentLink
            }/${row?.personalInfo?.firstName?.replace(/ /g, "_")}_${
              row?.personalInfo?.lastName
            }/${row?.personalInfo?.uniqueId}/student_info#studentInfo`}
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
      name: "Full Name",
      selector: (row) => (
        <Box>
          <p>{row?.personalInfo?.fullName}</p>
        </Box>
      ),
      sortable: true,
    },
    {
      name: "Date Of Birth",
      selector: (row) => {
        if (!row?.personalInfo?.dateOfBirth) return "---";
        const date = new Date(row?.personalInfo?.dateOfBirth);
        // Adjust for timezones explicitly if needed
        const utcDate = new Date(
          date.getTime() + date.getTimezoneOffset() * 60000
        );
        return (
          <Box>
            <p title={dateFormatter.format(utcDate)}>
              {dateFormatter.format(utcDate)}
            </p>
          </Box>
        );
      },
    },
    {
      name: "Programme",
      selector: (row) => {
        const allFlattenedProgrammes = FetchAllFlattenedProgrammes();
        const studentProgramFound = allFlattenedProgrammes?.find(
          (program) =>
            program?._id === row.studentSchoolData?.program?.programId
        );
        if (studentProgramFound) {
          return (
            <Box>
              <p
                title={
                  studentProgramFound?.name
                    ? studentProgramFound?.name
                    : studentProgramFound?.divisionName
                }
              >
                {studentProgramFound?.name
                  ? studentProgramFound?.name
                  : studentProgramFound?.divisionName}
              </p>
            </Box>
          );
        }
        return "---";
      },
    },
    {
      name: "Student-ID",
      selector: (row) => (
        <Box>
          <p>{row?.uniqueId}</p>
        </Box>
      ),
      sortable: true,
    },
    // {
    //   name: "Email",
    //   selector: (row) =>
    //     row?.contactAddress?.email ? row?.contactAddress?.email : "---",
    // },
    // {
    //   name: "Date Enrolled",
    //   selector: (row) =>
    //     !row?.studentStatusExtend?.dateEnrolled
    //       ? "---"
    //       : dateFormatter?.format(
    //           new Date(row?.studentStatusExtend?.dateEnrolled)
    //         ),
    // },
    {
      name: "Batch",
      selector: (row) => (
        <Box>
          <p>
            {row.studentSchoolData?.batch?.yearRange
              ? `${row?.studentSchoolData?.batch?.yearRange.replace(/-/g, "/")}`
              : "---"}
          </p>
        </Box>
      ),
    },
    {
      name: "Level",
      selector: (row) =>
        row.studentSchoolData?.currentClassLevel && (
          <Box className="tableClassLevel">
            {row.studentSchoolData?.currentClassLevel?.name === "Level 100" && (
              <p
                // style={{
                //   fontSize: ".7em",
                //   backgroundColor: "#da076d",
                //   width: "1em",
                //   height: "1em",
                //   display: "flex",
                //   justifyContent: "center",
                //   alignItems: "center",
                //   padding: ".7em",
                //   borderRadius: "50%",
                //   color: "#fff",
                // }}
                className="firstYearTag"
                title="1st Year"
              >
                1
              </p>
            )}
            {row.studentSchoolData?.currentClassLevel?.name === "Level 200" && (
              <p className="secondYearTag" title="2nd Year">
                2
              </p>
            )}
            {row.studentSchoolData?.currentClassLevel?.name === "Level 300" &&
              !row.isGraduated && (
                <p className="thirdYearTag" title="3rd Year">
                  3
                </p>
              )}
            {row.isGraduated && (
              <p className="isGraduated" title="Graduated">
                <SchoolOutlined />
              </p>
            )}
          </Box>
        ),
    },
    {
      name: "Approve",
      selector: (row) =>
        row?.studentStatusExtend?.enrollmentStatus === "pending" && (
          <>
            <HashLink
              to={"#"}
              className="approveLink"
              onClick={async () => {
                // Do not open modal if approval/rejection is in progress
                if (
                  !columnData?.rejectionInProgress &&
                  !columnData?.approvalInProgress
                ) {
                  columnData?.setCurrentStudent(row._id);
                  columnData?.setOpenApproveEnrollmentModal(true);
                  columnData?.setOpenRejectModal(false);
                }
              }}
            >
              {columnData?.foundStudent &&
                columnData?.foundStudent._id === row._id && (
                  <>
                    {columnData?.loadingComplete === false && (
                      <Box
                        className="promotionSpinner"
                        sx={{
                          marginTop: ".8rem",
                        }}
                      >
                        <span>Processing</span>
                        <span className="dot-ellipsis">
                          <span className="dot">.</span>
                          <span className="dot">.</span>
                          <span className="dot">.</span>
                        </span>
                      </Box>
                    )}
                    {columnData?.loadingComplete &&
                      columnData?.enrollmentApprovalStatus === "success" && (
                        <>
                          <span>Approved</span> <TaskAlt />
                        </>
                      )}
                  </>
                )}
              <>
                {columnData?.loadingComplete === null && (
                  <HowToReg
                    titleAccess="Approve Enrollment"
                    style={{ fontSize: "1.5em" }}
                  />
                )}
                {row?._id !== columnData?.foundStudent?._id &&
                  columnData?.loadingComplete !== null && (
                    <HowToReg
                      titleAccess="Approve Enrollment"
                      style={{ fontSize: "1.5em" }}
                    />
                  )}
              </>
            </HashLink>
            {columnData?.foundStudent &&
              columnData?.foundStudent._id === row._id && (
                <ApprovalModal
                  open={columnData?.openApproveEnrollmentModal}
                  onClose={() =>
                    columnData?.setOpenApproveEnrollmentModal(false)
                  }
                  approvalFunction={approveStudentEnrollment({
                    studentId: row?.uniqueId,
                    enrollmentApprovedBy: `${columnData?.authAdmin?.id}`,
                  })}
                  setLoadingComplete={columnData?.setLoadingComplete}
                  setSelectedUserToApprove={columnData?.setCurrentStudent}
                  selectedUserToApproveId={row?._id}
                  userDataToApprove={columnData?.foundStudent}
                  userDataToReject={columnData?.studentToReject}
                />
              )}
          </>
        ),
    },
    {
      name: "Reject",
      selector: (row) =>
        row?.studentStatusExtend?.enrollmentStatus === "pending" && (
          <HashLink
            to={"#"}
            className="rejectLink"
            onClick={async () => {
              // Do not open modal if rejection/approval is in progress
              if (
                !columnData?.approvalInProgress &&
                !columnData?.rejectionInProgress
              ) {
                columnData?.setRejectStudent(row._id);
                columnData?.setOpenRejectModal(true);
                columnData?.setOpenApproveEnrollmentModal(false);
              }
            }}
          >
            {columnData?.rejectLoadingComplete === null && (
              <PersonRemove
                titleAccess="Reject Employment"
                style={{ fontSize: "1.5em" }}
              />
            )}
            {row?._id !== columnData?.studentToReject?._id &&
              columnData?.rejectLoadingComplete !== null && (
                <PersonRemove
                  titleAccess="Reject Employment"
                  style={{ fontSize: "1.5em" }}
                />
              )}
            {columnData?.studentToReject &&
              columnData?.studentToReject._id === row._id && (
                <>
                  {columnData?.rejectLoadingComplete === false && (
                    <Box
                      className="promotionSpinner"
                      sx={{
                        marginTop: ".8rem",
                      }}
                    >
                      <span>Processing</span>
                      <span className="dot-ellipsis">
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                      </span>
                    </Box>
                  )}
                  {columnData?.rejectLoadingComplete &&
                    columnData?.rejectEnrollmentStatus === "success" && (
                      <>
                        <span>Rejected</span> <TaskAlt />
                      </>
                    )}
                  <RejectionModal
                    open={columnData?.openRejectModal}
                    onClose={() => columnData?.setOpenRejectModal(false)}
                    rejectionFunction={rejectStudentEnrollment({
                      studentId: row?.uniqueId,
                      enrollmentRejectedBy: `${columnData?.authAdmin?.id}`,
                    })}
                    setLoadingComplete={columnData?.setRejectLoadingComplete}
                    setSelectedUserToReject={columnData?.setRejectStudent}
                    selectedUserToRejectId={row?._id}
                    userDataToApprove={columnData?.foundStudent}
                    userDataToReject={columnData?.studentToReject}
                  />
                </>
              )}
          </HashLink>
        ),
    },
    {
      name: "Update",
      selector: (row) => (
        <Link
          className="editLink"
          to={`/sensec/users/${columnData?.authAdmin?.uniqueId}/admin/Students/${row.uniqueId}/student_update`}
        >
          <Box>
            <Edit style={{ fontSize: "1.5em" }} />
          </Box>
        </Link>
      ),
    },
  ];
  return pendingStudentsColumn;
};
const courseMatesColumn = () => {
  const studentColumn = [
    {
      name: "Image",
      selector: (row) =>
        row?.personalInfo?.profilePicture ? (
          <Box>
            <Avatar
              // className="studentImg"
              src={
                row?.personalInfo?.profilePicture?.url
                  ? row?.personalInfo?.profilePicture?.url
                  : row?.personalInfo?.profilePicture
              }
              sx={{
                width: "1.5em",
                height: "1.5em",
                borderRadius: ".4rem",
                objectFit: "cover",
              }}
              alt=""
            />
          </Box>
        ) : (
          <Box className="noImgLink">
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
          </Box>
        ),
    },
    {
      name: "Full Name",
      selector: (row) => (
        <Box>
          <p>{row?.personalInfo?.fullName}</p>
        </Box>
      ),
      sortable: true,
    },
    {
      name: "Date Of Birth",
      selector: (row) => {
        if (!row?.personalInfo?.dateOfBirth) return "---";
        const date = new Date(row?.personalInfo?.dateOfBirth);
        // Adjust for timezones explicitly if needed
        const utcDate = new Date(
          date.getTime() + date.getTimezoneOffset() * 60000
        );
        return (
          <Box>
            <p title={dateFormatter.format(utcDate)}>
              {dateFormatter.format(utcDate)?.slice(0, -6)}
            </p>
          </Box>
        );
      },
    },
    {
      name: "Programme",
      selector: (row) => {
        const allFlattenedProgrammes = FetchAllFlattenedProgrammes();
        const studentProgramFound = allFlattenedProgrammes?.find(
          (program) =>
            program?._id === row.studentSchoolData?.program?.programId
        );
        if (studentProgramFound) {
          return (
            <Box>
              <p
                title={
                  studentProgramFound?.name
                    ? studentProgramFound?.name
                    : studentProgramFound?.divisionName
                }
              >
                {studentProgramFound?.name
                  ? studentProgramFound?.name
                  : studentProgramFound?.divisionName}
              </p>
            </Box>
          );
        }
        return "---";
      },
    },
    {
      name: "Student-ID",
      selector: (row) => (
        <Box>
          <p>{row?.uniqueId}</p>
        </Box>
      ),
      sortable: true,
    },
    // {
    //   name: "Enrolled Date",
    //   selector: (row) =>
    //     dateFormatter.format(new Date(row?.studentStatusExtend?.dateEnrolled)),
    // },
    {
      name: "Batch",
      selector: (row) => (
        <Box>
          <p>
            {row.studentSchoolData?.batch?.yearRange
              ? `${row?.studentSchoolData?.batch?.yearRange.replace(/-/g, "/")}`
              : "---"}
          </p>
        </Box>
      ),
    },
    {
      name: "Level",
      selector: (row) =>
        row.studentSchoolData?.currentClassLevel && (
          <Box className="tableClassLevel">
            {row.studentSchoolData?.currentClassLevel?.name === "Level 100" && (
              <p className="firstYearTag" title="1st Year">
                1
              </p>
            )}
            {row.studentSchoolData?.currentClassLevel?.name === "Level 200" && (
              <p className="secondYearTag" title="2nd Year">
                2
              </p>
            )}
            {row.studentSchoolData?.currentClassLevel?.name === "Level 300" &&
              !row.isGraduated && (
                <p className="thirdYearTag" title="3rd Year">
                  3
                </p>
              )}
            {row.isGraduated && (
              <p className="isGraduated" title="Graduated">
                <SchoolOutlined />
              </p>
            )}
          </Box>
        ),
    },
    {
      name: "Email",
      selector: (row) =>
        row?.contactAddress?.email ? row?.contactAddress?.email : "---",
    },
  ];
  return studentColumn;
};

const teachersColumn = (columnData) => {
  const teachersDataFormat = [
    {
      name: "Image",
      selector: (row) =>
        row?.personalInfo?.profilePicture ? (
          <HashLink
            to={`/sensec/admin/Users/Lecturers/${row?.personalInfo?.firstName.replace(
              / /g,
              "_"
            )}_${row?.personalInfo?.lastName}/${
              row?.uniqueId
            }/lecturer_info#teacherInfo`}
            title="View Lecturer Info"
          >
            <Avatar
              // className="studentImg"
              src={
                row?.personalInfo
                  ? row?.personalInfo?.profilePicture?.url
                  : row?.personalInfo?.profilePicture
              }
              sx={{
                width: "1.5em",
                height: "1.5em",
                borderRadius: ".4rem",
                objectFit: "cover",
              }}
              alt=""
            />
          </HashLink>
        ) : (
          <HashLink
            className="noImgLink"
            to={`/sensec/admin/Students/student_info/${row?.personalInfo?.firstName}_${row?.personalInfo?.lastName}/${row?.personalInfo?.uniqueId}#studentInfo`}
            title="View Lecturer Info"
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
      selector: (row) => {
        if (!row?.personalInfo?.dateOfBirth) return "---";
        const date = new Date(row?.personalInfo?.dateOfBirth);
        // Adjust for timezones explicitly if needed
        const utcDate = new Date(
          date.getTime() + date.getTimezoneOffset() * 60000
        );
        return (
          <p title={dateFormatter.format(utcDate)}>
            {dateFormatter.format(utcDate)}
          </p>
        );
      },
    },
    {
      name: "Class Handling",
      selector: (row) => (
        <Box display={"flex"} alignItems={"center"} gap={1}>
          {/* Assign Lecturer Btn */}
          {!row?.lecturerSchoolData?.classLevelHandling && (
            <Box
              style={{
                position: "relative",
                textAlign: "center",
              }}
            >
              <HashLink
                to={"#"}
                className="approveLink"
                // variant="text"
                // sx={{
                //   color: "green",
                //   textTransform: "capitalize",
                //   fontSize: "1rem",
                //   backgroundColor: "transparent",
                // }}
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    !columnData?.redirect &&
                    !columnData?.removeLecturerInProgress
                  ) {
                    columnData?.setSelectedLecturerToAssign(row?._id);
                    columnData?.setOpenAssignLecturerModal(true);
                    columnData?.setOpenRemoveLecturerModal(false);
                    localStorage?.setItem("lecturerId", row?.uniqueId);
                  }
                }}
              >
                {!columnData?.redirect &&
                  !columnData?.assignLecturerInProgress &&
                  "Assign Class"}
                {columnData?.redirect &&
                  columnData?.lecturerToAssign?._id !== row?._id &&
                  "Assign Class"}
                {columnData?.redirect &&
                  columnData?.lecturerToAssign?._id === row?._id && (
                    <Box
                      className="promotionSpinner"
                      sx={
                        {
                          // marginTop: ".5rem",
                        }
                      }
                    >
                      <p>Processing</p>
                      <span className="dot-ellipsis">
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                      </span>
                    </Box>
                  )}
              </HashLink>
            </Box>
          )}
          {row?.lecturerSchoolData?.classLevelHandling && (
            <>
              {/* When a user is selected */}
              {columnData?.loadingComplete === null && (
                <>
                  <p
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5%",
                    }}
                    title={`${row?.lecturerSchoolData?.classLevelHandling?.sectionName}-${row?.lecturerSchoolData?.classLevelHandling?.classLevelName}`}
                  >
                    {row?.lecturerSchoolData?.classLevelHandling?.label}
                  </p>
                  <Close
                    titleAccess={
                      row?.lecturerSchoolData?.classLevelHandling
                        ? "Unassign Lecturer"
                        : ""
                    }
                    className="removeClassLecturerIcon"
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        !columnData?.removeLecturerInProgress &&
                        !columnData?.assignLecturerInProgress
                      ) {
                        columnData?.setSelectedLecturerToRemove(row?._id);
                        columnData?.setOpenRemoveLecturerModal(true);
                        columnData?.setOpenAssignLecturerModal(false);
                      }
                    }}
                    sx={{
                      backgroundColor: "red",
                      color: "#fff",
                      borderRadius: "50%",
                      fontSize: "1rem",
                      margin: "unset",
                      "&-hover": { cursor: "pointer" },
                    }}
                  />
                </>
              )}
              {row?._id !== columnData?.lecturerToRemove?._id &&
                columnData?.loadingComplete !== null && (
                  <>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "5%",
                      }}
                      title={`${row?.lecturerSchoolData?.classLevelHandling?.sectionName}-${row?.lecturerSchoolData?.classLevelHandling?.classLevelName}`}
                    >
                      {row?.lecturerSchoolData?.classLevelHandling?.label}
                    </p>
                    <Close
                      titleAccess={
                        row?.lecturerSchoolData?.classLevelHandling
                          ? "Unassign Lecturer"
                          : ""
                      }
                      className="removeClassLecturerIcon"
                      onClick={(e) => {
                        e.preventDefault();
                        if (
                          !columnData?.removeLecturerInProgress &&
                          !columnData?.assignLecturerInProgress
                        ) {
                          columnData?.setSelectedLecturerToRemove(row?._id);
                          columnData?.setOpenRemoveLecturerModal(true);
                          columnData?.setOpenAssignLecturerModal(false);
                        }
                      }}
                      sx={{
                        backgroundColor: "red",
                        color: "#fff",
                        borderRadius: "50%",
                        fontSize: "1rem",
                        margin: "unset",
                        "&-hover": { cursor: "pointer" },
                      }}
                    />
                  </>
                )}
            </>
          )}
          {columnData?.lecturerToRemove &&
            columnData?.lecturerToRemove?._id === row?._id && (
              <>
                {columnData?.loadingComplete === false && (
                  <Box className="promotionSpinner">
                    <span>Processing</span>
                    <span className="dot-ellipsis" style={{ color: "red" }}>
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                    </span>
                  </Box>
                )}
                {columnData?.loadingComplete &&
                  columnData?.removeLecturerStatus === "success" && (
                    <Box className="promotionSpinner">
                      <span>Removed</span> <TaskAlt sx={{ color: "green" }} />
                    </Box>
                  )}
              </>
            )}
          {columnData?.lecturerToAssign &&
            columnData?.lecturerToAssign._id === row._id && (
              <AssignClassLecturerModal
                open={columnData?.openAssignLecturerModal}
                onClose={() => columnData?.setOpenAssignLecturerModal(false)}
                setRedirect={columnData?.setRedirect}
                setAssignLecturerInProgress={
                  columnData?.setAssignLecturerInProgress
                }
                navigateTo={columnData?.navigate}
                authAdminId={columnData?.authAdmin?.uniqueId}
                selectedLecturerToAssignId={row?._id}
                lecturerDataToAssign={columnData?.lecturerToAssign}
                lecturerDataToRemove={columnData?.lecturerToRemove}
              />
            )}
          {columnData?.lecturerToRemove &&
            columnData?.lecturerToRemove._id === row._id && (
              <RemoveClassLecturerModal
                open={columnData?.openRemoveLecturerModal}
                onClose={() => columnData?.setOpenRemoveLecturerModal(false)}
                removeClassLecturerFunction={removeClassSectionLecturer({
                  lecturerId: row?.uniqueId,
                  classSectionId:
                    row?.lecturerSchoolData?.classLevelHandling?._id,
                  previousLecturerRemovedBy: columnData?.authAdmin?.id,
                })}
                setLoadingComplete={columnData?.setLoadingComplete}
                setSelectedLecturerToRemove={columnData?.setLoadingComplete}
                selectedLecturerToAssignId={row?._id}
                lecturerDataToAssign={columnData?.lecturerToAssign}
                lecturerDataToRemove={columnData?.lecturerToRemove}
              />
            )}
        </Box>
      ),
    },
    {
      name: "Unique-ID",
      selector: (row) => <p title={row?.uniqueId}>{row?.uniqueId}</p>,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => (
        <p title={row?.contactAddress?.email}>
          {row?.contactAddress?.email ? row?.contactAddress?.email : "---"}
        </p>
      ),
    },
    {
      name: "Date Employed",
      selector: (row) =>
        row?.employment?.employmentApprovedDate
          ? dateFormatter.format(
              new Date(row?.employment.employmentApprovedDate)
            )
          : "---",
    },
    {
      name: "Class Levels",
      selector: (row) =>
        row?.lecturerSchoolData?.classLevels
          ? row?.lecturerSchoolData?.classLevels?.length
          : "---",
    },
    {
      name: "Update",
      selector: (row) => (
        <Link
          className="editLink"
          to={`/sensec/users/${columnData?.authAdmin.uniqueId}/admin/Lecturers/${row.uniqueId}/lecturer_update`}
        >
          <Edit style={{ fontSize: "1.5em" }} />
        </Link>
      ),
    },
  ];
  return teachersDataFormat;
};
const pendingTeachersColumn = (columnObjData) => {
  const teachersDataFormat = [
    {
      name: "Image",
      selector: (row) =>
        row?.personalInfo?.profilePicture ? (
          <HashLink
            to={`/sensec/admin/Users/Lecturers/${row?.personalInfo?.firstName.replace(
              / /g,
              "_"
            )}_${row?.personalInfo?.lastName}/${
              row?.uniqueId
            }/lecturer_info#teacherInfo`}
            title="View Lecturer Info"
          >
            <Avatar
              // className="studentImg"
              src={
                row?.personalInfo
                  ? row?.personalInfo?.profilePicture?.url
                  : row?.personalInfo?.profilePicture
              }
              sx={{
                width: "1.5em",
                height: "1.5em",
                borderRadius: ".4rem",
                objectFit: "cover",
              }}
              alt=""
            />
          </HashLink>
        ) : (
          <HashLink
            className="noImgLink"
            to={`/sensec/admin/Students/student_info/${row?.personalInfo?.firstName}_${row?.personalInfo?.lastName}/${row?.personalInfo?.uniqueId}#studentInfo`}
            title="View Lecturer Info"
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
      selector: (row) => {
        if (!row?.personalInfo?.dateOfBirth) return "---";
        const date = new Date(row?.personalInfo?.dateOfBirth);
        // Adjust for timezones explicitly if needed
        const utcDate = new Date(
          date.getTime() + date.getTimezoneOffset() * 60000
        );
        return (
          <p title={dateFormatter.format(utcDate)}>
            {dateFormatter.format(utcDate)}
          </p>
        );
      },
    },
    {
      name: "Unique-ID",
      selector: (row) => <p title={row?.uniqueId}>{row?.uniqueId}</p>,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => (
        <p title={row?.contactAddress?.email}>
          {row?.contactAddress?.email ? row?.contactAddress?.email : "---"}
        </p>
      ),
    },
    {
      name: "Date Processed",
      selector: (row) => (
        <p
          title={
            row?.employment
              ? dateFormatter.format(new Date(row?.employment?.createdAt))
              : "---"
          }
        >
          {row?.employment
            ? dateFormatter.format(new Date(row?.employment?.createdAt))
            : "---"}
        </p>
      ),
    },
    {
      name: "Update",
      selector: (row) => (
        <>
          {row?.employment?.employmentStatus === "pending" && (
            <Link
              className="editLink"
              to={`/sensec/users/${columnObjData?.authAdmin.uniqueId}/admin/Lecturers/${row.uniqueId}/lecturer_update`}
            >
              <Edit style={{ fontSize: "1.5em" }} />
            </Link>
          )}
        </>
      ),
    },
    {
      name: "Approve",
      selector: (row) =>
        row?.employment?.employmentStatus === "pending" && (
          <>
            <HashLink
              className="approveLink"
              onClick={async () => {
                columnObjData?.setCurrentLecturer(row._id);
                columnObjData?.setOpenApproveEmploymentModal(true);
                columnObjData?.setOpenRejectModal(false);
              }}
            >
              {columnObjData?.foundLecturer &&
                columnObjData?.foundLecturer._id === row._id && (
                  <>
                    {columnObjData?.loadingComplete === false && (
                      <Box
                        className="promotionSpinner"
                        sx={{
                          marginTop: ".5rem",
                        }}
                      >
                        <p>Processing</p>
                        <span className="dot-ellipsis">
                          <span className="dot">.</span>
                          <span className="dot">.</span>
                          <span className="dot">.</span>
                        </span>
                      </Box>
                    )}
                    {columnObjData?.loadingComplete &&
                      columnObjData?.approveEmploymentStatus === "success" && (
                        <>
                          <span>Approved</span> <TaskAlt />
                        </>
                      )}
                  </>
                )}
              <>
                {columnObjData?.loadingComplete === null && (
                  <HowToReg
                    titleAccess="Approve Employment"
                    style={{ fontSize: "2rem" }}
                  />
                )}
                {row?._id !== columnObjData?.foundLecturer?._id &&
                  columnObjData?.loadingComplete !== null && (
                    <HowToReg
                      titleAccess="Approve Employment"
                      style={{ fontSize: "2rem" }}
                    />
                  )}
              </>
            </HashLink>
            {columnObjData?.foundLecturer &&
              columnObjData?.foundLecturer?._id === row?._id && (
                <ApprovalModal
                  open={columnObjData?.openApproveEmploymentModal}
                  onClose={() =>
                    columnObjData?.setOpenApproveEmploymentModal(false)
                  }
                  approvalFunction={approveEmployee({
                    employeeId: row?.uniqueId,
                    employmentApprovedBy: columnObjData?.authAdmin?.id,
                  })}
                  setLoadingComplete={columnObjData?.setLoadingComplete}
                  setSelectedUserToApprove={columnObjData?.setCurrentLecturer}
                  selectedUserToApproveId={row?._id}
                  userDataToApprove={columnObjData?.foundLecturer}
                  userDataToReject={columnObjData?.lecturerToReject}
                />
              )}
          </>
        ),
    },
    {
      name: "Reject",
      selector: (row) =>
        row?.employment?.employmentStatus === "pending" && (
          <HashLink
            className="rejectLink"
            onClick={async () => {
              columnObjData?.setRejectLecturer(row?._id);
              columnObjData?.setOpenRejectModal(true);
              columnObjData?.setOpenApproveEmploymentModal(false);
            }}
          >
            {columnObjData?.rejectLoadingComplete === null && (
              <PersonRemove
                titleAccess="Reject Employment"
                style={{ fontSize: "2rem" }}
              />
            )}
            {row?._id !== columnObjData?.lecturerToReject?._id &&
              columnObjData?.rejectLoadingComplete !== null && (
                <PersonRemove
                  titleAccess="Reject Employment"
                  style={{ fontSize: "2rem" }}
                />
              )}
            {columnObjData?.lecturerToReject &&
              columnObjData?.lecturerToReject?._id === row._id && (
                <>
                  {columnObjData?.rejectLoadingComplete === false && (
                    <Box
                      className="promotionSpinner"
                      sx={{
                        marginTop: ".5rem",
                      }}
                    >
                      <p>Processing</p>
                      <span className="dot-ellipsis">
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                      </span>
                    </Box>
                  )}
                  {columnObjData?.rejectLoadingComplete &&
                    columnObjData?.rejectEmploymentStatus === "success" && (
                      <>
                        <span>Rejected</span> <TaskAlt />
                      </>
                    )}
                  <RejectionModal
                    open={columnObjData?.openRejectModal}
                    onClose={async () =>
                      columnObjData?.setOpenRejectModal(false)
                    }
                    rejectionFunction={rejectEmployee({
                      employeeId: row?.uniqueId,
                      employmentRejectedBy: columnObjData?.authAdmin?.id,
                    })}
                    setLoadingComplete={columnObjData?.setRejectLoadingComplete}
                    setSelectedUserToReject={columnObjData?.setRejectLecturer}
                    selectedUserToRejectId={row?._id}
                    userDataToApprove={columnObjData?.foundLecturer}
                    userDataToReject={columnObjData?.lecturerToReject}
                  />
                </>
              )}
          </HashLink>
        ),
    },
  ];
  return teachersDataFormat;
};
const nTStaffsColumn = (adminCurrentLink, authAdmin) => {
  const nTStaffsDataFormat = [
    {
      name: "Image",
      selector: (row) =>
        row?.personalInfo?.profilePicture ? (
          <HashLink
            to={`/sensec/admin/${
              authAdmin?.uniqueId
            }/Users/${adminCurrentLink}/${row?.personalInfo?.firstName.replace(
              / /g,
              "_"
            )}_${row?.personalInfo?.lastName}/${row?.uniqueId}/nt_staff_info`}
            title="View NT-Staff Info"
          >
            <Avatar
              // className="studentImg"
              src={
                row?.personalInfo
                  ? row?.personalInfo?.profilePicture?.url
                  : row?.personalInfo?.profilePicture
              }
              sx={{
                width: "1.5em",
                height: "1.5em",
                borderRadius: ".4rem",
                objectFit: "cover",
              }}
              alt=""
            />
          </HashLink>
        ) : (
          <HashLink
            className="noImgLink"
            to={`/sensec/admin/Students/student_info/${row?.personalInfo?.firstName}_${row?.personalInfo?.lastName}/${row?.personalInfo?.uniqueId}#studentInfo`}
            title="View Lecturer Info"
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
      selector: (row) => {
        if (!row?.personalInfo?.dateOfBirth) return "---";
        const date = new Date(row?.personalInfo?.dateOfBirth);
        // Adjust for timezones explicitly if needed
        const utcDate = new Date(
          date.getTime() + date.getTimezoneOffset() * 60000
        );
        return (
          <p title={dateFormatter.format(utcDate)}>
            {dateFormatter.format(utcDate)}
          </p>
        );
      },
    },
    {
      name: "Unique-ID",
      selector: (row) => <p title={row?.uniqueId}>{row?.uniqueId}</p>,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => (
        <p title={row?.contactAddress?.email}>
          {row?.contactAddress?.email ? row?.contactAddress?.email : "---"}
        </p>
      ),
    },
    {
      name: "Date Employed",
      selector: (row) =>
        row?.employment?.employmentApprovedDate
          ? dateFormatter.format(
              new Date(row?.employment.employmentApprovedDate)
            )
          : "---",
    },
    {
      name: "Update",
      selector: (row) => (
        <Link
          className="editLink"
          to={`/sensec/users/${authAdmin?.uniqueId}/admin/NT-Staff/${row?.uniqueId}/nt-staff_update`}
        >
          <Edit style={{ fontSize: "1.5em" }} />
        </Link>
      ),
    },
  ];
  return nTStaffsDataFormat;
};
const pendingNTStaffsColumn = (columnObjData) => {
  const nTStaffsDataFormat = [
    {
      name: "Image",
      selector: (row) =>
        row?.personalInfo?.profilePicture ? (
          <HashLink
            to={`/sensec/admin/Users/Lecturers/${row?.personalInfo?.firstName.replace(
              / /g,
              "_"
            )}_${row?.personalInfo?.lastName}/${
              row?.uniqueId
            }/lecturer_info#teacherInfo`}
            title="View Student Info"
          >
            <Avatar
              // className="studentImg"
              src={
                row?.personalInfo
                  ? row?.personalInfo?.profilePicture?.url
                  : row?.personalInfo?.profilePicture
              }
              sx={{
                width: "1.5em",
                height: "1.5em",
                borderRadius: ".4rem",
                objectFit: "cover",
              }}
              alt=""
            />
          </HashLink>
        ) : (
          <HashLink
            className="noImgLink"
            to={`/sensec/admin/Students/student_info/${row?.personalInfo?.firstName}_${row?.personalInfo?.lastName}/${row?.personalInfo?.uniqueId}#studentInfo`}
            title="View Lecturer Info"
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
      selector: (row) => {
        if (!row?.personalInfo?.dateOfBirth) return "---";
        const date = new Date(row?.personalInfo?.dateOfBirth);
        // Adjust for timezones explicitly if needed
        const utcDate = new Date(
          date.getTime() + date.getTimezoneOffset() * 60000
        );
        return (
          <p title={dateFormatter.format(utcDate)}>
            {dateFormatter.format(utcDate)}
          </p>
        );
      },
    },
    {
      name: "Unique-ID",
      selector: (row) => <p title={row?.uniqueId}>{row?.uniqueId}</p>,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => (
        <p title={row?.contactAddress?.email}>
          {row?.contactAddress?.email ? row?.contactAddress?.email : "---"}
        </p>
      ),
    },
    {
      name: "Date Processed",
      selector: (row) => (
        <p
          title={
            row?.employment
              ? dateFormatter.format(new Date(row?.employment?.createdAt))
              : "---"
          }
        >
          {row?.employment
            ? dateFormatter.format(new Date(row?.employment?.createdAt))
            : "---"}
        </p>
      ),
    },
    {
      name: "Update",
      selector: (row) => (
        <>
          {row?.employment?.employmentStatus === "pending" && (
            <Link
              className="editLink"
              to={`/sensec/users/${columnObjData?.authAdmin?.uniqueId}/admin/NT-Staff/${row?.uniqueId}/nt-staff_update`}
            >
              <Edit style={{ fontSize: "1.5em" }} />
            </Link>
          )}
        </>
      ),
    },
    {
      name: "Approve",
      selector: (row) =>
        row?.employment?.employmentStatus === "pending" && (
          <>
            <HashLink
              className="approveLink"
              onClick={async () => {
                columnObjData?.setCurrentNTStaff(row?._id);
                columnObjData?.setOpenApproveEmploymentModal(true);
                columnObjData?.setOpenRejectModal(false);
              }}
            >
              {columnObjData?.foundNTStaff &&
                columnObjData?.foundNTStaff._id === row._id && (
                  <>
                    {columnObjData?.loadingComplete === false && (
                      <Box
                        className="promotionSpinner"
                        sx={{
                          marginTop: ".5rem",
                        }}
                      >
                        <p>Processing</p>
                        {/* <CircularProgress style={{ color: "#555" }} size={"1.3em"} /> */}
                        <span className="dot-ellipsis">
                          <span className="dot">.</span>
                          <span className="dot">.</span>
                          <span className="dot">.</span>
                        </span>
                      </Box>
                    )}
                    {columnObjData?.loadingComplete &&
                      columnObjData?.approveEmploymentStatus === "success" && (
                        <>
                          <span>Approved</span> <TaskAlt />
                        </>
                      )}
                  </>
                )}
              <>
                {columnObjData?.loadingComplete === null && (
                  <HowToReg
                    titleAccess="Approve Employment"
                    style={{ fontSize: "2rem" }}
                  />
                )}
                {row?._id !== columnObjData?.foundNTStaff?._id &&
                  columnObjData?.loadingComplete !== null && (
                    <HowToReg
                      titleAccess="Approve Employment"
                      style={{ fontSize: "2rem" }}
                    />
                  )}
              </>
            </HashLink>
            {columnObjData?.foundNTStaff &&
              columnObjData?.foundNTStaff?._id === row?._id && (
                <ApprovalModal
                  open={columnObjData?.openApproveEmploymentModal}
                  onClose={async () =>
                    columnObjData?.setOpenApproveEmploymentModal(false)
                  }
                  approvalFunction={approveEmployee({
                    employeeId: row?.uniqueId,
                    employmentApprovedBy: columnObjData?.authAdmin?.id,
                  })}
                  setLoadingComplete={columnObjData?.setLoadingComplete}
                  setSelectedUserToApprove={columnObjData?.setCurrentNTStaff}
                  selectedUserToApproveId={row?._id}
                  userDataToApprove={columnObjData?.foundNTStaff}
                  userDataToReject={columnObjData?.nTStaffToReject}
                />
              )}
          </>
        ),
    },
    {
      name: "Reject",
      selector: (row) =>
        row?.employment?.employmentStatus === "pending" && (
          <HashLink
            className="rejectLink"
            onClick={async () => {
              columnObjData?.setRejectNTStaff(row?._id);
              columnObjData?.setOpenRejectModal(true);
              columnObjData?.setOpenApproveEmploymentModal(false);
            }}
          >
            {columnObjData?.rejectLoadingComplete === null && (
              <PersonRemove
                titleAccess="Reject Employment"
                style={{ fontSize: "2rem" }}
              />
            )}
            {row?._id !== columnObjData?.nTStaffToReject?._id &&
              columnObjData?.rejectLoadingComplete !== null && (
                <PersonRemove
                  titleAccess="Reject Employment"
                  style={{ fontSize: "2rem" }}
                />
              )}
            {columnObjData?.nTStaffToReject &&
              columnObjData?.nTStaffToReject._id === row._id && (
                <>
                  {columnObjData?.rejectLoadingComplete === false && (
                    <Box
                      className="promotionSpinner"
                      sx={{
                        marginTop: ".5rem",
                      }}
                    >
                      <p>Processing</p>
                      {/* <CircularProgress style={{ color: "#555" }} size={"1.3em"} /> */}
                      <span className="dot-ellipsis">
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                      </span>
                    </Box>
                  )}
                  {columnObjData?.rejectLoadingComplete &&
                    columnObjData?.rejectEmploymentStatus === "success" && (
                      <>
                        <span>Rejected</span> <TaskAlt />
                      </>
                    )}
                  <RejectionModal
                    open={columnObjData?.openRejectModal}
                    onClose={async () =>
                      columnObjData?.setOpenRejectModal(false)
                    }
                    rejectionFunction={rejectEmployee({
                      employeeId: row?.uniqueId,
                      employmentRejectedBy: columnObjData?.authAdmin?.id,
                    })}
                    setLoadingComplete={columnObjData?.setRejectLoadingComplete}
                    setSelectedUserToReject={columnObjData?.setRejectNTStaff}
                    selectedUserToRejectId={row?._id}
                    userDataToApprove={columnObjData?.foundNTStaff}
                    userDataToReject={columnObjData?.nTStaffToReject}
                  />
                </>
              )}
          </HashLink>
        ),
    },
  ];
  return nTStaffsDataFormat;
};
const graduatesColumn = () => {
  const graduatesColumn = [
    {
      name: "Image",
      selector: (row) =>
        row?.personalInfo?.profilePicture ? (
          <HashLink
            to={`/sensec/admin/student_info/${row?.personalInfo?.firstName.replace(
              / /g,
              "_"
            )}_${row?.personalInfo?.lastName}/${row?.uniqueId}#studentInfo`}
            title="View Student Info"
          >
            <Avatar
              // className="studentImg"
              src={
                row?.personalInfo
                  ? row?.personalInfo?.profilePicture?.url
                  : "/assets/noAvatar.png"
              }
              sx={{
                width: "1.5em",
                height: "1.5em",
                borderRadius: ".4rem",
                objectFit: "cover",
              }}
              alt=""
            />
          </HashLink>
        ) : (
          <HashLink
            className="noImgLink"
            to={`/sensec/admin/student_info/${row?.personalInfo?.firstName}_${row?.personalInfo?.lastName}/${row?.personalInfo?.uniqueId}/#studentInfo`}
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
        row?.personalInfo?.dateOfBirth
          ? dateFormatter.format(new Date(row?.personalInfo?.dateOfBirth))
          : "---",
    },
    {
      name: "Program",
      selector: (row) =>
        row?.studentSchoolData?.program
          ? row?.studentSchoolData?.program.name
          : "---",
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
      name: "Contact Number",
      selector: (row) =>
        row?.contactAddress?.mobile ? row?.contactAddress?.mobile : "---",
    },
    {
      name: "Year Graduated",
      selector: (row) =>
        row?.studentStatusExtend?.yearGraduated
          ? row?.studentStatusExtend?.yearGraduated
          : "---",
    },
    {
      name: "Batch",
      selector: (row) =>
        row?.studentSchoolData?.batch?.yearRange
          ? row?.studentSchoolData?.batch?.yearRange
          : "---",
    },
    {
      name: "Graduate",
      selector: (row) =>
        row?.studentStatusExtend?.isGraduated && (
          <div className="isGraduated" title="Graduated">
            <SchoolOutlined />
          </div>
        ),
    },
  ];
  return graduatesColumn;
};

const classHandlingStudentsColumn = (columnData) => {
  const studentColumn = [
    {
      name: "Image",
      selector: (row) =>
        row?.personalInfo?.profilePicture ? (
          <HashLink
            to={`/sensec/admin/${columnData?.adminCurrentAction}/${
              columnData?.adminCurrentLink
            }/${row?.personalInfo?.firstName?.replace(/ /g, "_")}_${
              row?.personalInfo?.lastName
            }/${row?.uniqueId}/student_info#studentInfo`}
            title="View Student Info"
          >
            <Avatar
              // className="studentImg"
              src={
                row?.personalInfo
                  ? row?.personalInfo?.profilePicture?.url
                  : row?.personalInfo?.profilePicture
              }
              sx={{
                width: "1.5em",
                height: "1.5em",
                borderRadius: ".4rem",
                objectFit: "cover",
              }}
              alt=""
            />
          </HashLink>
        ) : (
          <HashLink
            className="noImgLink"
            to={`/sensec/admin/${columnData?.adminCurrentAction}/${
              columnData?.adminCurrentLink
            }/${row?.personalInfo?.firstName?.replace(/ /g, "_")}_${
              row?.personalInfo?.lastName
            }/${row?.personalInfo?.uniqueId}/student_info#studentInfo`}
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
      name: "Full Name",
      selector: (row) => (
        <p title={row?.personalInfo?.fullName}>{row?.personalInfo?.fullName}</p>
      ),
      sortable: true,
    },
    {
      name: "Date Of Birth",
      selector: (row) => {
        if (!row?.personalInfo?.dateOfBirth) return "---";
        const date = new Date(row?.personalInfo?.dateOfBirth);
        // Adjust for timezones explicitly if needed
        const utcDate = new Date(
          date.getTime() + date.getTimezoneOffset() * 60000
        );
        return (
          <p title={dateFormatter.format(utcDate)}>
            {dateFormatter.format(utcDate)}
          </p>
        );
      },
    },
    {
      name: "Programme",
      selector: (row) =>
        row?.studentSchoolData ? row.studentSchoolData?.program?.name : "---",
    },
    {
      name: "Student-ID",
      selector: (row) => {
        const maskedId = `${row?.uniqueId.slice(
          0,
          3
        )}******${row?.uniqueId.slice(-2)}`;
        return <p title={row?.uniqueId}>{maskedId}</p>;
      },
      sortable: true,
    },
    // {
    //   name: "Email",
    //   selector: (row) =>
    //     row?.contactAddress?.email ? row?.contactAddress?.email : "---",
    // },
    // {
    //   name: "Enrolled Date",
    //   selector: (row) =>
    //     dateFormatter.format(new Date(row?.studentStatusExtend?.dateEnrolled)),
    // },
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
                <SchoolOutlined />
              </div>
            )}
          </div>
        ),
    },
    // {
    //   name: "Promote",
    //   selector: (row) =>
    //     row?.studentSchoolData?.currentClassLevel && (
    //       <>
    //         {row?.studentSchoolData?.currentClassLevel?.name ===
    //           "Level 100" && (
    //           <>
    //             <HashLink
    //               to={"#"}
    //               className="approveLink"
    //               onClick={async () => {
    //                 // Do not open modal if approval/rejection is in progress
    //                 if (
    //                   !columnData?.demotionInProgress &&
    //                   !columnData?.promotionInProgress
    //                 ) {
    //                   columnData?.setCurrentStudent(row._id);
    //                   columnData?.setOpenPromotionModal(true);
    //                   columnData?.setOpenDemotionModal(false);
    //                 }
    //               }}
    //             >
    //               {columnData?.studentToPromote &&
    //                 columnData?.studentToPromote._id === row._id && (
    //                   <>
    //                     {columnData?.loadingComplete === false && (
    //                       <Box
    //                         className="promotionSpinner"
    //                         sx={{
    //                           marginTop: ".8rem",
    //                         }}
    //                       >
    //                         <span>Processing</span>
    //                         <span className="dot-ellipsis">
    //                           <span className="dot">.</span>
    //                           <span className="dot">.</span>
    //                           <span className="dot">.</span>
    //                         </span>
    //                       </Box>
    //                     )}
    //                     {columnData?.loadingComplete &&
    //                       columnData?.promotionStatus === "success" && (
    //                         <>
    //                           <span>Promoted</span> <TaskAlt />
    //                         </>
    //                       )}
    //                   </>
    //                 )}
    //               <>
    //                 {columnData?.loadingComplete === null && "P-L200"}
    //                 {row._id !== columnData?.studentToPromote?._id &&
    //                   columnData?.loadingComplete !== null &&
    //                   "P-L200"}
    //               </>
    //             </HashLink>
    //             {columnData?.studentToPromote &&
    //               columnData?.studentToPromote._id === row._id && (
    //                 <PromotionsModal
    //                   open={columnData?.openPromotionModal}
    //                   onClose={() => columnData?.setOpenPromotionModal(false)}
    //                   promotionFunction={promoteStudent({
    //                     studentId: row?.uniqueId,
    //                     lastPromotedBy: `${columnData?.authAdmin?.id}`,
    //                   })}
    //                   setLoadingComplete={columnData?.setLoadingComplete}
    //                   setSelectedUserToPromote={columnData?.setCurrentStudent}
    //                   selectedUserToPromoteId={row?._id}
    //                   userDataToPromote={columnData?.studentToPromote}
    //                   userDataToDemote={columnData?.studentToDemote}
    //                 />
    //               )}
    //           </>
    //         )}
    //         {row?.studentSchoolData?.currentClassLevel?.name ===
    //           "Level 200" && (
    //           <>
    //             <HashLink
    //               to={"#"}
    //               className="approveLink"
    //               onClick={async () => {
    //                 // Do not open modal if approval/rejection is in progress
    //                 if (
    //                   !columnData?.demotionInProgress &&
    //                   !columnData?.promotionInProgress
    //                 ) {
    //                   columnData?.setCurrentStudent(row._id);
    //                   columnData?.setOpenPromotionModal(true);
    //                   columnData?.setOpenDemotionModal(false);
    //                 }
    //               }}
    //             >
    //               {columnData?.studentToPromote &&
    //                 columnData?.studentToPromote._id === row._id && (
    //                   <>
    //                     {columnData?.loadingComplete === false && (
    //                       <Box
    //                         className="promotionSpinner"
    //                         sx={{
    //                           marginTop: ".8rem",
    //                         }}
    //                       >
    //                         <span>Processing</span>
    //                         <span className="dot-ellipsis">
    //                           <span className="dot">.</span>
    //                           <span className="dot">.</span>
    //                           <span className="dot">.</span>
    //                         </span>
    //                       </Box>
    //                     )}
    //                     {columnData?.loadingComplete &&
    //                       columnData?.promotionStatus === "success" && (
    //                         <>
    //                           <span>Promoted</span> <TaskAlt />
    //                         </>
    //                       )}
    //                   </>
    //                 )}
    //               <>
    //                 {columnData?.loadingComplete === null && "P-L300"}
    //                 {row._id !== columnData?.studentToPromote?._id &&
    //                   columnData?.loadingComplete !== null &&
    //                   "P-L300"}
    //               </>
    //             </HashLink>
    //             {columnData?.studentToPromote &&
    //               columnData?.studentToPromote._id === row._id && (
    //                 <PromotionsModal
    //                   open={columnData?.openPromotionModal}
    //                   onClose={() => columnData?.setOpenPromotionModal(false)}
    //                   promotionFunction={promoteStudent({
    //                     studentId: row?.uniqueId,
    //                     lastPromotedBy: `${columnData?.authAdmin?.id}`,
    //                   })}
    //                   setLoadingComplete={columnData?.setLoadingComplete}
    //                   setSelectedUserToPromote={columnData?.setCurrentStudent}
    //                   selectedUserToPromoteId={row?._id}
    //                   userDataToPromote={columnData?.studentToPromote}
    //                   userDataToDemote={columnData?.studentToDemote}
    //                 />
    //               )}
    //           </>
    //         )}
    //         {row?.studentSchoolData?.currentClassLevel?.name ===
    //           "Level 300" && (
    //           <>
    //             <HashLink
    //               to={"#"}
    //               className="approveLink"
    //               onClick={async () => {
    //                 // Do not open modal if approval/rejection is in progress
    //                 if (
    //                   !columnData?.demotionInProgress &&
    //                   !columnData?.promotionInProgress
    //                 ) {
    //                   columnData?.setCurrentStudent(row._id);
    //                   columnData?.setOpenPromotionModal(true);
    //                   columnData?.setOpenDemotionModal(false);
    //                 }
    //               }}
    //             >
    //               {columnData?.studentToPromote &&
    //                 columnData?.studentToPromote._id === row._id && (
    //                   <>
    //                     {columnData?.loadingComplete === false && (
    //                       <Box
    //                         className="promotionSpinner"
    //                         sx={{
    //                           marginTop: ".8rem",
    //                         }}
    //                       >
    //                         <span>Processing</span>
    //                         <span className="dot-ellipsis">
    //                           <span className="dot">.</span>
    //                           <span className="dot">.</span>
    //                           <span className="dot">.</span>
    //                         </span>
    //                       </Box>
    //                     )}
    //                     {columnData?.loadingComplete &&
    //                       columnData?.promotionStatus === "success" && (
    //                         <>
    //                           <span>Promoted</span> <TaskAlt />
    //                         </>
    //                       )}
    //                   </>
    //                 )}
    //               <>
    //                 {columnData?.loadingComplete === null && "Graduate"}
    //                 {row._id !== columnData?.studentToPromote?._id &&
    //                   columnData?.loadingComplete !== null &&
    //                   "Graduate"}
    //               </>
    //             </HashLink>
    //             {columnData?.studentToPromote &&
    //               columnData?.studentToPromote._id === row._id && (
    //                 <PromotionsModal
    //                   open={columnData?.openPromotionModal}
    //                   onClose={() => columnData?.setOpenPromotionModal(false)}
    //                   promotionFunction={promoteStudent({
    //                     studentId: row?.uniqueId,
    //                     lastPromotedBy: `${columnData?.authAdmin?.id}`,
    //                   })}
    //                   setLoadingComplete={columnData?.setLoadingComplete}
    //                   setSelectedUserToPromote={columnData?.setCurrentStudent}
    //                   selectedUserToPromoteId={row?._id}
    //                   userDataToPromote={columnData?.studentToPromote}
    //                   userDataToDemote={columnData?.studentToDemote}
    //                 />
    //               )}
    //           </>
    //         )}
    //       </>
    //     ),
    // },
    // {
    //   name: "Demote",
    //   selector: (row) =>
    //     row?.studentSchoolData?.currentClassLevel && (
    //       <>
    //         {row?.studentSchoolData?.currentClassLevel?.name ===
    //           "Level 100" && (
    //           <>
    //             <HashLink
    //               to={"#"}
    //               className="approveLink"
    //               style={{ color: "#696969" }}
    //             >
    //               {columnData?.demotionLoadingComplete === null &&
    //                 row?.studentSchoolData?.currentClassLevel?.name ===
    //                   "Level 100" &&
    //                 "---"}
    //               {row._id !== columnData?.studentToDemote?._id &&
    //                 columnData?.demotionLoadingComplete !== null &&
    //                 row?.studentSchoolData?.currentClassLevel?.name ===
    //                   "Level 100" &&
    //                 "---"}
    //             </HashLink>
    //             {columnData?.studentToDemote &&
    //               columnData?.studentToDemote._id === row._id && (
    //                 <DemotionsModal
    //                   open={columnData?.openDemotionModal}
    //                   onClose={() => columnData?.setOpenDemotionModal(false)}
    //                   promotionFunction={approveStudentEnrollment({
    //                     studentId: row?.uniqueId,
    //                     enrollmentApprovedBy: `${columnData?.authAdmin?.id}`,
    //                   })}
    //                   setLoadingComplete={
    //                     columnData?.setDemotionLoadingComplete
    //                   }
    //                   setSelectedUserToDemote={columnData?.setDemoteStudent}
    //                   selectedUserToDemoteId={row?._id}
    //                   userDataToPromote={columnData?.studentToPromote}
    //                   userDataToDemote={columnData?.studentToDemote}
    //                 />
    //               )}
    //           </>
    //         )}
    //         {row?.studentSchoolData?.currentClassLevel?.name ===
    //           "Level 200" && (
    //           <>
    //             <HashLink
    //               to={"#"}
    //               className="approveLink"
    //               onClick={async () => {
    //                 // Do not open modal if approval/rejection is in progress
    //                 if (
    //                   !columnData?.demotionInProgress &&
    //                   !columnData?.promotionInProgress
    //                 ) {
    //                   columnData?.setDemoteStudent(row._id);
    //                   columnData?.setOpenDemotionModal(true);
    //                   columnData?.setOpenPromotionModal(false);
    //                 }
    //               }}
    //               style={{ color: "#696969" }}
    //             >
    //               {columnData?.studentToDemote &&
    //                 columnData?.studentToDemote._id === row._id && (
    //                   <>
    //                     {columnData?.demotionLoadingComplete === false && (
    //                       <Box
    //                         className="promotionSpinner"
    //                         sx={{
    //                           marginTop: ".8rem",
    //                           color: "red",
    //                         }}
    //                       >
    //                         <span>Processing</span>
    //                         <span className="dot-ellipsis">
    //                           <span className="dot">.</span>
    //                           <span className="dot">.</span>
    //                           <span className="dot">.</span>
    //                         </span>
    //                       </Box>
    //                     )}
    //                     {columnData?.demotionLoadingComplete &&
    //                       columnData?.promotionStatus === "success" && (
    //                         <>
    //                           <span>Demoted</span> <TaskAlt />
    //                         </>
    //                       )}
    //                   </>
    //                 )}
    //               <>
    //                 {columnData?.demotionLoadingComplete === null &&
    //                   row?.studentSchoolData?.currentClassLevel?.name ===
    //                     "Level 200" &&
    //                   "D-L100"}
    //                 {row._id !== columnData?.studentToDemote?._id &&
    //                   columnData?.demotionLoadingComplete !== null &&
    //                   row?.studentSchoolData?.currentClassLevel?.name ===
    //                     "Level 200" &&
    //                   "D-L100"}
    //               </>
    //             </HashLink>
    //             {columnData?.studentToDemote &&
    //               columnData?.studentToDemote._id === row._id && (
    //                 <DemotionsModal
    //                   open={columnData?.openDemotionModal}
    //                   onClose={() => columnData?.setOpenDemotionModal(false)}
    //                   promotionFunction={approveStudentEnrollment({
    //                     studentId: row?.uniqueId,
    //                     enrollmentApprovedBy: `${columnData?.authAdmin?.id}`,
    //                   })}
    //                   setLoadingComplete={
    //                     columnData?.setDemotionLoadingComplete
    //                   }
    //                   setSelectedUserToDemote={columnData?.setDemoteStudent}
    //                   selectedUserToDemoteId={row?._id}
    //                   userDataToPromote={columnData?.studentToPromote}
    //                   userDataToDemote={columnData?.studentToDemote}
    //                 />
    //               )}
    //           </>
    //         )}
    //         {row?.studentSchoolData?.currentClassLevel?.name ===
    //           "Level 300" && (
    //           <>
    //             <HashLink
    //               to={"#"}
    //               className="approveLink"
    //               onClick={async () => {
    //                 // Do not open modal if approval/rejection is in progress
    //                 if (
    //                   !columnData?.demotionInProgress &&
    //                   !columnData?.promotionInProgress
    //                 ) {
    //                   columnData?.setDemoteStudent(row._id);
    //                   columnData?.setOpenDemotionModal(true);
    //                   columnData?.setOpenPromotionModal(false);
    //                 }
    //               }}
    //               style={{ color: "#696969" }}
    //             >
    //               {columnData?.studentToDemote &&
    //                 columnData?.studentToDemote._id === row._id && (
    //                   <>
    //                     {columnData?.demotionLoadingComplete === false && (
    //                       <Box
    //                         className="promotionSpinner"
    //                         sx={{
    //                           marginTop: ".8rem",
    //                           color: "red",
    //                         }}
    //                       >
    //                         <span>Processing</span>
    //                         <span className="dot-ellipsis">
    //                           <span className="dot">.</span>
    //                           <span className="dot">.</span>
    //                           <span className="dot">.</span>
    //                         </span>
    //                       </Box>
    //                     )}
    //                     {columnData?.demotionLoadingComplete &&
    //                       columnData?.promotionStatus === "success" && (
    //                         <>
    //                           <span>Demoted</span> <TaskAlt />
    //                         </>
    //                       )}
    //                   </>
    //                 )}
    //               <>
    //                 {columnData?.demotionLoadingComplete === null &&
    //                   row?.studentSchoolData?.currentClassLevel?.name ===
    //                     "Level 300" &&
    //                   "D-L200"}
    //                 {row._id !== columnData?.studentToDemote?._id &&
    //                   columnData?.demotionLoadingComplete !== null &&
    //                   row?.studentSchoolData?.currentClassLevel?.name ===
    //                     "Level 300" &&
    //                   "D-L200"}
    //               </>
    //             </HashLink>
    //             {columnData?.studentToDemote &&
    //               columnData?.studentToDemote._id === row._id && (
    //                 <DemotionsModal
    //                   open={columnData?.openDemotionModal}
    //                   onClose={() => columnData?.setOpenDemotionModal(false)}
    //                   promotionFunction={approveStudentEnrollment({
    //                     studentId: row?.uniqueId,
    //                     enrollmentApprovedBy: `${columnData?.authAdmin?.id}`,
    //                   })}
    //                   setLoadingComplete={
    //                     columnData?.setDemotionLoadingComplete
    //                   }
    //                   setSelectedUserToDemote={columnData?.setDemoteStudent}
    //                   selectedUserToDemoteId={row?._id}
    //                   userDataToPromote={columnData?.studentToPromote}
    //                   userDataToDemote={columnData?.studentToDemote}
    //                 />
    //               )}
    //           </>
    //         )}
    //       </>
    //     ),
    // },
    // {
    //   name: "Update",
    //   selector: (row) => (
    //     <Link
    //       className="editLink"
    //       to={`/sensec/users/${columnData?.authAdmin?.uniqueId}/admin/Students/${row.uniqueId}/student_update`}
    //     >
    //       <Edit />
    //     </Link>
    //   ),
    // },
  ];
  return studentColumn;
};

export {
  adminsColumn,
  //   hangingAdminsColumn,
  pendingAdminsColumn,
  teachersColumn,
  pendingTeachersColumn,
  //   hangingTeachersColumn,
  studentsColumn,
  pendingStudentsColumn,
  courseMatesColumn,
  //   hangingEmploymentsColumn,
  graduatesColumn,
  nTStaffsColumn,
  pendingNTStaffsColumn,
  //   hangingNTStaffsColumn,
  studentsReportColumn,
  studentsReportOverviewColumn,
  classHandlingStudentsColumn,
};
