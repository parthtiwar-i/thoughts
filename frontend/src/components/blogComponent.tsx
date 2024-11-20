import { Blog } from "../hooks/useBlogs";
import Avatar from "./userAvatar";

// interface BlogPageProps {
//   title: string;
//   content: string;
//   author: {
//     name: string;
//     avatar?: string;
//     about: string;
//   };
//   onDelete?: () => void;
//   onUpdate?: () => void;
// }

export default function BlogComponent({ blog }: { blog: Blog }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Blog Content */}
        <div className="lg:w-[70%]">
          <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>
          <div
            className="prose prose-lg max-w-none tiptap"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Author Information */}
        <div className="lg:w-[30%]">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center mb-4">
              {/* {blog.author. ? (
                <img
                  src={author.avatar}
                  alt={`${author.name}'s avatar`}
                  className="w-12 h-12 rounded-full mr-4"
                />
              ) : ( */}
              <Avatar
                name={blog.author.name}
                className="w-12 h-12 text-gray-400 mr-4"
              />
              {/* )} */}
              <h2 className="text-xl font-semibold">{blog.author.name}</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Random catch phase about the Author here
            </p>
            <div className="flex flex-col space-y-2">
              <button
                // onClick={onUpdate}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Update Blog
              </button>
              <button
                // onClick={onDelete}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Delete Blog
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
