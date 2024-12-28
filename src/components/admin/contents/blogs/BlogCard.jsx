import {
  Favorite,
  FavoriteBorder,
  MoreVert,
  ThumbUpAlt,
  ThumbUpOffAlt,
} from "@mui/icons-material";
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
import ProTypes from "prop-types";
import Parser from "html-react-parser";
import { dateFormatter } from "../../../../dateFormatter/DateFormatter";
import { useSelector } from "react-redux";
import { getAuthUser } from "../../../../features/auth/authSlice";

export default function BlogCard({ blogId, title, content, image, postedBy }) {
  // const { postOptions, setPostOptions } = useOutletContext();
  const authUser = useSelector(getAuthUser);

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
            <span className="blogUsername">
              {postedBy?.personalInfo?.gender === "Male" ? "Mr. " : "Mrs. "}
              {postedBy?.personalInfo?.lastName}
            </span>
            <Avatar
              className="userProfileImg"
              src={postedBy?.personalInfo?.profilePicture?.url}
              alt=""
            />
          </Link>
          <span className="blogDate">
            {postedBy?.createdAt
              ? dateFormatter.format(new Date(postedBy?.createdAt))
              : "Unknown"}
            .
          </span>
        </Box>
        {authUser?.roles?.includes("admin") && (
          <Box>
            <button
              className="blogOptionsBtn"
              onClick={() => {
                setPostOptions(!postOptions);
              }}
            >
              <MoreVert className="moreVert" />
            </button>
            <div ref={outSideClickRef}>
              {postOptions && (
                <BlogOptions
                  postOptions={postOptions}
                  blogId={blogId}
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
        )}
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
                // xs: "15em",
                sm: "17em",
                md: "20em",
                lg: "23em",
                xl: "23em",
                borderRadius: ".4rem",
              },
            }}
          />
        )}
        <CardContent
          // sx={{
          //   padding: "unset",
          // }}
          className="textContent"
        >
          <Typography variant="body" color="text.secondary">
            {Parser(`${content}`)}
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

BlogCard.propTypes = {
  blogId: ProTypes.string,
  title: ProTypes.string,
  content: ProTypes.string,
  image: ProTypes.string,
  postedBy: ProTypes.object,
};
