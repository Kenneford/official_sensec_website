import React, { useEffect, useState } from "react";
// import "./newEmploymentModal.scss";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import LoadingProgress from "../pageLoading/LoadingProgress";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../../features/blogs/blogSlice";

export default function DeleteBlogModal({
  open,
  onClose,
  handleNewEmployment,
  deleting,
  deleteMessage,
  question,
  blogId,
}) {
  const dispatch = useDispatch();
  //   const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    if (deleting) {
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  }, [deleting, onClose]);

  if (!open) return null;
  return (
    <div className="newEmploymentModalOverlay">
      <div className="newEmploymentModalCont" onClick={onClose}>
        <div
          className="previewHistoryWrap"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/* <span className="closeModalIcon" onClick={onClose}>
            Close
          </span> */}
          <button id="closeModalIconBtn" title="Close" onClick={onClose}>
            <CloseIcon className="closeIcon" />
          </button>
          <div className="previewText">
            <div className="previewCont">
              <h2>{question}</h2>
              <div className="modalActionBtns">
                <button
                  className="employLectBtn"
                  onClick={() => {
                    dispatch(deleteBlog(blogId));
                  }}
                >
                  Yes
                </button>
                <button className="employLectBtn" onClick={onClose}>
                  No
                </button>
              </div>
            </div>
            {deleting && (
              <div className="redirectProgress">
                <p
                  style={{
                    color: "red",
                    letterSpacing: "1px",
                    paddingRight: ".5rem",
                  }}
                >
                  {deleteMessage}
                </p>{" "}
                <LoadingProgress color={"red"} size={"1.3rem"} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
