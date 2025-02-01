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
  blogImage,
}: {
  blogTitle?: string;
  blogContent?: string;
  blogId?: string;
  blogImage?: string;
}) => {
  const [title, setTitle] = useState(() => (blogTitle ? blogTitle : ""));
  const [content, setContent] = useState(() =>
    blogContent ? blogContent : ""
  );
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    blogImage || null
  );
  const { jwt } = useAuth();
  const navigate = useNavigate();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        // 1MB limit
        showAlert("Image size must be less than 1MB", "error");
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Upload image and get URL
  const uploadImage = async () => {
    if (!image) return null;
    try {
      const formData = new FormData();
      formData.append("titleImage", image);

      const { data } = await axios.post(
        `${BACKEND_URL}/blog/upload-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data.imageUrl; // Cloudflare returns image URL
    } catch (error) {
      showAlert("Image upload failed", "error");
      return null;
    }
  };

  const onPublish = async () => {
    try {
      //overlay loder
      const titleImage = await uploadImage();
      const url = `${BACKEND_URL}/blog${blogId ? `/${blogId}` : ""}`;
      const method = blogId ? "PATCH" : "POST";
      const response = await axios({
        method,
        url,
        data: { title, content, titleImage },
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
      <div className="mb-4 flex flex-col items-center">
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-md mb-2"
          />
        )}
        <label className="cursor-pointer bg-orange-800 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
          Upload Image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>
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
