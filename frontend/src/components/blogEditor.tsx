import { useState } from "react";
import { useAuth } from "../context";
import { useNavigate } from "react-router-dom";
import Tiptap from "./tiptap";
import axios from "axios";
import { BACKEND_URL } from "../config";
import showAlert from "../helper/Alert";
export const BlogEditor = ({
  blogTitle,
  blogContent,
  blogId,
}: {
  blogTitle?: string;
  blogContent?: string;
  blogId?: string;
}) => {
  const [title, setTitle] = useState(() => (blogTitle ? blogTitle : ""));
  const [content, setContent] = useState(() =>
    blogContent ? blogContent : ""
  );
  const { jwt } = useAuth();
  const navigate = useNavigate();
  const onPublish = async () => {
    try {
      //overlay loder
      const url = `${BACKEND_URL}/blog${blogId ? `/${blogId}` : ""}`;
      const method = blogId ? "PATCH" : "POST";
      const response = await axios({
        method,
        url,
        data: { title, content },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      navigate(`/blog/${response.data.blog.id}`);
      showAlert(
        `Blog ${blogId ? "updated" : "created"} successfully`,
        "success"
      );
    } catch (error) {
      showAlert(`Unable to ${blogId ? "updated" : "created"} blog`, "error");
    }
  };

  return (
    <div className="px-20 py-16">
      <div className="flex items-center">
        <input
          type="text"
          className="bg-white font-serif font-extrabold min-w-max text-gray-900 text-5xl rounded-lg focus:outline-none focus:border-blue-500 block w-full p-2.5 "
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="min-h-64 bg-orange-50">
        <Tiptap
          setContent={setContent}
          content={
            blogContent
              ? content
              : "Please start writing your blog from here..."
          }
        />
      </div>
      <button
        type="button"
        className="text-white bg-orange-950 hover:bg-orange-800 focus:outline-none font-medium rounded-lg text-lg px-5 py-1.5 mt-4 text-center"
        onClick={onPublish}
      >
        {blogId ? "Update" : "Publish"}
      </button>
    </div>
  );
};
