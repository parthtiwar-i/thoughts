import { useParams } from "react-router-dom";
import { useBlog } from "../../hooks/useBlogs";
import { BlogPage } from "../../components/ui/detailedBlogPage";
import { Loader } from "../../components/ui/skeletonLoader";
// import BlogComponent from "../../components/blogComponent";

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
        <BlogPage blog={blog!} />
        // <div className=" px-10 md:px-28 py-12 bg-orange-50 ">
        // {/* <BlogComponent blog={blog!} /> */}
        // </div>
      )}
    </div>
  );
};

export default Blog;
