import React, { useState } from "react";
import "./createNewData.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

export function CreateNewData({ setCurrentAction, setCurrentLink }) {
  const adminLink = localStorage.getItem("currentAdminLink");
  const adminAction = localStorage.getItem("currentAdminAction");
  const navigate = useNavigate();
  const { adminCurrentAction, adminCurrentLink } = useParams();

  //THIS REMOVES THE HASHLINK TAG FROM THE URL
  if (window.location.hash) {
    window.history.replaceState("", document.title, window.location.pathname);
  }

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -150;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        borderBottom: "1px solid #cccc",
      }}
    >
      {/* Buttons to create new data */}
      <Box
        sx={{
          width: { xs: "100%", sm: "95%", md: "90%", lg: "90%", xl: "75%" },
          padding: "1rem .5rem",
        }}
        className="createNewDataWrap"
      >
        <button
          className="createBtn"
          onClick={() => {
            navigate(
              `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/school_batch/new`
            );
          }}
        >
          School Batch
        </button>
        <button
          className="createBtn"
          onClick={() => {
            navigate(
              `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/placement_batch/new`
            );
          }}
        >
          Placement Batch
        </button>
        <button
          className="createBtn"
          onClick={() =>
            navigate(
              `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/academic_year/new`
            )
          }
        >
          Academic Year
        </button>
        <button
          className="createBtn"
          onClick={() =>
            navigate(
              `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/academic_term/new`
            )
          }
        >
          Academic Term
        </button>
        <button
          className="createBtn"
          onClick={() =>
            navigate(
              `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/class_level/new`
            )
          }
        >
          Class Level
        </button>
        <button
          className="createBtn"
          onClick={() =>
            navigate(
              `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/program/new`
            )
          }
        >
          Program
        </button>
        <button
          className="createBtn"
          onClick={() =>
            navigate(
              `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/class_section/new`
            )
          }
        >
          Class Section
        </button>
        <button
          className="createBtn"
          onClick={() =>
            navigate(
              `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/house/new`
            )
          }
        >
          House
        </button>
        <button
          className={"createBtn"}
          onClick={() =>
            navigate(
              `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/subject/new`
            )
          }
        >
          Subject
        </button>
        {/* <button
          className="createBtn"
          onClick={() =>
            navigate(
              `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/elective_subject/new`
            )
          }
        >
          E-Subject
        </button>
        <button
          className="createBtn"
          onClick={() =>
            navigate(
              `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/core_subject/new`
            )
          }
        >
          C-Subject
        </button> */}
        <button
          className="createBtn"
          onClick={() =>
            navigate(
              `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/old_students_group/new`
            )
          }
        >
          Graduates Group
        </button>
        <button
          className="createBtn"
          onClick={() => {
            navigate(
              `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/school_data/new`
            );
          }}
        >
          School Data
        </button>
        <button
          className="createBtn"
          onClick={() => {
            navigate(
              `/sensec/users/admin/${adminCurrentAction}/${adminCurrentLink}/time_table/new`
            );
          }}
        >
          Time Table
        </button>
      </Box>
    </Box>
  );
}
