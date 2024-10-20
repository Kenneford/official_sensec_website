import React from "react";
import { Outlet, useParams } from "react-router-dom";
import {
  AllAdmins,
  HangingAdmins,
  HangingLecturers,
  LecturersData,
  PendingAdmins,
  PendingLecturers,
} from "../../../lazyLoading/admin/AdminLazyLoadingComponents";
import { Box } from "@mui/material";

export function UserTypesContainer({ searchAdmin, setSearchAdmin }) {
  const { employees_link, adminCurrentLink } = useParams();
  console.log(adminCurrentLink);
  return (
    <Box>
      <Box>
        {adminCurrentLink === "Admins" && employees_link === "All" && (
          <AllAdmins
            searchAdmin={searchAdmin}
            setSearchAdmin={setSearchAdmin}
          />
        )}
        {adminCurrentLink === "Admins" &&
          employees_link === "Pending_Admins" && <PendingAdmins />}
        {adminCurrentLink === "Admins" &&
          employees_link === "Hanging_Employments" && <HangingAdmins />}
        {adminCurrentLink === "Lecturers" && employees_link === "All" && (
          <LecturersData />
        )}
        {adminCurrentLink === "Lecturers" &&
          employees_link === "Hanging_Employments" && <HangingLecturers />}
        {adminCurrentLink === "Lecturers" &&
          employees_link === "Pending_Lecturers" && <PendingLecturers />}
        {/* {adminCurrentLink === "Hanging_Employments" &&
          employees_link === "All" && <AllHangingEmploymentsData />} */}
        {/* {adminCurrentLink === "Hanging_Employments" &&
          employees_link === "Admins" && <HangingAdminsCategory />} */}
        {/* {adminCurrentLink === "Hanging_Employments" &&
          employees_link === "Lecturers" && <HangingTeachersCategory />} */}
        {/* {adminCurrentLink === "Hanging_Employments" &&
          employees_link === "NT-Staffs" && <HangingNTStaffsCategory />} */}
        {/* {adminCurrentLink === "NT-Staffs" && employees_link === "All" && (
          <NTStaffsData />
        )} */}
        {/* {adminCurrentLink === "NT-Staffs" &&
          employees_link === "Pending_NT-Staffs" && <PendingNTStaffs />} */}
        {/* {adminCurrentLink === "NT-Staffs" &&
          employees_link === "Hanging_Employments" && <HangingNTStaffs />} */}
      </Box>
      <Outlet />
    </Box>
  );
}
