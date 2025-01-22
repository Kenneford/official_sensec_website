import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import {
  AllAdmins,
  AssignLectureClassForm,
  HangingAdmins,
  HangingLecturers,
  LecturersData,
  NTStaffsData,
  PendingAdmins,
  PendingLecturers,
  PendingNTStaffs,
} from "../../../lazyLoading/admin/AdminLazyLoadingComponents";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getAuthUser } from "../../../../features/auth/authSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import SearchForm from "../../../searchForm/SearchForm";
import { NavigationBar } from "../../../navbar/NavigationBar";
import NotAuthorized from "../../../notAuthorized/NotAuthorized";

export function UserTypesContainer() {
  const authUser = useSelector(getAuthUser);
  const { employees_link, adminCurrentLink } = useParams();

  useEffect(() => {
    if (!authUser?.roles?.includes("Admin")) {
      toast.error("You are not an authorized user!", {
        position: "top-right",
        theme: "light",
        toastId: "unAuthorizedInfo",
      });
      return;
    }
  }, [authUser]);

  if (!authUser?.roles?.includes("Admin")) {
    return <NotAuthorized />;
  }
  return (
    <Box>
      <Box>
        {adminCurrentLink === "Admins" && employees_link === "All" && (
          <AllAdmins />
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
        {adminCurrentLink === "Lecturers" &&
          employees_link === "assign_class" && <AssignLectureClassForm />}
        {/* {adminCurrentLink === "Hanging_Employments" &&
          employees_link === "All" && <AllHangingEmploymentsData />} */}
        {/* {adminCurrentLink === "Hanging_Employments" &&
          employees_link === "Admins" && <HangingAdminsCategory />} */}
        {/* {adminCurrentLink === "Hanging_Employments" &&
          employees_link === "Lecturers" && <HangingTeachersCategory />} */}
        {/* {adminCurrentLink === "Hanging_Employments" &&
          employees_link === "NT-Staffs" && <HangingNTStaffsCategory />} */}
        {adminCurrentLink === "NT-Staffs" && employees_link === "All" && (
          <NTStaffsData />
        )}
        {adminCurrentLink === "NT-Staffs" &&
          employees_link === "Pending_NT-Staffs" && <PendingNTStaffs />}
        {/* {adminCurrentLink === "NT-Staffs" &&
          employees_link === "Hanging_Employments" && <HangingNTStaffs />} */}
      </Box>
      <Outlet />
    </Box>
  );
}
