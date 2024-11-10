export const AdminSidebarUserTypesLinks = () => {
  const quickLinks = [
    { name: "Admins" },
    { name: "Lecturers" },
    { name: "Students" },
    { name: "NT-Staffs" },
    { name: "Team" },
    { name: "Placement Students" },
    // { name: "Hanging Employments" },
  ];
  return quickLinks;
};
export const AllEmployedAdminsPageQuickLinks = () => {
  const linkButtons = [
    { label: "All" },
    { label: "Pending Admins" },
    // { label: "Hanging Employments" },
    { label: "Add New Admin +" },
  ];
  return linkButtons;
};
export const AllEmployedLecturersPageQuickLinks = () => {
  const linkButtons = [
    { label: "All" },
    { label: "Pending Lecturers" },
    // { label: "Hanging Employments" },
    { label: "Add New Lecturer +" },
  ];
  return linkButtons;
};
export const AllEmployedNTStaffsPageQuickLinks = () => {
  const linkButtons = [
    { label: "All" },
    { label: "Pending NT-Staffs" },
    // { label: "Hanging Employments" },
    { label: "Add New NT-Staff +" },
  ];
  return linkButtons;
};
export const AllStudentsPageQuickLinks = () => {
  const linkButtons = [
    { label: "Enrolled" },
    { label: "Pending Students" },
    // { label: "Hanging Students" },
    { label: "Add New Student +" },
  ];
  return linkButtons;
};
