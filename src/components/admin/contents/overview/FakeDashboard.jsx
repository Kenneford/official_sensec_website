import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { fetchAllProgrammes } from "../../../../features/academics/programmeSlice";

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

  const getAcademicYears = () => {
    const startYear = 2023;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    // If the current month is September or later, increment the end year for the academic range
    const endYear = currentMonth >= 8 ? currentYear : currentYear - 1;
    const academicYears = [];

    // Generate academic years from 2020 up to the calculated end year
    for (let year = startYear; year <= endYear; year++) {
      academicYears.push(`${year}/${year + 1}`);
    }

    return academicYears;
  };

  const academicYears = getAcademicYears();

  return (
    <FormControl fullWidth>
      <InputLabel>Academic Year</InputLabel>
      <Select label="Academic Year">
        {academicYears.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
