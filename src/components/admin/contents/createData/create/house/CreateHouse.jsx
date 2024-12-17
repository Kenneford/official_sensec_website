import React, { useEffect, useState } from "react";
import "../create.scss";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomTextField } from "../../../../../../muiStyling/muiStyling";
import { getAuthUser } from "../../../../../../features/auth/authSlice";
import LoadingProgress from "../../../../../pageLoading/LoadingProgress";
import { createHouse } from "../../../../../../features/academics/houseSlice";
import { TaskAlt } from "@mui/icons-material";

export function CreateHouse() {
  const authAdmin = useSelector(getAuthUser);
  const { createStatus, successMessage, error } = useSelector(
    (state) => state.studentsHouse
  );
  console.log(authAdmin);
  const dispatch = useDispatch();

  const [loadingComplete, setLoadingComplete] = useState(null);
  const [house, setHouse] = useState({
    name: "",
    createdBy: `${authAdmin.id}`,
  });
  console.log(house);

  const navigate = useNavigate();

  const handleInputValues = (e) => {
    setHouse({
      ...house,
      [e.target.name]: e.target.value,
    });
  };

  const canSave = Boolean(house.name) && Boolean(house.createdBy);
  const handleHouse = (e) => {
    e.preventDefault();
    dispatch(createHouse({ data: house }));
  };

  // Create academic year status check
  useEffect(() => {
    if (createStatus === "pending") {
      setLoadingComplete(false);
    }
    if (createStatus === "rejected") {
      setTimeout(() => {
        setLoadingComplete(null);
        error?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "light",
            toastId: "createHouseError",
          })
        );
      }, 3000);
      return;
    }
    if (createStatus === "success") {
      setTimeout(() => {
        setLoadingComplete(true);
      }, 3000);
      setTimeout(() => {
        setLoadingComplete(null);
        setHouse({
          name: "",
          createdBy: `${authAdmin.id}`,
        });
      }, 6000);
    }
  }, [error, successMessage, createStatus, authAdmin]);

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "85%", md: "75%", lg: "60%", xl: "50%" },
        margin: "auto",
        paddingTop: "2rem",
        display: "flex",
        flexDirection: "column",
      }}
      className="createDataWrap"
    >
      <Box component={"form"} onSubmit={handleHouse} minHeight={220} p={2}>
        <h1>House Form</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} lg={6} className="inputCont">
            <CustomTextField
              fullWidth
              label="Name"
              name="name"
              onChange={handleInputValues}
              value={house?.name}
              required
              className="textField"
              sx={{
                "&:hover": {
                  borderColor: "none",
                },
              }}
            />
          </Grid>
        </Grid>
        <Button type="submit" disabled={!canSave}>
          {loadingComplete === false && (
            <LoadingProgress color={"#fff"} size={"1.3rem"} />
          )}
          {loadingComplete === true && createStatus === "success" && (
            <>
              <span>Successful</span> <TaskAlt />
            </>
          )}
          {loadingComplete === null && "Create House"}
        </Button>
      </Box>
    </Box>
  );
}
