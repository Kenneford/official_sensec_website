const customUserTableStyle = {
  headRow: {
    style: {
      backgroundColor: "#555",
      color: "#fff",
    },
  },
  headColumn: {
    style: {
      // color: "#fff",
    },
  },
  headCells: {
    style: {
      fontSize: "1.2rem",
      justifyContent: "center",
      // borderLeft: ".2rem solid red",
      // backgroundColor: "blue",
      // color: "#fff",
    },
  },
  cells: {
    style: {
      // backgroundColor: "#cccc",
      // color: "#fff",
      paddingTop: ".5rem",
      paddingBottom: ".5rem",
      fontSize: "1rem",
      justifyContent: "center",
      // marginTop: ".5rem",
      // marginBottom: ".5rem",
    },
  },
};
const customAttendanceTableStyle = {
  headRow: {
    style: {
      backgroundColor: "#555",
      color: "#fff",
      fontSize: "1rem",
      borderRadius: "unset",
      border: "1px solid #292929",
    },
  },
  headColumn: {
    style: {
      border: "1px solid #cccc",
      justifyContent: "center",
      // color: "#fff",
    },
  },
  headCells: {
    style: {
      border: "1px solid #cccc",
      fontSize: "1em",
      justifyContent: "center",
      // border: ".2rem solid red",
      // backgroundColor: "blue",
      // color: "#fff",
    },
  },
  cells: {
    style: {
      // backgroundColor: "#cccc",
      // color: "#fff",
      // paddingTop: ".5rem",
      // paddingBottom: ".5rem",
      fontSize: ".9em",
      justifyContent: "center",
      border: "1px solid #cccc",
      // marginTop: ".5rem",
      // marginBottom: ".5rem",
    },
  },
};
// Define conditional row styles
const conditionalRowStyles = [
  {
    when: (row) => row.enrolled,
    style: {
      backgroundColor: "#2c852c",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#227e22",
        color: "#fff",
      },
    },
  },
  {
    when: (row) => row.isGraduated,
    style: {
      backgroundColor: "#616261",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#4d4e4d",
        color: "#fff",
      },
    },
  },
  {
    when: (row) => !row.enrolled, // Optional: Styling for unenrolled
    style: {
      backgroundColor: "#f46c6c",
      color: "white",
      "&:hover": {
        backgroundColor: "#f35959",
        color: "white",
      },
    },
  },
];
export {
  customUserTableStyle,
  customAttendanceTableStyle,
  conditionalRowStyles,
};
