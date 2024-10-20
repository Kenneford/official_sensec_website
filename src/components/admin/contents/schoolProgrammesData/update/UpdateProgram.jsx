import React, { useEffect, useState } from "react";
// import "./createProgramme.scss";
import { CircularProgress } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useDispatch, useSelector } from "react-redux";
import {
  classLevelNameOptions,
  classLevelOptions,
} from "../../../../options/options";
import { getAdminInfo } from "../../../../features/admin/adminsSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProgram,
  updateProgram,
} from "../../../../features/academics/academicProgram/academicProgramSlice";
import { getUser } from "../../../../features/allUsers/usersSlice";
import LoadingProgress from "../../../pageLoading/LoadingProgress";
import { toast } from "react-toastify";
import { SingleProgram } from "../../../../dataFetching/fetchPrograms/FetchProgramsCategories";

export default function UpdateProgram() {
  const { programme_name } = useParams();
  const navigate = useNavigate();

  const authAdminInfo = useSelector(getUser);
  const singleProgram = SingleProgram({ programName: programme_name });

  const {
    updateProgramStatus,
    updateProgramSuccessMessage,
    updateProgramError,
  } = useSelector((state) => state.program);
  const dispatch = useDispatch();

  const [loadingComplete, setLoadingComplete] = useState(null);

  const [program, setProgram] = useState({
    name: "",
    lastUpdatedBy: `${authAdminInfo.id}`,
  });
  console.log(program);

  const handleInputValues = (e) => {
    setProgram({
      ...program,
      [e.target.name]: e.target.value,
    });
  };

  const handleProgramUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateProgram({
        name: program?.name ? program?.name : singleProgram?.name,
        programId: singleProgram?._id,
        lastUpdatedBy: program?.lastUpdatedBy,
      })
    );
  };

  useEffect(() => {
    if (updateProgramStatus === "pending") {
      setLoadingComplete(false);
      setTimeout(() => {
        setLoadingComplete(true);
      }, 3000);
      return;
    }
    if (updateProgramStatus === "rejected") {
      setTimeout(() => {
        setLoadingComplete(null);
        updateProgramError?.errorMessage?.message?.map((err) =>
          toast.error(err, {
            position: "top-right",
            theme: "dark",
            // toastId: successId,
          })
        );
      }, 3000);
      return;
    }
    if (updateProgramStatus === "success") {
      setTimeout(() => {
        toast.success(updateProgramSuccessMessage, {
          position: "top-right",
          theme: "dark",
          // toastId: successId,
        });
      }, 3000);
      setTimeout(() => {
        navigate(-1);
      }, 8000);
      setTimeout(() => {
        window.location.reload();
      }, 8500);
    }
  }, [
    updateProgramError,
    updateProgramSuccessMessage,
    updateProgramStatus,
    navigate,
  ]);

  return (
    <div className="createProgramWrap">
      <form onSubmit={handleProgramUpdate}>
        <h1>Update {programme_name.replace(/_/g, " ")} Programme</h1>
        <div className="formInputWrap">
          <div className="inputCont">
            <label htmlFor="name">
              Name<span>*</span>
            </label>
            <input
              type="text"
              name="name"
              onChange={handleInputValues}
              placeholder=""
              value={program?.name ? program?.name : singleProgram?.name}
            />
          </div>
        </div>
        <button className="addStudentBtn" type="submit">
          {loadingComplete === false && (
            <LoadingProgress color={"#fff"} size={"1.3rem"} />
          )}
          {loadingComplete === true && updateProgramStatus === "success" && (
            <>
              <span> Programme Updated Successfully...</span> <TaskAltIcon />
            </>
          )}
          {loadingComplete === null && "Update Programme"}
        </button>
      </form>
    </div>
  );
}
