import axios from "axios";
import { useAuth } from "../context";
import { Blog } from "../hooks/useBlogs";
import Avatar from "./Avatar";
import { BACKEND_URL } from "../config";
import showAlert from "../helper/Alert";
import { useNavigate } from "react-router-dom";

export const BlogPage = ({ blog }: { blog: Blog }) => {
  const { user, jwt } = useAuth();
  const navigate = useNavigate();
  const deleteBlog = async () => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/blog/${blog.id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (response) {
        showAlert("Blog deleted successfully", "success");
        navigate("/profile");
      }
    } catch (error) {
      showAlert("Unable to deleted blog", "error");
    }
  };
  return (
    <div className="grid grid-cols-4 min-h-[60vh]">
      <div className="col-span-3 flex flex-col">
        <div className="text-5xl font-bold font-serif py-3 leading-snug ">
          {blog.title}
        </div>
        <div className="text-lg text-gray-400 py-5">Posted on august 2024</div>
        <div
          className="text-lg tracking-wide leading-9 text-gray-800 tiptap"
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
        {user?.id === blog.author.id && (
          <div className="actions flex flex-col items-center">
            <button
              type="button"
              className=" w-fit rounded-md text-black bg-orange-200 hover:bg-orange-300 focus:outline-none  focus:ring-gray-300 font-medium text-sm px-5 py-2 me-2 my-2"
            >
              Update Blog
            </button>
            <button
              onClick={deleteBlog}
              type="button"
              className=" w-fit rounded-md text-black bg-orange-200 hover:bg-orange-300 focus:outline-none  focus:ring-gray-300 font-medium text-sm px-5 py-2 me-2 my-2"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
