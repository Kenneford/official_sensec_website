import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { fetchAllProgrammes } from "../../../../features/academics/programmeSlice";
import { Home, Info, Settings } from "@mui/icons-material";

export default function AttendancePage() {
  // const dispatch = useDispatch();
  // const { allProgrammes, loading } = useSelector((state) => state.programme);
  // const [selectedUserId, setSelectedUserId] = React.useState("");
  // useEffect(() => {
  //   dispatch(fetchAllProgrammes());
  // }, [dispatch]);
  // return (
  //   <TextField
  //     select
  //     label="Select User"
  //     value={selectedUserId}
  //     onChange={(e) => setSelectedUserId(e.target.value)}
  //     fullWidth
  //     disabled={loading}
  //   >
  //     {loading ? (
  //       <MenuItem disabled>Loading...</MenuItem>
  //     ) : (
  //       allProgrammes.map((user) => (
  //         <MenuItem key={user._id} value={user.id}>
  //           {user.name}
  //         </MenuItem>
  //       ))
  //     )}
  //   </TextField>
  // );
  // const getAcademicYears = () => {
  //   const startYear = 2023;
  //   const currentYear = new Date().getFullYear();
  //   const currentMonth = new Date().getMonth();
  //   // If the current month is September or later, increment the end year for the academic range
  //   const endYear = currentMonth >= 8 ? currentYear : currentYear - 1;
  //   const academicYears = [];
  //   // Generate academic years from 2020 up to the calculated end year
  //   for (let year = startYear; year <= endYear; year++) {
  //     academicYears.push(`${year}/${year + 1}`);
  //   }
  //   return academicYears;
  // };
  // const academicYears = getAcademicYears();
  // return (
  //   <FormControl fullWidth>
  //     <InputLabel>Academic Year</InputLabel>
  //     <Select label="Academic Year">
  //       {academicYears.map((year) => (
  //         <MenuItem key={year} value={year}>
  //           {year}
  //         </MenuItem>
  //       ))}
  //     </Select>
  //   </FormControl>
  // );

  const [hovered, setHovered] = useState(false);

  const drawerWidthCollapsed = 60; // Collapsed width
  const drawerWidthExpanded = 200; // Expanded width
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          width: hovered ? drawerWidthExpanded : drawerWidthCollapsed,
          transition: "width 0.3s",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: hovered ? drawerWidthExpanded : drawerWidthCollapsed,
            transition: "width 0.3s",
            overflowX: "hidden",
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <List>
            <ListItem button>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              {hovered && <ListItemText primary="Home" />}
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              {hovered && <ListItemText primary="Settings" />}
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              {hovered && <ListItemText primary="About" />}
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Main content goes here */}
        <h1>Welcome to the Main Content Area</h1>
      </Box>
    </Box>
  );
}
