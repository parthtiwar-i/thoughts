import BlogCard from "../../components/BlogCard";
import { Loader } from "../../components/skeletonLoader";
import { useBlogs } from "../../hooks/useBlogs";

const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col justify-center items-center bg-orange-50">
      <div className="w-3/4">
        {blogs.map((blog) => (
          <BlogCard
            authorName={blog.author.name}
            title={blog.title}
            content={blog.content}
            publishDate="12 Jan 2024"
            id={blog.id}
            titleImage={blog.titleImage}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
