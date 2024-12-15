import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { EnrollmentSuccessOverview } from "../../EnrollmentSuccessOverview";
import { StudentDataOverview } from "../../StudentDataOverview";
import UpdateEnrollmentData from "../../UpdateEnrollmentData";

export function EnrollmentSuccessLinksContainer() {
  const { current_link } = useParams();
  return (
    <Box>
      {current_link === "Overview" && <EnrollmentSuccessOverview />}
      {current_link === "View_Profile" && <StudentDataOverview />}
      {current_link === "Update" && <UpdateEnrollmentData />}
    </Box>
  );
}
