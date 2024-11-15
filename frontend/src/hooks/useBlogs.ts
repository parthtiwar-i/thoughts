import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useAuth } from "../context";

export interface Blog {
  title: string;
  content: string;
  author: {
    name: string;
    id?: string;
  };
  id: string;
  createdAt?: string;
  published?: boolean;
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { jwt } = useAuth();

  useEffect(() => {
    const getBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${BACKEND_URL}/blog/all`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setBlogs(response.data.blogs);
      } catch (err) {
        setError((err as Error).message || "Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, [jwt]);

  return { loading, blogs, error };
};

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();
  const [error, setError] = useState<string | null>(null);
  const { jwt } = useAuth();

  useEffect(() => {
    const getBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${BACKEND_URL}/blog/${id}/blog`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setBlog(response.data.blog);
      } catch (err) {
        setError((err as Error).message || "Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };
    getBlog();
  }, [id, jwt]);

  return { loading, blog, error };
};

export const getUserBlog = () => {
  const [loading, setLoading] = useState(true);
  const [userBlogs, setUserBlogs] = useState<Blog[]>([]);
  const { jwt } = useAuth();

  useEffect(() => {
    const getBlog = async () => {
      const response = await axios.get(`${BACKEND_URL}/blog/user-blogs`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setUserBlogs(response?.data);
      setLoading(false);
    };
    getBlog();
  }, []);

  return {
    loading,
    userBlogs,
  };
};
