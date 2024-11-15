import Avatar from "../components/Avatar";
import BlogCard from "../components/BlogCard";
import { Loader } from "../components/Loader";
import { useAuth } from "../context";
import { getUserBlog } from "../hooks/useBlogs";

interface User {
  name: string;
  avatar: string;
  bio: string;
  location: string;
  email: string;
}

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  date: string;
}

interface UserProfileProps {
  user: User;
  blogs: Blog[];
}

export default function UserProfile() {
  const { loading, userBlogs } = getUserBlog();
  const { logout, user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8 bg-orange-50">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col items-center mb-6">
            <Avatar
              className="w-32 h-32 rounded-full mb-4 text-center bg-orange-50 flex justify-center items-center"
              name="Parth Tiwari"
            />
            {/* <img
              src={user.avatar}
              alt={`${user.name}'s avatar`}
              className="w-32 h-32 rounded-full mb-4"
            /> */}
            <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 text-center mb-4">
              Random catch phrase about user
            </p>
            <div className="flex justify-center space-x-4 text-sm text-gray-500 mb-4">
              <span>Amsterdam EU</span>
              <span>{user?.email}</span>
            </div>
            <div className="text-center">
              <button
                onClick={() => logout()}
                type="button"
                className="text-black bg-orange-200 hover:bg-orange-400 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200">
          <div className="p-6">
            <h2 className="text-3xl text-center font-semibold text-gray-800 mb-4">
              My Blogs
            </h2>
            <div className="space-y-6">
              {loading ? (
                <Loader />
              ) : (
                userBlogs.map((blog) => (
                  <BlogCard
                    authorName={blog.author.name}
                    title={blog.title}
                    content={blog.content}
                    publishDate={blog.createdAt?.slice(0, 10) || "12 Jan 2024"}
                    id={blog.id}
                    published={blog.published}
                    myBlogs={true}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
