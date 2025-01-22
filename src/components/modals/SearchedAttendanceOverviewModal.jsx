import "./modals.scss";
import {
  Box,
  Button,
  Modal,
  Typography,
  Stack,
  InputAdornment,
  Avatar,
  MenuItem,
  Grid,
} from "@mui/material";
import PropTypes from "prop-types";
import { assignSubjectLecturer } from "../../features/academics/subjectsSlice";
import { useEffect, useState } from "react";
import { CustomTextField } from "../../muiStyling/muiStyling";
import { Close, Search, TaskAlt } from "@mui/icons-material";
import { FetchAllLecturers } from "../../data/lecturers/FetchLecturers";
import { FetchAllFlattenedProgrammes } from "../../data/programme/FetchProgrammeData";
import { FetchAllClassLevels } from "../../data/class/FetchClassLevel";
import { useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import { customAttendanceTableStyle } from "../../usersInfoDataFormat/usersInfoTableStyle";

export default function SearchedAttendanceOverviewModal({
  open,
  onClose,
  data,
}) {
  const allLecturers = FetchAllLecturers();
  const allClassLevels = FetchAllClassLevels();
  const allFlattenedProgrammes = FetchAllFlattenedProgrammes();
  console.log(allLecturers);
  const [confirmed, setConfirmed] = useState(false);
  const [selectedLecturerInfo, setSelectedLecturerInfo] = useState("");
  const [selectedLecturer, setSelectedLecturer] = useState("");
  const [searchTeacher, setSearchTeacher] = useState("");
  const [programme, setProgramme] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const dispatch = useDispatch();
  console.log(classLevel);
  console.log(programme);

  const filteredLecturers = searchTeacher
    ? allLecturers.filter(
        (lecturer) =>
          lecturer?.personalInfo?.firstName
            ?.toLowerCase()
            ?.includes(searchTeacher.toLowerCase()) ||
          lecturer?.personalInfo?.lastName
            ?.toLowerCase()
            ?.includes(searchTeacher.toLowerCase())
      )
    : [];

  // Calculate attendance statistics
  const totalStudents = data?.students?.length || 0;
  const presentCount =
    data?.students?.filter((student) => student.status === "Present").length ||
    0;
  const absentCount = totalStudents - presentCount;

  const presentPercentage = ((presentCount / totalStudents) * 100).toFixed(1);
  const absentPercentage = ((absentCount / totalStudents) * 100).toFixed(1);

  // Define columns for the data table
  const columns = [
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Image</p>
        </Box>
      ),
      selector: (row) => (
        <>
          {row?.student?.personalInfo?.profilePicture?.url && (
            <Avatar
              sx={{ width: "2rem", height: "2rem" }}
              src={row?.student?.personalInfo?.profilePicture?.url}
            />
          )}
          {!row?.student?.personalInfo?.profilePicture?.url &&
            row?.student?.personalInfo?.gender === "Male" && (
              <Avatar src={"/assets/maleAvatar.png"} alt="" />
            )}
          {!row?.student?.personalInfo?.profilePicture?.url &&
            row?.student?.personalInfo?.gender === "Female" && (
              <Avatar src={"/assets/femaleAvatar.png"} alt="" />
            )}
        </>
      ),
      // sortable: true,
    },
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Unique ID</p>
        </Box>
      ),
      selector: (row) => (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }} title={row?.student?.uniqueId}>
            {row?.student?.uniqueId?.slice(0, 3)}*****
            {row?.student?.uniqueId?.slice(-2)}
          </p>
        </Box>
      ),
      // sortable: true,
    },
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Full Name</p>
        </Box>
      ),
      selector: (row) => (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p
            style={{ fontSize: ".8em" }}
            title={row?.student?.personalInfo?.fullName}
          >
            {row?.student?.personalInfo?.fullName}
          </p>
        </Box>
      ),
      sortable: true,
    },
    {
      name: (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>Status</p>
        </Box>
      ),
      cell: (row) => (
        <Box fontSize={"calc(0.7rem + 1vmin)"}>
          <p style={{ fontSize: ".8em" }}>{row?.status}</p>
        </Box>
      ),
    },
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
                  setConfirmed(false);
                  setSearchTeacher("");
                  setProgramme("");
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
                  Day Of Week:{" "}
                  <span style={{ color: "#696969" }}>{data?.dayOfTheWeek}</span>
                </Typography>
                <Typography
                  id="responsive-modal-title"
                  variant="h6"
                  fontWeight={400}
                  fontSize={".8em"}
                  color="#292929"
                >
                  Date: <span style={{ color: "#696969" }}>{data?.date}</span>
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
                columns={columns}
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
                  setConfirmed(false);
                  setSearchTeacher("");
                  setProgramme("");
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
SearchedAttendanceOverviewModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.object,
};
