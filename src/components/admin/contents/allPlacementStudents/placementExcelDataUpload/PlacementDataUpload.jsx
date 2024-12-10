import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
// import { processExcelFile } from "./handleExcelFileUploads/handleExcelFileUploads";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
  CustomTextField,
  FileInput,
} from "../../../../../muiStyling/muiStyling";
import {
  fetchAllPlacementSBatches,
  fetchAllPlacementStudents,
  resetPlacementUploadErrorState,
  resetPlacementUploadState,
  uploadPlacementFile,
} from "../../../../../features/academics/placementSlice";
import { toast } from "react-toastify";
import { processExcelFile } from "../handleExcelFileUploads/handleExcelFileUploads";
import { getAuthUser } from "../../../../../features/auth/authSlice";
import LoadingProgress from "../../../../pageLoading/LoadingProgress";
import { TaskAlt } from "@mui/icons-material";

export default function UploadPlacementExcelData() {
  const authAdmin = useSelector(getAuthUser);
  const { uploadExcelFileStatus, error, successMessage } = useSelector(
    (state) => state.placement
  );
  console.log(authAdmin);

  const [file, setFile] = useState(null);
  const [fileUploadErrorMsg, setFileUploadErrorMsg] = useState("");
  const [loadingComplete, setLoadingComplete] = useState(null);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    placementYear: "",
    students: [],
    uploadedBy: authAdmin?.id,
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      processExcelFile(file, data, setData);
    }
  };
  // Handle input value change
  const handleInputValue = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(uploadPlacementFile(data));
    console.log(data);
  };

  useEffect(() => {
    if (uploadExcelFileStatus === "pending") {
      setLoadingComplete(false);
    }
    if (uploadExcelFileStatus === "rejected") {
      console.log(error);
      setTimeout(() => {
        setLoadingComplete(null);
        setFileUploadErrorMsg(error?.errorMessage?.message);
      }, 3000);
    }
    if (uploadExcelFileStatus === "success") {
      setTimeout(() => {
        toast.success(successMessage, {
          position: "top-right",
          theme: "dark",
          toastId: successMessage,
        });
      }, 2000);
      setTimeout(() => {
        setLoadingComplete(true);
        dispatch(fetchAllPlacementSBatches());
      }, 3000);
      setTimeout(() => {
        setData({
          placementYear: "",
          students: [],
          uploadedBy: authAdmin?.id,
        });
        setFile(null);
        setLoadingComplete(null);
        dispatch(resetPlacementUploadState());
      }, 6000);
    }
  }, [error, uploadExcelFileStatus, successMessage, dispatch, authAdmin]);

  return (
    <Box className="placementExcelFileUploadWrap">
      <h2>Upload Placement File</h2>
      {fileUploadErrorMsg && (
        <Button
          fullWidth
          style={{
            backgroundColor: "#e12020",
            color: "#fff",
            textAlign: "center",
            padding: ".5rem",
            fontSize: "1rem",
            letterSpacing: "1px",
            textTransform: "capitalize",
            minHeight: "2rem",
          }}
          onClick={() => {
            setFileUploadErrorMsg("");
            dispatch(resetPlacementUploadErrorState());
          }}
        >
          {fileUploadErrorMsg} Click on message to close!
        </Button>
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
              value={data?.placementYear}
              onChange={handleInputValue}
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
              {loadingComplete === false && (
                <LoadingProgress color={"#fff"} size={"1.5rem"} />
              )}
              {loadingComplete === true &&
                uploadExcelFileStatus === "success" && (
                  <>
                    <span>Successful</span> <TaskAlt />
                  </>
                )}
              {loadingComplete === null && "Save File"}
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* <pre>{JSON.stringify(excelData, null, 1)}</pre>{" "} */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </Box>
  );
}
