import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useAuth } from "../context";

export interface Blog {
  title: string;
  content: string;
  author: {
    name: string;
  };
  id: string;
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { jwt } = useAuth();

  useEffect(() => {
    const getBlogs = async () => {
      const response = await axios.get(`${BACKEND_URL}api/v1/blog`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setBlogs(response.data.blogs);
      setLoading(false);
    };
    getBlogs();
  }, []);

  return {
    loading,
    blogs,
  };
};

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();
  const { jwt } = useAuth();
  useEffect(() => {
    const getBlogs = async () => {
      const response = await axios.get(`${BACKEND_URL}api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setBlog(response.data.blog);
      setLoading(false);
    };
    getBlogs();
  }, []);

  return {
    loading,
    blog,
  };
};
