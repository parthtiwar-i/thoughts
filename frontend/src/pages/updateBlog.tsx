import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlogs";
import { BlogEditor } from "../components/blogEditor";
import { Loader } from "../components/skeletonLoader";

const UpdateBlog = () => {
  const { id } = useParams();
  const { blog, loading } = useBlog({ id: id || "" });

  return loading ? (
    <Loader />
  ) : (
    <BlogEditor
      blogContent={blog?.content}
      blogTitle={blog?.title}
      blogId={blog?.id}
    />
  );
};

export default UpdateBlog;
