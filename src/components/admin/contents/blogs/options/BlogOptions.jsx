import React, { useState } from "react";
import "./blogOptions.scss";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import DeleteBlogModal from "../../../../modals/DeleteBlogModal";

export default function BlogOptions({
  blogId,
  blog,
  userId,
  setOpenModal,
  adminCurrentAction,
  adminCurrentLink,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpen(false);
  const userInfo = {};
  const allPosts = [];
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(blog);
  console.log(userId);
  console.log(adminCurrentAction, adminCurrentLink);

  const [openDeleteBlogModal, setOpenDeleteBlogModal] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(null);
  const [currentBlog, setCurrentBlog] = useState(null);
  const selectedPost = allPosts.find((pst) => pst?._id === blog);
  console.log(selectedPost);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: ".4rem",
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="blogOptionsWrap">
        <HashLink
          to={
            userInfo &&
            userInfo?.adminStatusExtend?.isAdmin &&
            `/sensec/admin/${adminCurrentAction}/${adminCurrentLink}/single/${selectedPost?.title?.replace(
              / /g,
              "_"
            )}/edit#blogs`
          }
        >
          Edit
        </HashLink>
        {/* <hr /> */}
        <p onClick={() => setOpenDeleteBlogModal(true)}>Delete</p>
        <DeleteBlogModal
          open={openDeleteBlogModal}
          onClose={() => setOpenDeleteBlogModal(false)}
          // deleteBlogFunction={handlePostDelete}
          setLoadingComplete={setLoadingComplete}
          // dispatch={dispatch}
          blogId={blogId}
          currentBlog={currentBlog}
        />
        {/* <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal"
        >
          <Box sx={style}>
            <p className="deleteQuestion">
              Are you sure you want to delete this?
            </p>
            <div className="deleteOptions">
              <span
                className="yes"
                onClick={async () => {
                  try {
                    const res = await axios.delete(
                      `${API_ENDPOINT}/admin/${userId}/blogs/${post._id}/delete`
                    );
                    if (res) {
                      toast.success(res.data.successMessage, {
                        position: "top-right",
                        theme: "dark",
                        // toastId: successId,
                      });
                      setTimeout(() => {
                        window.location.reload();
                      }, 5000);
                    }
                  } catch (error) {
                    toast.error(error.res.data.errorMessage.message, {
                      position: "top-right",
                      theme: "light",
                      // toastId: successId,
                    });
                  }
                }}
              >
                YES
              </span>
              <span className="yes" onClick={() => handlePostDelete()}>
                YES
              </span>
              <span className="no" onClick={handleClose}>
                NO
              </span>
            </div>
          </Box>
        </Modal> */}
      </div>
    </div>
  );
}
