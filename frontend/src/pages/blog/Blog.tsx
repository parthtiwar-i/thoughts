import { useParams } from "react-router-dom";
import { useBlog } from "../../hooks/useBlogs";
import BlogPage from "../../components/BlogPage";
import { Loader } from "../../components/Loader";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="px-28 py-12 bg-orange-50 ">
          <BlogPage blog={blog!} />
        </div>
      )}
    </div>
  );
};

export default Blog;
