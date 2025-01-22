import { Box } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ElectiveReport } from "./ElectiveReport";
import { CoreReport } from "./CoreReport";

export function CreateReport() {
  const { lecturerCurrentAction, lecturerCurrentLink } = useParams();
  const [takeCoreSubjectReport, setTakeCoreSubjectReport] = useState(false);
  const [allCoreSubjectStudents, setAllCoreSubjectStudents] = useState([]);
  const [allElectiveSubjectStudents, setAllElectiveSubjectStudents] = useState(
    []
  );
  return (
    <>
      {/* Current dashboard title */}
      {/* <Box
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
          {lecturerCurrentAction?.replace(/_/g, " ")} /{" "}
          <span>
            {lecturerCurrentLink?.replace(
              /_/g,
              `${takeCoreSubjectReport ? " Core " : " Elective "}`
            )}
          </span>
        </h1>
      </Box> */}
      {!takeCoreSubjectReport && (
        <ElectiveReport
          setTakeCoreSubjectReport={setTakeCoreSubjectReport}
          takeCoreSubjectReport={takeCoreSubjectReport}
          allCoreSubjectStudents={allCoreSubjectStudents}
          setAllCoreSubjectStudents={setAllCoreSubjectStudents}
          allElectiveSubjectStudents={allElectiveSubjectStudents}
          setAllElectiveSubjectStudents={setAllElectiveSubjectStudents}
        />
      )}
      {/* {takeCoreSubjectReport && (
        <CoreReport
          setTakeCoreSubjectReport={setTakeCoreSubjectReport}
          takeCoreSubjectReport={takeCoreSubjectReport}
          allCoreSubjectStudents={allCoreSubjectStudents}
          setAllCoreSubjectStudents={setAllCoreSubjectStudents}
          allElectiveSubjectStudents={allElectiveSubjectStudents}
          setAllElectiveSubjectStudents={setAllElectiveSubjectStudents}
        />
      )} */}
    </>
  );
}
