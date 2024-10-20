import {
  Favorite,
  FavoriteBorder,
  MoreVert,
  ThumbUpAlt,
  ThumbUpOffAlt,
} from "@mui/icons-material";
import "./blogCard.scss";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Box,
  Avatar,
} from "@mui/material";
import { Link, useOutletContext } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import BlogOptions from "./options/BlogOptions";

export default function BlogCard({ title, content, image }) {
  // const { postOptions, setPostOptions } = useOutletContext();

  const [postOptions, setPostOptions] = useState(false);

  const blogLiked = true;
  const blogLoved = true;
  const outSideClickRef = useRef(null);
  const hideOnClickOutside = (e) => {
    // console.log(outSideClickRef.current);
    if (
      outSideClickRef.current &&
      !outSideClickRef.current.contains(e.target)
    ) {
      setPostOptions(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  return (
    <Card>
      <Box className="blogWrapper">
        <Box className="blogTopLeft">
          <p>Posted by:</p>
          <Link to="#" className="blogBy">
            <span className="blogUsername">Patrick Kenneford Annan</span>
            <Avatar
              className="userProfileImg"
              src="https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </Link>
          <span className="blogDate">May 20, 2024 .</span>
        </Box>
        <Box>
          <button
            className="blogOptionsBtn"
            onClick={() => {
              setPostOptions(!postOptions);
              //   setCurrentBlog(blog?._id);
            }}
          >
            <MoreVert className="moreVert" />
          </button>
          <div ref={outSideClickRef}>
            {postOptions && (
              <BlogOptions
                postOptions={postOptions}
                // blog={currentBlog}
                // userId={userInfo?.uniqueId}
                // setOpenModal={setOpenModal}
                // adminCurrentAction={adminCurrentAction}
                // adminCurrentLink={adminCurrentLink}
              />
            )}
          </div>
          {/* <DeleteBlogModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            handleNewEmployment={handleBlogDelete}
            deleting={deleting}
            deleteMessage={"Blog deletion in progress..."}
            question={"Are you sure you would like to delete selected blog?"}
          /> */}
        </Box>
      </Box>
      <Box
        // disableRipple
        sx={{
          "&:hover": {
            backgroundColor: "#fff", // Use transparent if you want no background color
          },
          "& .MuiTouchRipple-root": {
            opacity: 0, // Adjust the ripple opacity (make it less noticeable)
          },
          cursor: "pointer",
          padding: "1rem",
          fontSize: "calc(0.7rem + 1vmin)",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{
            paddingBottom: ".5rem",
            color: "#696969",
            fontSize: "1em",
            fontWeight: "600",
          }}
        >
          {title}
        </Typography>
        {image && (
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
              height: {
                xs: "15em",
                sm: "17em",
                md: "20em",
                lg: "23em",
                xl: "23em",
              },
            }}
          />
        )}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
      </Box>
      <Box className="blogBottom">
        <Box className="blogBottomLeft">
          <button className="likeBtn">
            {blogLiked ? (
              <ThumbUpOffAlt className="isLiked" />
            ) : (
              <ThumbUpAlt className="isLiked" />
            )}
            <span>{7}</span>
          </button>
          <button className="loveBtn">
            {blogLoved ? (
              <FavoriteBorder className="isLoved" />
            ) : (
              <Favorite className="isLoved" />
            )}
            <span>{22}k+</span>
          </button>
          {/* {userInfo && (
              <span className="blogLikeCounter">
                {blog?.likes?.length === 0 &&
                  blog?.loves?.length === 0 &&
                  "no reactions"}
                {blog?.likes?.length === 1 &&
                  blog?.likes?.includes(userInfo?.id) &&
                  !blog?.loves?.includes(userInfo?.id) &&
                  "you reacted"}
                {blog?.loves?.length === 1 &&
                  blog?.loves?.includes(userInfo?.id) &&
                  !blog?.likes?.includes(userInfo?.id) &&
                  "you reacted"}
                {!blog?.likes?.includes(userInfo?.id) &&
                  !blog?.loves?.includes(userInfo?.id) &&
                  `${like + love} person reacted`}
                {reactions > 1 &&
                  blog?.likes?.includes(userInfo?.id) &&
                  !blog?.loves?.includes(userInfo?.id) &&
                  `you and ${like + love - 1} other people reacted`}
                {reactions > 1 &&
                  blog?.loves?.includes(userInfo?.id) &&
                  !blog?.likes?.includes(userInfo?.id) &&
                  `you and ${like + love - 1} other people reacted`}
                {reactions > 1 &&
                  !blog?.likes?.includes(userInfo?.id) &&
                  !blog?.loves?.includes(userInfo?.id) &&
                  `${like + love} people reacted`}
              </span>
            )} */}

          {/* {!userInfo && (
            <span className="blogLikeCounter">
              {like + love === 1 && `${like + love} person reacted`}
              {like + love > 1 && `${like + love} people reacted`}
              {!like && !love && "no reactions"}.
            </span>
          )} */}
        </Box>
        <Box className="blogBottomRight">
          {/* <span className="blogCommentText">6 comments</span> */}
          <span className="blogCommentText">17 comments</span>
        </Box>
      </Box>
    </Card>
  );
}
