import "./modals.scss";
import { Box, Button, Modal, Typography, Stack, Avatar } from "@mui/material";
import PropTypes from "prop-types";
import { Close, FileOpen } from "@mui/icons-material";
import DataTable from "react-data-table-component";
import { customAttendanceTableStyle } from "../../usersInfoDataFormat/usersInfoTableStyle";
import { dateFormatter } from "../../dateFormatter/DateFormatter";

export default function SearchedReportOverviewModal({ open, onClose, data }) {
  // Calculate attendance statistics
  const totalStudents = data?.students?.length || 0;
  const presentCount =
    data?.students?.filter((student) => student.status === "Present").length ||
    0;
  const absentCount = totalStudents - presentCount;

  const presentPercentage = ((presentCount / totalStudents) * 100).toFixed(1);
  const absentPercentage = ((absentCount / totalStudents) * 100).toFixed(1);

  // Define columns for the data table
  const reportOverviewColumn = [
    {
      name: "Image",
      selector: (row) =>
        row?.student?.personalInfo?.profilePicture?.url ? (
          <Box>
            <Avatar
              // className="studentImg"
              src={row?.student?.personalInfo?.profilePicture?.url}
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
          <Box className="noImgLink" title="View Student Info">
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
            {!row?.personalInfo?.gender && (
              <img className="studentImg" src={"/assets/noAvatar.png"} alt="" />
            )}
          </Box>
        ),
    },
    {
      name: "Full Name",
      selector: (row) => (
        <Box fontSize={".9em"} color={"#696969"}>
          {row?.student?.personalInfo?.fullName}
        </Box>
      ),
      sortable: true,
    },
    {
      name: "Class Score",
      selector: (row) => (
        <Box display={"flex"} sx={{ alignItems: "center" }}>
          <Typography
            sx={{
              //   width: ".5rem",
              fontSize: ".75rem", // Adjust font size of the adornment
              //   marginLeft: "0.2rem", // Prevent overlap with input
              color: "#555",
            }}
          >
            {row.classScore}
            {/* <span style={{}}>/30</span> */}
          </Typography>
          <Typography
            sx={{ fontSize: "0.75rem", color: "#af0bd8", ml: ".5rem" }}
          >
            /30
          </Typography>
        </Box>
      ),
    },
    {
      name: "Exam Score",
      selector: (row) => (
        <Box display={"flex"} sx={{ alignItems: "center" }}>
          <Typography
            sx={{
              //   width: ".5rem",
              fontSize: ".75rem", // Adjust font size of the adornment
              //   marginLeft: "0.2rem", // Prevent overlap with input
              color: "#555",
            }}
          >
            {row.examScore}
            {/* <span style={{}}>/30</span> */}
          </Typography>
          <Typography
            sx={{ fontSize: "0.75rem", color: "#0b94d8", ml: ".5rem" }}
          >
            /70
          </Typography>
        </Box>
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
        const getGrade = row?.grade || 0;
        // Grade background color checker
        const gradeBgColor = (userData) => {
          if (userData === "A1") return "green";
          if (userData === "B2") return "#12b207";
          if (userData === "B3") return "#b9b10d";
          if (userData === "C4") return "#b6ba6a";
          if (userData === "C5") return "#0689a7";
          if (userData === "C6") return "#0e596a";
          if (userData === "D7") return "#584646";
          if (userData === "E8") return "#763c3c";
          return "#c30505"; // For scores below 40
        };
        return (
          <Box
            bgcolor={gradeBgColor(getGrade)}
            sx={{
              padding: ".2rem",
              borderRadius: ".4rem",
              color: "#fff",
              fontSize: ".9em",
            }}
          >
            {getGrade || 0}
          </Box>
        );
      },
    },
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Remark</p>
        </Box>
      ),
      selector: (row) => (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p
            // style={{ fontSize: ".8em" }}
            title={""}
          >
            <FileOpen
              sx={{ fontSize: "1em", color: "#0aa30a", cursor: "pointer" }}
              titleAccess="View Data"
              //   onClick={() => {
              //     setOverviewStudents(row);
              //     // if (!row?.currentTeacher) {
              //     setOpenAttendanceOverviewModal(true);
              //     // }
              //   }}
            />
          </p>
        </Box>
      ),
      // sortable: true,
    },
    // {
    //   name: "Remark",
    //   selector: (row) => {
    //     return (
    //       <>
    //         {/* {!columnData?.subjectMultiStudentsReports ? (
    //           <Button
    //             size="small"
    //             sx={{
    //               padding: ".2rem",
    //               borderRadius: ".4rem",
    //               color: "#0ab312",
    //               fontSize: ".9em",
    //               textTransform: "capitalize",
    //               ":hover": {
    //                 backgroundColor: "transparent",
    //               },
    //             }}
    //             onClick={() => {
    //               columnData?.setStudentId(row?.uniqueId);
    //               columnData?.setOpenRemarkModal(true);
    //             }}
    //           >
    //             {!row?.remark ? (
    //               <>
    //                 Add <Add fontSize=".8em" />
    //               </>
    //             ) : (
    //               <Edit style={{ color: "#696969" }} />
    //             )}
    //           </Button>
    //         ) : (
    //           "---"
    //         )} */}
    //       </>
    //     );
    //   },
    // },
    // {
    //   name: "Save",
    //   selector: (row) => {
    //     const disableBtn = Boolean(
    //       columnData?.subjectMultiStudentsReports &&
    //         columnData?.subjectMultiStudentsReports?.subject ===
    //           columnData?.draftReportInfo?.subject
    //     );
    //     return (
    //       <Button
    //         disabled={disableBtn}
    //         // sx={{
    //         //   // color: "#fff !important",
    //         //   "&.Mui-disabled": {
    //         //     cursor: "not-allowed", // Show not-allowed cursor
    //         //     pointerEvents: "auto",
    //         //   },
    //         // }}
    //         sx={{
    //           textTransform: "capitalize",
    //           ":hover": {
    //             backgroundColor: "transparent",
    //           },
    //           color:
    //             columnData?.subjectMultiStudentsReports &&
    //             columnData?.subjectMultiStudentsReports?.subject ===
    //               columnData?.draftReportInfo?.subject
    //               ? ""
    //               : "#03950a !important",
    //           "&.Mui-disabled": {
    //             cursor: "not-allowed", // Show not-allowed cursor
    //             pointerEvents: "auto",
    //           },
    //         }}
    //         // className="editLink"
    //         onClick={async () => {
    //           // Only set current student if data saving is not in progress
    //           if (!columnData?.saveDataInProgress) {
    //             columnData?.setCurrentStudent(row._id);
    //           }
    //         }}
    //       >
    //         {columnData?.foundStudent &&
    //           columnData?.foundStudent._id === row._id && (
    //             <>
    //               {columnData?.loadingComplete === false && (
    //                 <Box
    //                   className="promotionSpinner"
    //                   sx={{
    //                     // marginTop: ".8rem",
    //                     fontSize: "calc( 0.7rem 1vmin)",
    //                   }}
    //                 >
    //                   <span style={{ fontSize: "1em" }}>Saving</span>
    //                   <span className="dot-ellipsis">
    //                     <span className="dot">.</span>
    //                     <span className="dot">.</span>
    //                     <span className="dot">.</span>
    //                   </span>
    //                 </Box>
    //               )}
    //               {columnData?.loadingComplete &&
    //                 columnData?.createStatus === "success" && (
    //                   <Box
    //                     sx={{ display: "flex", alignItems: "center" }}
    //                     fontSize={".8em"}
    //                   >
    //                     <span>Saved</span> <TaskAlt />
    //                   </Box>
    //                 )}
    //             </>
    //           )}
    //         <>
    //           {columnData?.loadingComplete === null && (
    //             <Save
    //               titleAccess="Save"
    //               onClick={() => {
    //                 const data = {
    //                   studentId: row?.uniqueId,
    //                   classScore: row?.classScore,
    //                   examScore: row?.examScore,
    //                   totalScore: row?.totalScore,
    //                   remark: row?.remark,
    //                   semester: columnData?.currentAcademicTerm?.name,
    //                   classLevel: columnData?.classLevel,
    //                   subject: columnData?.selectedSubject,
    //                   lecturer: columnData?.authUser?.id,
    //                   year: new Date().getFullYear(),
    //                   isDraftSave: true,
    //                 };
    //                 if (!disableBtn) {
    //                   columnData?.dispatch(createStudentReport(data));
    //                 }
    //               }}
    //             />
    //           )}
    //           {row?._id !== columnData?.foundStudent?._id &&
    //             columnData?.loadingComplete !== null && (
    //               <Save
    //                 titleAccess="Save"
    //                 onClick={() => {
    //                   const data = {
    //                     studentId: row?.uniqueId,
    //                     classScore: row?.classScore,
    //                     examScore: row?.examScore,
    //                     totalScore: row?.totalScore,
    //                     semester: columnData?.currentAcademicTerm?.name,
    //                     classLevel: columnData?.classLevel,
    //                     subject: columnData?.selectedSubject,
    //                     lecturer: columnData?.authUser?.id,
    //                     year: new Date().getFullYear(),
    //                     isDraftSave: true,
    //                   };
    //                   if (!disableBtn) {
    //                     columnData?.dispatch(createStudentReport(data));
    //                   }
    //                 }}
    //               />
    //             )}
    //         </>
    //       </Button>
    //     );
    //   },
    // },
  ];

  if (!open) return null;
  return (
    <Modal
      open={open}
      // onClose={!confirmed ? onClose : ""}
      aria-labelledby="responsive-modal-title"
      aria-describedby="responsive-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95%", sm: { minWidth: "70rem" } }, // Responsive width based on screen size
          maxWidth: { md: "70rem", lg: "70rem" }, // Responsive width based on screen size
          bgcolor: "background.paper",
          borderRadius: 2,
          //   boxShadow: 24,
          outline: "none",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            margin: ".5rem",
          }}
        >
          <Box
            className="newEmploymentModalOverlay"
            sx={{
              //   position: "absolute",
              //   top: "50%",
              //   left: "50%",
              //   transform: "translate(-50%, -50%)",
              //   width: { xs: 300, sm: 400, md: 500 }, // Responsive width based on screen size
              //   bgcolor: "background.paper",
              //   borderRadius: 2,
              // boxShadow: 24,
              //   outline: "none",
              padding: { xs: 1, sm: 2 },
              // minHeight: "20rem",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                right: "2rem",
                cursor: "pointer",
                zIndex: 5,
              }}
            >
              <Close
                titleAccess="Close"
                onClick={() => {
                  onClose();
                }}
                style={{
                  backgroundColor: "#292929",
                  color: "#fff",
                  borderRadius: "20%",
                  fontSize: "1.2rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </Box>
            {/* Modal Content */}
            <Typography
              id="responsive-modal-title"
              variant="h6"
              component="h2"
              textAlign={{ xs: "center", sm: "left" }}
              mb={2}
            >
              Attendance Overview
            </Typography>
            <Box
              fontSize={"calc(0.7rem + 1vmin)"}
              //   sx={{ border: "1px solid #ccc" }}
              className="attendanceOverviewWrap"
            >
              <Box
                p={".5rem 1rem"}
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: ".4rem .4rem 0 0",
                }}
              >
                <Typography
                  id="responsive-modal-title"
                  variant="h6"
                  fontWeight={400}
                  fontSize={".8em"}
                  color="#292929"
                >
                  Semester:{" "}
                  <span style={{ color: "#696969" }}>{data?.semester}</span>
                </Typography>
                <Typography
                  id="responsive-modal-title"
                  variant="h6"
                  fontWeight={400}
                  fontSize={".8em"}
                  color="#292929"
                >
                  Date:{" "}
                  <span style={{ color: "#696969" }}>
                    {data?.createdAt
                      ? dateFormatter?.format(new Date(data?.createdAt))
                      : "---"}
                  </span>
                </Typography>
                <Typography
                  id="responsive-modal-title"
                  variant="h6"
                  fontWeight={400}
                  fontSize={".8em"}
                  color="#292929"
                >
                  Class Level:{" "}
                  <span style={{ color: "#696969" }}>
                    {data?.classLevel?.name ? data?.classLevel?.name : "---"}
                  </span>
                </Typography>
                <Typography
                  id="responsive-modal-title"
                  variant="h6"
                  fontWeight={400}
                  fontSize={".8em"}
                  color="#292929"
                >
                  Subject:{" "}
                  <span style={{ color: "#696969" }}>
                    {data?.subject?.subjectName
                      ? data?.subject?.subjectName
                      : "---"}
                  </span>
                </Typography>
                <Typography
                  id="responsive-modal-title"
                  variant="h6"
                  fontWeight={400}
                  fontSize={".8em"}
                  color="#292929"
                >
                  Student Count:{" "}
                  <span style={{ color: "#696969" }}>
                    {data?.students?.length > 0 ? data?.students?.length : 0}
                  </span>
                </Typography>
                <Typography
                  id="responsive-modal-title"
                  variant="h6"
                  fontWeight={400}
                  fontSize={".8em"}
                  color="#292929"
                >
                  Present Count:{" "}
                  <span style={{ color: "#696969" }}>
                    {presentCount} / {presentPercentage}%
                  </span>
                </Typography>
                <Typography
                  id="responsive-modal-title"
                  variant="h6"
                  fontWeight={400}
                  fontSize={".8em"}
                  color="#292929"
                >
                  Absent Count:{" "}
                  <span style={{ color: "#696969" }}>
                    {absentCount} / {absentPercentage}%
                  </span>
                </Typography>
              </Box>
              <DataTable
                className="my-data-table"
                columns={reportOverviewColumn}
                data={data?.students}
                customStyles={customAttendanceTableStyle}
                pagination
                // selectableRows
                // selectableRowsHighlight
                highlightOnHover
                // onSelectedRowsChange={handleMultiSelect}
                // clearSelectedRows={toggleClearRows}
              />
            </Box>
            {/* Action Buttons */}
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "flex-end", mt: 2 }}
            >
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => {
                  onClose();
                }}
                sx={{
                  transition: ".5s ease",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "red",
                    color: "#fff",
                  },
                }}
              >
                Close
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
SearchedReportOverviewModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.object,
};
