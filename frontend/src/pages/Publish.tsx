import { useState } from "react";
import Tiptap from "../components/tiptap";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  return (
    <div className="px-20 py-16">
      <div className="flex items-center">
        <input
          type="text"
          className="bg-white font-serif font-extrabold min-w-max text-gray-900 text-5xl rounded-lg focus:outline-none focus:border-blue-500 block w-full p-2.5 "
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="min-h-64 bg-orange-50">
        <Tiptap setContent={setContent} />
      </div>
      <button
        type="button"
        className="text-white bg-orange-950 hover:bg-orange-800 focus:outline-none font-medium rounded-lg text-lg px-5 py-1.5 mt-4 text-center"
        onClick={async () => {
          const response = await axios.post(
            `${BACKEND_URL}api/v1/blog`,
            {
              title,
              content,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              },
            }
          );
          navigate(`/blog/${response.data.blog.id}`);
        }}
      >
        Publish
      </button>
    </div>
  );
};

export default Publish;
