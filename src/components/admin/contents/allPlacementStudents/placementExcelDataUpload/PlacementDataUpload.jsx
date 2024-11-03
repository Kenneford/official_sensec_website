import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
// import { useDispatch, useSelector } from "react-redux";
// import { processExcelFile } from "./handleExcelFileUploads/handleExcelFileUploads";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
  CustomTextField,
  FileInput,
} from "../../../../../muiStyling/muiStyling";

export default function UploadPlacementExcelData() {
  const authUser = {};
  // const { uploadExcelFileStatus, uploadExcelFileError } = useSelector(
  //   (state) => state.placement
  // );
  console.log(authUser);

  const [file, setFile] = useState(null);
  const [fileUploadErrorMsg, setFileUploadErrorMsg] = useState("");
  const [datas, setDatas] = useState({
    placementYear: "",
    uploadedBy: authUser?.id,
  });
  // const dispatch = useDispatch();

  const [data, setData] = useState({
    placementYear: "",
    students: [],
    uploadedBy: authUser?.id,
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      // processExcelFile(file, data, setData);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // dispatch(uploadPlacementFile(data));
    console.log(data);
  };

  // useEffect(() => {
  //   if (uploadExcelFileStatus === "rejected") {
  //     console.log(uploadExcelFileError);
  //     setTimeout(() => {
  //       setFileUploadErrorMsg(uploadExcelFileError?.errorMessage?.message);
  //     }, 3000);
  //     //   setTimeout(() => {
  //     //     setFileUploadErrorMsg("");
  //     //   }, 6000);
  //   }
  // }, [uploadExcelFileError, uploadExcelFileStatus]);

  return (
    <Box className="placementExcelFileUploadWrap">
      <h2>Upload Placement File</h2>
      {fileUploadErrorMsg && (
        <p
          style={{
            backgroundColor: "#d50303",
            color: "#fff",
            textAlign: "center",
            padding: ".5rem",
            fontSize: "1.2rem",
            letterSpacing: "1px",
          }}
        >
          {fileUploadErrorMsg}
        </p>
      )}
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          // flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2rem",
          padding: ".5rem 0",
        }}
      >
        <Grid container spacing={1}>
          {/* <Grid item xs={2.5} sm={2}>
            <input
              type="file"
              onChange={handleFileUpload}
              style={{ backgroundColor: "red" }}
            />
          </Grid> */}
          <Grid item xs={6} sm={3} md={2.5}>
            <label htmlFor="upload-excel">
              <FileInput
                accept=".xlsx, .xls"
                id="upload-excel"
                type="file"
                onChange={handleFileUpload} // Capture the selected file
              />
              <Button
                variant="contained"
                component="span"
                sx={{
                  width: "100%",
                  height: "3rem", // Custom height
                  borderRadius: ".4rem",
                  textAlign: "center",
                  backgroundColor: "#fff",
                  color: "#696969",
                  fontSize: "calc(0.7rem + 1vmin)",
                  // minWidth: "150px", // Optional: to maintain size
                  // padding: "10px 20px", // Optional: adjust padding
                }}
              >
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "100%",
                    fontSize: ".8em",
                    textTransform: "capitalize",
                  }}
                >
                  {file ? file?.name : "Choose Excel File"}
                </Typography>
              </Button>
            </label>
          </Grid>
          <Grid
            item
            xs={6}
            sm={3}
            md={2.5}
            sx={{
              fontSize: "calc(0.7rem + 1vmin)",
            }}
          >
            <input
              type="text"
              name="placementYear"
              placeholder="Placement Year"
              onChange={(e) =>
                setData({ ...data, placementYear: e.target.value })
              }
              style={{
                width: "100%",
                textTransform: "capitalize",
              }}
            />
          </Grid>
          {/* <button type="submit">Upload</button> */}
          <Grid item xs={12} sm={2.5} md={1.7}>
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "green",
                borderRadius: ".4rem",
                width: "100%",
                textTransform: "capitalize",
              }}
            >
              Save File
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* <pre>{JSON.stringify(excelData, null, 1)}</pre>{" "} */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </Box>
  );
}
