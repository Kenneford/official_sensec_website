import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, getAllBlogs } from "../../features/blogs/blogSlice";

const FetchAllBlogs = () => {
  const { updateStatus, deleteStatus } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const allBlogs = useSelector(getAllBlogs);

  useEffect(() => {
    // if (!allBlogs || allBlogs?.length === 0) {
    //   dispatch(fetchAllBlogs());
    // }
    // dispatch(fetchAllBlogs());

    if (updateStatus === "success" || deleteStatus === "success") {
      setTimeout(() => {
        dispatch(fetchBlogs());
      }, 7000);
    } else {
      dispatch(fetchBlogs());
    }
  }, [dispatch, updateStatus, deleteStatus]);

  return allBlogs;
};

export { FetchAllBlogs };
