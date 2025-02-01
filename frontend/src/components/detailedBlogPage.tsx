import axios from "axios";
import { useAuth } from "../context";
import type { Blog } from "../hooks/useBlogs";
import Avatar from "./userAvatar";
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
      showAlert("Unable to delete blog", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-2 py-2 sm:py-8">
      <div className="relative mb-8 sm:mb-12">
        <div className="w-full h-48 sm:h-64 overflow-hidden rounded-lg shadow-lg">
          <img
            src={blog.titleImage || "/placeholder.svg?height=256&width=768"}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-12 sm:pt-16 pb-4 sm:pb-8 px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-serif leading-tight text-gray-900">
            {blog.title}
          </h1>
          <div className="text-xs sm:text-sm text-gray-500 mt-2">
            Posted on 25 August 2025
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-3">
          <div
            className="text-base sm:text-lg tracking-wide leading-7 sm:leading-9 text-gray-800 tiptap"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>
        </div>

        <div className="md:col-span-1">
          <div className="shadow-sm rounded-lg p-4 sm:p-6 sticky top-8">
            <h2 className=" text-center text-lg sm:text-xl font-semibold mb-4">
              About Author
            </h2>
            <div className="flex items-center mb-4">
              <div className="mr-3 sm:mr-4">
                <Avatar name={blog.author.name} />
              </div>
              <div>
                <div className="text-base sm:text-lg font-bold">
                  {blog.author.name}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Passionate writer and storyteller
                </div>
              </div>
            </div>
            {user?.id === blog.author.id && (
              <div className="flex flex-col space-y-2 mt-4 sm:mt-6">
                <button
                  onClick={() => navigate(`/update/${blog.id}`)}
                  className="w-full rounded-md text-black bg-orange-200 hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 font-medium text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5 transition duration-150 ease-in-out"
                >
                  Update Blog
                </button>
                <button
                  onClick={deleteBlog}
                  className="w-full rounded-md text-red-600 bg-orange-200 hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 font-medium text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5 transition duration-150 ease-in-out"
                >
                  Delete Blog
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
