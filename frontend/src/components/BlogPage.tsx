import { Blog } from "../hooks/useBlogs";
import Avatar from "./Avatar";

const BlogPage = ({ blog }: { blog: Blog }) => {
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-3 flex flex-col">
        <div className="text-5xl font-bold font-serif py-3 leading-snug ">
          {blog.title}
        </div>
        <div className="text-lg text-gray-400 py-5">Posted on august 2024</div>
        <div
          className="text-lg tracking-wide leading-9 text-gray-800"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>
      </div>
      <div className="col-span-1 flex flex-col">
        <div className="pl-2">Author</div>
        <div className="flex items-center">
          <div className="px-4">
            <Avatar name={blog.author.name} />
          </div>
          <div className="flex flex-col justify-start">
            <div className="text-2xl font-bold">{blog.author.name}</div>
            <div>Random catch phrase about the author to grab attention</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
